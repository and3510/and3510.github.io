---
title: "TCP x UDP: confiabilidade x simplicidade"
description: "Diferenças entre TCP e UDP e quando usar cada um."
date: 2026-09-27
prerequisites: [redes/modelo-tcpip-camadas-e-protocolos]
related: [redes/http-x-https]
---

## TCP (Transmission Control Protocol)

Orientado à conexão, com entrega confiável por confirmação e retransmissão, ordenação de bytes, controle de fluxo, controle de congestionamento e comunicação full-duplex.

### Three-way handshake

```
Cliente → SYN     → Servidor
Cliente ← SYN-ACK ← Servidor
Cliente → ACK     → Servidor
```

Esse handshake estabelece a conexão antes de qualquer dado real trafegar. É o que dá ao TCP sua confiabilidade, ao custo de mais overhead que o UDP.

Usos típicos: HTTP/HTTPS, SSH, SMTP, transferência confiável de arquivos.

## UDP (User Datagram Protocol)

Sem estabelecimento de conexão, baseado em datagramas, menor cabeçalho/overhead. Não garante entrega, ordem, nem faz retransmissão nativa equivalente à do TCP.

Usos típicos: DNS (na maioria das consultas), VoIP, streaming em tempo real, jogos online, cenários em que um pacote perdido importa menos do que a latência de esperar retransmissão.

## Comparação rápida

| Aspecto | TCP | UDP |
|---|---|---|
| Conexão | Orientado à conexão | Sem conexão |
| Confiabilidade | Confiável | Sem garantia nativa |
| Ordem | Garantida | Não garantida |
| Overhead | Maior | Menor |

## Portas e sockets

TCP e UDP usam números de porta, mas em espaços separados. A porta 53/TCP e a porta 53/UDP são "endereços" distintos, mesmo compartilhando o mesmo número. Aplicações usam **sockets** para se comunicar: socket TCP é stream (fluxo contínuo), socket UDP é datagrama (mensagens discretas).

UDP não é sempre mais rápido. Ele tem menos overhead, mas o desempenho real depende da aplicação e da rede. E dá para implementar confiabilidade por cima do UDP quando precisa, como o QUIC faz no HTTP/3, sem virar TCP.
