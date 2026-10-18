---
title: "ServiceAccounts: a identidade dos workloads no Kubernetes"
description: "Como Pods se autenticam contra a API do Kubernetes, e por que a conta default nunca deveria ter privilégios elevados."
date: 2026-07-28
updatedDate: 2026-07-28
prerequisites: [kubernetes/namespaces-e-rbac]
related: [kubernetes/networkpolicy-securitycontext-e-pod-security]
---

## Usuário humano x ServiceAccount

RBAC no Kubernetes autoriza dois tipos de identidade: usuários humanos (autenticados por
certificado, OIDC, etc.) e **ServiceAccounts** — a identidade que workloads (Pods) usam para
falar com a API do cluster.

```
Pod → ServiceAccount → permissões RBAC → API Server
```

## Conta default e boas práticas

Todo namespace tem uma ServiceAccount `default`. Pods que não especificam outra a usam
automaticamente. O problema: se essa conta acumular permissões amplas, **qualquer** Pod do
namespace herda esse acesso sem necessidade.

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: leitor-pods
  namespace: time-pagamentos
```

```yaml
spec:
  serviceAccountName: leitor-pods
  containers:
    - name: app
      image: minha-app:1.0
```

A prática recomendada é criar uma ServiceAccount específica por workload sensível, com apenas
as permissões que ele de fato precisa.

## Role, RoleBinding e o fluxo completo

```
ServiceAccount ──bind──→ Role ──define──→ permissões sobre Resources
```

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: time-pagamentos
  name: leitor-configmaps
rules:
  - apiGroups: [""]
    resources: ["configmaps"]
    verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: leitor-configmaps-binding
  namespace: time-pagamentos
subjects:
  - kind: ServiceAccount
    name: leitor-pods
    namespace: time-pagamentos
roleRef:
  kind: Role
  name: leitor-configmaps
  apiGroup: rbac.authorization.k8s.io
```

- **Role define** o conjunto de permissões.
- **RoleBinding conecta** essa Role a um subject (usuário, grupo ou ServiceAccount).

## Token e autenticação

A ServiceAccount gera um token que autentica o Pod perante o API Server. Esse token deve ter
duração curta quando possível e ser protegido contra exposição — ele é, na prática, uma
credencial de acesso à API do cluster.

> RBAC controla **o que** uma identidade pode fazer depois de autenticada; não é a mesma coisa
> que autenticação (provar quem ela é) nem que NetworkPolicy (que controla comunicação de rede
> entre Pods). Confundir essas três camadas é um erro comum ao desenhar segurança no cluster.
