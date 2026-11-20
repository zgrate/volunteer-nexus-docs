# doc-writer — zasady dla AI

Tu powstaje dokumentacja systemu Volunteer Nexus (Docusaurus, po polsku). Piszemy ją wspólnie z użytkownikiem.

To osobne repozytorium, podpięte jako podmoduł `doc-writer/` w repozytorium `volunteer-crm`. Dokumentowany kod leży w katalogu nadrzędnym (`../backend`, `../frontend`). Ścieżki w tych zasadach i na stronach dokumentacji są podawane względem katalogu głównego `volunteer-crm`. Zmiany w dokumentacji commituje się tutaj, a nie w repozytorium nadrzędnym.

## Przed pisaniem

Przeczytaj w całości:

1. `styl/przewodnik.md` — ton, forma, formatowanie,
2. `docs/system/slownik.md` — obowiązujące pojęcia (jedyny słownik; jest też pierwszą stroną działu „System”),
3. `styl/przyklady.md` — pary „źle → dobrze”,
4. odpowiedni szkielet z `szablony.md`.

`styl/zrodla.md` opisuje dokumenty-wzorce wskazane przez użytkownika i wnioski z nich. Czytaj je, gdy reguła w przewodniku jest niejasna. Nowe źródło od użytkownika: dopisz tam sekcję „co bierzemy / czego nie bierzemy”, potem przenieś wnioski do przewodnika i szablonów ze skrótem źródła.

`styl/pojecia-w-kodzie.md` to notatki wewnętrzne do słownika: słowa, których nie używamy, oraz nazwy pojęć w kodzie (słownik publikowany zawiera tylko pojęcie i definicję, pojęcia wielką literą). Przeczytaj je razem ze słownikiem. Aktualizuj je razem ze słownikiem.

Wpisy z „(do potwierdzenia)” stosuj, ale przy pierwszym użyciu zapytaj użytkownika o potwierdzenie. Pojęcie ze słownika bez definicji: zapytaj o definicję, nie wymyślaj jej.

## Zasady

- Dokumentacja ma trzy działy i każdy ma inne źródło prawdy:
  - `docs/system/` — jak system **ma** działać: założenia, pojęcia, opis każdej funkcji. Źródłem prawdy jest użytkownik, nie kod. Nie wpisuj tu nazw z kodu, ścieżek plików ani opisu ekranów v1. Gdy kod v1 robi coś inaczej, niż mówi strona, nie poprawiaj strony pod kod — zapytaj.
  - `docs/v1/` — co istnieje w wersji 1 i jak działa: dokumentacja techniczna i moduły. Źródłem prawdy jest kod; każde stwierdzenie sprawdź w kodzie i podaj ścieżkę pliku względem katalogu głównego repozytorium.
  - `docs/v2/` — nowa wersja, budowana na założeniach z `docs/system/` i wiedzy z `docs/v1/`. Źródłem prawdy są decyzje użytkownika.
- Pisz po polsku. Nazwy z kodu zostają w oryginale, w `backtickach`. Pojęcia domenowe tylko według słownika; brakuje pojęcia — zapytaj i dopisz.
- `README.md`, `agent-instructions.md`, `instruction.md` i `docs/*.md` w katalogu głównym to wskazówki, nie źródło — bywają nieaktualne. Nie przepisuj z nich bez weryfikacji w kodzie.
- Nie wiesz albo kod jest niejednoznaczny — zapytaj lub zostaw `TODO(pytanie): …`. Nie zmyślaj.
- Jedna strona = jeden temat. Diagramy w Mermaid.
- Pliki stron: `docs/<dział>/<folder>/<nazwa-bez-polskich-znakow>.md`. Nowy folder dostaje `_category_.json`; gdy ta sama nazwa folderu występuje w dwóch działach, drugi dostaje w tym pliku własny `key`.
- Foldery działu „System” mają dwa rodzaje. Folder modułu (Zmiany, Benefity, Dokumenty, Powiadomienia, Na wydarzeniu, RODO) opisuje, jak obszar ma działać: pojęcia, zasady, warunki. Folder roli (Wolontariusz, Organizator, Administrator) opisuje, co ta osoba robi. Zasady pisz raz, w folderze modułu; strona w folderze roli odsyła do nich odnośnikiem zamiast je powtarzać.
- Sprawy techniczne v1 (budowa, wdrożenie, uruchomienie) idą do `docs/v1/dokumentacja-techniczna/`, a opis działania modułów v1 i ich ekranów do `docs/v1/<moduł>/`.

## Gdzie szukać

- `graphify-out/GRAPH_REPORT.md` — mapa systemu,
- `backend/config/` — ustawienia i routing URL,
- `backend/<app>/models.py`, `views.py`, `services.py`, `tasks.py` — moduły,
- `docker-compose*.yml`, `docker/` — usługi i wdrożenie,
- `frontend/src/i18n/messages/pl.ts` — nazwy używane w interfejsie,
- `frontend/docs/STYLE_GUIDE.md` — styl frontendu.

## Pętla uczenia

Gdy użytkownik poprawi sformułowanie, słowo lub strukturę, w tej samej turze:

- ogólna reguła → dopisz do `styl/przewodnik.md`,
- słowo lub pojęcie → dopisz lub zmień w `docs/system/slownik.md`,
- konkretne zdanie → dopisz parę do `styl/przyklady.md`.

Potem zastosuj poprawkę także na już napisanych stronach.

## Sprawdzenie

Po zmianach uruchom `npm run build` — build pada na martwych linkach. Podgląd: `npm start` (port 3100).
