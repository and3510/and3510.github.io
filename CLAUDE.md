# CLAUDE.md

Site pessoal no GitHub Pages: portfólio estático na raiz + blog **DevOpsOne** (Astro 7 + Tailwind 4) em `blog/`, servido em `/blog`.
Detalhes de uso (frontmatter, imagens, wikilinks, deploy) estão em [blog/README.md](blog/README.md); leia só quando precisar.

## Economia (regra principal)

- Faça **apenas o que foi pedido**. Sem refatorar, renomear, reformatar ou "melhorar" o que não foi pedido; sugira em uma linha no final, se valer.
- Leia só os arquivos necessários e, em arquivos grandes, só o trecho relevante (`grep`/`offset`). Não varra todos os posts para uma tarefa pontual.
- Nunca leia: `blog/node_modules/`, `blog/dist/`, `blog/.astro/`, `blog/package-lock.json`.
- Não rode `npm run build` a cada edição de texto. Rode só ao mexer em código, frontmatter (`prerequisites`/`related`), plugins, config ou ao final de um lote de mudanças.
- Não use subagentes nem pesquisa web sem necessidade clara.
- Respostas curtas, em português, sem resumo do que já está no diff.

## Estrutura

```
index.html, style.css, images/   portfólio (raiz, HTML/CSS puro)
portfolio/                       página de portfólio
blog/src/content/posts/<cat>/    posts .md; a pasta define a categoria
blog/src/content.config.ts       schema do frontmatter (zod)
blog/src/plugins/                wikilinks, glossário, índice de posts (remark/mdast)
blog/src/data/glossary.json      termos com tooltip
blog/scripts/                    otimização de imagens e checagem de Open Graph
.github/workflows/pages.yml      CI/CD: images:check → build → check:og → deploy
```

## Comandos (rodar dentro de `blog/`)

```bash
npm run dev            # localhost:4321/blog
npm run build          # valida links entre posts e schema
npm run images         # converte para WebP ≤1600px e atualiza refs nos .md
npm run images:check   # o mesmo check do CI e do pre-commit
npm run check:og       # depois do build
```

## Regras do projeto

- **Posts**: frontmatter conforme `content.config.ts`. Ids em `prerequisites`/`related` são `categoria/slug` e precisam existir (o build quebra se não existir).
- **Escrita dos posts**: tom natural e técnico. Evite travessões em excesso, o padrão "não é X, é Y", descriptions com cara de slogan e mais de uma citação em destaque por post. Não quebre linhas em coluna fixa.
- **Imagens**: em `img/` ao lado do post, caminho relativo, sempre rodar `npm run images` antes do commit. Nada de hotlink externo em `cover`.
- **`base: '/blog'`**: links internos no código usam o `BASE` de `src/lib/content.ts` (vem de `import.meta.env.BASE_URL`); nunca caminho absoluto fixo.
- **Dependências**: não adicionar pacote novo sem pedir. Site é 100% estático, sem backend e sem secrets.
- **CI**: não alterar `pages.yml` sem pedido explícito; ele monta a raiz + `blog/dist` em `_site/`.

## Git

- Conventional Commits em português, com escopo: `feat(blog): ...`, `fix(blog): ...`, `refactor(blog): ...`, `chore: ...`.
- Commit e push só quando pedido. Push na `main` publica o site.
- Sem atribuição ao Claude (`Co-Authored-By`, "Generated with Claude Code") em commits ou PRs.
