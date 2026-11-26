# CLAUDE.md

Site pessoal no GitHub Pages: portfólio estático (HTML/CSS puro), sem build.
O blog **DevOpsOne** fica em outro repositório (`devopsone-org/devopsone-org.github.io`), publicado em `https://devopsone-org.github.io/`; aqui só existe o botão que leva até ele.

## Economia (regra principal)

- Faça **apenas o que foi pedido**. Sem refatorar, renomear, reformatar ou "melhorar" o que não foi pedido; sugira em uma linha no final, se valer.
- Leia só os arquivos necessários e, em arquivos grandes, só o trecho relevante (`grep`/`offset`).
- Não use subagentes nem pesquisa web sem necessidade clara.
- Respostas curtas, em português, sem resumo do que já está no diff.

## Estrutura

```
index.html, style.css, images/   página inicial (botões para portfólio e blog)
portfolio/                       página de portfólio
.github/workflows/pages.yml      CI/CD: copia os arquivos estáticos para _site/ e publica
```

## Regras do projeto

- Site 100% estático, sem backend, sem dependências e sem secrets.
- A lista `blogCommands` em `index.html` espelha `commands` de `src/components/SiteHeader.astro` no repo do blog.
- **CI**: não alterar `pages.yml` sem pedido explícito.

## Git

- Conventional Commits em português, com escopo: `feat: ...`, `fix: ...`, `chore: ...`.
- Commit e push só quando pedido. Push na `main` publica o site.
- Sem atribuição ao Claude (`Co-Authored-By`, "Generated with Claude Code") em commits ou PRs.
