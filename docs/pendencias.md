# Pendências pra finalizar depois

Decisões que ficaram com uma escolha provisória. Cada item diz o que foi feito e o que falta o Gustavo decidir.

## Design / comportamento
- [ ] **Rodapé das páginas internas**: segui o design (rodapé compacto em Auto, Todos, Sobre e Sinistro). Confirmar se é isso ou se deve ser o rodapé completo da home.
- [ ] **Botão flutuante do WhatsApp**: existe no design da Home e do Auto, mas não no de Todos, Sobre e Sinistro. Segui o design (sem botão nessas três). Confirmar.
- [ ] **Seções opcionais no modelo de seguro**: alguns produtos não têm "Dá pra incluir" ou "Bateu? Faz isso agora". Nesses, a seção não aparece. Confirmar se pode. Hoje: sem a seção de sinistro, consórcio de veículos, consórcio de imóveis, financiamento de veículos e previdência privada; sem "Dá pra incluir", seguro garantia judicial e seguro garantia para licitação.
- [ ] **Foco do botão flutuante do WhatsApp**: o contorno de foco é tinta (#1A1A1A); quando o botão está sobre o rodapé escuro, quase não aparece. Definir a cor.
- [ ] **Catálogo (/seguros)**: o círculo amarelo do topo cobre o botão "Quero cotar" do cabeçalho no desktop e o botão do menu (hambúrguer) no celular. É assim no design (Todos.dc.html: `.hero .sun` com `top:-180px; right:-140px`, desenhado por cima do cabeçalho). Mantive igual. Decidir se o botão deve ficar por cima do círculo.
- [ ] **Foco no campo de busca do catálogo**: o design não tem contorno de foco pro campo (ele usa `all:unset`). Pra seguir a regra de foco visível de docs/animacoes.md, o contorno de 3px (tinta) aparece na pílula branca em volta do campo. Confirmar.
- [ ] **Favicon**: o design não tem. Mandar o ícone (junto com o logo novo).
- [ ] **Menu mobile (hambúrguer)**: fica pra Etapa 5, como no PROMPT.md.

## Placeholders
- [ ] No simulador o selo mostrava "[NÚMERO]" e no rodapé "[NÚMERO SUSEP]". No site os dois usam o mesmo campo (`susep` em `src/config.ts`).
- [ ] O botão "Ligar 24h" mostrava "[TELEFONE]" no design. No site usa o campo do telefone 24h (`[TELEFONE 24H]`, como em docs/conteudo.md).
- [ ] Enquanto `[WHATSAPP]` for placeholder, os links abrem o WhatsApp sem número (dá pra testar a mensagem). Enquanto o telefone for placeholder, "Ligar 24h" fica com `#`.

## Links
- [ ] Chips da home que não têm uma página única apontam pra `/seguros`: **Consórcio** (veículos ou imóveis?), **Responsabilidade civil** (várias), **Seguro garantia** (3 tipos). Definir se devem abrir o catálogo já filtrado.
- [ ] Link "Privacidade" do rodapé: não tem página no projeto. Fica `#` até existir.
- [ ] Migalha "Pra você" / "Pra sua empresa" nas páginas de seguro aponta pra `/seguros`.

## Conteúdo
- [ ] Páginas de seguro com `revisado: false` (rascunhos): lista completa no fim da Etapa 3.
- [ ] **Rascunhos no ar**: as páginas com `revisado: false` são publicadas (os chips da home e os relacionados apontam pra elas), mas com `noindex` (ficam fora do Google). Ao revisar, trocar pra `revisado: true`. Alternativa: não publicar os rascunhos.
- [ ] **Nomes e endereços das páginas**: seguem os nomes do catálogo do design (Todos.dc.html), não os de docs/produtos.md. Ex.: "Carta Verde (Mercosul)" vira `/seguros/carta-verde-mercosul`. O build quebra se faltar página pra algum item do catálogo.
