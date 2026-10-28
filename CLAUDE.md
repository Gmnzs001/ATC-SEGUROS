# ATC Seguros — site v2

O design está FECHADO e APROVADO. Seu trabalho é converter o design em código, não redesenhar.

## Fonte da verdade
- `design/*.dc.html`: as telas aprovadas (HTML + CSS reais). Leia `design/README.md` pra entender o formato.
- Canvas visual pra conferência: https://claude.ai/artifact/QRZacFLVKydTBCYrRrs4Gy (o Gustavo abre e compara).
- `docs/animacoes.md`: as ÚNICAS animações permitidas.
- `docs/conteudo.md`: dados da empresa e o que ainda é placeholder.
- `docs/produtos.md`: catálogo completo de seguros.

## Regras inegociáveis
1. Copie o design EXATAMENTE: mesmas cores, fontes, tamanhos, espaçamentos, raios, textos e ordem das seções. Os valores estão no CSS de cada `.dc.html`.
2. Não invente seção, texto, ícone, efeito, cor ou componente. Não "melhore" o design. Não use a skill frontend-design pra redesenhar nada.
3. Textos: copie palavra por palavra. Nada de reescrever copy.
4. Placeholders `[ASSIM]` ficam como estão até o Gustavo mandar o dado real. Todos centralizados em `src/config.ts`.
5. Uma etapa por vez (ver `PROMPT.md`). Ao terminar cada etapa: rode o site, tire print desktop (1440px) e celular (390px), mostre e ESPERE o OK antes de seguir.
6. Se algo não estiver no design (ex.: estado de erro, menu mobile aberto), PERGUNTE antes de decidir.
7. Quando o Gustavo disser "compare com design/X", abra o arquivo, liste as diferenças e corrija todas.
8. Commit em git ao fim de cada etapa aprovada.

## Stack (decidida, não trocar)
- Astro (versão estável atual), site 100% estático. Build em `dist/` vai pra Hostinger.
- CSS puro com variáveis (tokens abaixo). Sem Tailwind, sem biblioteca de UI.
- Simulador, busca do catálogo, FAQ e sinistro: componentes Preact (ilhas Astro), só onde há interação.
- Fontes self-hosted via @fontsource: Bricolage Grotesque (600/700/800) e Figtree (400/500/600/700).
- Transição entre páginas: View Transitions do Astro (`<ClientRouter />`).
- Sem backend: toda conversão vai pro WhatsApp via `https://wa.me/<numero>?text=<mensagem>`.

## Tokens (copiados do design)
- Amarelo `#FFD84D` · amarelo claro `#FFE88A` · amarelo bem claro `#FFF1B8`
- Tinta `#1A1A1A` · fundo da página `#F7F6F2` · branco `#FFFFFF` · cinza de superfície `#F4F4F1`
- Textos secundários `#3F3F3F`, `#4A4A4A`, `#5A5A5A`, `#6A6A6A`
- Raios: pílula 999px · blocos grandes 40–44px · cards 28–32px
- Largura máxima 1200px · breakpoint mobile 900px

## Estrutura de páginas
- `/` ← `design/Main.dc.html` (+ `design/Simulador.dc.html` no topo)
- `/seguros` ← `design/Todos.dc.html`
- `/seguros/[slug]` ← `design/Auto.dc.html` como MODELO (conteúdo de cada seguro em `src/content/seguros/`)
- `/sinistro` ← `design/Sinistro.dc.html`
- `/quem-somos` ← `design/Sobre.dc.html`

## Comunicação
Português do Brasil, direto e curto. Mostre prints, não descreva o que fez em parágrafos.
