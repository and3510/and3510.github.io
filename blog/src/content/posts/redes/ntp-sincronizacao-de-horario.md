---
title: "NTP: sincronização de horário em redes"
description: "Por que relógios dessincronizados entre servidores são um problema de segurança, não só de conveniência."
date: 2026-09-20
updatedDate: 2026-09-20
---

## O que é NTP

**Network Time Protocol** sincroniza os relógios dos dispositivos de uma rede. Objetivo:
tempo consistente entre todos os sistemas.

```
Fonte de tempo → Servidor NTP → Switch, Servidor, Firewall, Estação (todos com o mesmo instante)
```

## Por que horário correto importa

- Correlação de logs entre sistemas diferentes.
- Auditoria e conformidade.
- Autenticação (Kerberos, tokens dependem de janelas de tempo válidas).
- Validade de certificados.
- Investigação de incidentes.
- Sistemas distribuídos e tarefas agendadas.

```
Exemplo: Firewall registra ataque às 14:03.
Servidor registra o mesmo evento às 14:07, por relógio incorreto.
Resultado: investigação fica confusa e a linha do tempo real do incidente se perde.
```

## Hierarquia por Stratum

```
Stratum 0 → fonte de referência de alta precisão (relógio atômico, GPS) — não consultado diretamente por usuários
Stratum 1 → servidores conectados diretamente à referência
Stratum 2 → sincronizados com servidores Stratum 1
Stratum 3+ → sincronizados com níveis superiores
```

> Número de stratum menor significa mais próximo da referência — não necessariamente "mais
> poderoso" em termos de hardware.

## Offset, delay e jitter

- **Offset**: diferença entre o relógio local e a fonte de tempo — quanto o relógio está
  adiantado ou atrasado.
- **Delay**: tempo de ida e volta da comunicação entre cliente e servidor NTP.
- **Jitter**: variação entre as medições de delay ao longo do tempo, mostrando a estabilidade
  da rede.

## Ajuste gradual x salto

Implementações podem ajustar gradualmente o relógio (correção suave) ou corrigir diretamente
(salto), quando a diferença é grande, conforme configuração.

## Porta e UTC

- NTP utiliza **UDP na porta 123**.
- **UTC (Tempo Universal Coordenado)**: referência de tempo usada mundialmente em sistemas —
  NTP sincroniza a referência de tempo; **fuso horário** define como esse instante é exibido
  localmente. São conceitos diferentes: sincronizar relógio não é o mesmo que escolher fuso.

## Redundância e segurança

- Usar múltiplas fontes de sincronização ajuda a detectar fontes inconsistentes e aumenta a
  disponibilidade.
- Historicamente, servidores NTP mal configurados já foram usados em ataques de amplificação
  DDoS (reflexão) — manter servidores atualizados e filtrados é uma prática de segurança
  relevante.

> Stratum 0 não é um servidor comum consultado diretamente por clientes — é a fonte de
> referência (ex: GPS, relógio atômico). E NTP **não é responsável** por DNS, DHCP ou
> endereçamento IP — sua única função é sincronização de horário.
