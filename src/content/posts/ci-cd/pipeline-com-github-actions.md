---
title: "Pipeline básico com GitHub Actions"
description: "Estrutura mínima de um workflow de CI para lint, teste e build."
date: 2026-02-03
---

## Workflow mínimo

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm run build
```

## Boas práticas

- Fixar versões das actions por hash ou tag confiável.
- Rodar lint e testes antes do build para falhar rápido.
- Usar cache de dependências para acelerar o pipeline.
