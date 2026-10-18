---
title: "Segurança Wi-Fi: WEP, WPA, WPA2 e WPA3"
description: "A evolução dos protocolos que protegem redes sem fio — e por que WEP nunca deveria ser usado hoje."
date: 2026-09-15
updatedDate: 2026-09-15
prerequisites: [redes/wifi-ieee-802-11]
---

## Para que serve

Conjunto de protocolos e mecanismos que protegem redes Wi-Fi, garantindo confidencialidade,
integridade e autenticação — evitando acesso não autorizado e interceptação de dados
transmitidos sem fio.

## A evolução

```
WEP (inseguro) → WPA (transição) → WPA2 (sólido) → WPA3 (evolução)
```

- **WEP (Wired Equivalent Privacy)**: mecanismo antigo e vulnerável, usa RC4 em seu desenho
  clássico, com problemas criptográficos que permitem quebra prática. **WEP = inseguro e
  obsoleto**, nunca deveria ser usado atualmente.
- **WPA**: criado como solução de transição, fortemente associado ao TKIP em implementações
  tradicionais. Melhorou a segurança em relação ao WEP, mas também é considerado legado hoje.
- **WPA2**: baseado no IEEE 802.11i, fortemente associado a AES/CCMP — tornou-se o padrão
  dominante por muitos anos.
- **WPA3**: geração mais recente, inclui SAE no modo Personal, maior resistência a ataques
  offline de adivinhação de senha comparado ao PSK tradicional, e requisitos criptográficos
  aprimorados.

> WPA2 não é sinônimo de TKIP — WPA2 é fortemente associado a AES/CCMP, embora
> compatibilidades históricas com TKIP possam existir em alguns equipamentos legados.

## Personal x Enterprise

- **Personal**: normalmente destinado a redes menores, usa segredo compartilhado (PSK) ou
  mecanismo equivalente — WPA2-Personal usa PSK, WPA3-Personal usa SAE.
- **Enterprise**: autenticação individualizada, usa arquitetura 802.1X/EAP, frequentemente
  associada a um servidor RADIUS.

```
Fluxo Enterprise: Cliente → Access Point/Authenticator → Servidor RADIUS → Decisão de acesso
```

## 802.1X e EAP

- **802.1X**: estrutura de controle de acesso baseado em porta. Participantes conceituais:
  Supplicant (cliente), Authenticator (switch/AP), Authentication Server (normalmente
  RADIUS).
- **EAP (Extensible Authentication Protocol)**: framework para diferentes métodos de
  autenticação — EAP não é, sozinho, um único algoritmo específico.

Macete: **Cliente pede → AP controla → RADIUS autentica**.

## Outros pontos importantes

- **PMF (Protected Management Frames)**: proteção de determinados quadros de gerenciamento,
  associada à evolução da segurança Wi-Fi.
- **Rede aberta**: ausência de autenticação tradicional não significa necessariamente que não
  possa existir criptografia em tecnologias mais modernas — evite simplificações absolutas
  sobre "rede aberta = sem proteção alguma" sem checar o contexto específico.
- **WPS**: mecanismo de simplificação de associação; algumas modalidades históricas
  (especialmente PIN) apresentaram riscos — conveniência não substitui segurança.

> Mesmo com protocolos modernos como WPA3, credenciais fracas ainda prejudicam a segurança —
> senha forte continua importando, independentemente de qual protocolo de criptografia está
> em uso por trás dela.
