---
title: "IaaS, PaaS, SaaS e a estratégia multi-cloud"
description: "O que muda de responsabilidade em cada modelo de serviço em nuvem e quando considerar múltiplos provedores."
date: 2026-07-12
updatedDate: 2026-07-12
related: [cloud/fundamentos-aws-nuvem-custos-e-seguranca, cloud/iac-com-terraform]
---

## Modelos de serviço e responsabilidade compartilhada

```
                On-premise   IaaS       PaaS       SaaS
Aplicação          Você       Você       Você      Provedor
Dados              Você       Você       Você      Provedor
Runtime            Você       Você      Provedor   Provedor
Middleware         Você       Você      Provedor   Provedor
SO                 Você       Você      Provedor   Provedor
Virtualização      Você     Provedor    Provedor   Provedor
Servidores/Rede    Você     Provedor    Provedor   Provedor
```

- **IaaS** (EC2, Compute Engine): você gerencia SO, runtime e aplicação; o provedor cuida do
  hardware físico.
- **PaaS** (Elastic Beanstalk, App Engine, Cloud Run): você entrega código/container, o
  provedor cuida de SO, runtime e escalonamento.
- **SaaS** (Google Workspace, Salesforce): você só consome a aplicação pronta.

Entender essa fronteira é o que define, num incidente, **de quem é a responsabilidade** — um
erro comum é tratar uma falha de infraestrutura subjacente em PaaS como se fosse algo que a
equipe de aplicação devesse resolver.

## Por que considerar multi-cloud

- **Resiliência**: reduzir dependência de um único provedor para workloads críticos.
- **Negociação e custo**: evitar lock-in que reduza poder de barganha em contratos.
- **Requisitos regulatórios/soberania de dados**: alguns setores exigem dados em provedores
  ou regiões específicas.
- **Melhor ferramenta para cada carga**: usar o serviço gerenciado mais maduro de cada nuvem
  para uma necessidade específica (ex: BigQuery para analytics, mesmo hospedando o resto em
  outro provedor).

## O custo real do multi-cloud

Multi-cloud não é gratuito: cada provedor tem APIs, modelos de IAM e ferramentas de
observabilidade diferentes. Sem abstração (Terraform, Kubernetes como camada comum,
Crossplane), a equipe acaba mantendo conhecimento e automação duplicados.

```hcl
# mesmo módulo Terraform, providers diferentes
module "app_aws" {
  source = "./modules/app"
  providers = { cloud = aws }
}

module "app_gcp" {
  source = "./modules/app"
  providers = { cloud = google }
}
```

> Antes de adotar multi-cloud "por segurança", vale medir se a maturidade operacional atual
> já lida bem com **uma** nuvem. Multi-cloud malfeito multiplica a superfície de erro
> operacional sem entregar a resiliência prometida — geralmente faz mais sentido depois que
> observabilidade, IaC e processos de incident response já estão maduros num único provedor.
