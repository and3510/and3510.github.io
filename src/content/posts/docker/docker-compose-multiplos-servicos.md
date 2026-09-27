---
title: "Docker Compose: orquestrando múltiplos serviços"
description: "Como declarar aplicação, banco e dependências num único arquivo para ambientes locais e de teste."
date: 2026-07-08
updatedDate: 2026-07-08
---

## Um compose básico

```yaml
# docker-compose.yml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/appdb
    depends_on:
      db:
        condition: service_healthy
    networks:
      - app-net

  db:
    image: postgres:16
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=appdb
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - app-net

volumes:
  db-data:

networks:
  app-net:
```

```bash
docker compose up -d
docker compose logs -f app
docker compose down
```

## depends_on com healthcheck

`depends_on` sozinho só espera o container **iniciar**, não estar **pronto**. Combinado com
`condition: service_healthy`, o Compose espera o `healthcheck` do serviço dependente passar
antes de subir o próximo — evita o clássico erro de conexão recusada porque o banco ainda
estava inicializando.

## Overrides por ambiente

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

```yaml
# docker-compose.dev.yml
services:
  app:
    build:
      target: build
    volumes:
      - .:/app
    command: npm run dev
```

Esse padrão mantém um `docker-compose.yml` base (próximo de produção) e overrides específicos
para desenvolvimento (bind mount do código, hot reload), sem duplicar toda a configuração.

> Volumes nomeados (`db-data`) sobrevivem a `docker compose down`; só são removidos com
> `docker compose down -v`. É um erro comum "perder" dados de banco local só porque alguém
> rodou o `-v` sem saber o que fazia.
