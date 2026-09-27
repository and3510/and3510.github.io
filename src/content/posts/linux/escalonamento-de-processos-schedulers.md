---
title: "Escalonamento de processos: FCFS, SJF, Round Robin"
description: "Como o sistema operacional decide qual processo usa a CPU a seguir — e por que não existe um algoritmo perfeito."
date: 2026-08-04
updatedDate: 2026-08-04
---

## O objetivo do scheduling

O scheduler de CPU busca equilibrar vários objetivos ao mesmo tempo: boa utilização de CPU,
alta vazão (throughput), baixo tempo de espera, boa capacidade de resposta e justiça entre
processos. Não existe algoritmo perfeito para todos os cenários — cada um prioriza um
conjunto diferente desses objetivos.

## Métricas fundamentais

- **Turnaround time**: tempo total do processo no sistema (conclusão − chegada).
- **Waiting time**: tempo total esperando na fila de prontos.
- **Response time**: tempo desde a chegada até a primeira vez que o processo começa a
  executar.

## FCFS (First-Come, First-Served)

Executa na ordem de chegada, sem preempção. Simples, mas pode causar o **efeito comboio**: um
processo longo atrasa todos os que vieram depois dele, mesmo que sejam rápidos.

## SJF e SRTF (Shortest Job/Remaining Time First)

**SJF** escolhe sempre o processo com o menor próximo burst de CPU, minimizando o tempo médio
de espera sob essa suposição. **SRTF** é a versão preemptiva: sempre executa o processo com
menor tempo restante, mesmo que isso signifique interromper o que está rodando.

O problema prático é que estimar o tamanho do próximo burst com precisão é difícil na vida
real.

## Round Robin

Preemptivo, com um quantum de tempo fixo, alternando entre os processos prontos em rodízio.

```
Fila: P1 → P2 → P3 → P4 → P1 → ...
```

- Quantum muito grande aproxima o comportamento do FCFS.
- Quantum muito pequeno aumenta o overhead de trocas de contexto excessivas.

É uma boa escolha padrão para interatividade e justiça entre processos.

## Priority Scheduling e Aging

Escolhe o processo com maior prioridade. Pode ser preemptivo ou não. O risco é **starvation**
de processos de baixa prioridade — a técnica de **aging** aumenta gradualmente a prioridade
de um processo conforme ele espera, evitando que fique esquecido para sempre.

## Multilevel Queue e Multilevel Feedback Queue

- **Multilevel Queue**: várias filas de prioridades fixas, cada processo atribuído a uma
  fila específica, sem movimentação entre elas.
- **Multilevel Feedback Queue**: múltiplas filas com quantums diferentes, onde processos
  podem se mover entre filas conforme seu comportamento observado (ex: processos que usam
  muito I/O sobem de prioridade).

> SJF clássico é não-preemptivo; SRTF é a variante preemptiva do mesmo princípio. Confundir
> os dois é um erro comum — a diferença está exatamente em permitir ou não interromper um
> processo em execução quando um recém-chegado tem burst menor.
