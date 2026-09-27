---
title: "Namespaces e RBAC"
description: "Isolamento lógico de recursos e controle de acesso granular no cluster."
date: 2026-03-17
updatedDate: 2026-03-17
---

## Namespaces: dividindo o cluster

Um **Namespace** cria um escopo lógico para nomes de recursos, permitindo múltiplos times ou
ambientes (dev, staging, prod) no mesmo cluster sem colisão de nomes.

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: time-pagamentos
```

```bash
kubectl get pods -n time-pagamentos
kubectl config set-context --current --namespace=time-pagamentos
```

Recursos como Nodes e PersistentVolumes são globais e não pertencem a nenhum namespace;
Pods, Services e Deployments são namespaced.

## RBAC: quem pode fazer o quê

**Role** (ou **ClusterRole**, para escopo cluster-wide) define um conjunto de permissões
sobre recursos da API.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: time-pagamentos
  name: leitor-pods
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list", "watch"]
```

**RoleBinding** associa a Role a um usuário, grupo ou ServiceAccount:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: leitor-pods-binding
  namespace: time-pagamentos
subjects:
  - kind: User
    name: joao@empresa.com
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: leitor-pods
  apiGroup: rbac.authorization.k8s.io
```

## Boas práticas

- Aplique o princípio do menor privilégio: comece com `get`/`list`/`watch` e só adicione
  `create`/`update`/`delete` quando necessário.
- Use `ClusterRole` + `RoleBinding` (não `ClusterRoleBinding`) para reutilizar uma role em
  múltiplos namespaces sem dar acesso cluster-wide.
- ServiceAccounts são a identidade de workloads (Pods chamando a API do Kubernetes) — nunca
  reutilize a conta `default` para permissões elevadas.

```bash
kubectl auth can-i delete pods --as=joao@empresa.com -n time-pagamentos
```
