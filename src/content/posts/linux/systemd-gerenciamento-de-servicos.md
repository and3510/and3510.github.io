---
title: "systemd: gerenciando serviços no Linux"
description: "Como criar, habilitar e depurar serviços com systemd, o init system padrão das distros modernas."
date: 2026-04-07
updatedDate: 2026-04-07
---

## O que é o systemd

O **systemd** é o sistema de inicialização (init) usado pela maioria das distribuições Linux
modernas (Ubuntu, Debian, RHEL, Fedora). Ele gerencia o boot, serviços, sockets, timers e
dependências entre eles.

## Criando um serviço

```ini
# /etc/systemd/system/minha-api.service
[Unit]
Description=API interna da equipe
After=network.target

[Service]
Type=simple
User=appuser
WorkingDirectory=/opt/minha-api
ExecStart=/usr/bin/node /opt/minha-api/server.js
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now minha-api
sudo systemctl status minha-api
```

## Comandos do dia a dia

```bash
systemctl restart minha-api
systemctl stop minha-api
journalctl -u minha-api -f          # logs em tempo real
journalctl -u minha-api --since "1 hour ago"
systemctl list-units --failed        # ver o que falhou no boot
```

## Timers no lugar de cron

```ini
# /etc/systemd/system/backup.timer
[Unit]
Description=Executa backup diário

[Timer]
OnCalendar=*-*-* 03:00:00
Persistent=true

[Install]
WantedBy=timers.target
```

O `Persistent=true` garante que, se a máquina estiver desligada no horário agendado, o timer
executa assim que ela ligar novamente — algo que o cron tradicional não oferece.

> `Type=simple` assume que o processo principal não faz fork; para daemons que fazem
> double-fork, use `Type=forking`. Errar o `Type` é a causa mais comum de serviços que o
> systemd considera "iniciados" mas que na verdade não estão prontos.
