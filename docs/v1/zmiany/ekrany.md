---
sidebar_position: 1
title: Ekrany zmian
---

# Ekrany zmian

Strona pokazuje, jak planowanie zmian wygląda na ekranach v1. Te same przykładowe plany jako schematy pojęciowe opisuje strona [Definicje i podstawowe typy zmian](../../system/zmiany/definicje.md).

Rysunki są szkicami ekranów, a nie zrzutami. Nazwy zmian, lokalizacji, kategorii i osób są zmyślone.

## Tryb standardowy

Rysunki 1 i 2 pokazują, jak ten sam plan wygląda w systemie. Są uproszczonymi szkicami ekranu „Zmiany”, a nie zrzutami.

Tablicę zmian przedstawia rysunek 1. U góry wybiera się dzień wydarzenia. Kolumny to lokalizacje, które można włączać i wyłączać; zmiany bez lokalizacji mają własną kolumnę. Oś pionowa to godziny, więc wysokość bloku odpowiada czasowi trwania zmiany. Blok pokazuje nazwę zmiany, godziny i liczbę zajętych miejsc.

<div class="tablica">
<div class="tablica__pasek"><span class="tablica__dzien tablica__dzien--wybrany">PT 13 lis</span><span class="tablica__dzien">SO 14 lis</span><span class="tablica__dzien">ND 15 lis</span></div>
<div class="tablica__pasek"><strong>Kolumny:</strong><span class="tablica__filtr">☑ Scena główna</span><span class="tablica__filtr">☑ Rejestracja</span><span class="tablica__filtr">☑ Magazyn</span><span class="tablica__filtr">☐ Bez lokalizacji</span></div>
<div class="tablica__siatka">
<div class="tablica__kolumna" style="grid-column:2">Scena główna</div>
<div class="tablica__kolumna" style="grid-column:3">Rejestracja</div>
<div class="tablica__kolumna" style="grid-column:4">Magazyn</div>
<div class="tablica__godzina" style="grid-row:2">08:00</div>
<div class="tablica__godzina" style="grid-row:4">10:00</div>
<div class="tablica__godzina" style="grid-row:6">12:00</div>
<div class="tablica__godzina" style="grid-row:8">14:00</div>
<div class="tablica__godzina" style="grid-row:10">16:00</div>
<div class="tablica__godzina" style="grid-row:12">18:00</div>
<div class="tablica__godzina" style="grid-row:14">20:00</div>
<div class="tablica__zmiana" style="grid-column:2;grid-row:2/5"><strong>Montaż sceny</strong><span>08:00 – 11:00</span><em>Zapełniono 4/4</em></div>
<div class="tablica__zmiana" style="grid-column:2;grid-row:8/12"><strong>Obsługa sceny – popołudnie</strong><span>14:00 – 18:00</span><em>Zapełniono 6/6</em></div>
<div class="tablica__zmiana" style="grid-column:2;grid-row:12/16"><strong>Obsługa sceny – wieczór</strong><span>18:00 – 22:00</span><em>Zapełniono 5/6</em></div>
<div class="tablica__zmiana" style="grid-column:3;grid-row:3/7"><strong>Rejestracja – rano</strong><span>09:00 – 13:00</span><em>Zapełniono 4/4</em></div>
<div class="tablica__zmiana" style="grid-column:3;grid-row:7/12"><strong>Rejestracja – popołudnie</strong><span>13:00 – 18:00</span><em>Zapełniono 3/4</em></div>
<div class="tablica__zmiana" style="grid-column:4;grid-row:4/6"><strong>Wydawanie sprzętu</strong><span>10:00 – 12:00</span><em>Zapełniono 2/2</em></div>
<div class="tablica__zmiana" style="grid-column:4;grid-row:14/16"><strong>Przyjmowanie sprzętu</strong><span>20:00 – 22:00</span><em>Zapełniono 1/2</em></div>
</div>
</div>

*Rys. 1. Szkic tablicy zmian: dzień, kolumny lokalizacji, oś godzin*

Po wybraniu bloku system otwiera okno zmiany, które przedstawia rysunek 2. Okno pokazuje czas, lokalizację i stan zmiany, a pod nimi listę stanowisk. Każde stanowisko ma dział i zespół, znacznik zapełnienia, listę przypisanych osób i przycisk zapisu. Gdy wolontariusz nie może się zapisać, pod przyciskiem jest podany powód.

