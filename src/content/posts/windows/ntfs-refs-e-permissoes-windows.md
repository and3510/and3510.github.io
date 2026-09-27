---
title: "NTFS, ReFS e permissões no Windows"
description: "Como o Windows organiza, protege e audita arquivos — e por que acesso remoto passa por duas camadas de permissão."
date: 2026-08-19
updatedDate: 2026-08-19
---

## NTFS x ReFS

- **NTFS**: sistema de arquivos principal do Windows, com ampla compatibilidade — ACLs,
  journaling, criptografia por arquivo (EFS), quotas, links, auditoria.
- **ReFS (Resilient File System)**: focado em resiliência, integridade e escala, projetado
  para workloads específicos de servidor (Hyper-V, VMs, grandes volumes de dados). ReFS não é
  um substituto universal do NTFS — a escolha depende do workload.

A **MFT (Master File Table)** é a estrutura central do NTFS, contendo registros de arquivos,
diretórios, atributos e metadados — o "catálogo" do sistema de arquivos.

## NTFS Permissions x Share Permissions

```
Usuário → acesso pela rede → Share Permissions → NTFS Permissions → Arquivo
```

- **Acesso local**: só as permissões NTFS importam.
- **Acesso remoto (rede/SMB)**: **as duas camadas** se aplicam, e o resultado efetivo é
  limitado pela mais restritiva das duas.

```
Share = Read     + NTFS = Modify  → Resultado remoto: Read
Share = Full Control + NTFS = Read → Resultado remoto: Read
```

## ACL, DACL e SACL

- **ACE (Access Control Entry)**: principal + Allow/Deny + permissões + herança.
- **DACL**: define **permissão de acesso**.
- **SACL**: define **auditoria** (o que é registrado, não o que é permitido).

Deny explícito geralmente sobrescreve Allow para o mesmo direito — usar Deny sem necessidade
real costuma complicar mais do que resolver.

## Herança e permissões efetivas

Permissões podem ser herdadas de uma pasta pai ou definidas explicitamente no objeto. É
possível desabilitar a herança convertendo entradas herdadas em explícitas ou removendo-as. O
acesso efetivo final considera grupos, ACEs, herança e propriedade do objeto — não apenas uma
única entrada isolada.

## EFS x BitLocker

- **EFS (Encrypting File System)**: criptografa arquivos/pastas individuais, vinculado à
  identidade do usuário e certificados.
- **BitLocker**: criptografa **todo o volume/disco**, incluindo metadados do sistema de
  arquivos.

> BitLocker criptografa o volume, não arquivos individuais isoladamente; EFS criptografa
> arquivo/pasta específicos. São ferramentas complementares, não intercambiáveis — e nenhuma
> das duas substitui backup: dados perdidos por exclusão continuam perdidos, criptografados ou
> não.
