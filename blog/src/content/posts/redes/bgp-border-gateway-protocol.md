---
title: "BGP: o protocolo que roteia a internet entre organizações"
description: "Como provedores e empresas trocam rotas entre si e por que a escolha do caminho depende de política."
date: 2026-09-27
prerequisites: [redes/roteamento-ip-estatico-e-dinamico]
related: [redes/mpls-multiprotocol-label-switching]
---

## O que é BGP

**Border Gateway Protocol** é um protocolo Path Vector, usado principalmente entre Sistemas Autônomos (AS). É o protocolo de roteamento entre organizações, o que efetivamente conecta os pedaços independentes da internet.

## Sistema Autônomo (AS)

Conjunto de redes sob administração comum, com política de roteamento coerente para outros domínios. Identificado por um **ASN (Autonomous System Number)**.

```
AS 65001 ↔ AS 65002 ↔ AS 65003 ↔ Internet
```

Existem múltiplos caminhos possíveis entre ASes. A rota escolhida é definida por **política**, não apenas pelo menor número de saltos.

## eBGP x iBGP

- **eBGP**: sessões BGP entre Sistemas Autônomos diferentes.
- **iBGP**: distribuição de informações BGP dentro do mesmo AS.

## Transporte e atributos

BGP utiliza **TCP na porta 179**, diferente dos IGPs, que costumam ter mecanismos próprios de transporte.

- **NLRI**: informação de prefixos alcançáveis anunciados.
- **AS-PATH**: sequência de ASes pelos quais a rota foi anunciada. Usado para prevenção de loops e preferência de caminho. O BGP não escolhe caminho só por distância: usa atributos e políticas.
- **NEXT_HOP**: indica o próximo salto associado à rota.
- **LOCAL_PREF**: usado internamente para influenciar a saída preferida do AS.
- **MED**: sugere a outro AS a preferência de entrada; regra comum é que menor MED costuma ser preferido quando comparável entre anúncios do mesmo AS vizinho.

## Prevenção de loop

Se um AS recebe uma rota contendo seu próprio ASN no AS-PATH, normalmente rejeita essa rota. É sinal de que o anúncio já passou por ali antes.

```
AS65001 vê "65001" no caminho → rejeita
```

## Política acima do menor caminho físico

BGP permite que organizações escolham rotas com base em acordos comerciais, custo, segurança, engenharia de tráfego e preferência administrativa. BGP é fortemente orientado a política, não apenas a métrica técnica pura.

## BGP x OSPF

| | OSPF | BGP |
|---|---|---|
| Escopo | Dentro do AS | Entre ASes |
| Tipo | Link State | Path Vector |
| Decisão | Custo | Atributos e políticas |

O BGP não usa UDP: as sessões são TCP na porta 179. E a convergência dele prioriza estabilidade e política em escala global, bem diferente da convergência rápida dos IGPs em redes internas.
