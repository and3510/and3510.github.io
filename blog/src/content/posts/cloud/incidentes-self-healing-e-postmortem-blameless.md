---
title: "Incidentes, Self-Healing e Postmortem Blameless"
description: "O ciclo de vida de um incidente em SRE: identificar, registrar, priorizar, responder com auto-cura e aprender com a análise de causa."
date: 2026-10-17
updatedDate: 2026-10-17
prerequisites: [cloud/sre-confiabilidade-e-toil, cloud/observabilidade-metricas-logs-traces]
related: [cloud/sli-slo-sla-error-budget, cloud/teste-do-caos-e-testes-de-resiliencia]
---

## O ciclo do incidente

Na pirâmide de confiabilidade do SRE, tudo começa no [[observabilidade-metricas-logs-traces|monitoramento]]. Em cima dele ficam o **gerenciamento de incidentes**, o **self-healing** e a **análise de causa**. Juntos formam o ciclo: detectar, tratar, aprender.

## Gerenciamento de incidentes

1. **Identificação:** perceber que há um incidente. Depende do monitoramento funcionando e precisa ser rápida, mas sem avisar qualquer erro pontual: se a falha se prolonga (alguns segundos já bastam), a equipe é notificada.
2. **Registro:** guardar o que está acontecendo, quando começou, a descrição e **quem descobriu** (plataforma de monitoramento, SRE, dev ou cliente). Respostas na família 5xx do HTTP, por exemplo, apontam problema na aplicação.
3. **Categorização:** por gravidade, urgência e área impactada.
4. **Priorização:** incidentes raramente vêm sozinhos. Se pagamentos (alta), saldo (média) e fatura (baixa) falham juntos, uma queda no banco de dados principal vale mais que "alta", porque provavelmente causa as outras.
5. **Resposta, resolução e encerramento:** não há fórmula única; uma técnica é o self-healing.

O registro existe para que, diante de um incidente parecido, outra equipe encontre como ele foi resolvido e reduza o tempo fora do ar. Os quatro primeiros passos parecem burocracia, mas sem eles cada incidente é resolvido do zero.

## Self-healing

Auto-cura: ao detectar o problema, a aplicação é derrubada e sobe de novo, de forma automatizada e em poucos segundos, de preferência em outra máquina e em ambiente novo.

```yaml
# Exemplo em Kubernetes: a liveness probe dispara o reinício do container
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  periodSeconds: 10
  failureThreshold: 3
```

É um reinício automático que reduz o tempo fora do ar enquanto a causa real é investigada, e também uma forma de eliminar [[sre-confiabilidade-e-toil|toil]].

> Cuidado: o self-healing muitas vezes resolve só temporariamente. O incidente ainda precisa ser registrado e investigado, ou o mesmo problema volta e fica escondido pela auto-cura.

## Análise de causa e postmortem

Depois do incidente, a pergunta é: **o que aconteceu e por que o erro aconteceu?** Essa análise (o *postmortem*) é a última prática da base da pirâmide, e os registros do gerenciamento de incidentes são sua matéria-prima.

### Blameless

O formato recomendado é o **postmortem blameless** (sem culpa): o foco é entender causas, linha do tempo e ações preventivas, e não achar um culpado. Se as pessoas temem punição, escondem erros e reportam tarde, e o sistema aprende menos.

Um postmortem enxuto costuma ter:

- **Resumo e impacto:** o que quebrou, por quanto tempo e quem foi afetado.
- **Linha do tempo:** detecção, registro, resposta e resolução.
- **Causa(s) raiz e fatores contribuintes:** o "porquê" técnico e de processo.
- **O que funcionou e o que não funcionou** na resposta.
- **Ações corretivas** com responsável e prazo.

O objetivo é aprender com a falha para ela não se repetir, que é o princípio de aprendizado contínuo do SRE. O resultado também alimenta o planejamento de capacidade e os [[teste-do-caos-e-testes-de-resiliencia|testes de resiliência]].
