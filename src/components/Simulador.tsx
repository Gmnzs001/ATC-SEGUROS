// Simulador de design/Simulador.dc.html: dados e lógica copiados do <script> do design.
import { useLayoutEffect, useRef, useState } from 'preact/hooks';
import { site, waLink } from '../config';
import './simulador.css';

type Opt = [string, string[]?];
type Slot = { k: string; o: Opt[] };
type Tpl = { base: string[]; parts: (string | Slot)[] };
type Cat = { id: string; label: string; t: Tpl };

const COV: Record<string, [string, string]> = {
  colisao: ['Batida e perda total', 'Bateu? A seguradora paga o conserto. Você paga só a franquia.'],
  roubo: ['Roubo e furto', 'Se levarem, você recebe o valor do veículo pela tabela.'],
  terceiros: ['Danos a terceiros', 'Bateu em alguém? O seguro paga o prejuízo do outro.'],
  assist: ['Guincho 24h', 'Pane, pneu furado ou bateria arriada: alguém vai até você.'],
  reserva: ['Carro reserva', 'Se o seu for pra oficina, você não fica a pé.'],
  vidros: ['Vidros e faróis', 'Trincou o para-brisa? Troca sem dor de cabeça.'],
  app: ['Uso em aplicativo', 'Protegido enquanto você roda com passageiros.'],
  incendio: ['Incêndio e raio', 'A base de tudo: reconstrução do imóvel e do que tem dentro.'],
  roubocasa: ['Roubo de bens', 'Se entrarem e levarem suas coisas, você é indenizado.'],
  eletrico: ['Danos elétricos', 'Queda de energia queimou a geladeira? Está coberto.'],
  agua: ['Vazamentos', 'Cano estourou e molhou o vizinho de baixo? Está coberto.'],
  assistcasa: ['Socorro 24h em casa', 'Chaveiro, encanador e eletricista quando precisar.'],
  morte: ['Família amparada', 'Se você faltar, quem depende de você recebe pra seguir em frente.'],
  invalidez: ['Invalidez por acidente', 'Se um acidente te tirar do trabalho, você recebe uma indenização.'],
  doenca: ['Doenças graves', 'Recebe o valor em vida, pra usar como precisar.'],
  dit: ['Diária por afastamento', 'Ficou parado? Você recebe por dia sem trabalhar.'],
  funeral: ['Assistência funeral', 'Tudo organizado pela seguradora num momento difícil.'],
  consultas: ['Consultas e internação', 'Do clínico geral à cirurgia.'],
  rede: ['Hospitais que você usa', 'A rede credenciada confirmada na cotação.'],
  nacional: ['Brasil todo', 'Atendimento em qualquer lugar do país.'],
  odonto: ['Dentista junto', 'Odontológico no mesmo plano, numa conta só.'],
  patrimonio: ['Imóvel e estoque', 'Incêndio, roubo ou dano elétrico não param o negócio.'],
  rc: ['Responsabilidade civil', 'Se a empresa causar dano a alguém, o seguro paga.'],
  vidagrupo: ['Vida em grupo', 'Proteção pra equipe. Benefício que segura bons funcionários.'],
  frota: ['Frota', 'Todos os veículos da empresa numa apólice só.'],
  lucros: ['Lucros cessantes', 'Se parar por um sinistro, o seguro cobre o que deixou de entrar.'],
  medica: ['Médico e hospital', 'Atendimento e remédio durante a viagem.'],
  bagagem: ['Bagagem', 'Mala extraviada ou danificada? Você é ressarcido.'],
  schengen: ['Exigência da Europa', 'O valor mínimo cobrado na imigração europeia.'],
  esporte: ['Esporte e aventura', 'Proteção pro que o seguro comum não cobre.'],
};
const AUTO: Tpl = { base: ['colisao', 'roubo', 'terceiros', 'assist'], parts: [
  ', que eu uso pra ', { k: 'uso', o: [['ir pro trabalho'], ['trabalhar com ele'], ['rodar em aplicativo', ['app']], ['passear no fim de semana']] },
  ' e que dorme ', { k: 'noite', o: [['na garagem'], ['na rua', ['vidros']], ['no estacionamento']] },
  '. O que mais me preocupa é ', { k: 'medo', o: [['roubo'], ['bater', ['vidros']], ['ficar sem ele', ['reserva']], ['tudo isso', ['reserva', 'vidros']]] }, '.',
]};
const CATS: Cat[] = [
  { id: 'carro', label: 'meu carro', t: AUTO },
  { id: 'moto', label: 'minha moto', t: AUTO },
  { id: 'casa', label: 'minha casa', t: { base: ['incendio', 'assistcasa'], parts: [
    ', que é ', { k: 'tipo', o: [['uma casa'], ['um apartamento'], ['uma casa em condomínio']] },
    ' e ', { k: 'posse', o: [['é minha'], ['é alugada']] },
    '. O que mais me preocupa é ', { k: 'medo', o: [['roubo', ['roubocasa']], ['queda de energia', ['eletrico']], ['vazamento', ['agua']], ['tudo isso', ['roubocasa', 'eletrico', 'agua']]] }, '.',
  ]}},
  { id: 'vida', label: 'minha família', t: { base: ['invalidez'], parts: [
    '. ', { k: 'dep', o: [['Tem gente que depende', ['morte']], ['Ninguém depende']] },
    ' da minha renda e eu sou ', { k: 'trab', o: [['autônomo', ['dit']], ['CLT'], ['aposentado']] },
    '. O que mais me preocupa é ', { k: 'medo', o: [['uma doença grave', ['doenca']], ['deixar a família sem nada', ['morte', 'funeral']], ['ficar sem trabalhar', ['dit']]] }, '.',
  ]}},
  { id: 'saude', label: 'minha saúde', t: { base: ['consultas', 'rede'], parts: [
    '. O plano é pra ', { k: 'para', o: [['mim'], ['minha família'], ['minha empresa']] },
    ', ', { k: 'pess', o: [['1 pessoa'], ['2 ou 3 pessoas'], ['4 a 10 pessoas'], ['mais de 10 pessoas']] },
    ' no total. Não pode faltar ', { k: 'prio', o: [['bons hospitais em Goiânia'], ['atendimento no Brasil todo', ['nacional']], ['dentista junto', ['odonto']], ['mensalidade baixa']] }, '.',
  ]}},
  { id: 'empresa', label: 'minha empresa', t: { base: ['patrimonio', 'rc'], parts: [
    '. É ', { k: 'neg', o: [['um comércio'], ['um escritório'], ['uma indústria'], ['um negócio no agro']] },
    ' e eu quero cuidar ', { k: 'prot', o: [['do imóvel e do estoque', ['lucros']], ['da equipe', ['vidagrupo']], ['dos veículos', ['frota']], ['de tudo isso', ['lucros', 'vidagrupo', 'frota']]] },
    '. Somos ', { k: 'func', o: [['até 10 pessoas'], ['11 a 50 pessoas'], ['mais de 50 pessoas']] }, '.',
  ]}},
  { id: 'viagem', label: 'minha viagem', t: { base: ['medica', 'bagagem'], parts: [
    '. Vou ', { k: 'dest', o: [['pelo Brasil'], ['pra América do Sul'], ['pra Europa', ['schengen']], ['pra outro lugar']] },
    ' por ', { k: 'dias', o: [['até 7 dias'], ['8 a 30 dias'], ['mais de 30 dias']] },
    ' e ', { k: 'esp', o: [['sem nada radical'], ['com esporte de aventura', ['esporte']]] }, '.',
  ]}},
  { id: 'outro', label: 'outra coisa', t: { base: [], parts: ['. Me ajuda a achar o seguro certo?'] } },
];

