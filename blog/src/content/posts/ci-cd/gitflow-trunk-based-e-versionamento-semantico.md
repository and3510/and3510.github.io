---
title: "GitFlow, Trunk-Based e Versionamento Semântico"
description: "Como escolher o modelo de branches (GitFlow ou Trunk-Based) e numerar as versões entregues com SemVer."
date: 2026-10-17
updatedDate: 2026-10-17
prerequisites: [ci-cd/integracao-entrega-e-implantacao-continuas]
related: [ci-cd/pipeline-com-github-actions, cloud/cicd-estrategias-blue-green-canary-rolling]
---

## Por que o modelo de branches importa

A forma como a equipe organiza as branches impacta diretamente a produtividade, a integração e
a cadência de entrega. Os dois modelos mais comuns são o **GitFlow** e o **Trunk-Based
Development**.

## GitFlow

Pensado para projetos com ciclos de release bem definidos e equipes maiores.

**Branches de longa duração:**

- `main`: código estável, pronto para produção. É onde ficam as *tags* de versão.
- `develop`: base do desenvolvimento e origem das demais branches.

**Branches de curta duração:**

- `feature/*`: nova funcionalidade, criada a partir da `develop` e integrada de volta a ela.
- `release/*`: criada a partir da `develop` para testes mais robustos antes de virar versão.
  Se aparecem problemas, a correção volta pela `develop`; quando tudo está pronto, é integrada
  à `main` e recebe uma tag.
- `hotfix/*`: criada a partir da `main` para corrigir um bug crítico em produção e integrada
  à `main` **e** à `develop`.

```bash
git checkout develop
git checkout -b feature/upload-de-imagem
# ... commits ...
git checkout develop && git merge --no-ff feature/upload-de-imagem

git checkout -b release/1.2.0 develop
# testes finais, ajustes
git checkout main && git merge --no-ff release/1.2.0
git tag -a v1.2.0 -m "Release 1.2.0"
```

> `hotfix` é só para erro que impede o uso do software (falha de segurança, banco inacessível).
> Um botão torto não justifica uma branch de hotfix.

**Vantagens:** isolamento de funcionalidades em desenvolvimento, ciclo de vida claro e maior
estabilidade nas releases.

**Desvantagens:** complexidade com muitas branches ativas e pouco dinamismo quando o deploy
é contínuo.

## Trunk-Based Development

A premissa é uma única branch principal (`main`/`trunk`) onde todos integram com frequência,
várias vezes ao dia, em mudanças pequenas. Branches de curta duração são permitidas, mas o
comum é o código ir direto para a `main` (ou via PRs curtos), usando **feature flags** para
esconder o que ainda não está pronto.

Para funcionar, a `main` precisa estar sempre liberável, o que exige uma **suíte de testes
robusta** rodando a cada integração.

**Vantagens:** menos conflitos de merge, feedback rápido, menos sobrecarga de manutenção de
branches e excelente encaixe com [[integracao-entrega-e-implantacao-continuas|CI/CD]].

**Desvantagens:** exige disciplina e automação de testes, e dificulta grandes reescritas que
demoram a ficar prontas.

## Qual escolher?

| Critério                  | GitFlow                          | Trunk-Based                     |
| :------------------------ | :------------------------------- | :------------------------------ |
| Ritmo de entrega          | Releases planejadas              | Deploy contínuo                 |
| Tamanho típico do time    | Maior, com múltiplas versões     | Menor, ou com alta maturidade   |
| Exigência de testes       | Moderada (validação na release)  | Alta (a `main` é sempre liberável) |
| Complexidade de branches  | Alta                             | Baixa                           |

Regra prática: se você publica versões numeradas e mantém mais de uma em paralelo (software
instalado, bibliotecas), o GitFlow ajuda. Se faz deploy contínuo de um serviço web e tem
pipeline e testes confiáveis, o Trunk-Based costuma render mais.

## Versionamento Semântico (SemVer)

Seja qual for o modelo, as versões entregues precisam de uma numeração que comunique o
**significado** da mudança. O SemVer usa o formato **MAJOR.MINOR.PATCH** (ex.: `1.9.0`):

| Parte | Incrementar quando...                                  | Compatibilidade |
| :---- | :----------------------------------------------------- | :-------------- |
| MAJOR | há mudanças **incompatíveis** na API                   | Quebra          |
| MINOR | se adiciona funcionalidade de forma retrocompatível    | Mantém          |
| PATCH | se corrige bug de forma retrocompatível                | Mantém          |

Ao subir o MAJOR, MINOR e PATCH voltam a 0; ao subir o MINOR, o PATCH volta a 0.

### Sufixos

- **Pré-lançamento** (`-`): versão instável, com precedência menor que a normal.
  `1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-beta < 1.0.0-rc.1 < 1.0.0`.
- **Metadados de build** (`+`): ex. `1.0.0+20130313`. São **ignorados** na precedência.

### Regras importantes

- **Imutabilidade:** uma versão lançada nunca é alterada; qualquer mudança vira nova versão.
- **`0.y.z`:** desenvolvimento inicial, a API não é considerada estável.
- **`1.0.0`:** define a API pública como estável; vale se já há produção ou quem dependa dela.
- **Deprecação:** avise em uma versão MINOR antes de remover algo em uma MAJOR.
- **Quebrou a API sem querer?** Corrija logo, lance uma nova versão que restaure a
  compatibilidade e avise os usuários.

## Juntando tudo no pipeline

No GitFlow, a branch de `release/*` é onde a versão é fechada: o merge na `main` recebe uma
tag SemVer (`v1.2.0`). Nos dois modelos, vale **automatizar a geração da versão e da tag** no
pipeline (por exemplo, a partir de Conventional Commits), para que o número da versão seja
consequência do que mudou, e não uma decisão manual sujeita a erro.
