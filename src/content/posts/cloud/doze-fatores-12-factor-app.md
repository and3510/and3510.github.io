---
title: "12-Factor App: princípios para aplicações cloud-native"
description: "Metodologia para construir aplicações portáveis, automatizáveis e que escalam bem em ambientes de nuvem."
date: 2026-07-05
updatedDate: 2026-07-05
---

## Por que esses princípios existem

O **12-Factor App** é uma metodologia para construir aplicações SaaS/cloud-native fáceis de
operar e escalar. O foco é portabilidade, automação e separação clara entre configuração e
código.

## Os doze fatores

1. **Codebase**: uma base de código versionada, múltiplos deploys (dev, staging, prod) a
   partir dela.
2. **Dependencies**: declarar dependências explicitamente, nunca assumir que algo já está
   instalado no ambiente.
3. **Config**: configuração (URLs, credenciais, parâmetros) separada do código —
   `config ≠ código`.
4. **Backing services**: tratar banco, fila, cache e e-mail como recursos anexados,
   substituíveis sem mudar código.
5. **Build, release, run**: separar claramente as etapas de compilar, combinar com config, e
   executar.
6. **Processes**: processos stateless; qualquer estado durável vive em backing services, não
   em memória local do processo.
7. **Port binding**: a aplicação exporta seu serviço vinculando-se a uma porta, sem depender
   de um servidor web externo injetado em tempo de execução.
8. **Concurrency**: escalar horizontalmente adicionando mais processos/instâncias.
9. **Disposability**: iniciar rápido e encerrar graciosamente — processos devem ser
   descartáveis a qualquer momento.
10. **Dev/prod parity**: manter desenvolvimento e produção o mais parecidos possível, reduzir
    o "funciona na minha máquina".
11. **Logs**: tratar logs como fluxo de eventos (stdout/stderr), não gerenciar arquivos de
    log dentro da aplicação.
12. **Admin processes**: tarefas administrativas (migração, scripts pontuais) como processos
    únicos no mesmo ambiente, não algo à parte e divergente.

## Relação com containers e Kubernetes

Os princípios de disposability, port binding e processos stateless combinam naturalmente com
containers. No Kubernetes, isso mapeia direto: config vira ConfigMap/Secret, processes viram
Pods, concurrency vira réplicas, logs viram stdout coletado pela plataforma.

> Twelve-Factor não exige containers, e stateless não significa "aplicação sem banco de
> dados" — significa que o **processo** não guarda estado durável localmente; os dados vivem
> em serviços persistentes externos ao processo, que pode ser recriado a qualquer momento sem
> perda.
