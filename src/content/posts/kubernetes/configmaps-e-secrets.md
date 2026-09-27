---
title: "ConfigMaps e Secrets"
description: "Como separar configuração e dados sensíveis do código da aplicação no Kubernetes."
date: 2026-02-24
updatedDate: 2026-02-24
---

## ConfigMap: configuração desacoplada

Um **ConfigMap** guarda dados não sensíveis (variáveis de ambiente, arquivos de config) fora da
imagem do container, permitindo trocar configuração sem rebuild.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  LOG_LEVEL: "info"
  FEATURE_FLAG_X: "true"
```

Consumindo como variáveis de ambiente:

```yaml
spec:
  containers:
    - name: app
      envFrom:
        - configMapRef:
            name: app-config
```

## Secret: dados sensíveis

**Secrets** funcionam como ConfigMaps, mas para senhas, tokens e chaves. O valor fica
codificado em base64 (não criptografado por padrão — é ofuscação, não segurança).

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  username: YWRtaW4=
  password: cGFzc3dvcmQxMjM=
```

```yaml
spec:
  containers:
    - name: app
      env:
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: password
```

## Boas práticas de segurança

- Habilite **encryption at rest** no etcd (`EncryptionConfiguration`) para Secrets.
- Prefira um cofre externo (Vault, AWS Secrets Manager, Sealed Secrets) integrado via
  operador, em vez de versionar Secrets em Git.
- Use RBAC para restringir quem pode ler Secrets — `get`/`list` em `secrets` equivale a
  acesso às credenciais em texto claro.
- Monte Secrets como volume (`volumeMounts`) quando possível: variáveis de ambiente ficam
  visíveis em `/proc/<pid>/environ` e em logs de crash.
