---
title: "SMTP, POP3 e IMAP: protocolos de e-mail"
description: "Um protocolo envia, dois protocolos diferentes de recebimento com filosofias opostas sobre onde a mensagem deveria viver."
date: 2026-09-18
updatedDate: 2026-09-18
---

## O fluxo geral

```
Remetente → Cliente de E-mail → Servidor do Remetente (SMTP) → Servidor do Destinatário → Destinatário (IMAP/POP3)
```

## SMTP — Simple Mail Transfer Protocol

Função principal: **envio** de mensagens e transferência entre servidores de e-mail.
Palavra-chave: enviar.

- **TCP 25**: transferência SMTP entre servidores em muitos cenários.
- **TCP 587**: submissão autenticada de mensagens (o mais comum para clientes enviarem hoje).
- **TCP 465**: submissão SMTP sobre TLS implícito em usos modernos.

O SMTP funciona no modelo **store and forward**: servidores podem receber, armazenar
temporariamente e encaminhar mensagens ao próximo servidor no caminho até o destino.

MX + SMTP: o remetente consulta o DNS por registros **MX** do domínio de destino para saber
qual servidor recebe e-mails daquele domínio, e então envia via SMTP para esse servidor.

## POP3 — Post Office Protocol version 3

Função: acessar mensagens mantidas em servidor, com filosofia clássica de **baixar** as
mensagens para o cliente, com possibilidade de remoção do servidor conforme configuração.
Palavra-chave: baixar.

- **TCP 110**: POP3 tradicional.
- **TCP 995**: POP3 sobre TLS.

## IMAP — Internet Message Access Protocol

Função: manter mensagens organizadas **no servidor**; clientes sincronizam o estado (pastas,
mensagens, sinalizadores/flags, status de leitura). Palavra-chave: sincronizar.

- **TCP 143**: IMAP tradicional.
- **TCP 993**: IMAP sobre TLS.

## POP3 x IMAP

| | POP3 | IMAP |
|---|---|---|
| Modelo | Mais simples, baixa e (às vezes) remove | Mantém estado no servidor |
| Sincronização | Menor foco | Sincroniza pastas e mensagens |
| Multi-dispositivo | Menos adequado | Adequado a múltiplos dispositivos |

## MUA, MTA e MDA

```
MUA (cliente) → MTA (transfere entre servidores) → MTA → MDA (entrega na caixa) → Mailbox
```

- **MUA (Mail User Agent)**: cliente usado pelo usuário.
- **MTA (Mail Transfer Agent)**: transfere mensagens entre servidores.
- **MDA (Mail Delivery Agent)**: entrega a mensagem à caixa postal final.

## MIME

**Multipurpose Internet Mail Extensions** permite representar anexos, diferentes tipos de
conteúdo, caracteres além do ASCII clássico e mensagens multipart.

## Riscos operacionais

- **Open Relay**: servidor configurado para retransmitir mensagens indiscriminadamente pode
  ser abusado para envio de spam — deve ser evitado.
- **Autenticação**: submissão de e-mail pelo usuário normalmente exige autenticação,
  diferente da simples retransmissão aberta que caracteriza o risco acima.

> SMTP envia; POP3 baixa; IMAP sincroniza; registros MX indicam qual servidor recebe e-mails
> de um domínio. Essas quatro associações resolvem a maioria das perguntas práticas sobre
> e-mail — inclusive por que a mesma caixa de entrada aparece igual em vários dispositivos
> quando configurada via IMAP, mas não via POP3.
