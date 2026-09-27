---
title: "Threads: concorrência, paralelismo e sincronização"
description: "Threads são leves porque compartilham memória do processo — mas esse compartilhamento também é a fonte dos bugs mais difíceis."
date: 2026-08-07
updatedDate: 2026-08-07
---

## Processo x thread

Uma thread é um fluxo de execução dentro de um processo. Threads do mesmo processo
compartilham código, heap e arquivos abertos, mas cada uma tem sua própria pilha (stack) e
registradores.

| | Processo | Thread |
|---|---|---|
| Memória | Isolada | Compartilhada |
| Criação | Pesada | Leve |
| Troca de contexto | Cara | Mais barata |
| Falha | Não afeta outros | Pode derrubar todas |

## Concorrência x paralelismo

- **Concorrência**: progresso intercalado de múltiplas tarefas no mesmo intervalo de tempo
  (pode ser em um único núcleo).
- **Paralelismo**: execução literalmente simultânea, em núcleos diferentes.

Concorrência é sobre estrutura; paralelismo é sobre execução física ao mesmo tempo — é
possível ter concorrência sem paralelismo (um núcleo alternando entre tarefas).

## Race condition e seção crítica

Quando duas ou mais threads acessam e modificam dados compartilhados sem sincronização
adequada, o resultado final depende da ordem de execução — um bug notoriamente difícil de
reproduzir.

```
saldo = 100
Thread A: lê 100, soma 10, escreve 110
Thread B: lê 100, soma 20, escreve 120
Resultado esperado: 130 | resultado possível: 110 ou 120
```

A **seção crítica** é o trecho de código que acessa o recurso compartilhado e precisa de
exclusão mútua para manter a consistência.

## Mecanismos de sincronização

- **Mutex**: garante que apenas uma thread por vez acesse a seção crítica.
- **Semaphore**: como um mutex, mas com contador — permite até N threads simultâneas em vez
  de apenas uma.
- **Monitor**: abstração que encapsula dados compartilhados e a sincronização necessária para
  acessá-los, garantindo que apenas uma thread execute por vez dentro dele.

## Deadlock, starvation e livelock

- **Deadlock**: threads esperam recursos umas das outras, sem progresso — geralmente por
  exclusão mútua, posse-e-espera, ausência de preempção e espera circular ao mesmo tempo.
- **Starvation**: uma thread nunca obtém acesso ao recurso, mesmo sem estar travada.
- **Livelock**: threads reagem umas às outras continuamente, mudando de estado, mas sem
  progresso real — diferente de deadlock, onde ninguém se move.

> Memória compartilhada facilita comunicação entre threads, mas é exatamente isso que aumenta
> a necessidade de sincronização cuidadosa — locks mal usados travam o sistema, e locks
> insuficientes corrompem dados silenciosamente, sem erro explícito.
