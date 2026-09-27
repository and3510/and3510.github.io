---
title: "Filas, Pub/Sub e Event-Driven Architecture"
description: "Como desacoplar sistemas no tempo e na responsabilidade usando mensageria em vez de chamadas diretas."
date: 2026-07-20
updatedDate: 2026-07-20
---

## Por que usar mensageria

Chamar um serviço diretamente acopla disponibilidade, velocidade e responsabilidade entre
quem chama e quem responde. Mensageria desacopla essas dimensões: o produtor publica uma
mensagem e segue em frente, sem esperar o processamento terminar.

```
API recebe pedido → coloca mensagem na fila → responde ao usuário → processamento acontece depois
```

## Fila (queue) vs Pub/Sub

- **Queue**: cada mensagem é processada por **um** consumidor do grupo — modelo de
  distribuição de trabalho (work queue).
- **Pub/Sub**: um evento publicado em um **tópico** é entregue a **todos** os subscribers
  inscritos — um evento, vários consumidores independentes.

```
Pedido Criado → Topic → Estoque
                     → E-mail
                     → Analytics
```

## Garantias de entrega

- **At-most-once**: a mensagem pode ser perdida, mas nunca duplicada. Simples, mas não
  garante entrega.
- **At-least-once**: a mensagem será entregue pelo menos uma vez, podendo haver duplicatas —
  exige que o consumidor seja idempotente.
- **Exactly-once**: processada exatamente uma vez. Difícil de garantir de ponta a ponta;
  geralmente alcançado combinando idempotência, deduplicação e transações no consumidor.

> Não trate "exactly-once" como mágica gratuita da plataforma de mensageria — na prática, é
> quase sempre at-least-once mais idempotência bem projetada no lado do consumidor.

## Padrões operacionais

- **ACK (acknowledgment)**: confirmação de que a mensagem foi processada. Sem ACK, ela volta
  para a fila para ser reprocessada.
- **Retry com backoff exponencial**: espaçar as tentativas (1s → 2s → 4s → 8s) evita
  sobrecarregar um sistema já com problema.
- **DLQ (Dead Letter Queue)**: mensagens que falham persistentemente vão para uma fila
  separada, evitando loop infinito de retries e permitindo análise posterior.
- **Ordering**: preservar ordem reduz paralelismo — quando a ordem importa, mensagens da
  mesma chave geralmente precisam ir para a mesma partição.

## Eventual consistency

Em arquiteturas orientadas a eventos, componentes diferentes podem refletir o novo estado com
atraso — o sistema converge, mas não instantaneamente. Isso é uma troca consciente:
disponibilidade e desacoplamento em vez de consistência imediata.

> Pub/Sub e fila resolvem problemas diferentes, mesmo parecendo similares: fila distribui
> trabalho entre consumidores concorrentes; pub/sub replica o mesmo evento para múltiplos
> assinantes independentes que reagem de formas diferentes.
