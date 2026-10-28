// Scripts comuns a todas as páginas.

// 4. Círculos amarelos: deslocam no máximo 40px no eixo Y conforme a rolagem, só no desktop.
// Usa a propriedade `translate` pra somar com o `transform` que alguns círculos já têm no design.
const CIRCLES = '.sim .blob, .sim .blob2, .aud .circle, .sos-box .sun, .final-box .c, .talk .sun, .panel-y .circle, .crash .c, .hero > .sun, .help .c, .promise .c';
// (o .top .sun do Sinistro fica parado: a animação 8 pede quase nada de movimento nessa página)
let stop: (() => void) | null = null;

function parallax() {
  const circles = [...document.querySelectorAll<HTMLElement>(CIRCLES)];
  if (!circles.length) return;
  const desktop = matchMedia('(min-width: 901px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let raf = 0;
  const update = () => {
    raf = 0;
    const on = desktop.matches && !reduced.matches;
    const vh = window.innerHeight;
    for (const el of circles) {
      if (!on) { el.style.translate = ''; continue; }
      const r = (el.parentElement as HTMLElement).getBoundingClientRect();
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)));
      el.style.translate = `0 ${(p * 20).toFixed(1)}px`;
    }
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
  stop = () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    cancelAnimationFrame(raf);
  };
}

document.addEventListener('astro:page-load', parallax);

// Menu mobile (opção A, tela cheia). O cabeçalho persiste entre páginas, então os eventos ficam no document.
const menu = () => document.getElementById('menu-mobile');
const burger = () => document.querySelector<HTMLButtonElement>('.header .wrap .burger');

function abrirMenu() {
  const m = menu();
  if (!m) return;
  m.hidden = false;
  burger()?.setAttribute('aria-expanded', 'true');
  document.documentElement.style.overflow = 'hidden';
  m.querySelector<HTMLElement>('.mm-close')?.focus();
}

function fecharMenu(devolverFoco = true) {
  const m = menu();
  if (!m || m.hidden) return;
  m.hidden = true;
  burger()?.setAttribute('aria-expanded', 'false');
  document.documentElement.style.overflow = '';
  if (devolverFoco) burger()?.focus();
}

document.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  if (t.closest('.header .wrap .burger')) abrirMenu();
  else if (t.closest('.mm-close')) fecharMenu();
  else if (t.closest('.mm a')) fecharMenu(false);
});

document.addEventListener('keydown', (e) => {
  const m = menu();
  if (!m || m.hidden) return;
  if (e.key === 'Escape') { fecharMenu(); return; }
  // Foco preso dentro do menu enquanto ele está aberto
  if (e.key === 'Tab') {
    const itens = [...m.querySelectorAll<HTMLElement>('a, button')];
    const primeiro = itens[0];
    const ultimo = itens[itens.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
  }
});

// Se a tela crescer pro desktop com o menu aberto, libera a rolagem
matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) fecharMenu(false); });

document.addEventListener('astro:before-swap', (e) => {
  stop?.();
  stop = null;
  fecharMenu(false);
  // 9. O cabeçalho persiste entre páginas (transition:persist), mas o link marcado (.here)
  // e os destinos mudam por página: copia os atributos dos links do cabeçalho da página nova.
  const next = e.newDocument.querySelectorAll('header.header a');
  document.querySelectorAll('header.header a').forEach((a, i) => {
    const n = next[i];
    if (!n) return;
    for (const attr of ['class', 'href', 'aria-current']) {
      const v = n.getAttribute(attr);
      if (v === null) a.removeAttribute(attr); else a.setAttribute(attr, v);
    }
  });
});
