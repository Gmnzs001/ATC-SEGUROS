# Roteiro para o Claude Code

Cole UMA etapa por vez. Só passe pra próxima depois de aprovar a anterior. Entre etapas, use `/clear` pra economizar tokens (o CLAUDE.md é recarregado sozinho).

---

## Etapa 1 · Base e home

Leia o CLAUDE.md, o design/README.md e o docs/animacoes.md.

Crie o projeto Astro conforme a stack do CLAUDE.md e construa a HOME a partir de `design/Main.dc.html`, com o simulador de `design/Simulador.dc.html` como componente Preact.

- Copie CSS, textos e estrutura exatamente como estão no design.
- Centralize os placeholders em `src/config.ts`.
- O botão "Cotar isso no WhatsApp" abre `wa.me` com a frase completa do simulador e a lista de coberturas.
- Aplique só as animações 1 a 6 e 9 do docs/animacoes.md.

Antes de criar arquivos, me mostre o plano em até 10 linhas e espere meu OK. No fim, rode o site e me mostre print em 1440px e 390px.

---

## Etapa 2 · Modelo de página de seguro

Construa `/seguros/automoveis` a partir de `design/Auto.dc.html`, reutilizando cabeçalho, rodapé e simulador da etapa 1 (o simulador começa em "meu carro" com o título "Monte seu seguro auto.").

Estruture o conteúdo em `src/content/seguros/automoveis.md` (abertura em conversa, o que cobre, dá pra incluir, o que não cobre, FAQ, passos de sinistro, relacionados), pra que todo seguro use o mesmo modelo. Mostre prints e espere OK.

---

## Etapa 3 · Catálogo e demais seguros

Construa `/seguros` a partir de `design/Todos.dc.html` com busca e filtros funcionando (animação 7).

Gere uma página pra cada seguro de `docs/produtos.md` usando o modelo da etapa 2. Para os que não têm texto aprovado, escreva rascunhos curtos e honestos no mesmo tom do Seguro Auto, marque `revisado: false` e me entregue uma lista deles pra revisão. Não invente números, preços nem prazos. Mostre prints e espere OK.

---

## Etapa 4 · Sinistro e Quem somos

Construa `/sinistro` a partir de `design/Sinistro.dc.html` (animação 8) e `/quem-somos` a partir de `design/Sobre.dc.html`. Mostre prints e espere OK.

---

## Etapa 5 · Acabamento e publicação

- Menu mobile (o hambúrguer): me mostre 2 opções simples no estilo do site antes de fazer.
- SEO: title e description por página, Open Graph, sitemap, robots, dados estruturados de InsuranceAgency com endereço de Goiânia.
- Acessibilidade: navegação por teclado, contraste, textos alternativos.
- Lighthouse mobile acima de 90 em tudo. Me mostre o resultado.
- Build estático em `dist/` e passo a passo pra subir na Hostinger.

---

## Quando algo sair diferente do canvas

Mande só: "compare com design/NOME.dc.html e corrija todas as diferenças".
