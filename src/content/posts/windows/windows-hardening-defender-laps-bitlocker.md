---
title: "Windows Hardening: Defender, LAPS, BitLocker e UAC"
description: "Defesa em profundidade no Windows: nenhum controle isolado resolve tudo, mas juntos reduzem significativamente o risco."
date: 2026-08-22
updatedDate: 2026-08-22
---

## Defesa em profundidade

```
Patch → Firewall → Identity → Application Control → Credential Protection → Encryption → Logging
```

O princípio central: nenhuma camada sozinha é suficiente. Antivírus, firewall, controle de
identidade e criptografia se complementam, cada um cobrindo um vetor de ataque diferente.

## Controles principais

- **Microsoft Defender**: antimalware com análise comportamental e integração em tempo real
  com proteção corporativa (endpoint protection).
- **Windows Defender Firewall**: regras por perfil de rede (Domain, Private, Public),
  aplicação, porta, protocolo e origem/destino — o princípio é liberar apenas o tráfego
  necessário.
- **BitLocker**: criptografia de volume, protegendo dados em repouso contra perda ou roubo de
  disco e acesso offline não autorizado. Importante: BitLocker **não protege dados depois que
  o sistema já foi desbloqueado** — a proteção é contra acesso ao disco fora do sistema
  operacional em execução.
- **TPM (Trusted Platform Module)**: hardware que protege chaves e mede o estado do boot,
  usado pelo BitLocker para validar integridade antes de liberar a chave de descriptografia.
- **Secure Boot**: ajuda a impedir a inicialização de código de boot não confiável.

## UAC — User Account Control

Elevação controlada: o administrador trabalha normalmente com token limitado e só eleva
privilégios quando necessário e explicitamente confirmado. UAC **não substitui** o princípio
do menor privilégio — é uma camada de fricção consciente, não uma barreira de segurança
absoluta contra malware já em execução com privilégios do usuário.

## LAPS e gMSA

- **LAPS (Local Administrator Password Solution)**: gerencia e rotaciona automaticamente a
  senha do administrador local em cada máquina, evitando a reutilização da mesma senha local
  em toda a frota — um vetor clássico de movimento lateral.
- **gMSA (Group Managed Service Account)**: conta de serviço com senha forte e rotação
  automática gerenciada pelo AD, eliminando senhas de serviço fixas e esquecidas.

## Mitigação de ataques comuns

- **Pass-the-Hash** e **Pass-the-Ticket**: ataques que reutilizam credenciais capturadas sem
  precisar da senha em texto claro. Mitigações: reduzir uso de NTLM, proteger credenciais
  (Credential Guard), aplicar LAPS, MFA e segmentação de rede.
- **JEA (Just Enough Administration)**: restringe comandos, parâmetros e identidades
  disponíveis a um usuário administrativo — privilégio por tarefa específica, não acesso
  administrativo total.

## Boas práticas gerais

- Separar contas administrativas de contas de uso diário (least privilege).
- Centralizar logs em um SIEM para correlação e resposta a incidentes.
- Aplicar patching contínuo priorizado por criticidade e exposição.

> BitLocker protege dados em repouso, não substitui controle de acesso (ACLs) nem
> autenticação — um usuário autorizado com o sistema já desbloqueado acessa os dados
> normalmente, criptografia de disco e controle de acesso resolvem ameaças diferentes.
