# Przewodnik stylu

Zasady pisania dokumentacji. Edytuj ręcznie albo powiedz AI w rozmowie — dopisze regułę tutaj.

Skrót w nawiasie kwadratowym wskazuje źródło reguły opisane w [źródłach stylu](zrodla.md): [ORE], [JJ], [DS]. Wpisy oznaczone **(do potwierdzenia)** to wnioski lub propozycje AI. Zatwierdź je, zmień albo usuń; po decyzji znacznik znika.

## Odbiorca i ton

- Działy „System” i „Dla programisty”: czytelnik jest programistą, zna Django i Vue, nie zna tego systemu. **(do potwierdzenia)**
- Ton rzeczowy, bez marketingu i bez żartów. **(do potwierdzenia)**
- Im wyższy poziom opisu, tym bliżej biznesu; im niższy, tym bliżej technologii. Przegląd systemu ma zrozumieć osoba nietechniczna. [JJ] **(do potwierdzenia)**

## Forma gramatyczna

- Trzecia osoba, czas teraźniejszy, podmiotem jest opisywany element: „Backend zapisuje…”, „Moduł odpowiada za…”. Bez „my” i bez „ty”. [ORE] **(do potwierdzenia)**
- Strona czynna, gdy wiadomo, kto wykonuje czynność: „Celery wysyła wiadomość”, nie „Wiadomość jest wysyłana”. **(do potwierdzenia)**
- Stopniowanie wymagań, każde słowo znaczy co innego [ORE] **(do potwierdzenia)**:
  - „musi” – warunek konieczny, bez niego system nie działa,
  - „należy” – czynność do wykonania,
  - „zalecane jest” – rekomendacja, od której można odstąpić.
- **Do decyzji:** instrukcje krok po kroku. [ORE] pisze bezosobowo („należy uruchomić skrypt”). Alternatywa to tryb rozkazujący („Uruchom skrypt”), krótszy i zwykle stosowany w dokumentacji dla programistów. Do czasu decyzji: tryb rozkazujący w ponumerowanych krokach, „należy” w opisach.

## Zdania i akapity

- Pierwsze zdanie strony i sekcji to definicja: czym element jest i do czego służy. Wzór: „X jest … służącym do …” albo „X odpowiada za …”. [ORE] **(do potwierdzenia)**
- Prosty język. Jedno zdanie = jedna myśl, najwyżej dwie linie. Akapit do 4 zdań. [JJ] **(do potwierdzenia)**
- Po regule przykład, zaczynany od „Przykładowo, …”. [ORE] **(do potwierdzenia)**
- Rzeczy zmienne opisuj ogólnie i odsyłaj do kodu po szczegóły. Nie przepisuj list pól, wartości domyślnych ani pełnych sygnatur — kod pokazuje je sam. [JJ] **(do potwierdzenia)**

## Nagłówki i struktura

- Jeden `#` na stronę, równy tytułowi. Dalej `##` i `###`, bez głębszych poziomów. **(do potwierdzenia)**
- Nagłówki bez kropki, wielka litera tylko na początku. **(do potwierdzenia)**
- Strony tego samego rodzaju mają te same sekcje w tej samej kolejności (zob. [szablony](../szablony.md)). Sekcja, która nie ma zastosowania, zostaje z jednym zdaniem wyjaśnienia. [ORE] **(do potwierdzenia)**
- Strona opisuje stan systemu, nie historię zmian. Bez numerów zadań w tytułach i treści. [JJ] **(do potwierdzenia)**
- Przed pisaniem ustal cel strony: samouczek, poradnik „jak zrobić X”, opis (reference) czy wyjaśnienie. Jedna strona = jeden cel. [JJ] **(do potwierdzenia)**

## Listy i tabele

- Lista: zdanie wprowadzające zakończone dwukropkiem, punkty małą literą, przecinek po każdym punkcie i kropka po ostatnim. [ORE] **(do potwierdzenia)**
- Punkt z nazwą: „nazwa – opis”. [ORE] **(do potwierdzenia)**
- Parametry, wartości i zestawienia w tabeli, nie w zdaniu. [ORE] **(do potwierdzenia)**

## Kod i nazwy

- Nazwy z kodu (klasy, pola, endpointy, pliki, polecenia, stany) w `backtickach`, w oryginale, nieodmieniane. [ORE] **(do potwierdzenia)**
- Ścieżki plików względem katalogu głównego repozytorium, np. `backend/shifts/models.py`. **(do potwierdzenia)**
- Bloki kodu zawsze z nazwą języka. **(do potwierdzenia)**

## Język

- Pojęcia domenowe według [słownika](../docs/system/slownik.md), zawsze to samo słowo na tę samą rzecz.
- Pojęcie i skrót objaśnij przy pierwszym użyciu na stronie; rozwinięcie skrótu w nawiasie. [ORE] **(do potwierdzenia)**
- Termin angielski podaj w nawiasie po polskim przy pierwszym użyciu: „kolejka (queue)”. Terminy bez przyjętego polskiego odpowiednika zostają po angielsku (endpoint, commit, serializer). [ORE] **(do potwierdzenia)**
- Polskie cudzysłowy „…”, półpauza „–” jako myślnik. [ORE] **(do potwierdzenia)**

## Diagramy i obrazy

- Architektura w trzech poziomach C4: kontekst, kontenery, komponenty. Poziomu klas nie rysujemy. [JJ] **(do potwierdzenia)**
- Diagramy w Mermaid, w treści strony. **(do potwierdzenia)**
- Każdy rysunek i tabela ma zapowiedź w tekście przed nim i podpis pod nim: „Rys. 1. Stany zgłoszenia”, „Tabela 1. Usługi”. Numeracja w obrębie strony. [ORE] **(do potwierdzenia)**
- Obraz używany na jednej stronie leży obok niej w folderze `img/` i jest wstawiany ścieżką względną: `![Opis](./img/nazwa.png)`. Build pada, gdy pliku brakuje. [DS]
- `static/` tylko dla plików wspólnych dla całej strony (logo, favicon). [DS]
- Obrazy i odnośniki w składni Markdown, nie znacznikami `<img>` i `<a>`. [DS]
- TODO: zrzuty ekranu — czy, w jakim języku UI, w jakim motywie?

## Czego unikać

- Zdań dłuższych niż dwie linie i akapitów-ścian. [ORE, przykład negatywny] **(do potwierdzenia)**
- „funkcjonalność” – napisz, co element robi. **(do potwierdzenia)**
- Zwrotów urzędowych: „w celu zapewnienia” → „żeby”, „niniejsza sekcja przedstawia” → usuń, „w ramach” → „w”. **(do potwierdzenia)**
- Odwołań pozycyjnych: „powyżej”, „trzecia tabela” → „Tabela 3”. **(do potwierdzenia)**
- TODO: inne słowa i zwroty, których nie chcesz widzieć (zob. też „Słowa, których nie używamy” w [pojecia-w-kodzie.md](pojecia-w-kodzie.md)).

## Lista kontrolna strony

Przed uznaniem strony za gotową [JJ]:

1. Aktualna – każde stwierdzenie sprawdzone w kodzie.
2. Zrozumiała – prosty język, pojęcia ze słownika.
3. Łatwa do znalezienia – tytuł mówi, co jest na stronie; strona jest w spisie działu.
4. Łatwa w utrzymaniu – szczegóły zostają w kodzie, strona do nich odsyła.
