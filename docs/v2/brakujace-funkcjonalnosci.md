---
sidebar_position: 2
title: Brakujące funkcjonalności
---

# Brakujące funkcjonalności

:::warning[Szkic]
Strona powstała z przeglądu „Nexus Post-Event Review” i z wyszukiwania w kodzie. Lista nie jest zamknięta i nie ma jeszcze ustalonej kolejności prac.
:::

Strona zbiera funkcje, o które prosili użytkownicy v1, a których system nie ma. Jest listą kandydatów do v2, nie planem.

## Źródło i zakres

Źródłem jest przegląd „Nexus Post-Event Review” (wersja 28, opublikowana 28 października 2026 r.). Przegląd powstał z 478 wiadomości z czatu wsparcia wolontariuszy z okresu od 4 sierpnia do 19 października 2026 r. oraz z kodu systemu. Numery w kolumnie „Przegląd” wskazują jego sekcje.

Tabele 1–7 obejmują nowe możliwości. Wydajność, błędy i porządki w kodzie zbiera na końcu tabela 8. Wyjątkiem jest system uprawnień: przegląd traktuje go jako porządek w kodzie, ale v2 potrzebuje go jako podstawy innych funkcji, więc stoi w tabeli 2.

Strona pomija pozycje, które od czasu przeglądu zostały zrobione w v1.

Priorytety pochodzą z przeglądu:

- P1 – do zrobienia przed następnym wydarzeniem,
- P2 – realna uciążliwość z jasnym rozwiązaniem,
- P3 – miło mieć albo kwestia do rozstrzygnięcia.

Kolumna „Stan w v1” opisuje kod z 20 listopada 2026 r. „Brak” oznacza, że wyszukiwanie w kodzie nie znalazło ani modelu, ani ekranu dla tej funkcji. „Nie sprawdzono” oznacza, że stan pochodzi z przeglądu i nie był weryfikowany ponownie.

## Planowanie zmian

| Funkcja | Opis | Przegląd | Priorytet | Stan w v1 |
| --- | --- | --- | --- | --- |
| Tryb roboczy grafiku | Zmiany powstają jako niewidoczne dla wolontariuszy i są publikowane razem; powiadomienia o przydziałach wychodzą raz, przy publikacji. | 1.3 | P3 | brak |
| Import zmian z Excela | Plik-wzór do pobrania, wgranie arkusza, podgląd z błędami i utworzenie zmian. Osobny wzór dla działów planujących w siatce godzin. | 8.9 | P2 | brak; istnieje tylko eksport |
| Powtarzalna obsada | Wzór „każdego dnia wydarzenia o 10:00 i 16:00 po 2 godziny”, z którego powstają zmiany. | 1.8 | P2 | nie sprawdzono |
| Zmiany dyżurne | Zmiany, które mogą nakładać się na inne zmiany i na punkty programu. | 1.13 | P2 | nie sprawdzono |
| Zmiana przypięta do punktu programu | Powiązanie zmiany z konkretnym punktem programu zamiast z godziną. Gdy punkt programu zmieni termin, zmiana przesuwa się razem z nim; gdy zostanie odwołany, zmiana też jest odwoływana. | lista „na przyszły rok”; zgłoszenie z 20.11.2026 | – | częściowo; siatka pokazuje program jako kolumnę, powiązania i automatycznego przesuwania nie ma |
| Filtrowanie osób po zespole | Filtr zespołu w siatce godzin i w widokach zmian. | 1.10 | P2 | nie sprawdzono |
| Ustawiany krok czasu | Krok siatki i innych widoków planowania inny niż 30 minut. | 1.11 | P3 | brak; krok jest stały |
| Kreator następnej edycji | Organizator kopiuje strukturę poprzedniego wydarzenia i zaprasza jego wolontariuszy; wolontariusz przenosi swoje dane w kilku krokach. | zakładka „Next edition wizard” | P2 | brak |

*Tabela 1. Planowanie zmian*

## Uprawnienia i widoczność

Nowy system uprawnień oparty na rolach jest jednym z najwyższych priorytetów v2. W v1 uprawnienia są sprawdzane osobno w wielu miejscach kodu, a konto administratora omija wszystkie sprawdzenia. Przez to nie da się ustawić, co widzi która rola, ani przetestować systemu z perspektywy zwykłego wolontariusza. Od nowego systemu uprawnień zależą pozostałe funkcje z tej tabeli.

