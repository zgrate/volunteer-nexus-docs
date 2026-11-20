# Szablony stron

Szkielety dla działów „System” i „Dla programisty”. Sekcję, która nie ma zastosowania, usuń — nie zostawiaj pustej.

Każda strona zaczyna się od frontmatter:

```markdown
---
title: Tytuł strony
sidebar_position: 1
---
```

Skróty [ORE], [JJ], [DS] wskazują źródło opisane w [styl/zrodla.md](styl/zrodla.md).

## Przegląd systemu (C4) [JJ]

Trzy strony, od ogółu do szczegółu. Poziomu klas nie opisujemy.

```markdown
# Kontekst systemu

Jedno zdanie: czym jest system i komu służy.

## Użytkownicy
Role i to, co każda robi w systemie.

## Systemy zewnętrzne
Tabela: system | po co się z nim łączymy | kierunek wymiany danych.

Diagram: system jako jeden blok, wokół użytkownicy i integracje.
```

```markdown
# Kontenery

Jedno zdanie: z jakich uruchamianych części składa się system.

Diagram: usługi i połączenia między nimi.

## Usługi
Tabela: usługa | odpowiedzialność | technologia | z czym się łączy.
```

Poziom komponentów to strony modułów według szablonu poniżej.

## Moduł backendu [ORE]

Te same sekcje w tej samej kolejności na każdej stronie modułu. Sekcja bez zastosowania zostaje z jednym zdaniem („Moduł nie ma zadań w tle.”).

```markdown
# Nazwa modułu

Definicja w jednym–dwóch zdaniach: czym moduł jest i za co odpowiada. Ścieżka: `backend/<app>/`.

## Co robi
Lista: zdanie wprowadzające z dwukropkiem, punkty „nazwa – opis”.

## Modele
Tabela: model | rola | najważniejsze pola i relacje.

## API
Tabela: metoda i ścieżka | co robi | kto ma dostęp.

## Uprawnienia
Kto co może i gdzie jest to sprawdzane w kodzie.

## Zadania w tle
Zadania Celery: nazwa | kiedy się uruchamia | co robi.

## Powiązania z innymi modułami i usługami zewnętrznymi
Z czym współpracuje i w którą stronę idzie zależność.

## Konfiguracja
Ustawienia i zmienne środowiskowe, od których zależy działanie modułu.

## Pułapki
Nieoczywiste zachowania, o których trzeba wiedzieć przed zmianą kodu.
```

## Przepływ

```markdown
# Nazwa przepływu

Jedno zdanie: co i po co się dzieje.

## Uczestnicy
Role użytkowników i usługi biorące udział.

## Przebieg
Diagram sekwencji w Mermaid, pod nim ponumerowane kroki ze ścieżkami do kodu.

## Przypadki brzegowe
Co się dzieje, gdy coś pójdzie nie tak.
```

## Decyzja projektowa (ADR) [JJ]

Plik: `docs/system/decyzje/NNNN-krotki-tytul.md`, numer kolejny według daty decyzji. Zatwierdzonej decyzji nie zmieniamy — nowa decyzja dostaje nowy numer i status starej zmienia się na „Zastąpiona przez NNNN”.

```markdown
# NNNN. Tytuł decyzji

**Status:** Szkic | Zatwierdzona | Zastąpiona przez NNNN

## Problem
Co trzeba było rozstrzygnąć.

## Wymaganie
Potrzeba biznesowa, z której decyzja wynika.

## Kontekst
Ograniczenia obowiązujące w chwili decyzji.

## Rozważane opcje
Lista opcji, każda z zaletami i wadami.

## Decyzja
Co wybraliśmy i dlaczego.

## Konsekwencje
Co to ułatwia, co utrudnia, czego trzeba pilnować.

## Powiązane
Odnośniki do kodu, innych decyzji i stron dokumentacji.
```

## Rysunki, tabele, obrazy [ORE] [DS]

Zapowiedź w tekście, potem rysunek, pod nim podpis. Obraz leży w folderze `img/` obok strony.

```markdown
Stany zgłoszenia przedstawia rysunek 1.

![Stany zgłoszenia](./img/stany-zgloszenia.png)

*Rys. 1. Stany zgłoszenia*
```

## Ramki

Tytuł ramki w nawiasach kwadratowych, treść w osobnych liniach:

```markdown
:::warning[Szkic]
Treść ramki.
:::
```

Dostępne typy: `note`, `tip`, `info`, `warning`, `danger`.
