// Scripts comuns a todas as páginas.

// 4. Círculos amarelos: deslocam no máximo 40px no eixo Y conforme a rolagem, só no desktop.
// Usa a propriedade `translate` pra somar com o `transform` que alguns círculos já têm no design.
const CIRCLES = '.sim .blob, .sim .blob2, .aud .circle, .sos-box .sun, .final-box .c, .talk .sun, .panel-y .circle, .crash .c';
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

document.addEventListener('astro:before-swap', (e) => {
  stop?.();
  stop = null;
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