<div class="koncept">
<div class="koncept__naglowek">
<strong>Rejestracja – popołudnie</strong>
<div class="koncept__meta">13.11.2026, 13:00 · 5h</div>
<div class="koncept__meta">LOKALIZACJA <strong>Rejestracja</strong></div>
<div class="koncept__meta">STATUS <span class="koncept__znacznik koncept__znacznik--ok koncept__znacznik--wtekscie">OTWARTA</span></div>
</div>
<div class="koncept__stanowisko koncept__stanowisko--kolumna">
<div class="koncept__opis"><strong>Wydawanie identyfikatorów</strong><span>Rejestracja · —</span></div>
<span class="koncept__znacznik koncept__znacznik--ok koncept__znacznik--wtekscie">ZAPEŁNIONO 2/3 – POTRZEBA WIĘCEJ WOLONTARIUSZY</span>
<div class="koncept__opis"><span>PRZYPISANI:</span>Lisek, Ruda</div>
<span class="koncept__przycisk">Zapisz się</span>
</div>
<div class="koncept__stanowisko koncept__stanowisko--kolumna">
<div class="koncept__opis"><strong>Kasa</strong><span>Rejestracja · Kasa</span></div>
<span class="koncept__znacznik koncept__znacznik--pelne koncept__znacznik--wtekscie">ZAPEŁNIONO 1/1 – KOMPLET</span>
<div class="koncept__opis"><span>PRZYPISANI:</span>Wydra</div>
<span class="koncept__przycisk koncept__przycisk--nieaktywny">Zapisz się</span>
<div class="koncept__opis"><span>To stanowisko jest już w komplecie.</span></div>
</div>
</div>

*Rys. 2. Szkic okna zmiany: stanowiska, zapełnienie i zapis*

## Siatka godzin

Rysunki 3 i 4 pokazują, jak ten sam plan wygląda w systemie. Są szkicami odwzorowującymi ekran „Siatka planowania ciągłego” w wersji z listopada 2026 r. (panel administracyjny → Zmiany → Siatka): układ, napisy i kolory pochodzą z działającego systemu, a nazwy osób są zmyślone.

Ekran siatki przedstawia rysunek 3. Od góry zawiera:

- wybór działu i dnia wydarzenia,
- pasek narzędzi do malowania: gumkę, po jednym przycisku na kategorię (kod, nazwa i kolor) oraz narzędzie „Info”,
- legendę oznaczeń, których nie da się namalować: niedyspozycyjność pełną, warunkową i zajętość w innym miejscu,
- przyciski zapisu („Zapisz”, „Cofnij”, „Odrzuć zmiany”) – pomalowane komórki trafiają do systemu dopiero po zapisaniu,
- eksport do Excela i PNG, ponowne przeliczenie zmian oraz zmianę kolejności wolontariuszy,
- filtry, którymi ukrywa się wiersze wolontariuszy i kategorii,
- siatkę: oś obejmuje całą dobę w odcinkach po 30 minut i przewija się w poziomie; rysunek pokazuje wycinek od 07:30 do 14:30.

