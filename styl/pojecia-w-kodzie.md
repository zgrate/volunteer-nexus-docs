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
| stan aplikacji | `VolunteerApplication.status` (`pending`, `accepted`, `rejected`); stanów „wycofana” i „czeka na dział główny” w v1 nie ma |
| notatka wewnętrzna | `VolunteerApplication.review_note`; w v1 to jedyne pole, powodu odrzucenia nie ma |
| rozpatrujący | w v1 administrator wydarzenia (`user_can_administer`) |
| konto | `User` |
| konto nieaktywne | `User.is_active = False` |
| Centrum informacji | `InformationHubPage` |
| zmiana | `Shift` |
| stanowisko | `ShiftPosition` |
| zadanie | `ShiftTask` |
| lokalizacja | `ShiftLocation` |
| szablon zmiany | `ShiftTemplate` |
| reguła | `ShiftRule` |
| siatka godzin | `Department.shift_planning_mode = "continuous"`, `backend/shifts/grid.py` |
| tryb planowania | `Department.ShiftPlanningMode` (`standard`, `continuous`) |
| odcinek | `GRID_SLOT_MINUTES = 30` |
| kategoria służby | `ShiftGridCategory` |
| blokada | `ShiftGridCategory.is_blackout` |
| wymaganie obsady | `ShiftGridRequirement`, `ShiftGridRequirementCategory` |
| adnotacja | `ScheduleAnnotation` |
| przydział | `ShiftAssignment` |
| zastępstwo | `ShiftAssignment.replaces` |
| obecność | `ShiftAssignment.attendance_status` |
| szablon reguł | `ShiftRuleTemplate`, `ShiftRuleGroup` |
| sprawdzenie stałe | `ASSIGNMENT_RULE_ORDER` w `backend/shifts/rule_engine.py` |
| pominięcie warunku | `ShiftAssignment.overridden`, `rule_overrides` |
| samodzielny zapis | `ShiftPosition.self_assign_enabled` |
| operator zmian | `Department.shift_operators` |
| godziny zaplanowane | `backend/shifts/hours.py` |
| okno planowania zmian | `Event.shift_window()` |
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
| harmonogram Foxcons | `FoxconsHall`, `FoxconsScheduleEntry` |
| punkt programu | `FoxconsScheduleEntry` |
| stanowisko rejestracji | `counter/` (w interfejsie: „licznik rejestracji Foxcons”) |
| Foxcons | `backend/services/foxcons.py` |
| interfejs | `frontend/` |
| serwer | `backend/` |
| aplikacja (moduł serwera) | aplikacja Django, np. `backend/shifts/` |
| zadanie w tle | zadania Celery, `backend/*/tasks.py` |
| dostawca logowania | `allauth.socialaccount.providers.openid_connect`, `backend/services/oidc.py` |
| plik prywatny | `private_storage`, `agreements.auth.private_file_auth_function` |
| historia zmian | `django-simple-history`, modele `Historical…` |
| aplikacja PWA | `frontend/src/sw.ts`, `vite-plugin-pwa` |
| powiadomienie na urządzenie | `PushSubscription`, `backend/services/web_push.py` |
| kopia zapasowa | `docker/backup/` |
