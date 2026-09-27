---
title: "Bash e Shell: pipes, redirecionamentos, grep, sed e awk"
description: "Comandos pequenos combinados por pipes formam a base da produtividade no terminal Linux."
date: 2026-08-25
updatedDate: 2026-08-25
---

## Os três fluxos padrão

```
stdin (0)  → PROGRAMA → stdout (1)
                       → stderr (2)
```

Macete para lembrar: **0 entra, 1 sai, 2 erra**.

## Redirecionamentos

```bash
comando > arquivo.txt    # sobrescreve stdout no arquivo
comando >> arquivo.txt   # adiciona stdout ao final do arquivo
comando < arquivo.txt    # usa o arquivo como stdin
comando 2>&1              # redireciona stderr para onde stdout está indo
```

A ordem importa: `2>&1` deve normalmente vir **depois** do redirecionamento de stdout para
funcionar como esperado.

## Pipe

```bash
ps aux | grep nginx
```

O pipe (`|`) conecta o stdout de um comando ao stdin do próximo — mas passa **apenas**
stdout, não stderr, o que costuma surpreender quem espera capturar mensagens de erro também
no pipeline.

## grep, sed e awk

- **grep**: filtra texto por padrão.
  ```bash
  grep -i "erro" *.log       # ignora maiúsculas/minúsculas
  grep -r "TODO" .           # busca recursiva em diretórios
  ```
- **sed**: transforma texto em fluxo, sem editar interativamente.
  ```bash
  sed 's/erro/OK/g' arquivo.txt
  sed -n '1,10p' arquivo.txt   # imprime só as linhas 1 a 10
  ```
- **awk**: processa texto por colunas/campos.
  ```bash
  awk '{print $1, $NF}' arquivo.txt   # primeira e última coluna
  awk -F',' '{print $2}' arquivo.csv  # separador customizado
  ```

> `*` do glob (expansão de nomes de arquivo pelo shell) e `*` do regex (usado em grep/sed) têm
> significados diferentes. `*.log` no shell expande para nomes de arquivo; `.*` no regex
> significa "zero ou mais caracteres". Confundir os dois é uma fonte comum de comandos que não
> fazem o que parecem fazer.

## Outras ferramentas de composição

```bash
sort arquivo.txt | uniq -c   # ordena e conta ocorrências
wc -l arquivo.txt             # conta linhas
cut -d',' -f2 arquivo.csv     # extrai a segunda coluna
tail -f app.log                # acompanha um log em tempo real
xargs                           # constrói comandos a partir de stdin
```

## Aspas e variáveis

```bash
echo '$USER'    # saída literal: $USER (aspas simples não expandem)
echo "$USER"    # saída expandida: o valor real da variável
```

> Aspas simples preservam o texto literalmente; aspas duplas permitem expansão de variáveis e
> substituição de comando. Usar aspas simples por engano é uma causa comum de scripts que
> imprimem `$VARIAVEL` em vez do valor esperado.
