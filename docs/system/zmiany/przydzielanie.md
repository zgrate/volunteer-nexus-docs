---
sidebar_position: 2
title: Przydzielanie wolontariuszy do zmian
---

# Przydzielanie wolontariuszy do zmian

:::warning[Szkic]
Strona powstała z przeglądu kodu modułu (`backend/shifts/`) i czeka na sprawdzenie oraz uzupełnienie. Nie opisuje jeszcze ekranów.
:::

Przydział to przypisanie wolontariusza do stanowiska na zmianie. Strona opisuje, jak przydział powstaje, co system sprawdza i co dzieje się z przydziałem później. Pojęcia objaśnia [słownik](../slownik.md).

## Sposoby przydzielania

Przydział powstaje na trzy sposoby:

- osoba zarządzająca zmianami działu przydziela wolontariusza do stanowiska,
- wolontariusz zapisuje się sam na stanowisko, które na to pozwala,
- w siatce godzin operator zmian maluje komórki, a system sam tworzy zmiany, stanowiska i przydziały.

## Warunki przydziału

Przed każdym przydziałem system sprawdza warunki w stałej kolejności. Przedstawia je tabela 1.

| Warunek | Co sprawdza | Skutek |
| --- | --- | --- |
| wolne miejsca | czy stanowisko ma jeszcze wolne miejsce | blokuje |
| reguły stanowiska | reguły ustawione przez organizatorów | blokuje |
| przynależność do działu | czy wolontariusz jest członkiem działu stanowiska | blokuje |
| przynależność do zespołu | czy wolontariusz jest członkiem zespołu stanowiska | blokuje |
| kolizja ze zmianą | czy wolontariusz ma w tym czasie inny przydział | blokuje |
| kolizja z punktem programu | czy wolontariusz prowadzi w tym czasie punkt programu | blokuje |
| niedyspozycyjność pełna | czy wolontariusz zgłosił, że w tym czasie nie pracuje | blokuje |
| niedyspozycyjność warunkowa | czy wolontariusz zgłosił dostępność warunkową | ostrzega |
| godziny | czy godziny zaplanowane przekroczą zadeklarowane | ostrzega |

*Tabela 1. Warunki sprawdzane przy przydziale*

Kolejność i podział na warunki blokujące i ostrzegające określa `ASSIGNMENT_RULE_ORDER` w `backend/shifts/rule_engine.py`.

Przy malowaniu siatki godzin system sprawdza tylko reguły kategorii, przynależność do zespołu i niedyspozycyjność.

## Reguły stanowiska

Reguły ustawiają organizatorzy. Reguła ma jeden z trzech rodzajów:

- rejestracja – wolontariusz ma zaakceptowaną aplikację na wydarzenie,
- warunek pola – wartość pola w profilu, wbudowanego lub niestandardowego, spełnia warunek,
- przynależność – wolontariusz należy albo nie należy do wskazanego działu lub zespołu.

Reguły łączy się w grupy spójnikiem „i” albo „lub”; grupy można zagnieżdżać i negować. Grupy tworzą szablon reguł. Szablon przypina się do stanowiska, do stanowiska w szablonie zmiany albo do kategorii służby w siatce godzin. Stanowisko spełnia warunek, gdy wolontariusz przechodzi wszystkie przypięte szablony.

## Pominięcie warunku

Warunek blokujący może pominąć osoba zarządzająca zmianami działu: administrator wydarzenia, organizator, dyspozytor albo operator zmian tego działu. System zapisuje przy przydziale, które warunki zostały pominięte i jaki był wynik sprawdzenia.

Samodzielny zapis nie może pominąć żadnego warunku.

## Samodzielny zapis

Wolontariusz może zapisać się sam, gdy spełnione są wszystkie warunki:

- stanowisko ma włączony samodzielny zapis,
- zmiana jest otwarta,
- wolontariusz jest członkiem działu stanowiska,
- nie minął termin zapisów ustawiony dla wydarzenia.

Wolontariusz może też sam zrezygnować z przydziału, dopóki nie minie termin rezygnacji ustawiony dla wydarzenia.

Stanowiska utworzone z siatki godzin mają samodzielny zapis wyłączony.

## Niedyspozycyjność

Niedyspozycyjność ma dwa rodzaje: pełną i warunkową. Powstaje na cztery sposoby:

- wolontariusz zgłasza ją sam, w okresie wyznaczonym dla wydarzenia; zgłoszenie nie może nachodzić na jego istniejący przydział,
- administrator wpisuje ją za wolontariusza,
- system tworzy ją z kategorii-blokady w siatce godzin,
- system tworzy ją z dat przyjazdu i wyjazdu wolontariusza.

Zgłoszenie działa od razu, bez akceptacji. Administrator może odrzucić zgłoszenie wolontariusza, podając powód; wolontariusz dostaje powiadomienie.

## Godziny

System sumuje czas trwania zmian, do których wolontariusz jest przydzielony, i porównuje go z godzinami zadeklarowanymi. Przekroczenie daje ostrzeżenie przy przydziale i znacznik „zaplanowane/zadeklarowane” przy wolontariuszu.

Godziny zaplanowane nie są godzinami przepracowanymi. Przepracowane godziny wpisuje się osobno, w module benefitów.

## Po przydziale

- **Zastępstwo.** Nowy przydział zastępuje stary na tym samym stanowisku; stary zostaje anulowany, a obie osoby dostają powiadomienie.
- **Obecność.** Obecność oznacza dyspozytor, wolontariusz sam w wyznaczonym czasie przed zmianą albo ekran Conops po zbliżeniu identyfikatora.
- **Przypomnienia.** System wysyła przypomnienie 60 i 15 minut przed zmianą oraz w chwili jej rozpoczęcia.
- **Zadania.** Na zmianie z włączonymi zadaniami dyspozytor przydziela zadania osobom obsadzonym na stanowiskach.

TODO(pytanie): opisać ekrany przydziału („Przydział”, „Nieobsadzone”) i widok wolontariusza.
