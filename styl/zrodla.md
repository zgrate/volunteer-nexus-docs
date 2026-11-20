# Źródła stylu

Dokumenty wskazane przez użytkownika jako wzorce i wnioski, które z nich wyciągnęliśmy. Reguły wynikające z tych wniosków są w [przewodniku](przewodnik.md) i w [szablonach](../szablony.md), oznaczone skrótem źródła.

Nowe źródło: dopisz sekcję tutaj, potem przenieś wnioski do przewodnika lub szablonów.

## [ORE] Dokumentacja architektury Platformy Technologicznej epodreczniki.pl

PCSS, wersja 3.0, 2015, 44 strony. <https://ore.edu.pl/attachments/article/6993/Dokumentacja_architektury_Platformy_Technologicznej.pdf>

Wzorzec dla: układu dokumentacji architektury, opisu komponentu, formy gramatycznej.

### Co bierzemy

- **Układ całości.** Wstęp (czym jest system, jeden diagram ogólnej architektury) → „Podstawowe informacje” (pojęcia potrzebne do zrozumienia reszty) → komponenty, każdy osobno.
- **Stały szkielet komponentu.** Wszystkie 15 komponentów ma te same sekcje w tej samej kolejności: „Krótki opis komponentu”, „Realizowane funkcjonalności”, „Interfejsy do innych komponentów i powiązania z zewnętrznymi usługami”, „Wymagania sprzętowe i wobec systemu operacyjnego”, „Instalacja i konfiguracja”. Sekcja bez treści dostaje jedno zdanie („Zgodnie z wymaganiami RabbitMQ Server.”), a nie znika.
- **Pierwsze zdanie to definicja.** „Repozytorium AV jest systemem służącym do przechowywania, przetwarzania oraz udostępniania treści audiowizualnych.”
- **Forma gramatyczna.** Trzecia osoba, czas teraźniejszy, podmiotem jest komponent: „Usługa realizuje…”, „Moduł przechowywany jest…”. Bez „my” i bez „ty”.
- **Stopniowanie wymagań.** „musi” = warunek konieczny, „należy” = czynność do wykonania, „zalecane jest” = rekomendacja. Każde z tych słów znaczy co innego.
- **Pojęcia.** Definicja przy pierwszym użyciu; skrót rozwinięty w nawiasie: „WOMI (Wieloformatowe Obiekty Multimedialne i Interaktywne)”. Termin angielski w nawiasie po polskim: „odrębne kolejki (queues)”, „węzeł przechowujący (storage node – SNode)”.
- **Nazwy z kodu wyróżnione** (tam kursywą: stany `NotFound`, `AddError`) i nieodmieniane.
- **Listy.** Zdanie wprowadzające zakończone dwukropkiem; punkty małą literą; wzór „nazwa – opis”.
- **Rysunki i tabele.** Podpis („Rys. Stany materiału w repozytorium”, „Tabela. Profile kodowania wideo”) i zapowiedź w tekście przed rysunkiem. Parametry i wartości zawsze w tabeli, nie w zdaniu.
- **Przykład po regule**, zaczynany od „Przykładowo, …”.

### Czego nie bierzemy

- Zdań na 3–4 linie i akapitów-ścian (cały „Wstęp” to jeden akapit). Sprzeczne z [JJ] „napisana prostym językiem”.
- Słowa „funkcjonalność” w każdym zdaniu i zwrotów urzędowych („w celu zapewnienia”, „niniejsza sekcja przedstawia”).
- Strony biernej tam, gdzie znany jest wykonawca („wykonywanie kopii wykonywane jest”).
- Podpisów bez numerów i odwołań typu „trzecia tabela”.
- Sekcji o sprzęcie i systemie operacyjnym — u nas zastępuje ją konfiguracja usług Docker.

## [JJ] Jak tworzyć dokumentację? Doświadczenia Software Engineera

Piotr Krysiak, justjoin.it, 2022. <https://justjoin.it/blog/jak-tworzyc-dokumentacje>

Wzorzec dla: tego, co dokumentować i na jakim poziomie szczegółu. O stylu zdań artykuł prawie nie mówi.

### Co bierzemy

- **Cztery cechy dobrej dokumentacji:** aktualna, zrozumiała („napisana prostym językiem”), łatwa do znalezienia, łatwa w utrzymaniu. Używamy ich jako listy kontrolnej strony.
- **C4, trzy poziomy.** Kontekst (system jako jeden blok wśród integracji), kontenery („mapa systemu”), komponenty. Poziomu klas nie rysujemy: „nikt tej wiedzy nie szuka, jest też niemożliwa do utrzymania”.
- **Im wyższy poziom, tym bliżej biznesu;** im niższy, tym bliżej technologii.
- **ADR dla decyzji.** Stały szablon i numer kolejny. Pola: opis problemu, status, wymaganie biznesowe, kontekst (ograniczenia), opcje do wyboru, linki do powiązanych artefaktów.
- **Rzeczy zmienne opisujemy ogólnie,** a po szczegóły odsyłamy do kodu — „jedynego miejsca godnego zaufania”. Nie przepisujemy do dokumentacji tego, co kod pokazuje sam.
- **Strona nie jest związana z zadaniem.** Bez numerów zgłoszeń w tytułach; opisujemy stan systemu, nie historię zmian.
- **Najpierw cel strony, potem forma** (podział z documentation.divio.com: samouczek, poradnik, opis, wyjaśnienie).
- **Strona z odnośnikami** („Jumpstation”): repozytoria, środowiska, narzędzia.

### Poza zakresem źródła

Artykuł wprost pomija instrukcje dla użytkowników końcowych. Dla dokumentacji użytkowej potrzebne będzie inne źródło.

## [DS] Docusaurus — Static Assets

<https://docusaurus.io/docs/static-assets>, <https://docusaurus.io/docs/markdown-features/assets>

Wzorzec dla: obrazów i plików do pobrania.

### Co bierzemy

- **Obraz używany na jednej stronie leży obok niej** i jest wstawiany ścieżką względną. Build dodaje do nazwy skrót zawartości i pada, gdy pliku brakuje.
- **`static/` tylko dla plików wspólnych** (logo, favicon, plik potrzebny pod stałym adresem). Zawartość trafia do katalogu głównego buildu bez przetwarzania.
- **Składnia Markdown, nie znaczniki `<img>` i `<a>`.** Znaczników JSX Docusaurus nie przetwarza, więc brak pliku wyjdzie dopiero jako błąd 404.
- **Odnośniki to ścieżki do plików,** nie adresy URL. Adresu bazowego nie wpisujemy na sztywno.
