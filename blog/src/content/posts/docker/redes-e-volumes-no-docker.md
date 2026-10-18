---
title: "Redes e volumes no Docker"
description: "Como containers se comunicam entre si e como persistir dados além do ciclo de vida do container."
date: 2026-07-09
updatedDate: 2026-07-09
prerequisites: [docker/dockerfile-multi-stage-build]
related: [kubernetes/volumes-persistentes, kubernetes/services-e-tipos]
---

## Tipos de rede

```bash
docker network ls
docker network create app-net
docker run -d --name db --network app-net postgres:16
docker run -d --name app --network app-net -e DATABASE_HOST=db minha-app
```

- **bridge** (padrão): rede isolada por host, containers na mesma bridge se enxergam pelo
  nome.
- **host**: o container compartilha a stack de rede do host — sem isolamento de portas, mais
  performance, menos segurança.
- **none**: sem rede alguma, útil para jobs batch que não precisam de acesso externo.
- **overlay**: conecta containers em hosts diferentes, usado em Docker Swarm.

Em uma rede `bridge` **customizada** (não a `bridge` padrão), containers resolvem uns aos
outros pelo nome via DNS interno do Docker — na rede `bridge` padrão isso não funciona, é
preciso usar `--link` (obsoleto) ou IP direto.

## Persistência: volumes vs bind mounts

```bash
# Volume nomeado — gerenciado pelo Docker
docker volume create dados-app
docker run -v dados-app:/data minha-app

# Bind mount — aponta para um caminho específico do host
docker run -v /home/user/app-data:/data minha-app
```

| | Volume | Bind mount |
|---|---|---|
| Gerenciado por | Docker | Sistema de arquivos do host |
| Portabilidade | Alta | Baixa (depende do path do host) |
| Uso típico | Dados de produção (banco, uploads) | Desenvolvimento (código-fonte local) |

```bash
docker volume ls
docker volume inspect dados-app
docker volume prune       # remove volumes não usados por nenhum container
```

## tmpfs para dados voláteis sensíveis

```bash
docker run --tmpfs /app/cache minha-app
```

Dados em `tmpfs` ficam só na memória RAM do host, nunca tocam disco — útil para segredos
temporários ou cache que não deve sobreviver ao restart do container.

> `docker volume prune` remove **todos** os volumes não referenciados por nenhum container,
> inclusive parado. Antes de rodar em produção, confira `docker volume ls` e o output de
> `docker ps -a` para não apagar dados de um container que só está parado, não removido.
