---
title: "Alta disponibilidade e escalabilidade em nuvem"
description: "Diferença entre escalar vertical e horizontalmente, e como eliminar pontos únicos de falha."
date: 2026-07-11
updatedDate: 2026-07-11
---

## Escalabilidade vertical vs horizontal

- **Vertical (scale up)**: aumentar CPU/memória de uma instância. Simples, mas tem teto
  físico e gera downtime na maioria dos casos (é preciso reiniciar a instância).
- **Horizontal (scale out)**: adicionar mais instâncias atrás de um balanceador de carga.
  Sem teto prático, mas exige que a aplicação seja **stateless** (sem estado guardado em
  memória local).

```
                 ┌──────────────┐
   requisições → │ Load Balancer│
                 └──────┬───────┘
             ┌──────────┼──────────┐
             ▼          ▼          ▼
        instância1  instância2  instância3
```

## Eliminando pontos únicos de falha (SPOF)

Alta disponibilidade não é sobre uma máquina nunca falhar — é sobre o sistema continuar
funcionando **quando** uma falha (inevitável) acontece.

- **Múltiplas zonas de disponibilidade (AZs)**: distribuir instâncias em pelo menos 2-3 AZs
  numa mesma região, para sobreviver à queda de um datacenter inteiro.
- **Banco de dados replicado**: réplica de leitura em outra AZ, com failover automático
  (Multi-AZ no RDS, réplicas síncronas no Cloud SQL, etc.).
- **Health checks no load balancer**: instâncias que falham o health check são removidas
  automaticamente da rotação, sem intervenção manual.

## Auto Scaling

```yaml
# exemplo conceitual de política de auto scaling
min_size: 2
max_size: 10
target_tracking:
  metric: cpu_utilization
  target_value: 60
```

O Auto Scaling Group mantém um mínimo de instâncias saudáveis mesmo sem carga (para
resiliência) e escala horizontalmente conforme a métrica alvo é ultrapassada — o mesmo
princípio do HPA no Kubernetes, aplicado a instâncias de VM.

## Estratégias de deploy sem downtime

- **Blue-green**: sobe um ambiente paralelo completo (green), testa, e só então troca o
  tráfego do ambiente antigo (blue) — rollback é instantâneo, basta apontar de volta.
- **Canary**: libera a nova versão para uma fração pequena do tráfego real antes de
  expandir para 100%, reduzindo o raio de impacto de um bug em produção.

> RTO (Recovery Time Objective) e RPO (Recovery Point Objective) devem ser definidos **antes**
> de desenhar a arquitetura de alta disponibilidade — eles é que determinam se réplica
> assíncrona é suficiente ou se é preciso replicação síncrona (com o custo de latência que
> isso implica).
