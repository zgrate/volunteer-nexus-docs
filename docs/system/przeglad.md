---
sidebar_position: 3
title: Przegląd architektury
---

# Przegląd architektury

:::warning[Szkic]
Strona jest szkieletem. Diagram pokazuje usługi i zależności `depends_on` z `docker-compose.yml`; pozostałe sekcje czekają na treść.
:::

## Usługi

```mermaid
flowchart LR
    frontend --> backend
    backend --> db[(db)]
    backend --> redis[(redis)]
    backend --> mailhog
    celery-worker --> db
    celery-worker --> redis
    celery-worker --> mailhog
    celery-beat --> db
    celery-beat --> redis
    celery-beat --> mailhog
    telegram-poller --> backend
    telegram-poller --> db
    telegram-poller --> redis
```

TODO(pytanie): opisać rolę każdej usługi.

## Moduły backendu

TODO(pytanie): lista aplikacji Django z `backend/` i ich odpowiedzialności.

## Integracje zewnętrzne

TODO(pytanie): Foxcons, Telegram, OAuth/OIDC, poczta.
