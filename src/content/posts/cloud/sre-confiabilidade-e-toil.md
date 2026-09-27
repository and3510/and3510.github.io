---
title: "SRE: Engenharia de Confiabilidade de Sites"
description: "Como o SRE aplica engenharia de software aos problemas de operação, e por que reduzir toil é o objetivo central."
date: 2026-06-17
updatedDate: 2026-06-17
---

## O que é SRE

**Site Reliability Engineering (SRE)** trata operações como um problema de engenharia:
combina desenvolvimento de software, automação, observabilidade, resposta a incidentes e
gestão de capacidade para operar sistemas confiáveis em escala.

## SRE x DevOps

DevOps é a cultura e os princípios (colaboração, automação, feedback contínuo). SRE é uma
implementação concreta dessas ideias, com forte foco específico em confiabilidade. São
complementares, não concorrentes — muitas equipes praticam DevOps usando práticas de SRE.

## Toil: o inimigo do SRE

**Toil** é trabalho manual, repetitivo, automatizável, sem valor duradouro e que cresce
linearmente com o tamanho do sistema — reiniciar um serviço manualmente, corrigir a mesma
falha repetidas vezes, provisionar recursos à mão.

```
100 servidores exigindo ajuste manual mensal
        ↓ automatizar com código
Equipe investe o tempo liberado em melhoria estrutural
```

SRE busca reduzir toil sistematicamente para liberar tempo de "engineering work": automação,
melhoria de arquitetura, ferramentas, redução de falhas recorrentes.

## Cultura sem culpa

- **Blameless postmortem**: entender causas, linha do tempo e ações preventivas, sem apontar
  culpados. Isso incentiva as pessoas a reportar problemas cedo, em vez de escondê-los por
  medo.
- **Graceful degradation**: reduzir funcionalidade em vez de falhar totalmente — uma
  recomendação de produto indisponível não deveria derrubar o checkout inteiro.

## Práticas operacionais

- **Runbooks**: procedimentos documentados passo a passo para incidentes conhecidos.
- **On-call sustentável**: alertas devem ser acionáveis; excesso de alertas irrelevantes
  ("alert fatigue") reduz a atenção real quando algo crítico acontece.
- **Automated remediation**: alguns problemas podem ser corrigidos automaticamente (ex:
  reiniciar uma instância que falhou no health check), com limites e segurança bem definidos.

> SRE não é sinônimo de "time que fica só monitorando servidores". O foco real é usar
> engenharia — código, automação, dados — para que a operação em escala não dependa de
> heroísmo humano recorrente.
