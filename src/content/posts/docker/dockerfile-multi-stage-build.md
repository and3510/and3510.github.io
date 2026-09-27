---
title: "Dockerfile: multi-stage build e boas práticas"
description: "Como reduzir o tamanho e a superfície de ataque de imagens Docker usando builds em múltiplos estágios."
date: 2026-04-28
updatedDate: 2026-04-28
---

## O problema da imagem única

Um Dockerfile ingênuo instala compiladores, dependências de build e o código-fonte na mesma
imagem que vai para produção — resultando em imagens grandes e com ferramentas que um
atacante poderia explorar.

```dockerfile
# ❌ tudo em uma imagem só
FROM node:22
WORKDIR /app
COPY . .
RUN npm ci && npm run build
CMD ["node", "dist/server.js"]
```

## Multi-stage build

```dockerfile
# Estágio 1: build
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Estágio 2: runtime
FROM node:22-slim
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

A imagem final não contém código-fonte, devDependencies nem ferramentas de build — só o que
é necessário para rodar.

## Boas práticas adicionais

- **Ordene o `COPY` para aproveitar cache**: copie `package.json` antes do resto do código,
  assim o `npm ci` só reexecuta quando as dependências mudam, não a cada alteração de código.
- **Use imagens `-slim` ou `-alpine`** como base final, quando compatível com suas
  dependências nativas.
- **Rode como usuário não-root** (`USER node`) — por padrão, containers rodam como root, o
  que amplia o impacto de uma eventual fuga de container.
- **`.dockerignore`** evita copiar `node_modules`, `.git` e arquivos de segredo local para o
  contexto de build.

```
# .dockerignore
node_modules
.git
.env
*.log
```

> Cada `RUN`, `COPY` e `ADD` cria uma camada nova. Combinar comandos relacionados com `&&`
> num único `RUN` reduz o número de camadas e o tamanho final da imagem, mas prejudica o
> cache incremental — avalie o trade-off conforme a frequência de mudança daquele passo.