| Funkcja | Opis | Przegląd | Priorytet | Stan w v1 |
| --- | --- | --- | --- | --- |
| System uprawnień oparty na rolach | Jedno miejsce, które rozstrzyga, co może każda rola: wolontariusz, lider, koordynator, organizator, dyspozytor, operator zmian, administrator wydarzenia. Zastępuje sprawdzenia rozproszone po kodzie i obejście dla konta administratora. | 2.1 | P1, jeden z najwyższych w v2 | brak; sprawdzenia są rozproszone w około 90 miejscach |
| Tryb „działaj jako wolontariusz” | Administrator ogląda system tak jak zwykły wolontariusz albo jako wskazana osoba, z widocznym paskiem, zapisem w dzienniku i zablokowanymi zmianami danych. | 8.3 | P2 | brak |
| Numery telefonów | Numer telefonu w profilu, widoczny stopniowo: dla działu, dla organizatorów, dla nikogo. | 2.5 | P2 | brak pola |
| Ukryci członkowie działu | Członek działu niewidoczny na listach dla pozostałych. | 2.9 | P2 | brak |

*Tabela 2. Uprawnienia i widoczność*

## Powiadomienia

| Funkcja | Opis | Przegląd | Priorytet | Stan w v1 |
| --- | --- | --- | --- | --- |
| Wyciszenie na czas planowania | Wstrzymanie powiadomień, gdy planujący tworzy lub zmienia wiele przydziałów naraz. Tryb roboczy grafiku rozwiązuje ten sam problem. | 3.2 | P1 | nie sprawdzono |
| Aktualizacje na żywo | Ekrany odświeżają się po sygnale z serwera zamiast odpytywać go co kilka sekund. | 8.7 | P2 | brak; ekrany odpytują serwer |

*Tabela 3. Powiadomienia*

## Praca na wydarzeniu

| Funkcja | Opis | Przegląd | Priorytet | Stan w v1 |
| --- | --- | --- | --- | --- |
| Tryb „dostępny teraz” | Wolontariusz zgłasza, że jest do dyspozycji przez wskazany czas, a dyspozytor widzi listę takich osób i przydziela im zadania. | 4.2 | P3 | brak |
| Raporty ze zmiany | Uporządkowany wpis zamiast notatki: nieobecność, spóźnienie, zgubiony sprzęt, zdarzenie związane z bezpieczeństwem. Ma kategorię, wagę i stan; lista raportów zastępuje dziennik prowadzony w Excelu. | 8.2 | P2 | częściowo; są tylko notatki tekstowe |
| Wypożyczanie sprzętu | Kto ma który egzemplarz (np. radio), od kiedy i czy go oddał. Bez rezerwacji i katalogu. | 8.1 | P3 | brak |
| Wyjście ze zmiany identyfikatorem | Odbicie identyfikatorem przy wejściu i wyjściu, z zapisem godziny wyjścia i sposobu oznaczenia obecności. | 8.10 | P2 | częściowo; ekran Conops oznacza wejście, wyjścia nie ma |
| Przywracanie z historii zmian | Cofnięcie rekordu do wcześniejszej wersji jednym przyciskiem, zaczynając od przydziałów. | 8.5 | P3 | brak |

*Tabela 4. Praca na wydarzeniu*

## Wolontariusz

| Funkcja | Opis | Przegląd | Priorytet | Stan w v1 |
| --- | --- | --- | --- | --- |
| Eksport do kalendarza | Adres kalendarza z własnymi zmianami, który wolontariusz dodaje do telefonu. | 5.3 | P2 | brak |
| Grafik dostępny offline | Przycisk, który pobiera na urządzenie cały grafik wydarzenia, także ekrany jeszcze nieotwierane, i trzyma go bez terminu. | 9.2 | P2 | brak; aplikacja pokazuje tylko dane z ostatnio otwartych ekranów |
| Zmiany wykonane offline | Oznaczenie obecności lub notatka zapisane bez sieci i wysłane po odzyskaniu połączenia. | 9.3 | P3 | brak |
| Własny układ i motyw | Wolontariusz lub lider układa moduły na ekranie, zapisuje układ z kolorami i udostępnia go innym. | 10 | P3 | brak |
| Język w profilu i spójny język powiadomień | Wolontariusz wybiera język w profilu, a wszystkie powiadomienia przychodzą w tym języku. | zgłoszenie z 20.11.2026 | – | częściowo; język użytkownika jest zapisywany, ale profil nie ma pola wyboru, a powiadomienia wybierają język na trzy sposoby: z języka użytkownika, z języka żądania albo z języka zapisanego przy aplikacji |

*Tabela 5. Wolontariusz*

## Rekrutacja i formularze

Obie pozycje zgłoszono 20 listopada 2026 r., poza przeglądem, więc nie mają numeru sekcji ani priorytetu.

