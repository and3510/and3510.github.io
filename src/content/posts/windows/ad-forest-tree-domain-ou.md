---
title: "AD: Forest, Tree, Domain e Organizational Unit"
description: "A hierarquia lógica que organiza identidade, administração e replicação no Active Directory."
date: 2026-09-09
updatedDate: 2026-09-09
---

## A hierarquia completa

```
Forest → Tree → Domain → OU
```

- **Forest**: o maior limite lógico do AD. Compartilha schema, configuration partition,
  global catalog e trusts internos entre domínios. É a principal fronteira de segurança
  administrativa do Active Directory.
- **Tree**: um ou mais domínios com namespace DNS contíguo (ex: `empresa.com` →
  `sp.empresa.com`).
- **Domain**: unidade de identidade, administração, políticas e replicação — tem seu próprio
  conjunto de objetos e DCs.
- **OU (Organizational Unit)**: contêiner lógico dentro de um domínio, usado para organizar
  objetos, delegar administração e vincular GPOs.

## Forest com múltiplas trees

Uma floresta pode conter trees com namespaces DNS **não contíguos** (ex: `empresa.com` e
`outramarca.net` na mesma floresta) — o requisito de contiguidade vale dentro de uma tree, não
entre trees diferentes da mesma floresta.

## Domain: root e child

```
empresa.com (root domain)
  └── sp.empresa.com (child domain)
```

A partição de nomes do domínio replica principalmente entre os DCs daquele domínio específico
— não para a floresta inteira.

## OU não é grupo de segurança

Um erro comum é confundir OU com grupo. **OU organiza e delega administração**; um **grupo de
segurança concede permissões**. Colocar um usuário dentro de uma OU não dá a ele acesso a
nenhum recurso por si só — isso é papel dos grupos e das ACLs.

## Trust entre domínios

**Trust** permite que identidades de um domínio/forest sejam reconhecidas em outro.

- **Transitive trust**: a confiança se estende através de caminhos (padrão dentro de uma
  floresta).
- **Two-way trust**: confiança em ambos os sentidos.
- **Forest trust**: entre florestas inteiras.

Trust permite **reconhecimento e autenticação** entre domínios — não concede permissão
automaticamente; o acesso real ainda depende de ACLs configuradas nos recursos.

## Site: topologia física, não identidade

**Site** representa a topologia de rede física/lógica (sub-redes, conectividade, custo de
link) — não é o mesmo conceito que Domain. Um site pode hospedar DCs de múltiplos domínios; um
domínio pode ter DCs espalhados por múltiplos sites. Site controla **onde** a replicação
acontece de forma otimizada; Domain controla identidade.

> Forest contém trees, trees contêm domains, domains contêm OUs — mas Site é uma camada
> paralela e independente dessa hierarquia lógica, representando apenas onde a infraestrutura
> de rede física está, para otimizar replicação e localização de serviços.
