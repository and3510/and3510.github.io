---
title: "Sidecar pattern e design de Pods multi-container"
description: "Quando faz sentido colocar mais de um container no mesmo Pod, e o que eles compartilham entre si."
date: 2026-08-01
updatedDate: 2026-08-01
prerequisites: [kubernetes/introducao-a-pods]
related: [cloud/observabilidade-metricas-logs-traces]
---

## Pod é a unidade agendável, não o container

O Kubernetes agenda **Pods**, não containers isolados diretamente. Um Pod pode conter um único
container principal (o caso mais comum) ou múltiplos containers fortemente relacionados que
precisam compartilhar recursos.

## O que containers do mesmo Pod compartilham

```
Pod
├── Container App    ─┐
├── Container Proxy   ├── mesmo IP, mesmo namespace de rede, volumes declarados
└── Container Logger  ─┘
```

- Endereço IP e namespace de rede — containers do mesmo Pod se comunicam via `localhost`.
- Volumes declarados no Pod, quando montados por mais de um container.
- Ciclo de vida próximo: em geral, sobem e descem juntos.

## Sidecar pattern

Um container auxiliar que estende ou dá suporte ao container principal, sem misturar
responsabilidades no mesmo processo.

Exemplos comuns:
- **Proxy de rede**: intercepta e gerencia todo o tráfego do container principal (como em um
  service mesh).
- **Coletor de logs**: lê os logs gerados pela aplicação e os envia a um sistema centralizado.
- **Agente de configuração**: sincroniza segredos ou configuração de uma fonte externa para um
  volume compartilhado.

```yaml
spec:
  containers:
    - name: app
      image: minha-app:1.0
    - name: log-shipper
      image: log-shipper:1.0
      volumeMounts:
        - name: logs
          mountPath: /var/log/app
  volumes:
    - name: logs
      emptyDir: {}
```

## Quando usar múltiplos containers no mesmo Pod

Use quando os containers precisam estar sempre juntos, compartilhando ciclo de vida e rede —
por exemplo, um proxy que **precisa** estar presente para a aplicação funcionar corretamente.
Se os componentes podem escalar de forma independente ou têm ciclos de vida diferentes, eles
deveriam ser Pods (e Deployments) separados, não containers do mesmo Pod.

## Pod isolado sem controlador

Um Pod criado diretamente, sem Deployment, ReplicaSet ou outro controlador por trás, não tem
quem o recrie se for removido ou falhar. A prática recomendada é sempre usar o recurso
adequado (Deployment, StatefulSet, Job) em vez de criar Pods soltos, exceto em depuração
pontual.

> Pods são efêmeros por natureza — podem morrer, ser recriados e mudar de IP. Aplicações não
> devem depender da identidade física de um Pod específico (exceto em StatefulSets, que
> preservam identidade lógica de forma deliberada); o design correto trata cada Pod como
> substituível a qualquer momento.
