// Dados da ATC usados no site.
// Tudo que está como [PLACEHOLDER] continua assim até o Gustavo mandar o dado real
// (ver docs/conteudo.md). Troque só aqui.

export const site = {
  razaoSocial: 'ATC Administradora e Corretora LTDA',
  marca: 'ATC Seguros',
  cidade: 'Goiânia (GO)',
  fundacao: '1998',

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

  // Home: seguradoras parceiras
  seguradoras: ['[LOGO]', '[LOGO]', '[LOGO]', '[LOGO]', '[LOGO]', '[LOGO]'],
};

/** Link do WhatsApp da ATC, com mensagem opcional já escrita. */
export function waLink(texto?: string): string {
  const numero = site.whatsapp.replace(/\D/g, '');
  const base = `https://wa.me/${numero}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

/** Link pra ligar (tel:), só com os dígitos. Enquanto o número for placeholder, fica "#" como no design. */
export function telLink(telefone: string): string {
  return telefone.startsWith('[') ? '#' : `tel:${telefone.replace(/[^\d+]/g, '')}`;
}
