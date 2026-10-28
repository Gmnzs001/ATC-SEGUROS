# Como ler os arquivos de design

Cada `.dc.html` é uma tela aprovada, feita num editor de design que usa HTML + CSS reais.

- **CSS**: está dentro de `<helmet><style>…</style></helmet>`. Copie os valores como estão. As regras dentro de `@media (max-width:900px)` são a versão celular.
- **Marcação**: tudo dentro de `<x-dc>` é o HTML da página.
- **`{{nome}}`**: valor dinâmico calculado no `<script type="text/x-dc">` no fim do arquivo (método `renderVals()`). No Astro/Preact vira prop ou estado.
- **`<sc-for list="{{itens}}" as="i">`**: um loop (`.map()`).
- **`<sc-if value="{{cond}}">`**: renderização condicional.
- **`onClick="{{fn}}"`**: handler de evento.
- **`<dc-import name="Simulador" …>`**: insere o componente do arquivo `Simulador.dc.html`. Os atributos viram props (`start`, `title`, `intro`).
- **`href="Auto.dc.html"`**: link entre telas. Troque pela rota real (`/seguros/automoveis`).
- O `<script>` traz os DADOS e a LÓGICA (perguntas do simulador, coberturas, FAQ, casos de sinistro, catálogo). Reaproveite os dados e a lógica do jeito que estão.
- Ignore `<script src="./support.js">`, `data-props` e `$preview`: são coisas do editor.

## Telas
| Arquivo | Página |
| --- | --- |
| Main.dc.html | Home |
| Simulador.dc.html | Simulador (componente usado na home e nas páginas de seguro) |
| Auto.dc.html | Modelo de página de seguro (Seguro Auto) |
| Todos.dc.html | Catálogo com busca e filtros |
| Sinistro.dc.html | Sinistro 24h |
| Sobre.dc.html | Quem somos |
