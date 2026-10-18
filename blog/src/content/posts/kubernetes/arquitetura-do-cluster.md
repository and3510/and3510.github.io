---
title: "Kubernetes: arquitetura do cluster"
description: "Como Control Plane e Worker Nodes trabalham juntos para reconciliar o estado desejado com o estado real."
date: 2026-07-25
updatedDate: 2026-07-25
prerequisites: [docker/dockerfile-multi-stage-build]
related: [kubernetes/cni-csi-cri-interfaces-do-kubernetes, kubernetes/introducao-a-pods]
---

## Declarativo e reconciliação

O Kubernetes trabalha com **estado desejado**: você declara "quero 3 réplicas desta
aplicação" e o cluster verifica continuamente se existem 3, criando ou removendo Pods quando
necessário. Isso é a **reconciliation loop** — o Kubernetes não apenas executa comandos, ele
reconcilia continuamente.

## Componentes do Control Plane

```
CONTROL PLANE
  API Server ←→ etcd
  Scheduler   Controller Manager
```

- **API Server**: porta de entrada de toda comunicação — recebe comandos, manifests e
  requisições. Todo componente do cluster fala com ele, nunca diretamente entre si.
- **etcd**: armazenamento chave-valor distribuído que mantém o estado do cluster. É a fonte
  de verdade, não apenas um banco de dados da aplicação do usuário.
- **Scheduler**: decide em qual nó um Pod será executado, considerando recursos disponíveis,
  restrições e afinidades — mas não executa o Pod, apenas escolhe o nó.
- **Controller Manager**: executa os controladores que observam o estado atual e o aproximam
  do estado desejado (reconciliação).

## Componentes de cada Worker Node

- **kubelet**: agente que garante que os Pods atribuídos àquele nó estão realmente rodando.
- **Container runtime**: executa os containers de fato (containerd, CRI-O).
- **kube-proxy**: implementa as regras de rede para que Services encontrem seus Pods.

```
kubectl → API Server → etcd (grava estado)
                     → Scheduler (escolhe nó)
                     → kubelet no nó escolhido (executa)
```

## As interfaces padronizadas

- **CNI (Container Network Interface)**: padroniza plugins de rede para Pods.
- **CSI (Container Storage Interface)**: padroniza integração com sistemas de armazenamento.
- **CRI (Container Runtime Interface)**: padroniza a interface entre kubelet e o runtime de
  containers.

Essas interfaces são o motivo pelo qual o Kubernetes não depende de nenhum runtime, plugin de
rede ou storage específico — qualquer implementação compatível com a interface funciona.

> Kubernetes não é sinônimo de Docker. Docker é (ou foi) um ecossistema de containers;
> Kubernetes é um orquestrador que, através do CRI, pode rodar workloads baseados em imagens
> OCI usando diferentes runtimes, sem depender do Docker Engine como componente obrigatório.
