---
title: "Active Directory Domain Services: identidade centralizada"
description: "Como o AD DS centraliza autenticação e autorização para redes corporativas Windows."
date: 2026-08-13
updatedDate: 2026-08-13
---

## O que é o AD DS

**Active Directory Domain Services (AD DS)** é o serviço de diretório para redes corporativas
Windows — armazena usuários, grupos, computadores, servidores, impressoras, políticas e
contas de serviço em um banco hierárquico centralizado.

```
Active Directory → Identidades + Recursos + Políticas → Authentication → Authorization → Acesso
```

## Autenticação x Autorização

- **Authentication**: provar quem você é. O protocolo principal é o **Kerberos** (moderno);
  NTLM existe como alternativa legada.
- **Authorization**: depois de autenticado, o que você tem permissão de fazer — baseado em
  SIDs, grupos, ACLs e políticas.

Mnemônico: authentication é **quem** você é; authorization é **o que** você pode fazer.

## Componentes centrais

- **Domain Controller (DC)**: servidor que executa o AD DS — autentica, armazena o diretório,
  aplica mudanças, replica para outros DCs.
- **DNS**: clientes localizam serviços do AD (LDAP, Kerberos, Global Catalog) via registros
  SRV. DNS mal configurado quebra autenticação e políticas do AD inteiro.
- **Kerberos**: protocolo de autenticação baseado em bilhetes (tickets).
- **LDAP**: protocolo para consultar e modificar o diretório.
- **Group Policy**: configurações centralizadas aplicadas a usuários e computadores.

## Estrutura de dados do AD

- **NTDS.dit**: o banco de dados do AD em si, armazenado em cada Domain Controller.
- **SYSVOL**: pasta replicada entre DCs contendo arquivos e scripts de GPO. `NTDS.dit` e
  `SYSVOL` são coisas diferentes — confundi-los é um erro comum.
- **Global Catalog (GC)**: cópia completa dos objetos do próprio domínio e atributos parciais
  de outros domínios da floresta, usado para pesquisas amplas e logons de certos tipos.
- **Schema**: define as classes de objeto e atributos permitidos no diretório — é
  compartilhado por toda a floresta (forest).

## Domain Join

```
PC isolado → Join no domínio → Computer Account criada → Autenticação centralizada
```

Ao entrar no domínio, o computador recebe sua própria identidade (computer account) e
estabelece um canal seguro criptografado com um DC — essa senha do canal é alterada
periodicamente e, se dessincronizar, pode quebrar a autenticação da máquina.

> Fazer backup do AD copiando apenas `NTDS.dit` e `SYSVOL` manualmente não é suficiente — a
> forma correta e suportada é usar o backup de **System State**, que inclui tudo que é
> necessário para uma restauração consistente do diretório.
