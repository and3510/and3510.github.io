---
title: "Fundamentos da AWS: nuvem, custos e segurança"
description: "Conceitos de computação em nuvem, infraestrutura global, modelos de preço, TCO, responsabilidade compartilhada e IAM."
date: 2026-10-17
updatedDate: 2026-10-17
related: [cloud/alta-disponibilidade-e-escalabilidade, cloud/iac-com-terraform, cloud/modelos-de-servico-e-multi-cloud]
---

## Computação em nuvem

Modelo de entrega de serviços de TI sob demanda (servidores, armazenamento, bancos de dados) acessados pela internet, no lugar de infraestrutura física própria.

- **Sob demanda e pay-as-you-go:** paga-se pelo que se usa.
- **Escalabilidade e elasticidade:** aumentar ou reduzir recursos conforme a demanda.
- **Alta disponibilidade:** redundância evita falhas.
- **Automação:** provisionamento por código e ferramentas de orquestração.

A migração envolve negócio, pessoas, governança e operações, não só tecnologia: é o que o **AWS Cloud Adoption Framework (CAF)** organiza em seis perspectivas.

## Infraestrutura global

- **Região:** área geográfica ampla (São Paulo, Norte da Virgínia, Frankfurt), isolada fisicamente das outras. Dá tolerância a falhas e controle de compliance.
- **Zona de disponibilidade (AZ):** data center independente dentro de uma região, ligado às outras AZs por rede de alta velocidade e baixa latência.
- **Pontos de presença:** camada de borda que aproxima conteúdo do usuário.

Distribuir recursos entre AZs é o que viabiliza a alta disponibilidade. Considere ainda que **o preço varia entre regiões**.

## Custos

### Modelos de preço (EC2)

| Modelo       | Como funciona                                          |
| :----------- | :----------------------------------------------------- |
| Sob demanda  | Por hora ou segundo, sem compromisso                   |
| Reservadas   | Desconto por compromisso de 1 ou 3 anos                |
| Spot         | Capacidade ociosa com preço reduzido, para cargas flexíveis |

O custo também depende do **tipo de serviço** (EC2, S3, RDS), da **região** e da **transferência de dados**. Para estimar, use a AWS Pricing Calculator.

### TCO

O **Custo Total de Propriedade** compara o custo local com o da nuvem. Do lado local entram hardware, software (licenças e suporte), mão de obra e energia/refrigeração do data center. Na nuvem ganha-se menos infraestrutura física, pagamento sob demanda sem superprovisionamento e elasticidade.

### Governança de custo

**AWS Organizations** agrupa várias contas com faturamento consolidado e SCPs; **Budgets** e **Cost Explorer** ajudam a acompanhar e otimizar os gastos. Dimensionar bem os recursos (planejamento de capacidade) é o que evita pagar de mais ou faltar capacidade.

## Segurança

### Responsabilidade compartilhada

A segurança é dividida entre o provedor e o cliente:

- **AWS:** segurança *da* nuvem, ou seja, instalações físicas, hardware, rede global e a camada de virtualização.
- **Cliente:** segurança *na* nuvem, ou seja, dados, configuração dos serviços, sistema operacional das instâncias, firewall/Security Groups e gestão de acessos.

### IAM

O **AWS Identity and Access Management** controla quem pode fazer o quê nos recursos:

- **Usuários, grupos e roles:** identidades; roles são assumidas temporariamente (por serviços ou por outras contas) sem credenciais fixas.
- **Políticas:** documentos JSON que permitem ou negam ações sobre recursos.

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::meu-bucket/*"
  }]
}
```

Boas práticas: **menor privilégio**, MFA nas contas privilegiadas e evitar o uso do usuário root no dia a dia.

## Por que isso importa para DevOps

Entender regiões/AZs guia a arquitetura de alta disponibilidade; os modelos de preço guiam o custo; e IAM e responsabilidade compartilhada definem o que a sua equipe precisa proteger. Combine com [[alta-disponibilidade-e-escalabilidade|alta disponibilidade e escalabilidade]] e [[iac-com-terraform|IaC com Terraform]] para provisionar tudo de forma reprodutível.
