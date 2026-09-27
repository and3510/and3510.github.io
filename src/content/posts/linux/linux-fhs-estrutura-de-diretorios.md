---
title: "Linux FHS: entendendo /etc, /var, /home, /usr e /proc"
description: "No Linux, tudo parte de /. Entender o propósito de cada diretório padrão evita erros bobos de administração."
date: 2026-08-08
updatedDate: 2026-08-08
---

## A raiz de tudo

O **FHS (Filesystem Hierarchy Standard)** define uma estrutura padrão de diretórios no Linux.
Tudo parte de `/` (raiz) — que não deve ser confundido com `/root`, o diretório home do
usuário root.

## Diretórios essenciais

- **/etc**: arquivos de configuração do sistema. Apenas configuração, não executáveis.
- **/home**: diretórios home dos usuários comuns.
- **/root**: home do usuário root — não confundir com `/` (a raiz do sistema).
- **/var**: dados variáveis: logs, cache, filas, bancos locais. Logs principais ficam em
  `/var/log`.
- **/tmp**: arquivos temporários, pode ser limpo periodicamente pelo sistema.
- **/usr**: programas, bibliotecas e dados compartilhados entre usuários — apesar do nome, não
  é apenas "diretório de usuário".
- **/opt**: softwares opcionais ou de terceiros, instalados fora do gerenciador de pacotes
  padrão.
- **/bin** e **/sbin**: comandos essenciais do sistema e de administração (em distros
  modernas, frequentemente linkados para dentro de `/usr/bin`).

## Sistemas de arquivos virtuais

Alguns diretórios não armazenam dados físicos no disco — são gerados dinamicamente pelo
kernel, refletindo informação em tempo real:

- **/proc**: informações de processos e do kernel (`/proc/cpuinfo`, `/proc/<PID>/`).
- **/sys**: objetos do kernel — dispositivos, drivers, classes.
- **/dev**: arquivos de dispositivos especiais (`/dev/sda`, `/dev/null`, `/dev/random`).

## Caminhos absolutos e relativos

```bash
/etc/ssh/sshd_config   # caminho absoluto: sempre começa em /
docs/documento.txt     # caminho relativo: depende do diretório atual
```

## Comandos e conceitos úteis

```bash
pwd              # mostra o diretório atual
cd <caminho>      # muda de diretório
ls -la            # lista arquivos, incluindo ocultos
mount | grep sdb1  # verifica onde um dispositivo está montado
df -h             # uso de espaço por sistema de arquivos
du -sh *          # uso de espaço por diretório/arquivo
```

Arquivos ocultos começam com ponto (`.bashrc`, `.ssh`, `.profile`) e não aparecem em um `ls`
simples — é preciso `-a` para vê-los.

> `/etc/fstab` lista os sistemas que serão montados automaticamente no boot — é a referência
> central quando um disco "some" após reiniciar o servidor: quase sempre é porque a entrada
> correspondente nunca foi adicionada ali.
