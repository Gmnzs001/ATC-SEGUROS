// Catálogo de design/Todos.dc.html: busca e filtros (lógica copiada do <script> do design).
import { useLayoutEffect, useRef, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import { GROUPS, EXTRA, norm, href } from '../data/catalogo';
import { waLink } from '../config';

const EASE = 'cubic-bezier(.2,.8,.2,1)';

interface Props {
  children?: ComponentChildren;
  // Páginas "Para você" e "Para sua empresa": só os seguros desse público, com título e texto próprios
  titulo?: string;
  texto?: string;
  itens?: string[];
}

export default function Catalogo({ children, titulo = 'Todos os seguros.', texto = 'Mais de 50 jeitos de proteger o que importa. Procure pelo nome ou pelo que você quer proteger.', itens }: Props) {
  const [st, setSt] = useState({ q: '', tab: 'todos' });

  // Animação 7: ao filtrar ou buscar, os itens se reorganizam com FLIP (200ms), sem atraso na busca
  const root = useRef<HTMLDivElement>(null);
  const before = useRef<Map<string, DOMRect> | null>(null);
  const snap = () => {
    const m = new Map<string, DOMRect>();
    document.querySelectorAll<HTMLElement>('[data-k]').forEach((el) => m.set(el.dataset.k!, el.getBoundingClientRect()));
    before.current = m;
  };
  const set = (n: Partial<typeof st>) => { snap(); setSt({ ...st, ...n }); };
  useLayoutEffect(() => {
    const old = before.current;
    before.current = null;
    if (!old || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll<HTMLElement>('[data-k]').forEach((el) => {
      const r = old.get(el.dataset.k!);
      if (!r) return;
      const now = el.getBoundingClientRect();
      const dx = r.left - now.left;
      const dy = r.top - now.top;
      // Quem andaria mais que uma tela (ex.: a caixa do fim quando a lista encolhe) só pula pro lugar
      if ((!dx && !dy) || Math.abs(dy) > innerHeight) return;
      el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 200, easing: EASE });
    });
  }, [st]);

  const q = norm(st.q.trim());
  const grupos = GROUPS.map((g) => ({ ...g, items: itens ? g.items.filter((n) => itens.includes(n)) : g.items })).filter((g) => g.items.length > 0);
  const tabs = [{ id: 'todos', name: 'Todos' }].concat(grupos);
  const groups = grupos.filter((g) => st.tab === 'todos' || st.tab === g.id).map((g) => {
    const items = g.items.filter((n) => !q || norm(n + ' ' + (EXTRA[n] || '')).indexOf(q) >= 0);
    return { id: g.id, name: g.name, desc: g.desc, count: items.length + (items.length === 1 ? ' seguro' : ' seguros'), items };
  }).filter((g) => g.items.length > 0);

  return (
    <>
      <section class="hero">
        <div class="sun" aria-hidden="true"></div>
        <div class="wrap" ref={root}>
          <h1>{titulo}</h1>
          <p class="lead">{texto}</p>
          <div class="search">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.5-3.5"></path></svg>
            <label for="busca">Buscar seguro</label>
            <input id="busca" type="search" placeholder="O que você quer proteger? Ex.: celular, obra, barco" value={st.q} onInput={(e) => set({ q: (e.target as HTMLInputElement).value })} />
          </div>
          <div class="filters" role="group" aria-label="Filtrar por tipo">
            {tabs.map((t) => (
              <button class={st.tab === t.id ? 'f on' : 'f'} type="button" onClick={() => set({ tab: t.id })} aria-pressed={st.tab === t.id ? 'true' : 'false'}>{t.name}</button>
            ))}
          </div>
        </div>
      </section>

      <div class="wrap">
        {groups.length > 0 && (
          <div class="groups">
            {groups.map((g) => (
              <section key={g.id}>
                <div class="gh" data-k={`gh:${g.id}`}><h2>{g.name}</h2><span>{g.count}</span></div>
                <p class="gd" data-k={`gd:${g.id}`}>{g.desc}</p>
                <div class="items">
                  {g.items.map((n) => (
                    <a key={n} class="it" data-k={`it:${n}`} href={href(n)}>{n}<span class="go" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"></path></svg></span></a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
        {groups.length === 0 && (
          <div class="empty">
            <h2>Não achamos “{st.q}” na lista.</h2>
            <p>Mas é bem provável que a gente tenha. Tem seguro pra quase tudo, e o que não está aqui a ATC procura pra você.</p>
            <a class="pill pill-dark" href={waLink()}>Perguntar no WhatsApp</a>
          </div>
        )}
        <div data-k="help">{children}</div>
      </div>
    </>
  );
}
