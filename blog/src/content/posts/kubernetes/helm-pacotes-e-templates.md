---
title: "Helm: pacotes e templates para Kubernetes"
description: "Como evitar duplicar dezenas de manifests YAML entre ambientes usando charts parametrizados."
date: 2026-07-26
updatedDate: 2026-07-26
prerequisites: [kubernetes/deployments-e-replicasets, kubernetes/configmaps-e-secrets]
related: [kubernetes/argo-concept-e-importance]
---

## O problema

Uma aplicação real no Kubernetes pode ter dezenas de manifests: Deployment, Service,
ConfigMap, Ingress, Secret, HPA, RBAC. Sem abstração, manter isso consistente entre dev,
staging e produção significa duplicação e risco de divergência.

## Chart, Values e Release

```
Chart = pacote (molde)     Release = instância instalada (a partir do Chart)
```

- **Chart**: pacote Helm que descreve uma aplicação Kubernetes — templates, valores padrão e
  metadados.
- **values.yaml**: valores de configuração (número de réplicas, imagem, domínio, limites de
  CPU).
- **Templates**: manifests Kubernetes parametrizados.

```yaml
# template simplificado
spec:
  replicas: {{ .Values.replicas }}
  containers:
    - image: {{ .Values.image }}:{{ .Values.tag }}
```

```
Chart + Values → renderização → YAML final do Kubernetes → Release
```

## Ciclo de vida

```bash
helm install app-dev ./meu-chart -f values-dev.yaml
helm upgrade app-dev ./meu-chart -f values-dev.yaml
helm rollback app-dev 2
```

- **install**: cria uma nova release.
- **upgrade**: aplica nova versão ou configuração.
- **rollback**: volta para uma revisão anterior da release — o histórico de revisões é
  mantido automaticamente.

## Ambientes com values diferentes

```
values-dev.yaml   → réplicas: 1, domínio: dev.exemplo.com
values-prod.yaml  → réplicas: 5, domínio: exemplo.com
```

Mesmo Chart, valores diferentes por ambiente, mantendo os templates compartilhados e
reduzindo duplicação de manifests inteiros.

## Cuidados

- **Chart Version ≠ App Version**: a versão do pacote Helm é diferente da versão da
  aplicação/imagem contida nele. Atualizar o Chart não significa necessariamente atualizar a
  imagem, se os valores não mudarem.
- **Segredos não devem ficar em texto aberto no `values.yaml`** só porque está fora do
  template — use secret manager, criptografia ou integração externa.
- **Helm não substitui o Kubernetes**: ele apenas gera e gerencia os recursos que serão
  interpretados pela API do cluster.

> Helm e Kustomize resolvem o mesmo problema (parametrizar manifests) de formas diferentes:
> Helm usa templates e um sistema de pacotes com releases; Kustomize customiza manifests por
> overlays sem sintaxe de template. Ambos podem ser usados em fluxos GitOps.
