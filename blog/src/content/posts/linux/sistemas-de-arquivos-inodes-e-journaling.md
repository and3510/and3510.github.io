---
title: "Sistemas de arquivos: inodes, links e journaling"
description: "Por que o nome de um arquivo no Linux não está armazenado junto com seu conteúdo."
date: 2026-09-27
prerequisites: [linux/permissoes-usuarios-e-grupos]
related: [linux/memoria-virtual-paginacao-e-page-fault]
---

## Do nome ao conteúdo

```
Aplicação → Arquivo/Diretório → Sistema de Arquivos → Blocos → Disco/SSD
```

Um sistema de arquivos organiza dados persistentes: nomeia arquivos, organiza diretórios, localiza conteúdo, controla permissões e gerencia espaço livre.

## Inode: o verdadeiro dono dos metadados

No Linux/Unix, um **inode** armazena os metadados de um arquivo: tipo, permissões, UID/GID, tamanho, timestamps e referências aos blocos de dados. O inode normalmente **não** contém o nome do arquivo.

```
Diretório "relatorio.txt" → inode 4521 → blocos de dados
```

O nome vive no diretório, que associa nome → número do inode. É por isso que renomear um arquivo é uma operação barata: só muda a entrada do diretório, não o conteúdo nem o inode.

## Hard link x Symbolic link

- **Hard link**: outro nome que referencia o **mesmo inode**. Remover um nome não apaga os dados enquanto outro hard link ainda existir apontando para o mesmo inode.
- **Symbolic link (symlink)**: um arquivo especial que aponta para um **caminho**. Pode atravessar sistemas de arquivos diferentes, e fica quebrado se o alvo for movido ou removido.

```
Hard link:  nome → mesmo inode
Symlink:    arquivo link → caminho → alvo
```

Sistemas Unix-like normalmente restringem a criação de hard links para diretórios, para proteger a consistência da árvore de arquivos.

## Journaling

O sistema de arquivos registra previamente, em um journal, as mudanças que pretende realizar antes de aplicá-las de fato. Isso ajuda a recuperar consistência após uma queda de energia ou desligamento inesperado.

```
Mudança → Journal → Estruturas principais → Commit
```

> Journaling não substitui backup. Ele mantém a estrutura do sistema de arquivos consistente depois de uma falha, mas não traz de volta um arquivo que alguém apagou. Para isso só backup.

## Alocação de blocos

- **Contiguous allocation**: blocos consecutivos. Boa leitura sequencial, mas sofre fragmentação externa.
- **Linked allocation**: cada bloco aponta para o próximo, sem contiguidade exigida, mas acesso aleatório menos eficiente.
- **Indexed allocation**: uma estrutura de índice aponta para os blocos, facilitando acesso direto (é a abordagem que o inode do Linux usa).

As camadas ficam assim: o disco é o dispositivo físico, a partição/volume é uma divisão lógica dele, o filesystem organiza os dados dentro dessa divisão e os arquivos e diretórios vivem dentro do filesystem.
