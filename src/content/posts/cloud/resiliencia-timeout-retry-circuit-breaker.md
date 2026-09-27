---
title: "Resiliência: Timeout, Retry, Circuit Breaker e Bulkhead"
description: "Em sistemas distribuídos, falhar faz parte. O objetivo de engenharia é falhar sem derrubar tudo junto."
date: 2026-06-29
updatedDate: 2026-06-29
---

## O problema

Sistemas distribuídos enfrentam latência, timeouts, perda de rede, sobrecarga e
indisponibilidade parcial o tempo todo. O desafio não é evitar falhas — é evitar que a falha
de um componente derrube o sistema inteiro.

```
Serviço A → Serviço B (falha) → Serviço C
    ↑ timeout/retry    ↑ circuit breaker   ↑ bulkhead isola recursos
```

## Timeout e Retry

- **Timeout**: definir um tempo máximo de espera. Sem timeout, chamadas ficam presas
  consumindo threads e conexões indefinidamente.
- **Retry**: tentar novamente após falha transitória, útil para erros passageiros (timeout de
  rede momentâneo). Retry sem controle pode virar um ataque contra sua própria dependência já
  fragilizada.
- **Backoff exponencial com jitter**: aumentar o intervalo entre tentativas (1s → 2s → 4s →
  8s) e adicionar aleatoriedade evita que múltiplos clientes retentem simultaneamente e
  piorem a sobrecarga.

## Circuit Breaker

Funciona como um disjuntor elétrico: quando as falhas ultrapassam um limite, o circuito
**abre** e passa a rejeitar chamadas imediatamente (sem nem tentar), dando tempo para o
serviço dependente se recuperar.

```
CLOSED (fluxo normal) → falhas excessivas → OPEN (bloqueia chamadas)
OPEN → espera → HALF-OPEN (testa com poucas chamadas) → sucesso → CLOSED
```

## Bulkhead

Compartimentaliza recursos (pools de threads, conexões, filas) para que a falha de uma
dependência não consuma todos os recursos disponíveis e afete chamadas para outras
dependências — como compartimentos estanques em um navio.

## Fallback e degradação graciosa

Quando uma dependência falha, um **fallback** fornece uma alternativa segura: cache, valor
padrão, ou funcionalidade reduzida — em vez de propagar o erro para o usuário final. O
fallback deve ser seguro e nunca mascarar problemas críticos que precisam de atenção.

## Cuidado com retry em cadeia

```
Cliente tenta 3x → Gateway tenta 3x → Serviço tenta 3x = até 27 tentativas!
```

Retries em várias camadas se multiplicam. Defina orçamento de retry por requisição, não por
camada isolada, e prefira poucas camadas retentando.

> Circuit breaker não corrige a dependência com problema — ele protege quem está chamando,
> comprando tempo para o sistema se recuperar. Combinar timeout, retry com limite, circuit
> breaker e bulkhead é o que forma uma estratégia de resiliência completa; nenhum deles
> sozinho resolve tudo.