| Funkcja | Opis | Przegląd | Priorytet | Stan w v1 |
| --- | --- | --- | --- | --- |
| Moduł formularzy | Osoba z odpowiednią rolą tworzy formularz, który jest dostępny w Centrum informacji. Formularz zbiera odpowiedzi od wszystkich wolontariuszy albo od wybranej grupy. Zależy od systemu uprawnień opartego na rolach. | – | – | częściowo; istnieją tylko pola niestandardowe w profilu i w aplikacji wolontariackiej |
| Lista osób z zakazem wolontariatu | Lista osób z zakazem. Wpis zawiera dane osoby (adres e-mail, pseudonim, PESEL, imię i nazwisko), powód zakazu, datę jego nałożenia i termin, do którego obowiązuje. Gdy taka osoba złoży aplikację wolontariacką, przy aplikacji pojawia się wyraźne ostrzeżenie, a administrator może ją przyjąć dopiero po potwierdzeniu w osobnym oknie. | – | – | brak |

*Tabela 6. Rekrutacja i formularze*

Pytania do listy osób z zakazem:

- TODO(pytanie): po czym system rozpoznaje osobę z listy – po adresie e-mail, po numerze PESEL, czy po dowolnym z pól; w v1 numer PESEL nie jest stałym polem profilu, tylko polem niestandardowym,
- TODO(pytanie): kto widzi listę i kto może dodawać do niej wpisy,
- TODO(pytanie): lista przechowuje dane osobowe, w tym PESEL, osób, które nie są wolontariuszami – potrzebna jest podstawa prawna i termin usuwania wpisów po wygaśnięciu zakazu.

## Integracje

| Funkcja | Opis | Przegląd | Priorytet | Stan w v1 |
| --- | --- | --- | --- | --- |
| Prelegenci | Pobieranie prelegentów z systemu zgłoszeń programu (Pretalx). Prelegent ma profil, umowy i wybrane benefity, ale nie pojawia się w planowaniu zmian. | 8.6 | P2 | brak |
| Benefity do Foxcons | Wysyłanie wybranych benefitów wolontariusza do Foxcons. Wymaga najpierw ustalenia z Foxcons, co benefit oznacza po jego stronie. | 8.8 | P2 | brak |
| Identyfikatory z systemu rejestracji | Powiązanie identyfikatora z rejestracji z kontem w systemie. Wymaga specyfikacji od strony Foxcons. | lista „na przyszły rok” | – | częściowo; ekran Conops pyta Foxcons o właściciela identyfikatora |

*Tabela 7. Integracje*

## Wydajność, poprawki i drobne usprawnienia

Tabela 8 zbiera pozostałe pozycje przeglądu, które nie są nową funkcją: wydajność, błędy, wygodę obsługi oraz porządki w kodzie i w sposobie pracy. Stan tych pozycji pochodzi z przeglądu i nie był sprawdzany ponownie, z jednym wyjątkiem opisanym w tabeli.

