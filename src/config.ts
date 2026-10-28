// Dados da ATC usados no site.
// Tudo que está como [PLACEHOLDER] continua assim até o Gustavo mandar o dado real
// (ver docs/conteudo.md). Troque só aqui.

export const site = {
  razaoSocial: 'ATC Administradora e Corretora LTDA',
  marca: 'ATC Seguros',
  cidade: 'Goiânia (GO)',
  fundacao: '1998',

  // endereço do site (ex.: https://www.seudominio.com.br): usado no canonical, Open Graph, sitemap e robots
  dominio: '[DOMÍNIO]',

  cnpj: '[CNPJ]',
  susep: '[NÚMERO SUSEP]',
  whatsapp: '[WHATSAPP]',
  telefone24h: '[TELEFONE 24H]',
  telefone: '[TELEFONE]',
  endereco: '[ENDEREÇO]',
  horario: '[HORÁRIO]',
  notaGoogle: '[NOTA]',
  instagram: '[INSTAGRAM NOVO]',

  // Home: bloco "quem atende"
  responsavel: {
    nome: '[NOME]',
    cargo: '[CARGO]',
    foto: '[FOTO REAL DE QUEM ATENDE: no escritório, sorrindo, luz natural]',
  },
  depoimentos: [
    '[DEPOIMENTO REAL DE CLIENTE, com nome e bairro]',
    '[DEPOIMENTO REAL DE CLIENTE]',
  ],

  // Seguradoras parceiras: a home mostra 6 logos e o Quem somos mostra 8 (como nos designs)
  seguradoras: ['[LOGO]', '[LOGO]', '[LOGO]', '[LOGO]', '[LOGO]', '[LOGO]', '[LOGO]', '[LOGO]'],

  // Sinistro 24h: telefone 24h de cada seguradora
  seguradoras24h: Array.from({ length: 6 }, () => ({ nome: '[SEGURADORA]', telefone: '[0800]' })),

  // Quem somos
  fotoEquipe: '[FOTO REAL DA EQUIPE NO ESCRITÓRIO]',
  historia: [
    { ano: '1998', titulo: 'A ATC abre as portas em Goiânia', texto: '[COMO A ATC COMEÇOU: quem fundou, onde, os primeiros clientes]' },
    { ano: '[ANO]', titulo: '[UM MARCO DA HISTÓRIA]', texto: '[Ex.: mudança de endereço, novo tipo de seguro, cliente marcante]' },
    { ano: '[ANO]', titulo: '[OUTRO MARCO]', texto: '[Ex.: número de clientes atendidos, parceria importante]' },
    { ano: '2026', titulo: 'Seguro sem letra miúda', texto: 'Nova gestão, nova marca e um compromisso: explicar tudo antes de você assinar.', agora: true },
  ],
  equipe: Array.from({ length: 3 }, () => ({ foto: '[FOTO]', nome: '[NOME]', funcao: '[FUNÇÃO]', whatsapp: '[WHATSAPP]' })),
  mapa: '[MAPA DO GOOGLE]',
  // link "Como chegar" (Google Maps); enquanto for placeholder, o botão fica com "#"
  comoChegar: '[LINK DO GOOGLE MAPS]',
};

/** Link do WhatsApp (da ATC ou de outro número), com mensagem opcional já escrita. */
export function waLink(texto?: string, whatsapp: string = site.whatsapp): string {
  const numero = whatsapp.replace(/\D/g, '');
  const base = `https://wa.me/${numero}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

/** O valor ainda é um [PLACEHOLDER]? */
export const ehPlaceholder = (v: string) => v.startsWith('[');

/** Link externo; enquanto for placeholder, fica "#" como no design. */
export function linkOuVazio(url: string): string {
  return url.startsWith('[') ? '#' : url;
}

/** Link pra ligar (tel:), só com os dígitos. Enquanto o número for placeholder, fica "#" como no design. */
export function telLink(telefone: string): string {
  return telefone.startsWith('[') ? '#' : `tel:${telefone.replace(/[^\d+]/g, '')}`;
}
