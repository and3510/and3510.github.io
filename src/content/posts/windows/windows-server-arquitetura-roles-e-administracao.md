---
title: "Windows Server: arquitetura, roles e administração"
description: "Como o Windows Server organiza serviços corporativos em roles e features, e as ferramentas centrais de administração."
date: 2026-09-03
updatedDate: 2026-09-03
---

## Roles x Features

- **Server Role**: a função principal que o servidor executa — AD DS, DNS Server, DHCP
  Server, File and Storage Services, Web Server (IIS), Hyper-V.
- **Feature**: funcionalidade complementar a um role.

```
Hardware → Windows Kernel → Services → Server Roles → Clientes/Usuários
```

## Workgroup x Domain

- **Workgroup**: identidades locais e descentralizadas, cada máquina gerencia suas próprias
  contas.
- **Domain**: identidade centralizada e políticas gerenciadas pelo Active Directory.

- **Domain Controller (DC)**: hospeda o AD DS e participa da autenticação e replicação. Todo
  DC é servidor do domínio, mas nem todo servidor membro é um DC.
- **Member Server**: unido ao domínio, mas não é um DC — ex: servidor de arquivos, servidor
  de aplicações.

## Server Core x Desktop Experience

- **Server Core**: instalação com GUI reduzida (sem interface gráfica completa). Menor
  superfície de ataque, menos componentes, menor consumo — gerenciado via PowerShell,
  ferramentas remotas e consoles de outros hosts.
- **Desktop Experience**: GUI completa, manipulação local mais fácil, mas maior superfície.

## Ferramentas centrais de administração

- **Server Manager**: console gráfico para adicionar roles/features, visualizar servidores,
  monitorar eventos e administrar serviços.
- **PowerShell**: shell de automação orientada a objetos, essencial para administração
  moderna e em escala.
- **Windows Registry**: banco de dados de configuração hierárquica do Windows (hives
  principais: HKLM, HKCU, HKCR).
- **Event Viewer**: logs de Application, Security e System.
- **Task Scheduler**: agenda tarefas para execução programada (equivalente ao cron do Linux,
  mas não é a mesma ferramenta).
- **RSAT (Remote Server Administration Tools)**: ferramentas para administração remota de
  roles e features.

## Contas locais x contas de domínio

- **Local Account**: existe apenas naquele host (`SERVIDOR\usuario`).
- **Domain Account**: armazenada no diretório central (`DOMINIO\usuario` ou
  `usuario@dominio`).

> Instalar o Windows Server não cria automaticamente um domínio AD, e um servidor membro não
> é um Domain Controller apenas por estar unido ao domínio — DC é uma função explícita
> (AD DS) que precisa ser instalada e configurada deliberadamente naquele servidor específico.
