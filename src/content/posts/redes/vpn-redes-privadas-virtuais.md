---
title: "VPN: redes privadas virtuais"
description: "Como criar um túnel privado sobre uma infraestrutura pública compartilhada como a internet."
date: 2026-12-26
updatedDate: 2026-12-26
---

## O que é VPN

**Virtual Private Network** cria conectividade lógica privada sobre uma infraestrutura
compartilhada, como a internet. Palavra-chave: túnel.

```
Escritório A ⇄ [Túnel protegido] ⇄ Internet ⇄ [Túnel] ⇄ Escritório B
```

Usos: conectar filiais, acesso remoto, proteger tráfego em rede pública, acesso a recursos
internos, interligar ambientes.

## Site-to-Site x Remote Access

- **Site-to-Site**: conecta duas redes inteiras (ex: Matriz ↔ Filial). Usuários normalmente
  não iniciam a VPN individualmente — ela já existe entre os gateways.
- **Remote Access**: conecta um dispositivo/usuário remoto à rede da organização (ex:
  notebook em casa → VPN → rede corporativa).

## IPsec: túnel x transporte

**IPsec** é um conjunto de protocolos/mecanismos para proteção na camada IP, com objetivos de
autenticação, integridade, confidencialidade (quando criptografia é usada) e proteção contra
replay.

- **Tunnel mode**: protege o pacote IP original, encapsulando-o dentro de um novo pacote —
  muito associado a gateways e VPN site-to-site.
- **Transport mode**: protege principalmente o conteúdo (payload), mantendo o cabeçalho IP
  externo original — usado em alguns cenários host-to-host.

### Componentes do IPsec

- **AH (Authentication Header)**: fornece autenticação/integridade **sem** fornecer
  confidencialidade — não criptografa o conteúdo.
- **ESP (Encapsulating Security Payload)**: fornece confidencialidade e pode também prover
  autenticação/integridade — é, de longe, o mais comum em VPNs modernas.
- **IKE (Internet Key Exchange)**: negocia parâmetros de segurança e chaves para o IPsec.

## SSL/TLS VPN

Usa TLS para criar acesso protegido em cenários de acesso remoto ou publicação de
aplicações — pode funcionar via navegador ou cliente dedicado.

## Split Tunnel x Full Tunnel

- **Split Tunnel**: apenas o tráfego destinado à rede corporativa vai pela VPN; o restante
  sai diretamente para a internet. Vantagem: menos tráfego no concentrador. Risco: aumenta a
  superfície de ataque, exigindo política de segurança adicional.
- **Full Tunnel**: todo o tráfego do cliente passa pela VPN. Vantagem: mais controle
  centralizado. Custo: maior uso de banda/infraestrutura.

## Pegadinhas de prova

- **VPN não garante confiança absoluta**: o túnel protege a comunicação, mas endpoints
  comprometidos continuam sendo um risco real.
- **VPN ≠ VLAN**: VPN é túnel/conectividade privada sobre outra rede; VLAN é segmentação
  lógica da camada 2.
- **VPN não significa anonimato na internet** — a função depende do projeto e do ponto de
  terminação do túnel, não é uma garantia automática de privacidade total.

> Site-to-Site conecta rede a rede; Remote Access conecta usuário/dispositivo a rede; IPsec
> opera na camada IP. Essas três associações resolvem a maioria das dúvidas práticas sobre
> qual tipo de VPN um cenário específico exige.
