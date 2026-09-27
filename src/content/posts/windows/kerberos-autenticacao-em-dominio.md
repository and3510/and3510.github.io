---
title: "Kerberos: autenticação por tickets no Active Directory"
description: "Como o Windows autentica usuários sem enviar a senha repetidamente para cada serviço acessado."
date: 2026-09-18
updatedDate: 2026-09-18
---

## O objetivo do Kerberos

**Kerberos** é um protocolo de autenticação baseado em tickets, criptografia simétrica e um
terceiro confiável — autentica o usuário uma vez, sem reenviar a senha a cada serviço
acessado.

```
Cliente → KDC (autentica) → recebe TGT → pede ticket do serviço ao TGS → recebe Service Ticket → acessa o Servidor
```

## KDC, AS e TGS

O **KDC (Key Distribution Center)** é uma função lógica nos Domain Controllers, composta por
dois serviços:

- **AS (Authentication Service)**: autentica o usuário e fornece o **TGT**.
- **TGS (Ticket Granting Service)**: usa o TGT para emitir tickets de serviço específicos.

Macete: **AS → TGT**, **TGS → Service Ticket**.

## Fluxo simplificado em 6 etapas

```
1. Logon do usuário
2. Cliente solicita autenticação ao AS
3. KDC fornece o TGT
4. Cliente solicita ticket ao TGS
5. TGS fornece o Service Ticket
6. Cliente apresenta o ticket ao servidor
```

- **TGT (Ticket Granting Ticket)**: obtido após a autenticação inicial; permite pedir novos
  tickets sem reapresentar a senha. Não é o ticket usado diretamente em cada serviço.
- **Service Ticket**: ticket emitido para um serviço específico, identificado por um
  **SPN (Service Principal Name)** — ex: `HTTP/web01.corp.local`.
- **krbtgt**: conta especial cuja chave protege os TGTs de todo o domínio.

## Por que a senha não circula

O servidor recebe apenas o ticket apresentado pelo cliente — nunca a senha do usuário. Isso é
uma das vantagens centrais do Kerberos frente a protocolos que reenviam credenciais a cada
acesso.

## Requisitos operacionais

- **Sincronização de horário**: Kerberos depende de relógios sincronizados entre cliente,
  KDC e servidor; uma diferença grande de horário causa falhas de autenticação —
  frequentemente resolvido com NTP.
- **SPN correto e único**: um SPN duplicado ou ausente causa falhas de autenticação Kerberos
  difíceis de diagnosticar à primeira vista.
- **Mutual authentication**: cliente e servidor se autenticam mutuamente, não apenas o
  cliente perante o servidor.

## Kerberos x NTLM

Kerberos é o protocolo moderno e preferido; **NTLM** existe como mecanismo legado de
compatibilidade — ambientes modernos devem minimizar dependência de NTLM por razões de
segurança.

> O TGT não é o ticket usado diretamente em cada aplicação — ele só serve para obter novos
> Service Tickets do TGS. Achar que o TGT "acessa o serviço" é um engano comum sobre o fluxo
> real do protocolo.
