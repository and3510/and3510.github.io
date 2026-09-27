---
title: "Service Mesh: comunicação segura entre microsserviços"
description: "Como padronizar TLS mútuo, retries, observabilidade e políticas de tráfego sem reimplementar isso em cada serviço."
date: 2026-07-22
updatedDate: 2026-07-22
---

## O problema

Em uma arquitetura de microsserviços, cada serviço precisaria lidar sozinho com descoberta de
outros serviços, TLS, retries, timeouts, políticas de acesso e observabilidade. Replicar essa
complexidade em cada linguagem e time gera inconsistência e retrabalho.

## O que é Service Mesh

Uma camada dedicada de infraestrutura para gerenciar comunicação **leste-oeste** (serviço a
serviço), separada da lógica de negócio da aplicação.

```
Service A → [proxy] → Service B → [proxy] → Service C
```

- **Data Plane**: os proxies (geralmente sidecars) que de fato processam o tráfego —
  encaminhamento, mTLS, telemetria, políticas.
- **Control Plane**: distribui configuração e políticas para todos os proxies do mesh.

## Sidecar pattern

Cada Pod ganha um proxy companheiro (sidecar). A aplicação continua falando localmente com o
proxy, que controla toda a comunicação real com outros serviços — a aplicação não precisa
saber nada sobre TLS, retry ou descoberta de serviço.

```
Pod A: [App] ↔ [Proxy] ←── mTLS ──→ [Proxy] ↔ [App] :Pod B
```

## O que o mesh resolve

- **mTLS (mutual TLS)**: cada serviço autentica o outro, garantindo confidencialidade e
  identidade mútua — "serviço autentica serviço".
- **Traffic splitting**: divide tráfego entre versões de um serviço, útil para canary e
  migração gradual.
- **Fault injection**: injeta atraso ou erro controlado para testar a resiliência da
  aplicação antes que aconteça de verdade em produção.
- **Retries centralizados**: no proxy, não em cada aplicação — mas com cuidado, pois retries
  duplicados em várias camadas podem se somar.

## Service Mesh x API Gateway x Ingress

- **Ingress**: entrada HTTP/HTTPS externa para o cluster.
- **API Gateway**: tráfego externo (cliente → aplicação), pode incluir autenticação,
  rate limiting, agregação.
- **Service Mesh**: comunicação **interna** entre serviços, com políticas mais avançadas.

Os três podem coexistir na mesma arquitetura, cada um resolvendo uma camada diferente.

> Service mesh não substitui automaticamente vulnerabilidades da aplicação nem é obrigatório
> para toda arquitetura de microsserviços — ele adiciona CPU, memória, latência e uma curva de
> aprendizado operacional real. Vale a complexidade quando o número de serviços e a
> necessidade de políticas de tráfego justificam o investimento.
