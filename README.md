# devops-infra-blog

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

Publicado no Netlify. Build command: `npm run build`, publish directory: `dist`.

Deploy automático via GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)):
todo push/merge na branch `main` builda o site e publica em produção no Netlify.

Para funcionar, cadastre em **Settings → Secrets and variables → Actions** do repositório:

- `NETLIFY_AUTH_TOKEN` — token pessoal gerado em Netlify → User settings → Applications → New access token
- `NETLIFY_SITE_ID` — Site ID do site no Netlify (Site settings → General → Site details)
