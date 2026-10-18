---
title: "BGP: o protocolo que roteia a internet entre organizações"
description: "Como provedores, empresas e organizações trocam rotas entre si usando política, não apenas o menor caminho."
date: 2026-09-12
updatedDate: 2026-09-12
prerequisites: [redes/roteamento-ip-estatico-e-dinamico]
related: [redes/mpls-multiprotocol-label-switching]
---

## O que é BGP

**Border Gateway Protocol** é um protocolo Path Vector, usado principalmente entre Sistemas
Autônomos (AS) — é o protocolo de roteamento entre organizações, o que efetivamente conecta
os pedaços independentes da internet.

## Sistema Autônomo (AS)

Conjunto de redes sob administração comum, com política de roteamento coerente para outros
domínios. Identificado por um **ASN (Autonomous System Number)**.

```
AS 65001 ↔ AS 65002 ↔ AS 65003 ↔ Internet
```

Existem múltiplos caminhos possíveis entre ASes — a rota escolhida é definida por
**política**, não apenas pelo menor número de saltos.

## eBGP x iBGP

- **eBGP**: sessões BGP entre Sistemas Autônomos diferentes.
- **iBGP**: distribuição de informações BGP dentro do mesmo AS.

## Transporte e atributos

BGP utiliza **TCP na porta 179** — diferente de protocolos IGP que costumam ter mecanismos
próprios de transporte.

- **NLRI**: informação de prefixos alcançáveis anunciados.
- **AS-PATH**: sequência de ASes pelos quais a rota foi anunciada. Usado para prevenção de
  loops e preferência de caminho — BGP não escolhe caminho apenas por distância simples,
  utiliza atributos e políticas.
- **NEXT_HOP**: indica o próximo salto associado à rota.
- **LOCAL_PREF**: usado internamente para influenciar a saída preferida do AS.
- **MED**: sugere a outro AS a preferência de entrada; regra comum é que menor MED costuma
  ser preferido quando comparável entre anúncios do mesmo AS vizinho.

## Prevenção de loop

Se um AS recebe uma rota contendo seu próprio ASN no AS-PATH, normalmente rejeita essa rota —
sinal de que o anúncio já passou por ali antes.

```
AS65001 vê "65001" no caminho → rejeita
```

## Política acima do menor caminho físico

BGP permite que organizações escolham rotas com base em acordos comerciais, custo, segurança,
engenharia de tráfego e preferência administrativa — BGP é fortemente orientado a política, não
apenas a métrica técnica pura.

## BGP x OSPF

| | OSPF | BGP |
|---|---|---|
| Escopo | Dentro do AS | Entre ASes |
| Tipo | Link State | Path Vector |
| Decisão | Custo | Atributos e políticas |

> BGP não utiliza UDP — estabelece sessões sobre TCP na porta 179. E a convergência do BGP
> prioriza estabilidade e política em escala global, com comportamento bem diferente da
> convergência rápida voltada a redes internas dos protocolos IGP.
