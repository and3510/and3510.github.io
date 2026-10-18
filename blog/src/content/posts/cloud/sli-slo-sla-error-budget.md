---
title: "SLI, SLO, SLA e Error Budget: medindo confiabilidade"
description: "Como transformar 'o sistema está bom' em números concretos que orientam decisões de engenharia."
date: 2026-07-18
updatedDate: 2026-07-18
prerequisites: [cloud/sre-confiabilidade-e-toil]
related: [cloud/observabilidade-metricas-logs-traces, cloud/incidentes-self-healing-e-postmortem-blameless]
---

## As quatro siglas

- **SLI (Service Level Indicator)**: o que você está medindo. Exemplo: percentual de
  requisições HTTP bem-sucedidas.
- **SLO (Service Level Objective)**: a meta interna para o SLI. Exemplo: 99,9% das
  requisições bem-sucedidas em 30 dias.
- **Error Budget**: a falha permitida pelo SLO. `Error Budget = 100% - SLO`. Com SLO de
  99,9%, o orçamento de erro é 0,1%.
- **SLA (Service Level Agreement)**: o compromisso formal com o cliente, geralmente com
  consequências contratuais (créditos, penalidades) se não for cumprido. O SLA costuma ser
  mais frouxo que o SLO interno — isso dá margem de segurança antes de violar o contrato.

## O que 99,9% significa na prática

| Disponibilidade | Indisponibilidade por mês |
|---|---|
| 99% | ~7h12min |
| 99,9% | ~43min |
| 99,99% | ~4min19s |

Cada "nove" adicional custa desproporcionalmente mais em engenharia — daí a importância de
escolher um SLO realista para o negócio, não o número mais alto possível.

## Por que ter um error budget

Sem margem de falha definida, toda mudança parece arriscada e a equipe trava em excesso de
cautela. O error budget formaliza o equilíbrio: enquanto o orçamento não estiver consumido, o
time pode acelerar entregas; quando se aproxima do limite, a prioridade muda para
estabilidade antes de novas features.

```
Error Budget: 100% saudável → 20% atenção → 0% emergência (congelar releases)
```

## Cuidados ao definir SLOs

- **Latência importa por percentil, não média**: uma média de 200ms pode esconder 5% dos
  usuários esperando 3 segundos. `p95` e `p99` revelam a cauda da distribuição.
- **O SLO deve refletir experiência real do usuário**: CPU estável não significa que o
  checkout está funcionando — meça o que o usuário sente, não só o que o servidor reporta.
- **Considere dependências críticas**: um SLO de disponibilidade não pode ser mais otimista
  que o SLO do banco de dados do qual o serviço depende.

> 100% de disponibilidade é uma meta cara e, na prática, quase sempre irreal — cada tentativa
> de eliminar a última fração de falha custa exponencialmente mais que a anterior. O objetivo
> do SLO não é zero incidentes, é confiabilidade suficiente para o negócio, com margem
> conhecida para inovar.
