---
title: "Proxy, Reverse Proxy e Load Balancer"
description: "Três intermediários de rede que parecem semelhantes, mas protegem lados opostos da conexão."
date: 2026-09-21
updatedDate: 2026-09-21
prerequisites: [redes/http-x-https]
related: [cloud/alta-disponibilidade-e-escalabilidade, kubernetes/ingress-roteamento-http]
---

## Forward Proxy

Fica entre clientes e destinos externos, atuando em nome do **cliente**. O servidor de
destino enxerga o proxy como origem imediata da conexão.

```
Cliente → Proxy (Forward) → Internet/Destinos externos
```

Usos: controle de acesso, cache, filtragem de conteúdo, auditoria/logs, saída centralizada
para internet.

Palavra-chave: **protege/representa o cliente**.

## Reverse Proxy

Fica à frente dos servidores, sendo o ponto de entrada para os clientes — protege e
representa o **servidor**.

```
Internet (Clientes) → Reverse Proxy → Servidor A, Servidor B, Servidor C
```

Usos: esconder detalhes dos servidores internos, terminação TLS, cache, compressão,
roteamento por host/caminho, proteção (WAF, rate limit), distribuição de requisições.

Macete: **Forward Proxy → cliente sabe do proxy. Reverse Proxy → cliente acessa o serviço e
não precisa conhecer os servidores internos.**

## Load Balancer

Distribui conexões/requisições entre múltiplos backends, com objetivo de escalabilidade,
disponibilidade e evitar sobrecarga de uma única instância.

```
Cliente → Load Balancer → Servidor 1, Servidor 2, Servidor 3
```

### Algoritmos básicos

- **Round Robin**: alterna servidores.
- **Weighted Round Robin**: distribui conforme pesos.
- **Least Connections**: prefere o servidor com menos conexões ativas.
- **Hash**: usa informação como IP/chave para decidir o destino.

### Health Check

O LB testa se cada backend está saudável. Se um servidor falha, ele é removido
temporariamente da distribuição, sem intervenção manual.

## Layer 4 x Layer 7

- **L4**: decisões baseadas em IP, TCP/UDP, portas.
- **L7**: decisões baseadas em informações da aplicação (host HTTP, URL, headers) — entende
  mais do protocolo da aplicação que decisões puramente L4.

## Distinções importantes

- **Proxy ≠ NAT**: proxy termina/cria conexões; NAT traduz endereços/portas sem terminar a
  conexão da mesma forma.
- **Reverse Proxy ≠ obrigatoriamente Load Balancer**: pode existir apenas para terminação
  TLS, cache ou roteamento, sem necessariamente balancear entre múltiplos backends.
- **Session Persistence (sticky session)**: mantém o cliente associado sempre ao mesmo
  backend — útil para aplicações com estado, mas reduz flexibilidade de balanceamento.

> Forward Proxy representa o cliente; Reverse Proxy representa o(s) servidor(es). Trocar essa
> direção é o erro conceitual mais comum sobre os dois — e Load Balancer não opera só com
> HTTP, pode atuar em múltiplas camadas e protocolos (TCP, UDP, gRPC, entre outros).
