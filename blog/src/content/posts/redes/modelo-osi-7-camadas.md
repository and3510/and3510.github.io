---
title: "Modelo OSI: as 7 camadas de comunicação"
description: "O modelo de referência que organiza toda a pilha de protocolos de rede em responsabilidades bem definidas."
date: 2026-09-27
prerequisites: [redes/redes-fundamentos-topologias-e-tipos]
related: [redes/modelo-tcpip-camadas-e-protocolos]
---

## As sete camadas

```
7. Aplicação    — HTTP, DNS, SMTP, FTP
6. Apresentação — codificação, compressão, criptografia
5. Sessão       — estabelecer, manter e encerrar sessões
4. Transporte   — TCP, UDP, portas, fim a fim
3. Rede         — IP, roteamento, endereçamento lógico
2. Enlace       — MAC, quadros, switch
1. Física       — bits, sinais, cabos, conectores
```

## Encapsulamento e desencapsulamento

Ao descer as camadas na origem, os dados recebem cabeçalhos (e às vezes trailers) em cada etapa: **Dados → Segmento → Pacote → Quadro → Bits**. No destino, o processo é o inverso: cada camada remove seu cabeçalho correspondente ao subir.

## Macete de prova: cada camada tem sua unidade

- Camada 4 (Transporte) = porta
- Camada 3 (Rede) = IP
- Camada 2 (Enlace) = MAC
- Camada 1 (Física) = bit

## Dispositivos por camada

- **Hub/Repeater**: Camada 1 (Física). Só repete o sinal, sem inteligência.
- **Switch Ethernet**: Camada 2 (Enlace). Encaminha por endereço MAC.
- **Roteador**: Camada 3 (Rede). Encaminha por endereço IP.

## Pegadinhas comuns

- **HTTP pertence à camada de Aplicação**, não à de Transporte.
- **TCP pertence à camada de Transporte**, não à de Aplicação.
- **Roteamento está associado à camada de Rede**, não à de Enlace.

O OSI é um modelo de referência com sete camadas; o TCP/IP, que vem no próximo post, resume isso em quatro. Nenhum protocolo real segue o OSI à risca. Ele serve para pensar em responsabilidades, e não como implementação literal.
