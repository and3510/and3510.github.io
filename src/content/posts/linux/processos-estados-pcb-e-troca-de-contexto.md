---
title: "Processos: estados, PCB e troca de contexto"
description: "Programa é código parado no disco; processo é esse código vivendo em execução, com estado próprio."
date: 2026-08-02
updatedDate: 2026-08-02
---

## Programa x processo

Um **programa** é um arquivo passivo no disco. Um **processo** é uma instância desse programa
em execução, com seu próprio contexto: PID, registradores, contador de programa, pilha,
memória, arquivos abertos e credenciais. Um mesmo programa pode gerar múltiplos processos
independentes.

## PID, PPID e PCB

- **PID**: identificador do processo.
- **PPID**: identificador do processo pai.
- **PCB (Process Control Block)**: estrutura que guarda todas as informações do processo — a
  "ficha" que o kernel usa para gerenciá-lo (PID, estado, registradores, prioridade, memória).

## Estados de um processo

```
NEW → READY → RUNNING → TERMINATED
              ↕
         WAITING/BLOCKED (aguardando I/O)
```

- **READY**: pronto para usar a CPU, esperando a vez.
- **RUNNING**: usando a CPU agora.
- **WAITING/BLOCKED**: aguardando um evento (ex: leitura de disco).

> READY espera CPU; BLOCKED espera um evento externo (I/O, sinal). Confundir os dois é um erro
> comum: um processo em READY está pronto para rodar imediatamente, um em BLOCKED não vai
> rodar até o evento esperado acontecer, mesmo que a CPU esteja livre.

## Troca de contexto (context switch)

Quando o scheduler tira um processo da CPU para colocar outro, ele salva os registradores do
processo atual e carrega os do próximo. Isso tem custo real e não realiza trabalho útil da
aplicação — trocas de contexto excessivas (overhead) prejudicam a vazão geral do sistema.

## fork() e exec()

```
fork() → cria um novo processo (cópia do processo pai)
exec()  → substitui a imagem do processo pelo novo programa
```

`fork` e `exec` são operações distintas: `fork` duplica o processo atual; `exec` troca o
código executado sem criar um processo novo. Combiná-los é como a maioria dos shells Unix
cria e executa novos programas.

## Processos zumbi e órfãos

- **Zumbi**: processo já terminou, mas o pai ainda não coletou seu status com `wait()` — ocupa
  uma entrada na tabela de processos até ser recolhido.
- **Órfão**: o pai termina antes do filho; o filho é adotado pelo processo `init`/`systemd`
  (PID 1) e continua executando normalmente.

> Zumbi já terminou — só falta o pai recolher o status; não confundir com um processo
> travado, que ainda está em execução mas sem progredir. São problemas diferentes que pedem
> diagnósticos diferentes.
