---
title: "SELinux, AppArmor e hardening no Linux"
description: "Como camadas de segurança obrigatórias (MAC) complementam as permissões tradicionais de dono/grupo/outros."
date: 2026-09-27
prerequisites: [linux/permissoes-usuarios-e-grupos]
related: [kubernetes/networkpolicy-securitycontext-e-pod-security]
---

## DAC x MAC

- **DAC (Discretionary Access Control)**: o modelo tradicional rwx. O dono do recurso decide quem tem acesso.
- **MAC (Mandatory Access Control)**: uma política obrigatória pode **negar** acesso mesmo que o DAC permita. `chmod 777` + SELinux negando = acesso negado. A política obrigatória tem a palavra final.

```
Usuário/Processo → DAC (rwx/ACL) → MAC (SELinux/AppArmor) → Capabilities → Kernel → Recursos
```

## SELinux

Usa rótulos, tipos, domínios e políticas. Processos e objetos recebem um contexto de segurança (`user:role:type:level`), e **type enforcement** restringe quais tipos de objetos cada domínio pode acessar. Até o root pode ser limitado por essa política.

Modos:
- **Enforcing**: bloqueia e registra violações.
- **Permissive**: apenas registra, sem bloquear. Útil para depurar uma política antes de aplicá-la de fato.
- **Disabled**: desativado.

> Desabilitar o SELinux para "resolver" um problema quase nunca é o caminho. O certo é olhar o log de auditoria e ajustar a política ou o contexto.

## AppArmor

Usa perfis baseados em caminhos de arquivo (em vez de rótulos), definindo o que cada programa pode acessar. Tem modos **enforce** (bloqueia) e **complain** (apenas loga).

SELinux e AppArmor são ambos MAC, mas com abordagens diferentes: SELinux foca em rótulos e domínios; AppArmor foca em perfis por caminho. Nenhum dos dois é antivírus. Eles restringem o que processos autorizados podem fazer, não detectam malware.

## Linux Capabilities

Dividem os poderes do root em privilégios menores e específicos (abrir porta privilegiada, administrar rede, montar dispositivo), em vez de tudo-ou-nada. Um processo pode receber apenas a capability específica de que precisa, reduzindo o que um comprometimento consegue fazer.

## Hardening: redução de superfície de ataque

```
Padrão → remover excesso → restringir → monitorar → sistema hardened
```

- Remover serviços, portas e pacotes desnecessários.
- Aplicar CIS Benchmarks como referência de configuração segura.
- Ajustar parâmetros de kernel relevantes via `sysctl` quando necessário, sempre testando antes de aplicar em produção. Hardening extremo sem teste pode quebrar serviço legítimo.
- Fortalecer SSH: autenticação por chave, desabilitar login root direto, limitar usuários permitidos.

Nem tudo que funciona em Permissive vai funcionar igual em Enforcing; política mal ajustada costuma aparecer só na hora de aplicar de verdade. Por isso, valide em Permissive/complain antes de ativar o bloqueio em produção.
