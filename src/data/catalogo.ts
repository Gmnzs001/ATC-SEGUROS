// Catálogo de design/Todos.dc.html (GROUPS e EXTRA copiados do <script> do design).
// Cada item vira /seguros/<slug>, com o conteúdo em src/content/seguros/<slug>.md.

export type Grupo = { id: string; name: string; desc: string; items: string[] };

export const GROUPS: Grupo[] = [
  { id: 'veiculos', name: 'Veículos', desc: 'Carro, moto, caminhão e tudo que roda.', items: ['Automóveis', 'Motos', 'Caminhões', 'Frota de veículos', 'Acidentes Pessoais Passageiros (APP)', 'Carta Verde (Mercosul)', 'Transporte de cargas'] },
  { id: 'patrimonio', name: 'Casa e patrimônio', desc: 'O que você construiu, dentro e fora de casa.', items: ['Residencial', 'Condomínio', 'Empresarial', 'Equipamentos', 'Equipamentos de home office', 'Equipamentos portáteis', 'Bike', 'Náuticos', 'Aeronáuticos', 'Agronegócios', 'Risco de engenharia', 'Riscos digitais'] },
  { id: 'pessoais', name: 'Pra você e sua família', desc: 'Saúde, vida, viagem e o futuro.', items: ['Vida', 'Saúde individual', 'Plano odontológico individual', 'Plano de saúde PET', 'Previdência privada', 'Diária por incapacidade temporária (DIT)', 'Viagem'] },
  { id: 'empresa', name: 'Pra sua equipe', desc: 'Benefícios que cuidam de quem trabalha com você.', items: ['Vida empresas', 'Vida PME', 'Saúde empresa', 'Plano odontológico empresarial', 'Acidentes pessoais coletivo', 'Educacional', 'Escolar'] },
  { id: 'rc', name: 'Responsabilidade civil', desc: 'Se o seu trabalho causar um prejuízo a alguém, o seguro paga.', items: ['Danos a terceiros', 'Ambiental', 'Diretores e conselheiros (D&O)', 'Profissional: médicos', 'Profissional: dentistas', 'Profissional: outras atividades', 'Cartórios, notários e registradores', 'Eventos', 'Ônibus e vans', 'Táxi', 'R.E.T.A. (aeronaves)'] },
  { id: 'financeiro', name: 'Garantias e financeiro', desc: 'Consórcio, financiamento e garantias pra contratos.', items: ['Consórcio de veículos', 'Consórcio de imóveis', 'Financiamento de veículos', 'Fiança locatícia', 'Seguro garantia para licitação', 'Seguro garantia execução de obras', 'Seguro garantia judicial'] },
];

export const EXTRA: Record<string, string> = { 'Automóveis': 'carro auto veiculo', 'Motos': 'moto', 'Equipamentos portáteis': 'celular notebook tablet camera', 'Náuticos': 'barco lancha jet ski', 'Aeronáuticos': 'aviao helicoptero', 'Agronegócios': 'fazenda trator safra gado cavalo', 'Plano de saúde PET': 'cachorro gato animal', 'Risco de engenharia': 'obra construcao reforma', 'Riscos digitais': 'hacker ciber dados', 'Fiança locatícia': 'aluguel fiador', 'Residencial': 'casa apartamento', 'Viagem': 'exterior europa', 'Bike': 'bicicleta' };

export function norm(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/** "Carta Verde (Mercosul)" → "carta-verde-mercosul", "R.E.T.A. (aeronaves)" → "reta-aeronaves" */
export function slug(nome: string): string {
  return norm(nome).replace(/[.&]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export const href = (nome: string) => `/seguros/${slug(nome)}`;