<div class="ekran">
<div class="ekran__tytul">Siatka planowania ciągłego</div>
<div class="ekran__opis">Maluj kategorie dyżurów bezpośrednio na wolontariuszach dla działów korzystających z ciągłego planowania zmian.</div>
<div class="ekran__etykieta">Dział</div>
<div class="ekran__wybor">Ochrona ▾</div>
<div class="ekran__rzad"><span class="ekran__dzien">ŚR<b>11 lis</b></span><span class="ekran__dzien">CZW<b>12 lis</b></span><span class="ekran__dzien ekran__dzien--wybrany">PT<b>13 lis</b></span><span class="ekran__dzien">SOB<b>14 lis</b></span><span class="ekran__dzien">ND<b>15 lis</b></span></div>
<div class="ekran__rzad"><span class="ekran__pedzel">Gumka</span><span class="ekran__pedzel ekran__pedzel--wybrany" style="border-color:#93c5fd"><i class="p"></i>P — Patrol</span><span class="ekran__pedzel" style="border-color:#86efac"><i class="s"></i>S1 — Posterunek – wejście</span><span class="ekran__pedzel" style="border-color:#fdba74"><i class="r"></i>R — Rejestracja</span><span class="ekran__pedzel" style="border-color:#d1d5db"><i class="x"></i>X — Przerwa</span><span class="ekran__pedzel">Info</span></div>
<div class="ekran__legenda"><i class="x"></i>X — Szare paski: wolontariusz zgłosił całkowitą niedyspozycyjność w tym terminie - komórki nie można pomalować ani wyczyścić.</div>
<div class="ekran__legenda"><i class="w"></i>~ — Bursztynowe paski: wolontariusz zgłosił warunkową dostępność - malowanie jest nadal możliwe, ale najpierw sprawdź notatkę.</div>
<div class="ekran__legenda"><i class="z"></i>⧗ — Zajęty gdzie indziej (zmiana w innym dziale lub prowadzony panel)</div>
<div class="ekran__opis">Wybierz powyżej kategorię dyżuru, a następnie kliknij lub przeciągnij po komórkach, aby je pomalować. Wybierz gumkę, aby wyczyścić komórkę. Zmiany zapisują się dopiero po kliknięciu Zapisz.</div>
<div class="ekran__rzad"><span class="ekran__przycisk ekran__przycisk--glowny">Zapisz</span><span class="ekran__przycisk">Cofnij</span><span class="ekran__przycisk">Odrzuć zmiany</span></div>
<div class="ekran__rzad"><span class="ekran__przycisk">Eksportuj do Excela</span><span class="ekran__przycisk">Eksportuj PNG</span><span class="ekran__przycisk">Przelicz zmiany</span><span class="ekran__przycisk">Zmień kolejność wolontariuszy</span></div>
<div class="ekran__opis">Przeciągnij po nagłówku z godzinami, aby dodać notatkę dla tego zakresu.</div>
<div class="ekran__rzad"><b>Wolontariusze:</b><span class="ekran__filtr">☑ Iskra</span><span class="ekran__filtr">☑ Borsuk</span><span class="ekran__filtr">☑ Mgiełka</span><span class="ekran__filtr">☑ Kruk</span><span class="ekran__filtr">☑ Sowa</span><span class="ekran__filtr">Pokaż wszystkie</span><span class="ekran__filtr">Ukryj wszystkie</span></div>
<div class="ekran__rzad"><b>Kategorie:</b><span class="ekran__filtr">☑ Patrol</span><span class="ekran__filtr">☑ Posterunek – wejście</span><span class="ekran__filtr">☑ Rejestracja</span><span class="ekran__filtr">Pokaż wszystkie</span><span class="ekran__filtr">Ukryj wszystkie</span></div>
<div class="ekran__przewijanie">
<table>
<thead>
<tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th><span class="ekran__pasmo">Ceremonia otwarcia</span></th><th><span class="ekran__pasmo">Ceremonia otwarcia</span></th><th></th><th></th><th></th><th></th></tr>
<tr><th>Wolontariusz</th><th>07:30</th><th>08:00</th><th>08:30</th><th>09:00</th><th>09:30</th><th>10:00</th><th>10:30</th><th>11:00</th><th>11:30</th><th>12:00</th><th>12:30</th><th>13:00</th><th>13:30</th><th>14:00</th><th>14:30</th></tr>
</thead>
<tbody>
<tr><th>Iskra <span class="ekran__godziny">5/6</span></th><td></td><td class="p">P</td><td class="p">P</td><td class="p">P</td><td class="p">P</td><td class="s">S1</td><td class="s">S1</td><td class="s">S1</td><td class="s">S1</td><td class="x">X</td><td class="x">X</td><td class="p">P</td><td class="p">P</td><td></td><td></td></tr>
<tr><th>Borsuk <span class="ekran__godziny">5/5</span></th><td></td><td class="s">S1</td><td class="s">S1</td><td class="s">S1</td><td class="s">S1</td><td class="p">P</td><td class="p">P</td><td class="p">P</td><td class="p">P</td><td class="p">P</td><td class="p">P</td><td class="x">X</td><td class="x">X</td><td></td><td></td></tr>
<tr><th>Mgiełka <span class="ekran__godziny">5/6</span></th><td></td><td class="r">R</td><td class="r">R</td><td class="r">R</td><td class="r">R</td><td class="r">R</td><td class="r">R</td><td class="x">X</td><td class="x">X</td><td class="s">S1</td><td class="s">S1</td><td class="s">S1</td><td class="s">S1</td><td></td><td></td></tr>
<tr><th>Kruk <span class="ekran__godziny ekran__godziny--ponad">5/4</span></th><td></td><td></td><td></td><td class="p">P</td><td class="p">P</td><td class="p">P</td><td class="p">P</td><td class="r">R</td><td class="r">R</td><td class="r">R</td><td class="r">R</td><td class="r">R</td><td class="r">R</td><td></td><td></td></tr>
<tr><th>Sowa <span class="ekran__godziny">2/6</span></th><td></td><td class="x">X</td><td class="x">X</td><td class="x">X</td><td class="x">X</td><td></td><td></td><td class="p">P</td><td class="p">P</td><td class="p">P</td><td class="p">P</td><td></td><td></td><td></td><td></td></tr>
</tbody>
<tfoot>
<tr><th><i class="p"></i>Patrol</th><td class="ekran__brak">0/2</td><td class="ekran__brak">1/2</td><td class="ekran__brak">1/2</td><td>2/2</td><td>2/2</td><td>2/2</td><td>2/2</td><td>2/2</td><td>2/2</td><td>2/2</td><td>2/2</td><td class="ekran__brak">1/2</td><td class="ekran__brak">1/2</td><td class="ekran__brak">0/2</td><td class="ekran__brak">0/2</td></tr>
<tr><th><i class="s"></i>Posterunek – wejście</th><td class="ekran__brak">0/1</td><td>1/1</td><td>1/1</td><td>1/1</td><td>1/1</td><td>1/1</td><td>1/1</td><td>1/1</td><td>1/1</td><td>1/1</td><td>1/1</td><td>1/1</td><td>1/1</td><td class="ekran__brak">0/1</td><td class="ekran__brak">0/1</td></tr>
<tr><th><i class="r"></i>Rejestracja</th><td class="ekran__brak">0/1</td><td>1/1</td><td>1/1</td><td>1/1</td><td>1/1</td><td>1/1</td><td>1/1</td><td>1/1</td><td>1/1</td><td>1/1</td><td>1/1</td><td>1/1</td><td>1/1</td><td class="ekran__brak">0/1</td><td class="ekran__brak">0/1</td></tr>
</tfoot>
</table>
</div>
<div class="ekran__rzad"><span class="ekran__przycisk ekran__przycisk--glowny">Pokaż ustawienia siatki</span></div>
</div>

