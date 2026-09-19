import { lawFirmBlueprint as blueprint } from "@/blueprints/law-firm";
import type { BlueprintContent } from "@/blueprints/types";

export const lawFirmContent: BlueprintContent<typeof blueprint> = {
  navbar: {
    brand: { name: "Vieira Montenegro" },
    links: [
      { label: "O escritório", href: "#escritorio" },
      { label: "Áreas de atuação", href: "#areas" },
      { label: "Como atuamos", href: "#atuacao" },
      { label: "Dúvidas", href: "#duvidas" },
    ],
    action: blueprint.cta,
  },

  inicio: {
    badge: "Advocacia empresarial e de família",
    title: "Orientação jurídica clara para decisões seguras",
    description:
      "Atuamos de forma preventiva e contenciosa, com atendimento próximo e comunicação objetiva em cada etapa do seu caso.",
    primaryAction: blueprint.cta,
    secondaryAction: { label: "Conhecer as áreas", href: "#areas" },
    media: {
      kind: "card",
      title: "Áreas de atuação",
      items: [
        "Direito empresarial e contratos",
        "Direito trabalhista",
        "Família e sucessões",
        "Direito imobiliário",
      ],
      footnote: "Atendimento presencial em São Paulo e on-line para todo o Brasil.",
    },
  },

  escritorio: {
    eyebrow: "O escritório",
    title: "Atuação técnica, com proximidade",
    description:
      "Fundado em 2008, o escritório reúne advogados com experiência em demandas de empresas e famílias. Cada cliente sabe quem cuida do seu caso e o que esperar de cada etapa.",
    items: [
      {
        title: "Advogado responsável",
        description: "Cada caso é acompanhado por um advogado do primeiro contato ao encerramento.",
      },
      {
        title: "Comunicação transparente",
        description: "Atualizações periódicas, em linguagem clara e sem juridiquês.",
      },
      {
        title: "Atuação preventiva",
        description:
          "Revisamos contratos e rotinas para reduzir riscos antes que se tornem litígios.",
      },
      {
        title: "Sigilo e ética",
        description: "Conduta pautada pelo Código de Ética e Disciplina da OAB.",
      },
    ],
    action: blueprint.cta,
  },

  areas: {
    eyebrow: "Áreas de atuação",
    title: "Assessoria para empresas e famílias",
    description: "Atuação consultiva e contenciosa nas seguintes áreas.",
    items: [
      {
        icon: "briefcase",
        title: "Direito empresarial",
        description:
          "Constituição de empresas, acordos societários, reestruturações e assessoria jurídica contínua.",
      },
      {
        icon: "users",
        title: "Direito trabalhista",
        description:
          "Consultoria preventiva para empregadores e atuação em reclamações trabalhistas.",
      },
      {
        icon: "heart",
        title: "Família e sucessões",
        description: "Divórcios, guarda, pensão, inventários e planejamento sucessório.",
      },
      {
        icon: "home",
        title: "Direito imobiliário",
        description: "Compra e venda, locação, regularização de imóveis e questões condominiais.",
      },
      {
        icon: "file-text",
        title: "Contratos",
        description: "Elaboração, revisão e negociação de contratos civis e empresariais.",
      },
      {
        icon: "scale",
        title: "Contencioso cível",
        description: "Atuação em ações judiciais cíveis, da estratégia ao acompanhamento.",
      },
    ],
  },

  atuacao: {
    eyebrow: "Como atuamos",
    title: "Um processo claro, do primeiro contato à solução",
    items: [
      {
        title: "Primeiro atendimento",
        description: "Ouvimos sua situação e indicamos os documentos necessários para a análise.",
      },
      {
        title: "Análise do caso",
        description: "Avaliamos riscos, prazos e caminhos possíveis com base na documentação.",
      },
      {
        title: "Proposta de atuação",
        description:
          "Apresentamos a estratégia e os honorários por escrito, antes de qualquer providência.",
      },
      {
        title: "Acompanhamento",
        description: "Você recebe atualizações periódicas até a conclusão do caso.",
      },
    ],
  },

  duvidas: {
    eyebrow: "Dúvidas frequentes",
    title: "Antes de agendar",
    items: [
      {
        question: "Como funciona o primeiro atendimento?",
        answer:
          "É uma conversa para entender sua situação e verificar como podemos ajudar. Ao final, explicamos os próximos passos e os documentos necessários.",
      },
      {
        question: "O atendimento pode ser on-line?",
        answer:
          "Sim. Atendemos por videochamada clientes de qualquer cidade, e presencialmente no escritório em São Paulo.",
      },
      {
        question: "Como são definidos os honorários?",
        answer:
          "Os honorários são definidos após a análise do caso, considerando a sua complexidade e a tabela de referência da OAB, e formalizados em contrato.",
      },
      {
        question: "Quais documentos devo levar?",
        answer:
          "Depende do caso. Ao agendar, enviamos a lista de documentos para que o primeiro atendimento seja produtivo.",
      },
    ],
  },

  contato: {
    eyebrow: "Contato",
    title: "Agende um atendimento",
    description:
      "Conte brevemente sua situação. Retornamos em até um dia útil para agendar a conversa.",
    details: [
      { icon: "map-pin", label: "Endereço", value: "Av. Exemplo, 1000, conj. 101, São Paulo, SP" },
      { icon: "smartphone", label: "Telefone", value: "(11) 0000-0000", href: "tel:+551100000000" },
      { icon: "mail", label: "E-mail", value: "contato@example.com", href: "mailto:contato@example.com" },
      { icon: "clock", label: "Horário", value: "Segunda a sexta, das 9h às 18h" },
    ],
    form: {
      action: "mailto:contato@example.com",
      submitLabel: "Enviar mensagem",
      note: "As informações enviadas são tratadas com sigilo e usadas apenas para retornar o seu contato.",
      labels: { message: "Conte brevemente sua situação" },
    },
  },

  rodape: {
    brand: { name: blueprint.name },
    description: "Advocacia empresarial, trabalhista, de família e imobiliária em São Paulo.",
    columns: [
      {
        title: "Escritório",
        links: [
          { label: "O escritório", href: "#escritorio" },
          { label: "Áreas de atuação", href: "#areas" },
          { label: "Como atuamos", href: "#atuacao" },
        ],
      },
      {
        title: "Atendimento",
        links: [
          { label: "Dúvidas frequentes", href: "#duvidas" },
          { label: "Agendar atendimento", href: "#contato" },
        ],
      },
    ],
    legal:
      "Vieira Montenegro Advocacia é um escritório fictício, criado para demonstrar a AI Site Factory.",
  },
};
