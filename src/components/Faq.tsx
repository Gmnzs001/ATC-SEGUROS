// Perguntas frequentes de design/Auto.dc.html: a primeira começa aberta, só uma aberta por vez.
import { useState } from 'preact/hooks';

interface Props {
  perguntas: { p: string; r: string }[];
}

export default function Faq({ perguntas }: Props) {
  const [open, setOpen] = useState(0);
  return (
    <div class="faq">
      {perguntas.map((f, i) => {
        const on = open === i;
        return (
          <div class={on ? 'fq open' : 'fq'}>
            <button type="button" onClick={() => setOpen(on ? -1 : i)} aria-expanded={on ? 'true' : 'false'}>
              {f.p}
              <span class="plus" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"></path></svg></span>
            </button>
            {/* Animação 6: a resposta abre e fecha com altura animada */}
            <div class="ans-w" inert={!on}>
              <div><p class="ans">{f.r}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
