import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Modelo de toda página de seguro (design/Auto.dc.html). Um arquivo .md por seguro em src/content/seguros/.
// Nada vazio e nenhuma chave desconhecida: um arquivo com erro de digitação quebra o build
const txt = z.string().min(1);
const lista = <T extends z.ZodType>(t: T) => z.array(t).min(1);
const item = z.object({ nome: txt, desc: txt }).strict();
const link = z.object({ nome: txt, href: z.string().regex(/^\//) }).strict();

const seguros = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/seguros' }),
  schema: z.object({
    // false = rascunho que a ATC ainda precisa revisar
    revisado: z.boolean(),
    // título da aba do navegador
    titulo: txt,
    // item do cabeçalho marcado como atual
    menu: z.enum(['voce', 'empresa']),

    abertura: z.object({
      migalhas: lista(link),
      atual: txt,
      titulo: txt,
      texto: txt,
      botao: txt,
      // conversa ao lado do título: pergunta do cliente (q) e resposta da ATC (a), com fatores opcionais
      conversa: lista(z.union([
        z.object({ q: txt }).strict(),
        z.object({ a: txt, fatores: lista(txt).optional() }).strict(),
      ])),
    }).strict(),

    cobre: z.object({
      titulo: txt,
      texto: txt,
      basico: z.object({ titulo: txt, texto: txt, itens: lista(item) }).strict(),
      // opcional: produtos sem itens extras escolhíveis
      incluir: z.object({ titulo: txt, texto: txt, itens: lista(item) }).strict().optional(),
    }).strict(),

    naoCobre: z.object({ titulo: txt, texto: txt, itens: lista(item) }).strict(),

    simulador: z.object({
      inicio: z.enum(['carro', 'moto', 'casa', 'vida', 'saude', 'empresa', 'viagem', 'outro']),
      titulo: txt,
      texto: txt,
    }).strict(),

    faq: z.object({
      titulo: txt,
      perguntas: lista(z.object({ p: txt, r: txt }).strict()),
    }).strict(),

    // opcional: produtos sem sinistro (ex.: consórcio, financiamento)
    sinistro: z.object({
      titulo: txt,
      texto: txt,
      passos: lista(item),
    }).strict().optional(),

    relacionados: z.object({ titulo: txt, itens: lista(link) }).strict(),
  }).strict(),
});

export const collections = { seguros };
