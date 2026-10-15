---
title: "STP: Spanning Tree Protocol"
description: "Como manter redundância física entre switches sem que a rede entre em loop infinito de broadcast."
date: 2026-09-10
updatedDate: 2026-09-10
---

## Por que o STP existe

Redundância física entre switches é desejável para alta disponibilidade, mas múltiplos
caminhos ativos de camada 2 ao mesmo tempo podem gerar **loops** — e um loop de camada 2 é
especialmente perigoso porque quadros Ethernet não possuem um campo equivalente ao TTL do IP
para impedir circulação indefinida.

```
Sem STP: broadcast circula infinitamente, gerando loop
Com STP: redundância física permanece, mas a topologia lógica fica livre de loop
```

## Problemas causados por loops

- Broadcast storm (tempestade de broadcast).
- Múltiplas cópias do mesmo quadro chegando ao destino.
- Instabilidade da tabela MAC (o switch vê o mesmo MAC "trocando" de porta repetidamente).
- Indisponibilidade geral da rede.

## Como o STP funciona

**STP (IEEE 802.1D)** constrói uma árvore lógica sem ciclos sobre a topologia física
redundante.

1. **Root Bridge**: o switch eleito como raiz da árvore, com base no critério de menor
   Bridge ID (que envolve prioridade + identificador do switch).
2. **Root Port**: em cada switch não raiz, a porta com melhor caminho até a Root Bridge.
3. **Designated Port**: porta escolhida para encaminhar tráfego em determinado segmento.
4. **Porta Bloqueada/Não Designada**: caminho redundante é impedido de encaminhar tráfego
   normal, evitando o loop, mas permanecendo disponível como backup.

## BPDU e estados clássicos

Switches trocam **BPDUs (Bridge Protocol Data Units)** para construir e manter a topologia.
Estados clássicos do 802.1D: Blocking, Listening, Learning, Forwarding, Disabled.

- **Learning**: aprende endereços MAC.
- **Forwarding**: encaminha tráfego normalmente.

## RSTP: convergência mais rápida

**Rapid Spanning Tree Protocol (IEEE 802.1w)** oferece convergência bem mais rápida que o STP
clássico, com estados simplificados: Discarding, Learning, Forwarding.

## Convergência

O tempo/processo necessário para a rede recalcular um caminho válido após uma mudança de
topologia.

```
Link falha → STP recalcula → caminho redundante assume
```

O custo do STP é baseado na velocidade dos enlaces, conforme valores definidos pelo protocolo
— o caminho de menor custo total até a raiz é o preferido.

> STP não é um protocolo de roteamento — ele atua exclusivamente na prevenção de loops de
> camada 2. Confundir STP com roteamento é um erro comum; a Root Bridge é escolhida pelo
> menor Bridge ID, não pelo maior, o que também costuma inverter na hora da prova.
