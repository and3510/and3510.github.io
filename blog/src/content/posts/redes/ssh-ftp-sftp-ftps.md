---
title: "SSH, FTP, SFTP e FTPS"
description: "Diferenças entre SSH, FTP, SFTP e FTPS, e quais deles protegem os dados em trânsito."
date: 2026-09-27
prerequisites: [redes/tcp-x-udp]
related: [redes/vpn-redes-privadas-virtuais]
---

## Para que servem

Protocolos e serviços usados para acesso remoto seguro e transferência de arquivos entre sistemas, com foco em administração remota e automação.

## SSH (Secure Shell)

Finalidade: acesso remoto seguro e execução de comandos, oferecendo criptografia, integridade e autenticação.

- **Porta padrão**: TCP 22.
- Usos: administração de servidores, túneis, cópia segura com ferramentas relacionadas.

## FTP (File Transfer Protocol)

Protocolo clássico para transferência de arquivos. **Não oferece criptografia nativa**. Credenciais e dados trafegam em texto claro por padrão.

- Usa conexão de controle e conexão de dados separadas.
- **Porta clássica de controle**: TCP 21.
- No modo ativo, a porta TCP 20 está tradicionalmente associada à conexão de dados originada pelo servidor.

### FTP ativo x passivo

```
FTP Ativo: Cliente abre canal de controle → Servidor inicia a conexão de dados de volta
FTP Passivo: Cliente abre ambas as conexões
```

FTP ativo pode causar dificuldades com NAT e firewall, já que o servidor inicia uma conexão de volta ao cliente. O modo passivo é geralmente mais amigável a NAT/firewall justamente por evitar essa característica.

## SFTP (SSH File Transfer Protocol)

Protocolo de transferência de arquivos executado **sobre SSH**, normalmente utilizando TCP 22, criptografado pelo canal SSH.

> **SFTP não é "FTP + TLS"**. É outro protocolo, que transfere arquivos dentro de uma sessão SSH.

## FTPS (FTP Secure / FTP over TLS)

Utiliza FTP protegido com TLS, com modos explícito e implícito conforme configuração.

**FTPS = FTP sobre TLS**. Já o SFTP é transferência de arquivos sobre SSH. Os nomes são parecidos, mas são tecnologias diferentes.

## Telnet x SSH

**Telnet** é acesso remoto clássico, com tráfego sem proteção criptográfica nativa, porta TCP
23. SSH substituiu o Telnet como padrão de administração remota moderna justamente por oferecer criptografia.

## SCP

Mecanismo tradicional de cópia segura associado ao ecossistema SSH. SCP copia arquivos; SFTP é um protocolo mais completo de manipulação/transferência de arquivos (listar, renomear, excluir remotamente, entre outras operações).

## Portas de revisão

```
SSH        → TCP 22
FTP controle → TCP 21
Telnet     → TCP 23
```

## Qual escolher

- Terminal remoto → **SSH**.
- Transferência segura de arquivos, via ecossistema SSH → **SFTP**.
- FTP protegido por TLS especificamente → **FTPS**.
- FTP puro → legado, sem criptografia nativa, evitar quando possível.

Vale lembrar também que o FTP usa mais de uma conexão, ao contrário da maioria dos protocolos cliente-servidor simples.
