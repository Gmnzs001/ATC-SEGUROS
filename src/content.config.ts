import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Modelo de toda página de seguro (design/Auto.dc.html). Um arquivo .md por seguro em src/content/seguros/.
const item = z.object({ nome: z.string(), desc: z.string() });
const link = z.object({ nome: z.string(), href: z.string() });

const seguros = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/seguros' }),
  schema: z.object({
    // false = rascunho que a ATC ainda precisa revisar
    revisado: z.boolean(),
    // título da aba do navegador
    titulo: z.string(),
    // item do cabeçalho marcado como atual
    menu: z.enum(['voce', 'empresa']),

    abertura: z.object({
      migalhas: z.array(link),
      atual: z.string(),
      titulo: z.string(),
      texto: z.string(),
      botao: z.string(),
      // conversa ao lado do título: pergunta do cliente (q) e resposta da ATC (a), com fatores opcionais
      conversa: z.array(z.union([
        z.object({ q: z.string() }),
        z.object({ a: z.string(), fatores: z.array(z.string()).optional() }),
      ])),
    }),

    cobre: z.object({
      titulo: z.string(),
      texto: z.string(),
      basico: z.object({ titulo: z.string(), texto: z.string(), itens: z.array(item) }),
      incluir: z.object({ titulo: z.string(), texto: z.string(), itens: z.array(item) }),
    }),

    naoCobre: z.object({ titulo: z.string(), texto: z.string(), itens: z.array(item) }),

    simulador: z.object({
      inicio: z.enum(['carro', 'moto', 'casa', 'vida', 'saude', 'empresa', 'viagem', 'outro']),
      titulo: z.string(),
      texto: z.string(),
    }),

    faq: z.object({
      titulo: z.string(),
      perguntas: z.array(z.object({ p: z.string(), r: z.string() })),
    }),

    sinistro: z.object({
      titulo: z.string(),
      texto: z.string(),
      passos: z.array(item),
    }),

    relacionados: z.object({ titulo: z.string(), itens: z.array(link) }),
  }),
});

export const collections = { seguros };
