---
sidebar_position: 2
title: Założenia systemu
---

# Założenia systemu

## Problem

Wydarzenia z udziałem wolontariuszy mają własną klasę problemów, która wynika z ich specyfiki. Liczba wolontariuszy jest często trzycyfrowa, a zarządzanie nimi spadało dotąd na kilka osób. Osoby te ręcznie, w Excelu i Arkuszach Google, uzupełniały listę wolontariuszy, przydzielały im zmiany oraz zajmowały się ich umowami, potrzebami, benefitami i wieloma innymi sprawami. W efekcie nie istniało jedno źródło prawdy o wolontariuszach – informacje były rozproszone po dokumentach, arkuszach, prywatnych rozmowach i ustaleniach ustnych.

Brak jednego źródła prawdy odczuwały obie strony.

Wolontariusz:

- nie miał gdzie sprawdzić swojego statusu: czy został przyjęty, jakie ma benefity i gdzie szukać informacji – o wszystko musiał pytać organizatorów,
- nie miał jednego kanału komunikacji z organizatorami,
- nie mógł łatwo znaleźć dokumentacji i ważnych dla siebie informacji, bo były rozproszone,
- nie wiedział, kto jeszcze jest wolontariuszem, i nie miał jak skontaktować się z osobami z innych działów,
- zdarzało się, że nie otrzymywał przysługujących mu benefitów.

Organizatorzy:

- aplikacje wolontariuszy i przyjęcia do zespołów były rozproszone po Formularzach Google,
- każdy formularz zbierał inny zestaw danych, więc informacji o wolontariuszach nie dało się porównać ani zestawić w jednym miejscu,
- nie istniała historia uczestnictwa: nie było wiadomo, w których wydarzeniach i w jakiej roli wolontariusz brał udział, więc osób powracających co roku nie dało się rozpoznać,
- nie było wiadomo, kto ma dostęp do których systemów, kont i kanałów komunikacji, ani komu ten dostęp należy odebrać,
- informacje o potrzebach konkretnego wolontariusza były rozproszone,
- trudno było zsynchronizować zmiany wolontariuszy pracujących w kilku sekcjach oraz pilnować ich wymagań i preferencji,
- to, które benefity przysługują wolontariuszowi, zależy od warunków (np. liczby wydarzeń lub przepracowanych godzin), które trzeba było sprawdzać ręcznie, więc przydzielanie ginęło w natłoku zadań,
- brakowało jednolitego systemu do zarządzania umowami wolontariackimi: nie było wiadomo, kto podpisał umowę, czy została zweryfikowana i kiedy wygasa, a skany leżały w prywatnych folderach,
- komunikacja między działami spadała na koordynatorów lub organizatorów, bo działy nie miały jak porozumieć się bezpośrednio,
- dane osobowe wolontariuszy leżały w prywatnych arkuszach i formularzach, bez kontroli nad tym, kto ma do nich dostęp, i bez sposobu na ich usunięcie lub anonimizację na żądanie,
- nie było wiadomo, kto i kiedy zmienił dane wolontariusza lub podjął decyzję – ustalenia zapadały ustnie i nie zostawał po nich ślad,
- nie odróżniano wolontariuszy przychodzących na jedno wydarzenie od stałych członków organizacji, choć obie grupy wymagają innego traktowania,
- po zakończeniu wydarzenia listy przestawały być aktualne i nikt nie wiedział, kto jest nadal aktywny.

Volunteer Nexus ma rozwiązać te problemy jako jeden system, w którym wolontariusz sam sprawdza swoje sprawy, a organizatorzy zarządzają wszystkimi wolontariuszami na wydarzeniu i w organizacji.

## Istniejące systemy

Przed decyzją o budowie własnego systemu rozważono gotowe rozwiązania. Wymaganiem było rozwiązanie:

- darmowe,
- uruchamiane na własnym serwerze,
- posiadające API pozwalajace na integrację z innymi systemami,
- posiadające możliwość tworzenia pluginów lub dodatków, a także łatwe dodawanie nowych funkcjonalności,
- bazujące na nowoczesnej technologii.

Przegląd przedstawia tabela 1.

