---
title: "Grupos do AD e o modelo AGDLP"
description: "Permissão deve ser atribuída a grupos, não a usuários individuais — AGDLP formaliza esse princípio na prática."
date: 2026-09-12
updatedDate: 2026-09-12
---

## Regra de ouro: permissão vai para grupos

Atribuir permissão diretamente a usuários individuais não escala e é difícil de auditar. A
prática recomendada é sempre **usuário → grupo → recurso**, nunca usuário → recurso
diretamente.

## Escopos de grupo

- **Global Group (GG)**: membros só do mesmo domínio; pode ser usado em qualquer domínio da
  floresta.
- **Domain Local Group (DLG)**: permissões só podem ser aplicadas a recursos do próprio
  domínio; pode receber membros de domínios confiáveis (conforme apropriado).
- **Universal Group (UG)**: membros de múltiplos domínios da mesma floresta; visível no
  Global Catalog — útil quando o acesso precisa abranger vários domínios.

## AGDLP: o modelo recomendado

```
Conta (usuário) → Global Group → Domain Local Group → Permissão → Recurso
```

Exemplo: `Ana → GG_Financeiro → DLG_PastaFinanceiro_Modify → Permissão em Recurso`.

Em ambientes multidomínio, o modelo se estende para **AGUDLP** (Account → Global → Universal
→ Domain Local → Permission), inserindo o grupo universal para agregar identidades entre
domínios diferentes.

## Security Group x Distribution Group

- **Security Group**: possui SID, pode ser usado em ACLs — concede acesso a pastas, arquivos,
  direitos de logon e permissões de aplicação.
- **Distribution Group**: usado apenas para comunicação (listas de e-mail) — **não** é usado
  para autorização em ACLs clássicas.

## Token de acesso

No logon, o Windows cria um token contendo o SID do usuário e os SIDs de todos os grupos aos
quais ele pertence. Esse token é comparado com a ACL do recurso para decidir acesso.

> O token não atualiza magicamente quando os grupos de um usuário mudam — mudanças de grupo
> geralmente exigem novo logon (nova sessão, novo ticket Kerberos) para que o token reflita a
> nova associação.

## Aninhamento de grupos

Grupos podem conter outros grupos (nesting), o que dá flexibilidade e organização, mas o
excesso de aninhamento dificulta auditoria e manutenção — em algum momento fica difícil
responder "quem, de fato, tem acesso a este recurso?" sem ferramentas de análise dedicadas.

> Grupo Universal não se torna automaticamente "mais privilegiado" que os outros escopos — a
> diferença entre Global, Domain Local e Universal é sobre **onde** o grupo pode ser usado e
> **quem** pode ser membro dele, não sobre nível de poder concedido.
