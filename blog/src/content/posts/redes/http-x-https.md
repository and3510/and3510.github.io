---
title: "HTTP x HTTPS"
description: "Métodos, status codes, versões do HTTP e onde o TLS entra no HTTPS."
date: 2026-09-27
prerequisites: [redes/modelo-tcpip-camadas-e-protocolos, redes/tcp-x-udp]
related: [redes/dns-sistema-de-nomes-de-dominio, redes/proxy-reverse-proxy-e-load-balancer]
---

## Estrutura da comunicação

**HTTP (Hypertext Transfer Protocol)** segue o modelo requisição-resposta: o cliente envia uma requisição, o servidor retorna uma resposta.

```
GET /usuarios/42 HTTP/1.1
```

Uma requisição contém: método, caminho/URI, headers e corpo opcional.

## Métodos principais

- **GET**: recupera representação de um recurso.
- **POST**: envia dados/processa/cria conforme a API.
- **PUT**: substitui/atualiza recurso segundo o contrato.
- **PATCH**: alteração parcial.
- **DELETE**: remove.
- **HEAD**: semelhante ao GET, sem corpo de resposta.
- **OPTIONS**: informa capacidades/opções de comunicação suportadas.

**Safe methods** (GET, HEAD) não deveriam solicitar mudança de estado no servidor. **Idempotência**: repetir a mesma operação produz o mesmo efeito no estado do servidor. GET, PUT e DELETE são idempotentes; POST geralmente não é.

## Status codes

| Faixa | Significado | Exemplos |
|---|---|---|
| 1xx | Informacional | 100 |
| 2xx | Sucesso | 200 OK, 201 Created, 204 No Content |
| 3xx | Redirecionamento | 301 Moved Permanently, 304 Not Modified |
| 4xx | Erro do cliente | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found |
| 5xx | Erro do servidor | 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable |

> **401** = autenticação ausente ou inválida. **403** = o servidor entendeu a requisição, mas recusa o acesso. Para lembrar: o 401 pede para você se autenticar; o 403 nega mesmo sabendo quem você é.

## HTTPS

HTTP protegido por **TLS**, oferecendo confidencialidade, integridade e autenticação do servidor por certificado (conforme configuração).

```
Navegador ⇄ [TLS] ⇄ Servidor
```

- **Portas tradicionais**: HTTP usa TCP 80; HTTPS usa TCP 443 em HTTP/1.1 e HTTP/2 tradicionais.
- **HTTP/3**: utiliza QUIC sobre UDP, normalmente também na porta 443.

HTTPS não quer dizer que o **conteúdo** é confiável. Ele protege o canal e valida a identidade do certificado, mas um site malicioso também pode ter HTTPS válido.

## HTTP/1.1, HTTP/2 e HTTP/3

- **HTTP/1.1**: conexões persistentes e múltiplas requisições ao longo da conexão, sem multiplexação plena típica do HTTP/2.
- **HTTP/2**: multiplexação de múltiplos streams sobre uma conexão.
- **HTTP/3**: usa QUIC sobre UDP, reduzindo impacto de perda de pacotes na multiplexação.

## Stateless e cookies

HTTP é **stateless**: para o protocolo, cada requisição é independente. Aplicações criam sessões usando cookies, tokens ou outros mecanismos por cima do protocolo.

O HTTP em si não guarda estado. A sensação de "sessão" que os sites passam é construída por cima, com cookies ou tokens.
