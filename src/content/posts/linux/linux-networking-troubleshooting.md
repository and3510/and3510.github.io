---
title: "Troubleshooting de rede no Linux em 7 passos"
description: "Diagnosticar uma camada de cada vez, de interface a serviço, evita perder tempo testando a coisa errada primeiro."
date: 2026-08-28
updatedDate: 2026-08-28
---

## O roteiro de diagnóstico

```
1. Interface UP?    → ip link
2. IP correto?      → ip addr show
3. Rota default?    → ip route show
4. Gateway responde? → ping <gateway>
5. Destino IP responde e é roteável? → ping <ip>
6. DNS resolve?       → dig <nome>
7. Serviço escuta na porta correta? → ss -tulpn | grep <porta>
```

Testar uma camada de cada vez evita o erro comum de assumir "problema de DNS" quando, na
verdade, a interface nem está com IP configurado.

## Ferramentas modernas (ip, ss) x legadas

```bash
ip addr           # substitui ifconfig
ip link            # mostra/gerencia interfaces
ip route            # substitui parte do netstat -r
ss -tulpn           # substitui netstat, mostra sockets em escuta
```

`ifconfig` e `netstat` ainda existem em muitas distros, mas são considerados legados — a
suíte `ip` é a ferramenta unificada e moderna.

## Diagnóstico de conectividade e aplicação

```bash
ping 8.8.8.8              # testa alcance ICMP
traceroute exemplo.com     # mostra o caminho até o destino
dig exemplo.com            # resolve nome para IP
curl -v https://exemplo.com  # testa a aplicação HTTP/HTTPS de verdade
nc -vz host porta           # testa se uma porta específica está aberta
```

> `ping` testa ICMP, não a aplicação. Resolver DNS com sucesso e o `ping` funcionar não
> garantem que a porta do serviço esteja alcançável — é preciso testar a porta e o protocolo
> real (`curl`, `nc`) para confirmar que a aplicação está de fato respondendo.

## Dois cenários didáticos

1. `ping 8.8.8.8` funciona, mas `ping nome.exemplo` falha → provável problema de DNS, não de
   conectividade de rede.
2. DNS resolve e `ping` funciona, mas `curl` para HTTPS falha → verificar se a porta 443 está
   aberta e se o serviço web está de fato rodando e respondendo naquela porta.

## Arquivos de configuração relevantes

- **/etc/resolv.conf**: define os resolvedores DNS usados pelo host.
- **/etc/hosts**: mapeamentos estáticos de nome para IP, avaliados antes do DNS (a depender
  de `/etc/nsswitch.conf`).
- **/etc/nsswitch.conf**: define a ordem das fontes de resolução de nomes (arquivos locais,
  DNS, etc).

> A rota padrão (`0.0.0.0/0`) só é usada quando não existe uma rota mais específica para o
> destino — a regra geral do roteamento IP é que o prefixo mais específico sempre vence
> (longest prefix match), não apenas a rota "principal" configurada.
