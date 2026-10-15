---
title: "Infraestrutura como Código com Terraform"
description: "Como provisionar e versionar infraestrutura de nuvem de forma declarativa e reprodutível."
date: 2026-07-10
updatedDate: 2026-07-10
---

## Por que IaC

Provisionar recursos manualmente pelo console da nuvem não é auditável, não é reproduzível e
não escala entre ambientes (dev, staging, prod). **Terraform** descreve a infraestrutura
desejada em código declarativo e calcula o diff entre estado atual e desejado.

```hcl
# main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket = "minha-empresa-tfstate"
    key    = "app/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "app" {
  ami           = "ami-0abcdef1234567890"
  instance_type = "t3.micro"

  tags = {
    Name = "app-server"
    Env  = "production"
  }
}
```

## Fluxo básico

```bash
terraform init      # baixa providers e configura o backend
terraform plan       # mostra o diff entre estado e código
terraform apply       # aplica as mudanças
terraform destroy      # remove tudo que o Terraform gerencia
```

## Estado remoto e locking

Guardar o `.tfstate` localmente é inviável em equipe: dois engenheiros aplicando ao mesmo
tempo corrompem o estado. Um **backend remoto** (S3 + DynamoDB para lock, Terraform Cloud,
etc.) resolve isso.

```hcl
backend "s3" {
  bucket         = "minha-empresa-tfstate"
  key            = "app/terraform.tfstate"
  region         = "us-east-1"
  dynamodb_table = "terraform-locks"
  encrypt        = true
}
```

## Módulos para reuso

```hcl
module "vpc" {
  source     = "./modules/vpc"
  cidr_block = "10.0.0.0/16"
  env        = "production"
}
```

Módulos evitam duplicar a mesma definição de VPC, cluster ou banco entre múltiplos ambientes
— cada ambiente só passa variáveis diferentes para o mesmo módulo.

> `terraform apply` sem revisar o `plan` antes é a causa mais comum de incidentes com
> Terraform em produção — sempre trate o `plan` como um pull request de infraestrutura,
> revisado antes de aplicar, idealmente automatizado em pipeline de CI/CD.
