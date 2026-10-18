---
title: "Cabeamento, fibra óptica e meios de transmissão"
description: "Cobre, fibra e sem fio: as três formas físicas de fazer bits chegarem de um ponto a outro."
date: 2026-09-26
updatedDate: 2026-09-26
prerequisites: [redes/redes-fundamentos-topologias-e-tipos]
related: [redes/wifi-ieee-802-11]
---

## Os três meios

```
Cobre (par trançado)   Fibra óptica   Sem fio
```

- **Cobre**: econômico, base da Ethernet cabeada tradicional.
- **Fibra**: alta capacidade e distância.
- **Sem fio**: mobilidade, sem cabeamento físico.

## Par trançado

Cabo composto por pares de cobre trançados para reduzir interferência, muito usado em
Ethernet.

- **UTP**: sem blindagem adicional.
- **STP/FTP**: possuem mecanismos de blindagem adicionais.

### Categorias

| Categoria | Velocidade | Distância |
|---|---|---|
| Cat 5e | até 1 Gbps | até 100m |
| Cat 6 | até 1 Gbps (10 Gbps em distâncias menores) | até 100m |
| Cat 6A | até 10 Gbps | até 100m |
| Cat 7/8 | até 10 Gbps ou mais | — |

Categoria maior suporta características superiores dentro das condições especificadas —
não é um multiplicador universal automático em qualquer cenário.

### Conector RJ-45

Nome popular do conector modular associado ao par trançado Ethernet. Tecnicamente existem
nomenclaturas mais específicas, mas "RJ-45" é o termo comum em provas e no dia a dia.

### T568A x T568B e cabo direto x crossover

Padrões de pinagem, diferindo na posição dos pares verde e laranja.

- **Cabo direto**: mesma pinagem nas duas pontas.
- **Crossover**: pares TX/RX cruzados.

Equipamentos modernos frequentemente suportam **Auto-MDI/MDIX**, reduzindo a necessidade de
escolha manual entre os dois tipos de cabo.

## Fibra óptica

Utiliza luz, em vez de sinal elétrico. Vantagens: alta capacidade, grande alcance, imunidade a
interferência eletromagnética, menor atenuação em longas distâncias.

- **Multimodo (MMF)**: núcleo maior, múltiplos modos de propagação, geralmente distâncias
  menores que monomodo, fontes comuns LED/VCSEL.
- **Monomodo (SMF)**: núcleo menor, propagação em um único modo, adequado para longas
  distâncias, fonte comum laser.

Mnemônico: multi = menor distância relativa; mono = maior distância.

### Conectores e transceivers

- **Conectores comuns**: LC, SC.
- **Transceiver**: módulo que converte sinal elétrico/óptico (exemplos: SFP, SFP+, QSFP).
- **Atenuação**: perda de potência do sinal ao longo do meio, medida em dB — fibra é imune a
  EMI, mas ainda sofre atenuação por distância.

## Sem fio

Transmite via ondas eletromagnéticas. Vantagens: mobilidade e implantação flexível. Desafios:
interferência, alcance, segurança, compartilhamento do meio.

## Simplex, Half-Duplex e Full-Duplex

- **Simplex**: uma direção apenas.
- **Half-Duplex**: ambas as direções, não simultaneamente.
- **Full-Duplex**: ambas as direções simultaneamente.

## PoE — Power over Ethernet

Permite enviar energia elétrica e dados pelo mesmo cabeamento Ethernet compatível — usado em
access points, câmeras IP, telefones VoIP.

> Fibra óptica não sofre interferência eletromagnética como cabos metálicos — mas maior
> velocidade nominal do enlace não garante throughput de aplicação idêntico: congestionamento,
> características do equipamento e outros fatores também determinam o desempenho real
> percebido.
