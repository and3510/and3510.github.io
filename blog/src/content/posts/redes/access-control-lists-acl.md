---
title: "ACL: filtrando tráfego em redes"
description: "Listas de controle de acesso decidem, regra por regra e em ordem, o que passa e o que é bloqueado."
date: 2026-09-13
updatedDate: 2026-09-13
---

## O que é uma ACL

**Access Control List** é um conjunto ordenado de regras usado para permitir ou bloquear
tráfego, aplicável em roteadores, switches de camada 3, firewalls e outros dispositivos.

## Processamento de cima para baixo

As regras são avaliadas em ordem; quando uma regra corresponde, sua ação é aplicada e a
avaliação daquela ACL normalmente se encerra ali — **a primeira correspondência vence**.

```
Pacote → Regra 1 → casou? → ação (permit/deny)
              não casou ↓
           Regra 2 → casou? → ação
              não casou ↓
           Regra 3 → casou? → ação
              não casou ↓
           Ação final (normalmente deny implícito)
```

## Ordem importa

```
Ordem errada:
1. permitir toda a rede
2. negar host específico    ← nunca é alcançada, regra 1 já decidiu tudo

Ordem correta:
1. negar host específico
2. permitir toda a rede
```

> Regras mais específicas colocadas depois de uma regra geral permissiva podem nunca ser
> executadas — é a pegadinha de prova mais comum sobre ACL.

## ACL Standard x Extended

- **Standard**: filtra principalmente com base no endereço IP de **origem**.
- **Extended**: pode considerar origem, destino, protocolo e portas — muito mais detalhada.

```
Exemplo (ACL Estendida):
Permitir: origem 10.0.0.0/8 → destino servidor web → TCP porta 443
```

## Implicit Deny

Em muitas ACLs tradicionais, existe uma negação implícita ao final: o que não corresponder a
nenhuma regra de permissão explícita é bloqueado por padrão.

## ACL Stateless x Firewall Stateful

- **ACL simples (stateless)**: avalia pacotes segundo critérios, sem necessariamente
  acompanhar o estado completo da conexão.
- **Firewall stateful**: acompanha o estado das sessões, entendendo automaticamente que o
  tráfego de retorno de uma conexão permitida também deve ser permitido.

## Entrada x saída

ACL pode ser aplicada ao tráfego que entra ou sai de uma interface, dependendo da plataforma
— e a posição de aplicação (qual interface, qual direção) altera completamente o resultado
prático da mesma lista de regras.

> ACL controla tráfego/acesso segundo critérios definidos — **não substitui** mecanismos de
> autenticação. O princípio da menor permissão (permitir apenas o necessário) é a prática de
> segurança mais importante ao desenhar qualquer conjunto de regras.
