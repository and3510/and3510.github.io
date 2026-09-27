---
title: "Firewall no Linux com nftables"
description: "Substituto moderno do iptables: como estruturar tabelas, chains e regras de filtragem."
date: 2026-07-06
updatedDate: 2026-07-06
---

## Por que nftables

O **nftables** substitui o conjunto `iptables`/`ip6tables`/`arptables`/`ebtables` por um
único framework, com sintaxe mais legível e melhor performance para conjuntos grandes de
regras.

## Estrutura básica

```bash
nft add table inet filter
nft add chain inet filter input { type filter hook input priority 0 \; policy drop \; }
nft add rule inet filter input ct state established,related accept
nft add rule inet filter input iif lo accept
nft add rule inet filter input tcp dport 22 accept
nft add rule inet filter input tcp dport { 80, 443 } accept
```

Ou de forma declarativa, em `/etc/nftables.conf`:

```
table inet filter {
  chain input {
    type filter hook input priority 0; policy drop;

    ct state established,related accept
    iif lo accept
    tcp dport 22 accept
    tcp dport { 80, 443 } accept
    ip protocol icmp accept
  }
}
```

```bash
nft -f /etc/nftables.conf
systemctl enable --now nftables
```

## Verificando e depurando

```bash
nft list ruleset
nft list table inet filter
nft delete rule inet filter input handle 5
```

## Boas práticas

- Defina `policy drop` na chain `input` e libere explicitamente só o necessário — postura
  padrão-negar, não padrão-permitir.
- Sempre libere `ct state established,related` antes de qualquer regra restritiva, senão o
  tráfego de retorno de conexões legítimas é bloqueado.
- Teste regras em uma sessão SSH secundária ou com `at`/timer de rollback antes de aplicar em
  produção remota — um `policy drop` mal configurado pode trancar você para fora do
  servidor.

> Diferente do iptables, o nftables não tem chains padrão pré-criadas — você define
> explicitamente hooks (`input`, `forward`, `output`) e prioridades, o que exige mais cuidado
> na primeira configuração, mas deixa o comportamento mais previsível.
