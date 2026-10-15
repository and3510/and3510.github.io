---
title: "Observabilidade: métricas, logs e traces"
description: "Monitoramento responde perguntas conhecidas; observabilidade investiga o que você não esperava que fosse acontecer."
date: 2026-07-16
updatedDate: 2026-07-16
---

## Monitoramento x Observabilidade

Monitoramento responde perguntas que você já sabia que precisava fazer ("a CPU passou de
90%?"). **Observabilidade** vai além: permite investigar situações inesperadas ("por que só
os pagamentos de um fluxo específico ficaram lentos?") sem precisar ter instrumentado aquele
cenário exato de antemão. Monitoramento é parte da observabilidade, não o contrário.

## Os três sinais

- **Métricas**: valores numéricos agregados no tempo (requisições/s, latência, erros, uso de
  CPU). Baratas de armazenar, ótimas para gráficos, tendências e alertas.
- **Logs**: registros de eventos individuais. Respondem "o que aconteceu" com detalhe, mas
  custam mais para armazenar e buscar em escala.
- **Traces**: acompanham uma requisição através de múltiplos serviços distribuídos,
  respondendo "por onde ela passou" e onde o tempo foi gasto.

```json
{
  "timestamp": "2026-06-14T10:15:30Z",
  "level": "ERROR",
  "service": "pedido",
  "request_id": "abc123",
  "message": "Timeout ao acessar banco"
}
```

Um log estruturado como esse permite correlacionar com o `request_id` do trace e com o pico
de latência visto na métrica — os três sinais juntos contam a história completa.

## Traces em detalhe

Um **trace** representa a jornada completa de uma requisição; cada operação individual dentro
dela é um **span**. O `trace_id` permite juntar todos os spans do mesmo caminho, mesmo que
atravessem dezenas de serviços — essencial em arquiteturas de microsserviços.

```
Cliente → API Gateway → Serviço A → Serviço B → Banco
          [span]         [span]      [span]      [span]
              └──────────── trace_id ────────────┘
```

## Boas práticas

- Nunca logar senhas, tokens ou dados pessoais em texto claro.
- Definir cardinalidade com cuidado: usar `user_id` como label de métrica gera uma
  explosão de séries temporais e custo.
- Aplicar **sampling** em traces de alto volume — nem toda requisição precisa ser traçada
  integralmente, mas amostragem reduz também a capacidade de investigar casos raros.

> Métrica alerta, trace localiza o serviço problemático, log explica a causa exata. Tratar
> observabilidade como "guardar tudo para sempre" é o erro mais comum — o trade-off real é
> entre custo de retenção e profundidade de investigação disponível.
