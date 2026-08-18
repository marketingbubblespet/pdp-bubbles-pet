# Convenções de Trabalho (ler antes de qualquer execução)

Este projeto é mantido por alguém que aplica **vibe coding**, não um desenvolvedor avançado.
O comportamento esperado é parecido com o do Lovable: cirúrgico, previsível e transparente.

> **Regra de ouro:** só faço o que foi pedido, no lugar exato pedido. Nada além disso sem confirmar.

---

## 1. Controle de escopo
1. **Editar só o que for apontado.** Não toco em arquivos ou trechos que você não citou.
2. **Nunca refatorar ou "melhorar" sem pedir.** Se o código funciona, deixo como está.
3. **Plano antes de executar.** Digo o que vou fazer e espero seu "ok" antes de mexer.
4. **Confirmar antes de criar, apagar ou renomear arquivo.**
5. **Uma tarefa por vez.** Não emendo tarefas extras por conta própria.
6. **Não instalar dependências sozinho.** Pergunto antes de adicionar qualquer lib nova.

## 2. Transparência
7. **Explicar em português simples** o que cada mudança faz, sem jargão.
8. **Avisar efeitos colaterais.** Se mexer num lugar afeta outro, eu aviso antes.
9. **Resumir tudo ao final:** o que foi tocado e por quê.
10. **Dizer como reverter** caso você não goste do resultado.

## 3. Segurança (Git / Vercel / produção)
11. **Nunca fazer commit ou push sem você pedir.**
12. **Nunca usar `reset`, `force` ou apagar histórico sem confirmar.**
13. **Avisar antes de qualquer coisa que vá para a Vercel / produção.**

## 4. Isolamento entre Landing Pages (CRÍTICO)
14. Ao editar a LP "X", só toco em `src/app/X/` e `src/components/lp/X/`.
15. Arquivos **compartilhados** são zona protegida: `src/lib/`, `src/components/ui/`,
    `src/app/layout.tsx`, `src/app/globals.css`. Só mexo com ordem explícita.
16. Se uma mudança exigir tocar arquivo compartilhado, **paro e aviso:**
    "isso afeta TODAS as LPs, posso seguir?"
17. **Cada LP tem o próprio arquivo de dados** (ex: `src/lib/essential.ts`),
    nunca um arquivo global misturando produtos diferentes.
18. **Confirmo qual LP** sempre que houver ambiguidade.
19. **Não copio conteúdo entre LPs** (preço, reviews, textos) sem você pedir.

## 5. Estrutura de páginas
20. Páginas novas seguem o padrão da LP `essential/`.
21. Quando for uma página **estruturalmente diferente**, eu **paro e pergunto**
    se a nova estrutura está aprovada antes de criar qualquer coisa.
22. **Toda vez que uma página nova for publicada**, atualizo o mapa de páginas
    (`src/app/page.tsx`, a home "/") adicionando o novo item na lista, inclusive variantes
    de teste A/B com `noindex` (ex: `-b`) — o `noindex` só impede indexação no Google, não
    afeta o mapa interno de navegação. Uso um label que deixa claro que é variante de teste.
23. **Em toda página de MasterClass com acesso por compra**, o prazo de compra **nunca
    ultrapassa a data/hora da própria aula** — é sempre "até o dia da aula", nunca uma data
    posterior. Vale mesmo que o briefing enviado pelo time diga uma data depois da aula: eu
    aviso a divergência e aplico o mesmo dia da aula como prazo, a menos que você confirme
    o contrário.

## 6. Design
24. Seguir sempre o `DESIGN-SYSTEM.md`. Uso só os tokens da marca, nunca invento cor nova.

## 7. Negócio (dados sensíveis)
25. **Não alterar preço, URL da Shopify, cupom ou cashback** sem confirmar.
26. **Não mexer em GA4, Facebook Pixel ou UTM** sem pedir (quebra rastreamento de anúncios).
27. **Confirmar que a imagem existe** em `public/images` antes de referenciá-la.
28. **Não apagar reviews ou FAQ reais** sem confirmar (é conteúdo de cliente verdadeiro).

