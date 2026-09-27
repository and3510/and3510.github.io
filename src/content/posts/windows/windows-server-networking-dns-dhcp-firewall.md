---
title: "Windows Server Networking: DNS, DHCP e Firewall"
description: "Como um cliente Windows recebe configuração de rede automaticamente e como isso se conecta ao Active Directory."
date: 2026-10-06
updatedDate: 2026-10-06
---

## O fluxo completo

```
Cliente → DHCP → IP + Gateway + DNS → Servidor → Firewall/Serviço
```

DNS é mais que resolver nomes para IP — para o Active Directory, é **crítico**: clientes e DCs
usam DNS para localizar Domain Controllers e sites, autenticação Kerberos e replicação
dependem de registros SRV corretos.

## DHCP Server Role

Fornece automaticamente IP, máscara, gateway, DNS e outras opções de configuração.

```
DORA: Discover → Offer → Request → Acknowledge
```

- **Scope**: faixa de endereços disponível para os clientes.
- **Exclusion**: endereços que não devem ser distribuídos dinamicamente.
- **Reservation**: IP fixo associado ao MAC de um cliente específico.
- **Lease**: prazo de uso do IP concedido.

> APIPA (`169.254.0.0/16`) geralmente indica falha de DHCP ou de conectividade — o cliente não
> conseguiu obter uma concessão e caiu no autoconfiguração de fallback.

## DNS Server Role

- **Forward Lookup Zone**: resolve nome → IP.
- **Reverse Lookup Zone**: resolve IP → nome (via registro PTR).

Registros principais: **A** (IPv4), **AAAA** (IPv6), **CNAME** (alias), **MX** (servidor de
e-mail), **NS** (servidores autoritativos), **SRV** (localização de serviço — essencial para o
AD).

```powershell
Get-NetIPConfiguration
Get-DnsClientServerAddress
Resolve-DnsName exemplo.com
```

## Windows Defender Firewall

Filtra por programa/serviço, porta, protocolo, endereço e **perfil de rede** (Domain,
Private, Public) — o mesmo host pode ter regras diferentes dependendo de estar conectado à
rede corporativa ou a uma rede pública.

## Ferramentas modernas de diagnóstico

```powershell
Test-NetConnection -ComputerName servidor -Port 443
Get-NetTCPConnection      # substitui netstat
Get-NetNeighbor           # tabela ARP/NDP
tracert servidor
pathping servidor          # combina ping e tracert para análise
```

## Cenário de diagnóstico

DHCP configura → DNS localiza → rota entrega → firewall permite → serviço responde. Testar
cada camada nessa ordem evita perder tempo investigando o componente errado primeiro — por
exemplo, assumir "problema de DNS" quando na verdade o firewall está bloqueando a porta do
serviço.

> Máquinas do domínio devem usar um DNS que consiga resolver a zona do Active Directory, não
> apenas um DNS público genérico — DNS incorreto em um cliente ou DC quebra autenticação e
> aplicação de políticas de forma silenciosa e difícil de diagnosticar à primeira vista.
