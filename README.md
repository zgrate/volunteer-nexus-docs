# Volunteer Nexus — dokumentacja

Dokumentacja techniczna i użytkowa systemu Volunteer Nexus, budowana w Docusaurusie. Repozytorium jest podmodułem repozytorium `volunteer-crm` i leży w nim w folderze `doc-writer/`.

## Uruchomienie

Gotowa strona w kontenerze (nginx, port 3200):

```bash
docker compose up --build -d
```

Port zmienia zmienna `DOCS_PORT`. Kontener serwuje zbudowaną stronę, więc po zmianie treści trzeba uruchomić polecenie ponownie.

Podgląd na żywo podczas pisania (port 3100, odświeża się po zapisie pliku):

```bash
npm install
npm start
```

Sprawdzenie strony, w tym martwych odnośników:

```bash
npm run build
```

## Co gdzie jest

- `docs/system/` – jak system ma działać: założenia, pojęcia i opis funkcji,
- `docs/v1/` – co istnieje w wersji 1: dokumentacja techniczna i moduły,
- `docs/v2/` – nowa wersja systemu,
- `styl/` – przewodnik stylu, źródła stylu, przykłady i notatki do słownika,
- `szablony.md` – szkielety stron,
- `CLAUDE.md` – zasady dla AI przy pisaniu dokumentacji,
- `static/diagramy/` – diagram modelu danych (`.drawio` i `.svg`),
- `diagramy/generator/` – skrypty odtwarzające diagram z modeli backendu,
- `commit-history.md` – opis wszystkich commitów repozytorium `volunteer-crm`, materiał roboczy.

## Pobranie razem z repozytorium głównym

```bash
git clone --recurse-submodules <adres volunteer-crm>
# albo w istniejącym klonie:
git submodule update --init
```