*Rys. 3. Szkic ekranu „Siatka planowania ciągłego”*

W samej siatce warto zwrócić uwagę na cztery rzeczy, którymi ekran różni się od schematu pojęciowego ze strony „Definicje i podstawowe typy zmian”:

- godziny wolontariusza nie mają osobnej kolumny – znacznik „zaplanowane/zadeklarowane” stoi przy nazwie wolontariusza w pierwszej kolumnie,
- adnotacja jest powtórzona w każdym odcinku, który obejmuje, w osobnym wierszu nad godzinami,
- komórka przerwy ma te same szare paski co niedyspozycyjność, bo kategoria-blokada tworzy niedyspozycyjność,
- wiersze obsady liczą także odcinki, w których nikt nie pracuje, więc poza zaplanowanym czasem pokazują braki na czerwono.

Kategorie, wymagania obsady i adnotacje ustawia się pod siatką, po wybraniu „Pokaż ustawienia siatki”. Ustawienia przedstawia rysunek 4.

<div class="ekran">
<div class="ekran__rzad"><span class="ekran__przycisk ekran__przycisk--glowny">Ukryj ustawienia siatki</span></div>
<div class="ekran__naglowek">Kategorie dyżurów</div>
<div class="ekran__rzad"><span class="ekran__przycisk ekran__przycisk--glowny">Dodaj kategorię</span></div>
<div class="ekran__przewijanie">
<table class="ekran__lista">
<thead><tr><th>Kod</th><th>Etykieta</th><th>Kolor</th><th>Kolejność</th><th>Grupa podsumowania</th><th>Szablon reguł</th><th>Blokada</th><th>Ukryj z podsumowania</th><th>Akcje</th></tr></thead>
<tbody>
<tr><td>P</td><td>Patrol</td><td><i class="p"></i></td><td>0</td><td>—</td><td>—</td><td>Nie</td><td>Nie</td><td>Edytuj · Usuń</td></tr>
<tr><td>S1</td><td>Posterunek – wejście</td><td><i class="s"></i></td><td>1</td><td>—</td><td>—</td><td>Nie</td><td>Nie</td><td>Edytuj · Usuń</td></tr>
<tr><td>R</td><td>Rejestracja</td><td><i class="r"></i></td><td>2</td><td>—</td><td>—</td><td>Nie</td><td>Nie</td><td>Edytuj · Usuń</td></tr>
<tr><td>X</td><td>Przerwa</td><td><i class="x"></i></td><td>3</td><td>—</td><td>—</td><td>Tak</td><td>Nie</td><td>Edytuj · Usuń</td></tr>
</tbody>
</table>
</div>
<div class="ekran__naglowek">Wymagania obsady</div>
<div class="ekran__rzad"><span class="ekran__przycisk ekran__przycisk--glowny">Dodaj wymaganie</span></div>
<div class="ekran__przewijanie">
<table class="ekran__lista">
<thead><tr><th>Okres</th><th>Kategorie</th><th>Notatka</th><th>Akcje</th></tr></thead>
<tbody><tr><td>Domyślne</td><td>Patrol: 2, Posterunek – wejście: 1, Rejestracja: 1</td><td>—</td><td>Edytuj · Usuń</td></tr></tbody>
</table>
</div>
<div class="ekran__naglowek">Adnotacje harmonogramu</div>
<div class="ekran__rzad"><span class="ekran__przycisk ekran__przycisk--glowny">Dodaj adnotację</span></div>
<div class="ekran__przewijanie">
<table class="ekran__lista">
<thead><tr><th>Etykieta</th><th>Okres</th><th>Umiejscowienie</th><th>Akcje</th></tr></thead>
<tbody><tr><td>Ceremonia otwarcia</td><td>13.11.2026 12:00 — 13:00</td><td>Pasek nagłówka na pełną wysokość</td><td>Edytuj · Usuń</td></tr></tbody>
</table>
</div>
</div>

