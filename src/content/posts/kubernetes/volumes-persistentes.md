---
title: "Armazenamento persistente: Volumes, PV e PVC"
description: "Como dados sobrevivem à recriação de Pods usando Volumes, PersistentVolume e PersistentVolumeClaim."
date: 2026-06-30
updatedDate: 2026-06-30
---

## O problema

O filesystem de um container é efêmero: quando o Pod morre, os dados somem. Para persistir
dados (bancos, uploads, cache), o Kubernetes desacopla o armazenamento do ciclo de vida do
Pod através de três camadas.

## PersistentVolume (PV)

Representa um pedaço de armazenamento real no cluster (disco em nuvem, NFS, etc.),
provisionado por um administrador ou dinamicamente por uma StorageClass.

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-dados
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  storageClassName: standard
  hostPath:
    path: /mnt/dados
```

## PersistentVolumeClaim (PVC)

É o "pedido" de armazenamento feito pela aplicação, sem precisar saber onde ou como o disco
foi provisionado.

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-dados
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: standard
```

## Usando no Pod

```yaml
spec:
  containers:
    - name: app
      volumeMounts:
        - mountPath: /data
          name: dados
  volumes:
    - name: dados
      persistentVolumeClaim:
        claimName: pvc-dados
```

## StorageClass e provisionamento dinâmico

Em vez de criar PVs manualmente, uma **StorageClass** permite que o PVC dispare a criação
automática do disco na nuvem (EBS, Persistent Disk, Azure Disk):

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: standard
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
```

> `accessModes` importa: `ReadWriteOnce` permite montagem por um único nó, enquanto
> `ReadWriteMany` (nem toda solução de storage suporta) permite múltiplos Pods em nós
> diferentes lendo e escrevendo simultaneamente — necessário para workloads distribuídos.
