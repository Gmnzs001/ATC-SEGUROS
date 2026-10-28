# Animações e microinterações

Regra geral: movimento serve pra mostrar o que mudou ou pra convidar a uma ação. Nunca decoração. Nada de fade-in em toda seção ao rolar a página.

## Padrões globais
- Curva: `cubic-bezier(.2,.8,.2,1)`. Durações entre 150 e 300ms. Nada acima de 400ms, exceto a abertura da home.
- `prefers-reduced-motion: reduce` desliga TUDO que não for troca instantânea de estado.
- Só `transform` e `opacity` (nada de animar width/height/top, exceto o acordeão).

## Lista fechada (só estas)

### 1. Abertura da home (um único momento orquestrado)
- O título "Seguro sem letra miúda." sobe 12px e aparece (300ms).
- A frase do simulador entra palavra por palavra, 40ms entre cada (texto e pílulas).
- O card "Sua proteção" entra por último, subindo 16px (300ms, 200ms de atraso).
- Por fim, a primeira pílula dá 2 pulinhos discretos (já está no CSS do design: `.slot.first` / `@keyframes nudge`). Some depois do primeiro toque.
- Roda só na primeira visita da sessão (sessionStorage com try/catch).

### 2. Simulador
- Pílula tocada: troca de cor com transição de 200ms (já no design).
- Balão de opções: abre com `scale(.96)→1` + `opacity`, origem no topo à esquerda, 180ms.
- Palavra trocada na frase: cross-fade de 150ms.
- Cobertura nova no card: entra com `opacity` + `translateY(8px)`, 220ms, 40ms entre itens. Cobertura removida: sai com fade de 150ms.
- O card muda de altura suavemente (técnica FLIP ou `grid-template-rows: 0fr→1fr`).

### 3. "Seguro tem palavra difícil. A gente traduz." (home)
- Quando a seção aparece na tela pela primeira vez: cada conversa toca como no WhatsApp. A pergunta aparece, depois três pontinhos "digitando" por 600ms, depois a resposta. As 3 conversas com 300ms de diferença entre si. Uma vez só (IntersectionObserver, desconecta depois).

### 4. Círculos amarelos
- Parallax leve só no desktop: deslocam no máximo 40px no eixo Y conforme a rolagem. Com reduced-motion, ficam parados.

### 5. Botões, pílulas e links
- Hover: sobem 2px e escurecem levemente (150ms). Clique: `scale(.98)`.
- Foco visível: contorno de 3px (amarelo em fundo escuro, tinta em fundo claro). Já está no design.

### 6. Perguntas frequentes
- Abre e fecha com altura animada (220ms). O "+" gira 45° (já no design).

### 7. Catálogo (Todos os seguros)
- Ao filtrar ou buscar, os itens se reorganizam com FLIP (200ms). Sem atraso na busca.

### 8. Sinistro
- Quase nada de movimento: a pessoa está nervosa. Trocar de situação faz cross-fade de 150ms nos passos. Mais nada.

### 9. Entre páginas
- View Transitions do Astro: cross-fade de 200ms. Cabeçalho e rodapé persistem (`transition:persist`).

## Proibido
Fade-in de seção ao rolar, contador de números, texto digitando no título, partículas, cursor customizado, carrossel automático, efeito 3D, scroll travado (scroll-jacking), animação em loop.
