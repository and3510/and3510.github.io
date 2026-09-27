---
title: "DNS: sistema de nomes de domínio"
description: "Como nomes legíveis por humanos viram endereços IP, e os tipos de registro que mais aparecem no dia a dia."
date: 2026-09-06
updatedDate: 2026-09-06
---

## Função principal

**Domain Name System** resolve nomes para informações associadas — o uso mais comum é
resolver nomes para endereços IP.

```
www.exemplo.com → DNS → 203.0.113.10
```

## Hierarquia DNS

```
. (root) → .com (TLD) → exemplo.com (domínio) → www.exemplo.com (FQDN)
```

- **Root**: topo lógico da hierarquia.
- **TLD (Top-Level Domain)**: `.com`, `.org`, `.gov`, `.br`.
- **Domínio**: zona administrada dentro da hierarquia.
- **FQDN**: nome completo de um host dentro da hierarquia DNS.

## Resolução recursiva x iterativa

- **Recursiva**: o servidor consultado assume a responsabilidade de obter a resposta final,
  consultando outros servidores em nome do cliente.
- **Iterativa**: o servidor retorna a melhor informação/referência disponível para que o
  processo continue no lado de quem perguntou.

```
Cliente → Resolver Recursivo → Root → TLD → Autoritativo → Resposta
```

## Registros mais cobrados

- **A**: nome → endereço IPv4.
- **AAAA**: nome → endereço IPv6.
- **CNAME**: nome canônico/alias para outro nome.
- **MX**: servidores responsáveis por e-mail do domínio.
- **NS**: servidores de nomes autoritativos para a zona.
- **TXT**: texto arbitrário usado por diferentes mecanismos e políticas.
- **PTR**: resolução reversa, endereço → nome, em zonas apropriadas.
- **SOA**: informações administrativas essenciais da zona.

## Servidor autoritativo, cache e TTL

- **Servidor autoritativo**: possui informações oficiais para determinada zona.
- **Cache**: respostas armazenadas temporariamente para reduzir latência e repetição de
  consultas.
- **TTL no DNS**: indica por quanto tempo uma informação pode permanecer em cache — não é o
  mesmo TTL do cabeçalho IP, apesar do nome coincidir.

## Pegadinhas comuns

- **DNS usa UDP ou TCP na porta 53**: UDP é comum em consultas tradicionais; TCP também é
  usado em diferentes situações (respostas grandes, transferência de zona).
- **DNSSEC** fornece mecanismos de autenticidade e integridade por meio de assinaturas
  criptográficas — mas **não criptografa** necessariamente o conteúdo das consultas.
- **CNAME aponta para outro nome**, não diretamente para um endereço IP.
- **MX está associado a servidores de correio eletrônico**; **PTR** à resolução reversa —
  fácil de trocar um pelo outro sob pressão de prova.

> DNS é a espinha dorsal invisível de quase todo serviço de rede — desde a resolução de um
> site até a localização de Domain Controllers no Active Directory (via registros SRV). DNS
> quebrado costuma se manifestar como "tudo parou de funcionar", mesmo quando o problema real
> é só a resolução de nomes.
