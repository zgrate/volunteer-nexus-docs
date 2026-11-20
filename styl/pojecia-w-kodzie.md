# Pojęcia w kodzie

Plik roboczy dla AI: które pojęcie ze [słownika](../docs/system/slownik.md) odpowiada której nazwie w kodzie. Kolumna została przeniesiona tutaj ze słownika, żeby opublikowany słownik zawierał tylko definicje. Mapowanie nie było weryfikowane wiersz po wierszu — przed użyciem sprawdź w kodzie.

## Słowa, których nie używamy

Kolumna „Nie używamy” przeniesiona ze słownika.

| Zamiast | Piszemy | Uwagi |
| --- | --- | --- |
| Volunteer CRM | Volunteer Nexus | nazwa systemu |
| niedostępność | niedyspozycyjność | w interfejsie występują oba warianty |
| świadczenie | benefit | |

## Nazwy w kodzie

| Pojęcie | W kodzie |
| --- | --- |
| wolontariusz | `User` |
| wydarzenie | `Event` |
| uczestnictwo | `Participation` |
| dział, sekcja | `Department` |
| zespół | `Team` |
| członkostwo w dziale | `DepartmentMembership` |
| grupa dostępu | `AccessGroup` |
| aplikacja (do działu) | `VolunteerApplication` |
| Centrum informacji | `InformationHubPage` |
| zmiana | `Shift` |
| stanowisko | `ShiftPosition` |
| zadanie | `ShiftTask` |
| lokalizacja | `ShiftLocation` |
| szablon zmiany | `ShiftTemplate` |
| reguła | `ShiftRule` |
| siatka | `ShiftGrid*` |
| ekran Conops | `ConopsScreen` |
| niedyspozycyjność | `UserUnavailability` |
| przyjazd i wyjazd | `VolunteerArrivalDeparture` |
| dyspozytor | `dispatch_requests` |
| zgłoszenie | `DispatchRequest` |
| umowa | `Agreement` |
| grupa umów | `AgreementGroup` |
| zgoda RODO | TODO: wskazać w kodzie |
| benefit | `Benefit` |
| poziom benefitów | `EventBenefitLevel` |
| Karta Godzin | `WorkedHoursEntry` |
| przepracowane godziny | `WorkedHoursEntry` |
| zadeklarowane godziny | `DeclaredHoursAssignment` |
| szablon dokumentu | `DocumentTemplate` |
| wygenerowany dokument | `GeneratedDocument` |
| notatka | `Note` |
| pole niestandardowe | `CustomFieldDefinition` |
| klucz API | `UserApiKey` |
| dziennik audytu | `AuditLog` |
| panel administracyjny | frontend, `/admin` |
| harmonogram Foxcons | `FoxconsScheduleEntry` |
| licznik rejestracji | `counter/` |
