---
title: "Roteamento IP: estático, dinâmico e RIP"
description: "Como um roteador decide o próximo salto de cada pacote, e a diferença entre configurar rotas manualmente ou deixar os roteadores aprenderem sozinhos."
date: 2026-09-11
updatedDate: 2026-09-11
---

## O que é roteamento

Processo de selecionar caminhos para encaminhar pacotes IP entre redes diferentes.

```
Switch (camada 2) → encaminha por MAC
Roteador (camada 3) → encaminha por IP de destino
```

## Tabela de roteamento

Cada entrada pode conter: rede/prefixo de destino, próximo salto, interface de saída,
métrica e origem da rota.

| Destino | Próximo salto | Interface |
|---|---|---|
| 192.168.10.0/24 | diretamente conectada | — |
| 10.0.0.0/8 | via 172.16.1.1 | — |
| 0.0.0.0/0 | via 192.168.1.1 | — |

- **Gateway padrão**: usado quando o destino não pertence à rede local.
- **Rota default**: `0.0.0.0/0` (IPv4) ou `::/0` (IPv6), usada quando nenhuma rota mais
  específica corresponde ao destino.

## Longest Prefix Match

Entre rotas concorrentes para o mesmo destino, o roteador prefere a **mais específica** (maior
comprimento de prefixo).

```
10.0.0.0/8   →  candidata
10.1.0.0/16  →  candidata
10.1.2.0/24  →  vencedora (mais específica, para destino 10.1.2.50)
```

> A regra central para escolher entre prefixos concorrentes é sempre o **longest prefix
> match** — a rota mais específica vence, mesmo que uma rota mais genérica também
> corresponda ao destino.

## Rotas estáticas x roteamento dinâmico

- **Rota estática**: configurada manualmente pelo administrador. Vantagens: controle, baixo
  overhead, adequada a redes pequenas e rotas específicas. Desvantagens: pouca
  escalabilidade, manutenção manual, falhas podem exigir reconfiguração.
- **Roteamento dinâmico**: roteadores trocam informações entre si por protocolos, aprendendo
  rotas automaticamente e reagindo a mudanças. Custos: uso de CPU/memória, tráfego de
  controle, mais complexidade.

## IGP x EGP

- **IGP (Interior Gateway Protocol)**: usado dentro de um Sistema Autônomo — RIP, OSPF,
  IS-IS, EIGRP.
- **EGP (Exterior Gateway Protocol)**: usado entre Sistemas Autônomos — o principal exemplo é
  o BGP (assunto do próximo post).

## RIP — Routing Information Protocol

IGP do tipo Distance Vector, usa como métrica o **número de saltos (hop count)**, com máximo
utilizável de 15 saltos — 16 significa "inalcançável".

- **RIPv1**: histórico, classful, não transporta máscara/prefixo nas atualizações.
- **RIPv2**: classless, envia máscara, suporta VLSM/CIDR.
- **Split Horizon**: evita anunciar uma rota de volta pela mesma interface da qual ela foi
  aprendida — mnemônico: "não conte ao vizinho aquilo que aprendeu dele".
- **Route Poisoning**: anuncia explicitamente uma rota inválida com métrica infinita (16).

> RIPv2 suporta VLSM e utiliza métrica baseada em hop count — 15 saltos não invalida uma
> rota; 16 é que representa inalcançável. Essa confusão entre "muitos saltos" e "rota
> inválida" é um erro comum.
