---
title: "DevOps: cultura, automação e as métricas DORA"
description: "O que é DevOps, o modelo CALMS e as quatro métricas DORA para medir entrega."
date: 2026-09-27
related: [cloud/sre-confiabilidade-e-toil, ci-cd/integracao-entrega-e-implantacao-continuas]
---

## O problema que o DevOps resolve

Tradicionalmente, desenvolvimento quer mudar rápido e operações quer estabilidade, objetivos que parecem opostos. **DevOps** propõe que é possível mudar rápido **com** estabilidade, integrando pessoas, processos e ferramentas ao longo de todo o ciclo: plan, code, build, test, release, deploy, operate, monitor.

## CALMS: o framework por trás da cultura

- **Culture**: colaboração e responsabilidade compartilhada, sem silos entre times.
- **Automation**: builds, testes, deploy e infraestrutura como código, reduzindo trabalho manual repetitivo.
- **Lean**: reduzir desperdício, lotes pequenos, fluxo contínuo em vez de grandes releases.
- **Measurement**: medir desempenho, qualidade e disponibilidade para decidir com dados.
- **Sharing**: compartilhar conhecimento e aprendizado entre times.

## As quatro métricas DORA

O DevOps Research and Assessment (DORA) identificou quatro métricas que correlacionam fortemente com alta performance de engenharia:

1. **Deployment Frequency**: com que frequência o time coloca código em produção.
2. **Lead Time for Changes**: tempo entre um commit e ele rodar em produção.
3. **Change Failure Rate**: percentual de deploys que causam incidente.
4. **Time to Restore Service**: tempo médio para recuperar um serviço após falha.

Times de elite fazem deploy múltiplas vezes ao dia, com lead time de horas e tempo de recuperação de minutos, não porque escrevem código perfeito, mas porque automatizam validação e reduzem o tamanho de cada mudança.

## Práticas que sustentam a cultura

- **Small batches**: mudanças pequenas são mais fáceis de revisar, testar e reverter.
- **Everything as code**: infraestrutura, políticas e pipelines versionados como o próprio código da aplicação.
- **You build it, you run it**: quem desenvolve também opera, o que aproxima a equipe das consequências reais de suas decisões técnicas.
- **Blameless postmortem**: analisar incidentes focando em sistema e processo, não em quem errou. Isso é o que faz as pessoas reportarem problemas cedo em vez de escondê-los.


DevOps também não quer dizer acabar com especialistas ou colocar os devs para fazer todo o trabalho de operações. A Platform Engineering existe justamente para dar a esses times ferramentas de autoatendimento, em vez de cada um montar a própria esteira de CI/CD.
