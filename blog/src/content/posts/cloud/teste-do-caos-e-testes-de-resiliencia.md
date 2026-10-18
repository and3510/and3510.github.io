---
title: "Teste do Caos e Testes de Resiliência"
description: "Teste de carga e teste do caos: como descobrir o limite e o comportamento da aplicação antes que o cliente descubra."
date: 2026-10-17
updatedDate: 2026-10-17
prerequisites: [cloud/sre-confiabilidade-e-toil]
related: [cloud/incidentes-self-healing-e-postmortem-blameless, cloud/resiliencia-timeout-retry-circuit-breaker]
---

## Resiliência é saber como o sistema falha

Testes de resiliência mostram quão confiável é a aplicação e como ela lida com situações adversas: erro de rede, erro de banco de dados, excesso de clientes. A ideia é descobrir **como o sistema falha antes de ele falhar para o cliente**. Fazer esses testes é função do SRE, e eles se dividem em duas frentes principais.

## Teste de carga

Simula as requisições de muitos usuários para descobrir quantas a aplicação aguenta antes de gerar falhas ou de o tempo de resposta ficar longo demais.

Uma ferramenta comum é o **Locust**, escrito em Python:

```python
from locust import HttpUser, task, between

class Usuario(HttpUser):
    wait_time = between(1, 3)

    @task
    def home(self):
        self.client.get("/")
```

```bash
locust -f locustfile.py --host https://minha-app.exemplo.com
```

Ao aumentar a carga, existe um ponto, o *server breakdown point*, a partir do qual as falhas começam e crescem em sequência.

> Depois do ponto de quebra o sistema tende a não se recuperar bem: as falhas continuam crescendo mesmo quando as requisições param de aumentar.

O resultado mostra o limite real da aplicação e é a entrada para dimensionar máquinas no **planejamento de capacidade**. O teste também pode rodar como etapa do [[integracao-entrega-e-implantacao-continuas|pipeline de CI/CD]].

## Teste do caos

Em vez de esperar a falha acontecer, **provocamos problemas de propósito** para analisar como a aplicação reage. Exemplos:

- problemas de rede (latência, perda de pacotes);
- falhas no banco de dados;
- desligar uma parte da aplicação ou um serviço específico.

Ele valida, na prática, se os mecanismos de recuperação funcionam, como o self-healing descrito em [[incidentes-self-healing-e-postmortem-blameless|incidentes e postmortem]] e os padrões de [[resiliencia-timeout-retry-circuit-breaker|timeout, retry e circuit breaker]].

Um experimento de caos bem conduzido:

1. Define o **comportamento normal** (métricas de estado estável, ligadas aos SLOs).
2. Formula uma **hipótese**: "se a instância X cair, o serviço continua respondendo".
3. **Injeta a falha** de forma controlada e com raio de impacto pequeno.
4. **Compara** o resultado com a hipótese e corrige o que divergiu.

Testar a queda de uma zona de disponibilidade inteira também é um teste de resiliência, e é por isso que distribuir recursos entre AZs importa.

## Como os dois se complementam

| Teste  | Pergunta que responde                       | Alimenta                     |
| :----- | :------------------------------------------ | :--------------------------- |
| Carga  | Quanto a aplicação aguenta?                 | Planejamento de capacidade   |
| Caos   | O que acontece quando algo falha?           | Mecanismos de auto-recuperação |
