---
sidebar_position: 4.5
title: Sposoby kontaktu
---

# Sposoby kontaktu

Sposoby kontaktu to drogi, którymi system wysyła osobie wiadomości i którymi wolontariusze kontaktują się ze sobą. Ta strona opisuje, jakie dane kontaktowe ma osoba, jak wybiera kanał powiadomień i kto widzi jej kontakt.

## Założenia

- Osoba ma trzy rodzaje danych kontaktowych: adres e-mail konta, kontakt na Telegramie i numer telefonu. Adres e-mail i kontakt na Telegramie są wymagane, numer telefonu nie.
- System wysyła osobie wiadomości kanałem, który osoba wybrała, i w jej języku. Dotyczy to także kodu logowania.
- Gdy wiadomości nie da się dostarczyć wybranym kanałem, system wysyła ją e-mailem.
- Powiadomienie na urządzenie jest dodatkiem do wybranego kanału, a nie osobnym kanałem.
- Osoba wybiera, o czym chce dostawać powiadomienia. Części wiadomości nie może wyłączyć.
- Każdą wiadomość wysłaną do osoby system zapisuje. Osoba widzi swoje wiadomości w skrzynce powiadomień, bez względu na to, którym kanałem przyszły i czy udało się je dostarczyć.
- System nie ma wewnętrznego komunikatora ani czatu. Wolontariusze kontaktują się ze sobą poza systemem, przez udostępniony adres e-mail albo Telegram.
- Inni wolontariusze nie widzą kontaktu osoby, dopóki sama go nie udostępni.
- Organizatorzy działów osoby i administrator widzą jej adres e-mail zawsze.
- Osoba nie zmienia sama adresu e-mail konta. Zmienia go administrator.

## Kontakt a wydarzenie

Dane kontaktowe, kanał powiadomień i udostępnianie kontaktu są wspólne dla konta – osoba ustawia je raz i obowiązują we wszystkich wydarzeniach. Od wydarzenia zależy tylko to, kto widzi udostępniony kontakt: zalogowani wolontariusze tego wydarzenia, w którym osoba uczestniczy.

Wydarzenie może wyłączyć wybrane rodzaje wiadomości, np. o decyzji w sprawie aplikacji (zob. [Kanały i ustawienia powiadomień](../powiadomienia/kanaly-i-ustawienia.md)).

Wydarzenie podaje też własny adres e-mail do kontaktu. Widzi go każdy przy wyborze wydarzenia, także osoba bez konta.

## Dane kontaktowe

Dane kontaktowe osoby przedstawia tabela 1.

| Dane | Do czego służą | Kto zmienia |
| --- | --- | --- |
| Adres e-mail | Rozpoznaje konto; na niego przychodzi kod logowania i wiadomości wysyłane e-mailem | Administrator |
| Kontakt na Telegramie | Nazwa użytkownika albo konto połączone z Telegramem; kontakt dla organizatorów i wolontariuszy, a po połączeniu także kanał powiadomień | Osoba |
| Numer telefonu | Niewymagany; kontakt z osobą poza systemem, system nie wysyła na niego wiadomości | Osoba |

*Tabela 1. Dane kontaktowe osoby*

Kontakt na Telegramie osoba podaje na dwa sposoby: wpisuje nazwę użytkownika albo łączy konto z Telegramem. Dopiero połączenie pozwala systemowi wysyłać jej wiadomości na Telegramie. Połączenie i to, co się dzieje, gdy osoba zablokuje bota systemu, opisuje strona [Telegram](../integracje-zewnetrzne/telegram.md).

## Jak system kontaktuje się z osobą

Osoba ustawia w profilu:

- kanał powiadomień – e-mail albo Telegram; Telegram można wybrać dopiero po połączeniu konta,
- powiadomienia na urządzenie – włączane osobno na każdym urządzeniu, jako dodatek do wybranego kanału,
- rodzaje powiadomień – o czym osoba chce dostawać wiadomości (zob. [Rodzaje powiadomień](../powiadomienia/rodzaje-powiadomien.md)),
- przypomnienia o zmianie – ile czasu przed zmianą osoba chce dostać przypomnienie.

Wiadomość trafia do osoby wybranym kanałem, a gdy nie da się jej tak dostarczyć – e-mailem. Dotyczy to także kodu logowania. Drogę wiadomości opisuje strona [Kanały i ustawienia powiadomień](../powiadomienia/kanaly-i-ustawienia.md), a to, co system wysyła i czego osoba nie może wyłączyć – strona [Rodzaje powiadomień](../powiadomienia/rodzaje-powiadomien.md).

Wiadomości wysłane do osoby wszystkimi kanałami osoba widzi w skrzynce powiadomień (zob. [Skrzynka powiadomień](../powiadomienia/kanaly-i-ustawienia.md#skrzynka-powiadomień)).

Organizator może wysłać osobie wiadomość przez [Mailer](../organizator/mailer.md). Osoba nie odpowiada na nią w systemie.

## Kto widzi kontakt osoby

Osoba decyduje w profilu, czy udostępnia kontakt innym wolontariuszom – osobno adres e-mail, kontakt na Telegramie i numer telefonu. Domyślnie wszystkie są ukryte. Numer telefonu bez udostępnienia widzą tylko organizatorzy działów osoby, administrator oraz osoby, których rola daje uprawnienie do wglądu w dane wrażliwe albo konkretnie w numer telefonu. Kto co widzi, przedstawia tabela 2.

| Kto patrzy | Co widzi |
| --- | --- |
| Organizator działu osoby, administrator | Imię i nazwisko, adres e-mail, kontakt na Telegramie i numer telefonu – zawsze |
| Osoba z rolą, która daje uprawnienie do wglądu w dane wrażliwe albo w numer telefonu | Numer telefonu – zawsze |
| Zalogowany wolontariusz tego samego wydarzenia | Nickname i zdjęcie profilowe; adres e-mail, kontakt na Telegramie i numer telefonu tylko wtedy, gdy osoba je udostępniła |
| Osoba bez konta, w formularzu aplikacji | Udostępniony kontakt organizatorów i koordynatorów działu; kontaktu pozostałych członków nie widzi |

*Tabela 2. Kto widzi dane kontaktowe osoby*

Organizator albo koordynator, który udostępnił kontakt, jest osobą kontaktową działu: jego kontakt widać w formularzu aplikacji, żeby osoba mogła skontaktować się z działem, zanim zaaplikuje (zob. [Aplikacja wolontariacka](aplikacja.md)).

## Jak osoba kontaktuje się z innymi

- Z innymi wolontariuszami – przez kontakt, który udostępnili, widoczny na liście wolontariuszy (zob. [Lista wolontariuszy](../organizator/lista-wolontariuszy.md)).
- Z działem przed aplikacją – przez osoby kontaktowe widoczne w formularzu aplikacji.
- Z organizatorem – gdy chce zmienić dane podstawowe, których nie zmienia sama (zob. [Profil wolontariusza](profil.md)).
- Z administratorem – gdy chce zmienić adres e-mail konta, pobrać swoje dane, wycofać zgodę albo usunąć dane.
- Z dyspozytorem w trakcie wydarzenia – przez bota zgłoszeń na Telegramie: osoba opisuje sprawę, a odpowiedzi wracają do niej w tej samej rozmowie (zob. [Boty zgłoszeń](../zmiany/boty-zgloszen.md)).
- Z członkami swojego działu – przez notatki działu, które czytają i dopisują jego członkowie (zob. [Notatki](../organizator/notatki.md)); notatka nie wysyła powiadomienia.
- Z organizatorami wydarzenia przed założeniem konta – przez adres e-mail wydarzenia.
