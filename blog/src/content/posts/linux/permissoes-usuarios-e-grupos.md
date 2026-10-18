---
title: "Permissões, usuários e grupos no Linux"
description: "Como o modelo de permissões do Linux funciona na prática, incluindo casos que fogem do rwx básico."
date: 2026-07-05
updatedDate: 2026-07-05
related: [linux/selinux-apparmor-e-hardening, linux/sistemas-de-arquivos-inodes-e-journaling]
---

## O modelo básico: rwx

```bash
ls -l /var/www/app
# -rw-r--r-- 1 appuser appgroup 1024 Apr 14 10:00 config.yml
```

Cada arquivo tem três conjuntos de permissões: **dono**, **grupo** e **outros**, cada um com
leitura (r=4), escrita (w=2) e execução (x=1).

```bash
chmod 640 config.yml      # dono: rw-, grupo: r--, outros: ---
chown appuser:appgroup config.yml
chgrp deploy /var/www/app
```

## Usuários e grupos

```bash
useradd -m -s /bin/bash -G docker,deploy appuser
usermod -aG sudo appuser
groups appuser
```

- `-m` cria o diretório home.
- `-G` adiciona grupos suplementares (além do grupo primário).
- Adicionar alguém ao grupo `docker` equivale, na prática, a dar acesso root sem senha — o
  socket do Docker roda como root.

## Além do rwx: setuid, setgid e sticky bit

```bash
chmod u+s /usr/bin/algum-binario   # setuid: executa com privilégios do dono
chmod g+s /var/www/uploads         # setgid: arquivos criados herdam o grupo do diretório
chmod +t /tmp                       # sticky bit: só o dono pode apagar seus próprios arquivos
```

O `setgid` em diretórios compartilhados é útil quando vários usuários de um mesmo grupo
precisam colaborar em arquivos sem ficar rodando `chgrp` manualmente.

## ACLs para casos que o rwx não resolve

Quando é preciso dar permissão a um usuário específico sem alterar dono/grupo:

```bash
setfacl -m u:outro-usuario:rx /var/www/app
getfacl /var/www/app
```

> Erro comum: usar `chmod 777` para "resolver" um problema de permissão. Isso abre escrita e
> execução para qualquer usuário do sistema — o caminho correto quase sempre é ajustar
> dono/grupo ou usar ACL, não afrouxar tudo.
