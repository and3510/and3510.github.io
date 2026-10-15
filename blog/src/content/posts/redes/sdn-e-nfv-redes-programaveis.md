---
title: "SDN e NFV: redes programáveis e funções virtualizadas"
description: "Como software passou a controlar decisões de rede que antes exigiam appliances físicos dedicados."
date: 2026-09-25
updatedDate: 2026-09-25
---

## SDN — Software-Defined Networking

Ideia central: separar logicamente **Control Plane** e **Data Plane**, permitindo controle
programável da rede.

```
Aplicações → SDN Controller → Switch A, Switch B, Switch C
```

- **Control Plane**: decide políticas, caminhos e regras de encaminhamento.
- **Data Plane**: encaminha os pacotes na prática, conforme as regras recebidas.
- **Controller**: mantém uma visão centralizada logicamente da rede e programa os
  dispositivos — "centralizado logicamente" pode ser distribuído fisicamente por trás dos
  panos.

### Interfaces do controller

- **Northbound APIs**: conectam aplicações ao controller (automação, segurança, engenharia de
  tráfego).
- **Southbound interfaces**: conectam o controller aos dispositivos de rede. **OpenFlow** é um
  exemplo histórico importante — mas OpenFlow é uma opção, não sinônimo de SDN em geral.

### Benefícios

Automação, programabilidade, visão global, políticas consistentes, adaptação rápida a
mudanças.

## NFV — Network Functions Virtualization

Ideia central: funções tradicionalmente realizadas por appliances dedicados (firewall,
roteador, load balancer, IDS/IPS, gateway) passam a ser executadas **como software**.

```
Servidor físico → VMs/Containers → Firewall, Roteador, Load Balancer virtualizados
```

- **VNF (Virtual Network Function)**: implementação virtualizada de uma função de rede.
- **NFVI**: infraestrutura usada para executar as funções virtualizadas — compute, rede,
  armazenamento, virtualização.
- **Orquestração**: automatiza o deploy e o ciclo de vida das VNFs.

## SDN x NFV

São conceitos diferentes, mas **complementares**:

- **SDN**: foco no controle programável e no encaminhamento.
- **NFV**: foco na virtualização das funções de rede em si.

```
Exemplo conjunto:
1. NFV cria um firewall virtual.
2. SDN direciona determinado tráfego para passar por esse firewall.
```

## Service Function Chaining

Encadeia funções de rede virtualizadas em sequência (ex: Firewall → IDS → Load Balancer →
Serviço), permitindo que o tráfego atravesse múltiplas funções na ordem correta.

## SD-WAN

Aplicação dos princípios de controle baseado em software em WANs: política centralizada,
seleção dinâmica de caminhos, uso de múltiplos links. **SD-WAN não é sinônimo de SDN** — é uma
aplicação específica de princípios similares em um contexto de WAN.

> SDN não significa "rede sem hardware" — os dispositivos ainda encaminham tráfego
> fisicamente; o que muda é onde e como as decisões de controle são tomadas. E NFV não é
> simplesmente "criar VLANs" — é a execução virtualizada de funções de rede completas, um
> conceito bem mais amplo.
