---
title: "Wi-Fi: IEEE 802.11, frequências e conceitos"
description: "Os fundamentos por trás de toda rede sem fio — de bandas de frequência a como dispositivos evitam colisão no ar."
date: 2026-09-14
updatedDate: 2026-09-14
prerequisites: [redes/ethernet-mac-e-switches]
related: [redes/seguranca-wifi-wep-wpa-wpa2-wpa3, redes/cabeamento-fibra-e-meios-de-transmissao]
---

## O que é Wi-Fi

Tecnologia de rede local sem fio baseada nos padrões da família **IEEE 802.11**.

```
Notebook/Smartphone ⇢ Access Point (AP) → Rede cabeada/Internet
```

- **Access Point (AP)**: fornece conectividade sem fio a dispositivos, normalmente conectando
  a WLAN à infraestrutura cabeada.
- **SSID**: nome lógico da rede sem fio (ex: "REDE-TI").
- **BSSID**: identificador associado a uma célula/interface de AP, frequentemente baseado em
  endereço MAC.

## Bandas de frequência

- **2,4 GHz**: maior alcance relativo, maior interferência, menos canais independentes na
  maioria dos domínios regulatórios.
- **5 GHz**: mais canais disponíveis, maior capacidade em muitos cenários, alcance físico
  geralmente menor em condições equivalentes.
- **6 GHz**: usada pelas gerações mais recentes compatíveis, mais espectro disponível, exige
  dispositivos e regulamentação apropriados.

## Padrões e nomes comerciais

```
802.11b → 2,4 GHz    Wi-Fi 4 = 802.11n
802.11a → 5 GHz       Wi-Fi 5 = 802.11ac
802.11g → 2,4 GHz     Wi-Fi 6 = 802.11ax
802.11n → 2,4/5 GHz    Wi-Fi 6E = 802.11ax em 6 GHz
802.11ac → 5 GHz
802.11ax → 2,4/5 GHz e extensão Wi-Fi 6E/6 GHz
```

## Canal e interferência

Um **canal** é uma faixa específica de frequência usada para comunicação. Interferência pode
ocorrer quando redes próximas usam canais sobrepostos. Em 2,4 GHz, os canais não sobrepostos
mais comuns são 1, 6 e 11.

## CSMA/CA

Wi-Fi utiliza **Carrier Sense Multiple Access with Collision Avoidance** — o dispositivo
escuta o meio e tenta evitar colisões antes de transmitir.

Macete: **Wi-Fi evita** colisão (CSMA/**CA**); **Ethernet antiga compartilhada detectava**
colisão (CSMA/**CD**).

## Outros conceitos

- **MIMO**: múltiplas antenas/fluxos espaciais podem aumentar capacidade e robustez.
- **OFDMA**: em gerações mais recentes, permite divisão eficiente do canal entre múltiplos
  usuários simultaneamente.
- **Roaming**: dispositivo pode se mover entre APs da mesma infraestrutura mantendo
  conectividade, conforme arquitetura e suporte da rede.
- **Modo Infrastructure**: clientes se comunicam por meio de um AP (o cenário mais comum).
- **Ad Hoc**: comunicação direta entre dispositivos, sem AP, em modelo suportado apenas em
  contextos específicos.

> Esconder o SSID não torna uma WLAN segura por si só — é apenas obscuridade superficial, não
> um mecanismo real de controle de acesso. A segurança de fato depende dos protocolos vistos
> no próximo post (WPA2/WPA3), não de esconder o nome da rede.
