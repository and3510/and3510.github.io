---
title: "DHCP: configuração automática de rede"
description: "Como um dispositivo novo na rede recebe IP, máscara, gateway e DNS sem intervenção manual."
date: 2026-11-05
updatedDate: 2026-11-05
---

## O que o DHCP fornece

**Dynamic Host Configuration Protocol** fornece automaticamente parâmetros de rede: endereço
IP, máscara/prefixo, gateway padrão, servidores DNS e tempo de concessão (lease).

```
Cliente novo → "Preciso de configuração!" → Servidor DHCP → IP + Máscara + Gateway + DNS
```

## DORA: a sequência do DHCP

```
DISCOVER → OFFER → REQUEST → ACK
```

- **Discover**: cliente procura servidores DHCP disponíveis (broadcast).
- **Offer**: servidor oferece uma configuração possível.
- **Request**: cliente solicita formalmente a oferta escolhida.
- **Ack**: servidor confirma a concessão.

Macete para lembrar a ordem: **DORA** — Discover, Offer, Request, Acknowledge.

## Conceitos operacionais

- **Lease (concessão)**: o endereço é fornecido por um período determinado; o cliente tenta
  renovar antes do vencimento.
- **Pool/Escopo**: faixa de endereços que o servidor pode distribuir (ex:
  `192.168.10.100–200`).
- **Reserva**: um cliente específico recebe sempre o mesmo endereço, geralmente baseado no
  MAC — útil para impressoras e equipamentos que precisam de previsibilidade sem configuração
  manual.
- **Exclusão**: endereços dentro do escopo que não devem ser distribuídos dinamicamente
  (reservados para gateway, servidores configurados manualmente).

## DHCP Relay

Broadcasts iniciais do cliente normalmente não atravessam roteadores. O **DHCP Relay**
encaminha mensagens DHCP entre clientes e um servidor localizado em outra rede.

```
Cliente → Broadcast → Roteador/Relay → Servidor DHCP (rede diferente)
```

## Portas e DHCPv6

- **DHCPv4**: servidor usa UDP 67, cliente usa UDP 68.
- **DHCPv6**: possui mecanismo próprio, com portas UDP 547 (servidor) e 546 (cliente). IPv6
  também pode usar SLAAC como alternativa/complemento ao DHCPv6.

## APIPA e link-local

Em alguns sistemas, a ausência de DHCP ou configuração manual resulta em um endereço
autoconfigurado na faixa `169.254.0.0/16` — sinal de que a concessão DHCP falhou.

> DHCP e DNS são serviços diferentes: DHCP **fornece configuração de rede**; DNS **resolve
> nomes**. DHCP Relay permite que um único servidor atenda clientes em sub-redes diferentes,
> sem precisar de um servidor DHCP dedicado em cada segmento.
