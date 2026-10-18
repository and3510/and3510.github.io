---
title: "Ethernet, endereço MAC e switches"
description: "Como um switch aprende para onde encaminhar cada quadro, sem nenhuma configuração manual."
date: 2026-09-08
updatedDate: 2026-09-08
prerequisites: [redes/redes-fundamentos-topologias-e-tipos]
related: [redes/arp-e-ndp, redes/vlans-e-trunks, redes/spanning-tree-protocol-stp]
---

## Ethernet e o quadro

**Ethernet** é a família de tecnologias mais usada em redes locais cabeadas, atuando
principalmente nas camadas de enlace e física (padrões IEEE 802.3).

```
Destino MAC | Origem MAC | Tipo/Comprimento | Dados | FCS
  6 bytes       6 bytes         2 bytes      46-1500B  4 bytes
```

- **FCS (Frame Check Sequence)**: usado para detecção de erros no quadro.

## Endereço MAC

Identificador de enlace, normalmente representado por 48 bits em hexadecimal (6 octetos):
`00:1A:2B:3C:4D:5E`.

> MAC ≠ IP: MAC é o endereçamento do enlace local; IP é o endereçamento lógico para
> comunicação entre redes. Macete: **switch olha MAC; roteador olha IP**.

## Como o switch aprende

1. Observa o MAC de **origem** de cada quadro recebido.
2. Associa esse MAC à porta de entrada.
3. Registra a associação na tabela MAC/CAM.

```
MAC A → Porta 1
MAC B → Porta 2
MAC C → Porta 3
```

> O switch não aprende olhando o MAC de destino — ele aprende a partir do MAC de **origem**
> dos quadros recebidos. Essa é uma pegadinha clássica de prova.

## Comportamento de encaminhamento

- **Destino conhecido**: o switch encaminha o quadro apenas pela porta associada ao MAC de
  destino.
- **Destino desconhecido**: o switch realiza *flooding* — envia para todas as portas do
  domínio/VLAN correspondente, exceto pela porta de entrada.
- **Broadcast**: quadro endereçado a `FF:FF:FF:FF:FF:FF`, enviado a todas as portas do
  domínio de broadcast aplicável.

## Domínio de colisão x domínio de broadcast

- **Domínio de colisão**: região onde transmissões poderiam colidir em tecnologias
  compartilhadas — em Ethernet comutada full-duplex moderna, colisões praticamente não
  ocorrem mais como no Ethernet compartilhado antigo.
- **Domínio de broadcast**: conjunto de dispositivos que recebem broadcasts de camada 2.
  VLANs podem separar domínios de broadcast (assunto do próximo post).

## Hub x Switch

| | Hub | Switch |
|---|---|---|
| Camada | Física | Enlace |
| Comportamento | Repete sinal para todas as portas | Aprende MACs, encaminha seletivamente |
| Domínio de colisão | Compartilhado | Cada porta pode ser um domínio separado |

> Destino desconhecido gera flooding dentro do domínio de broadcast/VLAN correspondente — o
> switch encaminha primeiro procurando pelo destino conhecido; se não encontra, faz flooding
> como estratégia de fallback, não como comportamento padrão de toda transmissão.
