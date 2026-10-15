---
title: "Deployments e ReplicaSets"
description: "Como o Kubernetes garante réplicas e rollouts de aplicações usando Deployment e ReplicaSet."
date: 2026-06-26
updatedDate: 2026-06-26
---

## Por que não gerenciar Pods diretamente?

Pods são efêmeros: se um nó cai ou o Pod trava, ele não volta sozinho. Para manter um número
fixo de réplicas rodando, usamos um **Deployment**, que por sua vez cria e controla um
**ReplicaSet**.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.27
          ports:
            - containerPort: 80
```

## Deployment vs ReplicaSet

- O **ReplicaSet** garante que N réplicas de um Pod estejam sempre rodando.
- O **Deployment** gerencia ReplicaSets, permitindo rollout, rollback e histórico de versões.

Você raramente cria um ReplicaSet manualmente — o Deployment já cuida disso.

## Rollout e rollback

```bash
kubectl set image deployment/nginx-deployment nginx=nginx:1.28
kubectl rollout status deployment/nginx-deployment
kubectl rollout undo deployment/nginx-deployment
```

Por padrão, o Kubernetes faz um **rolling update**: sobe Pods novos e derruba os antigos aos
poucos, sem downtime, respeitando `maxSurge` e `maxUnavailable`.

```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 1
    maxUnavailable: 0
```

> `maxUnavailable: 0` garante que nunca haverá menos réplicas que o desejado durante o
> rollout, ao custo de exigir capacidade extra temporária no cluster.
