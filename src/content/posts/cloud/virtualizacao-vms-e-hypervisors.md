---
title: "Virtualização: VMs, hypervisors e a base da nuvem"
description: "Como hypervisors tipo 1 e tipo 2 criam máquinas virtuais isoladas, e por que isso é a base de toda a cloud computing."
date: 2026-06-05
updatedDate: 2026-06-05
---

## O que é virtualização

Virtualização é a abstração dos recursos físicos (CPU, memória, disco, rede) para criar
ambientes lógicos independentes. O componente central é o **hypervisor**, camada que cria e
gerencia máquinas virtuais (VMs), alocando recursos e garantindo isolamento entre elas.

## Tipo 1 (bare metal) vs Tipo 2 (hosted)

- **Tipo 1**: roda direto sobre o hardware, sem sistema operacional intermediário. Menos
  camadas, mais eficiente — é o que servidores de produção e data centers usam (VMware ESXi,
  Hyper-V, KVM).
- **Tipo 2**: roda sobre um sistema operacional hospedeiro (VirtualBox, VMware Workstation).
  Mais simples para uso local e ambientes de teste, mas com overhead adicional.

```
Tipo 1                      Tipo 2
VM1  VM2  VM3                VM1  VM2  VM3
  Hypervisor                  Hypervisor
   Hardware                   Host OS
                               Hardware
```

## Conceitos operacionais

- **Overcommit**: alocar mais recursos virtuais do que fisicamente existem, apostando que nem
  todas as VMs usarão o pico ao mesmo tempo. Risco: contenção e perda de desempenho se a
  aposta falhar.
- **Live migration**: mover uma VM em execução entre hosts físicos com interrupção mínima —
  essencial para manutenção sem downtime.
- **Snapshot**: captura o estado de uma VM em um momento. Útil para testes e rollback rápido,
  mas **não substitui backup**: um snapshot corrompido junto com o disco original não salva
  nada.

## VM vs Container

| | VM | Container |
|---|---|---|
| Isolamento | Kernel próprio (guest OS completo) | Compartilha o kernel do host |
| Peso | Pesado (minutos para iniciar) | Leve (segundos) |
| Densidade | Menor | Maior |
| Uso típico | Isolamento forte, SOs diferentes | Microsserviços, escala rápida |

> VM escape — quando um processo malicioso rompe o isolamento do hypervisor e afeta o host ou
> outras VMs — é raro, mas grave: é a razão pela qual hypervisors recebem patches de segurança
> com a mesma prioridade que qualquer sistema operacional exposto à internet.
