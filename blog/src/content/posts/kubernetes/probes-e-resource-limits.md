---
title: "Probes e resource limits: Pods saudáveis e previsíveis"
description: "Liveness, readiness, startup probes e como requests/limits afetam scheduling e estabilidade."
date: 2026-07-02
updatedDate: 2026-07-02
prerequisites: [kubernetes/introducao-a-pods]
related: [kubernetes/horizontal-pod-autoscaler, cloud/incidentes-self-healing-e-postmortem-blameless]
---

## Probes: os três tipos

O kubelet usa **probes** para decidir se um container está vivo, pronto para receber tráfego
ou ainda inicializando.

```yaml
spec:
  containers:
    - name: app
      livenessProbe:
        httpGet:
          path: /healthz
          port: 8080
        initialDelaySeconds: 10
        periodSeconds: 10
      readinessProbe:
        httpGet:
          path: /ready
          port: 8080
        periodSeconds: 5
      startupProbe:
        httpGet:
          path: /healthz
          port: 8080
        failureThreshold: 30
        periodSeconds: 2
```

- **livenessProbe**: se falhar, o kubelet **reinicia** o container. Use para detectar
  deadlocks ou travamentos irrecuperáveis.
- **readinessProbe**: se falhar, o Pod é **removido do Service** (para de receber tráfego),
  mas não é reiniciado. Use para dependências temporárias (ex: conexão com banco ainda
  subindo).
- **startupProbe**: protege aplicações com boot lento — enquanto ela não passar, liveness e
  readiness ficam suspensas, evitando restart prematuro.

> Confundir liveness com readiness é um erro comum: uma liveness probe apontando para uma
> dependência externa instável derruba o container em loop, quando o problema real pedia só
> tirar o Pod do balanceamento (readiness).

## Requests e Limits

```yaml
spec:
  containers:
    - name: app
      resources:
        requests:
          cpu: "250m"
          memory: "256Mi"
        limits:
          cpu: "500m"
          memory: "512Mi"
```

- **requests**: o que o scheduler reserva ao decidir em qual nó colocar o Pod. Afeta
  diretamente a capacidade de bin-packing do cluster.
- **limits**: teto de uso. Ultrapassar o limit de memória gera **OOMKill**; ultrapassar o de
  CPU apenas faz *throttling* (o container não é morto).

Sem `requests`/`limits`, um Pod pode consumir recursos de forma imprevisível e afetar
vizinhos no mesmo nó — em produção, defini-los é praticamente obrigatório, inclusive para
habilitar autoscaling (HPA) e QoS classes (`Guaranteed`, `Burstable`, `BestEffort`).
