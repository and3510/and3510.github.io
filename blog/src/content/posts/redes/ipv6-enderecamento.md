---
title: "IPv6: endereçamento e conceitos essenciais"
description: "Como o IPv6 resolve o esgotamento de endereços do IPv4 com um espaço de endereçamento absurdamente maior."
date: 2026-09-02
updatedDate: 2026-09-02
prerequisites: [redes/ipv4-enderecamento-essencial]
related: [redes/arp-e-ndp]
---

## Estrutura do endereço

IPv6 usa endereços de **128 bits**, escritos em 8 grupos de 16 bits em hexadecimal, separados
por dois-pontos.

```
2001:0db8:0000:0000:0000:ff00:0042:8329
```

## Regras de abreviação

1. **Remover zeros à esquerda** em cada grupo: `0db8` → `db8`, `0042` → `42`.
2. **`::` substitui uma sequência contínua de grupos zero**, mas só pode aparecer **uma vez**
   no mesmo endereço.

```
Resultado final: 2001:db8::ff00:42:8329
```

## Tipos de endereço

- **Unicast**: identifica uma única interface.
- **Multicast**: um emissor para um grupo — o IPv6 **não possui broadcast tradicional**,
  usando multicast para as funções correspondentes.
- **Anycast**: mesmo endereço atribuído logicamente a múltiplas interfaces; o roteamento
  entrega à instância considerada mais próxima segundo a métrica.

## Endereços especiais

- **Loopback**: `::1` (equivalente conceitual ao `127.0.0.1` do IPv4).
- **Unspecified**: `::` — representa um endereço não especificado.
- **Link-local**: `fe80::/10` — usado no enlace local, importante para descoberta de vizinhos
  e autoconfiguração, não roteado normalmente além do enlace.
- **Unique Local Address (ULA)**: `fc00::/7` — usado para comunicação interna, conceito
  próximo ao dos endereços privados do IPv4.
- **Prefixo /64**: muitas redes IPv6 usam 64 bits para prefixo de sub-rede e 64 bits para
  identificador de interface.

## SLAAC e DHCPv6

- **SLAAC (Stateless Address Autoconfiguration)**: permite que hosts configurem endereços
  usando informações anunciadas pelo roteador, sem precisar de um servidor DHCP.
- **DHCPv6**: também pode fornecer parâmetros e/ou endereçamento, dependendo do modo adotado.

## NDP substitui várias funções do ARP

**Neighbor Discovery Protocol (NDP)** substitui várias funções tradicionalmente realizadas
pelo ARP no IPv4, usando ICMPv6 — descoberta de vizinhos, de roteadores e resolução de
endereços.

> IPv6 não usa pontos decimais como formato padrão — utiliza representação hexadecimal
> separada por dois-pontos. E lembre-se: `::1` é loopback, `fe80::/10` corresponde a
> endereços link-local — confundir essas duas faixas é um erro comum em prova.
