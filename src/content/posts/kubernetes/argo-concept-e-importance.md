---
title: "Conceito de Argocd"
description: "O que é Argocd e seu valor no deploy de aplicações no Kubernetes."
date: 2026-09-27
updatedDate: 2026-09-28
cover: https://i0.wp.com/blog.mocsolucoes.com.br/wp-content/uploads/2023/03/Argo-CD-Kubernete.jpg?resize=728%2C380&ssl=1
coverAlt: "Fonte: Imagem tirada do site blog.mocsolucoes.com.br"
---


## Conceito: O que é?

O Argocd é uma aplicação que é implementada como kubernetes controller, que orquestra os componentes do kubernetes por meio da sincronização de um repositório que centraliza esses manifestos com .yaml(s). 



## Importancia: Qual o seu valor?

O Argo CD segue o padrão GitOps de usar repositórios Git como a fonte da verdade (*source of truth*) para definir o estado desejado da aplicação. Os manifestos do Kubernetes podem ser especificados de várias maneiras:

* Aplicações Kustomize
* Helm charts
* Arquivos Jsonnet
* Diretório simples com manifestos YAML/JSON
* Qualquer ferramenta de gerenciamento de configuração personalizada, desde que configurada como um plugin de gerenciamento de configuração

Qualquer alterção no repositorio, dessincroniza o yaml do componente que esta rodando o kubernetes com uma marcação `OutOfSync`.


## Recursos: O que dar pra fazer?

* Implantação automatizada de aplicações em ambientes de destino especificados
* Suporte a múltiplas ferramentas de gerenciamento de configurações/templates (Kustomize, Helm, Jsonnet, plain-YAML puro)
* Capacidade de gerenciar e fazer a implantação (deploy) em múltiplos clusters
* Integração com SSO (OIDC, OAuth2, LDAP, SAML 2.0, GitHub, GitLab, Microsoft, LinkedIn)
* Multilocação (Multi-tenancy) e políticas baseadas em funções (RBAC) para autorização
* Reversão (Rollback/Roll-anywhere) para qualquer configuração de aplicação com commit no repositório Git
* Análise de integridade (health status) dos recursos da aplicação
* Detecção e visualização automatizadas de desvios de configuração (configuration drift)
* Sincronização manual ou automática de aplicações para o estado desejado
* Interface Web (Web UI) que fornece uma visão em tempo real da atividade da aplicação
* CLI para automação e integração de CI (Integração Contínua)
* Integração via Webhook (GitHub, BitBucket, GitLab)
* Tokens de acesso para automação
* Hooks de PreSync, Sync e PostSync para suportar implantações (rollouts) complexas de aplicações (ex: atualizações *blue/green* e *canary*)
* Trilhas de auditoria para eventos de aplicações e chamadas de API
* Métricas do Prometheus
* Substituição de parâmetros (overrides) para sobrescrever parâmetros do Helm no Git
