---
title: "Redes de computadores: fundamentos, topologias e tipos"
description: "Os conceitos base antes de qualquer protocolo: o que é uma rede, como os dispositivos se conectam e como o tráfego se propaga."
date: 2026-08-24
updatedDate: 2026-08-24
---

## O que é uma rede

Um conjunto de dispositivos capazes de se comunicar e compartilhar recursos — arquivos,
impressoras, bancos de dados, acesso à internet.

```
Notebook + Smartphone + Servidor → Switch → Roteador → Internet
```

- **Host**: qualquer dispositivo que envia e recebe dados na rede (computador, servidor,
  smartphone, impressora IP).
- **Protocolo**: regras que definem a comunicação (IP, TCP, HTTP, DNS).

## Tipos de rede por abrangência

- **PAN (Personal Area Network)**: muito curta, entre dispositivos pessoais (ex: Bluetooth).
- **LAN (Local Area Network)**: curta distância, geralmente privada (escritório, laboratório).
- **MAN (Metropolitan Area Network)**: abrangência metropolitana (cidade).
- **WAN (Wide Area Network)**: longa distância, entre cidades e países — a internet é o
  exemplo máximo.

## Topologias físicas

```
Estrela        Barramento       Anel            Malha
  *               ───┬───         ○─○            *-*
 /|\               │ │ │         │   │           |X|
* * *               ─┴─┴─         ○───○           *-*
```

A Ethernet moderna usa, na prática, topologia estrela com um switch central — mesmo que
logicamente pareça outra coisa.

## Formas de comunicação

- **Unicast**: de uma origem para um destino específico.
- **Broadcast**: de uma origem para todos os hosts da rede.
- **Multicast**: de uma origem para um grupo específico de destinos.
- **Anycast**: entrega ao host mais próximo dentro de um grupo (por métrica de roteamento).

## Métricas que definem qualidade de rede

- **Largura de banda (bandwidth)**: capacidade máxima teórica de dados que podem passar —
  análogo à largura de uma estrada.
- **Latência**: tempo que os dados levam para chegar — análogo ao tempo da viagem.
- **Throughput**: velocidade real de transferência de dados atingida na prática.
- **Jitter**: variação da latência ao longo do tempo — crítico para voz e vídeo em tempo real,
  mesmo quando a latência média parece aceitável.

> Alta largura de banda não implica necessariamente baixa latência — uma estrada larga não
> torna a viagem mais curta, só permite mais carros ao mesmo tempo. Confundir essas duas
> métricas é um erro comum ao diagnosticar problemas de rede.
