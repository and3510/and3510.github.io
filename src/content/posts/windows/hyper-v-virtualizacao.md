---
title: "Hyper-V: virtualização no Windows Server"
description: "Como o Hyper-V cria e isola máquinas virtuais, e as decisões que afetam performance e recuperação de desastre."
date: 2026-09-27
updatedDate: 2026-09-27
---

## Hyper-V é um hypervisor tipo 1

Apesar de rodar "dentro" do Windows na percepção do usuário, o Hyper-V é classificado como
hypervisor bare-metal (tipo 1) — as VMs são mediadas pelo hypervisor, não por um sistema
operacional hospedeiro convencional.

```
Hardware físico → Hyper-V Hypervisor → VM A, VM B, VM C → Sistemas operacionais convidados
```

- **Root/Parent Partition**: partição especial de gerenciamento, com acesso direto ao
  hardware.
- **Child Partitions**: partições das VMs, sem acesso direto ao hardware físico.
- **VMBus**: canal de comunicação de alta eficiência entre partições.

## VHD/VHDX e tipos de disco virtual

- **VHDX**: formato moderno, com mais capacidade e melhor resiliência que o VHD legado.
- **Fixed disk**: reserva a capacidade total antecipadamente.
- **Dynamically expanding disk**: cresce até o limite conforme necessário.
- **Differencing disk**: armazena apenas as alterações sobre um disco pai.

## Generation 1 x Generation 2

- **Generation 1**: legado, baseado em BIOS virtual — compatibilidade ampla.
- **Generation 2**: UEFI virtual, Secure Boot e hardware mais moderno. A escolha depende da
  compatibilidade do sistema operacional convidado.

## Virtual Switches

- **External**: conecta VMs à rede física externa.
- **Internal**: VMs entre si e com o host, sem sair para a rede física.
- **Private**: apenas VMs entre si, isoladas até do host.

Macete: **External = fora | Internal = host + VMs | Private = só VMs**.

## Checkpoints, migração e replicação

- **Checkpoint**: captura o estado de VM/discos para retorno posterior. Não substitui backup
  — muitos checkpoints acumulados aumentam complexidade e impacto de performance.
- **Live Migration**: move uma VM em execução, com mínima interrupção.
- **Storage Live Migration**: move o armazenamento com a VM ligada.
- **Hyper-V Replica**: replicação assíncrona para disaster recovery — **não é** a mesma coisa
  que um cluster de failover, que oferece alta disponibilidade local com failover automático.

## Memória dinâmica

- **Dynamic Memory**: RAM ajustável entre um mínimo e máximo configurados, conforme demanda.
- **Static Memory**: quantidade fixa durante toda a execução.
- **vCPU**: não significa necessariamente um núcleo físico dedicado — oversubscription de
  CPU/memória pode gerar contenção sob carga alta, exigindo monitoramento constante.

> Um Private Virtual Switch não conecta automaticamente ao host — ele isola completamente as
> VMs entre si, sem tráfego saindo nem entrando de/para o host físico. É a opção certa apenas
> quando esse isolamento total é o objetivo deliberado.
