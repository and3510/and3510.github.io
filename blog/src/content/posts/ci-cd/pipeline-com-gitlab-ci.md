---
title: "Pipeline básico com GitLab CI"
description: "Estrutura mínima de um .gitlab-ci.yml para lint, teste e build, com stages e cache."
date: 2026-08-28
updatedDate: 2026-08-28
prerequisites: [ci-cd/integracao-entrega-e-implantacao-continuas]
related: [ci-cd/pipeline-com-github-actions, ci-cd/pipeline-com-gitea-actions]
---

## Pipeline mínimo

```yaml
# .gitlab-ci.yml
stages:
  - lint
  - test
  - build

variables:
  NODE_VERSION: "22"

default:
  image: node:${NODE_VERSION}
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/

lint:
  stage: lint
  script:
    - npm ci
    - npm run lint

test:
  stage: test
  script:
    - npm ci
    - npm test

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week
```

## Stages x Jobs

**Stages** definem a ordem geral (lint → test → build); **jobs** são as tarefas que rodam
dentro de cada stage. Jobs do mesmo stage rodam em paralelo por padrão; stages diferentes
rodam em sequência, um só começa depois que o anterior termina com sucesso.

## Regras de execução

```yaml
deploy:
  stage: build
  script:
    - ./deploy.sh
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
      when: on_success
    - when: never
```

`rules` (a forma moderna, substituindo o antigo `only`/`except`) controla precisamente quando
cada job roda — aqui, o deploy só executa em push para `main`.

## Cache x Artifacts

- **cache**: acelera execuções futuras reutilizando dependências (`node_modules`) entre
  pipelines — não é garantido entre todos os runners, é uma otimização, não uma garantia.
- **artifacts**: arquivos gerados por um job que ficam disponíveis para download e para jobs
  posteriores no mesmo pipeline (ex: `dist/` do build sendo usado no stage de deploy).

## Boas práticas

- Fixar a versão da imagem base (`node:22`, não `node:latest`) para builds reprodutíveis.
- Usar `rules` para controlar precisamente quando cada job deve rodar, evitando pipelines
  desnecessários em branches que não precisam.
- Definir `expire_in` em artifacts para não acumular armazenamento indefinidamente.

> O GitLab Runner é o agente que efetivamente executa os jobs — pode ser compartilhado (SaaS
> do GitLab.com) ou self-hosted. Runners self-hosted dão controle sobre o ambiente de
> execução, mas exigem que você mesmo gerencie a infraestrutura deles.
