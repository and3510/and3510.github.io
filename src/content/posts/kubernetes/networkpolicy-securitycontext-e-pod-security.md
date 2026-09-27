---
title: "NetworkPolicy, SecurityContext e Pod Security"
description: "Três camadas complementares para reduzir superfície de ataque dentro de um cluster Kubernetes."
date: 2026-07-23
updatedDate: 2026-07-23
---

## NetworkPolicy: microssegmentação de rede

Por padrão, na maioria dos clusters, todo Pod pode falar com qualquer outro Pod — não há
isolamento de rede automático. **NetworkPolicy** controla quais comunicações são permitidas
entre Pods e outros endpoints.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: permitir-so-do-frontend
  namespace: producao
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes: ["Ingress"]
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: frontend
```

Isso restringe quem pode acessar o Pod `app: api` — só Pods com label `app: frontend`.

> NetworkPolicy depende do plugin de rede (CNI) ter suporte a ela. Criar a política sem um CNI
> compatível não gera filtragem efetiva alguma — o manifest existe, mas não tem efeito.

A prática recomendada é começar com **default deny** e liberar explicitamente só os fluxos
necessários, em vez de confiar no "permite tudo" padrão.

## SecurityContext: privilégios do Pod/container

Define atributos de segurança como usuário de execução, capabilities do Linux e permissões de
escrita no filesystem.

```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  allowPrivilegeEscalation: false
  readOnlyRootFilesystem: true
  capabilities:
    drop: ["ALL"]
```

- `runAsNonRoot`: exige que o container não rode como root.
- `allowPrivilegeEscalation: false`: impede que o processo obtenha mais privilégios do que
  tinha ao iniciar.
- `capabilities.drop: ["ALL"]`: remove capabilities Linux desnecessárias, seguindo o princípio
  do menor privilégio.

Um **privileged container** recebe acesso elevado ao host — é o nível mais alto de risco e
deve ser evitado, salvo necessidade técnica muito específica (ex: agentes de infraestrutura).

## Pod Security Standards

Três níveis padronizados que definem o que é permitido em um Pod:

- **Privileged**: sem restrições.
- **Baseline**: bloqueia escalonamentos de privilégio conhecidos, mantendo compatibilidade
  ampla.
- **Restricted**: conjunto mais restritivo de boas práticas, recomendado para a maioria dos
  workloads comuns.

Um **admission controller** valida ou rejeita Pods antes de serem persistidos — pode bloquear
imagem não autorizada, Pod privilegiado ou configuração insegura antes que ela chegue a
existir no cluster.

> Container não-root ainda pode ter riscos — SecurityContext é apenas uma camada de defesa, não
> uma garantia isolada. A segurança real do cluster combina NetworkPolicy (rede), RBAC
> (autorização), SecurityContext (privilégios) e Admission Control (validação), nenhuma delas
> sozinha é suficiente.
