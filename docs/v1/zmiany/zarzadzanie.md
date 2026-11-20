---
sidebar_position: 3
title: Zarządzanie zmianami
---

# Zarządzanie zmianami

:::warning[Szkic]
Strona powstała z przeglądu kodu modułu (`backend/shifts/`) i z zakładek ekranu „Zmiany” w panelu administracyjnym. Czeka na sprawdzenie oraz uzupełnienie.
:::

Zmianami zarządza się w panelu administracyjnym, w zakładce „Zmiany”. Strona opisuje, kto może zarządzać zmianami, z czego składa się ekran i jakie czynności są dostępne. Pojęcia objaśnia [słownik](../../system/slownik.md).

## Kto zarządza zmianami

Uprawnienia przedstawia tabela 1.

| Rola | Planowanie (zmiany, siatka, reguły) | Przydzielanie i pomijanie warunków |
| --- | --- | --- |
| administrator wydarzenia | tak | tak |
| operator zmian działu | tak, w swoim dziale | tak, w swoim dziale |
| organizator działu | nie | tak, w swoim dziale |
| dyspozytor działu | nie | tak, w swoim dziale |

*Tabela 1. Uprawnienia do zarządzania zmianami*

## Ekran „Zmiany”

Ekran ma trzynaście zakładek. Przedstawia je tabela 2.

| Zakładka | Do czego służy |
| --- | --- |
| Zmiany | lista i tablica zmian, tworzenie zmiany ręcznie lub z szablonu |
| Szablony | szablony zmian ze stanowiskami i zadaniami |
| Reguły | szablony reguł przypinane do stanowisk i kategorii |
| Lokalizacje | lokalizacje zmian |
| Dostęp | TODO(pytanie) |
| Kreator | TODO(pytanie) |
| Przydział | przydzielanie wolontariuszy do stanowisk |
| Nieobsadzone | TODO(pytanie) |
| Dziennik | dziennik zmian w module |
| Ekran Conops | ekrany pokazujące bieżące i nadchodzące zmiany |
| Boty zgłoszeń | boty przyjmujące zgłoszenia dyspozytorskie |
| Siatka | siatka godzin dla działów w trybie ciągłym |
| Niedyspozycyjność | przegląd i odrzucanie zgłoszonych niedyspozycyjności |

*Tabela 2. Zakładki ekranu „Zmiany”*

## Ustawienia wydarzenia i działu

- **Tryb planowania** ustawia się dla działu: standardowy albo siatka godzin. Dział w trybie siatki nie może mieć stanowisk tworzonych ręcznie.
- **Okno planowania zmian** wynika z dat wydarzenia powiększonych o ustawioną liczbę dni przed i po.
- **Terminy** samodzielnego zapisu i rezygnacji ustawia się dla wydarzenia.
- **Funkcje modułu** włącza się dla wydarzenia osobno: zarządzanie zmianami, dyspozytor, samodzielne oznaczanie obecności, zadania, notatki do zmian, ekran Conops, widok zmian dla uczestników.

## Czynności na zmianach w trybie standardowym

- utworzenie zmiany ręcznie albo z szablonu,
- utworzenie serii zmian jedna po drugiej, z przerwą między nimi,
- skopiowanie zmiany, także razem z przydziałami,
- zamknięcie i ponowne otwarcie zmiany,
- dodanie, zmiana i usunięcie stanowisk.

Zmianami utworzonymi z siatki godzin zarządza wyłącznie siatka; takiej zmiany nie można skopiować.

## Szablony, reguły, lokalizacje

- **Szablon zmiany** zawiera stanowiska i zadania; przy tworzeniu zmiany z szablonu system kopiuje je razem z przypiętymi szablonami reguł.
- **Szablon reguł** opisuje, kto może objąć stanowisko. Szczegóły są na stronie [Przydzielanie wolontariuszy do zmian](przydzielanie.md).
- **Lokalizacja** ma nazwę, kolejność i listę działów, dla których jest widoczna.

## Siatka godzin

Ustawienia siatki – kategorie służby, wymagania obsady i adnotacje – opisuje strona [Definicje i podstawowe typy zmian](../../system/zmiany/definicje.md), a sam ekran – strona [Ekrany zmian](ekrany.md).

## Ekran Conops

Ekran Conops pokazuje bieżące i nadchodzące zmiany wybranych działów lub lokalizacji na osobnym urządzeniu. Każdy ekran ma własny klucz dostępu, pokazywany raz przy utworzeniu; klucz można wymienić. Na ekranie można oznaczyć obecność zbliżeniem identyfikatora.

## Dziennik i eksport

- Zakładka „Dziennik” pokazuje, kto i kiedy zmienił zmiany, stanowiska i przydziały.
- Listy z zakładek oraz siatkę godzin można wyeksportować do pliku Excel; tablicę zmian i siatkę także do obrazu PNG.

TODO(pytanie): opisać zakładki „Dostęp”, „Kreator” i „Nieobsadzone” oraz dodać szkice ekranów.
