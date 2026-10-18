---
title: "SNMP: gerenciamento e monitoramento de redes"
description: "Como um sistema central consulta e recebe alertas de centenas de dispositivos de rede diferentes."
date: 2026-09-19
updatedDate: 2026-09-19
prerequisites: [redes/modelo-tcpip-camadas-e-protocolos]
related: [redes/ntp-sincronizacao-de-horario, cloud/observabilidade-metricas-logs-traces]
---

## O que é SNMP

**Simple Network Management Protocol** é usado para consultar o estado de equipamentos,
coletar métricas, receber alertas, e (quando permitido) alterar parâmetros, apoiando o
monitoramento de infraestrutura de rede.

## Arquitetura

```
NMS (Manager) ⇄ Roteador, Switch, Servidor, Impressora (cada um rodando um Agent)
```

- **Manager/NMS (Network Management System)**: o sistema que realiza consultas e recebe
  notificações.
- **Agent**: software/processo no equipamento gerenciado que fornece informações via SNMP.
- **MIB (Management Information Base)**: estrutura lógica que organiza os objetos
  gerenciáveis (utilização de interface, erros, status, uptime, tráfego).
- **OID (Object Identifier)**: identificador hierárquico de um objeto específico dentro da
  MIB.

## Operações SNMP

- **GET**: consulta o valor de um objeto.
- **GETNEXT**: retorna o próximo objeto da MIB.
- **GETBULK**: obtém múltiplos valores de forma eficiente.
- **SET**: altera o valor de um objeto, quando permitido.
- **RESPONSE**: resposta enviada pelo agente com o resultado.
- **TRAP**: notificação assíncrona do agente para o gerente, sem que o gerente tenha
  perguntado antes.
- **INFORM**: notificação com confirmação (requer resposta de recebimento).

```
Manager --GET--> Agent
Manager <--RESPONSE-- Agent
Agent   --TRAP--> Manager
```

## Portas

- **UDP 161**: consultas e operações normais no agente.
- **UDP 162**: traps/informs recebidos pelo gerenciador.

> Trap é enviada **pelo agente ao gerente** — não é uma consulta iniciada pelo gerente. É o
> contrário do fluxo GET/RESPONSE, e é um ponto comum de confusão.

## Versões

- **SNMPv1**: versão inicial, segurança limitada.
- **SNMPv2c**: melhorias de desempenho e operações, ainda usa community string.
- **SNMPv3**: adiciona autenticação, integridade e privacidade (criptografia) — a versão
  recomendada para ambientes que levam segurança a sério.

**Community string** é a informação de acesso compartilhada usada nas versões tradicionais
(v1/v2c) — não é uma proteção forte, apenas um segredo compartilhado simples (read-only ou
read-write).

## Polling x Trap

- **Polling**: o gerente pergunta periodicamente.
- **Trap**: o agente avisa quando um evento ocorre, sem esperar ser perguntado.

## Monitoramento típico

CPU, memória, disponibilidade, temperatura, tráfego, erros de interface.

> SNMP não é a mesma coisa que Syslog — SNMP é gerenciamento estruturado de objetos e
> métricas via MIB/OID; Syslog é registro e envio de mensagens de log em formato mais livre.
> Os dois frequentemente coexistem na mesma estratégia de observabilidade de infraestrutura.
