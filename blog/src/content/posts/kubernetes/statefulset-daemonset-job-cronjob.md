---
title: "StatefulSet, DaemonSet, Job e CronJob"
description: "Deployment não é a solução para tudo — cada padrão de workload tem um controlador mais adequado no Kubernetes."
date: 2026-07-27
updatedDate: 2026-07-27
---

## Deployment não é solução universal

Deployment é excelente para aplicações **stateless**, onde os Pods são intercambiáveis e a
identidade individual não importa. Para outros padrões de workload, existem controladores
específicos.

## StatefulSet

Para workloads que precisam de identidade estável, nomes previsíveis e armazenamento
persistente associado a cada réplica.

```
database-0  database-1  database-2
   PVC-0       PVC-1       PVC-2
```

Após uma recriação, `database-1` continua representando a mesma identidade lógica, com o
mesmo volume associado — diferente de um Deployment, onde qualquer réplica é substituível por
qualquer outra.

> StatefulSet não transforma automaticamente qualquer banco de dados em um cluster de alta
> disponibilidade — ele só garante identidade e armazenamento estáveis; a replicação real do
> banco continua sendo responsabilidade da aplicação.

## DaemonSet

Garante que um Pod execute em todos os nós (ou em um subconjunto elegível) do cluster — "um
por nó". Usado para agentes de log, monitoramento, segurança ou plugins de rede.

```
Node A [Agent]   Node B [Agent]   Node C [Agent]
```

Ao adicionar um novo nó elegível, o DaemonSet cria automaticamente o Pod correspondente nele.

## Job

Executa uma tarefa até sua conclusão — migração, processamento batch, geração de relatório —
e então termina, diferente de um Deployment que mantém réplicas rodando continuamente.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: migracao-dados
spec:
  template:
    spec:
      containers:
        - name: migrate
          image: minha-app:migrate
      restartPolicy: Never
  backoffLimit: 3
```

Pode ser configurado com `completions` e `parallelism` para processar múltiplas execuções em
paralelo.

## CronJob

Cria Jobs em horários programados, de forma parecida com o cron tradicional do Linux.

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: backup-diario
spec:
  schedule: "0 3 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: backup
              image: minha-app:backup
          restartPolicy: OnFailure
```

## Escolha rápida

- Web stateless → **Deployment**
- Banco com identidade estável → **StatefulSet**
- Agente em cada nó → **DaemonSet**
- Processamento único → **Job**
- Processamento recorrente agendado → **CronJob**

> Tarefas executadas por Job ou CronJob devem, quando possível, ser idempotentes — falhas e
> retries podem gerar mais de uma execução da mesma tarefa, e o sistema precisa suportar isso
> sem efeito colateral duplicado.
