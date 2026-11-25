---
title: "ICMP, Ping e Traceroute"
description: "Como funcionam o ICMP, o ping e o traceroute, e o que um ping sem resposta realmente indica."
date: 2026-09-27
prerequisites: [redes/ipv4-enderecamento-essencial]
related: [linux/linux-networking-troubleshooting]
---

## O que é ICMP

**Internet Control Message Protocol** existe para diagnóstico, sinalização de erros e informação de condições de rede. ICMP não transporta dados de aplicação como TCP/UDP; é um protocolo de controle.

## Ping

```
Origem → ICMP Echo Request → Destino
Origem ← ICMP Echo Reply   ← Destino
```

Testa alcance e mede tempo aproximado de ida e volta.

- **RTT (Round-Trip Time)**: tempo de ida e volta.
- **Perda de pacotes**: quantos Echo Requests não obtiveram resposta.
- **Reachability**: se o destino está, de fato, alcançável por esse caminho.

## Se o ping falhar...

A ausência de resposta **não** significa necessariamente que o host está desligado. Causas possíveis:

- Firewall bloqueando ICMP.
- Rota ausente entre origem e destino.
- Política de segurança que descarta especificamente esse tipo de tráfego.
- Perda de pacote pontual na rede.

> Ping sem resposta não prova que o host está fora do ar. Só mostra que aquele teste específico falhou.

## Traceroute / tracert

Mostra os saltos do caminho até o destino, usando o comportamento do TTL (IPv4) ou Hop Limit (IPv6).

```
Host → R1 → R2 → R3 → Destino
TTL 1 → expira em R1
TTL 2 → expira em R2
TTL 3 → expira em R3
```

- **TTL (Time To Live)**: campo decrementado a cada roteador. Quando chega a zero, o pacote é descartado, normalmente gerando uma mensagem ICMP Time Exceeded. Foi criado para impedir loops eternos de roteamento.

## Mensagens ICMP importantes

- **Echo Request/Reply**: solicitação e resposta de eco (usadas pelo ping).
- **Destination Unreachable**: o destino ou recurso não é alcançável.
- **Time Exceeded**: TTL/Hop Limit expirou.
- **Redirect**: indicação de rota melhor em contextos específicos.

## Path MTU Discovery

Mecanismos de ICMP/ICMPv6 podem ajudar a descobrir o maior tamanho de pacote utilizável sem fragmentação inadequada no caminho. Isso é relevante no IPv4 quando a flag DF (Don't Fragment) está ativa e o pacote é grande demais para o próximo enlace.

O `ping` usa Echo Request/Reply; o `traceroute` vai aumentando o TTL/Hop Limit para descobrir o caminho salto a salto. São ferramentas parecidas, mas funcionam de jeito bem diferente por dentro.
