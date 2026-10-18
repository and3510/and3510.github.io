---
title: "CNI, CSI e CRI: as interfaces padronizadas do Kubernetes"
description: "Por que o Kubernetes não depende de um runtime, plugin de rede ou storage específico."
date: 2026-07-31
updatedDate: 2026-07-31
prerequisites: [kubernetes/arquitetura-do-cluster]
related: [kubernetes/volumes-persistentes]
---

## Por que interfaces padronizadas existem

O Kubernetes não implementa rede, storage ou runtime de containers por conta própria — ele
define **interfaces** que qualquer fornecedor pode implementar. Isso evita lock-in em uma
tecnologia específica e permite trocar a implementação sem mudar a API do cluster.

## CRI — Container Runtime Interface

Padroniza a comunicação entre o kubelet e o runtime que efetivamente executa os containers.

```
kubelet → CRI → containerd / CRI-O / outro runtime compatível
```

Isso é o motivo pelo qual o Kubernetes pode rodar workloads baseados em imagens OCI sem
depender do Docker Engine especificamente — qualquer runtime compatível com CRI funciona.

## CNI — Container Network Interface

Padroniza plugins de rede para Pods: como cada Pod recebe um IP, como a comunicação entre
Pods de nós diferentes acontece, e como políticas de rede (NetworkPolicy) são aplicadas.

```
Pod criado → kubelet chama plugin CNI → Pod recebe interface de rede e IP
```

Implementações comuns incluem Calico, Cilium e Flannel — cada uma com trade-offs diferentes
entre performance, funcionalidades (como suporte a NetworkPolicy) e complexidade operacional.

## CSI — Container Storage Interface

Padroniza a integração entre o Kubernetes e sistemas de armazenamento externos, permitindo
que PersistentVolumes sejam provisionados dinamicamente por qualquer storage compatível (EBS,
Persistent Disk, sistemas on-premises).

```
PVC criado → StorageClass aciona driver CSI → volume provisionado e vinculado ao Pod
```

## Por que isso importa na prática

Ao escolher um plugin CNI, por exemplo, você está decidindo funcionalidades reais do cluster
— nem todo CNI suporta NetworkPolicy, e a performance de rede pode variar significativamente
entre implementações. O mesmo vale para CSI: o driver escolhido determina quais recursos de
storage (snapshots, redimensionamento online, replicação) estão disponíveis.

> Essas três interfaces são o que torna o "Kubernetes" um padrão portável entre provedores de
> nuvem, on-premises e diferentes fornecedores de infraestrutura — o cluster gerenciado de um
> provedor de nuvem e um cluster on-premises podem rodar exatamente os mesmos manifests,
> mesmo com implementações de rede, storage e runtime completamente diferentes por baixo.
