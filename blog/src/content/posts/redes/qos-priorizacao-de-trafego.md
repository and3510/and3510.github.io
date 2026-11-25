---
title: "QoS: priorização e qualidade de serviço"
description: "Como o QoS decide qual tráfego passa primeiro quando o enlace está congestionado."
date: 2026-09-27
prerequisites: [redes/modelo-tcpip-camadas-e-protocolos]
related: [redes/mpls-multiprotocol-label-switching]
---

## Por que QoS existe

Cada aplicação tem necessidades diferentes: voz é sensível a atraso e jitter, vídeo exige largura de banda e estabilidade, backup consome muito tráfego mas tolera atraso maior. **QoS** organiza e trata diferentes tráfegos conforme essa necessidade, especialmente sob congestão.

```
Enlace congestionado → QoS → fluxo priorizado e organizado
1. Voz primeiro
2. Aplicação crítica
3. Web
4. Backup
```

## Quatro indicadores essenciais

- **Bandwidth**: capacidade disponível para transmissão.
- **Latency**: tempo de entrega.
- **Jitter**: variação da latência.
- **Packet Loss**: percentual/quantidade de pacotes perdidos.

Mnemônico: voz odeia atraso, variação e perda.

## Classificação e marcação

- **Classificação**: identifica o tráfego pelo que ele é (IP de origem/destino, porta, protocolo, aplicação, marcações existentes).
- **Marking**: atribui um indicador de classe/prioridade ao pacote. O exemplo mais comum é o **DSCP** no cabeçalho IP, ajudando dispositivos a reconhecer a prioridade esperada.

## Queueing (filas)

Sob congestão, pacotes aguardam em filas.

- **FIFO**: ordem de chegada, sem distinção de prioridade.
- **Priority Queue**: prioriza classes altas.
- **Weighted Queueing**: distribui largura de banda por pesos.

Prioridade absoluta deve ser controlada para evitar **starvation** de outras classes de menor prioridade.

## Shaping x Policing

- **Shaping**: suaviza o tráfego excedente, armazenando temporariamente (buffer/fila) para respeitar uma taxa. Mnemônico: shaping segura e envia depois.
- **Policing**: aplica um limite e, geralmente, descarta ou remarca o tráfego que excede a política. Mnemônico: policing corta/remarca o que excede.

> Shaping e policing não são a mesma coisa. O shaping costuma enfileirar o excedente; o policing descarta ou remarca na hora.

## Conceitos complementares

- **QoS não cria banda**: apenas gerencia os recursos existentes de forma mais inteligente. Ele prioriza, não aumenta a capacidade.
- **Best Effort**: tratamento tradicional, sem garantias especiais. Pacotes competem na fila sem priorização.
- **IntServ x DiffServ**: IntServ reserva recursos fim a fim por fluxo (garantia forte, pouco escalável); DiffServ usa classes e marcações por salto, o que escala melhor e é o mais usado na prática.
- **SLA**: pode definir metas de disponibilidade, latência, perda de pacotes e desempenho geral que o QoS ajuda a cumprir.

Jitter é a variação do atraso; DSCP é a marcação da classe de tratamento no cabeçalho IP. A ordem do QoS é: classificar → marcar → enfileirar → priorizar → controlar a taxa.