type Part =
  | { kind: 'text'; text: string; id: string }
  | { kind: 'slot'; key: string; label: string; first: boolean }
  | { kind: 'choices'; choices: { label: string; sel: boolean; pick: () => void }[] };

type Shown = { k: string; out: boolean; delay?: number };

const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE = 'cubic-bezier(.2,.8,.2,1)';

interface Props {
  start?: string;
  title?: string;
  intro?: string;
}

export default function Simulador(props: Props) {
  const [st, setSt] = useState(() => {
    let s = 0;
    for (let i = 0; i < CATS.length; i++) if (CATS[i].id === props.start) s = i;
    return { cat: s, sel: {} as Record<string, number>, open: null as string | null, touched: false };
  });
  const set = (n: Partial<typeof st>) => {
    // Primeiro toque encerra a abertura da home (animação 1)
    document.documentElement.classList.remove('intro');
    setSt({ ...st, ...n });
  };

  const cat = CATS[st.cat];
  const t = cat.t;
  const sel = st.sel;

  const parts: Part[] = [{ kind: 'text', text: 'Quero proteger ', id: 't' }, { kind: 'slot', key: '_cat', label: cat.label, first: true }];
  if (st.open === '_cat') {
    parts.push({ kind: 'choices', choices: CATS.map((c, i) => ({ label: c.label, sel: i === st.cat, pick: () => set({ cat: i, sel: {}, open: null }) })) });
  }
  const keys = t.base.slice();
  const words: string[] = ['Quero proteger ', cat.label];
  t.parts.forEach((p, pi) => {
    if (typeof p === 'string') { parts.push({ kind: 'text', text: p, id: `t${pi}` }); words.push(p); return; }
    const i = sel[p.k] || 0;
    const adds = p.o[i][1] || [];
    adds.forEach((a) => { if (keys.indexOf(a) < 0) keys.push(a); });
    parts.push({ kind: 'slot', key: p.k, label: p.o[i][0], first: false });
    words.push(p.o[i][0]);
    if (st.open === p.k) {
      parts.push({ kind: 'choices', choices: p.o.map((o, j) => ({ label: o[0], sel: j === i, pick: () => set({ sel: { ...sel, [p.k]: j }, open: null }) })) });
    }
  });
  const outro = cat.id === 'outro';
  const title = props.title || 'Seguro sem letra miúda.';
  const intro = props.intro || 'Toque nas palavras amarelas e conte sobre você.';
  const panelTitle = outro ? 'A gente acha com você' : 'Sua proteção';
  const panelLead = outro ? 'São mais de 50 tipos de seguro: bike, pet, celular, garantia, responsabilidade civil e muito mais. Conta pra gente o que precisa.' : 'Montada com o que você contou, em português claro.';

  // Mensagem do WhatsApp: a frase completa + a lista de coberturas
  const frase = words.join('');
  const msg = keys.length ? `${frase}\n\n${panelTitle}:\n${keys.map((k) => `- ${COV[k][0]}`).join('\n')}` : frase;

  // Coberturas no card: entram e saem com animação (animação 2)
  const [shown, setShown] = useState<Shown[]>(() => keys.map((k) => ({ k, out: false })));
  const keyStr = keys.join(',');
  const lastKeys = useRef(keyStr);
  if (lastKeys.current !== keyStr) {
    lastKeys.current = keyStr;
    const prev = shown.filter((s) => !s.out).map((s) => s.k);
    let n = 0;
    const next: Shown[] = keys.map((k) => (prev.indexOf(k) >= 0 ? { k, out: false } : { k, out: false, delay: n++ * 40 }));
    shown.forEach((s, idx) => {
      if (keys.indexOf(s.k) < 0) next.splice(Math.min(idx, next.length), 0, { k: s.k, out: true });
    });
    setShown(next);
  }
  useLayoutEffect(() => {
    if (!shown.some((s) => s.out)) return;
    const id = setTimeout(() => setShown((cur) => cur.filter((s) => !s.out)), reduced() ? 0 : 150);
    return () => clearTimeout(id);
  }, [shown]);

  // O card muda de altura suavemente (FLIP da altura)
  const panel = useRef<HTMLElement>(null);
  const prevH = useRef(0);
  if (panel.current) prevH.current = panel.current.getBoundingClientRect().height;
  useLayoutEffect(() => {
    const el = panel.current;
    if (!el || !prevH.current || reduced()) return;
    const h = el.getBoundingClientRect().height;
    if (Math.abs(h - prevH.current) < 1) return;
    el.getAnimations().forEach((a) => a instanceof CSSAnimation || a.cancel());
    el.style.overflow = 'hidden';
    const anim = el.animate([{ height: `${prevH.current}px` }, { height: `${h}px` }], { duration: 220, easing: EASE });
    anim.onfinish = anim.oncancel = () => { el.style.overflow = ''; };
  });

  // Palavra trocada na frase: cross-fade de 150ms (a antiga sai por cima enquanto a nova entra)
  const prevLabels = useRef<Record<string, string>>({});
  const labelsNow: Record<string, string> = {};
  const [, setTick] = useState(0);
  let swapped = false;
  useLayoutEffect(() => {
    prevLabels.current = labelsNow;
    // Depois do fade, um novo render tira a palavra antiga do DOM (e o clip-path da pílula)
    if (!swapped) return;
    const id = setTimeout(() => setTick((t) => t + 1), reduced() ? 0 : 150);
    return () => clearTimeout(id);
  });

  // Índice de cada palavra/pílula pra abertura (entra uma por vez, 40ms entre cada)
  let wi = 0;
  const split = (text: string, id: string) =>
    text.split(/(\s+)/).map((w, j) => (w === '' || /^\s+$/.test(w) ? w : <span key={`${id}-${j}`} class="w" style={`--i:${wi++}`}>{w}</span>));

  const sentence = parts.map((p) => {
    if (p.kind === 'text') return split(p.text, p.id);
    if (p.kind === 'slot') {
      const open = st.open === p.key;
      const cls = 'slot w' + (open ? ' on' : '') + (p.first && !st.touched ? ' first' : '');
      const prev = prevLabels.current[p.key];
      const changed = st.touched && prev !== undefined && prev !== p.label;
      labelsNow[p.key] = p.label;
      if (changed) swapped = true;
      return (
        <button key={`slot-${p.key}`} class={cls} style={`--i:${wi++}`} type="button" onClick={() => set({ open: open ? null : p.key, touched: true })} aria-expanded={open ? 'true' : 'false'}>
          <span key={p.label} class={changed ? 'swap' : undefined}>{p.label}</span>
          {changed && <span key={`old-${prev}`} class="old" aria-hidden="true">{prev}</span>}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg>
        </button>
      );
    }
    return (
      <span key="pop" class="pop">
        {p.choices.map((c) => <button class={c.sel ? 'chip sel' : 'chip'} type="button" onClick={c.pick}>{c.label}</button>)}
      </span>
    );
  });

  return (
    <section class="sim" aria-label="Simulador de proteção" style={`--n:${wi}`}>
      <div class="blob" aria-hidden="true"></div>
      <div class="blob2" aria-hidden="true"></div>

      <div class="left">
        <h1>{title}</h1>
        <p class="intro">{intro}</p>
        <p class="sentence">{sentence}</p>
        {!st.open && <p class="tip"><span aria-hidden="true">?</span>Cada palavra amarela muda a sua proteção.</p>}
        <div class="cta">
          <a class="go" href={waLink(msg)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.3A8.5 8.5 0 1 1 21 12z"></path></svg>
            Cotar isso no WhatsApp</a>
          <p class="small">A mensagem já vai com tudo que você escolheu. Ninguém vai te perguntar de novo.</p>
        </div>
        <div class="trust">
          <span><svg viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-7 9 7"></path><path d="M5 10v10h14V10"></path></svg>Desde 1998 em Goiânia</span>
          <span><svg viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z"></path><path d="M9 12l2 2 4-4"></path></svg>Corretora SUSEP nº {site.susep}</span>
          <span><svg viewBox="0 0 24 24" fill="#1A1A1A" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"></path></svg>{site.notaGoogle} no Google</span>
        </div>
      </div>

      <aside class="panel" aria-live="polite" ref={panel}>
        <h2>{panelTitle}</h2>
        <p class="lead">{panelLead}</p>
        <ul class="covs">
          {shown.map((s) => (
            <li key={s.k} class={s.out ? 'out' : s.delay !== undefined ? 'in' : undefined} style={s.delay ? `animation-delay:${s.delay}ms` : undefined}>
              <span class="ck" aria-hidden="true"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"></path></svg></span>
              <div><b>{COV[s.k][0]}</b><span class="d">{COV[s.k][1]}</span></div>
            </li>
          ))}
        </ul>
        <div class="soon"><b>Em breve:</b> os preços de cada seguradora parceira aparecem aqui, lado a lado.</div>
      </aside>
    </section>
  );
}
