---
title: "VLANs e Trunks"
description: "Como separar logicamente uma rede física em vários domínios de broadcast independentes."
date: 2026-11-17
updatedDate: 2026-11-17
---

## O que é uma VLAN

**Virtual Local Area Network** permite separar logicamente dispositivos em redes de camada 2
distintas, mesmo compartilhando o mesmo switch físico. Padronizada pelo **IEEE 802.1Q**.

```
VLAN 10 (Financeiro)   VLAN 20 (RH)   VLAN 30 (TI)
```

Benefícios: segmentação, organização, redução de broadcast, separação lógica de grupos e
apoio à segurança.

## Cada VLAN é um domínio de broadcast separado

Um broadcast na VLAN 10 **não** é encaminhado diretamente à VLAN 20 por um switch de camada
2 — comunicação entre VLANs diferentes exige roteamento (**inter-VLAN routing**).

## Porta Access x Porta Trunk

- **Porta Access**: pertence tipicamente a uma única VLAN, para tráfego de dispositivo final
  (ex: computador do Financeiro conectado à porta access da VLAN 10). Nesse cenário, o
  tráfego chega ao dispositivo final normalmente sem tag 802.1Q.
- **Porta Trunk**: transporta tráfego de **múltiplas VLANs** entre equipamentos (switch ↔
  switch, switch ↔ roteador, switch ↔ servidor/hypervisor).

```
Switch A —[Trunk 802.1Q: VLAN 10, 20, 30]— Switch B
```

## Marcação 802.1Q

Adiciona uma tag ao quadro Ethernet contendo o identificador de VLAN (e outros campos
relacionados).

```
Dst MAC | Src MAC | 802.1Q TAG | Type/Len | Dados | FCS
                    (VLAN ID: 12 bits, PCP, DEI, TPID)
```

- **VLAN ID**: identifica a VLAN transportada, com faixa técnica de 12 bits.
- **Native VLAN**: em trunks 802.1Q tradicionais, pode existir uma VLAN configurada para
  tráfego sem tag. **VLAN Padrão (PVID) não é sinônimo de VLAN Nativa (untagged)** —
  configurações inconsistentes entre switches conectados podem causar problemas de
  segurança.

## Inter-VLAN Routing

Como VLANs diferentes não se comunicam diretamente na camada 2, a comunicação entre elas
exige um roteador ou switch de camada 3.

```
VLAN 10 → L3 (roteador ou switch de camada 3) → VLAN 20
```

**Router-on-a-stick**: um roteador usa subinterfaces em uma única interface física trunk para
rotear entre VLANs, cada subinterface associada a uma VLAN.

```
Subinterface VLAN 10: 192.168.10.1/24
Subinterface VLAN 20: 192.168.20.1/24
```

> VLAN é um conceito de camada 2; sub-rede IP é um conceito de camada 3. Embora normalmente
> uma VLAN seja associada a uma sub-rede IP em projetos comuns, os dois conceitos são
> distintos — nada obriga uma correspondência 1:1 tecnicamente, é apenas a convenção mais
> comum. E um trunk transporta múltiplas VLANs; uma porta access tipicamente atende só uma.
