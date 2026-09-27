---
title: "Services: expondo Pods na rede"
description: "ClusterIP, NodePort e LoadBalancer — como o Kubernetes roteia tráfego para Pods que mudam de IP o tempo todo."
date: 2026-02-17
updatedDate: 2026-02-17
---

## O problema que o Service resolve

Pods têm IPs efêmeros: a cada recriação, o IP muda. Um **Service** cria um endereço estável e
faz o balanceamento de carga entre os Pods que casam com um `selector`.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - port: 80
      targetPort: 80
  type: ClusterIP
```

## Tipos de Service

- **ClusterIP** (padrão): expõe o serviço apenas dentro do cluster.
- **NodePort**: abre uma porta fixa (30000-32767) em todos os nós, útil para testes.
- **LoadBalancer**: provisiona um balanceador externo (normalmente via cloud provider).
- **ExternalName**: mapeia o Service para um DNS externo, sem proxy de tráfego.

```yaml
spec:
  type: LoadBalancer
  ports:
    - port: 443
      targetPort: 8443
```

## Descoberta de serviço

Dentro do cluster, qualquer Pod pode resolver o Service pelo nome DNS:

```
nginx-service.default.svc.cluster.local
```

O `kube-proxy` mantém as regras de roteamento (iptables ou IPVS) atualizadas em cada nó,
redirecionando o tráfego para os Pods saudáveis por trás do Service — sem que o cliente
precise saber quais Pods existem.
