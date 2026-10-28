// Animações da home que dependem de script (docs/animacoes.md): 1 (fim da abertura) e 3 (conversas).

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
let cleanup: (() => void)[] = [];

function wait(ms: number, fn: () => void) {
  const id = setTimeout(fn, ms);
  cleanup.push(() => clearTimeout(id));
}

// 1. Tira a classe .intro quando a abertura termina (2 pulinhos da pílula inclusos)
function endIntro() {
  const html = document.documentElement;
  const sim = document.querySelector<HTMLElement>('.sim');
  if (!html.classList.contains('intro') || !sim) return;
  const n = parseInt(getComputedStyle(sim).getPropertyValue('--n'), 10) || 0;
  wait(200 + n * 40 + 700 + 2800 + 100, () => html.classList.remove('intro'));
}

// 3. Cada conversa toca como no WhatsApp: pergunta, "digitando" por 600ms, resposta. 300ms entre as conversas.
function chat() {
  const box = document.querySelector<HTMLElement>('.chat');
  if (!box || reduced() || !('IntersectionObserver' in window)) return;
  box.classList.add('armed');
  const io = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    io.disconnect();
    box.querySelectorAll<HTMLElement>('.thread').forEach((th, i) => {
      const q = th.querySelector<HTMLElement>('.q');
      const a = th.querySelector<HTMLElement>('.a');
      if (!q || !a) return;
      const t0 = i * 300;
      const dots = document.createElement('p');
      dots.className = 'typing';
      dots.setAttribute('aria-hidden', 'true');
      dots.innerHTML = '<i></i><i></i><i></i>';
      dots.style.top = `${a.offsetTop}px`;
      th.appendChild(dots);
      wait(t0, () => q.classList.add('show'));
      wait(t0 + 220, () => dots.classList.add('show'));
      wait(t0 + 220 + 600, () => { dots.remove(); a.classList.add('show'); });
    });
  }, { threshold: 0.35 });
  io.observe(box);
  cleanup.push(() => io.disconnect());
}

document.addEventListener('astro:page-load', () => {
  if (!document.querySelector('.sim')) return;
  endIntro();
  chat();
});
document.addEventListener('astro:before-swap', () => {
  cleanup.forEach((fn) => fn());
  cleanup = [];
});
