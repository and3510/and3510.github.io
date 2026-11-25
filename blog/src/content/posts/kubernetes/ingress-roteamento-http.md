---
title: "Ingress: roteamento HTTP para o cluster"
description: "Como expor múltiplos serviços HTTP/HTTPS através de um único ponto de entrada."
date: 2026-09-27
prerequisites: [kubernetes/services-e-tipos]
related: [redes/http-x-https, redes/proxy-reverse-proxy-e-load-balancer]
---

## Por que Ingress e não só LoadBalancer?

Um Service `LoadBalancer` provisiona um balanceador por serviço, o que é caro e limitado a uma camada de rede (L4). O **Ingress** opera em L7 (HTTP/HTTPS) e permite rotear várias aplicações por host ou path através de um único IP externo.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
    - host: app.exemplo.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: app-service
                port:
                  number: 80
```

## Ingress Controller

O recurso Ingress é só uma descrição de regras. Quem de fato roteia o tráfego é o **Ingress Controller** (NGINX Ingress, Traefik, HAProxy, cloud-native como AWS ALB). Sem um controller instalado no cluster, o Ingress não faz nada.

```bash
kubectl get ingressclass
```

## TLS

```yaml
spec:
  tls:
    - hosts:
        - app.exemplo.com
      secretName: app-tls
```

O certificado fica num Secret do tipo `kubernetes.io/tls`. Em produção, o comum é automatizar a emissão com **cert-manager**, que integra com Let's Encrypt e renova certificados sozinho.

Dá para combinar roteamento por path (`/api`, `/admin`) e por host (`api.exemplo.com`, `admin.exemplo.com`) no mesmo Ingress, o que economiza balanceadores externos.
