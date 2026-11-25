---
title: "CI/CD: Integração, Entrega e Implantação Contínuas"
description: "A diferença entre CI, Continuous Delivery e Continuous Deployment e até onde cada um automatiza o pipeline."
date: 2026-09-27
related: [cloud/devops-cultura-calms-e-metricas-dora, cloud/cicd-estrategias-blue-green-canary-rolling, ci-cd/gitflow-trunk-based-e-versionamento-semantico]
---

## CI (Continuous Integration)

Desenvolvedores integram mudanças frequentemente em um repositório compartilhado, e cada mudança dispara validações automatizadas. Palavra-chave: integrar + validar.

```
Commit → Build → Test → Analyze → Package → Staging → Production
```

Etapas comuns: checkout, build, testes unitários, lint, análise estática, geração de artefato. Objetivos: detectar conflito cedo, dar feedback rápido, evitar grandes integrações tardias e dolorosas.

## Continuous Delivery x Continuous Deployment

- **Continuous Delivery**: o software passa por um pipeline automatizado e permanece em estado implantável. Colocar em produção pode depender de decisão manual, janela de negócio ou aprovação. Palavra-chave: pronto para deploy.
- **Continuous Deployment**: toda mudança aprovada por todos os gates do pipeline é implantada automaticamente em produção, sem intervenção manual. Palavra-chave: deploy automático.

Continuous Delivery não exige deploy automático em produção. E CI também não é só rodar o build: inclui integração, testes e feedback automatizado.

## Quality Gates

Critérios que uma mudança precisa atender para avançar no pipeline: testes aprovados, cobertura mínima, ausência de vulnerabilidade crítica, revisão de código aprovada. Um pipeline sem quality gates reais é só automação de deploy, não controle de qualidade contínuo.

## Testes no pipeline

- **Unitários**: validam unidades isoladas de código.
- **Integração**: validam a interação entre componentes.
- **Contrato**: validam que interfaces entre serviços continuam compatíveis.
- **End-to-end**: validam o fluxo completo da aplicação.
- **SAST (Static Application Security Testing)**: analisa código-fonte em busca de vulnerabilidades, sem executar a aplicação.
- **DAST (Dynamic Application Security Testing)**: testa a aplicação **rodando**, simulando ataques reais contra ela.
- **SCA (Software Composition Analysis)**: analisa dependências de terceiros em busca de vulnerabilidades conhecidas.
- **Secrets scanning**: procura tokens e chaves vazadas acidentalmente no código.

## Pipeline as Code e artefatos

- **Pipeline as Code**: o pipeline é definido em arquivo versionado. Traz revisão, histórico, padronização e reprodutibilidade, os mesmos benefícios de versionar infraestrutura ou aplicação.
- **Artifact**: o resultado produzido pelo build (pacote, binário, imagem, biblioteca).
- **Artifact Repository**: armazena artefatos versionados para rastreabilidade, reutilização e rollback.
- **Build once, deploy many**: o mesmo artefato validado deve percorrer todos os ambientes (staging, produção), quando possível. Rebuildar em cada ambiente traz de volta o risco de divergência.
- **Immutable artifact**: um artefato publicado não deve ser alterado depois; qualquer mudança gera uma nova versão, nunca uma edição in-place.

## Fail Fast

Etapas rápidas e baratas devem ocorrer cedo no pipeline. Rodar lint e testes unitários antes de um build pesado, por exemplo, economiza tempo ao falhar rápido em problemas simples.

## Rollback, Roll Forward e migração de banco

- **Rollback**: retornar à versão anterior de forma rápida e segura quando um problema é detectado.
- **Roll forward**: corrigir o problema e implantar uma nova versão à frente, em vez de voltar atrás.
- **Database migration**: o deploy da aplicação precisa considerar mudanças de schema. Alterações de banco costumam exigir estratégias compatíveis com múltiplas versões da aplicação rodando ao mesmo tempo durante a transição.

Resumindo: CI é integrar e validar o tempo todo, Delivery é estar sempre pronto para publicar e Deployment é publicar automaticamente.
