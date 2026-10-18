---
title: "Scheduling: Affinity, Taints e Tolerations"
description: "Como influenciar onde o Kubernetes coloca cada Pod, além do comportamento padrão do scheduler."
date: 2026-07-30
updatedDate: 2026-07-30
prerequisites: [kubernetes/arquitetura-do-cluster, kubernetes/introducao-a-pods]
related: [kubernetes/probes-e-resource-limits]
---

## O que o Scheduler faz

O **Scheduler** seleciona o nó adequado para um Pod ainda não atribuído, considerando
recursos disponíveis, restrições, afinidades, taints e políticas de topologia. Ele decide
**onde**; quem de fato executa é o kubelet naquele nó.

## Resource Requests e Limits no scheduling

```yaml
resources:
  requests:
    cpu: "500m"
    memory: "512Mi"
```

O scheduler usa **requests** para decidir se um nó tem capacidade — é a reserva garantida
para posicionamento. Requests muito altos desperdiçam capacidade do cluster; requests muito
baixos causam sobrealocação e instabilidade quando o uso real excede o reservado.

## nodeSelector e Node Affinity

```yaml
nodeSelector:
  disk: ssd
```

```yaml
affinity:
  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
        - matchExpressions:
            - key: disk
              operator: In
              values: ["ssd"]
```

`nodeSelector` é a forma simples de exigir um nó com determinado label. Node Affinity permite
regras mais expressivas, incluindo preferências (não apenas exigências obrigatórias).

## Pod Affinity e Anti-Affinity

```yaml
affinity:
  podAntiAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchLabels:
            app: minha-app
        topologyKey: "kubernetes.io/hostname"
```

- **Pod Affinity**: aproxima Pods de outros Pods (ex: colocar aplicação perto do cache).
- **Pod Anti-Affinity**: separa réplicas entre nós ou zonas diferentes, aumentando
  resiliência — se um nó cair, nem todas as réplicas somem junto.

## Taints e Tolerations

Funcionam ao contrário de affinity: um **taint** marca um nó para repelir Pods que não
tenham a **toleration** compatível.

```bash
kubectl taint nodes node1 workload=gpu:NoSchedule
```

```yaml
tolerations:
  - key: "workload"
    operator: "Equal"
    value: "gpu"
    effect: "NoSchedule"
```

Macete para lembrar a direção: **taint repele, toleration tolera** — a toleration não força um
Pod a ir para aquele nó, apenas permite que ele seja considerado elegível.

## Erros comuns

- Requests incorretos: valores muito altos desperdiçam capacidade; muito baixos causam
  instabilidade sob carga real.
- Toleration não força scheduling no nó com taint — apenas permite; sem afinidade adicional, o
  Pod pode acabar em outro nó qualquer.

> Combinar múltiplas réplicas com pod anti-affinity e distribuição por zonas é a base prática
> de alta disponibilidade no Kubernetes — sem isso, o scheduler pode (por acaso) concentrar
> todas as réplicas de uma aplicação crítica no mesmo nó.
