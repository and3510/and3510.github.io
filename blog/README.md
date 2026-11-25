# DevOpsOne

Blog pessoal sobre Cultura DevOps, Engenharia de Plataforma e Infraestrutura —
estudos, projetos e laboratórios documentados em Markdown.

Construído com [Astro](https://astro.build) + Tailwind CSS, 100% estático e sem login.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:4321`.

## Adicionando conteúdo

Cada página do blog é um arquivo `.md` dentro de `src/content/posts/<categoria>/`.
A categoria é definida pelo nome da pasta — não precisa declarar nada no frontmatter.

```
src/content/posts/
├── kubernetes/
│   └── introducao-a-pods.md
└── ci-cd/
    └── pipeline-com-github-actions.md
```

Frontmatter de cada `.md`:

```yaml
---
title: "Título da página"
description: "Resumo curto (opcional, aparece nos cards)"
date: 2026-01-15 # opcional, usado para ordenar
draft: false      # opcional, esconde a página quando true
---
```

### Ligando posts entre si

- **Pré-requisitos e relacionados** (frontmatter, ids `categoria/slug`; o build falha se o id não existir):

  ```yaml
  prerequisites: [cloud/sre-confiabilidade-e-toil]
  related: [cloud/sli-slo-sla-error-budget]
  ```

- **Wikilinks** no corpo, como no Obsidian: `[[slug]]`, `[[categoria/slug]]` ou `[[slug|texto]]`.
  Se o post não for encontrado, o texto é mantido e um aviso aparece no build.
- **Glossário** em `src/data/glossary.json`: a primeira ocorrência de cada termo no post ganha um
  tooltip com a definição (e um link, se o termo tiver `post`).

### Imagens

Coloque a imagem numa pasta `img/` ao lado do post e use caminho relativo:

```
src/content/posts/kubernetes/
├── argo-concept-e-importance.md
└── img/
    └── argo-sync.png
```

```markdown
---
cover: ./img/argo-sync.webp
coverAlt: "Tela de sincronização do Argo CD"
---

![Fluxo de sync do Argo CD](./img/argo-sync.webp)
```

Antes do commit, rode `npm run images`. O script converte JPG/PNG para WebP, limita a largura a
1600px, remove metadados (inclusive GPS de foto de celular) e atualiza as referências nos `.md`.
No build, o Astro gera as versões responsivas (640px, 1080px, ...), que não vão para o git.

`npm run images:check` falha se alguma imagem estiver fora do padrão (WebP/AVIF, até 1600px e
400 KB). Ele roda no CI e no hook de pre-commit, que precisa ser ativado uma vez por clone:

```bash
git config core.hooksPath .githooks
```

Evite usar URL de imagem de outro site em `cover`: se o site sair do ar ou bloquear hotlink, a
capa quebra.

O site gera automaticamente:

- `/` — categorias e publicações recentes
- `/categorias/` — lista de todas as categorias
- `/categorias/<categoria>/` — páginas daquela categoria
- `/categorias/<categoria>/<pagina>/` — a página em si

## Build

```bash
npm run build
npm run preview
```

## Deploy

Publicado no GitHub Pages em `https://and3510.github.io/blog/`, junto com o portfólio da raiz
do repositório.

Todo push na `main` dispara o workflow [`pages.yml`](../.github/workflows/pages.yml), que:

1. instala as dependências do blog (`npm ci`);
2. verifica as imagens (`npm run images:check`);
3. builda o blog (`npm run build`);
4. monta o site com o portfólio na raiz e o blog em `/blog`;
5. publica no GitHub Pages.

Não precisa de secret. Em **Settings → Pages**, a origem deve estar como **GitHub Actions**.
O caminho `/blog` vem do `base` em `astro.config.mjs`.
