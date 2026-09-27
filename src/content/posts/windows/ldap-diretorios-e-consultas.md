---
title: "LDAP: consultando diretórios no Active Directory"
description: "O protocolo por trás de como aplicações buscam usuários, grupos e computadores no AD."
date: 2026-09-21
updatedDate: 2026-09-21
---

## O que é LDAP

**LDAP (Lightweight Directory Access Protocol)** é o protocolo para acessar e consultar
serviços de diretório. No mundo Windows, é o protocolo usado para consultar e modificar o
Active Directory — **LDAP é o protocolo; AD DS é o produto/serviço** que o implementa.

```
Cliente → consulta LDAP → Diretório (DIT) → objetos e atributos retornados
```

## DIT, DN e RDN

- **DIT (Directory Information Tree)**: a estrutura hierárquica em árvore do diretório.
- **DN (Distinguished Name)**: o nome único e completo de uma entrada.
  ```
  cn=João Silva,ou=TI,dc=corp,dc=local
  ```
- **RDN (Relative Distinguished Name)**: a porção relativa da entrada, ex: `cn=João Silva`.

## Entry, atributos e schema

Cada **entrada (entry)** do diretório possui atributos: `cn`, `sn`, `mail`, `memberOf`,
`sAMAccountName`, entre outros. O **schema** define quais classes de objeto (user, group,
computer) e quais atributos são válidos naquele diretório.

## Portas e segurança

- **389**: LDAP em texto claro.
- **636**: LDAPS (LDAP sobre TLS/SSL).
- **3268 / 3269**: portas do Global Catalog (não criptografada / criptografada).

> Porta 389 não implica criptografia. "LDAP" sozinho não é sinônimo de conexão protegida —
> segurança real exige LDAPS ou StartTLS explicitamente configurados.

## Bind, Search Base e Search Scope

- **Bind**: o cliente se autentica para usar o diretório. Bind anônimo existe, mas em
  contextos corporativos o bind autenticado é preferível.
- **Search Base**: onde a busca começa na árvore.
- **Search Scope**: `base` (só a entrada), `one-level` (filhos diretos) ou `subtree` (toda a
  subárvore a partir da base).

```
Filtro de exemplo: (objectClass=user)
Filtro de exemplo: (cn=Maria*)
```

## Boas práticas

- Usar sempre TLS (LDAPS ou StartTLS) para proteger credenciais e dados em trânsito.
- Aplicar o princípio do menor privilégio nas contas de serviço que fazem bind no diretório.
- Validar e sanitizar filtros construídos dinamicamente por aplicações — filtros LDAP mal
  validados são vetores de injeção, análogos ao SQL injection.

> DN identifica o objeto inteiro; um atributo isolado não é o objeto — é apenas uma
> propriedade dele. E DIT é a hierarquia da árvore, enquanto schema é o modelo que define o
> que pode existir dentro dela; são camadas conceituais diferentes.
