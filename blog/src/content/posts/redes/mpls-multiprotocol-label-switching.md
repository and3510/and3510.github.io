---
title: "MPLS: Multiprotocol Label Switching"
description: "Como rótulos evitam que cada roteador refaça a análise completa de IP a cada salto."
date: 2026-09-24
updatedDate: 2026-09-24
prerequisites: [redes/roteamento-ip-estatico-e-dinamico]
related: [redes/qos-priorizacao-de-trafego, redes/sdn-e-nfv-redes-programaveis]
---

## O que é MPLS

Tecnologia de encaminhamento que usa **labels (rótulos)** associados a caminhos, atuando
entre as camadas 2 e 3, facilitando o transporte de múltiplos protocolos.

```
Pacote IP entra → recebe LABEL → atravessa a rede MPLS → label removido → pacote IP segue ao destino
```

## Por que usar labels

Dentro do domínio MPLS, os dispositivos encaminham com base nos labels, evitando refazer toda
a análise completa de IP tradicional a cada salto — decisão de encaminhamento mais rápida e
simples ao longo do caminho já estabelecido.

## LSP — Label Switched Path

O caminho lógico percorrido pelos pacotes rotulados através da rede MPLS.

## Papéis dos roteadores

```
CE — PE — P — P — PE — CE
```

- **CE (Customer Edge)**: equipamento na borda do cliente.
- **PE (Provider Edge)**: roteador de borda do provedor que interage com clientes e com o
  domínio MPLS.
- **P (Provider Router)**: equipamento interno do provedor, no núcleo da rede.

## Operações com labels

```
Entrada → PUSH (adiciona label) → SWAP (troca por outro) → SWAP (troca de novo) → POP (remove) → Saída
```

```
IP → [20] → [35] → [80] → [ ] → IP
```

- **FEC (Forwarding Equivalence Class)**: grupo de pacotes que recebe o mesmo tratamento de
  encaminhamento.
- **Label Stack**: um pacote pode carregar múltiplos labels empilhados, usados para serviços
  e engenharia de tráfego.

## MPLS VPN e VRF

Provedores podem isolar o tráfego de diferentes clientes sobre a mesma infraestrutura
backbone.

```
Cliente Azul → Backbone MPLS → Cliente Verde (isolados logicamente)
```

**VRF (Virtual Routing and Forwarding)** mantém tabelas de roteamento logicamente separadas
no mesmo equipamento — fortemente associada a MPLS L3VPN.

## MPLS não é criptografia

O isolamento lógico do MPLS **não é confidencialidade criptográfica**. Se for necessário
criptografia real, é preciso combinar com mecanismos como IPsec, conforme a arquitetura
exigir.

## MPLS x VPN sobre internet (IPsec)

| | MPLS VPN | VPN IPsec |
|---|---|---|
| Isolamento | Lógico no backbone do provedor | Proteção criptográfica sobre a rede IP |
| Controle | Controlado pelo provedor | Pode atravessar internet pública |

Não são mutuamente excludentes — **podem coexistir** na mesma arquitetura de rede.

> MPLS usa labels para acelerar o encaminhamento, mas ainda transporta frequentemente tráfego
> IP por baixo — e MPLS VPN não fornece criptografia fim a fim de forma automática. O
> isolamento lógico entre clientes não substitui criptografia quando ela é um requisito real.
