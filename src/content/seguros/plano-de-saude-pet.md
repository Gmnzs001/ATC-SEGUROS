---
# Rascunho gerado a partir do modelo do Seguro auto. A ATC precisa revisar antes de publicar.
revisado: false
titulo: "ATC Seguros — Plano de saúde PET"
menu: voce

abertura:
  migalhas:
    - { nome: "Início", href: "/" }
    - { nome: "Pra você", href: "/seguros" }
  atual: "Plano de saúde PET"
  titulo: "Plano de saúde PET"
  texto: "Pra cachorro e gato que fazem parte da família. A gente compara os planos e mostra o que cada um cobre antes de você decidir."
  botao: "Montar o plano do meu pet"
  conversa:
    - q: "Quanto custa um plano pro meu pet?"
    - a: "Depende de algumas coisas, e a gente te explica cada uma:"
      fatores: ["a espécie", "a raça", "a idade dele", "sua cidade", "o que o plano cobre"]
    - q: "Dá pra comparar antes de decidir?"
    - a: "Dá sim. Conta sobre o seu pet aqui embaixo e a gente te manda as opções comparadas no WhatsApp."

cobre:
  titulo: "O que o plano de saúde PET cobre."
  texto: "Uma parte vem nos planos de entrada. A outra você escolhe conforme o seu bicho."
  basico:
    titulo: "Vem no básico"
    texto: "O que costuma vir nos planos mais simples."
    itens:
      - { nome: "Consultas", desc: "Com o veterinário da rede, pra rotina ou quando ele não estiver bem." }
      - { nome: "Vacinas", desc: "Muitos planos já incluem as vacinas de rotina. A gente confirma na cotação." }
      - { nome: "Exames simples", desc: "Exame de sangue e outros básicos que o veterinário pedir." }
  incluir:
    titulo: "Dá pra incluir"
    texto: "Depende do plano. A gente confirma na cotação."
    itens:
      - { nome: "Cirurgia e internação", desc: "Pra quando ele precisar ficar na clínica ou operar." }
      - { nome: "Exames de imagem", desc: "Raio X e ultrassom, pra descobrir o que está acontecendo." }
      - { nome: "Castração", desc: "Alguns planos incluem a cirurgia de castração." }

naoCobre:
  titulo: "E o que ele não cobre. Sem letra miúda."
  texto: "Ninguém conta isso antes. A gente conta. As regras exatas mudam de plano pra plano, e a gente te mostra as do seu."
  itens:
    - { nome: "Doença que ele já tinha", desc: "Problema de saúde de antes da contratação costuma ficar de fora." }
    - { nome: "Banho e tosa", desc: "Estética não é saúde. Só entra nos planos que oferecem como extra." }
    - { nome: "Ração e remédio em casa", desc: "O que ele come e o remédio comprado na farmácia ficam por sua conta." }
    - { nome: "Clínica fora da rede", desc: "Se o plano não tem reembolso, o atendimento fora da rede é pago por você." }

simulador:
  inicio: outro
  titulo: "Monte o plano do seu pet."
  texto: "Toque nas palavras amarelas. A gente prepara a cotação com isso."

faq:
  titulo: "Perguntas que todo mundo faz."
  perguntas:
    - p: "Quanto custa um plano de saúde PET?"
      r: "Depende da espécie, da raça, da idade do bicho, da sua cidade e do que o plano cobre. Por isso não dá pra cravar um preço sem cotar. Conta sobre o seu pet no simulador acima e a gente te manda as opções comparadas no WhatsApp."
    - p: "Quais bichos podem ter plano?"
      r: "Na maioria das empresas, cachorro e gato. Outros bichos dependem da empresa, e a gente procura pra você."
    - p: "Tem carência?"
      r: "Tem. O tempo de espera muda de procedimento pra procedimento e de empresa pra empresa. A gente te mostra antes de você contratar."
    - p: "Meu pet já é idoso. Ainda dá?"
      r: "Depende da empresa. Algumas aceitam com regras próprias, outras não. Conta pra gente a idade dele e a gente vê quem aceita."

sinistro:
  titulo: "Seu pet passou mal? Faz isso agora."
  texto: "Respira. Ele vai ser atendido, e a gente ajuda no resto."
  passos:
    - { nome: "Ache uma clínica da rede", desc: "O aplicativo ou o site do plano mostra as mais perto, inclusive as que atendem urgência." }
    - { nome: "Leve a carteirinha", desc: "A do plano do pet e um documento seu." }
    - { nome: "Chame a ATC", desc: "Travou o atendimento ou negaram alguma coisa? A gente fala com a empresa do plano." }

relacionados:
  titulo: "Quem tem pet também costuma proteger:"
  itens:
    - { nome: "Residencial", href: "/seguros/residencial" }
    - { nome: "Saúde individual", href: "/seguros/saude-individual" }
    - { nome: "Vida", href: "/seguros/vida" }
    - { nome: "Plano odontológico individual", href: "/seguros/plano-odontologico-individual" }
    - { nome: "Viagem", href: "/seguros/viagem" }
---
