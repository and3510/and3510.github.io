---
title: "Serverless e FaaS: código sob demanda"
description: "Servidores continuam existindo — o que muda é quem gerencia a infraestrutura e como você paga por ela."
date: 2026-07-19
updatedDate: 2026-07-19
---

## Serverless não significa sem servidor

Existem servidores rodando o código — o que muda é que o cliente não gerencia diretamente a
infraestrutura no mesmo nível de um IaaS. **FaaS (Function as a Service)** é o modelo mais
comum de serverless: você entrega uma função que executa em resposta a um evento (HTTP,
mensagem em fila, arquivo criado, agendamento).

```
Evento → Função acorda → 1 instância → escala automaticamente → 0 instâncias (scale to zero)
```

## Características principais

- **Scale to zero**: sem tráfego, o provedor pode reduzir instâncias a zero, e você não paga
  nada. É a principal vantagem de custo do modelo.
- **Cold start**: a primeira execução após um período de inatividade pode ter latência extra,
  porque o ambiente precisa ser inicializado do zero.
- **Stateless por padrão**: a função não deve depender de memória local ou disco para estado
  duradouro — use banco, storage ou cache externos.
- **Execução limitada**: tempo máximo de execução, memória e tamanho de payload são
  restritos pela plataforma, o que naturalmente desencoraja workloads de longa duração.

## Quando não é a escolha ideal

- Execução longa e previsível (workloads que rodam continuamente se beneficiam mais de
  containers de longa duração).
- Latência ultrabaixa e consistente exigida (cold start é imprevisível).
- Necessidade de controle profundo sobre runtime, SO ou rede.

## Padrões importantes

- **Idempotência**: funções devem suportar reprocessamento sem gerar efeito duplicado (ex:
  cobrança repetida), porque falhas podem causar reentrega do mesmo evento.
- **Dead Letter Queue (DLQ)**: eventos que falham repetidamente vão para uma fila separada,
  para análise e reprocessamento manual em vez de ficarem tentando indefinidamente.
- **BaaS (Backend as a Service)**: autenticação, banco, storage e mensageria gerenciados que
  frequentemente acompanham arquiteturas serverless, complementando o FaaS.

> Vendor lock-in é uma preocupação real em serverless: a integração profunda com triggers e
> serviços proprietários de um provedor específico costuma ser mais difícil de portar do que
> uma aplicação containerizada tradicional. Vale considerar isso na decisão, não só o custo
> operacional imediato.
