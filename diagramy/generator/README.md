# Generator diagramu modelu danych

Odtwarza diagram z modeli działającego backendu. Wynik (plik `.drawio` i jego eksport `.svg`) trafia do `doc-writer/static/diagramy/`, skąd wyświetla go strona „Model Danych”.

```bash
# 1. Lista modeli i relacji z rejestru Django (w katalogu głównym repozytorium)
docker compose exec -T backend python manage.py shell < doc-writer/diagramy/generator/relacje.py \
  | grep -E "^(REL|MODEL)\|" > /tmp/graph.txt

# 2. Układ (ELK) i plik draw.io — elkjs instalowany jednorazowo poza repozytorium
mkdir -p /tmp/elk && cp doc-writer/diagramy/generator/gen.mjs /tmp/elk/ && cd /tmp/elk && npm install elkjs
node gen.mjs /tmp/graph.txt /tmp/model-danych.drawio

# 3. Podgląd SVG (opcjonalnie)
docker run --rm -v /tmp:/data rlespinasse/drawio-export -f svg -o /data/out /data/model-danych.drawio
```

Eksport do PNG w tym kontenerze zawiesza się przy tak dużym diagramie; SVG działa.