| Rodzaj | Pozycja | Opis | Przegląd | Priorytet |
| --- | --- | --- | --- | --- |
| wydajność | Kolizje wyliczane z góry | Kolizje z programem i innymi zmianami są liczone od nowa przy każdym żądaniu; mają być zapisane i odświeżane przy zmianie danych. | 1.1 | P1 |
| wydajność | Reguły na liście zmian | Drzewo reguł jest budowane osobno dla każdego stanowiska; ma być wczytywane raz na żądanie. | 1.2 | P1 |
| wydajność | Przepisanie silnika reguł | Nowy, szybszy silnik reguł, sprawdzony na zanonimizowanej kopii bazy produkcyjnej. | 1.15 | P1 |
| wydajność | Wysyłka powiadomień w tle | Powiadomienia są wysyłane w trakcie obsługi żądania; mają wychodzić jako zadanie w tle. | 3.3 | P2 |
| wydajność | Ładowanie stron na żądanie | Interfejs pobiera od razu kod prawie wszystkich stron, także administracyjnych. | 6 | – |
| poprawka | Podwójne powiadomienia | Brak ochrony przed wysłaniem tego samego powiadomienia dwa razy. | 3.1 | P1 |
| poprawka | Dane po wylogowaniu | Wylogowanie nie usuwa danych zapisanych na urządzeniu, więc następna osoba na tym samym telefonie może zobaczyć cudze zmiany i profil. Sprawdzone w kodzie 20 listopada 2026 r.: nadal nieusuwane. | 9.1 | P1 |
| poprawka | Pusta lista dyspozytora | Dyspozytor bez stanowisk dostaje błąd zamiast pustej listy. | 2.2 | P2 |
| poprawka | Zakres reguły | Reguła nie rozróżnia jednoznacznie działu, sekcji i zespołu, przez co łatwo utworzyć ją dla złego zakresu. | 2.3 | P2 |
| poprawka | Członkostwa po usunięciu | Usunięcie wolontariusza z wydarzenia zostawia jego członkostwa w działach i role. | 2.6 | P2 |
| poprawka | Lokalizacja bez sekcji | Do rozstrzygnięcia: czy lokalizacja bez sekcji jest widoczna dla wszystkich, czy ukryta. | 2.4 | P2 |
| poprawka | Komunikaty błędów dyspozytora | Ekran pokazuje błąd wczytywania tam, gdzie danych po prostu nie ma. | 4.4 | P2 |
| poprawka | Kreator nie pamięta dnia | Kreator zmian wraca do pierwszego dnia zamiast do ostatnio wybranego. | 1.5 | P2 |
| poprawka | Aplikacja mimo zamkniętej rekrutacji | Da się aplikować na wydarzenie z zamkniętą rekrutacją, gdy inne wydarzenie ma ją otwartą. | 2.7 | P3 |
| poprawka | Samodzielny zapis domyślnie wyłączony | Domyślne ustawienie myli liderów; stanowisko wygląda na zepsute. | 2.8 | P3 |
| poprawka | Pole „Lokalizacja” w kategorii | Pole w formularzu kategorii siatki do usunięcia. | 1.14 | P3 |
| wygoda | Układ na telefon | Ekrany „Zmiany”, „Live” i siatka nie mają układu dla wąskiego ekranu. | 5.1 | P1 |
| wygoda | Przydzielanie z telefonu | Tryb telefoniczny dla kreatora przydziału i wszystkich osi czasu. | 5.8 | P1 |
| wygoda | Klawisz Esc | Esc nie zamyka trzech okien. | 5.2 | P2 |
| wygoda | Czytelność grafiku | Wyraźne oznaczenie dnia, linia „teraz”, ikony stanu obecności. | 5.4 | P2 |
| wygoda | Ostrzeżenie przy zapisie | Ostrzeżenie, gdy wolontariusz zapisuje się sam na czas, w którym zgłosił niedyspozycyjność. | 5.6 | P2 |
| wygoda | Oś czasu przydziału | Oznaczenie własnych zmian i program jako osobna warstwa. | 5.7 | P2 |
| wygoda | Ukrywanie nieużywanych godzin | Sekcja ukrywa godziny, których nie obsadza, w obu trybach planowania. | 1.17 | P2 |
| wygoda | Przycisk „Pobierz oryginał” | Przycisk przy dokumencie do podpisu zamiast pod historią. | 5.10 | P2 |
| wygoda | Filtry planowania w jednym miejscu | Trzy widoki planowania mają filtry w różnych miejscach i pamiętają je osobno. | 1.6 | P3 |
| wygoda | Eksport PNG | Pytanie przy eksporcie, czy dołączyć znacznik godzin. | 1.12 | P3 |
| wygoda | Animacja zmiany kolejności | Wiersze siatki przesuwają się przy zmianie kolejności osób. | 1.16 | P3 |
| wygoda | Odświeżenie wyglądu | Nowy wygląd całej aplikacji; przegląd zawiera sześć szkiców. | 5.9 | P3 |
| kod | Podział dużych plików | Największe pliki serwera i interfejsu mają po około 3000 wierszy; każda zmiana w nie trafia. | 6 | P3 |
| kod | Testy jednostkowe interfejsu | Interfejs ma tylko testy w przeglądarce; brakuje testów pojedynczych funkcji. | 6 | – |
| kod | Podział plików tłumaczeń | Jeden plik na język z wszystkimi napisami aplikacji. | 6 | – |
| kod | Brakujące testy serwera | Test granicy uprawnień administratora, widoczności danych kontaktowych i liczby zapytań na liście zmian. | 6 | – |
| proces | Start po restarcie serwera | Środowisko testowe nie wstało po restarcie serwera i było niedostępne przez dzień. | 7 | – |
| proces | Zbieranie uwag w trakcie wydarzenia | Polecenie w bocie, które zapisuje uwagę jako notatkę. | 7 | – |

*Tabela 8. Wydajność, poprawki i drobne usprawnienia*

## Otwarte pytania

- TODO(pytanie): które z tych funkcji wchodzą do v2, a które zostają poza zakresem.
- TODO(pytanie): przegląd zawiera też zalecenia do widoku siatki (G1–G14, m.in. cofanie skrótem klawiszowym, liczenie godzin przed, w trakcie i po wydarzeniu, widok stanowisk). Nie ma ich na tej liście – czy je dopisać.
