---
title: "Memória virtual: paginação, TLB e page fault"
description: "Como cada processo enxerga seu próprio espaço de endereçamento e como a tradução para memória física funciona por baixo."
date: 2026-09-27
related: [linux/threads-concorrencia-e-sincronizacao]
---

## Por que memória virtual existe

Cada processo recebe seu próprio espaço de endereçamento lógico (virtual), isolado dos demais. Isso garante isolamento, proteção, flexibilidade e permite executar programas maiores que a RAM física disponível, através de técnicas de carregamento sob demanda.

```
Processo A: endereço X → frame físico 12
Processo B: endereço X → frame físico 40
```

O mesmo endereço virtual em processos diferentes aponta para posições físicas completamente diferentes. Endereço virtual não é o mesmo que endereço físico.

## Paginação, Page Table e TLB

A memória virtual é dividida em **páginas**; a memória física, em **frames** de mesmo tamanho. A **page table** mapeia cada página virtual ao seu frame físico correspondente.

```
CPU → endereço virtual → Page Table / TLB → memória física (frame)
```

A **TLB (Translation Lookaside Buffer)** é um cache de traduções recentes página→frame. Um acerto (hit) na TLB evita consultar a page table completa; um erro (miss) exige a consulta completa, mais lenta.

## Page fault

Ocorre quando o processo acessa uma página que não está presente na memória física no momento.

```
1. Processo acessa página ausente
2. Hardware detecta o page fault
3. Kernel assume o controle
4. Página é carregada do disco (removendo outra, se necessário)
5. Page table é atualizada
6. Instrução original é reiniciada
```

Page fault não é necessariamente um erro fatal. É parte normal do funcionamento da memória virtual sob demanda. Um **invalid page fault** (endereço fora do espaço do processo ou violação de permissão) é diferente e pode encerrar o processo.

## Thrashing

Quando o sistema gasta mais tempo trocando páginas entre disco e memória do que executando trabalho útil. É sintoma de memória física insuficiente para o conjunto de páginas ativamente usado (working set) pelos processos em execução.

## Fragmentação, segmentação e otimizações

- **Fragmentação interna**: espaço desperdiçado dentro de uma página alocada mas não totalmente usada.
- **Fragmentação externa**: espaço livre quebrado em pedaços pequenos, difíceis de reutilizar. É um problema mais comum em segmentação do que em paginação pura.
- **Huge pages**: páginas maiores (2MB, 1GB) reduzem overhead de page table e pressão sobre a TLB.
- **Copy-on-write**: páginas compartilhadas (ex: após `fork()`) só são copiadas de fato quando alguém as modifica, economizando memória.

A TLB não é um cache de dados comum. Ela guarda só traduções de endereço (página → frame), não o conteúdo das páginas.
