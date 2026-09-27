---
title: "IPv4: endereçamento essencial"
description: "Como 32 bits identificam cada dispositivo de uma rede — a base de todo roteamento IPv4."
date: 2026-10-21
updatedDate: 2026-10-21
---

## Estrutura do endereço

IPv4 usa endereços de **32 bits**, escritos como quatro octetos decimais (0-255) separados
por ponto.

```
192   .   168   .   10   .   25
1º octeto  2º octeto  3º octeto  4º octeto

Forma binária: 11000000.10101000.00001010.00011001
```

Total teórico de endereços: 2³² = 4.294.967.296 — insuficiente para o crescimento da internet,
o que motivou o desenvolvimento do IPv6 (visto em outro post).

## Rede, host e broadcast

Em uma rede `192.168.10.0/24`:

- **Endereço de rede**: `192.168.10.0` — todos os bits de host em zero.
- **Endereço de broadcast**: `192.168.10.255` — todos os bits de host em um.
- **Hosts utilizáveis**: geralmente rede e broadcast não são atribuídos a dispositivos
  (exceção: redes ponto a ponto `/31`).

## Endereços privados (RFC 1918)

```
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16
```

Não são roteados diretamente na internet pública — precisam de NAT para acessar redes
externas.

> `172.0.0.0/8` inteiro **não é** privado. Apenas `172.16.0.0` até `172.31.255.255`
> (equivalente a `172.16.0.0/12`) são endereços privados — uma pegadinha clássica de prova.

## Faixas especiais

- **0.0.0.0**: "endereço não especificado", usado pelo host na inicialização (ex: requisição
  DHCP).
- **255.255.255.255**: broadcast limitado, enviado a todos os hosts na rede local.
- **127.0.0.0/8**: loopback, referência ao próprio host (`127.0.0.1` é o exemplo típico).
- **169.254.0.0/16**: link-local/APIPA, usado quando não há servidor DHCP disponível.

## Classes A/B/C: histórico

As classes A (`/8`), B (`/16`) e C (`/24`) definiam tamanhos fixos de rede. Hoje o roteamento
usa **CIDR** (Classless Inter-Domain Routing), sem essa rigidez — classes são conceito
histórico, não a forma como redes modernas realmente são definidas.

> `/24` corresponde à máscara `255.255.255.0` — essa é a correspondência entre prefixo CIDR e
> máscara decimal que mais aparece em provas e no dia a dia de configuração de rede.
