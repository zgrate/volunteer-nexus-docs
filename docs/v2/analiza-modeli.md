---
sidebar_position: 3
title: Analiza modeli i sugerowane zmiany
---

# Analiza modeli i sugerowane zmiany

:::warning[Szkic]
Notatka z analizy v1 wykonanej 23 listopada 2026 r. Zawiera propozycje, a nie decyzje. Nazwy modeli v2 są robocze.
:::

Strona opisuje, dlaczego moduł zmian w v1 działał wolno na wydarzeniu, i proponuje zmiany modeli dla v2. Wersja 2 zaczyna od pustej bazy danych, więc modele można zaprojektować od nowa.

## Źródło i zakres

Analiza objęła modele wszystkich aplikacji serwera oraz widoki i serializery aplikacji `backend/shifts/`. Czasy zmierzono na lokalnej kopii systemu z wyłączonym trybem debugowania, na wydarzeniu testowym „PERF Dispatch”. Wydarzenie ma 320 zmian, 640 stanowisk, 1314 przydziałów i 401 uczestników.

Analiza nie objęła szczegółowo:

- siatki godzin (`backend/shifts/grid.py`),
- ekranów Conops,
- dokumentów i integracji z Telegramem,
- czasów na serwerze produkcyjnym – pomiary pochodzą z komputera deweloperskiego.

## Pomiary

Tabela 1 pokazuje koszt najczęstszych żądań modułu zmian w v1.

| Żądanie | Zapytania do bazy | Czas | Rozmiar odpowiedzi |
| --- | --- | --- | --- |
| lista zmian wolontariusza (`/api/shifts/?event=…&all=true`) | 2515 | 2,9 s | 76 KB |
| lista zmian administratora (ten sam adres) | 655 | 4,4 s | 1,5 MB |
| tablica dyspozytora, pełne wczytanie | 49 | 2,0 s | 705 KB |
| tablica dyspozytora, administrator | 14 | 3,1 s | 1,4 MB |
| odświeżenie tablicy dyspozytora (okno 12 godzin, co 10 s) | 27 | 0,25 s | 95 KB |
| stanowiska jednej zmiany, wolontariusz (`/api/shift-positions/?shift=…`) | 15 | 2,7 s | poniżej 1 KB |

*Tabela 1. Koszt żądań modułu zmian w v1*

## Przyczyny

Baza danych nie jest wąskim gardłem. Poza ostatnim wierszem tabeli 1 zapytania SQL zajmują mniej niż 0,25 s, a resztę czasu zużywa kod serwera. Przyczyny są następujące:

- przepustowość – serwer produkcyjny uruchamia 3 synchroniczne procesy `gunicorn` (`backend/entrypoint.prod.sh`) i otwiera nowe połączenie z bazą przy każdym żądaniu; przy 3 s na listę zmian całe wydarzenie obsługuje około jednego wczytania listy na sekundę,
- zakres odpowiedzi – lista zmian, panel administracyjny i tablica dyspozytora pobierają wszystkie zmiany wydarzenia razem ze stanowiskami, przydziałami i zadaniami; lista wolontariusza liczy dodatkowo warunki samodzielnego zapisu dla każdego stanowiska,
- uprawnienia – `Event.user_can_administer` i `Department.user_can_dispatch` (`backend/events/models.py`) wykonują do czterech zapytań przy każdym wywołaniu, a filtr widoczności w `backend/shifts/views.py` wywołuje je osobno dla każdej zmiany,
- filtry widoczności – zapytania łączą warunkiem `OR` pięć relacji wiele-do-wielu i usuwają powtórzenia przez `DISTINCT`; stąd 2,7 s w ostatnim wierszu tabeli 1,
- zapis – każdy zapis modelu jest utrwalany trzy razy: sygnał `pre_save` czyta wiersz ponownie (`backend/core/signals.py`), potem powstaje wpis Dziennika audytu i wpis historii zmian.

Próbna poprawka dwóch przyczyn potwierdziła diagnozę. Zapamiętanie wyniku sprawdzenia uprawnień na czas żądania zmniejszyło listę wolontariusza z 2515 zapytań i 2,9 s do 60 zapytań i 1,07 s. Zamiana złączeń na podzapytania skróciła pobranie stanowisk z 2,7 s do 0,08 s. Poprawki nie zostały wdrożone.

## Sugerowane zmiany modeli

Tabela 2 zestawia stan v1 z propozycją dla v2.

