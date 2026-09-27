---
title: "Windows Failover Cluster: quorum, witness e failover"
description: "Como o Windows Server disponibiliza workloads críticos mesmo quando um nó falha."
date: 2026-09-30
updatedDate: 2026-09-30
---

## O que é um Failover Cluster

Um conjunto de servidores (**nodes**) que cooperam para disponibilizar workloads com alta
disponibilidade — se um node falha, outro assume automaticamente a **clustered role**
(File Server, Hyper-V VM, aplicações compatíveis).

```
Node 1 (indisponível) ──heartbeat──→ Node 2 (ativo)
        falha detectada → failover → Node 2 assume automaticamente
```

## Heartbeat e failover

O **heartbeat** monitora saúde e conectividade entre os nós. Falha de heartbeat **não
significa automaticamente** que a máquina física desligou — pode ser um problema de rede entre
os nós. Por isso o cluster depende também de mecanismos de quorum para decidir com segurança
quem deve assumir o serviço.

## Quorum e Witness

O **quorum** decide quantos "votos" são necessários para o cluster continuar operando,
evitando **split-brain** (partições isoladas achando, cada uma, que são o cluster ativo).

- **Node Majority**: maioria simples dos nós.
- **Node and Disk Majority**: nós + um disco testemunha.
- **Node and File Share Majority**: nós + um compartilhamento de arquivo testemunha.
- **Witness**: voto adicional (disk, file share ou cloud witness) que ajuda na decisão de
  quorum — o witness **não hospeda** o workload, apenas participa da votação.

> Witness participa do quorum; não é uma cópia do workload em execução. Achar que o witness
> "roda" o serviço em caso de falha é um engano comum sobre seu papel real.

## CSV — Cluster Shared Volumes

Permite que múltiplos nós acessem o mesmo volume compartilhado simultaneamente — cenário comum
em clusters de Hyper-V, onde várias VMs em nós diferentes precisam do mesmo storage.

## Live Migration x Failover

- **Live Migration**: movimento **planejado** de uma VM em execução, sem interrupção
  perceptível.
- **Failover**: reação **não planejada** a uma falha, com possível interrupção breve durante
  a transição.

## HA x DR

- **HA (High Availability)**: protege contra a falha de um componente local (um nó).
- **DR (Disaster Recovery)**: protege contra a perda de um ambiente/site inteiro.

Cluster de failover não substitui uma estratégia de disaster recovery — são camadas de
proteção complementares, para escopos de falha diferentes.

> Alta disponibilidade não substitui backup: corrupção de dados que se replica para todos os
> nós do cluster continua sendo um problema, independentemente de quantos nós existirem para
> assumir o serviço.
