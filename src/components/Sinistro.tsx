// "O que aconteceu?" de design/Sinistro.dc.html: casos, passos e documentos copiados do <script> do design.
import { useEffect, useState } from 'preact/hooks';

type Caso = { id: string; label: string; title: string; steps: [string, string][]; docs: string[] };

const CASES: Caso[] = [
  { id: 'batida', label: 'Bati o carro', title: 'Batida de carro', steps: [
    ['Sinalize e saia da pista', 'Pisca-alerta e triângulo. Todo mundo em lugar seguro.'],
    ['Alguém se machucou?', 'Ligue 192 (SAMU) antes de qualquer coisa.'],
    ['Fotografe tudo', 'Os carros, as placas, o local. Anote nome, telefone e CNH do outro motorista.'],
    ['Chame a ATC', 'A gente abre o sinistro com a seguradora e te diz se precisa de boletim de ocorrência.'],
  ], docs: ['CNH do motorista', 'Documento do carro (CRLV)', 'Fotos do acidente', 'Boletim de ocorrência, se houver'] },
  { id: 'roubo', label: 'Roubaram meu carro', title: 'Roubo ou furto do veículo', steps: [
    ['Fique em segurança', 'Não reaja e não vá atrás de ninguém.'],
    ['Ligue 190', 'E registre o boletim de ocorrência o quanto antes.'],
    ['Avise a ATC no mesmo dia', 'Quanto antes a seguradora souber, mais rápido o processo anda.'],
    ['Separe as chaves e documentos', 'A seguradora vai pedir as chaves do carro e os documentos.'],
  ], docs: ['Boletim de ocorrência', 'CNH', 'Documento do carro (CRLV)', 'Todas as chaves do carro'] },
  { id: 'pane', label: 'O carro quebrou', title: 'Pane, pneu ou bateria', steps: [
    ['Pare em lugar seguro', 'Acostamento, pisca-alerta ligado e triângulo.'],
    ['Chame a ATC ou a assistência 24h', 'A gente aciona o guincho ou o socorro pra você.'],
    ['Mande sua localização', 'Pelo WhatsApp, fica mais rápido pro guincho te achar.'],
  ], docs: ['Placa do carro', 'Seu CPF', 'Sua localização'] },
  { id: 'casa', label: 'Problema em casa', title: 'Problema em casa', steps: [
    ['Garanta a segurança', 'Em incêndio, saia e ligue 193. Em vazamento, feche o registro.'],
    ['Fotografe os danos', 'Antes de arrumar qualquer coisa.'],
    ['Não jogue nada fora', 'O que estragou pode ser pedido na vistoria.'],
    ['Chame a ATC', 'Chaveiro, encanador e eletricista da assistência 24h, e a gente cuida do sinistro.'],
  ], docs: ['Fotos dos danos', 'Notas fiscais dos bens, se tiver', 'Boletim de ocorrência, se for roubo'] },
  { id: 'saude', label: 'Saúde ou vida', title: 'Saúde, vida ou acidente pessoal', steps: [
    ['Emergência médica?', 'Vá ao pronto-socorro mais próximo ou ligue 192.'],
    ['Plano de saúde', 'Use a carteirinha ou o app da operadora. Qualquer problema, chame a ATC.'],
    ['Seguro de vida ou acidente', 'A ATC orienta a família sobre os documentos e acompanha o pedido com a seguradora.'],
  ], docs: ['Documentos pessoais', 'Laudos e relatórios médicos', 'Certidões, quando pedidas'] },
  { id: 'empresa', label: 'Na minha empresa', title: 'Ocorrência na empresa', steps: [
    ['Proteja as pessoas', 'Em incêndio, 193. Em crime, 190.'],
    ['Registre tudo', 'Fotos, vídeos e boletim de ocorrência quando houver crime.'],
    ['Chame a ATC', 'A gente abre o sinistro e acompanha a vistoria, inclusive o que a empresa deixou de faturar, se você tiver essa cobertura.'],
  ], docs: ['Fotos e vídeos', 'Notas fiscais e inventário', 'Boletim de ocorrência, se houver'] },
  { id: 'viagem', label: 'Em viagem', title: 'Problema em viagem', steps: [
    ['Ligue antes de ir ao médico', 'Use a central 24h que está na sua apólice de viagem. Ela indica onde ser atendido.'],
    ['Guarde todos os recibos', 'Remédio, consulta, táxi. Tudo pode ser reembolsado conforme a apólice.'],
    ['Mala extraviada?', 'Registre na companhia aérea antes de sair do aeroporto e guarde o comprovante.'],
  ], docs: ['Apólice de viagem', 'Recibos e notas', 'Comprovante da companhia aérea'] },
];

function Guia({ c, old, entra }: { c: Caso; old?: boolean; entra?: boolean }) {
  return (
    <div class={old ? 'guide guide-old' : entra ? 'guide in' : 'guide'} aria-hidden={old ? 'true' : undefined}>
      <div class="steps">
        <h3>{c.title}</h3>
        <ol>
          {c.steps.map((s, i) => <li><span class="n">{i + 1}</span><div><b>{s[0]}</b><span class="t">{s[1]}</span></div></li>)}
        </ol>
      </div>
      <div class="docs">
        <h3>Separe esses documentos</h3>
        <ul>
          {c.docs.map((d) => <li>{d}</li>)}
        </ul>
        <p>Não tem tudo agora? Sem problema. Manda o que tiver e a gente te ajuda com o resto.</p>
      </div>
    </div>
  );
}

export default function Sinistro() {
  const [st, setSt] = useState({ c: 0, prev: -1 });
  // Animação 8: trocar de situação faz cross-fade de 150ms nos passos (o antigo sai por cima enquanto o novo entra)
  useEffect(() => {
    if (st.prev < 0) return;
    const id = setTimeout(() => setSt((s) => ({ ...s, prev: -1 })), matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 150);
    return () => clearTimeout(id);
  }, [st]);
  const pick = (i: number) => { if (i !== st.c) setSt({ c: i, prev: st.c }); };

  return (
    <section class="pick">
      <h2>O que aconteceu?</h2>
      <p class="hint">Escolha e veja o que fazer agora, passo a passo.</p>
      <div class="opts" role="group" aria-label="Tipo de ocorrência">
        {CASES.map((x, i) => (
          <button class={i === st.c ? 'o on' : 'o'} type="button" onClick={() => pick(i)} aria-pressed={i === st.c ? 'true' : 'false'}>{x.label}</button>
        ))}
      </div>
      <div class="guide-x">
        <Guia key={CASES[st.c].id} c={CASES[st.c]} entra={st.prev >= 0} />
        {st.prev >= 0 && <Guia key={`old-${CASES[st.prev].id}`} c={CASES[st.prev]} old />}
      </div>
    </section>
  );
}