| Obszar | Stan w v1 | Propozycja dla v2 |
| --- | --- | --- |
| role | cztery relacje wiele-do-wielu (`event_admins`, `organizers`, `dispatchers`, `shift_operators`) oraz `DepartmentMembership`; członkostwo w zespole zapisane w dwóch miejscach | jedna tabela `RoleGrant` (osoba, wydarzenie, opcjonalnie dział, rola) i jedna tabela `TeamMembership`; serwer wczytuje role osoby raz na żądanie |
| czas zmiany | `Shift.start_at` i `duration_minutes`; koniec jest wyliczany | zapisane `start_at` i `end_at` z dokładnością do minuty, indeks `(event, start_at)` |
| obsada stanowiska | liczona z pobranych przydziałów | pole `filled_count` aktualizowane w transakcji przydziału |
| przydział | wiersz zawiera `rule_check_results` i `rule_overrides` w JSON, pobierane przy każdej liście | krótki wiersz z kopią `event`, `start_at` i `end_at`; zapis sprawdzeń w osobnej tabeli jeden-do-jednego |
| kolizja zmian | porównanie w Pythonie wszystkich przydziałów osoby | zapytanie po indeksowanym zakresie czasu w wierszu przydziału |
| szablon reguł | trzy tabele (`ShiftRuleTemplate`, `ShiftRuleGroup`, `ShiftRule`) z drzewem grup | jedno zwalidowane drzewo JSON w szablonie, wczytywane jednym zapytaniem |
| prowadzący punkt programu | identyfikatory Foxcons w polach tekstowych i JSON, porównywane w Pythonie | tabela `ScheduleEntryHost` (punkt programu, identyfikator Foxcons) z indeksem; indeks na `User.foxcons_user_id` |
| wydarzenie | około 90 kolumn w `Event`, pary pól „włączone” i „tylko dla administratora”, dane logowania do Foxcons zapisane jawnie | krótki wiersz wydarzenia, jedno pole o trzech wartościach na funkcję, dane logowania w osobnej, szyfrowanej tabeli |
| audyt | sygnał globalny i historia zmian jednocześnie | jeden mechanizm, zapisywany jawnie z warstwy usług |
| niedyspozycyjność | brak ograniczenia „koniec po początku”, brak indeksu złożonego | ograniczenie w bazie i indeks `(event, user, start_at)` |
| punkty benefitów | sumowane w Pythonie przy każdym odczycie | wiersze księgi z utrzymywanym saldem |
| Mailer | odbiorcy i dziennik wysyłki w JSON w jednym wierszu `BulkEmailTask` | jeden wiersz na odbiorcę |
| drobne | `Agreement.type` i `Participation.role` jako dowolny tekst, powtórzone indeksy w `backend/notifications/models.py` | pola wyboru, ograniczenia unikalności, indeks częściowy dla nieprzeczytanych powiadomień |

*Tabela 2. Stan modeli w v1 i propozycja dla v2*

Układ `Shift` → `ShiftPosition` → `ShiftAssignment` oraz modele szablonów zmian zalecane jest zachować. Zalecane jest też pozostanie przy PostgreSQL: pola JSONB wystarczają na tłumaczenia i konfigurację reguł, a bazy NoSQL ani jeziora danych system nie potrzebuje.

## Sugerowane zmiany API i uruchomienia

Same modele nie usuwają przyczyn opisanych w sekcji „Przyczyny”. Potrzebne są także zmiany w API i w sposobie uruchomienia serwera:

- listy zmian zwracają jeden dzień lub okno czasu i tylko liczniki obsady; przydziały, zadania i notatki serwer zwraca po otwarciu zmiany,
- warunki samodzielnego zapisu serwer liczy dla jednego stanowiska, gdy wolontariusz otwiera okno zapisu,
- tablica dyspozytora pobiera tylko zmiany zmienione od ostatniego odświeżenia,
- parametr `all=true` znika; w v1 pozwala pobrać do 5000 wierszy z każdej stronicowanej listy (`backend/core/pagination.py`),
- serwer działa na procesach z wątkami albo na większej liczbie procesów i utrzymuje połączenia z bazą między żądaniami,
- wydarzenie „PERF Dispatch” zostaje danymi testowymi, a testy sprawdzają limit zapytań i czasu dla każdego adresu z tabeli 1.

## Otwarte pytania

- TODO(pytanie): czy pominięcie warunku kolizji zmian zostaje w v2. Bez niego bazę można zabezpieczyć ograniczeniem wykluczającym (exclusion constraint), które nie dopuści dwóch przydziałów osoby w tym samym czasie.
- TODO(pytanie): które dane v1 przenieść do pustej bazy v2. Propozycja: konta, uczestnictwa i umowy ze zgodami RODO; zmiany i Dziennik audytu zostają w archiwum v1.
- TODO(pytanie): czy nazwy `RoleGrant`, `TeamMembership` i `ScheduleEntryHost` zostają, czy model ról wynika z osobnego projektu systemu uprawnień.
