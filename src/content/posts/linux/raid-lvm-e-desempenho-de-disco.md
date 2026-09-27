---
title: "RAID, LVM e desempenho de disco"
description: "Como combinar discos físicos para ganhar performance, redundância, ou ambos — e por que RAID não é backup."
date: 2026-08-19
updatedDate: 2026-08-19
---

## RAID não é backup

RAID (Redundant Array of Independent Disks) combina vários discos para desempenho,
redundância ou ambos. Ele protege contra falha de disco físico — não contra exclusão
acidental, corrupção lógica ou ransomware, que se propagam igualmente para todos os discos do
array.

## Níveis de RAID mais comuns

| Nível | Estratégia | Tolera falha | Capacidade útil (4 discos) |
|---|---|---|---|
| RAID 0 | Striping (distribuição) | Nenhuma | 100% |
| RAID 1 | Mirroring (espelho) | 1 disco por espelho | ~50% |
| RAID 5 | Striping + 1 paridade | 1 disco | (N-1)/N |
| RAID 6 | Striping + 2 paridades | 2 discos | (N-2)/N |
| RAID 10 | Mirror + Stripe | 1 por espelho | ~50% |

- **RAID 0**: máxima performance, zero redundância — a falha de um disco perde tudo.
- **RAID 1**: espelha os dados; alta redundância, metade da capacidade total.
- **RAID 5/6**: paridade distribuída, equilibram capacidade e tolerância a falha, com custo de
  performance de escrita.
- **RAID 10**: combina espelho e distribuição — desempenho alto e boa tolerância a falha, ao
  custo de metade da capacidade.

> RAID 0 aumenta desempenho, mas reduz resiliência — é o único nível que piora a
> confiabilidade em vez de melhorá-la.

## LVM (Logical Volume Manager)

```
Disco 1 → PV (Physical Volume) ┐
Disco 2 → PV (Physical Volume) ┴→ VG (Volume Group) → LV (Logical Volume) → Filesystem
```

- **PV**: entra no Volume Group.
- **VG**: agrega o espaço de múltiplos discos.
- **LV**: recebe o espaço do VG e recebe um filesystem.

Benefícios: flexibilidade de tamanho (redimensionar sem reparticionar fisicamente), expansão
simples, snapshots rápidos e agregação de múltiplos discos em um único volume lógico.

> LVM Snapshot não é backup independente — é uma cópia pontual vinculada ao volume original;
> se o disco físico falhar, o snapshot falha junto.

## Métricas de desempenho de disco

- **IOPS**: operações de I/O por segundo.
- **Throughput**: quantos bytes são lidos/escritos por segundo.
- **Latency**: tempo entre a requisição e a resposta.

I/O sequencial (streaming, cópias grandes) é mais previsível e rápido que I/O aleatório,
especialmente em HDDs, onde o tempo de busca (seek) domina a latência.

> RAID e LVM resolvem problemas diferentes: RAID protege contra falha física de disco e/ou
> ganha performance; LVM dá flexibilidade de gerenciamento de volumes. Eles são frequentemente
> combinados — RAID por baixo para redundância, LVM por cima para flexibilidade de alocação.
