---
title: "Pipeline básico com Gitea Actions"
description: "Como rodar CI em um Gitea self-hosted usando uma sintaxe compatível com GitHub Actions."
date: 2026-10-19
updatedDate: 2026-10-19
---

## Gitea Actions é compatível com a sintaxe do GitHub Actions

O **Gitea Actions** foi desenhado para ser compatível com workflows no formato do GitHub
Actions — o mesmo YAML, com pequenas diferenças, roda em um Gitea self-hosted com
**act_runner** configurado.

```yaml
# .gitea/workflows/ci.yml
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
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

O arquivo fica em `.gitea/workflows/`, não em `.github/workflows/` — essa é a diferença
estrutural mais importante ao migrar um workflow existente do GitHub para o Gitea.

## act_runner: o executor dos jobs

Diferente do GitHub, que oferece runners hospedados prontos, o Gitea depende de você
registrar e manter seu próprio **act_runner** — um binário que se conecta à instância Gitea e
executa os jobs.

```bash
act_runner register --instance https://git.exemplo.com --token <token-do-runner>
act_runner daemon
```

Isso é coerente com a proposta do Gitea: uma alternativa leve e self-hosted ao GitHub/GitLab,
onde você controla toda a infraestrutura, inclusive a de execução do CI.

## Compatibilidade, mas não identidade

Nem toda action do marketplace do GitHub funciona sem ajustes no Gitea — a maioria das
actions simples (checkout, setup de linguagem) funciona bem, mas actions que dependem de
APIs específicas do GitHub (releases, comentários em PR via API do GitHub) não têm
equivalente automático.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest   # precisa de um act_runner com essa label registrada
```

O `runs-on` deve corresponder a uma label que algum `act_runner` registrado na instância
atende — sem um runner com aquela label disponível, o job fica pendente indefinidamente.

## Secrets e variáveis

```yaml
steps:
  - run: echo "Deploy com token"
    env:
      DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

Secrets são configurados na interface do Gitea (repositório, organização ou instância) e
injetados como variáveis de ambiente no job, exatamente como no GitHub Actions.

## Quando faz sentido

Gitea Actions é uma boa escolha quando você já usa Gitea self-hosted por controle,
compliance ou custo, e quer manter workflows próximos da sintaxe já conhecida do GitHub
Actions — a curva de aprendizado para quem já usa GitHub Actions é mínima.

> A compatibilidade de sintaxe reduz atrito ao migrar entre GitHub e Gitea, mas não elimina a
> responsabilidade operacional: você precisa provisionar, atualizar e escalar seus próprios
> `act_runner`s — não existe um "runner gerenciado" gratuito por trás, como acontece no
> GitHub.com.
