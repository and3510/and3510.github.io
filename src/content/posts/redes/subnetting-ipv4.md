---
title: "Subnetting IPv4: dividindo redes com máscaras"
description: "Como quebrar uma rede grande em sub-redes menores, e o cálculo que aparece em toda prova de redes."
date: 2026-10-24
updatedDate: 2026-10-24
---

## O que é subnetting

Divisão lógica de uma rede IP em redes menores, para organizar endereçamento, separar
segmentos, reduzir domínios de broadcast e apoiar segurança e roteamento.

## Prefixo CIDR e máscara

```
/n indica quantos bits são de rede. Prefixo maior → sub-rede menor.
```

| Prefixo | Máscara | Total de endereços |
|---|---|---|
| /24 | 255.255.255.0 | 256 |
| /25 | 255.255.255.128 | 128 |
| /26 | 255.255.255.192 | 64 |
| /27 | 255.255.255.224 | 32 |
| /28 | 255.255.255.240 | 16 |
| /29 | 255.255.255.248 | 8 |
| /30 | 255.255.255.252 | 4 |

Fórmula geral: total de endereços = `2^(32 - prefixo)`. Hosts utilizáveis tradicionais =
`2^(bits de host) - 2` (subtrai rede e broadcast — exceto em casos especiais como `/31` e
`/32`).

## Macete do salto

```
256 − valor da máscara no octeto relevante = tamanho do salto entre sub-redes
```

Exemplo: máscara `192` → `256 − 192 = 64`. As sub-redes no último octeto começam em
`0, 64, 128, 192`.

## Exemplo resolvido

IP: `192.168.10.70/26`

```
Tamanho do bloco: 64 endereços
Sub-redes no último octeto: 0-63 | 64-127 | 128-191 | 192-255

Rede = 192.168.10.64
Primeiro host = 192.168.10.65
Último host = 192.168.10.126
Broadcast = 192.168.10.127
```

## VLSM (Variable Length Subnet Mask)

Usa prefixos diferentes conforme a necessidade de cada sub-rede, evitando desperdiçar
endereços. Exemplo: um setor com 100 hosts precisa de `/25`; um enlace ponto a ponto com só 2
endereços úteis usa `/30`.

> `/26` não oferece 26 hosts — o número 26 no prefixo representa **bits de prefixo**, não
> quantidade de hosts. Uma rede `/26` tem 64 endereços totais e 62 hosts utilizáveis. Essa é a
> pegadinha mais comum de subnetting.