## 8. Qualidade técnica
29. **Manter o padrão de código existente** (estilo, formatação, nomes).
30. **Não trocar versões de libs** por conta própria.
31. **Reusar componentes existentes** (procurar em `src/components/ui/` antes de criar novo).
32. **Manter tudo responsivo (mobile-first).** A maioria do tráfego pago é mobile.
33. **Manter o padrão de performance** (dynamic import / code-split já usado nas LPs).
34. **Toda imagem com `fill` no `next/image` precisa do atributo `sizes`**, com recorte
    para mobile e desktop (ex: `sizes="(max-width: 767px) 280px, 526px"`), batendo com a
    largura real de exibição em cada breakpoint. Sem isso, o Next assume que a imagem ocupa
    a tela inteira e baixa uma versão maior do que o necessário, mesmo sem perda de
    qualidade visual — só desperdício de banda, mais sensível no mobile.
35. **Rodar `npm run build`** antes de dizer que está pronto.
36. **Não subir o servidor local (`localhost`/preview) sem eu pedir.** Validar com `npm run build`
    é suficiente na maioria das vezes; só abrir o preview quando eu pedir explicitamente pra ver
    rodando ou quando for pedido visual (ex: conferir imagem, animação).

## 8.1 Ícones de marca
41. **Todo elemento que leva o usuário ao WhatsApp usa o logo oficial do WhatsApp**, nunca
    um ícone genérico de balão de conversa (`MessageCircle` e similares). Vale para botão
    de CTA, botão flutuante, link de dúvida e qualquer menção visual ao canal. O logo é
    reconhecido na hora e deixa claro pra onde o clique vai, o que aumenta a confiança e
    a taxa de clique. Componente pronto: `src/components/ui/WhatsAppIcon.tsx`, que herda a
    cor do texto (`currentColor`), então funciona em botão verde, branco ou escuro sem
    precisar de variação. O `lucide-react` v1 removeu ícones de marca, por isso o logo é
    um SVG próprio e não vem da biblioteca.

## 9. Idioma e texto
37. Todo texto visível ao usuário em **pt-BR**.
38. **Sem travessão "—" em textos visíveis da LP.** Usar vírgula, ":" ou ".".
39. **Não mudar SEO** (title, description, metadata) sem pedir.

## 10. UX de formulários multi-etapa (mobile)
40. **Todo formulário dividido em passos precisa controlar a rolagem.** Etapas têm alturas
    diferentes; quando uma etapa alta dá lugar a uma curta, a página encolhe, o navegador
    mantém a posição de rolagem e o usuário é jogado na seção seguinte, achando que o
    formulário sumiu. Em toda LP nova com formulário em etapas, aplicar os três casos:
    - **Ao trocar de etapa** (avançar e voltar): rolar de volta ao topo da caixa do
      formulário, mas **só se o topo estiver fora da tela** (se já estiver visível, não
      mexer, pra não criar solavanco à toa).
    - **Quando a validação falha**: rolar até o primeiro campo pendente. Sem isso, quem
      está lá embaixo no botão clica e não vê nada acontecer, porque o erro aparece num
      campo acima, fora da tela. Grupos de botões (radio) precisam de um `id` próprio no
      wrapper para servirem de âncora.
    - **Ao enviar com sucesso**: rolar até a confirmação, que costuma ser bem mais curta
      que o formulário.
    Detalhes de implementação: chamar a rolagem **dentro do handler do clique**, não num
    `useEffect`. O topo da caixa não muda de posição quando o conteúdo interno troca, então
    a rolagem já sai correta e evita o "flash" de o navegador pintar a seção errada antes
    de voltar. A âncora precisa envolver formulário **e** tela de sucesso (os dois se
    alternam no mesmo lugar). Respeitar `prefers-reduced-motion`: quem tem "reduzir
    movimento" ligado recebe rolagem instantânea em vez de animada.
    Referência pronta: `src/components/lp/care/CareForm.tsx`.
