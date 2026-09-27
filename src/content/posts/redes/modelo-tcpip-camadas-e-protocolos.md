---
title: "Modelo TCP/IP: camadas e protocolos"
description: "O modelo prático de quatro camadas que efetivamente roda por trás da internet."
date: 2026-08-27
updatedDate: 2026-08-27
---

## As quatro camadas

```
4. Aplicação      — HTTP/HTTPS, DNS, SMTP, FTP, SSH, DHCP
3. Transporte     — TCP, UDP (usa portas)
2. Internet       — IPv4, IPv6, ICMP (roteamento entre redes)
1. Acesso à Rede  — Ethernet, Wi-Fi (entrega na rede local)
```

O modelo TCP/IP é a base real da internet — mais enxuto que o OSI, mas cobrindo as mesmas
responsabilidades essenciais.

## OSI x TCP/IP

```
OSI (7 camadas)          TCP/IP (4 camadas)
7. Aplicação    ┐
6. Apresentação ├──→     Aplicação
5. Sessão       ┘
4. Transporte   ──→     Transporte
3. Rede         ──→     Internet
2. Enlace       ┐
1. Física       ┴──→    Acesso à Rede
```

Alguns materiais dividem "Acesso à Rede" em Enlace e Física separadamente — o importante é
seguir o modelo explícito indicado no contexto (prova, documentação, discussão técnica), pois
não há uma única convenção universal de quantas camadas o TCP/IP "oficialmente" tem.

## Encapsulamento simplificado

```
Dados da Aplicação → Segmento/Datagrama → Pacote IP → Quadro → Bits
```

- **Porta** identifica a aplicação (como o número de um apartamento).
- **IP** identifica o destino na rede (como o endereço do prédio).
- Juntos, entregam os dados ao destino certo.

## Pegadinhas comuns

- No modelo TCP/IP clássico de 4 camadas, **não existem camadas separadas de Sessão e
  Apresentação** — essas funções ficam dentro da camada de Aplicação.
- **DNS está na camada de Aplicação**, não em uma camada inferior — mesmo resolvendo algo tão
  "básico" quanto um nome, ele opera como um protocolo de aplicação.
- **TCP é apenas um protocolo da camada de Transporte** — nem todo tráfego usa TCP; DNS, por
  exemplo, frequentemente usa UDP para consultas simples.

> O modelo TCP/IP é importante porque é a base da internet, padrão usado em praticamente toda
> rede moderna, interoperável e escalável — entender suas quatro camadas é o que permite
> raciocinar sobre onde um problema de rede realmente está.