*Rys. 4. Szkic ustawień siatki: kategorie, wymagania obsady, adnotacje*

Po zapisaniu tej siatki system utworzył sześć zmian, które przedstawia tabela 1. Skład zmienia się co godzinę, więc każda zmiana trwa godzinę. Osoba na przerwie nie ma w tym czasie stanowiska.

| Zmiana | Tytuł | Stanowiska |
| --- | --- | --- |
| 08:00–09:00 | Patrol + Posterunek – wejście + Rejestracja | Patrol: Iskra · Posterunek – wejście: Borsuk · Rejestracja: Mgiełka |
| 09:00–10:00 | Patrol + Posterunek – wejście + Rejestracja | Patrol: Iskra · Patrol: Kruk · Posterunek – wejście: Borsuk · Rejestracja: Mgiełka |
| 10:00–11:00 | Patrol + Posterunek – wejście + Rejestracja | Patrol: Borsuk · Patrol: Kruk · Posterunek – wejście: Iskra · Rejestracja: Mgiełka |
| 11:00–12:00 | Patrol + Posterunek – wejście + Rejestracja | Patrol: Borsuk · Patrol: Sowa · Posterunek – wejście: Iskra · Rejestracja: Kruk |
| 12:00–13:00 | Patrol + Posterunek – wejście + Rejestracja | Patrol: Borsuk · Patrol: Sowa · Posterunek – wejście: Mgiełka · Rejestracja: Kruk |
| 13:00–14:00 | Patrol + Posterunek – wejście + Rejestracja | Patrol: Iskra · Posterunek – wejście: Mgiełka · Rejestracja: Kruk |

*Tabela 1. Zmiany utworzone przez system z siatki z rysunku 3*

Każde stanowisko w tych zmianach ma jedno miejsce i wyłączony samodzielny zapis. Tytuł zmiany to nazwy kategorii połączone znakiem „+”.
