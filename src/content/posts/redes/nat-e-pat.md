---
title: "NAT e PAT: tradução de endereços"
description: "Como uma rede inteira compartilha um único IP público, e por que isso não é a mesma coisa que um firewall."
date: 2026-09-07
updatedDate: 2026-09-07
---

## NAT — Network Address Translation

Modifica informações de endereçamento IP ao atravessar um dispositivo de tradução —
tipicamente um roteador na borda da rede.

```
Rede interna          Roteador NAT         IP público
192.168.1.10 ┐
192.168.1.11 ├────→   NAT   ────→   203.0.113.10
192.168.1.12 ┘
```

O uso clássico é permitir comunicação entre uma rede privada e a rede pública, já que
endereços privados não são roteáveis diretamente na internet.

## NAT estático x dinâmico

- **NAT estático**: associação fixa, um endereço interno ↔ um endereço externo específico.
- **NAT dinâmico**: usa um conjunto (pool) de endereços públicos disponíveis; o cliente
  interno recebe uma tradução temporária conforme disponibilidade.

## PAT — Port Address Translation

Também chamado de **NAT Overload**: múltiplos hosts internos compartilham um único endereço
público, diferenciados pela porta de origem.

```
192.168.1.10:50001 ┐
192.168.1.11:50002 ├──→ 203.0.113.5 (portas diferentes)
192.168.1.12:50003 ┘
```

| Interno | Externo/Público | Porta |
|---|---|---|
| 192.168.1.10 | 203.0.113.5 | 50001 |
| 192.168.1.11 | 203.0.113.5 | 50002 |
| 192.168.1.12 | 203.0.113.5 | 50003 |

> PAT diferencia fluxos não apenas pelo endereço, mas também por porta — é isso que permite
> "muitos para um" compartilhando um único IPv4 público, o cenário mais comum em redes
> domésticas e de pequenas empresas.

## Port Forwarding

Mapeia uma porta específica do endereço público para um serviço interno, permitindo publicar
um serviço que está atrás do NAT.

```
203.0.113.5:443 → 192.168.1.20:443
```

## NAT ≠ Firewall

- **NAT** traduz endereços.
- **Firewall** aplica políticas de controle de tráfego.

Embora possam coexistir no mesmo equipamento (e muitas vezes coexistam mesmo), são funções
conceitualmente diferentes — NAT não é, por si só, um mecanismo de segurança, mesmo que
dificulte conexões iniciadas de fora por consequência colateral do seu funcionamento.

> NAT e fim a fim (end-to-end) não combinam bem: a tradução modifica endereços e pode
> dificultar alguns protocolos, exigindo mecanismos adicionais. O IPv6, com seu espaço de
> endereçamento enorme, reduz a necessidade de NAT tradicional para conservação de
> endereços — embora existam mecanismos de tradução para cenários específicos mesmo em IPv6.
