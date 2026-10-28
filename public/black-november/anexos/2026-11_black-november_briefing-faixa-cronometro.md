# Briefing · faixa com cronômetro da Black November (Mariane · urgente, 28/10)

**Tarefa:** CRIA-01 · **Para:** Mariane · **Prazo:** hoje, 28/10 (planejamento) · implementação no tema em 29/10 (SHOP-09, prompts em `2026-11_black-november_prompts-tema-shopify.md`).

A Mariane decide a sequência final. Abaixo está o ponto de partida, com o que já está definido e o que é sugestão.

## 1 · O que já está definido

| Item | Definição |
|---|---|
| Onde | **Site todo** (home, coleções, PDP, carrinho, busca) |
| Posição | **No topo, acima da faixa de avisos atual.** A faixa atual **fica**: as duas juntas dão contraste. A faixa nova de condições vai abaixo do banner (outra peça) |
| Lógica | **Por semanas**, cada semana com um item ou tema em destaque e um cronômetro |
| Regra legal | Cronômetro só com **data real**. Nada que reinicia ao recarregar nem "restam 2" falso (`05-compliance.md`) |
| Cores (2025) | Fundo `#F4CDD4` (rosa) com número `#000000`, como o contador de 2025, sobre a faixa preta `#0D0C0D` de baixo. Alternativa: fundo `#0D0C0D` com número `#F4CDD4` se a faixa de avisos ficar rosa |

**Como era em 2025:** faixa no topo com "ÚLTIMAS HORAS DE BLACK NOVEMBER", contador em dias, horas e minutos (`00 d : 00 h : 00 m`) e botão "Garantir" levando para `/collections/black-november`. Contador rosa, número preto. Print: [arquivo de 28/11/2025](https://web.archive.org/web/20251128235339/https://www.bubbles.com.br/).

## 2 · Sequência sugerida (por semanas, só datas reais)

As ofertas valem o mês todo. Então o cronômetro conta para **um acontecimento real**, não para "o fim da oferta" de um item que continua valendo.

| Semana | Período | Texto da faixa | O cronômetro conta até | Botão leva para |
|---|---|---|---|---|
| S1 | 01 a 08/11 | "Black November Bubbles: o estoque de dezembro com desconto" | **fim da Black** (30/11 23h59) | coleção Black |
| S2 | 09 a 15/11 | "Kit Completo Linha Essential: 10% off + 4 diluidores + jaleco" | **início do cashback em dobro** (23/11 00h) | PDP do Kit Completo Essential |
| S3 | 16 a 22/11 | "Falta pouco para o cashback em dobro" | **início do cashback em dobro** (23/11 00h) | coleção Black |
| S4 | 23 a 29/11 | "Cashback em dobro em todas as compras" | **fim da Black e do dobro** (30/11 23h59) | coleção Black |
| Último dia | 30/11 | "Últimas horas de Black November" | 30/11 23h59 | coleção Black |

Por que esta ordem:
- **S2 com o Kit Completo Essential**: é o item com mais chance de performar sem quebra de estoque (decisão de 28/10) e foi o nº 1 da loja na Black 2025. Pode trocar pelo item que a Mariane preferir, desde que haja estoque para a semana inteira.
- **S2 e S3 contam para 23/11**: o cashback em dobro é o único argumento novo do fim do mês, e a contagem dá motivo para voltar.
- **11/11**: se o estudo de 04/11 indicar uma ação pontual no 11.11, a faixa troca só nesse dia (com data real).

## 3 · O que a Mariane precisa decidir hoje

1. Texto final de cada semana (até 45 caracteres no celular, para caber numa linha ao lado do contador).
2. Item em destaque de cada semana, se quiser item por semana em vez de tema.
3. Formato do contador: `dd : hh : mm` (2025) ou `hh : mm : ss` só no último dia.
4. Se o botão "Garantir" fica (2025 tinha) ou a faixa inteira é clicável.
5. Cor: rosa com número preto (2025) ou preto com número rosa.
6. Se o contador aparece também na PDP dentro do template da Black (SHOP-08) ou só no topo.

## 4 · Especificação para o tema

- Altura: até 44 px no celular, 48 px no desktop. Fixa no topo ao rolar só se não cobrir a barra fixa de compra.
- Datas no horário de Brasília (`-03:00`), com a troca de semana às 00h pelo navegador, sem depender de edição manual.
- Fora de 01/11 00h a 30/11 23h59, a faixa não aparece.
- Entra no registro antes e depois (SHOP-01) para sair em 01/12.

## 5 · Regras de texto

Sem travessão; "off" minúsculo; sem frete; sem "até X%" como promessa geral; cashback sem validade; "até 10x sem juros" quando citar parcelamento.
