---
title: "Ansible: automação e configuration management"
description: "Como manter centenas de servidores em estado consistente sem executar comandos manuais um por um."
date: 2026-07-08
updatedDate: 2026-07-08
---

## O problema que o Ansible resolve

Configurar 100 servidores manualmente gera inconsistência, erro humano e um custo de tempo
que cresce junto com o ambiente. **Configuration management** define e mantém configurações
consistentes em sistemas através de automação repetível.

## Arquitetura básica

- **Control node**: a máquina de onde a automação é executada.
- **Managed node**: os hosts alvo da automação.
- **Inventory**: lista (ou fonte dinâmica) dos hosts gerenciados, agrupados logicamente.

```ini
[web]
web01
web02

[db]
db01
```

O Ansible é **agentless**: conecta via SSH (ou outro mecanismo remoto) sem exigir um agente
permanente instalado nos hosts gerenciados.

## Playbook, Play e Task

```yaml
# playbook.yml
- name: Configurar servidores web
  hosts: web
  become: true
  tasks:
    - name: Garantir que o nginx está instalado
      apt:
        name: nginx
        state: present
    - name: Garantir que o serviço está ativo
      service:
        name: nginx
        state: started
        enabled: true
```

```bash
ansible-playbook -i inventory.ini playbook.yml
```

- **Playbook**: arquivo YAML com um ou mais plays.
- **Play**: associa um conjunto de tasks a hosts determinados.
- **Task**: chamada de um módulo com parâmetros específicos.
- **Module**: unidade de trabalho que executa uma ação (instalar pacote, criar usuário,
  gerenciar arquivo). Prefira módulos específicos a comandos shell genéricos sempre que
  possível — módulos são idempotentes e mais previsíveis.

## Idempotência

Executar o mesmo playbook várias vezes deve convergir para o mesmo estado desejado, sem
repetir mudanças desnecessárias. O Ansible reporta `changed` apenas quando algo de fato
precisou mudar — essa é a garantia central que torna a automação segura de reexecutar.

## Organização e reuso

- **Roles**: organizam automação reutilizável, agrupando tasks, templates, handlers,
  variáveis e arquivos relacionados.
- **Handlers**: tasks executadas apenas quando notificadas por uma mudança (ex: reiniciar um
  serviço só se o arquivo de configuração mudou).
- **Templates (Jinja2)**: geram arquivos de configuração parametrizados a partir de
  variáveis.
- **Vault**: criptografa dados sensíveis em arquivos versionados — não elimina a necessidade
  de boa gestão de segredos, mas evita senha em texto claro no repositório.

> Terraform e Ansible são complementares, não concorrentes: Terraform cria e provisiona a
> infraestrutura (a VM existe); Ansible instala e configura o que roda dentro dela (o
> software está correto). Um cria o servidor, o outro o deixa pronto para uso.
