# Historia commitów

<!-- markdownlint-disable MD001 MD026 MD034 MD036 -->

Opis każdego commita w repozytorium, w kolejności chronologicznej: od `62afe37` (2026-04-29) do `551cee1` (2026-11-20), razem 359 commitów.

Materiał roboczy do pisania dokumentacji, nie strona dokumentacji. Opisy powstały na podstawie zmian w kodzie (`git show`), nie samych tytułów. Zastrzeżenia:

- duże komponenty Vue (zwłaszcza `frontend/src/pages/AdminPage.vue`) były czytane w zarysie: funkcje, wywołania API, tłumaczenia — nie całe szablony,
- testy są opisane po nazwach przypadków, plików tłumaczeń i plików generowanych (`package-lock.json`, `dist/`) nie czytano,
- przy commitach scalających liczby plików i wierszy to różnica względem pierwszego rodzica,
- gdzie z diffu nie dało się ustalić celu zmiany, opis mówi to wprost.

Wiersz pod tytułem: data · autor · liczba zmienionych plików, wiersze dodane / usunięte.

### 1. `62afe37` — feat: First Version

*2026-04-29 · Z-Grate · 130 plików, +19296 / −0*

- Utworzył backend Django + DRF (`backend/config/`) z aplikacjami `users`, `events` (etykieta aplikacji `cycles`), `benefits`, `agreements` i `core` oraz warstwą `backend/services/` (`magic_link.py`, `oidc.py`, `gdpr.py`, `lifecycle.py`, `i18n.py`, `application_confirmation_email.py`); zależności to m.in. `djangorestframework-simplejwt`, `django-allauth`, `django-simple-history`, `django-private-storage`.
- Dodał modele: `User` (rozszerzony `AbstractUser` z `is_permanent`, `avatar`, notatkami, `telegram_handle`, `custom_data` i historią) oraz `CustomFieldDefinition` (`backend/users/models.py`); `Event`, `Participation`, `Department`, `DepartmentMembership` (stanowiska member/coordinator/lead/organizer) i `VolunteerApplication` (`backend/events/models.py`); `Benefit`, `EventBenefitLevel`, `VolunteerEventBenefits` (portfel punktów) i `BenefitSelection` (`backend/benefits/models.py`); `Agreement` z prywatnym plikiem skanu (`backend/agreements/models.py`); `AppSettings` z językami i kolorami motywu (`backend/core/models.py`).
- Wystawił API pod `/api/`: logowanie magicznym linkiem (`auth/magic/request/`, `auth/magic/verify/`), OIDC (`auth/oidc/config/<provider_id>/`, `auth/oidc/exchange/`), administrację dostawcami OAuth, `profile/`, `profile/avatar/`, `profile/gdpr-consent/`, `settings/app/` oraz routery `users`, `organizer-users`, `custom-field-definitions`, `organizer-custom-field-definitions`, `cycles`, `participations`, `departments`, `department-memberships`, `volunteer-applications`, `benefits`, `benefit-levels`, `agreements`.
- Dodał publiczne endpointy zgłoszeń: `events/`, `public/departments/`, `public/volunteer-application/fields/` i `public/volunteer-application/` (`backend/events/urls.py`) oraz szablony e-maili potwierdzenia zgłoszenia i magicznego linku.
- Dodał polecenia zarządzające `seed_sample_data`, `custom_seed` i `update_cycle_status` oraz konfigurację panelu Django admin dla wszystkich aplikacji.
- Utworzył frontend Vue 3 + Pinia + vue-i18n (`frontend/`): widoki `EventSelectPage`, `LoginPage`, `MagicLinkCallbackPage`, `OAuthCallbackPage`, `PublicVolunteerApplyPage`, `ProfilePage`, `HistoryPage`, `BenefitsPage`, `DepartmentManagerPage` i `AdminPage` (4300 wierszy), store'y `auth`, `event`, `benefits`, `locale`, tłumaczenia `pl`/`en` oraz router ze strażnikiem uwierzytelnienia.
- Dodał środowisko Docker: `docker-compose.yml` (Postgres 16, backend, frontend, MailHog), `docker-compose.prod.yml`, pliki `Dockerfile.dev`/`Dockerfile.prod`, skrypty `entrypoint.*.sh`, konfigurację nginx (`docker/nginx/`) oraz `README.md`.

### 2. `249cb70` — fix: .env.rpod

*2026-04-29 · Z-Grate · 3 pliki, +55 / −1*

- Dodał przykładowe pliki konfiguracji środowiska `.env.prod.example` (port aplikacji, Django, Postgres, e-mail, Gunicorn) i `backend/.env.example`.
- Usunął z `.gitignore` wzorzec `.env.*`, żeby pliki przykładowe mogły trafić do repozytorium.

### 3. `4baf576` — fix: prod

*2026-04-29 · Z-Grate · 6 plików, +6 / −6*

- Przeniósł panel Django admin ze ścieżki `/admin/` na `/django-admin/` w `backend/config/urls.py`, `docker/nginx/default.conf` i `README.md`.
- Zmienił domyślny adres panelu we frontendzie na względne `/django-admin/` (`frontend/src/App.vue`, `frontend/src/pages/AdminPage.vue`).
- Zmniejszył `GUNICORN_WORKERS` z 3 do 1 w `.env.prod.example`.

### 4. `cbfb9b2` — fix: error

*2026-04-29 · Z-Grate · 1 plik, +10 / −2*

- Uodpornił `translate_with_fallback` w `backend/services/i18n.py`: rzutuje `locale` na tekst, zwraca wartość bazową dla pustego klucza i traktuje `translations` niebędące mapą jak pusty słownik.

### 5. `43b57a9` — fix: serializers errors

*2026-04-29 · Z-Grate · 4 pliki, +6 / −6*

- Usunął zbędny argument `source="event"` z pól `event` w serializerach `BenefitSerializer`, `ParticipationSerializer`, `DepartmentSerializer`, `VolunteerApplicationSerializer` i `CustomFieldDefinitionAdminSerializer`.
- Zmienił w `docker-compose.prod.yml` wyłącznie białe znaki na końcu wiersza `GUNICORN_TIMEOUT`.

### 6. `af1c478` — fix: apply button

*2026-04-29 · Z-Grate · 4 pliki, +5 / −19*

- Uprościł kartę wydarzenia w `frontend/src/pages/EventSelectPage.vue` do jednego przycisku, który prowadzi prosto do publicznego formularza zgłoszenia (`public-apply`) i jest nieaktywny po zamknięciu naboru.
- Zmienił etykietę przycisku w `frontend/src/pages/DepartmentManagerPage.vue` na nowy klucz `departments.showApplyButton` dodany w tłumaczeniach `pl` i `en`.

### 7. `7d34d83` — fix: error

*2026-04-30 · Z-Grate · 1 plik, +11 / −2*

- Przywrócił w `frontend/src/pages/EventSelectPage.vue` dwa przyciski: wejście jako wolontariusz (profil lub logowanie) oraz osobny przycisk zgłoszenia, cofając część zmiany z poprzedniego commita.

### 8. `cec8c5c` — feat: email

*2026-04-30 · Z-Grate · 9 plików, +171 / −8*

- Dodał serwis `send_event_invitation_email` (`backend/services/event_invitation_email.py`) i szablon `backend/users/templates/event_invitation_email.txt` z zaproszeniem na wydarzenie.
- Zaczął wysyłać zaproszenie po zaakceptowaniu zgłoszenia (`backend/events/views.py`) i po dodaniu wolontariusza do wydarzenia (`backend/users/views.py`); odpowiedzi zawierają pole `invitation_email_sent`.
- Pokazał w `frontend/src/pages/AdminPage.vue` osobne komunikaty o wysłaniu lub niewysłaniu zaproszenia i dodał odpowiednie klucze tłumaczeń.
- Dodał testy wysyłki zaproszeń w `backend/events/tests.py` i `backend/users/tests.py`.

### 9. `ae17bc8` — fix: lists of elements

*2026-04-30 · Z-Grate · 1 plik, +33 / −5*

- Ograniczył w `frontend/src/pages/AdminPage.vue` pola dodatkowe pokazywane w podglądzie, edycji, wydruku i kolumnach tabeli do tych, które dotyczą działów danego wolontariusza (funkcje `isCustomFieldApplicableToVolunteer` i `applicableCustomFieldsForVolunteer`).

### 10. `4d5ee82` — feat: changes according to people

*2026-05-01 · Z-Grate · 20 plików, +2089 / −630*

- Przebudował `frontend/src/pages/PublicVolunteerApplyPage.vue` na czterokrokowy kreator: dane podstawowe, wybór wielu działów, pytania wspólne i działowe, podsumowanie ze zgodą RODO; frontend wysyła zgodę na `/public/gdpr-consent/`, którego w backendzie w tym commicie nie ma (istnieje tylko `profile/gdpr-consent/`).
- Usunął formularz zgłoszenia do działu z `frontend/src/pages/DepartmentManagerPage.vue` (169 wierszy) wraz z jego tłumaczeniami.
- Dodał pole `custom_css` do `AppSettings` (migracja `0002_appsettings_custom_css`), jego walidację w `backend/core/views.py` i wstrzykiwanie stylów w `frontend/src/App.vue` (`applyCustomCss`).
- Zmienił definicję aktywności: `User.is_currently_active` i `backend/services/lifecycle.py` opierają się na członkostwie lub roli organizatora w dziale aktywnego wydarzenia zamiast na `Participation`; filtry aktywności w `backend/users/views.py` zmieniono analogicznie.
- Rozszerzył anonimizację w `backend/services/gdpr.py` o usunięcie awatara, notatek, Telegrama, uprawnień i hasła oraz dezaktywację konta.
- Dodał `department_names` i `required_for_profile_fillup` do odpowiedzi profilu, parsowanie wartości tak/nie w `GDPRConsentView` oraz listę organizatorów w publicznej liście działów.
- Dodał w `AdminPage.vue` filtry wolontariuszy i zgłoszeń (status, dział, wyszukiwanie) oraz tłumaczone etykiety odpowiedzi, a w `ProfilePage.vue` oznaczanie brakujących pól wymaganych; dopisał testy w `backend/users/tests.py`.

### 11. `f3931af` — fix: pl locale

*2026-05-01 · Z-Grate · 1 plik, +367 / −367*

- Uzupełnił polskie znaki diakrytyczne w tłumaczeniach `frontend/src/i18n/messages/pl.ts` (np. „Zmien wydarzenie” na „Zmień wydarzenie”).

### 12. `d0bb1cc` — feat: benefits bidinng, fixes

*2026-05-01 · Z-Grate · 11 plików, +365 / −43*

- Dodał relację `Benefit.levels` (wiele do wielu z `EventBenefitLevel`, migracja `0004_benefit_levels`), pole zapisu `level_ids` w `BenefitSerializer` i walidację, że poziomy należą do tego samego wydarzenia co benefit.
- Zmienił `is_benefit_visible_to_user` w `backend/core/selectors/benefits.py`: benefit powiązany z poziomami jest widoczny tylko dla wolontariusza z przypisanym jednym z tych poziomów benefitów.
- Nadpisał `create` w `UserAdminViewSet`: nowy wolontariusz dostaje hasło nieużywalne i magiczny link, a odpowiedź zawiera `registration_email_sent`; usunął jedno sprawdzenie zgody RODO przed aktywacją wolontariusza w `partial_update` w `backend/users/views.py`.
- Dodał w `frontend/src/pages/AdminPage.vue` wybór poziomów w formularzu benefitu i kolumnę poziomów w tabeli.
- Dodał testy w `backend/benefits/tests.py` i `backend/users/tests.py`.

### 13. `f7b3025` — fix: errors

*2026-05-01 · Z-Grate · 2 pliki, +42 / −33*

- Usunął w akcji `accept` w `backend/events/views.py` blokadę wymagającą ważnej zgody RODO przed zaakceptowaniem zgłoszenia.
- Przesunął akcję `reject` w obrębie `VolunteerApplicationViewSet` bez zmiany jej treści i dostosował testy w `backend/events/tests.py`.

### 14. `9fdc314` — feat: add fields limits

*2026-05-03 · Z-Grate · 11 plików, +348 / −32*

- Dodał do `CustomFieldDefinition` pola `is_long_text` i `max_length` oraz domyślne limity 100 i 500 znaków (migracja `0002_customfielddefinition_length_limits`).
- Wymusił limity długości odpowiedzi tekstowych i notatki zgłaszającego w zgłoszeniach (`backend/events/views.py`); limity nie obowiązują administratorów.
- Dodał limity długości dla `username`, `first_name`, `last_name`, `telegram_handle` i pól dodatkowych przy edycji profilu (`backend/users/views.py`).
- Dodał walidację `max_length` (1–5000, tylko dla pól tekstowych) w serializerze oraz kontrolki limitu w formularzu pola w `frontend/src/pages/AdminPage.vue`.
- Dopisał testy limitów w `backend/events/tests.py` i `backend/users/tests.py`.

### 15. `8041fb3` — feat: telegram, mailer and foxcons id

*2026-05-03 · Z-Grate · 46 plików, +4748 / −53*

- Dodał Celery (`backend/config/celery.py`, `celery[redis]` w wymaganiach) oraz usługi `redis` i `celery-worker` w `docker-compose.yml` i `docker-compose.prod.yml`.
- Dodał masową wysyłkę wiadomości: modele `BulkEmailTask` i `OutboundEmailLog`, zadanie `process_bulk_email_task` (`backend/core/tasks.py`), serwisy `bulk_mailer.py` i `bulk_notifications.py` z trybami e-mail, Telegram, oba lub Telegram z awaryjnym e-mailem oraz akcje `send-bulk-email` i `bulk-email-tasks` w widokach użytkowników.
- Dodał integrację z Telegramem: pola `telegram_*` w `User`, ustawienia bota w `AppSettings`, serwis `backend/services/telegram.py` (weryfikacja logowania, wysyłka wiadomości) oraz endpointy `profile/telegram/connect/` i `profile/telegram/disconnect/`.
- Dodał synchronizację identyfikatorów Foxcons: pola `foxcons_*` w `Event` i `User`, serwis `backend/services/foxcons.py`, skan przy starcie (`foxcons_startup.py`), zadanie `rescan_foxcons_user_ids_task` i akcję `resync-foxcons-user-ids`.
- Ograniczył w serializerach działów i zgłoszeń widoczność e-maila i imienia z nazwiskiem do administratorów i organizatorów działu; pozostali widzą tylko pseudonim.
- Otworzył `GET settings/app/` dla niezalogowanych i dodał `PATCH` dla administratorów.
- Dodał w `AdminPage.vue` zakładkę mailera (wybór odbiorców, tryb dostarczenia, historia zadań z odpytywaniem), a w `ProfilePage.vue` widżet logowania Telegram i usuwanie awatara; dołączył dokument `api-key-login-and-email-id-lookup.md` oraz pusty plik `backend/test.sqlite3`.

### 16. `34135f0` — feat: Foxcons API Sync

*2026-05-04 · Z-Grate · 14 plików, +978 / −137*

- Dodał do `Event` pola `foxcons_api_email` i `foxcons_api_password` (migracja `0004_event_foxcons_account_credentials`) i logowanie do Foxcons kontem obok tokenu.
- Rozbudował `backend/services/foxcons.py`: pobieranie pełnej listy uczestników raz na synchronizację, dopasowanie po e-mailu z pamięci podręcznej i czytelniejsze opisy błędów HTTP.
- Dodał konfigurację `LOGGING` dla `events.views` i `services.foxcons` oraz logowanie przebiegu akcji `resync-foxcons-user-ids`.
- Przebudował `frontend/src/pages/ProfilePage.vue` (m.in. tłumaczenie błędów Foxcons przez `translatedFoxconsError`) i poprawił polskie tłumaczenia.
- Zmienił dane w `custom_seed.py` i dopisał `backend/test.sqlite3` do `.gitignore`.

### 17. `f32e026` — fix: hide the pass

*2026-05-04 · Z-Grate · 1 plik, +20 / −0*

- Dodał formularz `EventAdminForm` w `backend/events/admin.py`, który pokazuje `foxcons_api_password` jako pole hasła bez wyświetlania wartości.
- Zachował dotychczasowe hasło w `save_model`, gdy pole zostaje puste przy edycji wydarzenia.

### 18. `4c13d51` — feat: Changes

*2026-05-06 · Z-Grate · 16 plików, +609 / −10*

- Dodał do `AppSettings` treści stron stopki „O nas” i RODO z tłumaczeniami (pola `footer_about_*` i `footer_gdpr_*`, migracje `0007` i `0008`) oraz pole `footer_pages` w odpowiedzi `settings/app/`.
- Dodał widok `frontend/src/pages/FooterStaticPage.vue` renderujący Markdown (`markdown-it`), trasy `/about` i `/gdpr-note` oraz linki w stopce `App.vue`.
- Dodał limity żądań dla magicznego linku (`magic_link_request` 5/min, `magic_link_verify` 10/min) i zawęził format kodu logowania do 7 znaków alfanumerycznych.
- Dodał ochronę przed SSRF przy pobieraniu awatara z Telegrama (`_is_safe_avatar_url` odrzuca adresy prywatne i lokalne).
- Przeniósł `internal_note` do nowego `UserAdminSerializer`, przez co pole przestało być zwracane przez zwykły `UserSerializer`; dopisał testy w `backend/users/tests.py`.

### 19. `662f7c0` — feat: availility on platforms

*2026-05-07 · Z-Grate · 19 plików, +3248 / −145*

- Dodał testy Playwright w `frontend/e2e/` (responsywność, dostępność z `@axe-core/playwright`, regresje układu, widoki po zalogowaniu) z atrapami API w `fixtures.ts` i pięcioma profilami ekranów w `frontend/playwright.config.ts`.
- Dodał ESLint i Prettier (`frontend/eslint.config.js`, skrypty `lint`, `format:check`, `test:e2e`, `test:a11y`) oraz workflow `.github/workflows/frontend-qa.yml`.
- Poprawił układ na wąskich i bardzo szerokich ekranach w `frontend/src/style.css`, `App.vue`, `AdminPage.vue` i `PublicVolunteerApplyPage.vue` oraz dodał identyfikatory pól formularza zgłoszenia.
- Zmienił importy widoków w `frontend/src/router/index.ts` na leniwe i dodał listę kontrolną `frontend/docs/responsive-qa-checklist.md`; zmienił się też `frontend/package-lock.json`.

### 20. `7d89c8d` — feat: Changessss

*2026-05-07 · Z-Grate · 37 plików, +1836 / −581*

- Zastąpił w `Department` pola `name` i `description` kluczem `key` (unikalnym w wydarzeniu) i samymi tłumaczeniami (migracja `0005_department_key_and_translation_only`); serializer generuje klucz automatycznie.
- Usunął bazowe pola stron stopki z `AppSettings`, zostawiając same tłumaczenia (migracja `0009_remove_footer_page_base_fields`).
- Dodał do `User` pola `preferred_contact_method` i `login_magic_link_via_telegram` oraz serwis `backend/services/user_notifications.py`, który wysyła powiadomienia systemowe preferowanym kanałem.
- Zmienił `MagicLinkService.send_magic_link`, żeby mógł wysłać kod logowania także przez Telegram, i dodał tryb `preferred` w `BulkEmailTask`.
- Dodał w `frontend/src/services/api.ts` obsługę odpowiedzi 401 (wylogowanie i przejście do logowania) oraz wymóg wybranego wydarzenia w strażniku routera; przywrócił statyczne importy widoków.
- Przeniósł w `AdminPage.vue` formularze działu, pola dodatkowego, benefitu i poziomu do okien dialogowych, dodał w `ProfilePage.vue` przełączniki preferowanego kontaktu i logowania przez Telegram, a w `BenefitsPage.vue` własne okno potwierdzenia.

### 21. `3cc2175` — current changes

*2026-05-07 · Z-Grate · 49 plików, +2203 / −134*

- Dodał dziennik audytu: model `AuditLog`, serwis `backend/services/audit_log.py`, sygnały `backend/core/signals.py`, `AuditRequestMiddleware`, `AuditedAdminMixin` dla klas panelu admin oraz endpoint tylko do odczytu `audit-logs`.
- Dodał model `OutboundMessageLog` i serwis `backend/services/message_log.py` rejestrujące każdą wysłaną wiadomość e-mail i Telegram.
- Dodał historię zmian (`HistoricalRecords`) do modeli w `backend/benefits/models.py` i `backend/events/models.py`.
- Dodał okno wyboru benefitów (`Event.benefit_selection_opens_at`, `benefit_selection_closes_at`) egzekwowane w `backend/benefits/views.py` oraz flagę `Department.is_admin_assign_only`.
- Dodał pole `AppSettings.audit_log_retention_days` z czyszczeniem starych wpisów oraz parametr `actor` w `GDPRService.hard_delete` i `anonymize`.
- Dodał w `AdminPage.vue` trwałe usuwanie wolontariusza (`DELETE /users/<id>/hard-delete/`) i ujednolicone funkcje wyświetlania nazw; zmienił sposób wstrzykiwania widżetu Telegram w `ProfilePage.vue`.

### 22. `f99eb3d` — fix: fix

*2026-05-07 · Z-Grate · 1 plik, +1 / −1*

- Usunął operator `void` przed wywołaniem `connectTelegram(user)` w `frontend/src/pages/ProfilePage.vue`.

### 23. `9b69bc1` — fix: unsuesd

*2026-05-07 · Z-Grate · 1 plik, +0 / −1*

- Usunął nieużywaną wartość wyliczaną `telegramConnected` z `frontend/src/pages/ProfilePage.vue`.

### 24. `1625c98` — fix: styles =

*2026-05-08 · Z-Grate · 3 pliki, +3 / −3*

- Zmienił po jednej wartości koloru w stylach `AdminPage.vue`, `BenefitsPage.vue` i `ProfilePage.vue` (m.in. `#081327` na `var(--brand-navy)`).

### 25. `ff7d4ab` — fiX: rollback personal data

*2026-05-08 · Z-Grate · 1 plik, +12 / −0*

- Dodał w podglądzie wolontariusza w `frontend/src/pages/AdminPage.vue` wiersze z imieniem i nazwiskiem, e-mailem oraz kontem Telegram.

### 26. `c4f9e94` — feat: last changes

*2026-05-09 · Z-Grate · 19 plików, +608 / −34*

- Dodał globalny szablon e-maili `AppSettings.global_email_template_translations` (migracja `0014`), renderowany przez Jinja2 w `backend/services/bulk_mailer.py` (`jinja2` w wymaganiach).
- Dodał do `Event` własne treści stron „O nas” i RODO (`about_page_*_translations`, `gdpr_page_*_translations`, migracja `0010`); `settings/app/` przyjmuje `event_id` i wraca do treści globalnych, gdy wydarzenie ich nie ma.
- Przetłumaczył wiadomość z magicznym linkiem (e-mail i Telegram) według parametru `lang` przekazywanego z `LoginPage.vue` przez store `auth`.
- Zmienił `FooterStaticPage.vue`, żeby wysyłał identyfikator wybranego wydarzenia, i dopisał testy w `backend/core/tests.py` i `backend/users/tests.py`.

### 27. `074584f` — fixed: RODO

*2026-05-09 · Z-Grate · 2 pliki, +94 / −3*

- Przypiął stopkę z linkami „O nas” i RODO na stałe u dołu ekranu jako przyciski-pigułki (`frontend/src/App.vue`).
- Dodał test Playwright sprawdzający widoczność linków stopki na stronach publicznych (`frontend/e2e/layout-regressions.spec.ts`).

### 28. `da47128` — feat: changes

*2026-05-09 · Z-Grate · 2 pliki, +186 / −198*

- Przepisał `README.md` na opis funkcji systemu w jedenastu obszarach, strukturę projektu, szybki start i testy.
- Dodał imię i nazwisko, e-mail oraz konto Telegram do wydruku karty wolontariusza w `frontend/src/pages/AdminPage.vue`.

### 29. `0c6f1ac` — feat: last changes

*2026-05-11 · Z-Grate · 23 pliki, +1697 / −88*

- Dodał model `Team` (zespół w dziale, z kluczem i tłumaczeniami nazwy) oraz pole `DepartmentMembership.team` (migracja `0011`); pole `is_public_selectable` dodane w tej migracji zostało usunięte migracją `0012` w tym samym commicie.
- Dodał `TeamSerializer`, `TeamViewSet` i trasę `teams` (`backend/events/urls.py`) oraz klasy `DepartmentAdmin`, `TeamAdmin` i `DepartmentMembershipAdmin` w panelu admin.
- Dodał do `User` flagi `share_email_in_department_lists` i `share_telegram_in_department_lists` (migracja `0009`) z przełącznikami w `ProfilePage.vue`.
- Rozbudował zarządzanie własnym działem w `AdminPage.vue`: tworzenie zespołów, edycja stanowiska, notatki i zespołu członka, wyszukiwanie kandydatów oraz okna potwierdzenia i wyniku dodawania.
- Przebudował listę członków w `DepartmentManagerPage.vue` (sortowanie według stanowiska, zespoły, kontakty).
- Dodał w `frontend/src/services/oidc.ts` oznaczanie źródła sesji (`oidc` lub `magic`), żeby wylogowanie nie używało nieaktualnego adresu OIDC, oraz parametr `parse_mode` w wysyłce Telegram.

### 30. `2fde76d` — fix

*2026-05-11 · Z-Grate · 1 plik, +1 / −1*

- Poprawił typ parametru i wyniku funkcji `sortMembersInDepartment` w `frontend/src/pages/DepartmentManagerPage.vue`.

### 31. `8f2f83a` — fix: mailer and new lines

*2026-05-11 · Z-Grate · 9 plików, +150 / −22*

- Dodał `event_id` do tokenu magicznego linku: `build_token` przyjmuje wydarzenie, `validate_token` zwraca parę e-mail i wydarzenie, a `auth/magic/verify/` oddaje `event_id`.
- Zaczął wybierać wydarzenie z linku po zalogowaniu (`MagicLinkCallbackPage.vue`, nowa funkcja `selectEventById` w `frontend/src/stores/event.ts`).
- Dodał w `backend/services/bulk_mailer.py` funkcję `_looks_like_html`: treść tekstowa wstawiana do szablonu HTML dostaje `<br>` w miejscu znaków nowej linii, a wiadomość z HTML jest wysyłana z typem `html`.
- Dopisał test w `backend/users/tests.py`.

### 32. `5c5d342` — preparing for production

*2026-05-12 · Z-Grate · 60 plików, +1251 / −1592*

- Zmienił etykietę aplikacji `events` z `cycles` na `events` (`EventsConfig`) i poprawił odwołania `"cycles.Event"` w modelach `benefits`, `core` i `users`.
- Usunął wszystkie dotychczasowe migracje numerowane i wygenerował od nowa migracje początkowe dla każdej aplikacji.
- Zmienił trasę API `cycles` na `events` oraz nazwę polecenia `update_cycle_status` na `update_event_status`; dostosował wywołania w `frontend/src/pages/AdminPage.vue`.
- Rozbudował `custom_seed.py` (552 zmienione wiersze) i `seed_sample_data.py`; według `README.md` polecenia seed są blokowane przy `DJANGO_DEBUG=false` bez `ALLOW_NON_DEV_SEED=true`.
- Dodał w `README.md` instrukcję pierwszego wdrożenia produkcyjnego na pustej bazie.

### 33. `e5773f2` — preparing for production part 2 electric bangalooo

*2026-05-12 · Z-Grate · 27 plików, +1560 / −308*

- Dodał zgłoszenia do zespołów: pola `Department.allow_team_applications`, `Team.is_public_selectable` i `VolunteerApplication.team` oraz osobne ograniczenia unikalności oczekujących zgłoszeń z zespołem i bez zespołu.
- Zmienił publiczne zgłoszenie tak, by `team_ids` tworzyło osobne zgłoszenie na każdy wybrany zespół; akceptacja zgłoszenia przypisuje zespół w członkostwie działu (`backend/events/views.py`).
- Dodał relację `CustomFieldDefinition.teams`: pole dodatkowe może dotyczyć konkretnych zespołów, co uwzględniają formularz zgłoszenia i profil.
- Wprowadził wybór języka w e-mailach potwierdzenia zgłoszenia i zaproszenia (`_get_user_locale` w serwisach).
- Dodał w `AdminPage.vue` zmianę nazwy i usuwanie zespołu, wybór zespołów dla pól dodatkowych i czyszczenie zaznaczeń, a w `PublicVolunteerApplyPage.vue` wybór zespołów w dziale.
- Zmodyfikował wygenerowane migracje początkowe zamiast dodawać nowe i dopisał testy w `backend/events/tests.py` i `backend/users/tests.py`.

### 34. `13ea14b` — preparing for production fucking what part 3

*2026-05-12 · Z-Grate · 23 pliki, +2228 / −82*

- Dodał widok `frontend/src/pages/OnboardingPage.vue` i trasę `/onboarding`; strażnik routera kieruje tam zalogowanych bez zgody RODO albo bez imienia, nazwiska, pseudonimu i Telegrama.
- Dodał pole `VolunteerApplication.lang` (migracja `0003`) i polski szablon `application_confirmation_email_pl.txt`; dotychczasowy szablon przemianował na `_en`.
- Zmienił publiczną listę działów: zwraca `members` (organizatorzy i koordynatorzy z kontaktami zgodnymi z ich ustawieniami udostępniania) oraz `already_member` dla podanego e-maila.
- Wymusił w `PATCH profile/` komplet danych tożsamości (imię, nazwisko, pseudonim, Telegram) przy zapisie profilu.
- Dodał testy `frontend/e2e/onboarding.spec.ts` oraz testy backendu w `events`, `users` i `benefits`.

### 35. `7975291` — preparing for production kill me part 4

*2026-05-13 · Z-Grate · 32 pliki, +1506 / −379*

- Dodał wspólny mechanizm `backend/services/templated_notification.py` i przepisał na niego e-maile potwierdzenia zgłoszenia, zaproszenia i magicznego linku z szablonami `_pl` i `_en`.
- Dodał serwis `send_application_decision_email` i szablony `application_accepted_email_*` oraz `application_rejected_email_*`; akcje `accept` i `reject` zwracają `decision_email_sent`.
- Dodał usuwanie zgłoszeń przez administratora (`DELETE volunteer-applications/<id>/` z wpisem audytu) i przycisk w `AdminPage.vue`.
- Zablokował ponowne zgłoszenie do działu lub zespołu przy dowolnym istniejącym zgłoszeniu (nie tylko oczekującym) i dodał `already_applied` do publicznej listy działów.
- Wyłączył przekierowanie do logowania po odpowiedzi 401 na publicznym formularzu zgłoszenia (`frontend/src/main.ts`) i dodał wybór języka zaproszenia przy dodawaniu wolontariusza do wydarzenia.
- Dopisał testy backendu oraz testy Playwright (`public-apply-auth.spec.ts`, regresje okien podglądu).

### 36. `8142ba5` — prepraing for production its 2 am i need sleep

*2026-05-13 · Z-Grate · 12 plików, +313 / −88*

- Rozbudował `backend/core/management/commands/custom_seed.py` (203 zmienione wiersze; szczegółów danych nie analizowano).
- Dodał `note_translations` do danych członków w `backend/events/serializers.py` i edycję notatki członka działu osobno dla każdego języka w `AdminPage.vue`.
- Przeniósł okno poziomów benefitów w `BenefitsPage.vue` do `Teleport`, podniósł `z-index` w `App.vue` i dodał style list w `FooterStaticPage.vue`.
- Poprawił treść polskich szablonów e-maili i kilka polskich tłumaczeń interfejsu.

### 37. `68e3ddf` — preparing for production - perklelele

*2026-05-13 · Z-Grate · 24 pliki, +705 / −592*

- Dodał do `Benefit` pola `order` i `is_visible_to_volunteer` (migracja `0004_alter_benefit_options_and_more`) i usunął `Event.max_benefit_selections` wraz z limitem liczby wyborów.
- Dodał akcję `POST benefits/admin-apply-changes/`, która jednym żądaniem zapisuje wybory, poziom benefitów, blokadę i korektę punktów; `AdminPage.vue` edytuje je teraz jako szkic zapisywany jednym przyciskiem.
- Dodał do eksportu wolontariuszy kolumny: data dołączenia, Telegram, preferowany kontakt, identyfikator Foxcons, poziom i punkty benefitów (`backend/users/views.py`).
- Usunął z `backend/events/views.py` zmiany z commitów 34–35: usuwanie zgłoszeń, e-maile z decyzją, pole `lang` przy tworzeniu zgłoszenia oraz `members`, `already_member` i `already_applied` w publicznej liście działów; diff nie wyjaśnia, czy było to zamierzone.
- Usunął wymóg kompletu danych tożsamości w `PATCH profile/` oraz parametr `lang` zaproszenia; skrócił `backend/users/tests.py` o 215 wierszy.

### 38. `102ac1c` — preparing for production -are we there yet?

*2026-05-13 · Z-Grate · 15 plików, +44 / −95*

- Wymusił ustawienie `DJANGO_SECRET_KEY` przy wyłączonym `DEBUG` (`ImproperlyConfigured`) w `backend/config/settings.py`.
- Dodał ustawienia `CORS_ALLOWED_ORIGINS`, `SESSION_COOKIE_SECURE`, `CSRF_COOKIE_SECURE`, `SECURE_SSL_REDIRECT` i HSTS z bezpiecznymi wartościami domyślnymi poza trybem deweloperskim oraz wpisy w `backend/.env.example`.
- Wygenerował ponownie migracje początkowe, wcielając do nich usunięte migracje `benefits/0004`, `events/0003` i `events/0004`.

### 39. `af79156` — preparing for production - please let this be the end

*2026-05-13 · Z-Grate · 15 plików, +291 / −40*

- Dodał `frontend/src/utils/markdown.ts` (`markdown-it` z sanityzacją `dompurify` i listą dozwolonych znaczników) oraz komponent `frontend/src/components/MarkdownContent.vue`.
- Zaczął renderować Markdown w opisach wydarzeń, benefitów, poziomów benefitów i działów (`EventSelectPage`, `BenefitsPage`, `DepartmentManagerPage`, `ProfilePage`, `PublicVolunteerApplyPage`, `AdminPage`, `FooterStaticPage`).
- Dodał style `.markdown-content` w `frontend/src/style.css`, nowe klucze tłumaczeń i poprawki w `custom_seed.py`.

### 40. `82396cc` — preparing for production - owoooo we are almost thereeee

*2026-05-14 · Z-Grate · 11 plików, +164 / −47*

- Usunął bazowe pola `Benefit.description`, `EventBenefitLevel.description` i `EventBenefitLevel.requirement_description` (migracja `0004_remove_benefit_description_and_more`); opisy pochodzą już tylko z tłumaczeń.
- Przywrócił w publicznej liście działów pola `already_member`, `already_applied` (z pominięciem zgłoszeń odrzuconych) i `members` z kontaktami zależnymi od ustawień udostępniania (`backend/events/views.py`).
- Zmienił `PublicVolunteerApplyPage.vue`: pomija działy, do których wolontariusz już należy lub się zgłosił, a po wysłaniu zgłoszenia wybiera wydarzenie i prowadzi do profilu albo logowania.
- Dodał style wyświetlania Markdown w jednej linii w `BenefitsPage.vue` i dostosował formularze benefitów w `AdminPage.vue`.

### 41. `1a8655b` — fix: no key error

*2026-05-14 · Z-Grate · 1 plik, +18 / −0*

- Dodał w `frontend/src/pages/AdminPage.vue` funkcję `slugifyDepartmentKey` i wysyłanie klucza `key` wygenerowanego z nazwy przy tworzeniu działu.

### 42. `a124747` — fix: notes can now be empty

*2026-05-15 · Z-Grate · 4 pliki, +168 / −10*

- Umożliwił zapisanie pustej notatki członka działu, także pustego tłumaczenia dla wybranego języka (`backend/events/views.py`).
- Zmienił `translate_with_fallback` w `backend/services/i18n.py`: istniejący klucz języka zwraca swoją wartość nawet wtedy, gdy jest pusta.
- Przestał usuwać puste tłumaczenia notatki przed wysłaniem w `frontend/src/pages/AdminPage.vue`.
- Dodał testy regresyjne w `backend/events/tests_note_clearing.py`.

### 43. `cf0bb5d` — preparing for production: Last fixes i hope

*2026-05-16 · Z-Grate · 4 pliki, +407 / −205*

- Rozszerzył `PATCH profile/` o pola `accept_gdpr` i `permanent_processing`, dzięki czemu dane tożsamości i zgoda RODO zapisują się jednym żądaniem (`backend/users/views.py`, nowa funkcja `_parse_yes_no_bool`).
- Usunął wymóg wcześniejszej zgody RODO przy aktywowaniu wolontariusza przez administratora i organizatora.
- Uprościł `frontend/src/pages/OnboardingPage.vue`, usuwając osobne wysyłanie zgody na `profile/gdpr-consent/`.
- Dodał sześć testów w `backend/users/tests.py` (aktywacja bez zgody, zakres organizatora, zapis zgody razem z profilem).

### 44. `0233206` — feat: instruction

*2026-05-16 · Z-Grate - W · 1 plik, +76 / −0*

- Dodał plik `instruction.md` z polską instrukcją dla wolontariusza: zgłoszenie w czterech etapach, logowanie, uzupełnianie profilu, benefity, Telegram i Foxcons oraz FAQ.

### 45. `05198c7` — fix: fix some minor stuff

*2026-05-18 · Z-Grate · 4 pliki, +93 / −2*

- Dodał komponent `frontend/src/components/CollapsibleText.vue`, który skraca tekst dłuższy niż próg i pozwala go rozwinąć.
- Użył go w `frontend/src/pages/ProfilePage.vue` dla notatki publicznej i wartości pól dodatkowych oraz ustawił cztery kolumny siatki danych na ekranach od 1024 px.
- Dodał klucze tłumaczeń `common.expand` i `common.collapse` w `pl` i `en`.

### 46. `370bc89` — fix: css stuff

*2026-05-18 · Z-Grate · 5 plików, +21 / −32*

- Usunął z `frontend/src/pages/AdminPage.vue` lokalne style `.modal-overlay` i `.modal-content` okna zarządzania zespołami (31 wierszy CSS).
- Dodał w `frontend/src/pages/LoginPage.vue` zawijanie banera kontekstu wydarzenia (`flex-wrap`, `overflow-wrap: anywhere`) oraz regułę `@media (max-width: 640px)` dla wąskich ekranów.
- Dodał klucz tłumaczenia `email` w sekcji podglądu zgłoszenia w `frontend/src/i18n/messages/en.ts` i `pl.ts`.
- Dodał dolny margines dla `.actions-row` w `frontend/src/pages/ProfilePage.vue`.

### 47. `7d2b14d` — fix: test and adminpage

*2026-05-18 · Z-Grate · 5 plików, +89 / −60*

- Przebudował okno zmiany nazwy zespołu w `frontend/src/pages/AdminPage.vue` na wspólny układ modali (`modal-header`, `modal-body`, `modal-footer`, przycisk zamknięcia, `form-grid`).
- Usunął z `openCreateCustomFieldDialog()` blokadę wymagającą wcześniejszego wyboru wydarzenia.
- Dostosował testy Playwright (`frontend/e2e/authenticated.spec.ts`, `layout-regressions.spec.ts`, `onboarding.spec.ts`) do aktualnego interfejsu: nowe selektory, modal potwierdzenia `.confirm-modal` zamiast natywnego `confirm`, dodatkowe oczekiwania na załadowanie kroków.
- Poprawił atrapy API w `frontend/e2e/fixtures.ts`: obsługę metod `OPTIONS`/`HEAD`, dopasowanie tylko dokładnej ścieżki `/api/profile/` (reszta przez `route.fallback()`) i wzorzec `**/api/public/departments*`.

### 48. `6d8a47f` — fix: translations

*2026-05-18 · Z-Grate · 1 plik, +2 / −2*

- Zmienił w `frontend/src/i18n/messages/pl.ts` teksty `eventSelect.title` i `eventSelect.volunteerButton` z „Wybierz wydarzenie” na „Zaloguj się do wydarzenia”.

### 49. `74bfc8a` — fix: translation

*2026-05-18 · Z-Grate · 2 pliki, +4 / −4*

- Zmienił etykiety `footer.aboutLink` i `footer.aboutTitle` z „O nas” / „About” na „Jak korzystać z systemu?” / „How to use the system?” w `frontend/src/i18n/messages/pl.ts` i `en.ts`.

### 50. `1a8e083` — fix: styles changes

*2026-05-18 · Z-Grate · 4 pliki, +54 / −10*

- Zamienił kolejność przycisków na karcie wydarzenia w `frontend/src/pages/EventSelectPage.vue`: pierwszy jest przycisk aplikowania (`#apply`, pomarańczowe tło), a przycisk wejścia do wydarzenia stał się mniejszy (`btn-small`); kolory tekstu przeszły na zmienne motywu (`--text-primary`, `--text-muted`, `--text-secondary`).
- Zmienił w `pl.ts` tekst `eventSelect.volunteerButton` na „Przejdź do profilu ->” i dodał wykrzyknik do `applyButton`.
- Dodał w `frontend/src/pages/FooterStaticPage.vue` rozmiary czcionek dla nagłówków `h1`–`h6` treści stron statycznych.
- Wyłączył w `frontend/src/utils/markdown.ts` opcję `breaks` (łamanie wierszy zgodne z CommonMark) i dopuścił w sanitizacji znaczniki `del`, `img`, `kbd`, `s`, `sub`, `sup` oraz atrybuty `alt` i `src`.

### 51. `9d060aa` — descriptions seeder

*2026-05-20 · Z-Grate · 2 pliki, +233 / −1*

- Dodał polecenie `custom_seed_futrolajki2026_template` (`backend/core/management/commands/custom_seed_futrolajki2026_template.py`), które dla wydarzenia „Futrołajki: Apokalipsa” tworzy lub aktualizuje działy z listy `DEPARTMENT_SPECS` (klucz, nazwy i opisy PL/EN, flagi `is_admin_assign_only`, `is_public_selectable`, `allow_team_applications`).
- Polecenie działa tylko przy `DEBUG=True`, wykonuje się w jednej transakcji i usuwa działy wydarzenia spoza listy; `BENEFIT_LEVEL_SPECS` i `CUSTOM_FIELD_SPECS` pozostały pustymi placeholderami.
- Zmienił polski prefiks wiadomości Telegram w `backend/services/telegram.py` z „Wiadomość od Volunteer Nexus” na „Wiadomość z Systemu Wolontariuszy”.

### 52. `c43b2f3` — fix: changes

*2026-05-20 · Z-Grate · 2 pliki, +3 / −8*

- Usunął z polecenia `custom_seed_futrolajki2026_template` krok kasujący działy nieobecne w specyfikacji.
- Przeredagował w `frontend/src/i18n/messages/pl.ts` komunikaty błędów synchronizacji Foxcons (`foxconsLookupError`, `foxconsErrorReasons.not_found`) tak, by mówiły o „systemie Uczestnika” i tym samym adresie e-mail.

### 53. `8e384ef` — feat: Points sytem, some fixes

*2026-05-21 · Z-Grate - W · 19 plików, +1968 / −41*

- Dodał do modelu `Event` (`backend/events/models.py`, migracja `0003`) rozszerzony system godzin: `is_extended_hours_system_enabled`, `hide_global_levels_list`, przeliczniki `declared_hours_before_rate` / `_during_rate` / `_after_rate` oraz tłumaczone tytuł, treść Markdown i etykietę notatki strony deklaracji godzin.
- Rozszerzył `VolunteerEventBenefits` (`backend/benefits/models.py`, migracja `0005`) o deklarowane godziny przed, w trakcie i po wydarzeniu, `declaration_note`, blokadę deklaracji (`hours_declaration_locked`, `_locked_at`, `_locked_by`) i ograniczenia nieujemności; `total_points` uwzględnia odtąd `points_from_declared_hours`.
- Dodał do `EventBenefitLevel` pole `is_visible_in_global_levels`; podsumowanie benefitów dla wolontariusza zwraca tylko widoczne poziomy benefitów.
- Dodał w `BenefitViewSet` (`backend/benefits/views.py`) akcje `update-hours-declaration` i `lock-hours-declaration` (tylko pełne, nieujemne godziny, wpis w dzienniku audytu) oraz obsługę pól deklaracji i blokady w `admin-apply-changes`.
- Publiczne zgłoszenie (`PublicVolunteerApplicationCreateView` w `backend/events/views.py`) zapisuje deklarowane godziny w portfelu benefitów i język zgłoszenia w polu `lang`; zaakceptowanie zgłoszenia blokuje deklarację godzin; `VolunteerApplicationSerializer` zwraca zadeklarowane godziny i notatkę.
- W interfejsie dodał sekcję deklaracji godzin w `frontend/src/pages/BenefitsPage.vue` (zapis, zatwierdzenie z potwierdzeniem, zwijanie długich opisów), dodatkowy krok deklaracji w kreatorze `PublicVolunteerApplyPage.vue` (4 lub 5 kroków), edycję godzin i blokady w `AdminPage.vue` oraz metody `updateHoursDeclaration` i `lockHoursDeclaration` w `frontend/src/stores/benefits.ts`.
- W `frontend/src/App.vue` nawigacja do strony głównej jest pokazywana zawsze; dodał testy backendu (`BenefitDeclaredHoursTests`, `BenefitLevelsVisibilityPayloadTests`, `PublicVolunteerApplicationDeclaredHoursTests`).

### 54. `8a0c534` — Merge branch 'main' of https://github.com/zgrate/volunteer-crm

*2026-05-21 · Z-Grate · 19 plików, +1968 / −41*

- Scalił zdalną gałąź `main` z commitem `8e384ef` (system punktów i deklaracji godzin) z lokalną linią zakończoną na `c43b2f3`.
- Scalenie przebiegło bez konfliktów; różnica względem pierwszego rodzica jest tożsama ze zmianami z `8e384ef`.

### 55. `c4ec60f` — feat: backup

*2026-05-21 · Z-Grate · 10 plików, +415 / −0*

- Dodał usługę `backup` w `docker-compose.prod.yml` (obraz z `docker/backup/Dockerfile.prod` na bazie `postgres:16-alpine`) z konfiguracją przez zmienne `BACKUP_*` oraz wolumen `django_private` podpięty do backendu.
- Dodał skrypt `docker/backup/backup.sh`: `pg_dump` bazy, kopia katalogów media i private, archiwum `tar.gz` w `daily/`, dowiązanie `latest.tar.gz`, promowanie kopii do `weekly/` i `monthly/` w wybrane dni oraz rotację (domyślnie 7 / 4 / 12).
- Dodał `backup-loop.sh` (cykliczne uruchamianie co `BACKUP_INTERVAL_SECONDS`), `backup-entrypoint.sh` (podpolecenia `backup`, `backup-loop`, `restore`, `restore-preflight`) i `restore-preflight.sh` (sprawdzenie zawartości archiwum i dostępności PostgreSQL).
- Dodał `docker/backup/restore.sh`, który po potwierdzeniu `BACKUP_RESTORE_CONFIRM=yes` usuwa i odtwarza bazę oraz przywraca pliki media i private.
- Opisał kopie zapasowe w `README.md` i w nowym `docs/production-backup-runbook.md`; dodał `backups/` do `.gitignore`.

### 56. `e4bd7e7` — feat: max hours

*2026-05-22 · Z-Grate · 16 plików, +455 / −34*

- Dodał do `Event` limity `max_declared_hours_before`, `max_declared_hours_during`, `max_declared_hours_after` (domyślnie 0; migracja `backend/events/migrations/0004_event_max_declared_hours.py`) i wystawił je w serializerach wydarzenia oraz w panelu Django.
- Dodał `backend/services/declared_hours.py` z funkcją `find_declared_hours_limit_exceedances`, zwracającą listę przekroczeń limitów.
- Akcja `update-hours-declaration` i publiczne zgłoszenie odrzucają odtąd godziny powyżej limitu (HTTP 400); `admin-apply-changes` zapisuje je mimo przekroczenia i zwraca `admin_warnings`.
- W `frontend/src/pages/BenefitsPage.vue` i `PublicVolunteerApplyPage.vue` dodał podpowiedź maksymalnej liczby godzin, walidację pól i okno błędu; w `AdminPage.vue` ostrzeżenie o nadpisaniu limitu z potwierdzeniem zapisu.
- Poprawił kilka etykiet działów w `en.ts` i dodał testy przekroczenia limitów w `backend/benefits/tests.py` i `backend/events/tests.py`.

### 57. `6955a32` — fixes: error 500

*2026-05-22 · Z-Grate · 3 pliki, +73 / −1*

- Dodał do `EventBenefitLevelSerializer` (`backend/benefits/serializers.py`) zapisywalne pole `event` oraz walidację zabraniającą przeniesienia istniejącego poziomu benefitów do innego wydarzenia.
- Zmienił w `backend/entrypoint.prod.sh` uruchamianie serwera na `python -m gunicorn`.
- Dodał testy `EventBenefitLevelApiTests` (tworzenie poziomu z wydarzeniem, blokada zmiany wydarzenia).

### 58. `f0baf40` — feat: change email data

*2026-05-22 · Z-Grate · 2 pliki, +2 / −2*

- Dopisał w `publicApply.step1Title` (`frontend/src/i18n/messages/en.ts`, `pl.ts`) prośbę o użycie tego samego adresu e-mail, którym zgłaszający rejestruje się na wydarzenie jako uczestnik; innych zmian w commicie nie ma.

### 59. `2b79b6e` — fix: application showcase

*2026-05-22 · Z-Grate · 1 plik, +9 / −0*

- Dodał w `frontend/src/pages/AdminPage.vue` pola `team` i `team_name` do typu zgłoszenia, kolumnę zespołu w tabeli zgłoszeń i w oknie podglądu oraz uwzględnił nazwę zespołu w wyszukiwaniu.

### 60. `8fc1fe9` — feat: multi section system

*2026-05-22 · Z-Grate · 11 plików, +878 / −222*

- Zastąpił pojedynczy klucz `DepartmentMembership.team` relacją wiele-do-wielu `teams` i flagą `without_section` oraz dodał model `DepartmentMembershipTeamAssignment` (stanowisko i notatka per zespół) w `backend/events/models.py`; migracja `0005` kopiuje dotychczasowe przypisania.
- Akcja `add-member` w `DepartmentViewSet` przyjmuje `team_ids`, `team_notes`, `team_roles` i `without_section` (z zachowaniem starego `team_id`), synchronizuje przypisania do zespołów i zapisuje je w dzienniku audytu.
- Serializery działów i członkostw zwracają `team_ids`, `team_names`, `team_memberships` i `without_section` oraz zgodnościowe `team_id` / `team_name`; akceptacja zgłoszenia dodaje zespół do członkostwa zamiast go nadpisywać.
- `UserProfileSerializer` (`backend/users/serializers.py`) zwraca `department_memberships` z nazwami zespołów; `frontend/src/pages/ProfilePage.vue` pokazuje działy z listą zespołów.
- W `frontend/src/pages/AdminPage.vue` zakładka zarządzania działami pozwala przypisać wolontariusza do wielu zespołów z osobnym stanowiskiem i notatką lub oznaczyć go jako „bez sekcji”; usunięto stare funkcje dodawania i usuwania wolontariusza z działu z okna edycji.
- `frontend/src/pages/DepartmentManagerPage.vue` wyświetla wiele zespołów członka i sortuje członków według roli; panel Django pokazuje zespoły przez `teams_display` i `filter_horizontal`.

### 61. `7e11f93` — fix: added Delete method

*2026-05-23 · Z-Grate · 2 pliki, +29 / −10*

- Dopuścił metodę `DELETE` w `VolunteerApplicationViewSet` (`backend/events/views.py`) i dodał `destroy`, które pozwala usuwać zgłoszenia tylko administratorom (`is_staff`), a pozostałym zwraca 403.
- W `backend/events/tests.py` dodał test `test_non_admin_cannot_delete_application` i usunął z testów akceptacji i odrzucenia oczekiwania dotyczące `send_application_decision_email`.

### 62. `11d4ffd` — feat: 500x logger

*2026-05-25 · Z-Grate - W · 8 plików, +496 / −16*

- Dodał `RequestIdMiddleware` (`backend/core/middleware.py`), który nadaje każdemu żądaniu identyfikator i zwraca go w nagłówkach `X-Request-ID` oraz `X-Correlation-ID`.
- Istniejący middleware audytu zapisuje odtąd nieobsłużone wyjątki i odpowiedzi 5xx przez `log_http_5xx_failure`; nowy `core.exception_handlers.audit_exception_handler` robi to samo dla błędów obsługiwanych przez DRF, bez duplikowania wpisów.
- Rozbudował `backend/services/audit_log.py` o `log_http_5xx_failure` i `log_worker_failure` z tracebackiem, nagłówkami, parametrami i treścią żądania, przycinaniem długich wartości i maskowaniem pól wrażliwych (hasła, tokeny, ciasteczka).
- Dodał akcje `server_error_http` i `server_error_worker` do `AuditLog.Action` (migracja `backend/core/migrations/0003_alter_auditlog_action.py`).
- Zadania Celery wysyłki masowej i `rescan_foxcons_user_ids_task` w `backend/core/tasks.py` logują wyjątki jako błędy workera.
- Dodał testy `ServerErrorAuditTests` w `backend/core/tests.py`.

### 63. `fb820ec` — Merge branch 'main' of github.com:zgrate/volunteer-crm

*2026-05-25 · Z-Grate - W · 33 pliki, +1864 / −277*

- Scalił `main` (commity od `c43b2f3` do `7e11f93`: poprawka seedera, kopie zapasowe, limity godzin, poprawka poziomów benefitów, kolumna zespołu w zgłoszeniach, wiele zespołów w dziale, usuwanie zgłoszeń) z linią zawierającą logowanie błędów 5xx (`11d4ffd`).
- Scalenie przebiegło bez konfliktów wymagających ręcznych zmian.

### 64. `0b7310e` — fix: bigger audit logs

*2026-05-25 · Z-Grate - W · 1 plik, +3 / −3*

- Podwoił w `backend/services/audit_log.py` limity zapisu błędów serwera: `SERVER_ERROR_TRACEBACK_MAX_CHARS` do 32000, `SERVER_ERROR_CONTEXT_MAX_CHARS` do 64000 i `SERVER_ERROR_FIELD_MAX_CHARS` do 8000.

### 65. `b1c8f45` — fix: changes

*2026-05-25 · Z-Grate - W · 6 plików, +745 / −536*

- Poprawił w `ProfileView` (`backend/users/views.py`) zapytanie o zespoły wolontariusza, które nadal odwoływało się do usuniętego pola `team_id`, na relację `teams`.
- Dostosował testy w `backend/benefits/tests.py`, `backend/events/tests.py`, `backend/users/tests.py` i `backend/core/tests.py` do aktualnych modeli: pola `*_translations`, klucz `key` działu, relacja `teams`, osobna lista `organizers` w publicznym endpoincie działów.
- Zmienił się `frontend/package-lock.json` (plik generowany, nieanalizowany).

### 66. `af00ace` — feat: new audit logging

*2026-05-25 · Z-Grate - W · 4 pliki, +167 / −12*

- Dodał w `backend/core/signals.py` odbiornik sygnału `got_request_exception`, który zapamiętuje na żądaniu wyjątek i jego traceback.
- `log_http_5xx_failure` (`backend/services/audit_log.py`) korzysta z przechwyconego wyjątku, gdy nie dostał go wprost, i zapisuje pola `traceback_kind` oraz `traceback_source`.
- Zabezpieczył odczyt treści żądania tak, by błąd parsowania nie przerywał zapisu wpisu audytu.
- Dodał `backend/core/test_urls_500.py` i testy pełnego przepływu błędu 500 w `backend/core/tests.py`.

### 67. `75e3d7f` — feat: descriptions of teams

*2026-05-25 · Z-Grate - W · 14 plików, +843 / −70*

- Dodał do modelu `Team` pole `description_translations` i metodę `translated_description` (`backend/events/models.py`, migracja `0006`).
- `TeamSerializer` przyjmuje `description` i `description_translations` z normalizacją kodów języków oraz zwraca `translated_description`; `VolunteerApplicationSerializer` zwraca `team_description`, a publiczna lista działów opis każdego zespołu.
- W `frontend/src/pages/AdminPage.vue` dodał pola opisu zespołu (per język) przy tworzeniu i edycji zespołu.
- W `DepartmentManagerPage.vue`, tabeli zgłoszeń w `AdminPage.vue` i w `PublicVolunteerApplyPage.vue` dodał ikonę „i” z dymkiem opisu zespołu, widocznym po najechaniu na ikonę.
- Dodał testy `TeamDescriptionTranslationApiTests` oraz testy Playwright dymków; rozbudował atrapy w `frontend/e2e/fixtures.ts`.

### 68. `f3edd70` — fix: steps, feat: app filters

*2026-05-25 · Z-Grate - W · 6 plików, +398 / −82*

- Poprawił w `frontend/src/pages/PublicVolunteerApplyPage.vue` przejście do kroku podsumowania, używając `summaryStepNumber` zamiast sztywnej wartości 5.
- W zakładce zgłoszeń `frontend/src/pages/AdminPage.vue` dodał domyślny filtr „tylko oczekujące”, wybór widocznych filtrów i kolumn tabeli, podsumowanie aktywnych filtrów i przycisk ich czyszczenia.
- Dodał renderowanie kolumn zgłoszenia przez `renderApplicationColumn` (daty, odpowiedzi na pola niestandardowe).
- Dodał testy Playwright filtrów zgłoszeń oraz kroku deklaracji godzin przy włączonym i wyłączonym systemie godzin.

### 69. `4127a84` — feat: applicatoin view

*2026-05-25 · Z-Grate - W · 5 plików, +432 / −9*

- Dodał w tabeli zgłoszeń `frontend/src/pages/AdminPage.vue` filtr po identyfikatorze zgłoszenia, zakres dat utworzenia i filtry po wartościach pól niestandardowych.
- Dodał sortowanie tabeli zgłoszeń po kolumnach (`applicationSortKey`, `applicationSortDirection`).
- Dodał eksport widocznych kolumn do CSV (`downloadApplicationsCsvExport`).
- Dodał test Playwright filtrowania, sortowania i eksportu oraz nowe tłumaczenia i atrapy.

### 70. `4a5653f` — feat: new test system

*2026-05-25 · Z-Grate - W · 5 plików, +423 / −10*

- Dodał skrypt `test.sh`, który uruchamia testy backendu, e2e, lint i build frontendu w odizolowanym projekcie Docker Compose (`volunteer-crm-test`), z opcjami m.in. `--backend`, `--frontend`, `--targets`, `--backend-tests`, `--continue-on-failure`, `--keep-containers`.
- Dodał w `backend/config/settings.py` zmienną `DJANGO_TEST_DB_MODE`: przy wartości `postgres` testy używają bazy PostgreSQL (`POSTGRES_TEST_DB_NAME`), w przeciwnym razie SQLite.
- Zmienił obraz `frontend/Dockerfile.dev` na `node:22-bookworm-slim` i dodał instalację Chromium dla Playwright.
- Poprawił testy `AppSettings` w `backend/core/tests.py` pod singleton i opisał skrypt w `README.md`.

### 71. `397b015` — feat: applications changes

*2026-05-26 · Z-Grate - W · 7 plików, +935 / −157*

- Wydzielił w `VolunteerApplicationViewSet` (`backend/events/views.py`) metody `_accept_application`, `_reject_application` i `_delete_application`; usunięcie zgłoszenia zapisuje wpis w dzienniku audytu.
- Dodał akcje zbiorcze `bulk-accept`, `bulk-reject` i `bulk-delete` (tylko dla `is_staff`), zwracające dla każdego identyfikatora wynik `processed`, `skipped` lub `failed` oraz liczniki.
- Dodał `VolunteerApplicationBulkActionRequestSerializer` z limitem 100 identyfikatorów i usuwaniem duplikatów.
- W `frontend/src/pages/AdminPage.vue` dodał zaznaczanie zgłoszeń, wspólną notatkę, zbiorcze akceptowanie, odrzucanie i usuwanie oraz okno potwierdzenia usunięcia pojedynczego zgłoszenia.
- Umożliwił poziome przewijanie tabel w `AdminPage.vue` i `DepartmentManagerPage.vue` na wąskich ekranach.
- Dodał testy akcji zbiorczych w `backend/events/tests.py` i testy Playwright.

### 72. `9bfcde5` — feat: telegram in the middle fix

*2026-05-26 · Z-Grate - W · 2 pliki, +193 / −14*

- Przeniósł w `frontend/src/pages/ProfilePage.vue` okno z pytaniem o ustawienie Telegrama jako preferowanego kontaktu do `<Teleport to="body">` i podniósł jego `z-index` do 1300, aby było wyśrodkowane nad stroną.
- Dodał zarządzanie fokusem (fokus na przycisku potwierdzenia po otwarciu, powrót do poprzedniego elementu po zamknięciu) i zamykanie klawiszem Esc.
- Dodał test Playwright sprawdzający wyśrodkowanie i fokus okna w `frontend/e2e/authenticated.spec.ts`.

### 73. `26e0f42` — trans fixes

*2026-05-26 · Z-Grate · 1 plik, +1 / −1*

- Przeredagował polski tekst `telegramConnectHint` w `frontend/src/i18n/messages/pl.ts` (podłączony Telegram służy do wysyłania wiadomości przez bota).

### 74. `40311ba` — fix: broken docker compose, other stuff

*2026-05-27 · Z-Grate · 2 pliki, +9 / −15*

- Zastąpił w `docker-compose.prod.yml` nazwane wolumeny Dockera (`postgres_data`, `django_static`, `django_media`, `django_private`) katalogami hosta pod `/etc/volunteer_hub/` i usunął sekcję `volumes`.
- Usługa `backup` montuje pliki prywatne z `/etc/volunteer_hub/private`, podczas gdy backend używa `/etc/volunteer_hub/django_private`; z diffu nie wynika, czy ta różnica jest zamierzona.
- Dodał w `backend/entrypoint.prod.sh` opcje `--access-logfile -` i `--error-logfile -` dla gunicorna (logi na standardowe wyjście).

### 75. `47cb96a` — Merge branch 'main' of github.com:zgrate/volunteer-crm

*2026-05-27 · Z-Grate · 14 plików, +1552 / −182*

- Scalił `main` (commity `4a5653f`, `397b015`, `9bfcde5`, `26e0f42`: skrypt testowy, akcje zbiorcze na zgłoszeniach, poprawka okna Telegrama, tłumaczenie) z lokalną poprawką `40311ba` dotyczącą `docker-compose.prod.yml`.
- Scalenie przebiegło bez konfliktów wymagających ręcznych zmian.

### 76. `9b52dee` — feat: audit log foxcons

*2026-05-27 · Z-Grate · 8 plików, +774 / −39*

- Rozbudował `backend/services/foxcons.py` o szczegółowy audyt synchronizacji identyfikatorów Foxcons: wpis dla każdej decyzji (pominięcie, błąd, synchronizacja ze stanem przed i po) oraz wpisy przebiegu typu `FoxconsSyncRun`.
- Funkcje synchronizacji przyjmują `audit_context` (źródło, zakres, `sync_run_id`, użytkownik wywołujący, ścieżka i identyfikator żądania), przekazywany z `backend/events/views.py`, `backend/users/views.py` i zadania Celery w `backend/core/tasks.py`.
- Skanowanie przy starcie aplikacji (`backend/services/foxcons_startup.py`) jest pomijane dla poleceń zarządzania takich jak `migrate`, `test`, `collectstatic`, a jego wyjątki trafiają do logu i do `log_worker_failure`.
- Dodał testy audytu synchronizacji w `backend/core/tests.py` i `backend/users/tests.py`.

### 77. `f41586e` — feat: applications changes

*2026-05-27 · Z-Grate · 7 plików, +494 / −12*

- Dodał akcję `save-review-note` w `VolunteerApplicationViewSet` (`backend/events/views.py`), która pozwala administratorowi zapisać notatkę recenzenta bez zmiany statusu zgłoszenia i tworzy wpis audytu `review_note_saved`.
- W oknie podglądu zgłoszenia `frontend/src/pages/AdminPage.vue` dodał przycisk zapisu notatki oraz drukowanie zgłoszenia w nowym oknie (`printViewingApplication`).
- Dodał tłumaczenia paska akcji zbiorczych (licznik zaznaczonych, „Akceptuj zaznaczone” itd.) i sekcję `applicationPrint`.
- Dodał testy backendu dla `save-review-note` oraz testy Playwright drukowania i zapisu notatki.

### 78. `3d9bdfc` — feat: emaill application improve

*2026-05-27 · Z-Grate · 13 plików, +365 / −93*

- Akceptacja i odrzucenie zgłoszenia wysyłają odtąd powiadomienie o decyzji przez `send_application_decision_notification` (`backend/services/application_decision_email.py`) zamiast zaproszenia `send_event_invitation_email`; odpowiedzi API zawierają `decision_notification_sent`, `decision_delivery_channel` i `decision_delivery_fallback_used`.
- Zbiorcze odrzucanie zwraca dodatkowo liczniki wysłanych i nieudanych powiadomień oraz podział na kanały.
- Przeredagował szablony `backend/users/templates/application_accepted_email_*.txt` i `application_rejected_email_*.txt`: usunął notatkę recenzenta, dodał adres strony (`frontend_url`) i prośbę o zalogowanie.
- `VolunteerApplicationSerializer` ukrywa `review_note` przed osobami, które nie są administratorem ani organizatorem działu.
- Zmienił domyślny język na polski (`LANGUAGE_CODE = "pl"` w `backend/config/settings.py`, `default_locale` w `backend/services/templated_notification.py`); przy braku języka zgłoszenia używany jest język globalny.
- `backend/services/bulk_mailer.py` zamienia adresy URL w treści na klikalne odnośniki w szablonie HTML.

### 79. `41ec9c2` — feat: allow applicaiton with locked declaration

*2026-05-27 · Z-Grate · 2 pliki, +32 / −19*

- Zmienił `PublicVolunteerApplicationCreateView` (`backend/events/views.py`) tak, by zgłoszenie od osoby z zablokowaną deklaracją godzin było przyjmowane; zablokowane godziny i notatka pozostają bez zmian zamiast zwracać błąd 400.
- Zaktualizował test na `test_public_application_allows_when_hours_declaration_locked` w `backend/events/tests.py`.

### 80. `72480ce` — feat: changes to system - api keys, application confirmations for public apply

*2026-05-27 · Z-Grate - W · 18 plików, +1560 / −66*

- Dodał model `UserApiKey` (`backend/users/models.py`, migracja `0002_userapikey`): klucze z prefiksem `vna_` przechowywane jako skrót SHA-256 z pieprzem `API_KEY_PEPPER`, z polami `is_active`, `rotated_at`, `last_used_at`, `last_used_ip`.
- Dodał `ApiKeyAuthentication` (`backend/users/authentication.py`, nagłówek `Authorization: ApiKey …`) do domyślnych klas uwierzytelniania DRF oraz panel Django dla kluczy z akcjami aktywacji, dezaktywacji i rotacji.
- Dodał publiczne endpointy `public/volunteer-application/send-confirmation-code/` i `verify-confirmation-code/` (`backend/events/urls.py`): 7-znakowy kod wysyłany e-mailem, sesja potwierdzenia w cache, limit prób, kontrola zgodności danych z sesją i throttling.
- Wydzielił w `backend/events/views.py` funkcje `_validate_public_apply_payload` i `_finalize_public_applications`, obsługujące jedno zgłoszenie do wielu działów i zespołów; dodał serializery żądania i weryfikacji kodu.
- Dodał `backend/services/application_confirmation_email.py` do wysyłki kodu i poprawił wybór języka w `backend/services/templated_notification.py`.
- W `frontend/src/pages/PublicVolunteerApplyPage.vue` dodał ostatni krok kreatora z kodem potwierdzającym (wysyłka, ponowienie z odliczaniem, weryfikacja i wysłanie zgłoszenia).
- Dodał katalog `audit/` z raportem audytu bezpieczeństwa API i planem dalszego skanowania (wpisany też do `.gitignore`) oraz testy kodów potwierdzających i kluczy API.

### 81. `fb775b3` — Merge branch 'main' of github.com:zgrate/volunteer-crm

*2026-05-27 · Z-Grate - W · 24 pliki, +1673 / −178*

- Scalił `main` (commity `40311ba`, `47cb96a`, `9b52dee`, `f41586e`, `3d9bdfc`, `41ec9c2`: katalogi hosta w compose, audyt Foxcons, notatka recenzenta i druk zgłoszenia, powiadomienia o decyzji, zgłoszenia przy zablokowanej deklaracji) z linią zawierającą klucze API i kody potwierdzające (`72480ce`).
- Ręcznie rozwiązał konflikty w `backend/events/tests.py` i `backend/services/templated_notification.py`.

### 82. `4372aed` — fix: GUI

*2026-05-27 · Z-Grate - W · 1 plik, +1 / −0*

- Dodał `display: block` do stylu `.benefit-description-toggle` w `frontend/src/pages/BenefitsPage.vue`.

### 83. `dea55b3` — fix: benefits

*2026-05-27 · Z-Grate - W · 1 plik, +12 / −10*

- Usunął z karty benefitu w `frontend/src/pages/BenefitsPage.vue` zwijanie długiego opisu i przycisk „rozwiń/zwiń”; opis jest zawsze widoczny w całości.
- Dodał klasy `benefit-title` i `benefit-description` z mniejszą czcionką opisu.

### 84. `895fa72` — fix: errors

*2026-05-27 · Z-Grate - W · 1 plik, +0 / −17*

- Usunął z `frontend/src/pages/BenefitsPage.vue` nieużywane już funkcje `isLongBenefitDescription`, `isBenefitDescriptionExpanded` i `toggleBenefitDescription`.

### 85. `832eb41` — fix: styleee

*2026-05-27 · Z-Grate - W · 2 pliki, +12 / −1*

- Zmniejszył interlinię opisu benefitu (`line-height: 0.95`) i marginesy akapitów oraz list w `frontend/src/pages/BenefitsPage.vue`.
- Dodał `list-style-type: disc` dla elementów list `.markdown-content li` w `frontend/src/style.css`.

### 86. `4d92973` — fix: table in markdown

*2026-05-27 · Z-Grate - W · 2 pliki, +28 / −0*

- Renderer Markdown w `frontend/src/utils/markdown.ts` opakowuje tabele w `<div class="markdown-table-scroll">`; znacznik `div` trafił na listę dozwolonych.
- Dodał w `frontend/src/style.css` style tego kontenera (poziome przewijanie tabel na wąskich ekranach) i minimalną szerokość komórek.

### 87. `b83d18d` — fix: add some styling to headers

*2026-05-27 · Z-Grate - W · 1 plik, +12 / −0*

- Dodał w `frontend/src/style.css` rozmiary, marginesy i grubość czcionki dla nagłówków `h1` i `h2` wewnątrz `.markdown-content`.

### 88. `936b897` — fix: suggestions

*2026-05-28 · Z-Grate - W · 7 plików, +318 / −24*

- Publiczny endpoint pól zgłoszenia (`backend/events/views.py`, `backend/events/serializers.py`) zwraca dla każdego pola `owner_departments` i `owner_teams` z przetłumaczonymi nazwami.
- W `frontend/src/pages/PublicVolunteerApplyPage.vue` każde pytanie dostało etykiety pokazujące, którego działu lub zespołu dotyczy (albo „Całe wydarzenie”).
- Przejście do kolejnego kroku kreatora przewija stronę na górę.
- Uzupełnił w `pl.ts` polskie tłumaczenia kroku z kodem potwierdzającym i zmienił etykiety przełącznika widoku działów.
- Dodał testy `PublicVolunteerApplicationFieldsOwnerMetadataTests` oraz test Playwright.

### 89. `5e0393f` — feat: public application skip ver on login

*2026-05-28 · Z-Grate - W · 7 plików, +386 / −16*

- Dodał endpoint `public/volunteer-application/submit-authenticated/` (`PublicVolunteerApplicationAuthenticatedSubmitView`), który przyjmuje zgłoszenie zalogowanego użytkownika bez kodu potwierdzającego, o ile e-mail w danych zgadza się z e-mailem konta.
- `UserProfileSerializer` (`backend/users/serializers.py`) zwraca `wallet_hours_declaration_status` z blokadą i wartościami deklaracji godzin dla wybranego wydarzenia.
- W `frontend/src/pages/PublicVolunteerApplyPage.vue` zalogowany użytkownik wysyła zgłoszenie prosto z podsumowania, a krok deklaracji godzin jest pomijany, gdy deklaracja jest zablokowana; liczba kroków kreatora jest liczona dynamicznie.
- Dodał testy backendu (`backend/events/tests.py`, `backend/users/tests.py`) i testy Playwright obu ścieżek.

### 90. `cc4c8a6` — feat: saving applpications

*2026-05-28 · Z-Grate - W · 3 pliki, +440 / −0*

- Dodał w `frontend/src/pages/PublicVolunteerApplyPage.vue` automatyczny zapis roboczej wersji zgłoszenia w `localStorage`, osobno dla każdego wydarzenia.
- Po powrocie do formularza wyświetla się pytanie, czy kontynuować zapisane zgłoszenie od zapamiętanego kroku, czy zacząć nowe (`continueApplicationFromDraft`, `startNewApplicationFromDraft`).
- Błędy zapisu do `localStorage` są ignorowane, aby formularz pozostał używalny.
- Dodał tłumaczenia sekcji `publicApply.draft` w `en.ts` i `pl.ts`; zmiana dotyczy wyłącznie frontendu.

### 91. `9132932` — feat: Disable application

*2026-05-29 · Z-Grate · 12 plików, +322 / −5*

- Dodał do modelu `Event` trzy przełączniki publicznego formularza zgłoszeń: `allow_public_anonymous_apply`, `allow_public_authenticated_apply` i `disable_public_apply_button` (`backend/events/models.py`, migracja `0007_event_allow_public_anonymous_apply_and_more.py`), wystawił je w `EventSerializer`, `PublicEventSerializer` i w panelu Django (`backend/events/admin.py`).
- Dodał w `backend/events/views.py` funkcję `_public_apply_channel_guard`, która zwraca 403 z kodami `public_apply_globally_disabled`, `public_authenticated_apply_disabled` lub `public_anonymous_apply_disabled`, i wpiął ją w `_validate_public_apply_payload` (nowy parametr `is_authenticated`) oraz w `PublicVolunteerApplicationCreateView`.
- Dodał w `frontend/src/router/index.ts` strażnika trasy `public-apply`, który odsyła na `event-select`, gdy zgłoszenia dla wydarzenia lub danego kanału (zalogowany / anonimowy) są wyłączone.
- Zablokował przycisk zgłoszenia na liście wydarzeń wraz z powodem blokady (`frontend/src/pages/EventSelectPage.vue`) i dodał sprawdzenie kanału przed każdym krokiem wysyłki w `frontend/src/pages/PublicVolunteerApplyPage.vue`.
- Dodał tłumaczenia komunikatów (`pl.ts`, `en.ts`) i pięć testów backendu odrzucających zgłoszenia przy wyłączonych kanałach (`backend/events/tests.py`).

### 92. `2b52160` — feat: disable public register

*2026-05-29 · Z-Grate · 15 plików, +350 / −21*

- Dodał do `Event` pola `disable_public_apply_for_unknown_emails` i `public_apply_unknown_email_disabled_message_translations` oraz metodę `translated_public_apply_unknown_email_disabled_message` (`backend/events/models.py`, migracja `0008`).
- Dodał w `backend/events/views.py` funkcję `_public_apply_unknown_email_guard`, która przy włączonej blokadzie odrzuca (403) zgłoszenia z adresów e-mail bez istniejącego konta; wpiął ją w `_validate_public_apply_payload`, `PublicDepartmentListView` i `PublicVolunteerApplicationCreateView`.
- Wyłączył automatyczne zakładanie kont przy logowaniu: `exchange_code_for_jwt` w `backend/services/oidc.py` zgłasza `oidc_account_not_found` zamiast tworzyć użytkownika, a `MagicLinkRequestView` i `MagicLinkVerifyView` zwracają `magic_link_account_not_found` dla nieznanego adresu (`backend/users/views.py`).
- Dodał mapowanie nowych kodów błędów na komunikaty w `frontend/src/stores/auth.ts`, `frontend/src/pages/OAuthCallbackPage.vue` i `frontend/src/pages/PublicVolunteerApplyPage.vue` (formularz zostaje na kroku 1).
- Dodał testy backendu (`backend/events/tests.py`, `backend/users/tests.py`) i test e2e `frontend/e2e/public-apply-auth.spec.ts`.

### 93. `28eee63` — fix: Fix Telegram fallbacks

*2026-05-30 · Z-Grate · 1 plik, +2 / −2*

- Usunął w `frontend/src/pages/ProfilePage.vue` podstawianie imienia, nazwiska i `telegram_handle` z profilu w miejsce brakujących danych Telegrama: karta połączonego konta pokazuje wyłącznie `telegram_first_name`/`telegram_last_name` oraz `@telegram_username` albo „—”.

### 94. `d334746` — feat: pending applications

*2026-05-30 · Z-Grate · 7 plików, +322 / −5*

- Dodał do `UserProfileSerializer` pole `pending_applications` z listą oczekujących zgłoszeń użytkownika (wydarzenie, dział, zespół, data), filtrowaną po `event_id` z kontekstu (`backend/users/serializers.py`).
- Dodał w `frontend/src/pages/ProfilePage.vue` sekcję „Oczekujące aplikacje” z licznikiem i datą wysłania, widoczną tylko gdy takie zgłoszenia istnieją.
- Zmienił w `pl.ts` treść banera `notRegisteredBanner` (w trzech miejscach) na informację, że administrator nie przypisał jeszcze użytkownika do wydarzenia.
- Dodał dwa testy profilu (`backend/users/tests.py`) oraz test e2e i dane w `frontend/e2e/fixtures.ts`.

### 95. `9d26a57` — fix: Telegram info

*2026-05-30 · Z-Grate · 1 plik, +0 / −1*

- Usunął w `connectTelegram` (`frontend/src/pages/ProfilePage.vue`) ustawianie komunikatu `profile.telegramConnected` po połączeniu konta Telegram.

### 96. `ebff8af` — fix: both

*2026-05-30 · Z-Grate · 1 plik, +1 / −1*

- Poprawił w `frontend/src/pages/ProfilePage.vue` wyświetlanie nazwy konta Telegram: łączy niepuste `telegram_first_name` i `telegram_last_name`, zamiast pokazywać cokolwiek tylko wtedy, gdy istnieje nazwisko.

### 97. `6af8397` — feat: Add points counter

*2026-05-31 · Z-Grate · 3 pliki, +113 / −4*

- Dodał w oknie podglądu zgłoszenia (`frontend/src/pages/AdminPage.vue`) sekcję „Podgląd wyliczonych punktów”: dla etapów przed, w trakcie i po wydarzeniu pokazuje wzór godziny × przelicznik wydarzenia oraz sumę punktów.
- Dodał funkcje pomocnicze (m.in. `declaredHoursRateForStage`, `applicationPreviewTotalDeclaredPoints`, `shouldShowApplicationPointsPreview`); sekcja pojawia się tylko dla wydarzeń z `is_extended_hours_system_enabled` i zgłoszeń z danymi deklaracji.
- Dodał klucze tłumaczeń `calculatedPoints*` w `pl.ts` i `en.ts`.

### 98. `1b20a1b` — fix: wrapping text

*2026-05-31 · Z-Grate · 4 pliki, +48 / −12*

- Zmienił style w `frontend/src/pages/AdminPage.vue` i `frontend/src/pages/DepartmentManagerPage.vue`: przyciski w tabelach i listach nie łamią tekstu (`white-space: nowrap`), a kontenery przewijają się poziomo (`overflow-x: auto`) zamiast ucinać zawartość.
- Ograniczył łamanie słów do linków `http`/`mailto` w podglądzie wolontariusza oraz do linków w `.markdown-content` (`frontend/src/style.css`).
- Wyczyścił w `pl.ts` etykiety rangi „Członek” (`rankMember`, `member`) do pustego napisu; powodu nie da się ustalić z diffu.

### 99. `1f27877` — fix: applications acccept already declared

*2026-05-31 · Z-Grate · 2 pliki, +62 / −7*

- Usunął z `_validate_public_apply_payload` i `_finalize_public_applications` (`backend/events/views.py`) odrzucanie publicznego zgłoszenia, gdy deklaracja godzin wolontariusza jest zablokowana (`hours_declaration_locked`).
- Dodał test `test_send_code_then_verify_allows_when_hours_declaration_locked` (`backend/events/tests.py`).

### 100. `43f64c7` — feat: error model upgrade

*2026-05-31 · Z-Grate · 4 pliki, +220 / −3*

- Dodał w `frontend/src/pages/PublicVolunteerApplyPage.vue` duże okno modalne błędu wysyłki zgłoszenia (`showErrorModal`, `errorModalMessage`) w miejsce akapitu z błędem pod formularzem.
- Dodał akcje okna: ponowienie ostatniej nieudanej wysyłki (`retryFailedSubmission`, rozróżnia ścieżkę zalogowaną i z kodem potwierdzającym), powrót do listy wydarzeń i zamknięcie.
- Dodał tłumaczenia `publicApply.errorModal.*` oraz dwa testy e2e w `frontend/e2e/public-apply-auth.spec.ts`.

### 101. `9aaff44` — feat: Move length to the app setting

*2026-05-31 · Z-Grate · 12 plików, +287 / −33*

- Dodał do `AppSettings` pola `custom_field_default_short_text_limit` (100) i `custom_field_default_long_text_limit` (500) oraz metodę `get_default_custom_field_text_limit` z bezpiecznym fallbackiem przy braku tabeli (`backend/core/models.py`, migracja `0004_appsettings_custom_field_default_limits.py`).
- Dodał walidację w `AppSettingsSerializer`: limity muszą być ≥ 1, a krótki nie może przekraczać długiego (`backend/core/views.py`); wystawił pola w panelu Django (`backend/core/admin.py`).
- Zastąpił stałe `CustomFieldDefinition.DEFAULT_SHORT_TEXT_LIMIT`/`DEFAULT_LONG_TEXT_LIMIT` odczytem z ustawień w `backend/events/views.py`, `backend/users/models.py` i `backend/users/views.py`.
- Wprowadził osobną stałą `PROFILE_IDENTITY_TEXT_LIMIT = 100` dla loginu, imienia, nazwiska i `telegram_handle` w `ProfileView`.
- Zaktualizował podpowiedzi w `pl.ts`/`en.ts` i dodał testy w `backend/core/tests.py`, `backend/events/tests.py` i `backend/users/tests.py`.

### 102. `f9cd8f4` — feat: Modify fields so multiline is supported

*2026-05-31 · Z-Grate · 4 pliki, +136 / −0*

- Dodał do `ApplicationFieldSerializer` pola `is_long_text` i `max_length`, dzięki czemu publiczna lista pól zgłoszenia niesie informację o długim tekście (`backend/events/serializers.py`).
- Dodał renderowanie `<textarea>` dla pól z `is_long_text` w formularzu publicznym (pola wspólne i pola działu) w `frontend/src/pages/PublicVolunteerApplyPage.vue` oraz w edycji pól własnych w `frontend/src/pages/AdminPage.vue`, wraz ze stylem `.input-textarea`.
- Dodał cztery testy metadanych pól w `backend/events/tests.py`.

### 103. `ee9e4ff` — feat: show applicatiom add detaila

*2026-06-01 · Z-Grate · 5 plików, +268 / −16*

- Dodał do `VolunteerApplicationSerializer` pola `other_applications` (inne zgłoszenia tej osoby w tym samym wydarzeniu) i `existing_team_memberships` (obecne zespoły z rolą), z pamięcią podręczną na czas serializacji (`backend/events/serializers.py`).
- Wydzielił powtarzające się ustalanie języka do metody `_locale_from_request`.
- Dodał w podglądzie zgłoszenia i w jego wydruku sekcje „Inne aplikacje w tym wydarzeniu” i „Obecne zespoły w tym wydarzeniu” (`frontend/src/pages/AdminPage.vue`).
- Dodał tłumaczenia i dwa testy odpowiedzi API (`backend/events/tests.py`).

### 104. `ab500d2` — fix: add info about adblock

*2026-06-02 · Z-Grate · 1 plik, +1 / −1*

- Dopisał w polskim opisie onboardingu (`frontend/src/i18n/messages/pl.ts`, klucz `onboarding.description`) ostrzeżenie, że akceptacja RODO nie działa przy włączonym Adblocku/uBlocku.

### 105. `64f11a1` — feat: timesheet

*2026-06-02 · Z-Grate · 20 plików, +2803 / −8*

- Dodał w aplikacji `benefits` modele `WorkedHoursEntry` (wpis przepracowanych godzin: użytkownik, wydarzenie, dział, zespół, data, godziny, etap przed/w trakcie/po, notatka) i `DeclaredHoursAssignment` (godziny przydzielone z portfela benefitów do działu/zespołu i etapu, z ograniczeniami unikalności), oba z historią (`backend/benefits/models.py`, migracja `0006`).
- Dodał do `Event` przełącznik `is_timesheet_system_enabled` (`backend/events/models.py`, migracja `0009`) i wystawił go w serializerze oraz panelu Django.
- Dodał w `BenefitViewSet` endpointy `timesheet-summary` (dla wolontariusza), `admin-timesheet-summary`, `admin-upsert-worked-entry`, `admin-delete-worked-entry`, `admin-upsert-declared-assignment` i `admin-delete-declared-assignment`, z kontrolą uprawnień do działu (`_can_manage_department_for_user`) i budowaniem podsumowania w `_build_timesheet_summary` (`backend/benefits/views.py`).
- Dodał odpowiadające serializery, m.in. `WorkedHoursEntrySerializer`, `DeclaredHoursAssignmentSerializer`, `DeclaredHoursAssignmentGroupSerializer` i serializery wejściowe `AdminUpsert*`/`AdminDelete*` (`backend/benefits/serializers.py`).
- Dodał stronę `frontend/src/pages/TimesheetPage.vue` (trasa `/timesheet`, link „Karta Godzin” w `App.vue`) z postępem zespołów, przydzielonymi godzinami i wpisami, w widoku tabeli lub kart, z sortowaniem i wyborem kolumn zapamiętywanym lokalnie.
- Dodał w `frontend/src/pages/AdminPage.vue` zakładkę kart godzin: wybór wolontariusza, podsumowanie budżetu godzin oraz formularze dodawania, edycji i usuwania wpisów i przydziałów; rozszerzył `frontend/src/stores/benefits.ts` o `loadTimesheetSummary` i typy.
- Dodał osiem testów backendu (`backend/benefits/tests.py`), test e2e i dane w `frontend/e2e/fixtures.ts`.

### 106. `433a0a5` — fix: table

*2026-06-02 · Z-Grate · 1 plik, +140 / −44*

- Przebudował w `frontend/src/pages/AdminPage.vue` tabelę przydzielonych godzin: wiersze są grupowane po dziale i zespole (`groupedDeclaredAssignments`, typ `TimesheetDeclaredAssignmentGroup`) z osobnymi kolumnami godzin przed, w trakcie i po.
- Zmienił formularz przydziału tak, by edytował trzy etapy naraz; `saveDeclaredAssignment` i `deleteDeclaredAssignment` wysyłają osobne żądania dla każdego etapu, korzystając z zapamiętanych `assignment_ids`.

### 107. `62c12c9` — fix: better new

*2026-06-02 · Z-Grate · 3 pliki, +125 / −64*

- Przebudował układ `frontend/src/pages/TimesheetPage.vue` na bloki sekcji: podział zadeklarowanych godzin, postęp zespołów, godziny przydzielone do zespołów i (przeniesione na koniec) wpisy przepracowanych godzin.
- Dodał kolumnę różnicy między godzinami przepracowanymi a przydzielonymi (`teamDelta`, `formatSignedHours`).
- Zmienił nazewnictwo w `pl.ts` z „cele godzinowe” na „godziny przydzielone do zespołów” i dodał klucze `declaredHoursBreakdown` oraz `timesheetDelta`.

### 108. `b20189e` — feat: button in wolo

*2026-06-02 · Z-Grate · 3 pliki, +149 / −0*

- Dodał w edycji benefitów wolontariusza (`frontend/src/pages/AdminPage.vue`) przycisk „Kopiuj godziny przydzielone do deklaracji”, który pobiera sumy przydziałów z `/benefits/admin-timesheet-summary/`.
- Dodał okno potwierdzenia z porównaniem aktualnej deklaracji i nowych wartości dla trzech etapów; zatwierdzenie zmienia tylko wersję roboczą formularza i wymaga osobnego zapisu.
- Dodał tłumaczenia `copyTargetHours*` w `pl.ts` i `en.ts`.

### 109. `aba6ccb` — fix: fox: 500 error

*2026-06-02 · Z-Grate · 2 pliki, +66 / −7*

- Poprawił `admin_upsert_declared_assignment` (`backend/benefits/views.py`): przy braku `assignment_id` wyszukuje istniejący przydział dla tego samego portfela, działu, zespołu i etapu i go aktualizuje, zamiast tworzyć duplikat łamiący ograniczenie unikalności.
- Zamienił `DjangoValidationError` z `full_clean()` na `serializers.ValidationError`, dzięki czemu API zwraca błąd walidacji zamiast odpowiedzi 500.
- Poprawił akcję w dzienniku audytu, by zależała od faktycznego utworzenia rekordu, i dodał test regresyjny w `backend/benefits/tests.py`.

### 110. `2707ae5` — feat: better preview

*2026-06-02 · Z-Grate · 4 pliki, +468 / −0*

- Rozszerzył podgląd wolontariusza w `frontend/src/pages/AdminPage.vue` o listę jego zgłoszeń ze statusami (`viewingVolunteerApplications`).
- Dodał w podglądzie sekcję karty godzin (status globalny, postęp zespołów, godziny przydzielone, wpisy przepracowanych godzin) ładowaną z `/benefits/admin-timesheet-summary/`, widoczną gdy wydarzenie ma włączony system kart godzin.
- Dodał te same dane (zgłoszenia i kartę godzin) do wydruku wolontariusza (`printViewingVolunteer`).
- Dodał tłumaczenia i test e2e `admin volunteer preview and print include application statuses`.

### 111. `572c565` — feat: send email on benefit changes

*2026-06-03 · Z-Grate · 9 plików, +489 / −57*

- Dodał usługę `backend/services/benefit_change_notification.py` z funkcją `send_benefit_change_notification`, która wysyła wolontariuszowi powiadomienie o zmianie deklaracji lub benefitów preferowanym kanałem (e-mail lub Telegram) przez `send_templated_notification`.
- Dodał szablony `benefit_change_notice_email_pl.txt` i `benefit_change_notice_email_en.txt` w `backend/users/templates/`.
- Rozszerzył akcję administracyjnego zapisu zmian benefitów w `BenefitViewSet` o flagę `notify_volunteer_about_benefit_changes`; odpowiedź zawiera `notification_sent`, `notification_channel` i ewentualne `notification_warning` (`backend/benefits/views.py`).
- Dodał w `frontend/src/pages/AdminPage.vue` wykrywanie zmian w wersji roboczej benefitów i okno z listą zmienionych pól oraz wyborem „Zapisz i wyślij wiadomość” / „Zapisz bez wiadomości”; uporządkował budowanie wersji roboczej (`buildBenefitAdminDraft`, `applyBenefitAdminSummary`).
- Dodał testy w `backend/benefits/tests.py` i `backend/core/tests.py` oraz tłumaczenia.

### 112. `f8565a8` — feat: disable audit

*2026-06-03 · Z-Grate · 7 plików, +329 / −93*

- Dodał do `AppSettings` przełącznik `debug_audit_enabled` (domyślnie wyłączony) z sekcją „Debug Auditing” w panelu Django (`backend/core/models.py`, `backend/core/admin.py`, migracja `0005_appsettings_debug_audit_enabled.py`).
- Uzależnił w `backend/services/foxcons.py` szczegółowe wpisy audytu per użytkownik oraz logi `logger.info` synchronizacji Foxcons od tego przełącznika (`_is_debug_audit_enabled`); zbiorczy wpis audytu przebiegu pozostał zapisywany zawsze.
- Poprawił responsywność `frontend/src/pages/TimesheetPage.vue`: przewijanie poziome ograniczone do kontenerów tabel, nagłówki bez łamania, atrybuty `data-testid`.
- Dodał trzy testy synchronizacji w `backend/users/tests.py` i dwa testy e2e widoku mobilnego karty godzin.

### 113. `ddef192` — feat: visual stuff

*2026-06-05 · Z-Grate · 7 plików, +300 / −2*

- Rozszerzył podsumowanie karty godzin zwracane przez `BenefitViewSet` o dane wolontariusza (`volunteer`), listę jego zgłoszeń (`applications`) i zaakceptowane działy z zespołami (`accepted_sections`) (`backend/benefits/views.py`).
- Dodał w zakładce kart godzin panelu administracyjnego blok kontekstu wolontariusza z tymi danymi (`frontend/src/pages/AdminPage.vue`).
- Dodał w wierszu listy wolontariuszy przycisk „Karta godzin”, który otwiera zakładkę kart godzin z wybraną osobą (`openVolunteerTimesheet`).
- Dodał dwa testy backendu, test e2e i dane w `frontend/e2e/fixtures.ts`.

### 114. `76290d4` — feat: analysis table in timesheet

*2026-06-05 · Z-Grate · 6 plików, +808 / −3*

- Dodał endpoint `admin-timesheet-overview` w `BenefitViewSet`: zwraca dla wszystkich uczestników wydarzenia godziny zadeklarowane, przydzielone i przepracowane w rozbiciu na etapy, z filtrami `department_id`, `team_id` i `search` oraz ograniczeniem do działów, którymi zarządza organizator (`backend/benefits/views.py`).
- Dodał serializery `AdminTimesheetOverviewRowSerializer` i `AdminTimesheetOverviewResponseSerializer` (`backend/benefits/serializers.py`).
- Podzielił zakładkę kart godzin w `frontend/src/pages/AdminPage.vue` na tryby „Analiza” i „Edycja”; tryb analizy pokazuje tabelę z wyszukiwaniem po loginie, filtrami działu i zespołu oraz wyborem kolumn zapamiętywanym w przeglądarce per użytkownik.
- Dodał przycisk „Edytuj kartę godzin” przechodzący z analizy i z podglądu wolontariusza do trybu edycji.
- Dodał trzy testy endpointu w `backend/benefits/tests.py` i tłumaczenia.

### 115. `e302832` — feat: info hub

*2026-06-07 · Z-Grate · 16 plików, +1663 / −7*

- Dodał w aplikacji `events` modele `InformationHubPage` (podstrona wydarzenia: `slug`, tłumaczone tytuły, kolejność, `is_home`, `is_published`) i `InformationHubComponent` (komponent typu `markdown`, `html` lub `grid` z walidacją treści w `clean()`), z ograniczeniami unikalności (`backend/events/models.py`, migracja `0010_information_hub_page_and_component.py`).
- Dodał `InformationHubPageViewSet` i `InformationHubComponentViewSet` (zapis tylko dla `is_staff`, pozostali widzą wyłącznie opublikowane) oraz `InformationHubResolveView` pod `information-hub/<event_id>/` i `information-hub/<event_id>/<slug>/`, zwracający nawigację, stronę i komponenty (`backend/events/views.py`, `backend/events/urls.py`).
- Dodał do `EventSerializer` i `PublicEventSerializer` pola `has_information_hub` i `information_hub_home_slug`; zarejestrował modele w panelu Django.
- Dodał stronę `frontend/src/pages/InformationHubPage.vue` (trasa `/hub/:slug?`) renderującą Centrum informacji z podstronami i siatką kafelków.
- Dodał w `frontend/src/pages/AdminPage.vue` zakładkę „Centrum informacji” do tworzenia, edycji, usuwania i przestawiania podstron i komponentów, z edytorem elementów siatki i podglądem strony.
- Zmienił przekierowania po wyborze wydarzenia, onboardingu i w strażniku routera z profilu na Centrum informacji; dodał link w nawigacji (`frontend/src/App.vue`).
- Dodał pięć testów w `backend/events/tests.py` i tłumaczenia.

### 116. `d51e237` — feat: More Foxcons Data

*2026-06-07 · Z-Grate · 20 plików, +1726 / −105*

- Dodał do modelu `User` pola `foxcons_member_data` (JSON) i `foxcons_member_data_updated_at` oraz wystawił je w `UserSerializer` (`backend/users/models.py`, migracja `0003_historicaluser_foxcons_member_data_and_more.py`).
- Rozszerzył `backend/services/foxcons.py`: synchronizacja zapisuje pełny rekord uczestnika z Foxcons, pobiera listę pokoi (`_request_foxcons_rooms`) i dopisuje `roomDetails` (pokój, hotel, typ, właściciel, liczba osób); zbiorczy rescan pobiera pokoje raz i przekazuje je jako `cached_rooms`.
- Rozbudował eksport CSV wolontariuszy w `UserAdminViewSet`: nowe kolumny Foxcons (moc, akredytacja, pokój, hotel itd.) i `is_staff`, parametr `user_ids` z zachowaniem kolejności, własne nagłówki przez `column_labels_json`, rzeczywista wartość kolumny zapisania na wydarzenie (`backend/users/views.py`).
- Dodał w `frontend/src/pages/AdminPage.vue` kolumny Foxcons na liście wolontariuszy i eksport CSV aktualnie widocznych wierszy i kolumn (`downloadVisibleVolunteersCsvExport`).
- Commit zawiera też backend Centrum informacji w `backend/events/` (identyczny z commitem 115, ale bez migracji) oraz zmiany routera odwołujące się do `InformationHubPage.vue`, której ten commit nie dodaje; usuwa je kolejny commit.
- Dodał testy synchronizacji i eksportu w `backend/users/tests.py`.

### 117. `cd58b71` — feat: Clean up shit

*2026-06-07 · Z-Grate · 13 plików, +4 / −638*

- Usunął z gałęzi `main` kod Centrum informacji wprowadzony omyłkowo w poprzednim commicie: modele, serializery, widoki, trasy i wpisy panelu Django w `backend/events/` oraz testy.
- Cofnął zmiany frontendu z tym związane: trasę i przekierowania w `frontend/src/router/index.ts`, link w `frontend/src/App.vue`, pola w `frontend/src/stores/event.ts`, przekierowania w `EventSelectPage.vue` i `OnboardingPage.vue` (z powrotem na profil) oraz tłumaczenia.

### 118. `e903135` — feat: paid status and visibility

*2026-06-07 · Z-Grate · 3 pliki, +236 / −13*

- Dodał w `frontend/src/pages/AdminPage.vue` kolumny „Plan opłacony” i „Pokój opłacony” (`formatFoxconsPaymentStatus`, `getFoxconsPaymentField` czytające `foxcons_member_data.payments`).
- Dodał w podglądzie wolontariusza sekcję „FoxCons” z ID, ostatnim błędem, mocą, akredytacją, płatnościami, danymi pokoju i datą ostatniej synchronizacji.
- Uprościł etykiety Foxcons w `pl.ts`/`en.ts` i przywrócił w plikach tłumaczeń klucze Centrum informacji usunięte w poprzednim commicie.

### 119. `20f0d2f` — fix: Sync leaking

*2026-06-07 · Z-Grate · 6 plików, +144 / −157*

- Dodał `UserProfileUserSerializer`, który pomija `foxcons_member_data` i `foxcons_member_data_updated_at`, i użył go w `UserProfileSerializer`, przez co dane z Foxcons przestały trafiać do odpowiedzi profilu wolontariusza (`backend/users/serializers.py`).
- Zmienił synchronizację w `backend/services/foxcons.py`: ręcznie ustawione `foxcons_user_id` nie powoduje już pominięcia synchronizacji — ID zostaje zachowane, a dane uczestnika i pokoju są nadal aktualizowane.
- Usunął z `frontend/src/pages/AdminPage.vue` kolumny płatności i sekcję „FoxCons” dodane w poprzednim commicie oraz powiązane klucze tłumaczeń.
- Dodał testy widoczności danych Foxcons dla organizatora i ich ukrycia w profilu (`backend/users/tests.py`).

### 120. `b514d95` — feat: finally view

*2026-06-07 · Z-Grate · 5 plików, +138 / −1*

- Przywrócił w `frontend/src/pages/AdminPage.vue` sekcję „FoxCons” w podglądzie wolontariusza oraz kolumny `foxcons_plan_paid` i `foxcons_room_paid` na liście i w opcjach eksportu, tym razem z kluczami `planPaid`/`roomPaid`.
- Dodał te dwie kolumny do eksportu CSV w `UserAdminViewSet`, czytane z `foxcons_member_data["paymentStatus"]` i normalizowane do `yes`/`no` (`backend/users/views.py`).
- Dodał tłumaczenia statusów płatności i akredytacji oraz uzupełnił test eksportu w `backend/users/tests.py`.

### 121. `9473431` — feat: bulk benefit edit

*2026-06-08 · Z-Grate · 6 plików, +1314 / −86*

- Dodał usługę `backend/services/bulk_wallet_edit.py` z `BulkWalletEditOptions` i `apply_bulk_wallet_edit`: jedna transakcyjna operacja zmienia portfel benefitów wolontariusza (benefity, poziom benefitów, korekta punktów, deklarowane godziny, blokady, notatka) w trybach `set`/`delta`/`clear`/`no_change` i zapisuje wpis audytu `bulk_edit_volunteer_wallet`.
- Przepisał dotychczasowy zapis zmian benefitów pojedynczego wolontariusza w `BenefitViewSet` na tę usługę i dodał obsługę parametrów trybów (`benefit_mode`, `level_mode`, `selection_lock_mode`, `manual_points_mode` itd.).
- Dodał endpoint `admin-bulk-apply-changes`, który stosuje te same ustawienia do listy `user_ids`, sprawdza uprawnienia per osoba, opcjonalnie wysyła powiadomienia i zwraca liczniki oraz wyniki per użytkownik (`backend/benefits/views.py`).
- Dodał w `frontend/src/pages/AdminPage.vue` akcję „Zastosuj ustawienia benefitów do zaznaczonych” z dwukrokowym oknem (edycja z opcją „Nie zmieniaj” dla każdego pola, potwierdzenie) i oknem wyniku z listą błędów.
- Dodał dwa testy endpointu w `backend/benefits/tests.py` i tłumaczenia `bulkBenefits.*`.

### 122. `86f8ee4` — feat: Mass copy target to declared

*2026-06-08 · Z-Grate · 5 plików, +291 / −2*

- Dodał endpoint `admin-bulk-copy-target-hours` w `BenefitViewSet`: dla każdej zaznaczonej osoby sumuje godziny przydzielone (`DeclaredHoursAssignment`) per etap i wpisuje je jako godziny deklarowane przez `apply_bulk_wallet_edit`; wymaga `is_extended_hours_system_enabled` (`backend/benefits/views.py`).
- Dodał w `frontend/src/pages/AdminPage.vue` akcję zbiorczą „Skopiuj docelowe godziny do deklarowanych” z potwierdzeniem i wspólnym oknem wyniku (`bulkOperationKind`).
- Dodał dwa testy w `backend/benefits/tests.py` i tłumaczenia.

### 123. `cd1639c` — Merge branch 'main' into information-hub

*2026-06-08 · Z-Grate · 12 plików, +2943 / −240*

- Scalił gałąź `main` (stan z commita `86f8ee4`) do gałęzi `information-hub` (stan z commita `e302832`).
- Wniósł do gałęzi Centrum informacji commity 116–122: rozszerzone dane Foxcons i eksport CSV, płatności i sekcję FoxCons, zbiorczą edycję benefitów oraz zbiorcze kopiowanie godzin przydzielonych do deklarowanych.
- Diff łączony (`git show --cc`) jest pusty, więc scalenie nie wymagało ręcznych poprawek konfliktów; podane liczby to różnica względem pierwszego rodzica.

### 124. `7981315` — feat: Information Hub Fixes

*2026-06-08 · Z-Grate · 15 plików, +189 / −30*

- Dodał do `Event` przełącznik `is_information_hub_enabled` (domyślnie wyłączony; migracja `0011_event_is_information_hub_enabled_and_more.py`); `InformationHubResolveView` zwraca 404 osobom bez `is_staff`, gdy Centrum informacji jest wyłączone (`backend/events/views.py`).
- Zmienił `InformationHubPageSerializer`, by w widoku publicznym tytuł podstrony nie spadał do `slug` (kontekst `allow_slug_fallback`); strona ukrywa pusty tytuł (`frontend/src/pages/InformationHubPage.vue`).
- Przywrócił samodzielną rejestrację przez magic link, gdy podano `event_id` aktywnego wydarzenia bez `disable_public_apply_for_unknown_emails` (`MagicLinkRequestView`, `MagicLinkVerifyView` w `backend/users/views.py`).
- Uzależnił link w nawigacji, strażnika routera i przekierowanie po wyborze wydarzenia od dostępu do Centrum informacji (`canAccessInformationHub`), z powrotem do profilu w przeciwnym razie.
- Dodał odświeżanie zapisanego w `sessionStorage` wybranego wydarzenia po przeładowaniu listy (`frontend/src/stores/event.ts`) oraz cztery testy w `backend/events/tests.py`.

### 125. `0f430f7` — feat: event admin started

*2026-06-10 · Z-Grate - W · 13 plików, +410 / −80*

- Dodał do `Event` relację `event_admins` (administratorzy wydarzenia) i metodę `user_can_administer` (`backend/events/models.py`, migracja `0012_event_event_admins.py`); `EventSerializer` zyskał pola `event_admins`, `event_admin_ids` i `can_administer`.
- Zastąpił w `backend/events/views.py` sprawdzenia `is_staff` wywołaniem `user_can_administer` w widokach wydarzeń, Centrum informacji, uczestnictw, działów, członkostw, zespołów i zgłoszeń (w tym w akcjach zbiorczych, gdzie uprawnienie jest sprawdzane per zgłoszenie).
- Ograniczył `EventViewSet.get_queryset` dla osób bez `is_staff` do wydarzeń, którymi administrują; tworzenie wydarzeń pozostało tylko dla `is_staff`.
- Dodał do `UserProfileSerializer` pole `can_administer_event` i rozszerzył `OrganizerScopedUserViewSet` o dostęp administratora wydarzenia (`backend/users/serializers.py`, `backend/users/views.py`).
- Dodał w `frontend/src/stores/auth.ts` stan `canAdministerSelectedEvent` i `loadSelectedEventPermissions`; `frontend/src/pages/AdminPage.vue` pokazuje zakładki zgłoszeń, działów i Centrum informacji według `hasSelectedEventAdminScope` i ładuje dane przez endpointy organizatora.
- Dodał testy w `backend/events/tests.py` i `backend/users/tests.py`.

### 126. `75bc64f` — fix: Backend error

*2026-06-10 · Z-Grate - W · 1 plik, +3 / −1*

- Zmienił w akcji `resync_foxcons_user_ids` (`backend/events/views.py`) pobieranie wydarzenia z `self.get_object()` na `Event.objects.filter(pk=pk).first()` z odpowiedzią 404, omijając zawężony po poprzednim commicie `get_queryset`.

### 127. `122f595` — feat: copy add

*2026-06-10 · Z-Grate - W · 3 pliki, +83 / −1*

- Dodał w formularzu przydziału godzin w zakładce kart godzin (`frontend/src/pages/AdminPage.vue`) przyciski „Kopiuj deklarowane do docelowych” (`copyDeclaredHoursToTargetForm`) i „Kopiuj jeszcze nieprzypisane godziny” (`copyNotYetDeclaredHoursToTargetForm`), które wypełniają pola formularza i wymagają wybranego działu.
- Usunął nieużywany parametr z `onSettingsCsvExportClick` i dodał tłumaczenia.

### 128. `d542275` — feat: Highligh the bad guys

*2026-06-10 · Z-Grate - W · 3 pliki, +119 / −2*

- Dodał w tabeli analizy kart godzin (`frontend/src/pages/AdminPage.vue`) kolorowanie: czerwony wiersz, gdy suma godzin przydzielonych jest mniejsza od zadeklarowanych, żółty, gdy większa (`timesheetOverviewRowStatus`, `timesheetOverviewRowClass`).
- Dodał znaczniki komórek godzin przydzielonych per etap (`timesheetOverviewPhaseStatus`, `timesheetOverviewCellClass`) oraz legendę z tłumaczeniami.

### 129. `4fcdb6d` — feat: recovery

*2026-06-14 · Z-Grate · 4 pliki, +710 / −0*

- Dodał polecenie `recover_wallets_from_audit` (`backend/benefits/management/commands/recover_wallets_from_audit.py`), które przywraca portfele benefitów wolontariuszy do stanu sprzed omyłkowej edycji zbiorczej.
- Polecenie wyszukuje wpisy audytu edycji zbiorczej w oknie `--incident-start`/`--incident-end` dla `--event-id` (opcjonalnie `--incident-actor-id`) i odtwarza pola portfela oraz wybrane benefity z historii `VolunteerEventBenefits.history` i `BenefitSelection.history`.
- Domyślnie działa na sucho; zapis wymaga `--apply` razem z `--yes-i-understand`, a opcje `--allow-partial-history`, `--recovery-actor-id` i `--report-path` sterują pomijaniem portfeli bez historii, autorem wpisów audytu i raportem JSON.
- Dodał trzy testy polecenia (przebieg na sucho, przywrócenie stanu, idempotencja) w `backend/benefits/tests.py`.

### 130. `ec4e941` — Merge branch 'main' of https://github.com/zgrate/volunteer-crm

*2026-06-14 · Z-Grate · 15 plików, +614 / −83*

- Scalił zdalną gałąź `main` (stan z commita `d542275`) z lokalną `main` zawierającą commit `4fcdb6d`.
- Wniósł commity 125–128: administratorów wydarzenia, poprawkę resynchronizacji Foxcons, przyciski kopiowania godzin i kolorowanie tabeli analizy kart godzin.
- Diff łączony (`git show --cc`) jest pusty, więc scalenie nie wymagało ręcznych poprawek konfliktów; podane liczby to różnica względem pierwszego rodzica.

### 131. `923f2e5` — feat: benefitws lockdown, admin fix, info hub fix

*2026-06-14 · Z-Grate · 14 plików, +261 / −3*

- Dodał do `Event` przełącznik `volunteers_can_only_add_benefits` (migracja `0013_event_volunteers_can_only_add_benefits.py`): wolontariusz może dodawać benefity, ale próba usunięcia już wybranego kończy się błędem 400, a podsumowanie oznacza wybrane benefity jako nieusuwalne (`backend/benefits/views.py`).
- Rozszerzył sprawdzenia uprawnień w `BenefitViewSet` o administratora wydarzenia (`event.user_can_administer`).
- Dodał administratorowi wydarzenia dostęp do wszystkich pól własnych wydarzenia w `OrganizerCustomFieldDefinitionViewSet` (`backend/users/views.py`).
- Dodał do odpowiedzi `InformationHubResolveView` pole `admin_only`; `frontend/src/pages/InformationHubPage.vue` pokazuje baner, że Centrum informacji widzą na razie tylko administratorzy.
- Uprościł warunek blokady przycisku benefitu w `frontend/src/pages/BenefitsPage.vue` do `benefit.can_select` i dodał mapowanie komunikatu w `frontend/src/stores/benefits.ts`.
- Dodał testy w `backend/benefits/tests.py` i `backend/users/tests.py`.

### 132. `6c0f08a` — fix: applications visibility

*2026-06-16 · Z-Grate - W · 1 plik, +1 / −1*

- Zmienił w `frontend/src/pages/AdminPage.vue` warunek wyświetlania karty zakładki zgłoszeń z `isStaffUser` na `hasSelectedEventAdminScope`, dzięki czemu widzi ją także administrator wydarzenia.

### 133. `e36312b` — fix: Access to system

*2026-06-16 · Z-Grate - W · 5 plików, +554 / −41*

- Dopuścił administratora wydarzenia do tworzenia, edycji i usuwania benefitów oraz poziomów benefitów swojego wydarzenia (`_require_staff_or_event_admin` w `BenefitViewSet` i `EventBenefitLevelViewSet`, `backend/benefits/views.py`).
- Zmienił `CustomFieldDefinitionAdminViewSet` z `IsAdminUser` na `IsAuthenticated` z własną kontrolą: osoba bez `is_staff` widzi i modyfikuje pola własne tylko wydarzenia, którym administruje (`backend/users/views.py`).
- Dodał w `OrganizerScopedUserViewSet` akcje `create-and-add-to-event`, `add-to-event` i `remove-from-event` dla administratora wydarzenia (utworzenie konta z magic linkiem, zaproszenie e-mail, synchronizacja Foxcons).
- Przełączył w `frontend/src/pages/AdminPage.vue` tworzenie, dodawanie i usuwanie wolontariusza z wydarzenia na endpointy `/organizer-users/` dla osób bez `is_staff`; zakładki tworzenia, pól własnych, benefitów i systemu są widoczne według `hasSelectedEventAdminScope`, a linki administracyjne i eksport CSV pozostały tylko dla `is_staff`.
- Dodał testy zakresu uprawnień w `backend/benefits/tests.py` i `backend/users/tests.py`.

### 134. `00e8bae` — feat: per ission

*2026-06-17 · Z-Grate · 2 pliki, +111 / −2*

- Poprawił `VolunteerApplicationViewSet.get_queryset` (`backend/events/views.py`): bez parametru `event` osoba bez `is_staff` widzi własne zgłoszenia oraz zgłoszenia z wydarzeń, którymi administruje, co umożliwia administratorowi wydarzenia akcje na pojedynczym zgłoszeniu.
- Dodał trzy testy: akceptacja zgłoszenia przez administratora wydarzenia, brak dostępu do zgłoszeń innego wydarzenia i pełny dostęp `is_staff` (`backend/events/tests.py`).

### 135. `ad28013` — feat: modal + info

*2026-06-18 · Z-Grate · 3 pliki, +28 / −0*

- Dodał w `frontend/src/pages/BenefitsPage.vue` baner informujący, że w tym wydarzeniu wolontariusz może tylko dodawać benefity (`volunteers_can_only_add_benefits`).
- Dodał okno potwierdzenia przed wybraniem benefitu w `toggleBenefit`, z ostrzeżeniem o braku możliwości samodzielnego usunięcia w trybie „tylko dodawanie”.
- Dodał tłumaczenia `addOnlyBenefitsInfo`, `addOnlyBenefitsWarning`, `confirmDialogTitleSelect` i `selectConfirm` w `pl.ts` i `en.ts`.

### 136. `b0b445c` — feat: dedupe and check gdpr

*2026-07-02 · Z-Grate · 7 plików, +199 / −22*

- Dodał migrację danych `backend/agreements/migrations/0003_dedupe_gdpr_agreements.py`, która dla typów `gdpr_consent` i `gdpr_permanent_processing` zostawia każdemu wolontariuszowi tylko najnowszą umowę (wg `signed_at`, potem `id`) i usuwa starsze duplikaty.
- Dodał w modelu `Agreement` warunkowy `UniqueConstraint` `unique_gdpr_agreement_per_user_type` na parze `user` + `type`, obowiązujący tylko dla dwóch typów zgód RODO (`backend/agreements/models.py`, migracja `0004`).
- Zamienił w `backend/users/views.py` wszystkie `Agreement.objects.create(...)` przy zapisie zgód RODO (onboarding i edycja profilu) na `update_or_create(...)` z polami w `defaults`, dzięki czemu ponowne zaakceptowanie zgody aktualizuje istniejący wiersz.
- Dodał testy migracji deduplikującej (`GDPRAgreementDedupeMigrationTests`) oraz testy, że powtórne wysłanie zgody nie tworzy duplikatów (`backend/agreements/tests.py`, `backend/users/tests.py`).
- Dopisał do `.gitignore` wpisy `.agents`, `agent`, `.claude` i `skills-lock.json`.

### 137. `5dfc768` — feat: Latex Document Generator

*2026-07-06 · Z-Grate - W · 19 plików, +1481 / −5*

- Utworzył nową aplikację Django `documents` (zarejestrowaną w `backend/config/settings.py`) z modelami `DocumentTemplate` (szablon dokumentu: `name`, `description`, `body` z surowym LaTeX-em i znacznikami `\VAR{...}`, opcjonalne `event`, `is_active`, historia) oraz `GeneratedDocument` (`template`, `user`, `requested_by`, `agreement`, `status` queued/running/completed/failed, prywatny plik PDF `file`, `rendered_tex`, `error_message`, `celery_task_id`, znaczniki czasu).
- Dodał `backend/services/latex.py`: piaskownicę Jinja2 (`SandboxedEnvironment`) ze składnią dostosowaną do LaTeX-a, automatyczne escapowanie znaków specjalnych (`latex_escape`, `LatexSafeString`), `render_latex_template` oraz `compile_tex_to_pdf` kompilujące źródło przez Tectonic z limitem czasu i wyjątkiem `LatexCompilationError`.
- Dodał `backend/documents/rendering.py` (`build_document_context`, `render_template_to_tex`) budujące kontekst z danych użytkownika, wydarzenia i pól własnych (`CustomFieldDefinition`) oraz zadanie Celery `generate_document_task` w `backend/documents/tasks.py`, które renderuje szablon, kompiluje PDF i zapisuje wynik lub błąd.
- Dodał panel Django admin (`backend/documents/admin.py`): formularz szablonu odrzucający błędne ograniczniki `{{ }}` / `{% %}`, listę dostępnych pól scalania, akcję podglądu PDF na przykładowych danych oraz `GeneratedDocumentAdmin`, który przy zapisie ustawia `requested_by` i kolejkuje zadanie po zatwierdzeniu transakcji.
- Przebudował `backend/agreements/auth.py`: dostęp do plików prywatnych wynika teraz z rejestru prefiksów ścieżek (`agreement_scans`, `generated_documents`) i jest domyślnie odmawiany dla nieznanych ścieżek.
- Dodał instalację Tectonic 0.15.0 (z rozgrzaniem cache) do `backend/Dockerfile.dev` i `backend/Dockerfile.prod`, wolumen `tectonic_cache` w `docker-compose.yml`, akcje `GENERATED` i `GENERATION_FAILED` w `AuditLog.Action` (`backend/core/models.py`, migracja `0006`) oraz `backend/private/` w `.gitignore`.
- Dodał jednorazowe polecenie `fix_template` (`backend/documents/management/commands/fix_template.py`) poprawiające ograniczniki i preambułę szablonu o `id=1` pod XeTeX/Tectonic oraz obszerny zestaw testów w `backend/documents/tests.py`.

### 138. `2bf68cb` — feat: sensitive data field

*2026-07-06 · Z-Grate - W · 9 plików, +274 / −3*

- Dodał pole `is_sensitive` do modelu `CustomFieldDefinition` (`backend/users/models.py`, migracja `0004_customfielddefinition_is_sensitive`) i wystawił je w serializerze definicji pól.
- Zmienił `to_representation` serializera użytkownika w `backend/users/serializers.py`: wartości pól wrażliwych są usuwane z `custom_data`, jeśli pytający nie jest członkiem personelu (`is_staff`) ani właścicielem profilu.
- Dodał w `backend/users/views.py` blokadę (HTTP 403) zapisu pól wrażliwych przez organizatorów oraz scalanie przychodzącego `custom_data` z istniejącym zamiast nadpisywania całości.
- Rozbudował Django admin użytkowników (`backend/users/admin.py`): `custom_data` jest pokazywane jako pole tylko do odczytu, maskowane napisem `*** sensitive ***` dla osób niebędących superużytkownikami; dodał `is_sensitive` do listy i formularza definicji pól.
- Dodał przełącznik „pole wrażliwe” w formularzu pól własnych w `frontend/src/pages/AdminPage.vue` wraz z tłumaczeniami pl/en.
- Dodał klasę testów `SensitiveCustomFieldTests` w `backend/users/tests.py`.

### 139. `1a5b323` — fix: permissions bug

*2026-07-06 · Z-Grate - W · 4 pliki, +43 / −18*

- Rozszerzył w `backend/agreements/views.py` widoczność i tworzenie umów o administratorów wydarzenia (nowa metoda `_event_admin_managed_user_ids`) oraz zdjął z akcji `verify` wymóg `IsAdminUser`, zastępując go sprawdzeniem, czy pytający jest personelem albo zarządza danym wolontariuszem.
- Zmienił w `backend/events/serializers.py` metody uprawnień tak, by administrator wydarzenia (`event.user_can_administer`) był traktowany na równi z organizatorem działu.
- Ograniczył w `backend/events/views.py` i `backend/users/views.py` filtr „tylko administrowane wydarzenie” do akcji `list`, a dla akcji szczegółowych pozwolił administratorom wydarzeń i organizatorom działów sięgać po zarządzanych przez siebie wolontariuszy.
- Dodał w `backend/users/views.py` pomocnika `_administers_any_event_for` i uwzględnił go przy ustalaniu pełnych uprawnień edycji wolontariusza; zamienił wywołania `_user_can_administer_event(...)` na `application.event.user_can_administer(...)` w widokach zgłoszeń.

### 140. `38861b4` — feat: External Signing request

*2026-07-07 · Z-Grate - W · 13 plików, +1650 / −6*

- Dodał w `backend/documents/models.py` modele `ExternalSigningRequest` (powiązany 1:1 z `GeneratedDocument`, z `opensign_doc_id`, `source_token`, `status`, plikiem `signed_file` i znacznikami czasu) oraz `ExternalSigner` (kolejność, imię, e-mail, status podpisującego) wraz z migracją `0002`.
- Dodał do `AppSettings` (`backend/core/models.py`, migracja `0007`) konfigurację OpenSignServer: `opensign_server_url`, `opensign_app_id`, dane konta serwisowego i `opensign_default_time_to_complete_days`; formularz w `backend/core/admin.py`.
- Utworzył `backend/services/external_signing.py` z logowaniem konta serwisowego, cache’owaniem sesji i ponawianiem przy wygaśnięciu oraz funkcjami `create_and_send`, `sync_status` i `resend_invitation`.
- Dodał zadanie Celery `send_external_signing_task` (`backend/documents/tasks.py`) oraz nieuwierzytelniony endpoint `external-signing/source/<token>/` (`ExternalSigningSourcePdfView`) serwujący źródłowy PDF po nieodgadywalnym tokenie; podpiął `documents.urls` w `backend/core/api_urls.py` i dodał ustawienie `BACKEND_URL`.
- Rozbudował `backend/documents/admin.py` o akcje „wyślij do podpisu zewnętrznego”, „odśwież status” i „wyślij ponownie zaproszenie”, formularz dodatkowych podpisujących oraz panel `ExternalSigningRequestAdmin` z inline’em podpisujących.
- Dodał testy tej funkcji w `backend/documents/tests.py` (416 wierszy).

### 141. `b96ddd6` — Revert "feat: External Signing request"

*2026-07-17 · Z-Grate - W · 13 plików, +6 / −1650*

- Wycofał w całości commit `38861b4`: usunął modele `ExternalSigningRequest` i `ExternalSigner`, migracje `documents/0002` i `core/0007`, pola `opensign_*` w `AppSettings`, serwis `backend/services/external_signing.py`, zadanie `send_external_signing_task`, widok i `backend/documents/urls.py`, akcje w adminie oraz testy.
- Przywrócił poprzednią treść `backend/documents/admin.py`, `backend/documents/tasks.py`, `backend/core/admin.py`, `backend/core/api_urls.py` i `backend/config/settings.py` (bez `BACKEND_URL`).

### 142. `2b38ace` — feat: temp dump

*2026-07-18 · Z-Grate - W · 34 pliki, +3128 / −589*

- Rozbudował model `Agreement` (`backend/agreements/models.py`, migracje `0005`–`0008`) o `signature_type` (acceptance/physical/qualified/trusted_profile/other), `status` (draft/pending_signature/signed/rejected/expired), `requested_by`, `requested_at` oraz opcjonalne `signed_at` i `expires_at`; migracja `0006` uzupełniła istniejące umowy statusem `signed`.
- Dodał modele `AgreementSigner` (podpisujący: użytkownik lub sama nazwa/e-mail, rola, kolejność, status, notatka) i `AgreementVersion` (kolejne wersje pliku umowy z autorem i notatką).
- Utworzył `backend/agreements/services.py` z logiką przejść stanu: `accept_agreement`, `upload_signed_proof`, `sign_as_signer`, `reject_as_signer`, `upload_signer_proof`, `_rollup_agreement_status`, `mark_signed_no_proof`, `request_signature`, `create_and_request_signature`, `create_signed_agreement`, `expire_overdue_agreements`; dodał polecenie `expire_stale_agreements`.
- Dodał w `backend/agreements/views.py` akcje `mine`, `accept`, `upload_signed`, `sign-signer`, `reject-signer`, `upload-signer-proof`, `request-signature`, `add-signed`, `bulk_request`, `bulk_mark_signed` i `bulk_download` (usuwając dotychczasową akcję `verify`) wraz z odpowiednimi serializerami; w Django adminie dodał inline’y podpisujących i wersji oraz akcje masowe.
- Dodał endpoint tylko do odczytu `generated-documents` (`GeneratedDocumentViewSet`, `backend/documents/views.py`, `urls.py`, `serializers.py`), middleware `PrivateStorageJWTMiddleware` uwierzytelniający pobrania z `/private/` tokenem JWT (`backend/core/middleware.py`) oraz rozszerzył rejestr w `backend/agreements/auth.py` o `agreement_versions` z dostępem dla podpisujących.
- Dodał we frontendzie zakładkę „Dokumenty” w `frontend/src/pages/AdminPage.vue` (lista umów, prośby o podpis, masowe oznaczanie i pobieranie, dodawanie podpisanej umowy) oraz nową stronę `frontend/src/pages/MyAgreementsPage.vue` pod `/my-agreements` z linkiem w nawigacji i tłumaczeniami.
- Dołączył pliki pomocnicze spoza aplikacji: `.mcp.json` z lokalnym serwerem MCP, skrypt `watch-local-ai-live.sh` i notatkę `docs/implementation-status.md` z przebiegu prac; przepisał znaczną część `backend/documents/tests.py` i dodał testy umów.

### 143. `058fb37` — commit: generated documents part

*2026-07-19 · Z-Grate - W · 33 pliki, +2449 / −242*

- Dodał do `GeneratedDocument` pole `output_format` (PDF/HTML/Markdown) oraz `rendered_html` i `rendered_markdown` (migracje `documents/0002`, `0003`); `generate_document_task` zależnie od formatu kompiluje PDF albo konwertuje LaTeX przez Pandoc (`backend/services/document_convert.py`), a `pandoc` trafił do obu Dockerfile’i backendu.
- Wprowadził kolejkę podpisujących: `AgreementSigner.order` stał się pozycją w kolejce, a `is_signer_turn` i `_notify_next_signers` w `backend/agreements/services.py` dopuszczają i powiadamiają dopiero kolejną osobę; dodał `get_or_create_draft_agreement`.
- Po udanym wygenerowaniu dokumentu zadanie automatycznie wysyła prośbę o podpis dla umowy w stanie roboczym, a po błędzie usuwa umowę utworzoną wyłącznie na potrzeby tej próby (`backend/documents/tasks.py`).
- Dodał `backend/documents/bulk.py` (`BulkGenerateDocumentForm`, `bulk_generate_documents`, `validate_signer_requirements`) i akcję „Generate & send document (bulk)” w adminie użytkowników z szablonem `bulk_generate_documents.html`, w tym opcjonalnego współpodpisującego.
- Rozszerzył `backend/documents/rendering.py` o kontekst podpisujących (`_person_context`, `_signer_context`, zmienne `signerN`) i parametr `agreement`; admin szablonów podpowiada dostępne zmienne podpisujących.
- Dodał `backend/services/agreement_signature_email.py` z powiadomieniami „nowa prośba”, „przypomnienie” i „Twoja kolej” oraz sześć szablonów e-mail pl/en; dodał akcję `download-pdf` w `backend/agreements/views.py` i pola `latest_document_html/markdown/format` w serializerze umowy.
- We frontendzie dodał `frontend/src/components/DocumentPreviewDialog.vue` i `sanitizeHtmlDocument` w `frontend/src/utils/markdown.ts`, przebudował `MyAgreementsPage.vue` pod podgląd dokumentu i kolejkę podpisów oraz rozszerzył zakładkę dokumentów w `AdminPage.vue`; rozszerzył dostęp do plików dla podpisujących w `backend/agreements/auth.py`.

### 144. `3eb10f7` — feat: finishing touches to the system

*2026-07-19 · Z-Grate - W · 6 plików, +75 / −30*

- Dodał parametr `lang` do funkcji serwisu umów (`accept_agreement`, `sign_as_signer`, `reject_as_signer`, `upload_signer_proof`, `request_signature`, `create_and_request_signature`, `_notify_next_signers`) i przekazał go do wysyłki powiadomień (`backend/agreements/services.py`).
- Dodał w `backend/agreements/views.py` metodę `_request_locale`, która odczytuje język z parametru `lang` lub nagłówka `Accept-Language` i podaje go do serwisu.
- Frontend (`AdminPage.vue`, `MyAgreementsPage.vue`) zaczął wysyłać `lang` z bieżącej lokalizacji przy akcjach na umowach.
- Zmienił `MyAgreementsPage.vue` tak, by podpisujący najpierw otwierał podgląd dokumentu (`openSignerPreview`), a dopiero z niego podpisywał; przyciski na liście zmieniły etykietę na „podgląd”.

### 145. `2f3269a` — feat: information hub lock

*2026-07-19 · Z-Grate - W · 5 plików, +34 / −49*

- Wydzielił funkcję `canAccessInformationHub` do `frontend/src/utils/informationHub.ts` i użył jej w `App.vue`, `router/index.ts` oraz `EventSelectPage.vue` zamiast trzech osobnych kopii warunku.
- Zaostrzył warunek dostępu do Centrum informacji: zwykły użytkownik potrzebuje teraz, oprócz włączonej flagi `is_information_hub_enabled`, także `can_access_event_features` z profilu; personel i administratorzy wydarzenia mają dostęp zawsze.
- Przeniósł stan `canAccessEventFeatures` z `App.vue` do magazynu `frontend/src/stores/auth.ts` (ustawiany w `loadSelectedEventPermissions`) i usunął funkcję `refreshEventFeatureAccess`.
- `EventSelectPage.vue` po wyborze wydarzenia najpierw ładuje uprawnienia, a dopiero potem decyduje o przekierowaniu do Centrum informacji.

### 146. `2a27fea` — fixes: automatic

*2026-07-20 · Z-Grate - W · 10 plików, +289 / −31*

- Dodał w akcjach `bulk_request`, `bulk_mark_signed` i `bulk_download` (`backend/agreements/views.py`) sprawdzenie, czy osoba spoza personelu zarządza danym wolontariuszem; pozycje spoza zakresu trafiają do listy błędów lub jako plik `..._UNAUTHORIZED.txt` w archiwum.
- Rozdzielił w `backend/documents/rendering.py` pola własne na `custom` i `custom_sensitive`, tak aby pola wrażliwe nie trafiały do zwykłego kontekstu szablonu dokumentu.
- Cofnął w `backend/events/views.py` i `backend/users/views.py` ograniczenie filtra uprawnień wyłącznie do akcji `list` (wprowadzone w `1a5b323`), przywracając je także dla akcji szczegółowych.
- Przeniósł w `backend/users/views.py` blokadę zapisu pól wrażliwych i scalanie `custom_data` tak, by obowiązywały każdego użytkownika spoza personelu (także administratora wydarzenia), a scalanie również personel.
- Zarejestrował akcję `preview_render` w `actions` admina szablonów i usunął z niej zbędne budowanie kontekstu (`backend/documents/admin.py`); dodał `.mcp.json` do `.gitignore`.
- Dodał testy regresyjne dla powyższych przypadków w `agreements`, `documents`, `events` i `users`.

### 147. `c799905` — feat: last things improvements

*2026-07-20 · Z-Grate - W · 16 plików, +326 / −51*

- Dodał do modelu `Agreement` opcjonalne powiązanie `event` (`backend/agreements/models.py`, migracja `0009`) oraz pola `event` i `event_name` w serializerze; admin umów zyskał kolumnę i filtr wydarzenia.
- Przekazał `event` przez `get_or_create_draft_agreement`, `create_and_request_signature` i `create_signed_agreement`; generowanie dokumentów (pojedyncze i masowe) przypisuje umowie wydarzenie szablonu.
- Dodał powiadomienie „dodano umowę do konta” (`send_agreement_added_email`, szablony `agreement_added_email_pl/en.txt`) wysyłane z `create_signed_agreement`, sterowane nowym polem `notify` w serializerze `add-signed`.
- W zakładce dokumentów `frontend/src/pages/AdminPage.vue` dodał wybór wydarzenia i pole „powiadom” w formularzach umów, wybór wydarzenia przy masowej prośbie o podpis, filtr po wydarzeniu i kolumnę wydarzenia.
- W `frontend/src/pages/MyAgreementsPage.vue` dodał filtry (nazwa, zakres dat, wydarzenie) i tłumaczone etykiety typów umów; uzupełnił tłumaczenia.

### 148. `dfc4dc0` — fix: ngnix

*2026-07-20 · Z-Grate - W · 1 plik, +8 / −0*

- Dodał w `docker/nginx/default.conf` ukrywanie nagłówka `Cache-Control` z backendu i wymuszenie `Cache-Control: private, no-store` w czterech blokach `location`: `/api/`, `/django-admin/`, `/accounts/` i `/private/` (blok `/media/` pozostał bez zmian).

### 149. `edad5c6` — fix: files

*2026-07-20 · Z-Grate - W · 1 plik, +3 / −0*

- Dodał w `docker-compose.prod.yml` do usługi `celery-worker` wolumeny `/etc/volunteer_hub/django_media:/app/media` i `/etc/volunteer_hub/django_private:/app/private`.

### 150. `fcb0133` — feat: telegram monitoring

*2026-07-29 · Z-Grate - W · 37 plików, +4306 / −11*

- Utworzył aplikację `telegram_events` z modelami `EventTelegramChat` (czat monitorowany dla wydarzenia), `KnownTelegramChat` (czaty, w których jest bot), `TelegramChatMembership` (bieżący stan członkostwa z dopasowanym użytkownikiem, flagą ignorowania i danymi o wyrzuceniu) oraz `TelegramMembershipEvent` (dziennik dołączeń, wyjść, wyrzuceń i obecności).
- Dodał obsługę aktualizacji z Telegrama (`backend/telegram_events/webhook.py`: `my_chat_member`, `chat_member`, wiadomości, reakcje), klasyfikację przejść i dopasowywanie tożsamości po `telegram_user_id`, `telegram_username` i `telegram_handle` (`matching.py`).
- Wystawił endpointy (`backend/telegram_events/urls.py`, `views.py`): webhook `telegram/webhook/` chroniony sekretem, `event-telegram-chats` z akcjami `memberships`, `toggle-ignore`, `recheck-membership`, `log`, `kick`, `known-telegram-chats` z akcją `promote` oraz `telegram-cross-reference/run/`.
- Rozszerzył `backend/services/telegram.py` o wybór bota monitorującego, `set_webhook`, `delete_webhook`, `get_updates`, `get_chat`, `get_chat_member`, `kick_chat_member`; dodał `backend/services/telegram_cross_reference.py` i zadania Celery `run_telegram_cross_reference_task` oraz `run_telegram_membership_recheck_task`.
- Dodał polecenia `set_telegram_webhook`, `poll_telegram_updates` (awaryjne odpytywanie `getUpdates`) i `cross_check_telegram_members`, usługę `telegram-poller` z profilem `telegram-polling` w obu plikach compose, zmienną `PUBLIC_BASE_URL` i automatyczną rejestrację webhooka w `backend/entrypoint.prod.sh`.
- Dodał do `AppSettings` pola `telegram_monitoring_bot_username`, `telegram_monitoring_bot_token`, `telegram_webhook_secret`, `telegram_last_update_id` (z synchronizacją webhooka przy zapisie w adminie) oraz flagę `Event.is_telegram_monitoring_enabled`.
- Dodał w `frontend/src/pages/AdminPage.vue` zakładkę monitoringu Telegrama (ok. 950 wierszy) z tłumaczeniami oraz testy w `backend/telegram_events/tests.py` (1066 wierszy) i `backend/core/tests.py`.

### 151. `73a1663` — fix: signer files

*2026-07-29 · Z-Grate - W · 1 plik, +16 / −4*

- Naprawił w `upload_signed_proof` i `upload_signer_proof` (`backend/agreements/services.py`) zapis tego samego wgranego pliku do dwóch pól: bajty są teraz odczytywane raz, a `scan_file` i `AgreementVersion.file` dostają osobne obiekty `ContentFile`.
- Zgodnie z komentarzem w kodzie usunęło to błąd `FileNotFoundError` dla plików większych niż `FILE_UPLOAD_MAX_MEMORY_SIZE`, których plik tymczasowy był przenoszony przy pierwszym zapisie.

### 152. `ad5afc0` — fix: frontend

*2026-07-29 · Z-Grate - W · 1 plik, +4 / −0*

- Owinął w `<Teleport to="body">` dwa okna modalne w `frontend/src/pages/AdminPage.vue`: edycję zespołu w „Moich działach” oraz dialog edycji członka działu.

### 153. `9b97291` — fix: style

*2026-07-29 · Z-Grate - W · 1 plik, +7 / −0*

- Rozdzielił w `frontend/src/style.css` styl punktorów w `.markdown-content`: listy `ul` zachowały `disc`, a listy `ol` dostały `list-style-type: decimal`.

### 154. `3194f96` — Merge branch 'main' into telegram-monitoring

*2026-08-03 · Z-Grate - W · 3 pliki, +27 / −4*

- Scalił gałąź `main` do `telegram-monitoring`, wnosząc trzy poprawki: `73a1663` (pliki podpisujących w `backend/agreements/services.py`), `ad5afc0` (`Teleport` w `AdminPage.vue`) i `9b97291` (styl list w `style.css`).
- Scalenie przebiegło bez ręcznie rozwiązywanych konfliktów (brak zmian w diffie łączonym).

### 155. `4318be7` — first draft for shifts management

*2026-08-04 · Z-Grate - W · 22 pliki, +2846 / −1*

- Utworzył aplikację `shifts` z modelami `Shift` (zmiana: wydarzenie, tytuł, `start_at`, `end_at`, tekstowa lokalizacja, status open/closed, notatka), `ShiftPosition` (stanowisko: dział, zespół, opis, `slots_needed`, szablony reguł), `ShiftRuleTemplate`, `ShiftRuleGroup` (zagnieżdżane grupy AND/OR z negacją) i `ShiftRule` (typy `is_registered`, `field_condition`, `membership`).
- Dodał silnik reguł `backend/shifts/rules.py` z rejestrem typów, operatorami zależnymi od typu pola i walidacją konfiguracji (`validate_condition_config`).
- Wystawił endpointy `shifts` (z akcjami `close` i `reopen`), `shift-positions` (z akcją `check-eligibility`), `shift-rule-templates`, `shift-rule-groups` i `shift-rules`; zapis wymaga uprawnień administratora wydarzenia i włączonej flagi.
- Dodał flagę `Event.is_shift_management_enabled` (`backend/events/models.py`, migracja `0015`) i pole w serializerze wydarzenia.
- Dodał komponent `frontend/src/components/ShiftsAdminPanel.vue` (lista zmian, formularz zmiany, stanowiska) i zakładkę „Zmiany” w `AdminPage.vue`, widoczną przy włączonej fladze; uzupełnił tłumaczenia.
- Dodał rejestrację modeli w adminie oraz 493 wiersze testów modeli, reguł i API (`backend/shifts/tests.py`).

### 156. `fb1ccda` — refactor: unify frontend design system, split AdminPage into tab components

*2026-08-04 · Z-Grate - W · 48 plików, +17912 / −15238*

- Rozbił monolityczny `frontend/src/pages/AdminPage.vue` (z ponad 14 tys. do 417 wierszy) na komponenty zakładek w `frontend/src/components/admin/`: `ApplicationsTab`, `BenefitsTab`, `CreateTab`, `CustomFieldsTab`, `DepartmentsTab`, `DocumentsTab`, `InfoHubTab`, `MailerTab`, `MyDepartmentsTab`, `SystemTab`, `TelegramEventsTab`, `TimesheetsTab`, `VolunteersTab` oraz modale `VolunteerEditModal` i `VolunteerViewModal`.
- Wydzielił wspólny stan i logikę panelu do `frontend/src/composables/useAdminCore.ts` (1340 wierszy, w tym typy danych) oraz wspólne style do `frontend/src/styles/admin-shared.css`.
- Dodał bibliotekę komponentów bazowych `BaseButton`, `BaseCard`, `BaseInput`, `BaseModal`, `BaseBadge` i tokeny CSS w `frontend/src/styles/tokens.css`.
- Dodał stronę `StyleGuidePage.vue` pod `/style-guide` (tylko tryb deweloperski lub personel) i dokument `frontend/docs/STYLE_GUIDE.md`.
- Dodał Stylelint (`frontend/.stylelintrc.json`, skrypt `stylelint` w `package.json`, reguła `color-no-hex`) i usunął Tailwind z zależności oraz z `vite.config.ts`; zmienił się `package-lock.json`.
- Dostosował pozostałe strony (m.in. `ProfilePage`, `LoginPage`, `OnboardingPage`, `BenefitsPage`, `MyAgreementsPage`, `PublicVolunteerApplyPage`) do nowych komponentów i tokenów; pełnej zgodności przeniesionego kodu zakładek z oryginałem nie weryfikowano wiersz po wierszu.

### 157. `b78f0ec` — feat: add toast notification system, polish frontend design consistency

*2026-08-04 · Z-Grate - W · 27 plików, +458 / −142*

- Dodał system powiadomień toast: magazyn Pinia `frontend/src/stores/toast.ts` (typy success/error/warning/info z domyślnym czasem wyświetlania), kompozycję `useToast.ts` oraz komponenty `BaseToast.vue` i `ToastHost.vue` osadzony w `App.vue`.
- Zmienił `error` i `info` w `useAdminCore.ts` na `customRef`, który przy przypisaniu wartości wyświetla toast, zachowując dotychczasowy sposób użycia w zakładkach.
- Zastąpił w `ProfilePage.vue` lokalne komunikaty błędów i sukcesu wywołaniami `toast.error` / `toast.success`; analogicznie dostosował pozostałe strony (`LoginPage`, `OnboardingPage`, `MyAgreementsPage`, `EventSelectPage` i inne).
- Dodał przykłady toastów do `StyleGuidePage.vue`, wpis w `STYLE_GUIDE.md`, dwa tokeny w `tokens.css` i tłumaczenia.

### 158. `f10dd68` — feat: notify stakeholders on agreement fully signed or rejected

*2026-08-04 · Z-Grate - W · 6 plików, +104 / −3*

- Dodał w `backend/agreements/services.py` funkcję `_stakeholders` (właściciel umowy, osoba prosząca o podpis i wszyscy podpisujący z kontem) i wysyłkę powiadomień z `_rollup_agreement_status`, gdy umowa zostanie w całości podpisana albo odrzucona.
- Dodał w `backend/services/agreement_signature_email.py` specyfikacje i funkcje `send_agreement_signature_completed_email` oraz `send_agreement_signature_rejected_email` (e-mail i Telegram, pl/en).
- Dodał cztery szablony e-mail `agreement_signature_completed_email_*` i `agreement_signature_rejected_email_*` w `backend/users/templates/`.

### 159. `1133121` — feat: add user language preference synced with UI locale

*2026-08-04 · Z-Grate - W · 7 plików, +57 / −2*

- Dodał do modelu `User` pole `language` z wyborem `pl`/`en` i domyślnym `pl` (`backend/users/models.py`, migracja `0005`).
- Wystawił `language` w serializerach użytkownika i profilu oraz obsłużył jego zapis w widoku profilu (`backend/users/views.py`).
- Frontend po zmianie języka interfejsu wysyła `PATCH /profile/` z nowym `language` (`App.vue`), a po zalogowaniu ustawia lokalizację według wartości z profilu (`frontend/src/stores/auth.ts`).

### 160. `3713503` — feat: add Event Settings admin tab with About/GDPR page overrides

*2026-08-04 · Z-Grate - W · 7 plików, +724 / −1*

- Dodał komponent `frontend/src/components/admin/EventSettingsTab.vue` (556 wierszy) z formularzem ustawień wydarzenia: dane podstawowe, zgłoszenia, flagi funkcji, benefity i stawki godzin, strony stopki, integracja Foxcons i administratorzy wydarzenia; zapis przez `PATCH /events/<id>/`.
- Dodał do serializera wydarzenia pola `about_page_title_translations`, `about_page_content_translations`, `gdpr_page_title_translations` i `gdpr_page_content_translations` (`backend/events/serializers.py`).
- Dodał zakładkę `event-settings` w `AdminPage.vue` dla administratorów wybranego wydarzenia i udostępnił im zakładkę działów (wcześniej tylko dla personelu).
- Dodał test `test_patch_persists_about_and_gdpr_page_overrides` oraz tłumaczenia pl/en.

### 161. `dc94f6e` — feat: various small fixes

*2026-08-05 · Z-Grate - W · 11 plików, +221 / −66*

- Dodał globalną nakładkę ładowania: magazyn `frontend/src/stores/loading.ts`, komponent `LoadingOverlay.vue` oraz interceptory w `frontend/src/services/api.ts` zliczające trwające żądania GET.
- Dodał pasek trybu deweloperskiego w `App.vue`, pokazywany gdy frontend działa w trybie DEV lub backend zwraca nowe pole `debug_mode` (`settings.DEBUG`) w ustawieniach aplikacji (`backend/core/views.py`).
- Dodał w `backend/services/magic_link.py` stały kod obejściowy `DEV_BYPASS_TOKEN` zapisywany do cache obok właściwego tokenu wyłącznie przy `DEBUG=True`.
- Usunął z serializera wydarzenia pola `event_admins` i `event_admin_ids` wraz z `EventAdminUserSerializer`, a z `EventSettingsTab.vue` sekcję wyboru administratorów wydarzenia.
- Zmienił tło głównego wariantu `BaseButton.vue` z gradientu na jednolity `--brand-accent`.

### 162. `769f05e` — feat: paginations

*2026-08-05 · Z-Grate - W · 19 plików, +479 / −92*

- Dodał `backend/core/pagination.py` z klasą `StandardResultsPagination` (25 wyników na stronę, `page_size` do 100, parametr `all=true` wyłączający paginację).
- Włączył paginację oraz `SearchFilter` i `OrderingFilter` w widokach umów, uczestnictw, członkostw w działach, zgłoszeń, użytkowników i użytkowników organizatora; lista umów dostała też filtry `event`, `type` i `exclude_gdpr`.
- Dodał paginację wierszy w widoku raportu benefitów (pola `next` i `previous` w odpowiedzi) i oparł `AuditLogPagination` na nowej klasie.
- Dodał kompozycję `frontend/src/composables/usePaginatedList.ts` i komponent `BasePagination.vue`; zakładki `VolunteersTab`, `DocumentsTab` i `TimesheetsTab` przeszły na listy stronicowane po stronie serwera.
- Miejsca wymagające pełnych list (ładowanie danych panelu w `AdminPage.vue`, odbiorcy mailera w `useAdminCore.ts`) zaczęły wysyłać `all=true`.

### 163. `f61732a` — Merge branch 'main' into shifts-manager

*2026-08-05 · Z-Grate - W · 81 plików, +19846 / −15430*

- Scalił gałąź `main` do `shifts-manager`, wnosząc commity `fb1ccda`–`769f05e`: podział `AdminPage.vue` na zakładki i system komponentów bazowych, toasty, powiadomienia o podpisaniu lub odrzuceniu umowy, preferencję języka użytkownika, zakładkę ustawień wydarzenia, nakładkę ładowania i paginację.
- Rozwiązał konflikty w `frontend/src/pages/AdminPage.vue`, `frontend/src/composables/useAdminCore.ts` oraz plikach tłumaczeń pl/en, przenosząc zakładkę „Zmiany” (`ShiftsAdminPanel`, `canAccessShiftsTab`) do nowej, podzielonej wersji panelu.

### 164. `441c092` — feat: locaiton

*2026-08-05 · Z-Grate - W · 13 plików, +778 / −19*

- Dodał model `ShiftLocation` (wydarzenie, unikalny w wydarzeniu `key`, `name_translations`, notatka, historia) i zamienił tekstowe pole `Shift.location` na klucz obcy do niego; migracja `0002_shift_location` celowo porzuca dotychczasowe wartości tekstowe.
- Dodał walidację, że lokalizacja zmiany należy do tego samego wydarzenia (`backend/shifts/models.py`).
- Dodał `ShiftLocationSerializer` (tłumaczona nazwa, automatyczne generowanie unikalnego klucza) i `ShiftLocationViewSet` pod `shift-locations` z zapisem tylko dla administratorów wydarzenia.
- Dodał komponent `frontend/src/components/admin/ShiftLocationsTab.vue`, a w `ShiftsAdminPanel.vue` zamienił pole tekstowe lokalizacji na listę wyboru.
- Dodał testy walidacji i API lokalizacji oraz tłumaczenia.

### 165. `d0f3d1a` — feat: shifts

*2026-08-05 · Z-Grate - W · 29 plików, +6311 / −96*

- Zastąpił w modelu `Shift` pole `end_at` polem `duration_minutes` (z `end_at` jako właściwością wyliczaną) i dodał publiczny `description`; dodał relację `departments` do `ShiftLocation` (migracje `0003`–`0008`).
- Dodał modele `ShiftTemplate` i `ShiftTemplatePosition` (szablony zmian ze stanowiskami i regułami) oraz `ShiftAssignment` (przypisanie wolontariusza do stanowiska: status assigned/cancelled, `met_requirements`, `overridden`, `collision_overridden`, notatka, `assigned_by`, unikalność aktywnego przypisania).
- Dodał endpointy `shift-assignments`, `shift-templates` (z akcjami `create-shift` i `bulk-create-shift`) i `shift-template-positions` oraz akcję `bulk-create` w `shifts` tworzącą serię zmian z przerwami; przypisanie sprawdza reguły, wolne miejsca i kolizje czasowe z możliwością nadpisania.
- Udostępnił listę zmian i lokalizacji uczestnikom wydarzenia z ukryciem notatek wewnętrznych i pokazywaniem samych pseudonimów przypisanych osób (`backend/shifts/serializers.py`).
- Dodał stronę wolontariusza `frontend/src/pages/ShiftsPage.vue` pod `/shifts` (oś czasu z podziałem na dni) z linkiem w nawigacji oraz narzędzia `frontend/src/utils/shiftTimeline.ts`.
- Dodał w panelu administracyjnym podzakładki zmian: `ShiftBuilderTab.vue` (interaktywny kreator z przeciąganiem na `interactjs`, cofaniem i ponawianiem), `ShiftTemplatesTab.vue`, `AssignVolunteerModal.vue` oraz rozbudował `ShiftsAdminPanel.vue` i `ShiftLocationsTab.vue`.
- Dodał test e2e `frontend/e2e/shift-builder.spec.ts`, ok. 680 wierszy testów backendu, zależność `interactjs` i zmianę `frontend/Dockerfile.dev` na `npm ci`; zmienił się `package-lock.json`.

### 166. `7062d1e` — feat: save shifts

*2026-08-06 · Z-Grate - W · 11 plików, +2275 / −82*

- Dodał akcję `eligible-volunteers` w `ShiftViewSet` (`backend/shifts/views.py`), która dla każdego stanowiska zmiany zwraca uczestników wydarzenia spełniających reguły, jeszcze nieprzypisanych i bez kolizji czasowej.
- Dodał `avatar_url` do danych przypisanej osoby w `ShiftAssignmentSerializer`.
- Dodał podzakładkę `frontend/src/components/admin/ShiftAssignerTab.vue` (806 wierszy) do przypisywania wolontariuszy do stanowisk z listy kandydatów.
- Dodał podzakładkę `frontend/src/components/admin/ShiftRulesTab.vue` (763 wiersze) do zarządzania szablonami reguł, grupami i warunkami.
- Dodał sortowanie tabel w `ShiftsAdminPanel.vue`, `ShiftLocationsTab.vue` i `ShiftTemplatesTab.vue`, testy `ShiftEligibleVolunteersApiTests` oraz tłumaczenia.

### 167. `dd95542` — feat: shifts self sign

*2026-08-06 · Z-Grate - W · 13 plików, +580 / −46*

- Dodał flagę `ShiftPosition.self_assign_enabled` (migracja `shifts/0009`) i termin `Event.shift_self_assign_closes_at` (migracja `events/0016`).
- Zmienił tworzenie przypisania w `ShiftAssignmentViewSet`: osoba niebędąca administratorem może zapisać wyłącznie siebie, o ile stanowisko dopuszcza samodzielny zapis, termin nie minął i zmiana jest otwarta; sprawdzenie wolnych miejsc odbywa się w transakcji z `select_for_update`.
- Pozwolił wolontariuszowi anulować własne przypisanie przed terminem oraz sprawdzać własną zgodność z wymaganiami przez `check-eligibility`.
- Dodał do serializera stanowiska pola `self_assign_available` i `self_assign_reason` (kody powodu, np. `full`, `collision`, `deadline_passed`) oraz znacznik `is_me` przy przypisaniach; przeniósł wykrywanie kolizji do `ShiftPosition.colliding_assignments`.
- Dodał w `ShiftsPage.vue` zapis i wypisanie się ze stanowiska, w `EventSettingsTab.vue` pole terminu, a w `ShiftsAdminPanel.vue` przełącznik samodzielnego zapisu; dodał `ShiftSelfAssignApiTests`.

### 168. `f05a51a` — added_stuff

*2026-08-06 · Z-Grate - W · 3 pliki, +436 / −27*

- Rozbudował polecenie `custom_seed_futrolajki2026_template` o zasiewanie zespołów w działach, lokalizacji zmian oraz przykładowych zmian ze stanowiskami i szablonami reguł.
- Rozbudował polecenie `seed_sample_data` o przykładowe lokalizacje, szablon reguł, stanowiska i przypisania zmian oraz ich liczniki w podsumowaniu.
- Dodał w `frontend/vite.config.ts` `server.allowedHosts` z hostem `staging-wolo.foxcons.ovh`.

### 169. `ad91ae1` — fix: eerror

*2026-08-06 · Z-Grate - W · 1 plik, +1 / −0*

- Dodał brakujące pole `collision_overridden: boolean` do interfejsu TypeScript `ShiftAssignment` w `frontend/src/components/ShiftsAdminPanel.vue`.

### 170. `7ca4907` — fix: volnteers

*2026-08-06 · Z-Grate - W · 1 plik, +7 / −3*

- Zmienił w `frontend/src/components/admin/VolunteersTab.vue` parametry zapytania listy wolontariuszy: filtr `event` jest pomijany, gdy włączono opcję pokazywania osób niezapisanych na wybrane wydarzenie (`includeNotSignedInSelectedEvent`).
- Dodał tę opcję do obserwowanych wartości, tak aby jej zmiana odświeżała listę.

### 171. `d615296` — feat" fixes

*2026-08-06 · Z-Grate - W · 7 plików, +48 / −7*

- Dodał flagę `self_assign_enabled` do `ShiftTemplatePosition` (migracja `shifts/0010`), do serializera i admina; tworzenie zmian z szablonu kopiuje ją na stanowiska (`backend/shifts/views.py`).
- Dodał pole wyboru samodzielnego zapisu w formularzu stanowiska szablonu (`ShiftTemplatesTab.vue`).
- Poprawił filtr „moje działy” w `ShiftsAdminPanel.vue` i `ShiftTemplatesTab.vue`: lokalizacje i szablony bez przypisanych działów są teraz widoczne dla wszystkich.

### 172. `aee04b3` — fix: self assign

*2026-08-06 · Z-Grate - W · 1 plik, +7 / −3*

- Zmienił tworzenie przypisania przez administratora w `backend/shifts/views.py`: brak pola `user` w żądaniu oznacza przypisanie samego siebie, zamiast błędu „User not found”.

### 173. `012310e` — chore: unfilled

*2026-08-29 · Z-Grate - W · 14 plików, +598 / −14*

- Dodał `backend/shifts/hours.py` z nieblokującymi ostrzeżeniami o godzinach (`hours_warnings`): porównuje godziny zmian z zadeklarowanymi godzinami „w trakcie” (tryb godzin rozszerzonych) oraz z przydziałem godzin dla działu i zespołu (tryb ewidencji czasu).
- Dołączył `hours_warnings` do serializera stanowiska, odpowiedzi `check-eligibility` i odpowiedzi tworzenia przypisania.
- Dodał osobny termin `Event.shift_self_unassign_closes_at` (migracja `events/0017`) i użył go przy samodzielnym wypisywaniu się zamiast terminu zapisu.
- Dodał podzakładkę `frontend/src/components/admin/UnfilledPositionsTab.vue` z listą nieobsadzonych stanowisk i przejściem do okna przypisania.
- Pokazał ostrzeżenia o godzinach w `AssignVolunteerModal.vue` i `ShiftsPage.vue`, dodał pole terminu wypisania w `EventSettingsTab.vue`, testy `ShiftHoursWarningsTests` i tłumaczenia.

### 174. `c2c9d16` — feat: changes

*2026-08-29 · Z-Grate - W · 19 plików, +9451 / −3121*

- Dodał stronę `frontend/src/pages/LivePage.vue` (720 wierszy) pod `/live`: pełnoekranowy widok „teraz / następna zmiana” i harmonogramu własnych zmian z odliczaniem, odświeżaniem co 60 s i lokalnym cache danych.
- Skonfigurował PWA w `frontend/vite.config.ts` (`vite-plugin-pwa`: manifest ze `start_url: /live`, cache `NetworkFirst` dla zapytań o zmiany), dodał ikony w `frontend/public/` i metatagi w `frontend/index.html`.
- Dodał obsługę tras pełnoekranowych (`meta.fullscreen`) w `App.vue`, ukrywającą nagłówek i stopkę, oraz link „Live” w nawigacji.
- Dodał opcję `silent` żądań w `frontend/src/services/api.ts`, pomijającą globalną nakładkę ładowania przy odpytywaniu w tle.
- Podzielił `ShiftsPage.vue` na zakładki „Moje zmiany” i „Zapisy na zmiany”; samodzielny zapis jest dostępny tylko w drugiej.
- Zmienił style tła strony w `frontend/src/style.css` i animację w `BaseCard.vue`; dodał zależności `vite-plugin-pwa` i `@vite-pwa/assets-generator`, co przebudowało `package-lock.json` (większość zmienionych wierszy commita).

### 175. `3df5dea` — feat: cache system and optimisations

*2026-08-30 · Z-Grate - W · 28 plików, +771 / −147*

- Skonfigurował cache Django na Redisie (`django-redis`, zmienna `CACHE_URL`, osobna baza nr 2, ignorowanie awarii cache) z pamięcią lokalną w testach (`backend/config/settings.py`, `requirements.txt`, pliki compose, `.env.example`).
- Dodał cache odpowiedzi Centrum informacji i listy działów z unieważnianiem przy zapisach (`backend/events/views.py`) oraz cache osi czasu i przypisań do działów wolontariusza z funkcją `invalidate_volunteer_cache` (`backend/core/selectors/users.py`, `backend/users/serializers.py`).
- Ograniczył liczbę zapytań: adnotacje `annotate_user_activity_flags` w listach użytkowników, zbiorcze wypełnianie pamięci podręcznej w `VolunteerApplicationListSerializer`, dodatkowe `prefetch_related` w widokach działów i członkostw.
- Dodał indeksy na `Participation.created_at`, statusie i dacie zgłoszeń, `Shift.start_at` i `ShiftAssignment.status` (migracje `events/0018`, `shifts/0011`).
- Włączył paginację w widokach aplikacji `shifts`, dodał filtr `mine=true` na liście zmian oraz twardy limit 500 wierszy dla `all=true` w `StandardResultsPagination`.
- Dostosował frontend: widoki potrzebujące pełnych list wysyłają `all=true`, `LivePage.vue` pobiera tylko własne zmiany i nie wymusza odświeżania w tle, a `InformationHubPage.vue` trzyma 5-minutowy cache stron po stronie klienta.

### 176. `230d663` — Docker compose prod changes

*2026-08-30 · Z-Grate@SV2-JumpMigrations · 2 pliki, +5 / −4*

- Dodał host `staging-wolo-api.foxcons.ovh` do domyślnej wartości `DJANGO_ALLOWED_HOSTS` w `docker-compose.prod.yml` oraz w dwóch usługach w `docker-compose.yml`.
- Zmienił w deweloperskim `docker-compose.yml` adres `VITE_API_BASE_URL` frontendu na `https://staging-wolo-api.foxcons.ovh/api`, zostawiając dotychczasowy adres lokalny w komentarzu.

### 177. `382aeef` — fix: dev pwa

*2026-08-30 · Z-Grate - W · 1 plik, +4 / −0*

- Włączył service worker PWA także w trybie deweloperskim, dodając `devOptions: { enabled: true, type: 'module' }` do konfiguracji `VitePWA` w `frontend/vite.config.ts`.

### 178. `bab945a` — Merge branch 'shifts-manager' of github.com:zgrate/volunteer-crm into shifts-manager

*2026-08-30 · Z-Grate - W · 2 pliki, +5 / −4*

- Scalił zdalną gałąź `shifts-manager` z lokalną, wnosząc commit `230d663` (zmiany hostów stagingowych w `docker-compose.prod.yml` i `docker-compose.yml`) obok lokalnego `382aeef`; bez konfliktów.

### 179. `69ebfea` — fix: PWA mode

*2026-08-30 · Z-Grate - W · 3 pliki, +20 / −1*

- Dodał `frontend/src/utils/pwa.ts` z funkcją `isPwaStandalone` wykrywającą uruchomienie jako zainstalowana aplikacja.
- Dodał w `frontend/src/router/index.ts` regułę, która w trybie zainstalowanej aplikacji przekierowuje zalogowanego użytkownika z wybranym wydarzeniem na `/live` z każdej trasy poza `live` i `onboarding`.
- Ukrył w `LivePage.vue` link wyjścia do `/shifts`, gdy aplikacja działa jako zainstalowane PWA.

### 180. `7e42d98` — feat: shifts dispatcher

*2026-08-31 · Z-Grate - W · 26 plików, +6610 / −25*

- Dodał relację `Department.dispatchers` (migracja `events/0019`) z metodami `user_is_dispatcher` i `user_can_dispatch` (administrator wydarzenia, organizator działu lub dyspozytor) oraz pola `dispatcher_ids` i `dispatchers` w serializerze działu.
- Dodał do `ShiftAssignment` pola obecności: `attendance_status` (pending/checked_in/late/not_present), `attendance_note`, `attendance_marked_by`, `attendance_marked_at` (migracja `shifts/0012`).
- Dodał akcję `shifts/dispatch/` zwracającą zmiany i stanowiska z działów, którymi użytkownik może dysponować, oraz akcję `mark-attendance` na przypisaniu; dyspozytor może też przypisywać, anulować i sprawdzać kandydatów w swoich działach, a `override_capacity` pozwala dodać zastępstwo ponad limit miejsc.
- Serializer przypisania udostępnia dyspozytorowi pełne dane kontaktowe wolontariusza (`contact`), a profil użytkownika dostał flagi `is_department_dispatcher` i `is_department_dispatcher_for_event`.
- Dodał stronę `frontend/src/pages/DispatcherPage.vue` pod `/dispatcher` (bieżące i nadchodzące zmiany, oznaczanie obecności, kontakt, panel zastępstw) z kontrolą dostępu `canAccessDispatcherPanel` w `stores/auth.ts` i routerze.
- Dodał podzakładkę `ShiftDispatchersTab.vue` oraz wybór dyspozytorów w `DepartmentsTab.vue`, test e2e `frontend/e2e/dispatcher.spec.ts`, blokadę service workerów w `playwright.config.ts` i testy backendu.
- Dołączył do repozytorium wygenerowane pliki `frontend/dev-dist/` (`sw.js`, `registerSW.js`, `workbox-*.js`), które stanowią większość dodanych wierszy.

### 181. `aeb8f56` — feat: shifts and dispatcher options

*2026-08-31 · Z-Grate - W · 20 plików, +1434 / −83*

- Dodał testowy zegar deweloperski: moduł `backend/core/clock.py` podmienia `django.utils.timezone.now` (tylko przy `DEBUG`, instalowany w `CoreConfig.ready()`) i przesuwa czas o offset zapisany w nowym polu `AppSettings.dev_time_offset_seconds` (migracja `core/0009`).
- Dodał endpoint `settings/dev-clock/` (`DevClockView`, `POST` z `target_time` i `DELETE`, tylko dla administratora i tylko w trybie debug) oraz pola `server_time` i `dev_clock_active` w odpowiedzi `settings/app/`.
- Dodał w `ShiftAssignment` status obecności `self_checked_in` oraz klucz obcy `replaces` wskazujący zastępowane przypisanie (migracje `shifts/0013` i `0014`), a w serializerach pola `replaces`, `replaced_by` i `replaced_by_nickname`.
- Dodał akcję `POST shift-assignments/{id}/self-check-in/`, którą wolontariusz sam melduje się na zmianie (od 5 minut przed startem do końca zmiany, tylko gdy status to `pending`), oraz atomową akcję `POST shift-assignments/{id}/replace/`, która anuluje stare przypisanie i tworzy nowe z `replaces`.
- Wydzielił wspólną walidację przypisania (`_validate_assignment_target`: duplikat, wolne miejsca, wymagania, kolizje) i sprawił, że wolontariusz nadal widzi na swojej liście zmianę, z której został zastąpiony.
- Rozbudował `frontend/src/pages/DispatcherPage.vue`: sekcja niedawno zakończonych zmian (6 godzin wstecz), przycisk przypisania wolontariusza na wolne miejsce (`AssignVolunteerModal`), czyszczenie statusu obecności, panel zastępstwa także dla statusu „nieobecny”, sprawdzanie wymagań i kolizji kandydata z potwierdzeniem obejścia.
- Dodał composable `frontend/src/composables/useServerClock.ts`, sekcję zegara testowego w `SystemTab.vue`, zegar w pasku trybu deweloperskiego w `App.vue`, przycisk meldowania się i informację „zastąpiony przez” w `LivePage.vue` oraz testy `ShiftSelfCheckInApiTests` i `ShiftAssignmentReplaceApiTests`.

### 182. `71584ba` — fix: allo wreplace any volunteer

*2026-08-31 · Z-Grate - W · 4 pliki, +94 / −11*

- Dodał w endpoincie kandydatów na zastępstwo (`backend/shifts/views.py`) parametr `include_ineligible`, po którego podaniu zwracani są także wolontariusze niespełniający wymagań lub z kolizją; każdy kandydat dostał pola `eligible` i `has_collision`.
- Dodał w panelu zastępstwa w `frontend/src/pages/DispatcherPage.vue` pole wyboru „pokaż niespełniających wymagań” z ostrzeżeniem oraz czerwone znaczniki przy takich kandydatach.

### 183. `ed043e7` — feat: PWA offline mode

*2026-09-02 · Z-Grate - W · 7 plików, +141 / −17*

- Dodał moduł `frontend/src/utils/connectivity.ts` z reaktywnym `isOnline` i rejestracją wywołań zwrotnych `onReconnect`.
- Dodał w `frontend/src/stores/auth.ts` funkcje `refreshAccessToken` i `maybeRefreshAccessToken` (odświeżenie tokenu, gdy do wygaśnięcia zostało mniej niż 2 godziny) wywoływane przy starcie i po odzyskaniu połączenia w `main.ts`; błąd sieciowy przestał wylogowywać użytkownika.
- Zmienił strażnika routera (`frontend/src/router/index.ts`) tak, by wynik sprawdzenia ukończenia onboardingu był zapisywany w `localStorage` i używany offline lub po przekroczeniu czasu zapytania.
- Przeniósł zapamiętanie wybranego wydarzenia z `sessionStorage` do `localStorage` (`frontend/src/stores/event.ts`).
- Dodał w `frontend/vite.config.ts` regułę cache `NetworkFirst` dla adresów `/profile` i przywrócił w `docker-compose.yml` lokalny adres `VITE_API_BASE_URL` zamiast stagingowego.

### 184. `7df8204` — fix: dev-dist

*2026-09-02 · Z-Grate - W · 1 plik, +1 / −0*

- Dodał katalog `frontend/dev-dist/` do `.gitignore`.

### 185. `037ea5f` — fix: staging

*2026-09-02 · Z-Grate@SV2-JumpMigrations · 2 pliki, +15 / −2*

- Przełączył w `docker-compose.yml` zmienną `VITE_API_BASE_URL` frontendu z powrotem na adres stagingowego API (lokalny adres został zakomentowany).
- Zmienił się też generowany plik `frontend/dev-dist/sw.js`.

### 186. `1dc9490` — fix: config

*2026-09-02 · Z-Grate - W · 1 plik, +2 / −0*

- Dodał w konfiguracji Workbox w `frontend/vite.config.ts` opcje `navigateFallback: '/index.html'` i `navigateFallbackDenylist` wykluczającą ścieżki `/api/`.

### 187. `57da7e2` — Merge branch 'shifts-manager' of github.com:zgrate/volunteer-crm into shifts-manager

*2026-09-02 · Z-Grate@SV2-JumpMigrations · 1 plik, +2 / −0*

- Commit scalający: połączył lokalny commit `037ea5f` (ustawienia stagingowe) ze zdalną gałęzią `shifts-manager`, wnosząc zmianę `1dc9490` w `frontend/vite.config.ts`.

### 188. `1c84a0d` — feat: conops screen

*2026-09-07 · Z-Grate - W · 23 pliki, +3647 / −905*

- Dodał model `ConopsScreen` (wydarzenie, nazwa, filtry działów i lokalizacji zmian, tryb `filter_mode` AND/OR, powiązany klucz `UserApiKey`, flaga `is_active`) wraz z historią i rejestracją w panelu admina (`backend/shifts/models.py`, migracja `shifts/0015`).
- Dodał `ConopsScreenViewSet` pod `conops-screens/` (CRUD dla administratorów wydarzenia, akcja `rotate-token`) oraz endpoint `conops-screens/data/` uwierzytelniany nagłówkiem `ApiKey`, który zwraca zmiany w koszykach `current`, `upcoming` i `future`.
- Dodał `ShiftAuditLogViewSet` pod `shift-logs/` – dziennik zdarzeń dotyczących zmian z filtrami po akcji, dziale, wolontariuszu, autorze, szablonie zmiany i czasie – oraz nowe akcje w `AuditLog` (`closed`, `reopened`, `cancelled`, `attendance_marked`, `attendance_self_checked_in`; migracja `core/0010`).
- Rozszerzył endpoint `shifts/dispatch/` o opcjonalną paginację i filtry `department`, `start_after`, `start_before`, `attendance_status`, `volunteer`.
- Dodał pełnoekranową stronę `frontend/src/pages/ConopsScreenPage.vue` (trasa `/conops-screen` z tokenem w adresie, odświeżanie co 30 sekund) oraz zakładki „Dziennik” (`ShiftsLogTab.vue`) i „Ekran Conops” (`ConopsScreenTab.vue`) w `ShiftsAdminPanel.vue`.
- Rozbił `DispatcherPage.vue` na komponenty `dispatcher/DispatchAssignmentActions.vue` i `dispatcher/ManagePastShiftsTab.vue` (przeglądanie i poprawianie minionych zmian) oraz wspólne typy `frontend/src/types/dispatch.ts`.
- Dodał testy `ShiftAuditLogApiTests` i `ConopsScreenApiTests` oraz zmienił `VITE_API_BASE_URL` w `docker-compose.yml` na wartość ze zmiennej środowiskowej.

### 189. `20302ec` — fix: changes

*2026-09-07 · Z-Grate@SV2-JumpMigrations · 23 pliki, +3629 / −1016*

- Commit scalający (mimo tytułu „fix”): połączył gałąź z ustawieniami stagingowymi (`57da7e2`) z commitem `1c84a0d`, wnosząc cały ekran Conops, dziennik zmian i przebudowę panelu dyspozytora.
- Względem `1c84a0d` różni się tylko usunięciem generowanego pliku `frontend/dev-dist/sw.js` i jedną linią `VITE_API_BASE_URL` w `docker-compose.yml`.

### 190. `5d5be7a` — fix: padding

*2026-09-07 · Z-Grate - W · 1 plik, +2 / −1*

- Poprawił style kontenera w `frontend/src/pages/ConopsScreenPage.vue`: szerokość `100%` zamiast `100vw` i `box-sizing: border-box`.

### 191. `3ec0ee3` — change: Shift progress bar

*2026-09-07 · Z-Grate - W · 3 pliki, +46 / −19*

- Zastąpił na ekranie Conops (`frontend/src/pages/ConopsScreenPage.vue`) pasek zapełnienia stanowiska paskiem upływu czasu zmiany (`shiftTimeProgress`).
- Dodał odliczanie czasu pozostałego do końca zmiany (`formatCountdown`) wraz z tłumaczeniami.

### 192. `487ca65` — feat: notifications for test

*2026-09-07 · Z-Grate - W · 34 pliki, +1026 / −31*

- Dodał aplikację `backend/notifications` z modelami `PushSubscription` (subskrypcja Web Push użytkownika) i `ShiftReminderNotification` (przypomnienie o zmianie w oknach 60 min, 15 min i w chwili startu, ze statusem i wynikiem kanałów).
- Dodał endpointy `push-subscriptions/vapid-public-key/` i `push-subscriptions/` (`POST` zapisuje subskrypcję po `endpoint`, `DELETE` ją usuwa) oraz polecenie `generate_vapid_keys`.
- Dodał serwisy `backend/services/shift_reminders.py` (planowanie, anulowanie i wysyłka przypomnień z szablonami PL/EN) i `backend/services/web_push.py`; przypomnienia są planowane przy tworzeniu przypisania i przy zastępstwie w `backend/shifts/views.py`.
- Dodał zadania Celery `dispatch_shift_reminders_task` i `send_shift_reminder_task`, migrację rejestrującą zadanie cykliczne co minutę w `django-celery-beat`, usługę `celery-beat` w `docker-compose.yml` oraz zależności `django-celery-beat` i `pywebpush`.
- Zastąpił generowany service worker własnym `frontend/src/sw.ts` (strategia `injectManifest`, obsługa zdarzeń `push` i `notificationclick`) i dodał pakiety `workbox-*`.
- Dodał composable `usePushNotifications.ts` oraz w `LivePage.vue` kartę zachęcającą do włączenia powiadomień w zainstalowanej aplikacji PWA.
- Dodał ustawienia `VAPID_*` w `backend/config/settings.py` i `.env.example` oraz testy w `backend/notifications/tests.py`.

### 193. `1c9aecc` — feat: disabling shift stuff

*2026-09-07 · Z-Grate - W · 14 plików, +400 / −13*

- Dodał w modelu `Event` pięć przełączników: `is_live_view_enabled`, `is_conops_view_enabled`, `is_attendee_shift_view_enabled`, `is_dispatcher_enabled`, `is_self_check_in_enabled` (migracja `events/0020`, serializer, panel admina).
- Wymusił je w `backend/shifts/views.py`: blokada listy zmian dla zwykłych wolontariuszy, panelu dyspozytora, oznaczania obecności, zastępstw, samodzielnego meldowania się oraz tworzenia i danych ekranu Conops.
- Dodał pola wyboru tych ustawień w `frontend/src/components/admin/EventSettingsTab.vue`.
- Ukrył wyłączone widoki we frontendzie: nawigację w `App.vue`, trasy w `router/index.ts`, przycisk meldowania w `LivePage.vue` i komunikat o wyłączeniu w `ConopsScreenPage.vue`.
- Dodał testy backendu dla każdej z blokad (`backend/shifts/tests.py`).

### 194. `19dfcfa` — feat: various shift stuff

*2026-09-07 · Z-Grate - W · 4 pliki, +116 / −2*

- Dodał w `frontend/src/components/ShiftsAdminPanel.vue` filtr działu dostępny po włączeniu widoku „wszystkie działy”, zawężający listę zmian i lokalizacji.
- Dodał w `frontend/src/pages/ShiftsPage.vue` linię bieżącej godziny na siatce dnia oraz wiersz z aktualnym czasem i zmianą, na której wolontariusz właśnie jest (z użyciem `useServerClock`).

### 195. `f8165f6` — feat: days before and afeter

*2026-09-08 · Z-Grate - W · 31 plików, +1924 / −20*

- Dodał w modelu `Event` pola `shift_planning_days_before` i `shift_planning_days_after` oraz metodę `shift_window()`; model i serializer zmiany odrzucają termin spoza tego okna planowania (migracja `events/0022`).
- Dodał w `Event` pola `declared_hours_before_ends_at` i `declared_hours_after_starts_at` oraz metodę `WorkedHoursEntry.derive_phase`, dzięki której faza wpisu godzin (przed/w trakcie/po) jest wyliczana automatycznie z daty, gdy granice są ustawione (`backend/benefits/models.py`, `views.py`).
- Dodał pierwszą wersję zadań na zmianach: modele `ShiftTask` i `ShiftTemplateTask`, flagę `tasks_enabled` w `Shift` i `ShiftTemplate` (migracja `shifts/0016`) oraz przełącznik wydarzenia `is_task_assignment_enabled` (migracja `events/0021`).
- Dodał `ShiftTaskViewSet` (`shift-tasks/` z akcjami `assign` i `finish`) i `ShiftTemplateTaskViewSet` (`shift-template-tasks/`) oraz powiadomienie o przydzielonym zadaniu (`backend/services/shift_task_notifications.py`, szablony `task_assigned_*.txt`).
- Dodał obsługę zadań we frontendzie: edycja zadań w `ShiftsAdminPanel.vue` i `ShiftTemplatesTab.vue`, przydzielanie w `DispatchAssignmentActions.vue`, zakładka zadań z przyciskiem zakończenia w `LivePage.vue`.
- Dodał pola nowych ustawień w `EventSettingsTab.vue` i automatyczne wyliczanie fazy w formularzu `TimesheetsTab.vue`.
- Dodał testy okna planowania, wyliczania fazy i zadań (`backend/shifts/tests.py`, `backend/benefits/tests.py`).

### 196. `77c8f67` — fix: unselect shifts

*2026-09-08 · Z-Grate - W · 2 pliki, +26 / −0*

- Dodał przycisk „wyczyść wszystko” przy wyborze szablonów reguł stanowiska w `frontend/src/components/ShiftsAdminPanel.vue` i `frontend/src/components/admin/ShiftTemplatesTab.vue` (funkcja `clearPositionRuleTemplatesSelection`).

### 197. `8e7198c` — feat: tasks system

*2026-09-08 · Z-Grate - W · 24 pliki, +1369 / −184*

- Przebudował zadania tak, by jedno zadanie mogło mieć wielu wykonawców: dodał model `ShiftTaskAssignment` (para zadanie–przypisanie) i usunął pola `assigned_assignment`, `assigned_by`, `assigned_at` z `ShiftTask`; migracja `shifts/0017` przenosi istniejące dane.
- Dodał pole `title` do `ShiftPosition`, `ShiftTemplatePosition`, `ShiftTask` i `ShiftTemplateTask` (uzupełniane migracją danych), a `description` stało się opcjonalnym opisem szczegółowym.
- Dodał w `ShiftTaskViewSet` akcję `unassign` oraz endpoint `shift-tasks/history/` z historią zadań zmiany; dodał akcje `assigned`, `unassigned`, `finished` w `AuditLog` (migracja `core/0011`).
- Wyłączył instalację testowego zegara w procesie Celery beat (`backend/core/apps.py`).
- Dodał komponenty `dispatcher/DispatchShiftTasksPanel.vue` (lista i dodawanie zadań) oraz `dispatcher/DispatchTaskAssignModal.vue` (przydzielanie wolontariuszy do zadań, historia) i podpiął je w `DispatcherPage.vue`.
- Dostosował `LivePage.vue`, `ShiftsPage.vue`, `ConopsScreenPage.vue`, zakładki administracyjne zmian i typy `types/dispatch.ts` do tytułów stanowisk i nowej struktury zadań.

### 198. `841cad2` — feat: notification test and mailer set

*2026-09-08 · Z-Grate - W · 12 plików, +301 / −9*

- Dodał endpoint `POST push-subscriptions/test/` (`PushSubscriptionTestView`) wysyłający testowe powiadomienie push do zalogowanego użytkownika.
- Dodał tryb doręczenia `push` w masowej wysyłce (`BulkEmailTask`, migracja `core/0012`, `backend/services/bulk_notifications.py` ze skracaniem treści do 180 znaków); `backend/users/views.py` wymaga aktywnej subskrypcji odbiorcy.
- Dodał opcję „push” i status kanału push w dzienniku wysyłki w `frontend/src/components/admin/MailerTab.vue`.
- Dodał w `LivePage.vue` zakładkę ustawień z przyciskiem testu powiadomień.
- Poprawił w `ShiftsPage.vue` rozmieszczenie kolumn lokalizacji w siatce (jawne `gridColumn`) i dodał testy masowej wysyłki push w `backend/users/tests.py`.

### 199. `02bd213` — fix: .env.prod.example

*2026-09-09 · Z-Grate - W · 1 plik, +6 / −0*

- Dodał do `.env.prod.example` zmienne `VAPID_PRIVATE_KEY_B64`, `VAPID_PUBLIC_KEY` i `VAPID_ADMIN_EMAIL` z komentarzem o poleceniu `generate_vapid_keys`.

### 200. `8cb1be7` — fix: invalid WAPID  key

*2026-09-09 · Z-Grate - W · 1 plik, +3 / −1*

- Zmienił `backend/services/web_push.py` tak, by klucz prywatny VAPID był wczytywany przez `Vapid01.from_pem` i przekazywany do `pywebpush` jako obiekt zamiast surowego tekstu PEM.

### 201. `bda2038` — fix: fix

*2026-09-09 · Z-Grate - W · 7 plików, +99 / −4*

- Zmienił unikalność `PushSubscription` z samego `endpoint` na parę (`user`, `endpoint`), aby wspólne urządzenie nie przejmowało subskrypcji innego konta (migracja `notifications/0003`, poprawka zapisu w `backend/notifications/views.py`).
- Dodał w zakładce ustawień `LivePage.vue` kartę konta z awatarem, nazwą użytkownika i przyciskiem wylogowania.
- Dodał pola `username` i `avatar_url` do typu użytkownika w `frontend/src/stores/auth.ts`.

### 202. `c7dcf1b` — fix: date before after front

*2026-09-15 · Z-Grate - W · 4 pliki, +55 / −4*

- Uwzględnił `shift_planning_days_before` i `shift_planning_days_after` przy budowaniu listy dni w `ShiftAssignerTab.vue` i `ShiftBuilderTab.vue` oraz dodał te pola do typu wydarzenia w `stores/event.ts`.
- Zmienił odświeżanie danych w `LivePage.vue` na scalanie po `id` w miejscu (`mergeArrayById`) zamiast podmiany całych tablic.

### 203. `5bdde6f` — fix: cache

*2026-09-15 · Z-Grate - W · 1 plik, +4 / −0*

- Dodał w `frontend/src/components/admin/EventSettingsTab.vue` wywołanie `eventStore.loadEvents()`, które odświeża listę wydarzeń w magazynie stanu (z diffu wynika tylko samo wywołanie, bez opisu przyczyny).

### 204. `9be8836` — fix: gaslighting

*2026-09-15 · Z-Grate - W · 3 pliki, +13 / −15*

- Usunął osobny widok `PublicEventListView` i jego trasę `events/` z `backend/events/urls.py`.
- Przeniósł jego logikę do `EventViewSet`: akcja `list` dopuszcza niezalogowanych, którzy dostają tylko aktywne wydarzenia otwarte na rejestrację w formacie `PublicEventSerializer`.
- Dostosował jeden test w `backend/events/tests.py`.

### 205. `49d88d4` — fix: names in shifts

*2026-09-15 · Z-Grate - W · 9 plików, +8 / −35*

- Usunął imię i nazwisko z danych wolontariusza zwracanych przez serializer przypisań (`backend/shifts/serializers.py`) i z powiadomień o zmianach i zadaniach, które używają teraz `username`.
- Usunął pola `first_name` i `last_name` z typów i etykiet w komponentach zmian (`ShiftsAdminPanel.vue`, `AssignVolunteerModal.vue`, `ShiftAssignerTab.vue`, `ShiftsLogTab.vue`, `UnfilledPositionsTab.vue`, `types/dispatch.ts`).

### 206. `cabe71a` — feat: upcoming shifts assignment and history/task list

*2026-09-15 · Z-Grate - W · 5 plików, +95 / −8*

- Dodał w `DispatcherPage.vue` pasek zadań także dla nadchodzących zmian.
- Dodał wyszukiwanie zadań w `DispatchShiftTasksPanel.vue` i przewijaną listę.
- Przeniósł w `DispatchTaskAssignModal.vue` listę zadań i historię do osobnych okien modalnych, z wyszukiwarką w historii.

### 207. `c322ee2` — feat: descirpion of one off

*2026-09-15 · Z-Grate - W · 3 pliki, +68 / −2*

- Dodał w `DispatchShiftTasksPanel.vue` pole opisu przy tworzeniu zadania (wysyłane jako `description`).
- Dodał przycisk usuwania zadania z potwierdzeniem (`DELETE shift-tasks/{id}/`).

### 208. `32ac8e9` — fix: shift notes, translation

*2026-09-16 · Z-Grate - W · 7 plików, +210 / −15*

- Dodał komponent `frontend/src/components/ShiftNoteModal.vue` do edycji notatki zmiany (`PATCH shifts/{id}/` z polem `note`).
- Dodał przycisk notatki na blokach zmian w `ShiftBuilderTab.vue` i obsługę okna w `ShiftsAdminPanel.vue`.
- Dodał w `DispatcherPage.vue` przycisk notatki i znacznik jej istnienia dla każdej zmiany, a pasek akcji pokazuje teraz wszystkie zmiany, nie tylko te z włączonymi zadaniami.
- Uzupełnił tłumaczenia PL/EN.

### 209. `3910c51` — feat: notes system

*2026-09-16 · Z-Grate - W · 18 plików, +1041 / −5*

- Dodał aplikację `backend/notes` z modelem `Note` o typach `department`, `dispatcher` i `private`, z ograniczeniem, że tylko notatka prywatna nie ma działu.
- Dodał `NoteViewSet` pod `notes/`: notatki działu widzą jego członkowie, notatki dyspozytorskie – organizatorzy, dyspozytorzy i administratorzy wydarzenia, a prywatne – tylko autor.
- Dodał w liście działów filtry `dispatchable_by_me` i `member_of_me` (`backend/events/views.py`).
- Dodał komponent `frontend/src/components/notes/NotesBoard.vue` (lista w formie czatu, edycja i usuwanie własnych wpisów, odświeżanie co 15 sekund).
- Podpiął tablicę notatek w `DispatcherPage.vue` (zakładka notatek z wyborem działu) i w `ShiftsPage.vue`, dodał testy w `backend/notes/tests.py`.

### 210. `1f4c838` — feat: dispatcher screen

*2026-09-16 · Z-Grate - W · 7 plików, +688 / −10*

- Dodał komponent `frontend/src/components/dispatcher/DispatcherBoardTab.vue` – tablicę dnia z kolumnami lokalizacji i blokami zmian (obsada, zadania, najgorszy status obecności) oraz oknem szczegółów zmiany.
- Dodał zakładkę „tablica” w `DispatcherPage.vue`.
- Pozwolił dyspozytorowi edytować zmianę wyłącznie w zakresie pola `note` (`backend/shifts/views.py`).
- Dodał zapis notatki przypisania w `DispatchAssignmentActions.vue` i ustawianie fokusu na oknie w `BaseModal.vue`, aby działał klawisz Escape.

### 211. `0258dac` — fixes: dispatcher and live page fixes

*2026-09-16 · Z-Grate - W · 4 pliki, +237 / −7*

- Dodał w `LivePage.vue` zakładkę notatek z tablicami `NotesBoard` dla działów wolontariusza i działów, które może dyspozytorować.
- Poprawił w `DispatcherPage.vue` zachowanie wybranego działu notatek po przeładowaniu listy działów.

### 212. `b696e07` — feat: imporoved notification system

*2026-09-17 · Z-Grate - W · 49 plików, +1641 / −36*

- Dodał rejestr kategorii powiadomień (`backend/services/notification_categories.py`) i pole `Event.disabled_notification_categories` (migracja `events/0023`), które pozwala wyłączać kategorie dla wydarzenia.
- Dodał endpoint `events/notification-categories/` oraz sekcję przełączników kategorii w `frontend/src/components/admin/EventSettingsTab.vue`.
- Dodał nowe powiadomienia z szablonami PL/EN: przypisanie do zmiany i jego anulowanie, zmiana i usunięcie zmiany, zdjęcie z zadania, dodanie i usunięcie z zespołu, dodanie i usunięcie uczestnictwa (nowe moduły w `backend/services/`).
- Podpiął je w widokach `shifts`, `events`, `users` i `benefits`; `ShiftViewSet` powiadamia przypisanych wolontariuszy o zmianie tytułu, terminu, długości lub lokalizacji.
- Przekazał wydarzenie do istniejących powiadomień (umowy, zgłoszenia, benefity, zaproszenia, przypomnienia), aby respektowały wyłączone kategorie.
- Dodał testy w aplikacjach `events`, `shifts`, `benefits`, `users`, `agreements` i `notifications`.

### 213. `3f03860` — feat: Shifts for admins only

*2026-09-17 · Z-Grate - W · 40 plików, +1333 / −720*

- Dodał w modelu `Event` jedenaście flag `*_admin_only` (m.in. dla zarządzania zmianami, widoku live, ekranu Conops, widoku zmian wolontariusza, dyspozytora, samodzielnego meldowania, zadań, Centrum informacji, ewidencji godzin, monitoringu Telegrama) oraz metodę `is_feature_available(enabled_attr, admin_only_attr, user)` (migracja `events/0024`).
- Zastąpił bezpośrednie sprawdzanie przełączników w `backend/shifts/views.py`, `backend/events/views.py` i `backend/benefits/views.py` wywołaniami `is_feature_available`, dzięki czemu funkcja oznaczona „tylko dla administratorów” działa dla administratorów wydarzenia mimo wyłączenia dla pozostałych.
- Rozbił `frontend/src/components/admin/EventSettingsTab.vue` na podzakładki `EventSettingsGeneralTab`, `FunctionalitiesTab`, `ShiftsTab`, `NotificationsTab`, `PagesTab`, `IntegrationsTab`, `ApplicationsBenefitsTab` ze wspólnym stanem w `composables/useEventSettingsForm.ts`.
- Dodał funkcję `isFeatureAvailable` w `composables/useFeatureAccess.ts` i użył jej w nawigacji `App.vue`, strażnikach `router/index.ts` oraz stronach `LivePage.vue`, `ShiftsPage.vue`, `TimesheetPage.vue`, `OnboardingPage.vue`.
- Usunął lokalne kopie `confirmDestructiveAction` z komponentów zmian i uprościł `AssignVolunteerModal.vue`; co dokładnie zastąpiło potwierdzenia, nie zostało sprawdzone w diffie.
- Dodał testy flag `admin_only` w `backend/events/tests.py`.

### 214. `672d46d` — feat: fix permission

*2026-09-17 · Z-Grate - W · 4 pliki, +56 / −3*

- Przeniósł rejestrację service workera (`registerSW`) z `frontend/src/main.ts` do `LivePage.vue`, aby systemowa prośba o instalację i powiadomienia nie pojawiała się na stronach publicznych.
- Dodał testy trybu „tylko dla administratorów” dla podsumowania godzin (`backend/benefits/tests.py`) oraz ekranu Conops i listy zmian (`backend/shifts/tests.py`).

### 215. `dd855e7` — fix: missing migration

*2026-09-17 · Z-Grate - W · 1 plik, +24 / −0*

- Dodał brakującą migrację `backend/users/migrations/0006_alter_historicaluser_date_joined_and_more.py`, która zmienia domyślną wartość pola `date_joined` w `User` i `HistoricalUser` na `django.utils.timezone.now`.

### 216. `e87e0c1` — feat: migration squash pre prod

*2026-09-17 · Z-Grate - W · 6 plików, +1317 / −1*

- Dodał spłaszczone migracje (z atrybutem `replaces`) dla aplikacji `core` (0009–0012), `events` (0015–0024), `notifications` (0001–0003), `shifts` (0001–0017) i `users` (0005–0006); oryginalne pliki migracji pozostały.
- Dodał w `docker-compose.prod.yml` usługę `celery-beat` oraz zmienne `VAPID_PRIVATE_KEY_B64`, `VAPID_PUBLIC_KEY`, `VAPID_ADMIN_EMAIL` dla istniejących usług.

### 217. `8d40912` — feat: pagination in notes

*2026-09-17 · Z-Grate - W · 4 pliki, +88 / −4*

- Ustawił w `backend/notes/views.py` sortowanie notatek od najnowszych (`-created_at`, `-id`).
- Zmienił `frontend/src/components/notes/NotesBoard.vue` na pobieranie stronami po 25 wpisów z przyciskiem „wczytaj starsze” zachowującym pozycję przewijania; odświeżanie w tle dopisuje tylko nowe notatki.

### 218. `6f67bcd` — fix: security fixes

*2026-09-17 · Z-Grate - W · 11 plików, +130 / −60*

- Zmienił domyślną wartość `DJANGO_DEBUG` na `false` i uzależnił stały kod obejścia logowania magic-link od nowego ustawienia `MAGIC_LINK_DEV_BYPASS_ENABLED` (`backend/config/settings.py`, `backend/services/magic_link.py`, `.env.example`).
- Wydzielił ochronę przed SSRF do `backend/services/url_safety.py` (`is_safe_external_url`) i użył jej dla adresu awatara oraz dla `endpoint` subskrypcji push, który musi być adresem `https`.
- Ograniczył widoczność adresu e-mail w danych przypisania do dyspozytorów i samego wolontariusza (`backend/shifts/serializers.py`).
- Dodał brakujące sprawdzenie przełączników funkcji w jednej z akcji `ShiftTaskViewSet` oraz warunek `is_active=True` przy pobieraniu wydarzenia w `backend/core/views.py`.
- Zaktualizował testy w `backend/notifications/tests.py` i `backend/users/tests.py`.

### 219. `3c52a21` — fix: cache

*2026-09-17 · Z-Grate - W · 1 plik, +4 / −0*

- Dodał w `frontend/src/sw.ts` obsługę komunikatu `SKIP_WAITING`, po którym nowy service worker aktywuje się od razu (`self.skipWaiting()`).

### 220. `a842f74` — fix: not building

*2026-09-17 · Z-Grate - W · 2 pliki, +18 / −10*

- Zastąpił w szablonach `EventSettingsApplicationsBenefitsTab.vue` i `EventSettingsPagesTab.vue` bezpośrednie wywołania `setEventFormTranslation` lokalną funkcją `updateTranslation` z typem `TranslationFieldKey`; tytuł wskazuje, że naprawiało to błąd budowania.

### 221. `d5792cd` — fix: vibile events

*2026-09-17 · Z-Grate - W · 2 pliki, +9 / −3*

- Ograniczył listę na `frontend/src/pages/EventSelectPage.vue` do wydarzeń aktywnych i otwartych na rejestrację (`visibleEvents`).
- Dodał pola `is_active` i `is_open_for_registration` do typu wydarzenia w `frontend/src/stores/event.ts`.

### 222. `bbb2163` — fix: errors

*2026-09-17 · Z-Grate - W · 2 pliki, +26 / −5*

- Dodał w `backend/notes/views.py` ochronę przed duplikatami: identyczna notatka tego samego autora wysłana w ciągu 10 sekund zwraca istniejący wpis; dodał też `.distinct()` do listy notatek.
- Dodał w `NotesBoard.vue` funkcję `addNotesIfNew`, która nie dopisuje notatki już obecnej na liście.

### 223. `8947cf0` — feat: change icons

*2026-09-21 · Z-Grate - W · 10 plików, +2 / −3*

- Podmienił pliki ikon w `frontend/public` (favicon, ikony PWA, `apple-touch-icon`), dodał `favicon.png` i `maskable-icon.png`, usunął `favicon.svg`.
- Zaktualizował odwołania do ikon w `frontend/index.html` i w manifeście w `frontend/vite.config.ts`.

### 224. `ee9152b` — chore: change name of app to better

*2026-09-21 · Z-Grate - W · 1 plik, +1 / −1*

- Zmienił `short_name` aplikacji PWA w `frontend/vite.config.ts` z „Live Shifts” na „Volunteer LIVE”.

### 225. `13dcf8a` — feat: settings and var fixes

*2026-09-21 · Z-Grate - W · 22 pliki, +313 / −21*

- Dodał w `Event` przełączniki `is_shift_notes_enabled` i `is_shift_notes_enabled_admin_only` (migracja `events/0025`); przy wyłączeniu serializery zmian, stanowisk i zadań ukrywają i odrzucają pole `note` (`_strip_note_if_disabled`), a edycja notatki przez dyspozytora zwraca błąd.
- Dodał ustawienie notatek w `EventSettingsShiftsTab.vue` i ukrył pola oraz przyciski notatek w `ShiftsAdminPanel.vue`, `ShiftBuilderTab.vue`, `DispatcherBoardTab.vue` i `DispatcherPage.vue`.
- Dodał pole `User.push_notifications_enabled` (migracja `users/0007`); w tym commicie pole istnieje tylko w modelu.
- Dodał w `LivePage.vue` własny gest „pociągnij, aby odświeżyć”, który pobiera dane zamiast przeładowywać całą aplikację PWA.
- Owinął odczyt offsetu w `backend/core/clock.py` w `transaction.atomic()`, aby nieudane zapytanie nie psuło otaczającej transakcji.
- Dodał testy przełącznika notatek w `backend/shifts/tests.py`.

### 226. `0fd4ca0` — feat: select push notification to mailer

*2026-09-21 · Z-Grate - W · 19 plików, +513 / −76*

- Dodał pole `push_notifications_enabled` do modelu `User` (migracja `backend/users/migrations/0008_historicaluser_push_notifications_enabled_and_more.py`) oraz udostępnił je w `UserSerializer` i w `PATCH /profile/` (`backend/users/views.py`).
- Dodał tryb dostarczania `push_preferred` („push, potem preferowany kanał”) do `BulkEmailTask.DeliveryMode` (`backend/core/models.py`, migracja `0013_alter_bulkemailtask_delivery_mode.py`) i obsłużył go w `backend/services/bulk_notifications.py`: najpierw próba push u odbiorców z włączoną opcją, potem kanał preferowany i kanał zapasowy.
- Przeniósł wysyłkę Web Push do wspólnej funkcji `send_system_notification` (`backend/services/user_notifications.py`): gdy wolontariusz ma włączone push i dostarczenie się powiedzie, e-mail/Telegram są pomijane, a wysyłka trafia do `OutboundMessageLog` z kanałem `push`.
- Usunął zduplikowane wywołania `send_web_push_to_user` z serwisów powiadomień o zmianach, przypisaniach, przypomnieniach i zadaniach, zastępując je parametrami `push_title`/`push_body`/`push_url`/`push_tag` w `send_templated_notification` (`backend/services/templated_notification.py`).
- Dodał w profilu przełącznik powiadomień push z subskrypcją przeglądarki oraz przycisk wysyłki testowego powiadomienia (`frontend/src/pages/ProfilePage.vue`), a w mailerze opcję `push_preferred` (`frontend/src/components/admin/MailerTab.vue`).
- Dopisał testy nowego trybu i kolejności kanałów w `backend/core/tests.py` oraz `backend/notifications/tests.py`.

### 227. `b12e123` — chore: Move around some tabs so it will be more cleaned up

*2026-09-21 · Z-Grate - W · 4 pliki, +102 / −27*

- Dodał `frontend/src/pages/ProfileShell.vue` — wspólną powłokę z zakładkami Profil, Historia, Moje umowy, Benefity i Ewidencja czasu (dwie ostatnie widoczne warunkowo, zależnie od uprawnień i włączenia funkcji w wydarzeniu).
- Zmienił nazwę `ProfilePage.vue` na `ProfileTab.vue` (bez zmian treści) i przepiął trasy `/profile`, `/history`, `/my-agreements`, `/benefits`, `/timesheet` na `ProfileShell` (`frontend/src/router/index.ts`).
- Usunął z górnej nawigacji osobne odnośniki do historii, umów, benefitów i ewidencji czasu (`frontend/src/App.vue`).

### 228. `bcc834c` — feat: changes to notifications, new notification system, fixes to shifts

*2026-09-21 · Z-Grate - W · 24 pliki, +1661 / −191*

- Dodał pole `read_at` do `OutboundMessageLog` (migracja `backend/core/migrations/0014_outboundmessagelog_read_at.py`) oraz endpointy skrzynki powiadomień: `GET /notifications/`, `GET /notifications/unread-count/`, `POST /notifications/mark-all-read/`, `POST /notifications/<id>/read/` (`backend/notifications/views.py`, `backend/notifications/urls.py`).
- Zaczął zapisywać w metadanych logu surową treść wiadomości (`raw_body`, `is_raw_html`) w `backend/services/bulk_mailer.py`, a dla starszych wpisów HTML dodał oczyszczanie treści z tagów w serializerze powiadomień.
- Wprowadził parametr `source` w `send_system_notification`; linki logowania oznaczył jako `magic_link` i dodał migrację danych `0015_backfill_magic_link_source.py`, tak aby linki logowania i kody potwierdzeń nie trafiały na listę powiadomień.
- Dodał stronę `frontend/src/pages/NotificationsPage.vue`, store `frontend/src/stores/notifications.ts`, ikonę koperty z licznikiem nieprzeczytanych w nagłówku (`frontend/src/App.vue`) oraz okno powiadomień i przełącznik „Pokaż stare zmiany” w `frontend/src/pages/LivePage.vue`.
- Dodał w panelu dyspozytora okno „Zarządzaj zmianą” (`ManageShiftModal.vue`, `ManageShiftAssignmentRow.vue`) zastępujące dotychczasową listę wierszy stanowisk w `frontend/src/pages/DispatcherPage.vue`; przycisk notatki wyróżnia się, gdy zmiana ma notatkę.
- Dodał do `ShiftAssignmentSerializer` pole `replaces_nickname` (oznaczenie „Zastępuje …”) i przy zastępstwie zaczął przenosić przypisania zadań (`ShiftTaskAssignment`) na nowe przypisanie (`backend/shifts/views.py`).
- Zaktualizował test e2e `frontend/e2e/dispatcher.spec.ts`.

### 229. `dc9d7a7` — fix: better modal

*2026-09-21 · Z-Grate - W · 12 plików, +639 / −811*

- Dodał do `frontend/src/components/base/BaseModal.vue` właściwość `size` (`md`/`lg`) z szerszym wariantem okna.
- Wydzielił logikę szukania zastępstwa do composable `frontend/src/composables/useReplacementFlow.ts` oraz osobnego okna `AssignmentReplacementModal.vue` z wyszukiwarką kandydatów.
- Wydzielił edycję notatki o wolontariuszu do `AssignmentNoteModal.vue`, podpiętego w `DispatcherPage.vue`.
- Odchudził `DispatchAssignmentActions.vue` i `ManageShiftAssignmentRow.vue`, usuwając z nich zduplikowany kod zastępstw i notatek; dodał przycisk pokazywania/ukrywania danych kontaktowych.
- Dostosował `DispatcherBoardTab.vue`, `ManageShiftModal.vue`, tłumaczenia i test e2e dyspozytora do nowych okien.

### 230. `f3c28e2` — feat: changes to notifciaon, some changes to lang and fixes

*2026-09-21 · Z-Grate - W · 16 plików, +159 / −25*

- Dodał powiadomienie o zakończeniu zadania: `send_task_finished_notification` z kategorią `shift_task_finished` i szablonami `task_finished_pl.txt`/`task_finished_en.txt` (`backend/services/shift_task_notifications.py`), wysyłane do osób trzymających zadanie po akcji zakończenia (`backend/shifts/views.py`).
- Zezwolił na ponowne przypisanie zadania już zakończonego — usunął blokadę „This task is already finished” i przy przypisaniu zeruje `finished_at`.
- Zmienił logowanie push w `backend/services/user_notifications.py` tak, aby wpis powstawał tylko przy skutecznym dostarczeniu (nieudany push nie dubluje wpisu z kanału zapasowego).
- Dodał w `backend/services/web_push.py` obsługę dowolnych wyjątków transportowych, żeby błąd sieci nie przerywał wywołującego kodu.
- Dodał kategorię `shift_task_finished` w ustawieniach powiadomień wydarzenia, odznakę „Już zakończone w tej zmianie” w `DispatchTaskAssignModal.vue` oraz przekazywanie `lang` w zapytaniach `LivePage.vue`.
- Usunął z repozytorium pusty plik `backend/test.sqlite3` i zaktualizował testy w `backend/shifts/tests.py`.

### 231. `b7f545a` — feat: delete user from event, filter columns

*2026-09-23 · Z-Grate - W · 11 plików, +428 / −31*

- Dodał serwis `backend/services/participation_removal.py` z funkcją `remove_participation`: usuwa udział wolontariusza w wydarzeniu wraz z członkostwami w działach, wpisami przepracowanych godzin i portfelem benefitów, a aktywne przypisania do zmian anuluje (z anulowaniem przypomnień).
- Zapisał pełną migawkę usuwanych danych w dzienniku audytu pod nową akcją `removed_from_event` (`backend/core/models.py`, migracja `0016_alter_auditlog_action.py`).
- Przepiął na ten serwis `ParticipationViewSet.perform_destroy` (`backend/events/views.py`) oraz akcje usuwania z wydarzenia w `UserAdminViewSet` i `OrganizerScopedUserViewSet`; odpowiedź zawiera teraz podsumowanie usuniętych elementów.
- Włączył metodę `DELETE` w `OrganizerScopedUserViewSet` tylko dla akcji usuwania z wydarzenia, blokując ogólne `destroy` kodem 405 (`backend/users/views.py`).
- Dodał filtr widocznych kolumn lokalizacji (z opcjami „Pokaż wszystkie” / „Ukryj wszystkie”) w `ShiftAssignerTab.vue` i `ShiftBuilderTab.vue`.
- Dopisał testy kaskadowego usuwania i powiadomienia wolontariusza w `backend/users/tests.py`.

### 232. `a313223` — feat: continous shift planning - backend + admin panel

*2026-09-24 · Z-Grate - W · 34 pliki, +4710 / −14*

- Dodał do modelu `Department` pole `shift_planning_mode` (`standard`/`continuous`); zmiana trybu usuwa wszystkie zmiany działu i zapisuje wpis audytu (`backend/events/models.py`, `backend/events/views.py`, migracja `0026_department_shift_planning_mode.py`).
- Dodał modele siatki planowania ciągłego: `ShiftGridCategory`, `ScheduleAnnotation`, `ShiftGridRequirement`, `ShiftGridRequirementCategory` oraz pola `origin` i `grid_category` w `Shift` (`backend/shifts/models.py`, migracje `0018`–`0024`).
- Dodał model `UserUnavailability` (niedyspozycyjność wolontariusza w wydarzeniu, źródło `manual`/`grid`) z `UserUnavailabilityViewSet` pod `/user-unavailability/` (`backend/users/models.py`, `backend/users/views.py`, migracja `0009_userunavailability.py`).
- Dodał serwis `backend/shifts/grid.py`, który zamienia zamalowane 30-minutowe komórki na ciągłe zmiany/stanowiska/przypisania (lub niedyspozycyjność dla kategorii typu blackout) i sprawdza szablon reguł kategorii.
- Dodał endpointy `/shift-grid/`, `/shift-grid/paint-batch/`, `/shift-grid/eligibility/` oraz CRUD `/shift-grid-categories/`, `/shift-grid-requirements/`, `/schedule-annotations/`; zablokował ręczne tworzenie stanowisk i zmian z szablonów dla działów w trybie ciągłym (`backend/shifts/views.py`, `backend/shifts/urls.py`).
- Dodał zakładkę `frontend/src/components/admin/ContinuousPlanningGridTab.vue` (malowanie przeciąganiem, cofanie, kategorie, wymagania obsady, adnotacje, podsumowania) i wybór trybu planowania w `DepartmentsTab.vue`; działy ciągłe zniknęły z list działów przy ręcznych stanowiskach i szablonach.
- Zarejestrował nowe modele w panelu Django (`backend/shifts/admin.py`, `backend/users/admin.py`) i dopisał obszerne testy w `backend/shifts/tests.py`, `backend/events/tests.py`, `backend/users/tests.py`.

### 233. `053fdc3` — feat: a lot of changes to schedules and shifts and stuff

*2026-09-26 · Z-Grate - W · 43 pliki, +3544 / −104*

- Dodał aplikację `backend/foxcons_schedule` z modelami `FoxconsHall` i `FoxconsScheduleEntry`, zadaniem Celery `fetch_foxcons_schedule_task` (uruchamianym co 15 minut przez migrację `0002_seed_schedule_fetch.py`) oraz endpointami tylko do odczytu `/foxcons-halls/` i `/foxcons-schedule-entries/` dla administratorów wydarzenia.
- Rozbudował `backend/services/foxcons.py` o pobieranie harmonogramu i sal z Foxcons (`sync_foxcons_schedule_for_event`) z pomijaniem szkiców i sal typu `continuous` (nowe pole `Event.foxcons_exclude_continuous_halls`); dodał akcję `POST /events/<id>/resync-foxcons-schedule/`.
- Dodał w `Department` relacje `schedule_halls` i `schedule_panels` oraz akcję `GET /departments/<id>/schedule-board/` zwracającą program wybrany do pokazania obok zmian działu (`backend/events/models.py`, `backend/events/views.py`).
- Dodał model `ShiftGridPersonSetting` (notatka, kolor i kolejność wiersza wolontariusza w siatce) z endpointem `/shift-grid-person-settings/` i akcją `reorder` (`backend/shifts/models.py`, `backend/shifts/views.py`).
- Zmienił wykrywanie kolizji zmian tak, aby porównywało czasy obcięte do pełnych minut (`_floor_to_minute` w `backend/shifts/models.py`).
- Dodał kolumny i wiersze programu Foxcons w tablicy dyspozytora, kreatorze i przydzielaniu zmian, na stronie zmian wolontariusza oraz w siatce ciągłej (`frontend/src/utils/scheduleBoardColumns.ts`, `ScheduleEntryDetailModal.vue`), a także filtr wierszy, ustawienia osoby i tryb zmiany kolejności w siatce.
- Dodał zakładki ustawień wydarzenia `EventSettingsIntegrationsTab.vue` i `EventSettingsScheduleTab.vue` oraz wybór sal i punktów programu w `DepartmentsTab.vue`; usunął sekcję ponownej synchronizacji ID Foxcons z `SystemTab.vue`.

### 234. `667fb4f` — feat: a lot of changes to shifts system

*2026-09-27 · Z-Grate - W · 34 pliki, +3002 / −59*

- Dodał do `Event` ustawienia samodzielnego zgłaszania niedyspozycyjności: `is_unavailability_self_service_enabled`, wariant tylko dla adminów oraz okno `unavailability_self_service_opens_at`/`closes_at` (`backend/events/models.py`, migracja `0029`).
- Rozszerzył `UserUnavailability` o źródło `self_service`, typ (`full`/`conditional`), status (`active`/`denied`) i pola odmowy; dodał akcję `deny` z obowiązkowym powodem i powiadomieniem wolontariusza (`backend/users/views.py`, `backend/services/user_unavailability_notifications.py`, szablony `unavailability_denied_email_*.txt`).
- Dodał wykrywanie kolizji z prowadzeniem panelu Foxcons (`ShiftPosition.panel_host_collisions`) i z niedyspozycyjnością (`unavailability_conflicts`) oraz pola `panel_collision_overridden` i `unavailability_overridden` w `ShiftAssignment`; przypisanie wymaga teraz jawnego nadpisania tych konfliktów (`backend/shifts/models.py`, `backend/shifts/views.py`, migracje `0026`, `0027`).
- Dodał akcję `GET /events/<id>/schedule-board/` z pełnym programem wydarzenia oraz pomijanie przy synchronizacji sal bez żadnych punktów programu (`backend/events/views.py`, `backend/services/foxcons.py`).
- Dodał na stronie zmian wolontariusza zakładkę „Niedyspozycyjność” z zaznaczaniem przedziałów przeciąganiem (`frontend/src/pages/ShiftsPage.vue`) oraz w panelu administracyjnym zakładkę przeglądu z odmawianiem zgłoszeń (`UnavailabilityReviewTab.vue`).
- Dodał okno „Zaawansowane przydzielanie” (`AdvancedAssignModal.vue`), wyszukiwanie wśród wszystkich wolontariuszy wydarzenia i ostrzeżenia o kolizji z panelem/niedyspozycyjnością w `AssignVolunteerModal.vue` i `AssignmentReplacementModal.vue`.

### 235. `138a680` — feat: a lot of stuff

*2026-09-27 · Z-Grate - W · 39 plików, +4688 / −887*

- Wprowadził wspólny silnik reguł przypisań: `backend/shifts/rule_engine.py` (rejestry reguł, `evaluate_assignment`, `BulkAssignmentEvaluator`) i `backend/shifts/assignment_rules.py` (reguły `capacity`, `requirements`, `collision`, `panel_collision`, `unavailability` oraz nieblokujące ostrzeżenia), zastępując zduplikowane sprawdzenia w widokach, serializerach i siatce.
- Zastąpił trzy pola logiczne nadpisań w `ShiftAssignment` polami JSON `rule_overrides` i `rule_check_results` z migracją przenoszącą dane (`backend/shifts/migrations/0028_rule_overrides_json.py`); usunął też ograniczenie `unique_active_task_per_assignment` ze zsquashowanej migracji `0001`.
- Dodał endpoint `GET /user-schedule-blockers/` zwracający pewne blokady wolontariusza: przypisane zmiany i prowadzone punkty programu (`backend/shifts/views.py`).
- Zablokował samodzielne zgłaszanie niedyspozycyjności na czas, w którym wolontariusz ma już przypisaną zmianę (`backend/users/views.py`).
- Umożliwił w siatce nadpisanie braku uprawnień do kategorii (`overrides` w `assign_category`, okno `GridIneligibilityModal.vue`) i dodał narzędzie „Info” oraz oznaczenia niedyspozycyjności w `ContinuousPlanningGridTab.vue`.
- Dodał widok niedyspozycyjności całego działu (`DepartmentUnavailabilityBoard.vue`) i okno dodawania niedyspozycyjności przez administratora (`AddUnavailabilityModal.vue`); na stronie wolontariusza pojawiły się kolumny „Moje zmiany” i „Mój program”.
- Przebudował `AssignVolunteerModal.vue` i `useReplacementFlow.ts` na ogólne nadpisywanie reguł, dodał filtr działu także w trybie „moje działy” i zablokował zapis zmiany przy otwartym formularzu stanowiska lub zadania (`ShiftsAdminPanel.vue`).

### 236. `c9f6c85` — feat: changes again :laugh:

*2026-09-27 · Z-Grate - W · 22 pliki, +1722 / −24*

- Dodał eksport siatki planowania ciągłego do Excela (`frontend/src/utils/gridExcelExport.ts`, biblioteka `exceljs`) i do PNG (`frontend/src/utils/domPngExport.ts`, biblioteka `html2canvas`) z wyborem zakresu „widoczna część / cały dzień”; `frontend/package-lock.json` również się zmienił.
- Sprawił, że przycisk „Odśwież” w panelu administracyjnym na karcie zmian odświeża także dane panelu zmian i aktywnej podzakładki (`frontend/src/pages/AdminPage.vue`, metody `reload` wystawione przez podzakładki w `ShiftsAdminPanel.vue`).
- Przeniósł sortowanie powiązanych działów, zespołów, sal i punktów programu z serializerów do `Prefetch` w zapytaniach widoków, ograniczając liczbę zapytań (`backend/events/views.py`, `backend/shifts/views.py`, `backend/users/views.py` i odpowiadające serializery).

### 237. `05bec06` — feat: house assgined indicator

*2026-09-27 · Z-Grate - W · 14 plików, +332 / −3*

- Dodał w `backend/shifts/hours.py` funkcje `hours_summary` i `bulk_hours_summary`, liczące godziny przypisane i zadeklarowane wolontariusza w wydarzeniu.
- Dołączył `assigned_hours` i `declared_hours` do danych wolontariusza w przypisaniach, liście kandydatów do zmiany i wierszach siatki (`backend/shifts/serializers.py`, `backend/shifts/views.py`).
- Dodał te pola do `UserSerializer` wraz z `HoursByUserListMixin`, który przy parametrze `?event=` wylicza je zbiorczo dla listowanej strony (`backend/users/serializers.py`, `backend/users/views.py`).
- Dodał odznakę „przypisane/zadeklarowane” (`frontend/src/utils/formatHours.ts`) w oknie przypisywania, przydzielaniu zmian, siatce ciągłej, oknie zastępstwa i wierszu zarządzania zmianą.
- Dopisał testy w `backend/shifts/tests.py` i `backend/users/tests.py`.

### 238. `31bf162` — feat: fix bugs, add exports, other various stuff

*2026-09-30 · Z-Grate - W · 31 plików, +1726 / −133*

- Dodał do `Event` pole `timezone` (strefa IANA, domyślnie `Europe/Warsaw`, metoda `zoneinfo()`) oraz `hide_unsectioned_shift_content` (`backend/events/models.py`, migracje `0030`, `0031`); siatka wyznacza granice dnia w strefie wydarzenia.
- Ograniczył widoczność dla wolontariuszy: lokalizacje i stanowiska widzi tylko członek powiązanego działu, a elementy bez działu można ukryć ustawieniem wydarzenia; samodzielny zapis wymaga członkostwa w dziale stanowiska (`backend/shifts/views.py`, `backend/shifts/serializers.py`).
- Dodał endpoint `POST /shift-grid/recalculate/` i funkcję `recalculate_department`, odbudowujące wszystkie zmiany i blokady działu wygenerowane z siatki; poprawił scalanie przedziałów przy przejściu przez północ UTC i przy czasach z ułamkami minuty (`backend/shifts/grid.py`).
- Dodał wspólny komponent `ExportToolbar.vue` i eksport do Excela/PNG w zakładkach panelu zmian (lista zmian, kreator, przydzielanie, szablony, reguły, lokalizacje, dziennik, nieobsadzone stanowiska, ekran CONOPS, tablica niedyspozycyjności) wraz z narzędziami `tableExcelExport.ts`, `timelineBoardExcelExport.ts`, `slotGridExcelSheet.ts`, `shiftExportRows.ts`.
- Dodał w ustawieniach wydarzenia pola strefy czasowej i ukrywania treści bez działu oraz przycisk „Przelicz zmiany” w siatce.
- Dopisał testy widoczności, samodzielnego zapisu i przeliczania siatki w `backend/shifts/tests.py`.

### 239. `2696087` — fix: hidden not saving

*2026-09-30 · Z-Grate - W · 1 plik, +2 / −0*

- Dodał pole `hide_unsectioned_shift_content` do typu i do danych wczytywanych w formularzu ustawień wydarzenia (`frontend/src/components/admin/EventSettingsTab.vue`), przez co ustawienie zaczęło się zapisywać.

### 240. `d3a18b0` — fix: some shifts were still visible for the volunteer when they should not

*2026-09-30 · Z-Grate - W · 3 pliki, +82 / −1*

- Nadpisał `ShiftViewSet.list`, aby dla użytkowników niebędących personelem pomijać zmiany, w których żadne stanowisko nie jest dla nich widoczne (`_shift_visible_for_non_staff` w `backend/shifts/views.py`).
- Dodał analogiczne filtrowanie zmian bez stanowisk po stronie `frontend/src/pages/ShiftsPage.vue` (z wyjątkiem administratorów wydarzenia).
- Dopisał test regresyjny w `backend/shifts/tests.py`.

### 241. `9b36ade` — feat: volunteer facing grid

*2026-10-01 · Z-Grate - W · 5 plików, +763 / −6*

- Otworzył `GET /shift-grid/` dla wolontariuszy będących członkami działu: odpowiedź jest ograniczona do ich własnego wiersza, a notatka administratora o osobie jest ukrywana (`backend/shifts/views.py`).
- Dodał komponent `frontend/src/components/VolunteerShiftGridTab.vue` — siatkę tylko do odczytu z legendą kategorii, niedyspozycyjnością, wierszami programu działu oraz filtrem lokalizacji i programu zapamiętywanym w `localStorage`.
- Dodał zakładkę „Siatka” na stronie zmian dla członków działów w trybie ciągłym, z wyborem działu i dnia (`frontend/src/pages/ShiftsPage.vue`).

### 242. `217cb10` — feat: recalculate grids better

*2026-10-01 · Z-Grate - W · 5 plików, +416 / −130*

- Zmienił sposób budowania zmian z siatki: zamiast osobnej zmiany na każdego wolontariusza i kategorię powstaje jedna zmiana na ciągły odcinek czasu, w którym zestaw par wolontariusz–kategoria w dziale się nie zmienia (`_rebuild_department_day` w `backend/shifts/grid.py`).
- Dodał pole `grid_category` do `ShiftPosition` (migracja `backend/shifts/migrations/0029_historicalshiftposition_grid_category_and_more.py`); każde stanowisko z siatki jest jednoosobowe i niesie własną kategorię.
- Przestawił odczyt komórek siatki na kategorię stanowiska zamiast kategorii zmiany (`backend/shifts/views.py`).
- Dopisał testy współdzielenia zmiany, dzielenia odcinków przy dołączeniu/odejściu i zamianie kategorii oraz przeliczania starych fragmentów (`backend/shifts/tests.py`).

### 243. `4de2a1d` — fixes: add dev profiling tool, fix permission endpoints

*2026-10-03 · Z-Grate - W · 8 plików, +278 / −17*

- Dodał `backend/requirements-dev.txt` z pakietem `nplusone` i włączył go w trybie `DEBUG` jako detektor zapytań N+1 logujący ostrzeżenia (`backend/config/settings.py`); `backend/Dockerfile.dev` instaluje zależności deweloperskie.
- Wyłączył metody `PUT`/`PATCH` w `ShiftAssignmentViewSet` i oznaczył `user` oraz `position` jako pola tylko do odczytu w serializerze przypisania.
- Zablokował przenoszenie kategorii siatki, wymagań, ustawień osoby i adnotacji do wydarzenia lub działu, którym użytkownik nie zarządza (`_check_event_move`, `_check_department_move` w `backend/shifts/views.py`).
- Przypiął `user` i `event` do istniejącego wpisu przy samodzielnej edycji niedyspozycyjności (`_self_service_update` w `backend/users/views.py`).
- Dopisał testy tych zabezpieczeń w `backend/shifts/tests.py` i `backend/users/tests.py`.

### 244. `a3636df` — feat: shift operators

*2026-10-03 · Z-Grate - W · 1 plik, +0 / −0*

- Zmienił wyłącznie nazwę pliku `frontend/src/components/admin/ShiftDispatchersTab.vue` na `ShiftAccessTab.vue`, bez zmian treści.

### 245. `4881b80` — feat: shift operators

*2026-10-03 · Z-Grate - W · 15 plików, +1160 / −198*

- Dodał do `Department` relację `shift_operators` oraz metody `user_is_shift_operator` i `user_can_operate_shifts`; operator zmian ma też uprawnienia dyspozytora (`backend/events/models.py`, migracja `0032_department_shift_operators.py`).
- Przebudował uprawnienia w `backend/shifts/views.py` (pomocnicze `_can_operate_department`, `_can_operate_shift`, `_can_operate_template` itd.): operator może zarządzać zmianami, stanowiskami, lokalizacjami, szablonami, regułami, ekranami CONOPS, siatką i adnotacjami swojego działu oraz przeglądać jego dziennik zmian, ale nie ustawienia wydarzenia ani działu.
- Udostępnił operatorom notatki zmian, stanowisk i lokalizacji w serializerach (`backend/shifts/serializers.py`).
- Dodał `shift_operator_ids`/`shift_operators` do `DepartmentSerializer` oraz flagi `is_department_shift_operator` i `is_department_shift_operator_for_event` do serializerów użytkownika i profilu.
- Przerobił zakładkę dyspozytorów na „Dostęp do zmian w dziale” z osobnymi listami dyspozytorów i operatorów zmian (`ShiftAccessTab.vue`) i dopuścił operatorów do panelu administracyjnego (`frontend/src/stores/auth.ts`).
- Dodał klasę testów `ShiftOperatorPermissionTests` z ponad 50 przypadkami (`backend/shifts/tests.py`) i testy flag profilu (`backend/users/tests.py`).

### 246. `9cce939` — feat: ci/cd

*2026-10-03 · Z-Grate - W · 5 plików, +460 / −0*

- Dodał workflow `.github/workflows/backend-ci.yml`: przy zmianach w `backend/**` uruchamia PostgreSQL i Redis, sprawdza brakujące migracje i wykonuje testy Django.
- Dodał workflow `.github/workflows/main.yml` dla gałęzi `main`: pełny zestaw testów przez `./test.sh --continue-on-failure` oraz próbne budowanie produkcyjnych obrazów backendu, nginx i kopii zapasowych.
- Dodał workflow `.github/workflows/deploy-production.yml` dla gałęzi `production`: buduje i wypycha obrazy do GHCR z tagiem z SHA commita, a następnie wdraża je przez SSH poleceniem `docker compose pull` i `up -d`.
- Dodał `docker-compose.prod-runner.yml` uruchamiający usługi z gotowych obrazów GHCR oraz zmienne `GHCR_OWNER` i `IMAGE_TAG` w `.env.prod.example`.

### 247. `654d10c` — fix: runs selfhosted

*2026-10-03 · Z-Grate - W · 3 pliki, +5 / −5*

- Zmienił `runs-on` z `ubuntu-latest` na `self-hosted` we wszystkich zadaniach workflowów `backend-ci.yml`, `deploy-production.yml` i `main.yml`.

### 248. `60012cb` — feat and fixes: Added Healthcheck, run fixes on different problems prechecked and fixes

*2026-10-03 · Z-Grate - W · 25 plików, +601 / −85*

- Dodał publiczny endpoint `GET /api/health/` (`HealthCheckView` w `backend/core/views.py`): sprawdza bazę i cache, a z parametrem `?full` także Celery, pocztę, binaria `tectonic`/`pandoc`, prywatny magazyn plików oraz konfigurację Foxcons i Telegrama dla aktywnych wydarzeń; pełny wynik jest buforowany przez 60 sekund, a błąd zwraca kod 503.
- Przypiął dokładne wersje zależności w `backend/requirements.txt` i `backend/requirements-dev.txt`.
- Ograniczył zapytania N+1: prefetch sygnatariuszy, wersji i wygenerowanych dokumentów umów (`backend/agreements/views.py`, `backend/agreements/serializers.py`), przypisań stanowisk (`backend/shifts/views.py`) oraz jednorazowe wczytywanie drzewa reguł (`_build_rule_tree` w `backend/shifts/assignment_rules.py`).
- Uzupełnił migrację `0028_rule_overrides_json.py` o działające cofanie, które odtwarza dawne pola logiczne nadpisań.
- Zamienił zakodowane kolory w stylach siatek, tablic niedyspozycyjności i innych komponentów zmian na zmienne motywu (m.in. `ContinuousPlanningGridTab.vue`, `VolunteerShiftGridTab.vue`, `LivePage.vue`).
- Dopisał testy healthchecka (`backend/core/tests.py`), liczby zapytań (`backend/shifts/tests.py`) i umów (`backend/agreements/tests.py`).

### 249. `f10c29c` — fix: fake clock problems when running make migrations

*2026-10-03 · Z-Grate - W · 1 plik, +28 / −7*

- Rozszerzył w `backend/core/apps.py` listę poleceń, dla których nie jest instalowana łatka deweloperskiego zegara: oprócz `beat` także `makemigrations`, `migrate`, `check`, `shell`, `test`, `showmigrations`, `sqlmigrate`, `dbshell`, `shell_plus`.
- Opisał w komentarzu przyczynę: podmieniony `timezone.now` powodował, że `makemigrations` przy każdym uruchomieniu proponował zbędny `AlterField`.

### 250. `ba4d213` — fix: squash migrations, healthcheck

*2026-10-03 · Z-Grate - W · 9 plików, +858 / −3*

- Dodał zsquashowane migracje (z atrybutem `replaces`) dla aplikacji `core` (0013–0016), `events` (0025–0027 i 0028–0032), `foxcons_schedule` (0001–0003), `shifts` (0018–0029) i `users` (0007–0010); pierwotne pliki migracji pozostały w repozytorium.
- Zmienił `backend/entrypoint.prod.sh`: gunicorn startuje w tle, skrypt czeka na `/api/health/`, wykonuje pełny healthcheck `?full=1` i wypisuje ostrzeżenie przy błędach.
- Zmienił healthcheck kontenera backendu w `docker-compose.prod.yml` i `docker-compose.prod-runner.yml` z próby połączenia z gniazdem na `curl` do `/api/health/`.

### 251. `ef373b1` — fix: healthcheck on dev too

*2026-10-03 · Z-Grate - W · 10 plików, +20 / −1*

- Dodał w `backend/entrypoint.dev.sh` ten sam mechanizm co w produkcji: `runserver` w tle, oczekiwanie na `/api/health/` i pełny healthcheck przy starcie.
- Dodał healthcheck kontenera backendu oparty o `curl` w `docker-compose.yml`.
- Podmienił pliki ikon aplikacji w `frontend/public/` (favicon, ikony PWA, `apple-touch-icon`, ikony maskowalne) — pliki binarne.

### 252. `043edec` — feat: new icon

*2026-10-03 · Z-Grate - W · 4 pliki, +3 / −2*

- Dodał plik `frontend/public/logo.png` i podmienił `frontend/public/favicon.png` (pliki binarne).
- Poprawił w `frontend/index.html` typ favicony na `image/png` i dodał odnośnik do `favicon.ico`; w `frontend/vite.config.ts` zamienił `favicon.svg` na `favicon.png` w `includeAssets` wtyczki PWA.

### 253. `6164432` — feat: fix n+1 errors

*2026-10-04 · Z-Grate - W · 7 plików, +135 / −63*

- Wydzielił funkcję `build_descendant_maps` (`backend/shifts/assignment_rules.py`), która wczytuje drzewo grup reguł poziomami, i użył jej w listach `ShiftRuleTemplateViewSet` i `ShiftRuleGroupViewSet`; serializery grup korzystają z gotowych map z kontekstu.
- Dodał brakujące `Prefetch`/`select_related` w zapytaniach zmian, stanowisk, przypisań (zastępstwa) i szablonów zmian (`backend/shifts/views.py`).
- Zastąpił zapytania wykonywane w pętlach filtrowaniem w Pythonie na wstępnie wczytanych relacjach: członkowie i organizatorzy działu, publiczna lista działów, zgłoszenia wolontariuszy (`backend/events/serializers.py`, `backend/events/views.py`).
- W ten sam sposób przepisał dobór definicji pól własnych w profilu (`backend/users/serializers.py`, `backend/users/views.py`).

### 254. `b6a35d2` — feat: n+1

*2026-10-04 · Z-Grate - W · 3 pliki, +26 / −13*

- Nadał akcji `schedule_board` działu własne, odchudzone zapytanie z prefetch sal, ich punktów programu i paneli; filtrowanie paneli przeniósł do Pythona (`backend/events/views.py`).
- Dodał `department__event` do `select_related` stanowisk i lokalizacji oraz uporządkowane `Prefetch` działów i lokalizacji ekranów CONOPS (`backend/shifts/views.py`, `backend/shifts/serializers.py`).

### 255. `ab2e62f` — fix: ui fixes

*2026-10-04 · Z-Grate - W · 6 plików, +39 / −2*

- Dodał układ mobilny (do 640 px) w `ShiftAssignerTab.vue`: panel boczny jest ukrywany, a wybór zmiany otwiera okno zaawansowanego przydzielania; w `ShiftBuilderTab.vue` pasek szablonów przestaje być przyklejony.
- Pozwolił na zawijanie tekstu w przyciskach (`BaseButton.vue`, `frontend/src/styles/admin-shared.css`) i elementów paginacji (`BasePagination.vue`).
- Ustawił biały kolor tekstu jednego z elementów w `frontend/src/pages/DepartmentManagerPage.vue`.

### 256. `b3d748c` — fix: shift templates

*2026-10-04 · Z-Grate - W · 1 plik, +6 / −1*

- Zablokował przycisk zapisu szablonu zmiany, gdy otwarty jest niezapisany formularz stanowiska lub zadania, z podpowiedzią wyjaśniającą powód (`frontend/src/components/admin/ShiftTemplatesTab.vue`).

### 257. `746a48f` — fix: cache for self assign

*2026-10-04 · Z-Grate - W · 1 plik, +7 / −0*

- Dodał w `ShiftPositionSerializer` pamięć podręczną wyniku `_self_assign_reason` w kontekście serializera (klucz: id stanowiska), aby powód braku możliwości samodzielnego zapisu nie był liczony wielokrotnie dla tego samego stanowiska (`backend/shifts/serializers.py`).

### 258. `2f12c2f` — fix: translation

*2026-10-04 · Z-Grate - W · 2 pliki, +4 / −4*

- Zmienił etykietę zakładki notatek z „Moje notatki” na „Notatki prywatne” (EN: „My Notes” → „Private Notes”) w dwóch miejscach plików `frontend/src/i18n/messages/pl.ts` i `en.ts`.

### 259. `da4900b` — fix: cache on unavibility

*2026-10-04 · Z-Grate - W · 2 pliki, +42 / −21*

- Przepisał pola `hours_warnings` i `unavailability_warning` w `ShiftPositionSerializer` tak, aby korzystały z raportu silnika reguł zapisanego w kontekście (pełnego, jeśli już policzono go dla samodzielnego zapisu, albo tylko trzech reguł ostrzegawczych) zamiast osobnych zapytań (`backend/shifts/serializers.py`).
- Zmienił `CapacityRule`, aby liczyła aktywne przypisania z wstępnie wczytanej relacji zamiast dodatkowego zapytania (`backend/shifts/assignment_rules.py`).

### 260. `f48dbb4` — feat: fix problems with long request part 2

*2026-10-04 · Z-Grate - W · 5 plików, +273 / −18*

- Dodał funkcje `build_shift_list_event_bulk` i `derive_shift_list_prefetch` (`backend/shifts/assignment_rules.py`): jedno zbiorcze wczytanie danych użytkownika na stronę listy zmian (kolizje, panele, niedyspozycyjność, godziny) i wycinek bez zapytań dla każdego stanowiska.
- Dodał parametr `prefetch` do `evaluate_assignment` (`backend/shifts/rule_engine.py`) i obsługę danych zbiorczych w regułach ostrzeżeń o niedyspozycyjności, godzinach rozszerzonych i alokacji zespołu.
- Podłączył zbiorcze dane w `ShiftViewSet.list` i w `ShiftPositionSerializer` (`backend/shifts/views.py`, `backend/shifts/serializers.py`).
- Dopisał testy liczby zapytań i zgodności wyników z bezpośrednią oceną reguł (`backend/shifts/tests.py`).

### 261. `59deb63` — feat: enforce team-scoped positions and persist shift tab day selection

*2026-10-06 · Z-Grate - W · 18 plików, +222 / −33*

- Dodał blokującą regułę `team_membership` (`TeamMembershipRule` w `backend/shifts/assignment_rules.py`): na stanowisko przypisane do zespołu można przydzielić tylko członka tego zespołu; reguła obowiązuje też w siatce i w sprawdzaniu uprawnień do kategorii (`backend/shifts/grid.py`, `backend/shifts/views.py`).
- Dodał powód `team_mismatch` przy samodzielnym zapisie wraz z tłumaczeniem „To stanowisko jest zarezerwowane dla członków konkretnego zespołu”.
- Dodał composable `frontend/src/composables/useSelectedDayStorage.ts` zapamiętujący w `localStorage` ostatnio wybrany dzień dla wydarzenia i użył go w zakładkach zmian (siatka, przydzielanie, tablica dyspozytora, niedyspozycyjność, strona zmian).
- Ograniczył dziennik zmian dla osób bez uprawnień administratora wydarzenia do działów, którymi zarządzają, z wymogiem wyboru działu (`ShiftsLogTab.vue`).
- W `ProfileTab.vue` uznał wybór benefitów za zablokowany także po zamknięciu okna wyboru i ukrył pustą listę zespołów; dodał meta `mobile-web-app-capable` w `frontend/index.html`.

### 262. `3a94984` — fix: share selected-day storage across shift tabs

*2026-10-06 · Z-Grate - W · 8 plików, +18 / −12*

- Zmienił `useSelectedDayStorage` na jeden wspólny klucz `shiftSelectedDay:<eventId>`, dzięki czemu dzień wybrany w jednej zakładce zmian przenosi się na pozostałe; usunął argument prefiksu ze wszystkich wywołań.
- Uprościł nazwę członka w `DepartmentUnavailabilityBoard.vue` do samej nazwy użytkownika.
- Uzupełnił dane testowe siatki o członkostwo w zespole wymagane przez regułę `team_membership` (`backend/shifts/tests.py`).

### 263. `81699c2` — feat: add volunteer arrival/departure tracking

*2026-10-06 · Z-Grate - W · 17 plików, +1026 / −21*

- Dodał model `VolunteerArrivalDeparture` (jeden rekord przyjazdu/wyjazdu na wolontariusza i wydarzenie) oraz źródło `arrival_departure` w `UserUnavailability` (`backend/users/models.py`, migracja `0011_volunteer_arrival_departure.py`).
- Dodał serwis `backend/services/arrival_departure.py`, który na podstawie rekordu generuje automatyczną niedyspozycyjność: od początku okna planowania zmian do przyjazdu i od wyjazdu do końca okna.
- Dodał `VolunteerArrivalDepartureViewSet` pod `/volunteer-arrival-departure/` (tworzenie i edycja działają jako upsert; dostęp dla administratora albo samego wolontariusza w otwartym oknie samoobsługi) i wydzielił wspólny `UnavailabilitySelfServicePermissionMixin` (`backend/users/views.py`).
- Dodał komponenty `ArrivalDepartureFields.vue` i `admin/ArrivalDepartureModal.vue` oraz panel „Przyjazd / wyjazd” na stronie zmian wolontariusza, w `VolunteerGridSettingsModal.vue`, tablicy niedyspozycyjności działu i zakładce przeglądu niedyspozycyjności.
- Zarejestrował model w panelu Django (`backend/users/admin.py`) i dopisał klasę testów `VolunteerArrivalDepartureApiTests` (`backend/users/tests.py`).

### 264. `71b8690` — fix: problems with data? Check

*2026-10-09 · Z-Grate - W · 2 pliki, +9 / −1*

- Dodał do `PublicEventSerializer` cztery pola ustawień samodzielnego zgłaszania niedyspozycyjności (`backend/events/serializers.py`).
- Rozszerzył `EventViewSet.get_queryset` dla zalogowanych użytkowników niebędących personelem: oprócz wydarzeń, którymi administrują, widzą też wydarzenia z zaakceptowanym zgłoszeniem oraz aktywne i otwarte na rejestrację (`backend/events/views.py`).

### 265. `5fe26a4` — feat and fix: Fix missing eventid. Add a notice message

*2026-10-09 · Z-Grate - W · 8 plików, +27 / −11*

- Dodał brakujący parametr zapytania `event` do żądań `PATCH`/`DELETE` dla `/user-unavailability/`, `/volunteer-arrival-departure/` i `/custom-field-definitions/` oraz parametr `group` dla `/shift-rules/` (m.in. `ShiftsPage.vue`, `AddUnavailabilityModal.vue`, `ArrivalDepartureModal.vue`, `CustomFieldsTab.vue`, `ShiftRulesTab.vue`).
- Dodał w `AddUnavailabilityModal.vue` komunikat, że niedyspozycyjność jest tylko preferencją, a nie gwarancją (klucz `unavailability.modal.preferenceNotice` w `pl.ts` i `en.ts`).

### 266. `fa56815` — feat: add notice to volunteer facing side too

*2026-10-09 · Z-Grate - W · 1 plik, +12 / −0*

- Dodał ten sam komunikat o preferencji (wraz ze stylem `.notice`) w oknie zgłaszania niedyspozycyjności na stronie zmian wolontariusza (`frontend/src/pages/ShiftsPage.vue`).

### 267. `d1177c8` — fix: invalid styles

*2026-10-09 · Z-Grate - W · 2 pliki, +10 / −12*

- Zamienił w stylu `.notice` zakodowane kolory i rozmiary na zmienne motywu (`--status-warning-bg`, `--status-warning`, `--space-*`, `--radius-sm`, `--font-size-sm`) w `AddUnavailabilityModal.vue` i `ShiftsPage.vue`.

### 268. `ae95e1d` — fix: User visibility for volunteers, schedule view on multi day, shift location optimisation

*2026-10-09 · Z-Grate - W · 6 plików, +79 / −20*

- Przepisał filtr widoczności w `ShiftLocationViewSet.get_queryset` z wielu złączeń i `distinct()` na adnotacje `Exists(...)`, co usuwa mnożenie wierszy przy dużej liczbie zmian i stanowisk (`backend/shifts/views.py`).
- Rozszerzył `OrganizerScopedUserViewSet` tak, aby członków działu widzieli i mogli do nich pisać także dyspozytorzy i operatorzy zmian, nie tylko organizatorzy (`backend/users/views.py`).
- Zmienił filtrowanie zmian wybranego dnia na test nakładania się przedziałów, dzięki czemu zmiana przechodząca przez północ pojawia się w obu dniach (`ShiftAssignerTab.vue`, `ShiftBuilderTab.vue`, `DispatcherBoardTab.vue`, `ShiftsPage.vue`).

### 269. `281f767` — fix: batchinig of volunteer eligibility

*2026-10-09 · Z-Grate - W · 2 pliki, +32 / −14*

- Dodał do akcji `check-eligibility` stanowiska obsługę parametru `users` (wiele identyfikatorów): wyniki dla wszystkich kandydatów liczy `BulkAssignmentEvaluator`, a dostęp mają tylko administratorzy i dyspozytorzy stanowiska (`backend/shifts/views.py`).
- Zmienił `AssignVolunteerModal.vue`, aby pobierał uprawnienia widocznych wolontariuszy jednym żądaniem zamiast osobnego żądania na osobę.

### 270. `1f5632f` — fix: shift notification timezones, hours rounding, operator schedule visibility

*2026-10-09 · Z-Grate - W · 8 plików, +69 / −44*

- Zmienił powiadomienia o przypisaniu, zmianie i przypomnieniu tak, aby czas rozpoczęcia zmiany był podawany w strefie czasowej wydarzenia; szablony e-mail są renderowane w `timezone.override` strefy wydarzenia (`backend/services/templated_notification.py` i serwisy powiadomień o zmianach).
- Dodał funkcję `round_hours` i zaokrąglanie do dwóch miejsc po przecinku wszystkich wartości godzin w ostrzeżeniach (`backend/shifts/hours.py`, `backend/shifts/assignment_rules.py`).
- Sprawił, że operator zmian dowolnego działu widzi na liście wszystkie zmiany wydarzenia, z pamięcią podręczną sprawdzenia per wydarzenie (`_shift_visible_for_non_staff` w `backend/shifts/views.py`).
- Dostosował testy do zaokrąglonych wartości i do kodu 403 (zamiast 404) przy próbie zmiany ustawień wydarzenia przez operatora (`backend/shifts/tests.py`).

### 271. `1a9ca6f` — fix: delete stuff

*2026-10-09 · Z-Grate - W · 1 plik, +7 / −2*

- Zmienił `_can_operate_shift` w `backend/shifts/views.py`: zmianą bez żadnego stanowiska (a więc bez działu-właściciela) może odtąd zarządzać każdy operator zmian dowolnego działu wydarzenia, a nie tylko administrator.
- Dzięki temu operator może np. usunąć pustą, „osieroconą” zmianę; dla zmian ze stanowiskami reguła pozostała bez zmian.

### 272. `146f5d3` — feat(documents): in-app template editor, preview and generation

*2026-10-12 · Z-Grate · 32 pliki, +5765 / −239*

- Dodał `DocumentTemplateViewSet` (`/api/document-templates/`, tylko staff) z CRUD szablonów dokumentów oraz akcjami `merge-fields`, `validate` i `preview` (render niezapisanej treści na danych przykładowych); usunięcie szablonu z wygenerowanymi dokumentami tylko go dezaktywuje (`backend/documents/views.py`, `backend/documents/urls.py`).
- Dodał moduł `backend/documents/validation.py` ze statyczną walidacją treści szablonu: błędne delimitery Jinja, błędy składni, nieznane pola scalane, strukturę LaTeX, mapowanie błędów Tectonic na wiersze szablonu i wykrywanie pól pustych dla danej osoby.
- Dodał `backend/documents/services.py` (`plan_generation`, `ensure_agreement`, `create_generated_document`, `check_bulk_generation`, `bulk_create_generated_documents`) i przeniósł tam logikę z panelu Django (`backend/documents/admin.py`, `backend/documents/bulk.py`).
- Dodał do widoku wygenerowanych dokumentów akcje `preview`, `generate`, `bulk-check`, `bulk-generate` i `statuses` oraz serializery `GenerateDocumentSerializer`, `BulkGenerateDocumentSerializer`, `TemplateDraftSerializer`; podgląd objął limit `document_template_preview` (domyślnie `60/min`, `backend/config/settings.py`).
- Dodał pole `DocumentTemplate.default_output_format` (migracja `0004`) i rozbudował `backend/documents/rendering.py` o katalog pól scalanych (`merge_field_catalogue`) oraz kontekst z danymi przykładowymi (`build_sample_context`).
- Dodał we frontendzie edytor szablonów na CodeMirror (`LatexEditor.vue`, `DocumentTemplatesTab.vue`, `DocumentPreviewPane.vue`, `useDocumentPreview.ts`), zakładkę generowania dla jednej lub wielu osób (`GenerateDocumentTab.vue`, `VolunteerSelector.vue`, `UserSearchInput.vue`) oraz przycisk „generuj dokument dla zaznaczonych” na liście wolontariuszy; zmieniły się `package.json` i `package-lock.json` (pakiety `@codemirror/*`).
- Dodał dokumenty `docs/api-key-auth-and-telegram-usernames.md` i `docs/foxcons-integration.md`, ok. 600 wierszy testów w `backend/documents/tests.py` oraz czyszczenie nieistniejącego już wybranego wydarzenia w `frontend/src/stores/event.ts`.

### 273. `935ab19` — fix(documents): sandbox LaTeX/Pandoc toolchain from app secrets

*2026-10-12 · Z-Grate · 7 plików, +138 / −8*

- Dodał w `backend/Dockerfile.prod` użytkowników `app` i `texrun` oraz regułę sudo, dzięki której aplikacja działa jako `app`, a `tectonic` jako `texrun` bez dostępu do `/proc/<pid>/environ` aplikacji i do `/app/private`.
- Dodał `backend/docker-entrypoint.sh`, który jako root poprawia właściciela podmontowanych katalogów (`media`, `private`, `staticfiles`) i zrzuca uprawnienia do `app`.
- Dodał `minimal_subprocess_env()` w `backend/services/latex.py` — podprocesy Tectonic i Pandoc dostają okrojone środowisko bez sekretów, a przy ustawionym `LATEX_SANDBOX_USER` kompilacja idzie przez `sudo -u`.
- Uruchomił Pandoc z flagą `--sandbox` w `backend/services/document_convert.py`, aby czytnik LaTeX nie podążał za `\input`/`\include` do plików serwera.
- Zmienił w obu plikach compose produkcji ścieżkę wolumenu prywatnego na `/etc/volunteer_hub/django_private` i dodał testy izolacji w `backend/documents/tests.py`.

### 274. `41800ef` — Create dependabot.yml

*2026-10-12 · Z-Grate · 1 plik, +78 / −0*

- Dodał `.github/dependabot.yml` z cotygodniowymi (poniedziałek 06:00, `Europe/Warsaw`) aktualizacjami dla `pip` w `/backend`, `npm` w `/frontend`, obrazów Dockera (`/backend`, `/frontend`, `/docker/backup`, `/docker/nginx`) oraz `docker-compose` w katalogu głównym.
- Skonfigurował grupowanie aktualizacji minor/patch, etykiety (`dependencies`, `backend`/`frontend`/`docker`) i prefiksy commitów `chore(deps)` / `chore(docker)`.

### 275. `2d95929` — feat: column location ordering

*2026-10-12 · Z-Grate · 11 plików, +273 / −20*

- Dodał pole `ShiftLocation.order` i zmienił domyślne sortowanie lokalizacji na `event, order, key, id` (`backend/shifts/models.py`, migracja `0030_shiftlocation_order`).
- Dodał akcję `reorder` w widoku lokalizacji zmian (`backend/shifts/views.py`): przyjmuje `event` i listę id, sprawdza uprawnienia do działów każdej lokalizacji i przestawia tylko przesłany podzbiór w zajmowanych przez niego slotach.
- Dodał w `frontend/src/components/admin/ShiftBuilderTab.vue` przeciąganie nagłówków kolumn lokalizacji z zapisem kolejności, a w `ShiftLocationsTab.vue` sortowanie „jak w kreatorze zmian” jako domyślne.
- Dodał testy akcji `reorder` w `backend/shifts/tests.py` i tłumaczenia.

### 276. `637ead5` — feat: Agreements Group

*2026-10-12 · Z-Grate · 26 plików, +1320 / −57*

- Dodał model `AgreementGroup` (grupa zamiennych umów: nazwa, opis, opcjonalne wydarzenie, `is_active`) oraz relację `Agreement.groups` (`backend/agreements/models.py`, migracja `0010`); szablon dokumentu dostał `DocumentTemplate.agreement_groups` (migracja `0005` w `documents`).
- Dodał `AgreementGroupViewSet` pod `/api/agreement-groups/` — zapis tylko dla staffu, odczyt także dla organizatorów i administratorów wydarzeń — oraz walidację, że grupa jest globalna albo należy do tego samego wydarzenia (`validate_groups_event_scope`).
- Dodał selektory `agreements_in_groups_q` i `group_coverage_by_user` w `backend/core/selectors/agreements.py`: wolontariusza „pokrywa” umowa podpisana i niewygasła albo szkic/oczekująca; jawne grupy umowy mają pierwszeństwo przed grupami szablonu.
- Zmienił generowanie zbiorcze tak, by pomijało osoby pokryte przez grupę szablonu (powód `group_covered`), a nowe umowy dziedziczyły grupy szablonu; pojedyncze generowanie tylko ostrzega (`backend/documents/services.py`, `backend/documents/views.py`).
- Dodał filtr listy umów po grupie i możliwość edycji grup umowy przez uprawnionych (`backend/agreements/views.py`, `backend/agreements/serializers.py`) oraz obsługę grup w panelu Django.
- Dodał we frontendzie `AgreementGroupsDialog.vue`, `AgreementGroupPicker.vue` i `useAgreementGroups.ts` oraz kolumnę, filtr i edycję grup w `DocumentsTab.vue`, `DocumentTemplatesTab.vue` i `GenerateDocumentTab.vue`.

### 277. `ac5c9d3` — feat: show what people doenst have agreements

*2026-10-13 · Z-Grate · 8 plików, +780 / −12*

- Dodał akcję `coverage` w `AgreementGroupViewSet` (`backend/agreements/views.py`): dla wydarzenia i grupy umów lub szablonu zwraca wolontariuszy ze statusem „podpisana / oczekuje / brak”, z podsumowaniem, wyszukiwaniem, filtrem działu i statusu oraz stronicowaniem.
- Dodał selektory `event_volunteers` (uczestnicy wydarzenia plus członkowie jego działów) i `template_coverage_by_user` w `backend/core/selectors/agreements.py`.
- Dodał zakładkę „Pokrycie zgód” (`frontend/src/components/admin/AgreementCoverageTab.vue`) w `DocumentsTab.vue` z zaznaczaniem wolontariuszy (strona lub wszyscy pasujący) i przejściem do generowania dokumentów.
- Dodał testy `AgreementCoverageApiTests` i tłumaczenia.

### 278. `ddf4b7b` — feat(agreements): delete unsigned agreements, flag missing volunteer data

*2026-10-13 · Z-Grate · 15 plików, +884 / −32*

- Dodał `delete_unsigned_agreement` i `deletion_blocker` w `backend/agreements/services.py`: usunąć można tylko umowę w statusie szkic/oczekująca/odrzucona, której nie podpisał żaden sygnatariusz; wraz z nią znikają wygenerowane dokumenty, wersje i pliki (po zatwierdzeniu transakcji).
- Ograniczył `destroy` umowy do staffu i dodał akcję `bulk_delete` raportującą usunięte i pominięte pozycje; serializer zwraca flagę `can_delete`, a panel Django usuwa przez tę samą usługę.
- Zablokował bezpośrednią edycję umowy przez wolontariuszy i współsygnatariuszy oraz zapisywanie grup przez osoby nieuprawnione (`backend/agreements/views.py`).
- Dodał `backend/documents/readiness.py` (`FieldRequirements`), który z szablonów wyznacza pola wolontariusza drukowane w dokumencie i wskazuje puste; akcja `coverage` zwraca brakujące dane, filtr po kompletności i listę sprawdzonych szablonów.
- Dodał w `AgreementCoverageTab.vue` kolumnę i filtr „Brakujące dane”, a w `DocumentsTab.vue` usuwanie pojedyncze i zbiorcze niepodpisanych umów.
- Poprawił akcję `reorder` lokalizacji zmian, by odrzucała nieliczbowe `event` kodem 400 (`backend/shifts/views.py`).

### 279. `6c323f5` — feat: set helper modal

*2026-10-13 · Z-Grate · 8 plików, +1961 / −5*

- Dodał w widoku wydarzeń akcje `foxcons-accounts` (lista wolontariuszy zestawiona z ich bieżącym członkostwem w wydarzeniu Foxcons), `foxcons-accounts/set-type`, `foxcons-accounts/promote-members-to-helper` i odpytywanie postępu zadania (`backend/events/views.py`).
- Dodał w `backend/services/foxcons.py` funkcje `build_foxcons_account_rows`, `set_foxcons_member_account_type`, `bulk_set_foxcons_account_type` oraz zadania w tle z postępem trzymanym w cache (`create_account_type_job`, `run_account_type_job`).
- Dodał zadanie Celery `set_foxcons_account_type_task` w nowym pliku `backend/events/tasks.py`.
- Zabezpieczył zmianę typu: ustawiać można tylko dozwolone typy, a kont o typach chronionych (np. admin, organizator) panel nie nadpisuje.
- Dodał zakładkę „Konto Foxcons” (`frontend/src/components/admin/EventSettingsFoxconsAccountsTab.vue`) w ustawieniach wydarzenia: tabela z filtrami i wyborem kolumn, zmiana typu pojedyncza i zbiorcza, przycisk „ustaw wszystkich uczestników jako helperów” i pasek postępu.
- Dodał testy `EventFoxconsAccountsTests` w `backend/events/tests.py`.

### 280. `927d5d5` — fix: some permission and visibility issues

*2026-10-13 · Z-Grate · 6 plików, +89 / −52*

- Zmienił odczyt typu konta Foxcons: bierze go z pola `power` (z `accountType` jako nazwą zastępczą) i normalizuje pisownię do `Member`/`Helper`/`Coordinator`/`Other` przez `normalize_foxcons_account_type` (`backend/services/foxcons.py`).
- Zmienił wysyłkę do Foxcons tak, by `newPermission` szło małymi literami.
- Dodał kontrolę tuż przed zapisem na żywych danych: osoba, której bieżący typ nie jest ustawialny (`Other`), jest pomijana, nawet jeśli zmieniła typ po załadowaniu panelu.
- Usunął z zakładki i tłumaczeń osobną kolumnę uprawnień oraz własne etykiety typów kont (`EventSettingsFoxconsAccountsTab.vue`, `en.ts`, `pl.ts`).

### 281. `2eeba90` — feat: also set other people back to member

*2026-10-13 · Z-Grate · 6 plików, +653 / −133*

- Rozszerzył `build_foxcons_account_rows` o członków wydarzenia Foxcons, którzy nie są wolontariuszami w systemie, i dodał filtr źródła (wolontariusze / tylko Foxcons / wszyscy).
- Zmienił `foxcons-accounts/set-type`, by oprócz `user_ids` przyjmował `foxcons_ids`; zbiorcza zmiana operuje na „celach” (`volunteer_account_target`, `foxcons_member_account_target`), więc obejmuje też osoby spoza systemu.
- Zadanie w tle ponownie odczytuje ID Foxcons wolontariusza przed zapisem, a brak członkostwa zgłasza bez wysyłania żądania PUT.
- Dodał w `EventSettingsFoxconsAccountsTab.vue` okno „Ustaw dowolną osobę w Foxcons…” z wyszukiwaniem wśród wszystkich członków wydarzenia i ustawianiem typu `Helper` lub `Member`.
- Zaktualizował testy w `backend/events/tests.py`.

### 282. `32521a3` — feat: filtering on bulk agreements

*2026-10-14 · Z-Grate · 5 plików, +400 / −4*

- Rozszerzył akcję `coverage` o pola niestandardowe wydarzenia: zwraca ich listę, wybrane kolumny z wartościami z `custom_data`, filtry (puste / wypełnione / zawiera / wartość logiczna) i sortowanie z pustymi na końcu (`backend/agreements/views.py`).
- Dodał w `AgreementCoverageTab.vue` wybór kolumn pól niestandardowych z oznaczeniem pól wrażliwych oraz filtry w tych kolumnach.
- Dodał cztery testy pól niestandardowych w `backend/agreements/tests.py`.

### 283. `9bd9388` — feat: fix issues

*2026-10-16 · Z-Grate · 10 plików, +420 / −28*

- Dodał moduł `backend/shifts/blockers.py` z „twardymi” blokadami grafiku: przypisane zmiany wolontariusza (dowolny dział) i prowadzone przez niego panele z programu Foxcons (`schedule_blockers_for`).
- Dołączył te blokady do danych siatki planowania (`_load_grid_payload` w `backend/shifts/views.py`), bez dublowania własnych komórek siatki; w siatce samoobsługowej wolontariusz widzi tylko swoje.
- Dodał `Event.user_can_plan_for` (`backend/events/models.py`) i pozwolił organizatorom, dyspozytorom i operatorom zmian działu odczytywać — bez edycji — niedyspozycyjność członków własnego działu (`backend/users/views.py`).
- Dodał w `ContinuousPlanningGridTab.vue` znacznik „zajęty gdzie indziej” z legendą, a w `GridIneligibilityModal.vue` listę powodów zajętości.
- Dodał testy `ShiftGridExternalBlockersTests` oraz test niedyspozycyjności przechodzącej z poprzednich dni.

### 284. `103cdd1` — feat: searchable my agreements

*2026-10-16 · Z-Grate · 5 plików, +183 / −12*

- Dodał parametr `search` do akcji `mine` (`backend/agreements/views.py`): każde słowo musi pasować do ID, typu umowy lub danych sygnatariusza, a dane osobowe właściciela są przeszukiwane tylko tam, gdzie pytający ma do nich dostęp.
- Dodał w `frontend/src/pages/MyAgreementsPage.vue` pole wyszukiwania po stronie serwera, wyświetlanie ID umowy i komunikat o braku wyników.
- Dodał testy `AgreementMineSearchTests`, w tym brak wycieku danych właściciela do zwykłego sygnatariusza.

### 285. `6481249` — feat: agreement rejection and sending back

*2026-10-16 · Z-Grate · 15 plików, +702 / −30*

- Dodał do `AgreementSigner` pola `returned_at`, `returned_reason` i `returned_by` (migracja `0011`).
- Dodał `return_to_previous_signer` w `backend/agreements/services.py`: odesłanie umowy cofa podpisy i przesłane pliki poprzedniego szczebla sygnatariuszy oraz przywraca `scan_file` do najnowszej ocalałej wersji; ponowne podpisanie czyści oznaczenie odesłania.
- Rozszerzył akcję odrzucenia przez sygnatariusza o tryb `discard` (odrzucenie całej umowy) lub `return` (odesłanie do poprzedniego sygnatariusza); brak poprzedniego sygnatariusza daje 400.
- Dodał e-mail „umowa odesłana do poprawy” (`agreement_signature_returned_email_*.txt`) i uzupełnił e-mail o odrzuceniu o osobę odrzucającą i powód (`backend/services/agreement_signature_email.py`).
- Zastąpił w `MyAgreementsPage.vue` systemowy prompt oknem odrzucenia z polem powodu i dwoma przyciskami, dodał baner „odesłane do Ciebie” oraz nowy typ powiadomienia w `EventSettingsNotificationsTab.vue`.

### 286. `f7375c8` — feat: clone shifts, department membership rule

*2026-10-17 · Z-Grate · 15 plików, +1284 / −196*

- Dodał akcję `clone` zmiany (`backend/shifts/views.py`): kopiuje stanowiska i zadania na nowy początek i lokalizację, opcjonalnie przypisuje tych samych wolontariuszy; tryb `dry_run` zwraca raporty kwalifikacji bez zapisu, a nierozstrzygnięta blokada wycofuje całość z kodem 400.
- Wydzielił pomocnicze `_copy_positions_and_tasks_to_shift` i `_create_assignment_locked`; zmian pochodzących z siatki nie da się klonować.
- Dodał regułę przypisań `department_membership` (`DepartmentMembershipRule` w `backend/shifts/assignment_rules.py`): na stanowisko działu można przypisać tylko jego członka, chyba że administrator jawnie to nadpisze.
- Dodał `UserContactSerializer` (`backend/users/serializers.py`) i użył go dla kontaktu przypisanego wolontariusza zamiast pełnego `UserSerializer`; serializer zmiany zwraca też pole `origin`.
- Dodał `CloneShiftModal.vue` z dwuetapowym przeglądem wolontariuszy i wydzielił `AssignmentEligibilityDetails.vue` z `AssignVolunteerModal.vue`.
- Dodał testy `DepartmentMembershipRuleTests` i `ShiftCloneApiTests`.

### 287. `af917cb` — fix: ignore graphify

*2026-10-17 · Z-Grate · 1 plik, +2 / −1*

- Dodał katalog `graphify-out/` do `.gitignore` (i brakujący znak końca wiersza po `skills-lock.json`).

### 288. `e26456d` — feat: department-restricted info hub pages

*2026-10-17 · Z-Grate · 9 plików, +251 / −33*

- Dodał pole `InformationHubPage.department` (`on_delete=RESTRICT`, migracja `0033`): strona Centrum informacji z ustawionym działem jest czytelna tylko dla jego członków; `clean` wymaga działu z tego samego wydarzenia.
- Dodał `InformationHubPage.visible_q` i zastosował go w listach stron i załączników oraz w rozwiązywaniu strony; administratorzy wydarzenia nadal widzą wszystko (`backend/events/views.py`).
- Dołączył identyfikatory działów użytkownika do klucza cache Centrum informacji, a strona startowa (`home_slug`) pomija strony niewidoczne dla danej osoby (`backend/events/serializers.py`).
- Usunięcie działu używanego przez strony Centrum informacji zwraca teraz 400 z komunikatem zamiast błędu.
- Dodał w `InfoHubTab.vue` wybór „Widoczne dla” (wszyscy wolontariusze lub dział) oraz siedem testów w `backend/events/tests.py`.

### 289. `747efe5` — feat: rules for leaders, coords and orga

*2026-10-17 · Z-Grate · 5 plików, +98 / −6*

- Rozszerzył regułę członkostwa w `backend/shifts/rules.py` o flagi `is_leader`, `is_coordinator`, `is_organiser`: zaznaczone role łączą się alternatywą, a brak zaznaczenia oznacza dowolne członkostwo.
- Dla działu rola jest sprawdzana na `DepartmentMembership.position`, dla zespołu na `DepartmentMembershipTeamAssignment.position`; wartości niebędące typu bool są odrzucane w walidacji.
- Dodał pola wyboru ról w `frontend/src/components/admin/ShiftRulesTab.vue` oraz trzy testy.

### 290. `37abbe8` — feat: Telegram dispatch requests

*2026-10-18 · Z-Grate · 37 plików, +4666 / −59*

- Dodał aplikację `backend/dispatch_requests` z modelami `DispatchBot` (bot Telegrama dla wydarzenia: token, dyspozytorzy, zmiany pomocników, gotowe zadania, dźwięk powiadomienia), `DispatchBotChat` (stan rozmowy, blokada), `DispatchRequest` (zgłoszenie: tytuł, lokalizacja, liczba osób, tryb czasu, status, przypisani) i `DispatchRequestEntry` (oś czasu).
- Dodał w `bot.py` maszynę stanów rozmowy: zbieranie zgłoszenia krok po kroku, parsowanie czasu („asap”, „15:00”, „do 15:00”), formularz Mini App, odmowę dla kont niepowiązanych i kierowanie późniejszych wiadomości do właściwego zgłoszenia.
- Dodał endpointy `/api/dispatch-bots/` (CRUD dla administratorów wydarzenia, `sound`, `set-webhook`, `info`, `chats`, `unblock`), `/api/dispatch-requests/` (`assign`, `unassign`, `resolve`, `deny`, `message`, `note`, `block-requester`, `candidates`), `/api/my-dispatch-requests/` (`message`, `finish`) oraz webhook `dispatch-bots/<pk>/webhook/` uwierzytelniany sekretem bota.
- Dodał `ShiftTask.dispatch_request` (migracja `0031`) i `dispatch_requests/tasks.py`, które tworzą i zamykają lustrzane zadania zmian dla przypisanych osób będących akurat na zmianie; zwykłe endpointy zadań odmawiają edycji takich zadań.
- Rozszerzył polecenie `poll_telegram_updates` o odpytywanie botów zgłoszeń (własny offset i znacznik `last_polled_at`) oraz `backend/services/telegram.py` o `bot_api_call`.
- Dodał we frontendzie strony `DispatchRequestsPage.vue` (ekran dyspozytora zgłoszeń, trasa `/dispatch-requests`) i `TelegramDispatchFormPage.vue` (`/tg/dispatch-form`), zakładkę `DispatchBotsTab.vue`, kartę `LiveDispatchTaskCard.vue` na stronie LIVE oraz uprawnienie `canAccessDispatchBots` w `stores/auth.ts`.
- Dodał ok. 500 wierszy testów w `backend/dispatch_requests/tests.py` i wpis `.playwright-mcp/` w `.gitignore`.

### 291. `d32d8ce` — fix: no frontend url in telegram pooler

*2026-10-18 · Z-Grate · 2 pliki, +2 / −0*

- Dodał zmienną `FRONTEND_URL` (domyślnie `http://localhost`) do środowiska usługi `telegram-poller` w `docker-compose.prod.yml` i `docker-compose.prod-runner.yml` — pozostałe usługi backendu już ją miały.
- Bez niej bot zgłoszeń uruchomiony w trybie odpytywania nie mógł zbudować adresu formularza Mini App (`webapp_url` w `backend/dispatch_requests/bot.py` wymaga adresu frontendu po HTTPS).

### 292. `5291786` — feat: fix webapp

*2026-10-18 · Z-Grate · 3 pliki, +47 / −24*

- Zmienił w `frontend/src/pages/TelegramDispatchFormPage.vue` wykrywanie Telegrama: zamiast pustego przy klawiaturze odpowiedzi `initData` sprawdza `platform`.
- Zastąpił przycisk `MainButton` Telegrama własnymi przyciskami „Anuluj” i „Wyślij” na dole formularza.
- Dodał opcję „Inne” w wyborze gotowego zadania i lokalizacji oraz odpowiednie tłumaczenia.

### 293. `74cb5ac` — feat: scrolling the chat

*2026-10-18 · Z-Grate · 1 plik, +14 / −2*

- Ograniczył wysokość listy wpisów zgłoszenia do `50vh` z przewijaniem w `frontend/src/pages/DispatchRequestsPage.vue`.
- Dodał automatyczne przewijanie czatu do najnowszego wpisu po nadejściu wiadomości lub otwarciu innego zgłoszenia.

### 294. `fc79518` — feat: scope timesheet hours rule to team, section or whole event

*2026-10-20 · Z-Grate · 11 plików, +298 / −84*

- Zmienił w `backend/shifts/hours.py` ostrzeżenie o przekroczeniu godzin z kart czasu: liczy je względem zespołu stanowiska (gdy ma przydział godzin), w przeciwnym razie względem sekcji (działu), a gdy działu nie da się ustalić — całego wydarzenia (`team_allocation_warning`, `location_departments`).
- Stanowisko bez działu dziedziczy sekcję z lokalizacji, jeśli ta ma dokładnie jeden dział.
- Dodał `build_bulk_data` dla tej reguły w `backend/shifts/assignment_rules.py`, aby wynik zbiorczy zgadzał się z liczonym pojedynczo.
- Dodał komunikaty dla zakresu „sekcja” i „całe wydarzenie” we frontendzie (`AssignmentEligibilityDetails.vue`, `ShiftAssignerTab.vue`, `ShiftsPage.vue`, `useReplacementFlow.ts`, `utils/formatHours.ts`).
- Dodał sześć testów zakresów i przypadkowo dołączył plik zrzutu `.playwright-mcp/page-2026-10-18T14-23-19-872Z.yml`.

### 295. `d69c21b` — feat: fix assigments

*2026-10-20 · Z-Grate · 6 plików, +269 / −275*

- Przepisał `backend/shifts/hours.py` na jedno miejsce liczenia godzin: `load_hours_data` ładuje dane dla wielu osób naraz, a `timesheet_usage`, `extended_usage`, `hours_usage`, `hours_warning`, `hours_badge(s)` i `report_hours_warnings` zastąpiły `total_assigned_hours`, `hours_summary`, `bulk_hours_summary` i `hours_warnings`.
- Znaczniki „przypisane/zadeklarowane” używają teraz tego samego zakresu (zespół, sekcja, wydarzenie) co ostrzeżenia.
- Dodał zbiorcze ładowanie niedyspozycyjności (`_bulk_unavailability`) i współdzielenie danych portfela godzin między regułami w `backend/shifts/assignment_rules.py`.
- Dostosował wywołania w `backend/shifts/serializers.py`, `backend/shifts/views.py` i `backend/users/views.py`; dodał m.in. test stałej liczby zapytań dla listy kandydatów.

### 296. `a4e7b83` — feat: fix problem with notes hours

*2026-10-21 · Z-Grate · 2 pliki, +18 / −8*

- Poprawił w `frontend/src/components/admin/ContinuousPlanningGridTab.vue` strefę czasową formularzy wymagań i adnotacji siatki: wartości z pól `datetime-local` są wysyłane jako chwile ISO (`localInputToIso`), a wczytywane przeliczane na czas lokalny zamiast obcinania napisu.
- Dodał do `.gitignore` katalog `.artifacts/` i jego pliki lokalne.

### 297. `8f59888` — fix: collisions problems

*2026-10-23 · Z-Grate · 6 plików, +69 / −33*

- Dodał w `backend/shifts/models.py` pomocnicze `_overlaps_by_minute` i `_overlap_by_minute_q` i ujednolicił wszystkie sprawdzenia nakładania się (kolizje zmian, panele, niedyspozycyjność, blokady) do dokładności minuty.
- Dzięki temu „zabłąkane” sekundy w danych nie powodują fałszywej kolizji niedyspozycyjności ze zmianą (`backend/shifts/assignment_rules.py`, `backend/shifts/blockers.py`, `backend/users/views.py`).
- Zastosował to samo zaokrąglanie do minuty w komórkach `ContinuousPlanningGridTab.vue` i dodał dwa testy w `backend/users/tests.py`.

### 298. `2bbc6db` — fix: visibility

*2026-10-23 · Z-Grate · 5 plików, +48 / −37*

- Przeniósł `slotInRange` do `frontend/src/utils/shiftTimeline.ts` i zmienił je tak, by zakres zaznaczał komórkę przy dowolnym nakładaniu się (np. niedyspozycyjność od 16:25 blokuje komórkę 16:00–16:30), zgodnie z backendem.
- Użył tej funkcji w `ContinuousPlanningGridTab.vue` i `VolunteerShiftGridTab.vue`.
- Rozszerzył narzędzie informacji w siatce planowania: okno szczegółów pokazuje także zmiany w innych działach i prowadzone panele, również gdy komórka nie ma niedyspozycyjności.

### 299. `d045a71` — feat: Volunteer agreemnts panel info

*2026-10-23 · Z-Grate · 12 plików, +169 / −1*

- Dodał pole `Event.volunteer_agreement_group` (migracja `0034`) z walidacją, że grupa jest globalna lub należy do tego wydarzenia (`backend/events/models.py`, `backend/events/serializers.py`).
- Dodał do serializera użytkownika pole `has_volunteer_agreement` — `None`, gdy wydarzenie nie ma ustawionej grupy (`backend/users/serializers.py`).
- Dodał wybór grupy w `EventSettingsGeneralTab.vue` oraz punkt „Podpisano porozumienie wolontariackie” na liście kontrolnej profilu (`frontend/src/pages/ProfileTab.vue`).
- Dodał testy `VolunteerAgreementGroupTests`.

### 300. `44e2b7f` — Merge branch 'production'

*2026-10-24 · Z-Grate · 31 plików, +769 / −336*

- Scalił gałąź `production` z gałęzią zawierającą zgłoszenia przez Telegram (commity 290–293).
- Wniósł sześć commitów z `production`: zakres godzin z kart czasu (`fc79518`), przebudowę liczenia godzin (`d69c21b`), poprawkę stref czasowych w siatce (`a4e7b83`), kolizje z dokładnością do minuty (`8f59888`), widoczność blokad (`2bbc6db`) i grupę porozumienia wolontariackiego (`d045a71`).
- Rozwiązał konflikt w `.gitignore` (odnotowany w treści commita).

### 301. `6fd2e29` — feat: show shift times in the event timezone

*2026-10-24 · Z-Grate · 40 plików, +926 / −874*

- Dodał `frontend/src/utils/eventTime.ts` — zestaw funkcji bez zależności do pracy w strefie czasowej wydarzenia (`wallTimeInTz`, `zonedWallTimeToInstant`, `dayBoundsInTz`, `fromDatetimeLocalValue`, `fmtTime`, `fmtDateTime` i inne) z obsługą zmiany czasu.
- Dodał `eventTimeZone` do `stores/event.ts` (domyślnie `Europe/Warsaw`) i przepisał ok. 30 komponentów i widoków (m.in. `ShiftsPage.vue`, `ShiftBuilderTab.vue`, `ContinuousPlanningGridTab.vue`, `DispatcherBoardTab.vue`, `LivePage.vue`, `ConopsScreenPage.vue`), by czasy zmian pokazywały i edytowały w strefie wydarzenia, a nie urządzenia.
- Wydzielił wspólny `useArrivalDeparture.ts` z `VolunteerGridSettingsModal.vue` i `ArrivalDepartureModal.vue`.
- Poprawił w backendzie porównania dat okna planowania i granic godzin zadeklarowanych, by liczyły dni w strefie wydarzenia (`backend/shifts/models.py`, `backend/shifts/serializers.py`, `backend/benefits/models.py`); ekran CONOPS dostaje `timezone` wydarzenia.
- Dodał testy jednostkowe `frontend/tests/eventTime.test.ts` i skrypt `test:unit` w `package.json`; w `backend/users/serializers.py` wydarzenie z kontekstu jest ładowane raz (`_context_event`).

### 302. `ba96a33` — feat: live dispatcher requests

*2026-10-25 · Z-Grate · 14 plików, +946 / −208*

- Dodał relację `DispatchBot.live_dispatchers` (migracja `0002`) i akcję `live` (POST/DELETE) — dyspozytor może przypiąć jeden bot do swojej strony LIVE; wybór nowego odpina poprzedni.
- Nowe zgłoszenie wysyła powiadomienie dyspozytorom „na live”, z pominięciem osób, które straciły dostęp do bota (`backend/dispatch_requests/bot.py`).
- Przeniósł `dispatchable_bots` i `dispatcher_feature_on` z widoków do `backend/dispatch_requests/models.py`; serializer bota zwraca `is_live_for_me`.
- Wydzielił stan ekranu dyspozytora do `frontend/src/composables/useDispatchRequests.ts` (wspólne odpytywanie co 10 s) i dodał `LiveDispatchBotPanel.vue` — obsługę zgłoszeń z telefonu na stronie LIVE.
- Dodał w `DispatcherPage.vue` przyciski „Przypisz do live” / „Usuń z live” i zakładkę zgłoszeń w `LivePage.vue`.

### 303. `ae19fa7` — feat: full-screen LIVE dispatcher chat, phone overflow fixes

*2026-10-25 · Z-Grate · 12 plików, +594 / −77*

- Dodał w `LiveDispatchBotPanel.vue` pełnoekranowy czat zgłoszenia (teleportowany poza `#app`) z pułapką fokusu, blokadą przewijania tła, szybszym odpytywaniem rozmowy i znacznikiem „Nowe wiadomości”.
- Zabezpieczył `useDispatchRequests.ts` przed nadpisaniem nowszych danych przez spóźnioną odpowiedź odpytywania; nieudane wysłanie zachowuje wpisany tekst.
- Poprawił poziome przepełnienia na telefonach: `overflow-x: clip` w `style.css`, pasek górny LIVE, lista członków w `MyDepartmentsTab.vue`, zagnieżdżone panele i przycisk logowania Telegrama w `ProfileTab.vue`.
- Dodał `interactive-widget=resizes-content` do meta `viewport` w `frontend/index.html`.
- Dodał testy e2e `frontend/e2e/live-chat.spec.ts` i nowe przypadki w `responsive.spec.ts`.

### 304. `99ace73` — feat: files in dispatcher chat, request claiming

*2026-10-26 · Z-Grate · 19 plików, +912 / −80*

- Dodał do `DispatchRequestEntry` pola `file`, `file_name`, `mime_type`, `telegram_file_id` i `file_state` (migracja `0004`) oraz pole `DispatchRequest.claimed_by` (migracja `0003`).
- Dodał odbiór plików i albumów z Telegrama (`_media` w `bot.py`) z pobieraniem w zadaniu Celery `download_dispatch_file`; pliki powyżej 20 MB nie są pobierane.
- Akcje `message` i `note` przyjmują załącznik (multipart); wysyłka do zgłaszającego idzie przez Bot API, a odrzucone zdjęcie jest ponawiane jako dokument (`backend/services/telegram.py`).
- Dodał akcje `claim` i `release` z blokadą wiersza: przejęte zgłoszenie może zamknąć tylko przejmujący, a administrator wydarzenia może je zwolnić.
- Zarejestrował pliki zgłoszeń w `backend/agreements/auth.py` — dostęp mają osoby obsługujące bota i przypisani do zgłoszenia.
- Dodał komponenty `DispatchEntryFile.vue` i `DispatchFileAttach.vue`, przełącznik „Pokaż przejęte przez innych” oraz testy `ChatFileTests`.

### 305. `9112aa1` — fix: wrong telegram poller

*2026-10-27 · Z-Grate · 6 plików, +53 / −7*

- Dodał do usługi `telegram-poller` (polecenie `poll_telegram_updates`) w trzech plikach compose zmienne `CELERY_BROKER_URL`, `CELERY_RESULT_BACKEND`, `CACHE_URL` i zależność od `redis`, aby mogła kolejkować zadania.
- Dodał `_enqueue_download` w `backend/dispatch_requests/bot.py`: gdy broker jest niedostępny, plik pobierany jest od razu w procesie.
- Zgłaszający dostaje teraz komunikat, gdy plik jest za duży albo nie udało się go odebrać; zadanie `download_dispatch_file` ma `ignore_result=True`.

### 306. `79fa5e9` — feat : Squashed migration

*2026-10-27 · Z-Grate · 1 plik, +249 / −0*

- Dodał migrację `backend/dispatch_requests/migrations/0001_squashed_0004_dispatchrequestentry_file.py`, która zastępuje (`replaces`) migracje `0001`–`0004` aplikacji `dispatch_requests`.
- Pierwotnych plików migracji nie usunął — commit zawiera tylko nowy plik.

### 307. `033f971` — feat: generate agreements signed on the recipient's behalf

*2026-10-27 · Z-Grate · 10 plików, +100 / −11*

- Dodał parametr `subject_signs` do generowania pojedynczego i zbiorczego (`backend/documents/serializers.py`, `backend/documents/services.py`): przy `false` dokument dotyczy wolontariusza, ale podpisują go tylko dodatkowi sygnatariusze; wymagany jest wtedy co najmniej jeden.
- Zmienił wysyłkę prośby o podpis: właściciel umowy, który nie jest sygnatariuszem, nie dostaje e-maila (`backend/agreements/services.py`).
- Ograniczył samodzielne wgranie podpisanego skanu przez właściciela do starej ścieżki bez sygnatariuszy (`backend/agreements/views.py`).
- Dodał pole wyboru „Wolontariusz podpisuje ten dokument” w `GenerateDocumentTab.vue` oraz cztery testy.

### 308. `6a90df8` — feat: timed agreements from generation; open only /live in the PWA

*2026-10-27 · Z-Grate · 10 plików, +122 / −10*

- Dodał pole `agreement_expires_on` do generowania pojedynczego i zbiorczego: nowo tworzona umowa wygasa z końcem wskazanego dnia, a data z przeszłości jest odrzucana (`backend/documents/serializers.py`, `backend/documents/services.py`).
- Dodał w `GenerateDocumentTab.vue` opcję „Zgoda terminowa” z polem „Ważna do”.
- Zawęził zakres PWA do `/live` (`scope: '/live'`, `start_url: '/live?source=pwa'` w `frontend/vite.config.ts`), aby inne linki otwierały się w przeglądarce.
- Dodał w `LivePage.vue` przycisk wyjścia zamykający aplikację, gdy otwarto ją z linku, a nie z ikony (`launchedFromIcon` w `utils/pwa.ts`).

### 309. `4be3963` — fix: Zamknij opens the browser; reused drafts drop stale expiry

*2026-10-27 · Z-Grate · 7 plików, +27 / −21*

- Zmienił `ensure_agreement` (`backend/documents/services.py`): ponownie użyty szkic przyjmuje ostatnio wybrany termin, także „bez terminu”, zamiast zachowywać starą datę wygaśnięcia.
- Zastąpił w `LivePage.vue` przycisk zamykania zwykłym linkiem do `/shifts` otwieranym w nowej karcie (poza zakresem PWA trafia do przeglądarki).
- Usunął `launchedFromIcon` z `utils/pwa.ts` i przywrócił `start_url: '/live'` w `vite.config.ts`; dodał test czyszczenia terminu.

### 310. `3c92d4b` — feat: add-to-home-screen banner on /live in the browser

*2026-10-27 · Z-Grate · 4 pliki, +61 / −1*

- Dodał w `frontend/src/utils/pwa.ts` przechwytywanie zdarzenia `beforeinstallprompt` (ref `installPrompt`) i jego czyszczenie po `appinstalled`.
- Dodał w `LivePage.vue` baner „Dodaj LIVE do ekranu głównego” widoczny w przeglądarce: z przyciskiem instalacji tam, gdzie przeglądarka to wspiera, albo ze wskazówką ręczną (osobną dla iOS); odrzucenie nie jest zapamiętywane.

### 311. `3e15c32` — feat: agreement exemptions and Foxcons counter agreement sync

*2026-10-28 · Z-Grate · 22 pliki, +780 / −17*

- Dodał model `AgreementGroupExemption` (migracja `0012`): staff oznacza wolontariusza jako niewymagającego podpisu w danej grupie umów, opcjonalnie do daty `expires_on`.
- Dodał akcję `exemptions` (POST/DELETE, tylko staff) w `AgreementGroupViewSet` i selektor `group_exemptions_by_user`; zwolnienie liczy się jako pokrycie w akcji `coverage` i w polu `has_volunteer_agreement` profilu.
- Dodał `sync_foxcons_agreement_items` w `backend/services/foxcons.py`: przenosi stan umowy każdego wolontariusza na pozycję ręczną w liczniku rejestracji Foxcons, z blokadą przed równoległym uruchomieniem.
- Dodał pole `Event.foxcons_sync_agreement_items` (migracja `0035`; włączenie wymaga ustawionej grupy porozumienia wolontariackiego), zadania Celery `sync_foxcons_agreement_items_task` i `sync_foxcons_agreement_items_event_task` oraz harmonogram co 15 minut (migracja `core/0017`).
- Dodał akcję `resync-foxcons-agreement-items` w widoku wydarzeń, uruchamiającą synchronizację w tle.
- Dodał we frontendzie oznaczanie „Niewymagana” w `AgreementCoverageTab.vue` oraz przełącznik i przycisk synchronizacji w `EventSettingsIntegrationsTab.vue`; dodał testy `FoxconsAgreementItemsSyncTests`.

### 312. `3a1b655` — feat: OIDC audit, sensitive-field masking, throttle-exempt IPs

*2026-10-28 · Z-Grate · 25 plików, +579 / −26*

- Dodał `ClientIPScopedRateThrottle` (`backend/core/throttling.py`): identyfikuje klienta po nagłówku `CF-Connecting-IP` i nie limituje adresów z nowego pola `AppSettings.throttle_exempt_ips` (migracja `core/0018`); podmienił nim `ScopedRateThrottle` w widokach `events` i `users`.
- Dodał walidację listy adresów IP/CIDR w ustawieniach aplikacji; staff widzi też własny `client_ip`, a pozostali nie dostają tej listy (`backend/core/views.py`).
- Dodał wpisy audytu dla logowania OIDC: udane logowanie i odrzucenia z przyciętymi wartościami, bez `code` i `code_verifier`; po przekroczeniu limitu zapisywany jest tylko adres IP (`backend/users/views.py`, `backend/services/oidc.py`, `backend/services/audit_log.py`).
- Ukrył wrażliwe odpowiedzi pól niestandardowych w zgłoszeniach przed osobami spoza staffu innymi niż sam zgłaszający (`backend/events/serializers.py`).
- Dodał komponenty `SecretInput.vue` i `SecretValue.vue` maskujące pola wrażliwe w `ApplicationsTab.vue`, `VolunteersTab.vue`, `VolunteerEditModal.vue` i `ProfileTab.vue`.
- Dodał w `SystemTab.vue` sekcję „Adresy IP bez limitów” i przeniósł stan oczekującego logowania OIDC z `sessionStorage` do `localStorage` (`frontend/src/services/oidc.ts`), zgłaszając backendowi brak tego stanu.

### 313. `58a6e98` — feat: Drag the documents

*2026-10-28 · Z-Grate · 1 plik, +50 / −2*

- Dodał w `frontend/src/pages/MyAgreementsPage.vue` przeciąganie pliku na kartę oczekującej umowy: upuszczenie przygotowuje wgranie skanu na tych samych warunkach, na jakich widoczny jest przycisk wgrywania.
- Karta podświetla się przy przeciąganiu, a upuszczenie poza kartą jest ignorowane, by przeglądarka nie otwierała pliku.

### 314. `97d340b` — feat: registration counter app and offline agreement signing

*2026-10-29 · Z-Grate · 14 plików, +1270 / −4*

- Dodał usługę `sign_offline` i akcję `sign-offline` umowy (tylko staff): wgranie skanu papierowej kopii oznacza wszystkich oczekujących sygnatariuszy jako podpisanych, z pominięciem kolejności; umowy odrzucone lub już podpisane są odrzucane (`backend/agreements/services.py`, `backend/agreements/views.py`).
- Dodał katalog `counter/` z lokalną aplikacją stanowiska rejestracji: `counter.py` (serwer na `127.0.0.1:8765` na bibliotece standardowej, z listą dozwolonych ścieżek API i ochroną przed obcymi żądaniami), `index.html` (interfejs po polsku), `config.example.json`, `README.md` i `test_counter.py`.
- Aplikacja pozwala znaleźć wolontariusza, uzupełnić brakujące dane, wygenerować i wydrukować umowę oraz wgrać podpisany skan (według `counter/README.md`).
- Dodał w `MyAgreementsPage.vue` sprawdzenie czytelności pliku przed wysyłką i osobny komunikat o błędzie sieci; w `NotificationsPage.vue` przeniósł obsługę kliknięcia na wiersz powiadomienia.
- Dodał do `.gitignore` `counter/config.json`, `counter/agreements/` i `counter/counter.exe` oraz pięć testów `sign_offline`.

### 315. `aefe4e1` — feat: counter prints via browser dialog, admin uploads fully signed scans

*2026-10-29 · Z-Grate · 9 plików, +89 / −65*

- Usunął z aplikacji `counter/` drukowanie po stronie systemu i zapis PDF na dysku (opcje `output_dir`, `auto_print`); „Drukuj” otwiera teraz okno drukowania przeglądarki, a PDF można pobrać osobno (`counter/counter.py`, `counter/index.html`, `counter/README.md`).
- Dodał w `frontend/src/components/admin/DocumentsTab.vue` akcję „Wgraj skan podpisany przez wszystkich”, korzystającą z endpointu `sign-offline`.
- Usunął `counter/agreements/` z `.gitignore` i zaktualizował `counter/test_counter.py`.

### 316. `8b7c6bc` — feat: fix unsupported method

*2026-10-30 · Z-Grate · 1 plik, +1 / −1*

- Zmienił blokadę wiersza w akcji zwalniania zgłoszenia dyspozytorskiego (`backend/dispatch_requests/views.py`): `select_for_update()` otrzymało `of=("self",)`, dzięki czemu blokowany jest tylko wiersz `DispatchRequest`, a nie dołączana przez `select_related("claimed_by")` tabela użytkowników.
- Z samego diffu nie wynika, jaki dokładnie błąd („unsupported method”) to wywoływało; zmiana ogranicza się do tej jednej linii.

### 317. `0e26672` — fix: agreement "original" download returns the generated document, uploads keep their real extension

*2026-10-31 · Z-Grate · 20 plików, +291 / −45*

- Zmienił akcję `download-pdf` w `backend/agreements/views.py`: parametr `source=original` pomija wgrany skan i zwraca dokument wygenerowany z szablonu, a wgrane pliki (skan umowy lub konkretna `AgreementVersion`) są oddawane z własnym rozszerzeniem i typem MIME zamiast zawsze jako `.pdf`.
- Dodał pole `agreement_upload_extensions` (`JSONField`, domyślnie `["pdf"]`) do modelu `AppSettings` wraz z migracją `backend/core/migrations/0019_appsettings_agreement_upload_extensions.py`, sekcją w panelu Django (`backend/core/admin.py`) i walidacją w `AppSettingsSerializer` (normalizacja, usuwanie duplikatów, zakaz pustej listy).
- Dodał pole serializera `AgreementScanFileField` (`backend/agreements/serializers.py`), które odrzuca pliki o rozszerzeniu spoza listy, i użył go we wszystkich ścieżkach wgrywania skanów umów; `AgreementSerializer` zyskał pole `has_generated_document`.
- Dodał `CORS_EXPOSE_HEADERS = ["Content-Disposition"]` w `backend/config/settings.py`, aby frontend mógł odczytać nazwę pliku wybraną przez serwer, oraz zmienną `DJANGO_TEST_DB_MODE: postgres` w `.github/workflows/backend-ci.yml`.
- Na frontendzie dodał composable `frontend/src/composables/useAgreementUploadAccept.ts` (atrybut `accept` dla pól wyboru pliku budowany z ustawień) i funkcję `filenameFromDisposition` w `frontend/src/utils/downloadBlob.ts`, zastępując nią lokalne `parseCsvFilenameFromHeaders` w `useAdminCore.ts`.
- Dodał w `frontend/src/components/admin/SystemTab.vue` pole tekstowe do edycji dozwolonych rozszerzeń; `MyAgreementsPage.vue`, `DocumentPreviewDialog.vue`, `DocumentsTab.vue` i `VolunteerEditModal.vue` pobierają teraz pliki przez `download-pdf` z nazwą z nagłówka i ograniczają wybór plików do dozwolonych typów.
- Dopisał testy odrzucania niedozwolonego rozszerzenia, zachowania rozszerzenia skanu przy pobieraniu oraz normalizacji ustawienia (`backend/agreements/tests.py`, `backend/core/tests.py`).

### 318. `46d9a95` — fix: dispatcher "Zwolnij" available to event admins, refused on closed requests

*2026-10-31 · Z-Grate · 8 plików, +29 / −14*

- Dodał funkcję `may_release(request, user)` w `backend/dispatch_requests/models.py` — zgłoszenie może zwolnić dyspozytor, który je przejął, albo administrator wydarzenia — i użył jej zarówno w widoku, jak i w serializerze.
- Dodał do `DispatchRequestDetailSerializer` pole `can_release` (prawdziwe tylko dla otwartego, przejętego zgłoszenia).
- Zmienił akcję zwalniania w `backend/dispatch_requests/views.py`: po zablokowaniu wiersza wywołuje `_require_open`, więc zamkniętego zgłoszenia nie da się już zwolnić.
- Na frontendzie (`LiveDispatchBotPanel.vue`, `DispatchRequestsPage.vue`) przycisk „Zwolnij” zależy teraz od `detail.can_release` zamiast od usuniętego `claimedByMe`, dzięki czemu widzi go także administrator wydarzenia obok plakietki „przejęte przez”.
- Dodał test `test_release_refused_on_closed_request`.

### 319. `bc5d060` — fix(my-agreements): center upload confirm, filter pending by whose turn, paginate completed

*2026-11-01 · Z-Grate · 3 pliki, +65 / −55*

- Przeniósł okno potwierdzenia wgrania pliku na stronie `frontend/src/pages/MyAgreementsPage.vue` z własnego znacznika `.confirm-modal-backdrop` do komponentu `BaseModal` (teleportowanego), co według opisu commita naprawiło jego pozycjonowanie w środku strony; usunął związane z tym style.
- Dodał dwa przełączniki filtrujące oczekujące umowy: „czekają na mnie” i „czekają na innych” (funkcja `waitsForMe` sprawdza przepływ akceptacji, wgrywania lub kolej podpisującego).
- Dodał stronicowanie tabeli zakończonych umów po 25 pozycji (`BasePagination`), z resetem strony przy zmianie filtrów i zabezpieczeniem przed pustą stroną.
- Dodał dwa klucze tłumaczeń filtrów w `frontend/src/i18n/messages/pl.ts` i `en.ts`.

### 320. `ff32d85` — feat(audit): cover all apps, nightly retention sweep, session/magic-link login events

*2026-11-01 · Z-Grate · 17 plików, +320 / −88*

- Rozszerzył automatyczny audyt modeli w `backend/core/signals.py` o aplikacje `shifts`, `dispatch_requests`, `notes`, `telegram_events`, `documents`, `notifications` i `foxcons_schedule`, z listą wykluczonych modeli o dużej rotacji (`EXCLUDED_MODEL_NAMES`) oraz wyszukiwaniem powiązanego wydarzenia po ścieżkach atrybutów (`_EVENT_PATHS`).
- Dodał menedżer kontekstu `suppress_model_audit()` w `backend/core/audit_context.py` i użył go w przebudowach siatki zmian (`backend/shifts/grid.py`); widoki `ShiftGridPaintBatchView` i `ShiftGridRecalculateView` zapisują zamiast tego po jednym wierszu podsumowania.
- Przeniósł czyszczenie starych wpisów z każdego wywołania `audit_log()` i `log_outbound_message()` do codziennego zadania Celery `prune_expired_logs_task` (`backend/core/tasks.py`), a migracja `backend/core/migrations/0020_seed_prune_logs_schedule.py` dodaje jego harmonogram (codziennie o 4:00).
- Zmienił `audit_log()` w `backend/services/audit_log.py`: zapis odbywa się w savepoincie i jego błąd jest tylko logowany, a nieznana akcja jest zapisywana jako `updated` z polem `invalid_action`.
- Dodał audyt logowań sesyjnych (sygnały `user_logged_in` i `user_login_failed`) oraz logowań i odrzuceń przez magic link w `MagicLinkVerifyView` (`backend/users/views.py`).
- Zastąpił operacje masowe zapisami pojedynczych wierszy tam, gdzie pomijały sygnały audytu (`finish_linked_tasks` w `backend/dispatch_requests/tasks.py`, tworzenie członkostw organizatorów w `backend/events/serializers.py`), a dzienny przegląd statusów w `backend/services/lifecycle.py` zapisuje jeden wiersz podsumowania.
- Dodał logowanie błędów zadania `download_dispatch_file` przez `log_worker_failure`, audyt odblokowania czatu bota oraz pominięcie podwójnego wpisu w `AuditedAdminMixin` dla modeli już objętych sygnałami; dopisał testy retencji, audytu siatki i magic linku.

### 321. `4a84a44` — feat(events): access cards synced to Foxcons push-cards

*2026-11-01 · Z-Grate · 13 plików, +665 / −8*

- Dodał model `AccessGroup` (`backend/events/models.py`, migracja `0036_accessgroup.py`): karta dostępu wydarzenia z nazwą, unikalnym w ramach wydarzenia `slug` oraz relacjami wiele-do-wielu do działów, zespołów i wolontariuszy; metoda `member_users()` zwraca połączoną listę osób bez duplikatów.
- Dodał `AccessGroupSerializer` z walidacją przynależności działów, zespołów i wolontariuszy do wydarzenia oraz generowaniem `slug` z nazwy, a także `AccessGroupViewSet` pod `/access-groups/` dostępny tylko dla administratorów wydarzenia, z wpisami audytu.
- Dodał funkcję `push_foxcons_access_cards` w `backend/services/foxcons.py`, która jednym żądaniem POST wysyła do Foxcons (`.../admin/zgredek/push-cards`) wszystkie karty z identyfikatorami Foxcons członków, pomijając puste lub nieliczbowe identyfikatory, oraz akcję `POST /events/{id}/push-foxcons-access-cards/`.
- Dodał zakładkę „karty dostępu” w ustawieniach wydarzenia: nowy komponent `frontend/src/components/admin/EventSettingsAccessCardsTab.vue` (lista, formularz tworzenia i edycji, usuwanie, przycisk synchronizacji) podpięty w `EventSettingsTab.vue`.
- Przeniósł pomocniczą funkcję `apiError` z `AgreementGroupsDialog.vue` do `frontend/src/services/api.ts`.
- Dodał testy uprawnień, walidacji, deduplikacji członków i wysyłki do Foxcons (`backend/events/tests.py`) oraz tłumaczenia.

### 322. `58bca98` — feat(events): download access cards JSON, drop cards on participant removal

*2026-11-02 · Z-Grate · 7 plików, +51 / −5*

- Wydzielił z `push_foxcons_access_cards` funkcję `build_foxcons_access_cards` (`backend/services/foxcons.py`), która zwraca treść żądania i liczniki.
- Dodał akcję `GET /events/{id}/foxcons-access-cards-payload/` (`backend/events/views.py`) zwracającą dokładnie ten JSON, który zostałby wysłany; działa bez konfiguracji Foxcons i tylko dla administratorów wydarzenia.
- Dodał przycisk pobierania pliku JSON w `frontend/src/components/admin/EventSettingsAccessCardsTab.vue`.
- Zmienił `remove_participation` (`backend/services/participation_removal.py`): usunięcie uczestnika z wydarzenia kasuje też jego bezpośrednie przypisania do kart dostępu; dodał test `test_removed_participant_leaves_access_cards`.

### 323. `95b1840` — perf(dispatch): memo permission checks, skip self-assign eval, cache date formatters Dispatcher board load: 9.6 s / 7.4k queries -> 2.3 s / 49 queries on a 320-shift event.

*2026-11-02 · Z-Grate · 5 plików, +144 / −41*

- Dodał w `backend/shifts/serializers.py` pamięć podręczną na czas jednej odpowiedzi (`_memo` oraz `_can_administer`, `_can_dispatch`, `_can_operate`, `_notes_enabled`), tak aby sprawdzenia uprawnień były liczone raz na parę użytkownik–wydarzenie lub użytkownik–dział, a nie dla każdego wiersza.
- Zmienił `ShiftPositionSerializer`: w widoku dyspozytora (`dispatch_view` w kontekście) pomija pola `self_assign_available`, `self_assign_reason`, `hours_warnings` i `unavailability_warning`, których wyliczenie wymagało uruchomienia silnika reguł dla każdego stanowiska.
- Przeniósł filtrowanie stanowisk po `dispatch_position_ids` z widoku (`backend/shifts/views.py`) do `ShiftSerializer`, usuwając zdublowany kod.
- Dodał w `frontend/src/utils/eventTime.ts` pamięć podręczną obiektów `Intl.DateTimeFormat` używaną przez `fmtTime`, `fmtDate` i `fmtDateTime` zamiast `toLocale*String`.
- Dopisał testy w `backend/shifts/tests.py` i `frontend/tests/eventTime.test.ts`; liczby z tytułu (9,6 s → 2,3 s) pochodzą z opisu commita, nie z diffu.

### 324. `1af216b` — fix: error in the code

*2026-11-02 · Z-Grate · 1 plik, +1 / −1*

- Naprawił wywołanie `_position_visible_to` w `_shift_visible_for_non_staff` (`backend/shifts/views.py`), dodając brakujący pierwszy argument `context` (pusty słownik) po zmianie sygnatury tej funkcji w poprzednim commicie.

### 325. `f287a54` — fix(dispatch): unassign bot tasks from dispatcher board, notify volunteer Board unassign drops the volunteer from the dispatch request (row-locked) and sends a notice; bot tasks get a badge and an "Open in dispatch" link, with Complete/Delete hidden.

*2026-11-02 · Z-Grate · 13 plików, +122 / −22*

- Wydzielił funkcję `unassign_user(req, user, by)` w `backend/dispatch_requests/tasks.py`: pod blokadą wiersza zdejmuje wolontariusza ze zgłoszenia, odpina powiązane zadania, przywraca status `NEW`, gdy nikt nie został, i wysyła wolontariuszowi powiadomienie o odwołaniu zadania.
- Zmienił odpinanie zadania w `ShiftTaskViewSet` (`backend/shifts/views.py`): zadanie będące odbiciem zgłoszenia dyspozytorskiego nie jest już odrzucane, lecz zdejmuje wolontariusza z samego zgłoszenia (z odmową dla zamkniętego zgłoszenia).
- Dodał do `ShiftTaskSerializer` pole `dispatch_bot` oraz dociąganie `dispatch_request` w zapytaniach widoków zmian.
- Na tablicy dyspozytora (`DispatchAssignmentActions.vue`, `ManageShiftAssignmentRow.vue`, `DispatchTaskAssignModal.vue`, `DispatchShiftTasksPanel.vue`) zadania pochodzące od bota dostały plakietkę i przycisk otwierający zgłoszenie w nowej karcie, a przyciski zakończenia i usunięcia zostały dla nich ukryte.
- Dodał funkcję `openDispatchRequest` w `frontend/src/types/dispatch.ts` i obsługę parametru `?request=` w `frontend/src/pages/DispatchRequestsPage.vue`, który od razu otwiera wskazane zgłoszenie.
- Dopisał testy `test_shift_task_unassign_drops_volunteer_from_request` i `test_requester_reply_notifies_assignees`.

### 326. `4289c13` — fix(shifts): explicit override ticks for grid team rule and assigner

*2026-11-02 · Z-Grate · 10 plików, +162 / −38*

- Rozszerzył `GridEligibilityError` w `backend/shifts/grid.py` o listę `failures` (wszystkie niespełnione reguły jako `{rule_type, message}`), którą `ShiftGridPaintBatchView` zwraca w odpowiedzi błędu.
- Zmienił `ShiftGridEligibilityView` (`backend/shifts/views.py`): obejmuje teraz także kategorie ograniczone tylko zespołem, a dla niekwalifikujących się osób zwraca `failing_rules` zamiast pojedynczego `message`.
- Przebudował `frontend/src/components/admin/GridIneligibilityModal.vue`: każda złamana reguła, konflikt niedyspozycyjności i każda blokada mają własne pole wyboru, a przycisk „przypisz mimo to” jest aktywny dopiero po zaznaczeniu wszystkich.
- Dodał regułę `team_membership` do `RULE_LABEL_KEYS` w `AssignmentEligibilityDetails.vue` oraz dostosował `ContinuousPlanningGridTab.vue` do nowego formatu (nadpisania per reguła, odświeżenie uprawnień po błędzie zapisu).
- Zmienił `frontend/src/components/admin/ShiftAssignerTab.vue`: upuszczenie niekwalifikującego się wolontariusza otwiera `AssignVolunteerModal` z wybraną osobą (nowy props `initialUser`) zamiast komunikatu błędu, a usunięcie przypisania wymaga potwierdzenia.
- Dodał testy malowania poza zespołem i listy osób spoza zespołu (`backend/shifts/tests.py`) oraz tłumaczenia.

### 327. `172c10b` — feat: a lo of fixes

*2026-11-02 · Z-Grate · 23 pliki, +597 / −373*

- Usunął stary anonimowy endpoint `public/volunteer-application/` wraz z widokiem `PublicVolunteerApplicationCreateView` (`backend/events/views.py`, `backend/events/urls.py`) oraz trasy `accounts/` biblioteki allauth z `backend/config/urls.py` i `docker/nginx/default.conf`; `OAuthProvidersView` przestał zwracać `login_path`.
- Zaostrzył uprawnienia w `backend/users/views.py`: zaawansowane pola masowej wysyłki e-mail (nadawca, CC, BCC, nagłówki) działają tylko dla kont `is_staff`, osoba bez `is_staff` nie może edytować kont `is_staff`, a zmiana adresu e-mail wolontariusza wymaga uprawnień administratora wszystkich wydarzeń, którymi ta osoba administruje.
- Zaostrzył uprawnienia do zmian w `backend/shifts/views.py`: usunięcie, zamknięcie, ponowne otwarcie, sklonowanie i zmiana czasu zmiany wymagają bycia operatorem wszystkich działów na zmianie (`_can_operate_whole_shift`); malowanie siatki sprawdza przynależność kategorii i wolontariusza do działu i blokuje wiersz działu; serializery zabraniają przenoszenia zmiany, stanowiska i zadania między wydarzeniami lub zmianami.
- Przebudował `_rebuild_department_day` w `backend/shifts/grid.py`: niezmienione zmiany z siatki są zachowywane, a odtwarzane przypisania dziedziczą notatkę i stan obecności; przypomnienia planowane są tylko dla początku ciągłego odcinka, a `clear_range` można ograniczyć do działu.
- Rozszerzył anonimizację w `backend/services/gdpr.py` o dane Telegrama i Foxcons oraz kasowanie historii `simple_history` i migawek w `AuditLog`; `has_valid_gdpr_consent` uznaje tylko zgody o statusie `SIGNED`.
- Poprawił odporność powiadomień: link logowania (`magic_link`) nie jest wysyłany jako push, błędny klucz VAPID nie przerywa wysyłki, push ma limit czasu 10 s (`backend/services/web_push.py`, `backend/services/user_notifications.py`), a powiadomienie o zdjęciu z zadania idzie po zatwierdzeniu transakcji.
- Zabezpieczył synchronizację harmonogramu Foxcons przed pustą odpowiedzią (`backend/services/foxcons.py`) oraz sanityzację treści HTML i odnośników w Centrum informacji (`InfoHubTab.vue`, `InformationHubPage.vue`); dopisał obszerne testy w `shifts`, `users`, `events`, `agreements` i `notifications`.

### 328. `fcebe8a` — fix: invalid test

*2026-11-02 · Z-Grate · 1 plik, +1 / −0*

- Dopisał brakującą kategorię `agreement_signature_returned` do oczekiwanej listy w teście `EventNotificationCategoriesTests` (`backend/events/tests.py`).

### 329. `0e7523c` — test: run backend tests in parallel, add --debug flag

*2026-11-02 · Z-Grate · 4 pliki, +40 / −1*

- Zmienił `test.sh`: testy backendu uruchamiane są z `--parallel auto`, a nowe flagi `--debug` / `--no-debug` (zmienna `TEST_DJANGO_DEBUG`) ustawiają `DJANGO_DEBUG` w kontenerze testowym.
- Dodał w `backend/config/settings.py` blok dla trybu testowego: pliki wgrywane w testach trafiają do katalogu tymczasowego (`MEDIA_ROOT`, `PRIVATE_STORAGE_ROOT`), a `SECURE_SSL_REDIRECT` jest wyłączone.
- Dodał zależność `tblib==3.2.2` do `backend/requirements-dev.txt` i opis nowych opcji w `README.md`.

### 330. `78a7b3d` — fix(conops): scope screen keys to data endpoint, harden screen API

*2026-11-02 · Z-Grate · 5 plików, +91 / −25*

- Dodał klasę `ConopsScreenKeyAuthentication` w `backend/users/authentication.py`; zwykłe `ApiKeyAuthentication` odrzuca odtąd klucze ekranów conops, a klucz ekranu działa wyłącznie na endpoincie `data`.
- Zabronił przenoszenia ekranu conops do innego wydarzenia w `ConopsScreenSerializer` (`backend/shifts/serializers.py`).
- Uprościł `ConopsScreenViewSet` (`backend/shifts/views.py`): usunął zdublowane `partial_update`, a aktywność klucza API podąża za `is_active` ekranu, więc ponowna aktywacja ekranu przywraca działanie klucza.
- Zmienił zapytanie danych ekranu tak, aby zakończone zmiany były odfiltrowywane w SQL i nie zajmowały limitu 200 pozycji, oraz `ConopsScreen.matches_position` (`backend/shifts/models.py`), aby korzystało z prefetchu zamiast zapytania na każde stanowisko.
- Dodał sześć testów ekranu conops w `backend/shifts/tests.py`.

### 331. `5c3c79a` — feat(conops): NFC badge check-in via serial scanner

*2026-11-02 · Z-Grate · 20 plików, +684 / −19*

- Dodał do modelu `Event` pola `check_in_opens_minutes_before` (domyślnie 10) i `foxcons_nfc_tag_cache_minutes` (domyślnie 60) wraz z migracją `backend/events/migrations/0037_event_check_in_and_nfc_tag_cache.py`, polami w serializerach i panelu Django.
- Dodał w `backend/services/foxcons.py` funkcję `lookup_foxcons_nfc_tag_user_id` (zapytanie Foxcons o właściciela identyfikatora NFC z buforowanym JWT, krótkim limitem czasu i 30-sekundowym wstrzymaniem po awarii) oraz `clear_foxcons_nfc_tag_cache`.
- Dodał akcję `POST conops-screens/check-in/` (`backend/shifts/views.py`) uwierzytelnianą kluczem ekranu i objętą limitem `conops_check_in`: oznacza obecność właściciela identyfikatora na zmianach tego ekranu, nie nadpisując decyzji dyspozytora, i zapisuje wpis audytu.
- Samodzielny check-in wolontariusza korzysta teraz z ustawienia `check_in_opens_minutes_before` zamiast stałych 5 minut; dodał też akcję `POST /events/{id}/clear-foxcons-nfc-tag-cache/`.
- Dodał composable `frontend/src/composables/useSerialScanner.ts` (Web Serial, czytnik ESP32 wypisujący UID w liniach, pomijanie powtórzeń przez 5 s, automatyczne ponowne łączenie) i obsługę skanów na `frontend/src/pages/ConopsScreenPage.vue`.
- Dodał pola nowych ustawień w `EventSettingsShiftsTab.vue` i `EventSettingsIntegrationsTab.vue` (z przyciskiem czyszczenia pamięci identyfikatorów), tłumaczenia oraz testy wyszukiwania tagów i skanowania (`backend/events/tests.py`, `backend/shifts/tests.py`).

### 332. `144046e` — feat: some info about cards on conops

*2026-11-02 · Z-Grate · 4 pliki, +39 / −7*

- Rozszerzył `frontend/src/composables/useSerialScanner.ts` o drugi callback `onBadRead`, wywoływany, gdy czytnik przysłał coś, co nie jest UID karty; odczyty z pierwszych 2 sekund po otwarciu portu (log startowy ESP32) są ignorowane.
- Dodał diagnostyczne wpisy `console.log` z prefiksem `[nfc-scanner]` (surowe dane, otwarcie i zamknięcie portu, błędy strumienia).
- Zmienił `frontend/src/pages/ConopsScreenPage.vue`: po odczycie karty pokazuje toast „karta odczytana”, a przy błędnym odczycie toast błędu; dodał dwa klucze tłumaczeń.

### 333. `0174a24` — fix: audit log of foxcons badge

*2026-11-02 · Z-Grate · 2 pliki, +23 / −2*

- Dodał w akcji `check_in` ekranu conops (`backend/shifts/views.py`) pomocniczą funkcję `audit_scan`, która zapisuje jeden wpis audytu (`operation: conops_nfc_scan`, UID, wynik) dla każdego skanu, także nieudanego: brak konfiguracji Foxcons, niedostępność Foxcons, nieznany identyfikator, brak zmiany, check-in lub ponowny check-in.
- Uzupełnił testy w `backend/shifts/tests.py` o asercje tych wpisów (4 dodane wiersze).

### 334. `f2fe48f` — fix: audit log real time, some changes to auditing foxcons data

*2026-11-02 · Z-Grate · 7 plików, +44 / −9*

- Dodał funkcję `real_now()` w `backend/core/clock.py`, zwracającą rzeczywisty czas z pominięciem sztucznego zegara aplikacji.
- Zmienił pole `AuditLog.timestamp` z `auto_now_add` na `default=real_now` (migracja `backend/core/migrations/0021_audit_log_real_time.py`), aby wpisy audytu pokazywały faktyczny moment zdarzenia.
- Zmienił `prune_expired_logs_task` (`backend/core/tasks.py`) tak, by próg retencji liczył się od rzeczywistego czasu — sztuczny zegar ustawiony w przyszłość nie skasuje historii.
- Zastąpił `timezone.now()` przez `real_now()` w polach `captured_at` wpisów o błędach (`backend/services/audit_log.py`) i o synchronizacji Foxcons (`backend/services/foxcons.py`); dodał test `test_timestamp_ignores_fake_clock`.

### 335. `114ccf2` — fix: foxcons_startup error, lowercase uuid

*2026-11-02 · Z-Grate · 4 pliki, +40 / −2*

- Zmienił `lookup_foxcons_nfc_tag_user_id` (`backend/services/foxcons.py`), aby wysyłało UID tagu małymi literami, bo tak przechowuje je Foxcons.
- Dodał w `backend/services/foxcons_startup.py` oczekiwanie na zakończenie migracji (sprawdzanie co 5 s, maksymalnie 600 s) przed startowym przeskanowaniem identyfikatorów Foxcons; po przekroczeniu limitu skan jest pomijany z ostrzeżeniem.
- Dodał test `test_startup_foxcons_rescan_waits_for_migrations` i poprawił oczekiwany adres w teście wyszukiwania tagu.

### 336. `ae7216b` — feat: auto refresh dispatcher page

*2026-11-02 · Z-Grate · 1 plik, +24 / −1*

- Dodał na `frontend/src/pages/DispatcherPage.vue` odpytywanie w tle co 10 s (`pollShifts`): pobiera `/shifts/dispatch/` po cichu, pomija ukrytą kartę i trwające ładowanie, a dane podmienia tylko wtedy, gdy odpowiedź się zmieniła, zachowując istniejące obiekty zmian.
- Dodał w nagłówku strony przycisk ręcznego odświeżenia i sprzątanie timera w `onUnmounted`.

### 337. `9eedd94` — feat: disconnect button

*2026-11-02 · Z-Grate · 4 pliki, +25 / −4*

- Dodał funkcję `disconnect()` w `frontend/src/composables/useSerialScanner.ts`: przerywa odczyt, zamyka port i wywołuje `port.forget()`, żeby czytnik nie połączył się ponownie po przeładowaniu strony.
- Dodał przycisk rozłączenia czytnika na `frontend/src/pages/ConopsScreenPage.vue` obok informacji o podłączonym skanerze oraz tłumaczenia.

### 338. `b671362` — feat: cache foxcons JWT until exp, use refresh token

*2026-11-03 · Z-Grate · 7 plików, +224 / −30*

- Przebudował `_request_foxcons_jwt` w `backend/services/foxcons.py`: token JWT Foxcons jest trzymany w cache do chwili bliskiej wygaśnięcia (`exp` minus 300 s), potem odnawiany przez `/auth/refresh-token`, a dopiero w ostateczności pobierany pełnym logowaniem (`_login_foxcons`); klucz cache zawiera skrót danych logowania.
- Dodał `_drop_foxcons_jwt_on_401` i wywołał je po żądaniach do Foxcons, tak aby odpowiedź 401 kasowała zapamiętany token; wyszukiwanie tagu NFC ponawia żądanie raz ze świeżym logowaniem.
- Długie zadania (synchronizacja pozycji umów, masowa zmiana typu konta) oraz `HealthCheckView` logują się świeżo przez parametr `fresh=True`.
- Dodał `ApiKeyScopedRateThrottle` w `backend/core/throttling.py`: limit skanów liczy się osobno dla każdego klucza ekranu conops zamiast wspólnie dla jego twórcy.
- Zmienił aktualizację ekranu conops (`backend/shifts/views.py`): stan klucza API jest zmieniany tylko wtedy, gdy żądanie zawiera `is_active`, więc klucz odwołany w panelu Django pozostaje odwołany.
- Dodał klasę testów `FoxconsJwtCacheTests` oraz testy limitu per ekran i zachowania odwołanego klucza.

### 339. `0a8ae9b` — feat: manual dispatch requests, busy-helper confirm

*2026-11-03 · Z-Grate · 15 plików, +467 / −47*

- Pozwolił na zgłoszenia bez czatu Telegrama: pole `DispatchRequest.chat` stało się opcjonalne (migracja `backend/dispatch_requests/migrations/0005_dispatchrequest_chat_nullable.py`), a serializery zwracają flagę `manual`.
- Wydzielił w `backend/dispatch_requests/bot.py` funkcje `draft_from_form` i `create_request`, wspólne dla formularza Mini App i ekranu dyspozytora; `send_to_requester` dla zgłoszenia ręcznego zapisuje tylko wpis na osi czasu.
- Dodał metodę `create` w `DispatchRequestViewSet` (`backend/dispatch_requests/views.py`): dyspozytor tworzy zgłoszenie, które od razu jest przez niego przejęte; akcje wymagające zgłaszającego (wiadomość, blokada) są dla takich zgłoszeń odrzucane przez `_require_chat`.
- Rozszerzył listę kandydatów o pole `busy_with` — tytuły innych otwartych zgłoszeń i zwykłych zadań, którymi dana osoba jest zajęta; dane bota zawierają też `presets` i `halls`.
- Dodał komponenty `frontend/src/components/DispatchRequestCreateModal.vue` (formularz nowego zgłoszenia) i `DispatchAssignConfirm.vue` (potwierdzenie przypisania zajętej osoby z listą jej zajęć), podpięte w `DispatchRequestsPage.vue` i `LiveDispatchBotPanel.vue` przez `useDispatchRequests.ts`.
- Przeniósł przycisk blokady zgłaszającego obok jego nazwy, dodał plakietkę zgłoszenia ręcznego i ukrył dla niego opcję wiadomości do zgłaszającego; dopisał trzy testy i tłumaczenia.

### 340. `a2784d3` — fix: hot fix, raise all=true cap to 5000

*2026-11-06 · Z-Grate · 7 plików, +54 / −6*

- Podniósł w `backend/core/pagination.py` twardy limit `all_bypass_hard_cap` dla list z `all=true` z 500 do 5000 i dodał ostrzeżenie w logu, gdy wiersze zostały obcięte (logger `core.pagination` skonfigurowany w `backend/config/settings.py`).
- Dodał sortowanie po `id` w zapytaniu o wolontariuszy w `_push_foxcons_agreement_items` (`backend/services/foxcons.py`).
- Podniósł stałą `LOG_EXPORT_HARD_CAP` do 5000 w `frontend/src/components/admin/ShiftsLogTab.vue` i zaktualizował liczbę w tłumaczeniach.
- Dodał klasę testów `ShiftListAllTests` w `backend/shifts/tests.py`.

### 341. `916d7cf` — fix: hot fix, raise all=true cap to 5000

*2026-11-06 · Z-Grate · 7 plików, +54 / −6*

- Wprowadził tę samą poprawkę co commit 340 (`a2784d3`) — diff jest identyczny co do treści — ale nałożoną na inny commit nadrzędny (`0e7523c`), czyli na gałąź `production`.
- Podniósł limit `all=true` do 5000 z ostrzeżeniem w logu (`backend/core/pagination.py`), dodał sortowanie w synchronizacji umów Foxcons, zmienił limit eksportu w `ShiftsLogTab.vue` i dodał testy `ShiftListAllTests`.

### 342. `eadfa54` — feat: offer shift cancellation on department kick, free held tasks

*2026-11-06 · Z-Grate · 14 plików, +290 / −28*

- Rozszerzył akcję `remove-member` działu (`backend/events/views.py`) o opcjonalny parametr `cancel_shifts`: anuluje niezakończone przypisania usuwanej osoby do zmian w tym dziale, kasuje ich przypomnienia i zapisuje wpis audytu dla każdej zmiany.
- Dodał moduł `backend/services/shift_task_holds.py` z funkcjami `release_task_hold` i `release_task_holds`, które zwalniają zadania trzymane przez anulowane przypisanie; użył ich przy anulowaniu zmiany, usunięciu uczestnika z wydarzenia i wyrzuceniu z działu.
- Zmienił listę kandydatów zgłoszenia (`backend/dispatch_requests/views.py`), by zadania trzymane przez anulowane przypisania nie oznaczały osoby jako zajętej.
- Zmienił endpoint listy wolontariuszy kwalifikujących się do zmiany (`backend/shifts/views.py`): operatorzy zmian zachowują dostęp także przy wyłączonym dyspozytorze.
- Zastąpił w `frontend/src/components/admin/MyDepartmentsTab.vue` systemowe potwierdzenie wyrzucenia oknem `BaseModal` z polem wyboru anulowania zmian; `ShiftAssignerTab.vue` pokazuje osobny komunikat przy odpowiedzi 403, a `BaseModal.vue` tłumaczy etykietę przycisku zamknięcia.
- Dodał osiem testów (wydarzenia, zmiany, zgłoszenia) i wzmiankę o `cancel_shifts` w `README.md`.

### 343. `a314e1b` — chore: merge main into production

*2026-11-07 · Z-Grate · 52 pliki, +1908 / −131*

- Scalił gałąź `main` (do commita `eadfa54`) z `production`, na której był tylko hot fix `916d7cf`.
- Wprowadził tym samym na `production` commity 330–340 i 342: utwardzenie API ekranów conops, check-in identyfikatorem NFC z czytnika szeregowego, audyt skanów i rzeczywisty czas audytu, automatyczne odświeżanie tablicy dyspozytora, cache JWT Foxcons, ręczne zgłoszenia dyspozytorskie oraz anulowanie zmian przy wyrzuceniu z działu.
- Statystyka pochodzi z różnicy względem pierwszego rodzica; scalenie nie pokazuje własnych zmian poza połączeniem obu wersji tego samego hot fixa.

### 344. `cb378de` — feat: poll dispatcher by 12h window, single kick cancellation notice Polls only running and next-12h shifts; tasks on ended shifts no longer mark helpers busy. Deleting a conops screen always revokes its key; bad dispatch params return 400; adds migration drift test, unit tests in CI.

*2026-11-07 · Z-Grate · 20 plików, +533 / −78*

- Zmienił odpytywanie na `frontend/src/pages/DispatcherPage.vue`: pobiera tylko zmiany trwające i zaczynające się w ciągu 12 godzin (parametry `end_after`, `start_before`), a zmiany, które zniknęły z okna, dociąga po `ids`; logikę wykrywania wydzielił do `frontend/src/utils/dispatchWindow.ts`.
- Dodał do endpointu `/shifts/dispatch/` (`backend/shifts/views.py`) filtry `end_after` i `ids` oraz wspólną funkcję `_datetime_param`, która dla błędnej daty zwraca 400.
- Dodał funkcję `send_shifts_cancelled_notification` i szablony `backend/notifications/templates/shifts_cancelled_pl.txt` / `_en.txt`: wyrzucony z działu wolontariusz dostaje jedno zbiorcze powiadomienie o anulowanych zmianach.
- Dodał w `backend/shifts/models.py` odbiornik `post_delete` dla `ConopsScreen`, który dezaktywuje klucz API przy każdym sposobie usunięcia ekranu, i uprościł odpowiadający kod widoku.
- Zmienił `backend/dispatch_requests/views.py`: zadania pozostawione na zakończonych zmianach nie oznaczają osoby jako zajętej, a błędny identyfikator bota przy tworzeniu zgłoszenia daje błąd walidacji.
- Wydzielił parsowanie linii czytnika do `frontend/src/utils/badgeScan.ts`, dodał krok `npm run test:unit` w `.github/workflows/frontend-qa.yml` oraz migrację `backend/users/migrations/0012_date_joined_default.py` (domyślna wartość `date_joined`).
- Dodał test `MigrationDriftTests` (`backend/core/tests.py`), testy filtrów i powiadomień, testy jednostkowe `badgeScan` i `dispatchWindow` oraz scenariusze e2e w `frontend/e2e/dispatcher.spec.ts`.

### 345. `155530d` — chore: merge main into production

*2026-11-07 · Z-Grate · 20 plików, +533 / −78*

- Scalił gałąź `main` z `production`, wnosząc jeden commit: 344 (`cb378de`) — odpytywanie tablicy dyspozytora w oknie 12 godzin, zbiorcze powiadomienie o anulowanych zmianach, dezaktywację klucza usuwanego ekranu conops i testy.

### 346. `760dcb8` — fix: split ScanLine union so kind checks narrow uid

*2026-11-07 · Z-Grate · 1 plik, +1 / −1*

- Rozdzielił w `frontend/src/utils/badgeScan.ts` typ `ScanLine` na osobne warianty `{ kind: 'empty' }` i `{ kind: 'bad' }`, aby TypeScript poprawnie zawężał typ i widział pole `uid` po sprawdzeniu `kind`.

### 347. `38fb199` — chore: merge main into production

*2026-11-07 · Z-Grate · 1 plik, +1 / −1*

- Scalił gałąź `main` z `production`, wnosząc jeden commit: 346 (`760dcb8`) z poprawką typu `ScanLine`.

### 348. `def82ed` — fix: SW fallback after 15s, banner when showing saved data

*2026-11-08 · Z-Grate · 8 plików, +134 / −6*

- Zmienił service worker (`frontend/src/sw.ts`): limit czasu sieci dla tras zmian i profilu wzrósł z 5 do 15 s, trasy ograniczono do ścieżek `/api/`, a wtyczka `markSaved` dopisuje do kopii zapisywanej w cache nagłówek `X-SW-Saved-At` z czasem zapisu.
- Dodał w `frontend/src/utils/connectivity.ts` rejestr odpowiedzi podanych z cache (`noteResponse`, `clearSavedResponses`, `showingSavedSince`), prowadzony per URL i zerowany przy zmianie strony.
- Dodał w `frontend/src/services/api.ts` interceptor, który dla odpowiedzi GET odczytuje nagłówek `X-SW-Saved-At`, oraz w `frontend/src/router/index.ts` czyszczenie rejestru po zmianie ścieżki.
- Dodał w `frontend/src/App.vue` baner informujący, że widoczne dane są zapisaną kopią z podanej godziny, z przyciskiem odświeżenia strony.
- Dodał testy `frontend/tests/savedResponses.test.ts` i tłumaczenia.

### 349. `0f94805` — feat: add event_stats command with ceremony and admin stats

*2026-11-08 · Z-Grate · 2 pliki, +436 / −0*

- Dodał polecenie `event_stats` (`backend/core/management/commands/event_stats.py`): tylko do odczytu, wypisuje dla każdego wydarzenia (lub jednego przez `--event`) statystyki zgłoszeń, umów, zmian, ról i zadeklarowanych godzin.
- Flaga `--ceremony` dodaje anonimowe liczby do przemówień, a `--admin` — sekcje o obecności na zakończonych zmianach per dział, pokryciu dokumentami, zgłoszeniach dyspozytorskich, osiągalności, benefitach i rozbieżnościach godzin.
- Flaga `--names` (dozwolona tylko razem z `--ceremony` lub `--admin`) dopisuje nazwy użytkowników do zestawień.
- Dodał klasę testów `EventStatsCommandTests` w `backend/core/tests.py` (cztery testy).

### 350. `74260ce` — chore: merge main into production

*2026-11-08 · Z-Grate · 10 plików, +570 / −6*

- Scalił gałąź `main` z `production`, wnosząc commity 348 (`def82ed`, baner zapisanych danych i 15-sekundowy limit service workera) oraz 349 (`0f94805`, polecenie `event_stats`).

### 351. `d0d836b` — feat: refresh Foxcons counter item after sign-offline upload

*2026-11-08 · Z-Grate · 6 plików, +109 / −4*

- Dodał w `backend/agreements/services.py` funkcję `_queue_foxcons_counter_refresh`, wywoływaną z `sign_offline`: po zatwierdzeniu transakcji kolejkuje synchronizację pozycji umowy jednego wolontariusza dla każdego wydarzenia z włączonym `foxcons_sync_agreement_items`; błąd kolejki nie przerywa wgrania.
- Dodał zadanie Celery `sync_foxcons_agreement_items_user_task` (`backend/core/tasks.py`), które ponawia próbę (do 10 razy co 60 s), gdy trwa pełna synchronizacja.
- Rozszerzył `sync_foxcons_agreement_items` w `backend/services/foxcons.py` o parametr `user_id` ograniczający przebieg do jednej osoby; przy braku osób do sprawdzenia pomijane jest logowanie do Foxcons.
- Dopisał pięć testów (`backend/agreements/tests.py`, `backend/events/tests.py`) i zdanie w `counter/README.md`.

### 352. `fcc4eaa` — chore: merge main into production

*2026-11-08 · Z-Grate · 6 plików, +109 / −4*

- Scalił gałąź `main` z `production`, wnosząc jeden commit: 351 (`d0d836b`) — odświeżenie pozycji Foxcons po wgraniu podpisanego skanu.

### 353. `e148a6f` — feat: conops kiosk works from cached data, no reload prompts

*2026-11-10 · Z-Grate · 6 plików, +58 / −5*

- Dodał w `frontend/src/sw.ts` trasę `NetworkFirst` z cache `conops-api-cache` dla `/conops-screens/data` (limit 15 s, kopie do 24 godzin) oraz `NavigationRoute` podającą zapisaną powłokę aplikacji dla `/live` i `/conops-screen` przy przeładowaniu offline; service worker przejmuje otwarte karty przez `clients.claim()`.
- Zmienił `frontend/src/pages/ConopsScreenPage.vue`: strona rejestruje service worker (`registerSW`) i pokazuje czas ostatniej aktualizacji danych, brany z nagłówka `X-SW-Saved-At` dla kopii z cache.
- Ukrył baner zapisanych danych na trasie `conops-screen` (`frontend/src/App.vue`) i oznaczył żądania `/settings/app/` jako `silent` w `App.vue` i `useServerClock.ts`.
- Dodał klucz tłumaczenia czasu ostatniej aktualizacji.

### 354. `b04c006` — chore: merge main into production

*2026-11-10 · Z-Grate · 6 plików, +58 / −5*

- Scalił gałąź `main` z `production`, wnosząc jeden commit: 353 (`e148a6f`) — działanie kiosku conops na danych z cache.

### 355. `1552c94` — feat: anonymised DB export and dev import commands

*2026-11-17 · Z-Grate · 6 plików, +517 / −0*

- Dodał moduł `backend/core/anonymise.py` (401 wierszy): eksport całej bazy do spakowanej fikstury z regułami zamiany pól per model (`RULES`), pominięciem wybranych modeli (`EXCLUDED_MODELS`), usuwaniem plików oraz czyszczeniem wolnego tekstu i wartości JSON z adresów e-mail, telefonów, numerów PESEL, adresów URL z sekretami i zebranych danych osobowych.
- Dodał polecenie `anon_export` (`backend/core/management/commands/anon_export.py`) zapisujące fiksturę `.json.gz` i wypisujące liczbę zmienionych wartości per pole.
- Dodał polecenie `anon_import`, które zastępuje całą bazę fiksturą w jednej transakcji, ustawia wszystkim użytkownikom wspólne hasło i odmawia działania przy `DJANGO_DEBUG=false` (chyba że ustawiono `ALLOW_NON_DEV_SEED`).
- Dopisał oba polecenia do list pomijanych przy podmianie zegara (`backend/core/apps.py`) i przy startowym skanie Foxcons (`backend/services/foxcons_startup.py`).
- Dodał test `AnonymiseCommandTests` sprawdzający eksport i ponowny import (`backend/core/tests.py`).

### 356. `b388980` — chore: merge main into production

*2026-11-17 · Z-Grate · 6 plików, +517 / −0*

- Scalił gałąź `main` z `production`, wnosząc jeden commit: 355 (`1552c94`) — polecenia `anon_export` i `anon_import`.

### 357. `42594d2` — feat: per-person template fields filled in at generation

*2026-11-20 · Z-Grate · 16 plików, +536 / −40*

- Dodał pole `fields` (`JSONField`, lista `{key, label, default, multiline}`, najwyżej 20 pozycji, walidator `validate_template_fields`) do modelu `DocumentTemplate` oraz pole `field_values` do `GeneratedDocument` (`backend/documents/models.py`, migracja `0006_template_fields.py`).
- Rozszerzył renderowanie (`backend/documents/rendering.py`): kontekst szablonu dokumentu zawiera `fields.<key>` z wartością wpisaną dla danej osoby albo wartością domyślną (`resolve_field_values`), a katalog pól i podgląd z danymi przykładowymi uwzględniają pola szablonu.
- Rozszerzył serializery generowania (`backend/documents/serializers.py`): pojedyncze generowanie przyjmuje `field_values` jako `{klucz: tekst}`, masowe — `{id użytkownika: {klucz: tekst}}`; nieznane klucze i wartości dla osób spoza listy odbiorców są odrzucane.
- Przekazał wartości przez `backend/documents/services.py`, `views.py` i `tasks.py` aż do zadania generującego, a walidator treści (`backend/documents/validation.py`) ostrzega o użyciu niezdefiniowanego `fields.<key>`.
- Dodał w `frontend/src/components/admin/DocumentTemplatesTab.vue` edytor pól szablonu, a w `GenerateDocumentTab.vue` pola do wpisania wartości dla wolontariusza w trybie pojedynczym i masowym; pomocnicza funkcja `pickFieldValues` trafiła do `frontend/src/utils/templateFieldValues.ts`.
- Dodał klasę testów `PerPersonFieldsTests` (siedem testów) w `backend/documents/tests.py`, testy `frontend/tests/templateFieldValues.test.ts` i tłumaczenia.

### 358. `4d401f9` — chore: merge main into production

*2026-11-20 · Z-Grate · 16 plików, +536 / −40*

- Scalił gałąź `main` z `production`, wnosząc jeden commit: 357 (`42594d2`) — pola szablonu dokumentu wypełniane dla każdej osoby przy generowaniu.

### 359. `551cee1` — feat: notify volunteer of documents signed on their behalf

*2026-11-20 · Z-Grate · 9 plików, +63 / −2*

- Zmienił `request_signature` w `backend/agreements/services.py`: właściciel umowy, który sam nie jest podpisującym, dostaje jedno powiadomienie przy pierwszej prośbie o podpis.
- Dodał w `backend/services/agreement_signature_email.py` specyfikację `AGREEMENT_ON_BEHALF_SPEC` z nową kategorią powiadomień `agreement_on_behalf` i funkcję `send_agreement_on_behalf_email` oraz szablony `backend/users/templates/agreement_on_behalf_email_pl.txt` i `_en.txt`.
- Dodał kategorię `agreement_on_behalf` do listy w `frontend/src/components/admin/EventSettingsNotificationsTab.vue` i jej etykiety w tłumaczeniach.
- Dopisał test `test_request_signature_tells_owner_who_is_not_a_signer_once` i uzupełnił oczekiwaną listę kategorii w `backend/events/tests.py`.
