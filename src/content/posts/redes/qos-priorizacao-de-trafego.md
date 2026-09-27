---
title: "QoS: priorização e qualidade de serviço"
description: "Quando o enlace está congestionado, QoS decide quem passa primeiro — mas não cria banda extra do nada."
date: 2026-09-23
updatedDate: 2026-09-23
---

## Por que QoS existe

Cada aplicação tem necessidades diferentes: voz é sensível a atraso e jitter, vídeo exige
largura de banda e estabilidade, backup consome muito tráfego mas tolera atraso maior. **QoS**
organiza e trata diferentes tráfegos conforme essa necessidade, especialmente sob congestão.

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

- **Classificação**: identifica o tráfego pelo que ele é (IP de origem/destino, porta,
  protocolo, aplicação, marcações existentes).
- **Marking**: atribui um indicador de classe/prioridade ao pacote — o exemplo mais comum é o
  **DSCP** no cabeçalho IP, ajudando dispositivos a reconhecer a prioridade esperada.

## Queueing (filas)

Sob congestão, pacotes aguardam em filas.

- **FIFO**: ordem de chegada, sem distinção de prioridade.
- **Priority Queue**: prioriza classes altas.
- **Weighted Queueing**: distribui largura de banda por pesos.

Prioridade absoluta deve ser controlada para evitar **starvation** de outras classes de menor
prioridade.

## Shaping x Policing

- **Shaping**: suaviza o tráfego excedente, armazenando temporariamente (buffer/fila) para
  respeitar uma taxa. Mnemônico: shaping segura e envia depois.
- **Policing**: aplica um limite e, geralmente, descarta ou remarca o tráfego que excede a
  política. Mnemônico: policing corta/remarca o que excede.

> Shaping e Policing não são a mesma coisa — Shaping tende a enfileirar o excedente; Policing
> tende a descartar/remarcar imediatamente.

## Conceitos complementares

- **QoS não cria banda** — apenas gerencia os recursos existentes de forma mais inteligente,
  ele prioriza, não multiplica capacidade.
- **Best Effort**: tratamento tradicional, sem garantias especiais — pacotes competem na fila
  sem priorização.
- **IntServ x DiffServ**: IntServ reserva recursos fim a fim por fluxo (garantia forte, pouco
  escalável); DiffServ usa classes e marcações por salto — mais escalável e amplamente usado
  na prática.
- **SLA**: pode definir metas de disponibilidade, latência, perda de pacotes e desempenho
  geral que o QoS ajuda a cumprir.

> Jitter é a variação do atraso; DSCP é a marcação da classe de tratamento esperado no
> cabeçalho IP. QoS classifica → marca → enfileira → prioriza → controla taxa — nessa ordem
> conceitual, não ao contrário.
