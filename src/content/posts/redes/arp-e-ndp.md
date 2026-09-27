---
title: "ARP e NDP: descobrindo vizinhos na rede"
description: "Como um host descobre o endereço MAC correspondente a um IP na mesma rede local."
date: 2026-09-03
updatedDate: 2026-09-03
---

## ARP — Address Resolution Protocol (IPv4)

Descobre qual endereço MAC corresponde a um determinado IPv4 dentro do enlace local.

```
Host A: "Quem possui 192.168.1.20?" (ARP Request, broadcast)
Host B: "192.168.1.20 está em AA:BB:CC:DD:EE:FF" (ARP Reply, unicast ao solicitante)
```

- **ARP Request**: normalmente enviado em broadcast Ethernet no domínio local.
- **ARP Reply**: resposta normalmente unicast, direcionada ao solicitante.
- **ARP Cache**: tabela temporária com associações IP ↔ MAC, evitando repetir a consulta a
  cada pacote.

## Quando o destino está em outra rede

O host não precisa descobrir o MAC do host remoto diretamente — ele descobre o MAC do
**gateway padrão** e envia o quadro para ele. O IP de destino pode ser remoto; o MAC de
destino no quadro Ethernet é sempre o próximo salto local.

```
Host → MAC do Gateway → Roteador → Rede Remota
```

## Gratuitous ARP e ARP Spoofing

- **Gratuitous ARP**: o host anuncia ou verifica sua própria associação de endereço, usado
  para atualização de caches, detecção de conflitos e failover.
- **ARP Spoofing**: um atacante envia associações ARP falsas para manipular o cache ARP de
  outros hosts, causando interceptação ou redirecionamento de tráfego — um ataque clássico de
  camada 2.

## NDP — Neighbor Discovery Protocol (IPv6)

Baseado em ICMPv6, substitui as funções do ARP no mundo IPv6, além de descoberta de
roteadores, resolução de endereços de enlace, detecção de endereços duplicados e descoberta
de prefixos.

### Mensagens importantes

- **Neighbor Solicitation (NS)**: solicita informação de vizinho/endereço.
- **Neighbor Advertisement (NA)**: responde anunciando a informação.
- **Router Solicitation (RS)**: host solicita anúncios do roteador.
- **Router Advertisement (RA)**: roteador anuncia prefixos e parâmetros.

## Comparação rápida

| | ARP | NDP |
|---|---|---|
| Versão IP | IPv4 | IPv6 |
| Mecanismo | Broadcast Ethernet | Multicast + ICMPv6 |

> Para alcançar um destino remoto em Ethernet, o host normalmente resolve o **MAC do gateway**,
> não o MAC do host remoto — o IP de destino permanece o mesmo fim a fim, mas o MAC de destino
> muda a cada salto até chegar à rede final.
