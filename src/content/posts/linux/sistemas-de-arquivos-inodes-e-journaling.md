---
title: "Sistemas de arquivos: inodes, links e journaling"
description: "Por que o nome de um arquivo no Linux não está armazenado junto com seu conteúdo."
date: 2026-08-16
updatedDate: 2026-08-16
---

## Do nome ao conteúdo

```
Aplicação → Arquivo/Diretório → Sistema de Arquivos → Blocos → Disco/SSD
```

Um sistema de arquivos organiza dados persistentes: nomeia arquivos, organiza diretórios,
localiza conteúdo, controla permissões e gerencia espaço livre.

## Inode: o verdadeiro dono dos metadados

No Linux/Unix, um **inode** armazena os metadados de um arquivo — tipo, permissões, UID/GID,
tamanho, timestamps e referências aos blocos de dados. O inode normalmente **não** contém o
nome do arquivo.

```
Diretório "relatorio.txt" → inode 4521 → blocos de dados
```

O nome vive no diretório, que associa nome → número do inode. É por isso que renomear um
arquivo é uma operação barata: só muda a entrada do diretório, não o conteúdo nem o inode.

## Hard link x Symbolic link

- **Hard link**: outro nome que referencia o **mesmo inode**. Remover um nome não apaga os
  dados enquanto outro hard link ainda existir apontando para o mesmo inode.
- **Symbolic link (symlink)**: um arquivo especial que aponta para um **caminho**. Pode
  atravessar sistemas de arquivos diferentes, e fica quebrado se o alvo for movido ou
  removido.

```
Hard link:  nome → mesmo inode
Symlink:    arquivo link → caminho → alvo
```

Sistemas Unix-like normalmente restringem a criação de hard links para diretórios, para
proteger a consistência da árvore de arquivos.

## Journaling

O sistema de arquivos registra previamente, em um journal, as mudanças que pretende realizar
antes de aplicá-las de fato. Isso ajuda a recuperar consistência após uma queda de energia ou
desligamento inesperado.

```
Mudança → Journal → Estruturas principais → Commit
```

> Journaling não substitui backup. Ele ajuda a manter a estrutura do sistema de arquivos
> consistente após uma falha, mas não recupera um arquivo que o usuário apagou
> deliberadamente — para isso, só um backup real resolve.

## Alocação de blocos

- **Contiguous allocation**: blocos consecutivos — boa leitura sequencial, mas sofre
  fragmentação externa.
- **Linked allocation**: cada bloco aponta para o próximo — sem contiguidade exigida, mas
  acesso aleatório menos eficiente.
- **Indexed allocation**: uma estrutura de índice aponta para os blocos, facilitando acesso
  direto (é a abordagem que o inode do Linux usa).

> Disco é o dispositivo físico; partição/volume organiza uma divisão lógica dele; filesystem é
> a estrutura que organiza dados dentro dessa divisão; arquivos e diretórios vivem dentro do
> filesystem. Cada camada é uma abstração sobre a anterior.
