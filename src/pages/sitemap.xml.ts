// sitemap.xml: páginas fixas + seguros revisados (rascunhos com revisado: false ficam de fora, como o noindex).
// Enquanto o domínio for [PLACEHOLDER], sai vazio (o sitemap exige endereços completos).
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site, ehPlaceholder } from '../config';

export const GET: APIRoute = async () => {
  const urls: string[] = [];
  if (!ehPlaceholder(site.dominio)) {
    const base = site.dominio.replace(/\/$/, '');
    const seguros = await getCollection('seguros', ({ data }) => data.revisado);
    for (const p of ['/', '/seguros/', '/seguros/para-voce/', '/seguros/para-sua-empresa/', '/sinistro/', '/quem-somos/', ...seguros.map((s) => `/seguros/${s.id}/`)]) urls.push(base + p);
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
