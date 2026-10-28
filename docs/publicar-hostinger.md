# Como publicar o site na Hostinger

O site é 100% estático: o comando de build gera a pasta `dist/` e é só ela que vai pro servidor.

## Antes da primeira publicação
- [ ] Trocar `dominio` em `src/config.ts` pelo endereço real (ex.: `https://www.seudominio.com.br`). Sem isso não sai o sitemap nem o endereço canônico das páginas.
- [ ] Trocar os outros `[PLACEHOLDERS]` de `src/config.ts` (WhatsApp, telefones, CNPJ, SUSEP, endereço…). Ver `docs/conteudo.md`.
- [ ] Revisar os rascunhos (`docs/revisao-rascunhos.md`) e marcar `revisado: true` nos aprovados. Os que ficarem com `false` vão pro ar, mas fora do Google (noindex) e fora do sitemap.
- [ ] Resolver o que estiver aberto em `docs/pendencias.md`.

## 1. Gerar o site
No terminal, dentro da pasta do projeto:

```
npm install
npm run build
```

Se aparecer erro, o build para e nada é publicado. Os erros mais comuns:
- "Catálogo e src/content/seguros não batem": falta o arquivo `.md` de algum seguro do catálogo, ou um "relacionado" aponta pra página que não existe.
- "data does not match collection schema": algum `.md` de seguro tem campo vazio ou com nome errado. A mensagem diz qual arquivo e qual campo.

Pra conferir antes de subir: `npm run preview` e abrir http://localhost:4321.

## 2. Subir pra Hostinger (Gerenciador de Arquivos)
1. Entrar no hPanel → **Sites** → o site → **Gerenciador de Arquivos**.
2. Abrir a pasta `public_html`.
3. Apagar o que tiver dentro (se for a primeira vez, costuma ter um `default.php`). Nas próximas publicações, apagar tudo menos o que você tiver colocado lá de propósito.
4. Subir **o conteúdo** da pasta `dist/` (não a pasta em si): `index.html`, `_astro/`, `seguros/`, `sinistro/`, `quem-somos/`, `robots.txt`, `sitemap.xml` e o `.htaccess`.
   - O `.htaccess` começa com ponto e pode ficar escondido. No Windows, ative "Mostrar itens ocultos" no Explorador; no Gerenciador da Hostinger ele aparece normalmente.
   - Dica: compactar o conteúdo de `dist/` num `.zip`, subir o `.zip` e usar **Extrair** no Gerenciador. É bem mais rápido do que subir arquivo por arquivo.

## 2b. Alternativa: FTP
Dados de acesso em hPanel → **Arquivos** → **Contas FTP**. Com o FileZilla, conectar e copiar o conteúdo de `dist/` pra dentro de `public_html`.

## 3. Depois de publicar
- [ ] Abrir o site no celular e no computador: home, um seguro, o catálogo, Sinistro e Quem somos.
- [ ] Ativar o SSL (hPanel → **Segurança** → **SSL**), se ainda não estiver ativo. O `.htaccess` já manda todo mundo pro `https`.
- [ ] Testar o botão "Cotar isso no WhatsApp" (precisa do número real em `src/config.ts`).
- [ ] Cadastrar o site no Google Search Console e enviar `https://SEU-DOMINIO/sitemap.xml`.

## O que o `.htaccess` faz
- Redireciona `http` → `https`.
- Comprime HTML, CSS e JS.
- HTML sempre atualizado (o navegador confere se tem versão nova).
- CSS, JS e fontes da pasta `_astro/` ficam em cache por 1 ano. Não tem problema, porque o nome desses arquivos muda a cada build.
