---
title: "Estratégias de deploy: Rolling, Blue-Green e Canary"
description: "Como reduzir o risco de cada implantação escolhendo a estratégia certa para o cenário."
date: 2026-07-15
updatedDate: 2026-07-15
---

## Rolling Update

Substitui instâncias antigas pelas novas gradualmente, sem duplicar o ambiente inteiro.

```
V1 V1 V1 V1 → V2 V1 V1 V1 → V2 V2 V1 V1 → V2 V2 V2 V2
```

Simples e não exige infraestrutura extra, mas durante o rollout as duas versões coexistem —
a aplicação e o banco de dados precisam suportar compatibilidade entre V1 e V2 ao mesmo tempo.

## Blue-Green

Mantém dois ambientes completos: **Blue** (versão atual, recebendo tráfego) e **Green**
(versão nova, em teste). Após validar, o roteador/load balancer troca todo o tráfego de uma
vez para o Green.

- Rollback é praticamente instantâneo: basta apontar o tráfego de volta para o Blue.
- Custo: manter dois ambientes completos, ao menos durante a transição.

## Canary

A nova versão recebe uma fração pequena do tráfego real, que aumenta progressivamente
conforme a confiança cresce (5% → 25% → 50% → 100%).

```
V1 = 95%, V2 = 5%  →  V1 = 75%, V2 = 25%  →  V1 = 50%, V2 = 50%  →  V2 = 100%
```

Reduz o **blast radius** de um bug — se algo der errado, só uma fração pequena dos usuários é
afetada. Mas canary sem observabilidade real (métricas de erro, latência, conversão) é
"rollout às cegas": você está expondo usuários reais sem conseguir medir o impacto.

## Comparando com feature flags

Deploy (colocar código novo em produção) e release (liberar uma funcionalidade para usuários)
são conceitos diferentes. **Feature flags** desacoplam os dois: o código pode estar em
produção, desligado, e ser ativado depois sem novo deploy — útil para separar risco técnico
de risco de produto.

## Escolha rápida

- **Rolling**: simples, gradual, quando duplicar o ambiente é caro.
- **Blue-Green**: quando você precisa de rollback instantâneo e pode pagar por dois ambientes.
- **Canary**: quando você quer validar com tráfego real antes de expandir, e tem
  observabilidade para embasar a decisão.

> Nenhuma estratégia de deploy resolve migração de dados sozinha. Mudanças de schema de banco
> em rolling/blue-green/canary exigem o padrão **expand and contract**: primeiro adicionar a
> nova estrutura compatível com o código antigo, migrar os consumidores, e só depois remover
> a estrutura antiga.
