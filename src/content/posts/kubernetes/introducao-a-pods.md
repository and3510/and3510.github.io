---
title: "Introdução a Pods no Kubernetes"
description: "O que é um Pod, por que ele é a menor unidade de deploy e como isso afeta o design de aplicações."
date: 2026-01-15
updatedDate: 2026-09-26
---

## O que é um Pod?

Um **Pod** é a menor unidade de execução no Kubernetes. Ele agrupa um ou mais containers que
compartilham rede e armazenamento.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-exemplo
spec:
  containers:
    - name: nginx
      image: nginx:1.27
```

### Por que não rodar containers direto?

O Kubernetes precisa de uma unidade que possa carregar metadados de agendamento, rede e ciclo
de vida — o Pod resolve isso, mesmo quando só existe um container dentro dele.

> Na prática, a maioria dos Pods em produção tem exatamente um container principal, mas o
> modelo permite sidecars (proxy, log shipper, etc).