| System | Co oferuje | Dlaczego nie wystarczył |
| --- | --- | --- |
| Volgistics | portal wolontariusza, grafiki, ewidencja godzin | płatna usługa w chmurze dostawcy, bez możliwości uruchomienia na własnym serwerze i bez własnych dodatków |
| Better Impact (Volunteer Impact) | koordynacja wolontariuszy, grafiki, komunikacja | płatna usługa w chmurze dostawcy; API pozwala tylko odczytywać dane, a drugą stronę integracji trzeba zbudować samemu |
| Salesforce Nonprofit Cloud | konfigurowalne procesy i portale | usługa w chmurze dostawcy; organizacja non-profit dostaje 10 darmowych licencji, kolejne są płatne |
| CiviCRM | baza kontaktów dla organizacji pozarządowych, własne pola, API, rozszerzenia; rozszerzenie CiviVolunteer (projekty, role, zmiany, godziny) | spełnia wymagania formalne, ale nie jest systemem dla wolontariuszy: CiviVolunteer ma status „Work In Progress”, a jego ostatnie wydanie pochodzi z października 2024 r.; wolontariusz może się zapisać na zmianę, lecz nie ma portalu ze swoim statusem, benefitami i dostępami; działa tylko na PHP i MySQL lub MariaDB |
| Engelsystem | koordynacja zmian wolontariuszy na wydarzeniu; darmowy, na własny serwer, rozwijany na bieżąco | obejmuje tylko zmiany; API i dodatki mają status beta i mogą się zmieniać bez uprzedzenia, był niezależnie testowany i UI/UX nie było przyjazne dla użytkowników |
| OpenVolunteerPlatform | aplikacja startowa do budowy systemu dla wolontariuszy | nie jest gotowym produktem i nie ma żadnego wydania; system trzeba zbudować samemu na narzuconym zestawie narzędzi (Graphback, Keycloak, broker MQTT) |
| VMOSS | rejestracja wolontariuszy i projektów, raporty | wersja alfa; ostatni plik wydano w 2008 r. |
| Son of Service | baza wolontariuszy dla organizacji non-profit | nierozwijany od 2011 r.; autorzy sami odsyłają do CiviCRM |

*Tabela 1. Rozważane systemy (stan na listopad 2026 r.)*

Źródła:

- CiviCRM: <https://civicrm.org/extensions/civivolunteer>, <https://docs.civicrm.org/sysadmin/en/latest/requirements/>, <https://docs.civicrm.org/dev/en/latest/api/v4/rest/>
- Engelsystem: <https://github.com/engelsystem/engelsystem>, <https://engelsystem.de/doc/api/index.html>, <https://engelsystem.de/doc/developer/plugins/index.html>
- OpenVolunteerPlatform: <https://github.com/aerogear/OpenVolunteerPlatform>
- VMOSS: <https://sourceforge.net/projects/vmoss/>
- Son of Service: <https://sos.sourceforge.net/>
- Better Impact: <https://support.betterimpact.com/en/articles/9824270-api>
- Salesforce Nonprofit Cloud: <https://www.salesforce.com/nonprofit/>

Żaden z systemów nie pokrywał obu potrzeb naraz: samodzielnego dostępu wolontariusza do jego spraw i wiedzy organizatorów o tym, kogo mają i jakie ta osoba ma dostępy. Najbliżej był CiviCRM – elastyczna baza z API i rozszerzeniami, ale nie gotowy system dla wolontariuszy.

Pierwszy plan zakładał połączenie: Engelsystem do zmian, a własny portal do profili, dostępów i identyfikatorów. Ostatecznie zdecydowano się na własny kompleksowy system. Volunteer CRM zaczynał od wąskiego zakresu: baza wolontariuszy, logowanie, rejestracja przez formularz z akceptacją administratora. Sukcesywnie był rozwijany o kolejne moduły i integracje.

## Proces rozwoju

Volunteer Nexus powstawał iteracyjnie: kolejne funkcje wynikały ze zgłaszanych potrzeb i z doświadczeń zebranych podczas pracy systemu. System obsłużył dotąd dwa wydarzenia, a jego podstawowe założenia i funkcje zostały sprawdzone w praktyce. Celem MVP jest doprowadzenie obecnego systemu do stanu stabilnego.
