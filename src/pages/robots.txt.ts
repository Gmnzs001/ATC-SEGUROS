// robots.txt: libera tudo; a linha do sitemap entra quando o domínio for definido em src/config.ts
import type { APIRoute } from 'astro';
import { site, ehPlaceholder } from '../config';

export const GET: APIRoute = () => {
  const linhas = ['User-agent: *', 'Allow: /'];
  if (!ehPlaceholder(site.dominio)) linhas.push('', `Sitemap: ${site.dominio.replace(/\/$/, '')}/sitemap.xml`);
  return new Response(linhas.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
