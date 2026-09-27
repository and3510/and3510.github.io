---
title: "Horizontal Pod Autoscaler (HPA)"
description: "Escalando réplicas automaticamente com base em CPU, memória ou métricas customizadas."
date: 2026-03-31
updatedDate: 2026-03-31
---

## O que o HPA faz

O **HPA** ajusta o número de réplicas de um Deployment (ou StatefulSet) automaticamente,
com base em métricas observadas — o mais comum é uso de CPU.

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: app-deployment
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

Pré-requisito: o **metrics-server** precisa estar instalado no cluster, e o Deployment
precisa ter `resources.requests.cpu` definido — o HPA calcula utilização como percentual do
request, não um valor absoluto.

## Métricas customizadas

Além de CPU/memória, é possível escalar por métricas externas (fila de mensagens, latência,
requisições por segundo) via **Prometheus Adapter** ou **KEDA**:

```yaml
metrics:
  - type: Pods
    pods:
      metric:
        name: http_requests_per_second
      target:
        type: AverageValue
        averageValue: "100"
```

## Comportamento de scale up/down

```yaml
behavior:
  scaleDown:
    stabilizationWindowSeconds: 300
  scaleUp:
    stabilizationWindowSeconds: 0
    policies:
      - type: Percent
        value: 100
        periodSeconds: 15
```

A `stabilizationWindowSeconds` no scale down evita **flapping**: sem essa janela, um pico
breve de tráfego pode subir e derrubar réplicas repetidamente em minutos, gerando
instabilidade em vez de economia.

> HPA escala o número de Pods (horizontal). Para ajustar requests/limits de um Pod já
> existente, o recurso equivalente é o **VerticalPodAutoscaler (VPA)** — os dois não devem
> ser combinados na mesma métrica de recurso, pois competem entre si.
