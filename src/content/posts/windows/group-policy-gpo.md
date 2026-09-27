---
title: "Group Policy: GPO, herança e processamento"
description: "Como o Windows aplica configurações centralizadas a milhares de máquinas e usuários de forma consistente."
date: 2026-08-16
updatedDate: 2026-08-16
---

## O que é uma GPO

Um **Group Policy Object (GPO)** é um conjunto de configurações administrativas — segurança,
firewall, scripts, desktop, Windows Update, mapeamentos de rede, restrições de aplicações —
vinculado a um escopo do Active Directory.

```
GPO → vinculada a Site / Domain / OU → aplica a Computadores + Usuários
```

Uma GPO tem duas grandes áreas: **Computer Configuration** (acompanha a máquina,
independente de quem faz login) e **User Configuration** (acompanha o usuário,
independente de onde ele faz login).

## LSDOU: a ordem de processamento

```
Local → Site → Domain → OU pai → OU filha
```

Do geral para o específico — em conflitos entre políticas equivalentes, a que é processada
por último geralmente prevalece, e objetos mais próximos do objeto final costumam vencer,
salvo exceções deliberadas (como Enforced).

## Herança e exceções

- **Herança**: uma GPO de nível superior pode atingir OUs descendentes.
- **Block Inheritance**: bloqueia a herança comum de GPOs de níveis superiores.
- **Enforced**: força a herança e precedência de uma GPO específica, **atravessando** até
  mesmo o Block Inheritance daquele nível abaixo.
- **Link Order**: quando múltiplas GPOs estão vinculadas ao mesmo contêiner, a ordem do link
  determina precedência entre elas.

## Filtros de aplicação

- **Security Filtering**: o link da GPO define **onde** ela pode se aplicar; filtrar por
  grupo de segurança define **para quem**, dentro daquele escopo.
- **WMI Filtering**: aplica a GPO apenas quando uma consulta WMI é verdadeira (ex: versão do
  SO, hardware específico) — condição dinâmica de aplicação.

## Loopback Processing

Faz o ambiente do **usuário** depender da **máquina** em que ele fez login, útil em
quiosques, laboratórios e terminais compartilhados. Modos:

- **Merge**: soma as políticas de usuário do computador às do usuário normal.
- **Replace**: substitui completamente a política de usuário pela política daquele
  computador.

## GPC e GPT

Uma GPO é composta por duas partes: **Group Policy Container (GPC)**, armazenado no AD, e
**Group Policy Template (GPT)**, armazenado no SYSVOL. Problemas de replicação do SYSVOL
entre DCs causam políticas inconsistentes ou divergentes entre sites.

```bash
gpupdate /force    # reaplica políticas imediatamente
gpresult /r         # mostra as políticas resultantes aplicadas
```

> Uma GPO não é vinculada diretamente a um grupo de segurança como se fosse um nível
> hierárquico do AD — grupos participam do processamento de GPO através de Security
> Filtering, não como um ponto de vínculo direto como Site, Domain ou OU.
