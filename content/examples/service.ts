import { serviceBlueprint as blueprint } from "@/blueprints/service";
import type { BlueprintContent } from "@/blueprints/types";

export const serviceContent: BlueprintContent<typeof blueprint> = {
  navbar: {
    brand: { name: blueprint.name },
    links: [
      { label: "Serviços", href: "#servicos" },
      { label: "Vantagens", href: "#vantagens" },
      { label: "Depoimentos", href: "#depoimentos" },
      { label: "Dúvidas", href: "#duvidas" },
    ],
    action: blueprint.cta,
  },

  inicio: {
    badge: "Atendimento em até 48 horas",
    title: "Ar-condicionado instalado e funcionando, sem dor de cabeça",
    description:
      "Instalação, manutenção e higienização para casas e pequenos comércios da Zona Norte de São Paulo, com técnicos certificados e garantia em todos os serviços.",
    primaryAction: blueprint.cta,
    secondaryAction: { label: "Ver serviços", href: "#servicos" },
    media: {
      kind: "card",
      title: "Como pedir seu orçamento",
      items: [
        "Conte o que precisa pelo formulário",
        "Receba o orçamento no mesmo dia",
        "Agende a visita no melhor horário",
      ],
      footnote: "Visita técnica sem custo para orçamentos na Zona Norte.",
    },
  },

  numeros: {
    items: [
      { value: "12 anos", label: "de experiência" },
      { value: "4.800+", label: "equipamentos instalados" },
      { value: "48 h", label: "prazo médio de atendimento" },
      { value: "12 meses", label: "de garantia nos serviços" },
    ],
  },

  servicos: {
    eyebrow: "Serviços",
    title: "Do projeto à manutenção",
    description: "Atendemos todas as marcas de aparelhos split, janela e piso-teto.",
    items: [
      {
        icon: "wind",
        title: "Instalação",
        description: "Instalação completa, com suporte, tubulação e teste de funcionamento.",
      },
      {
        icon: "shield",
        title: "Manutenção preventiva",
        description: "Revisões periódicas que evitam defeitos e reduzem o consumo de energia.",
      },
      {
        icon: "sparkles",
        title: "Higienização",
        description: "Limpeza de filtros, serpentinas e bandejas para um ar mais saudável.",
      },
      {
        icon: "zap",
        title: "Conserto",
        description: "Diagnóstico e reparo de vazamentos, falhas elétricas e ruídos.",
      },
      {
        icon: "briefcase",
        title: "Contratos para empresas",
        description: "Planos de manutenção com visitas programadas para comércios e escritórios.",
      },
      {
        icon: "layout",
        title: "Projeto e dimensionamento",
        description: "Indicamos a potência certa para cada ambiente antes da compra.",
      },
    ],
  },

  vantagens: {
    eyebrow: "Por que a Clima Norte",
    title: "Serviço bem feito já na primeira visita",
    description:
      "Trabalhamos com hora marcada, material de qualidade e explicação clara do que foi feito.",
    items: [
      {
        title: "Técnicos certificados",
        description: "Equipe treinada e certificada para trabalhar com gás refrigerante.",
      },
      {
        title: "Orçamento transparente",
        description: "Você aprova o valor antes do início, sem cobranças surpresa.",
      },
      {
        title: "Garantia por escrito",
        description: "Todos os serviços têm garantia de 12 meses, registrada na nota.",
      },
      {
        title: "Pontualidade",
        description: "Chegamos no horário combinado e avisamos em caso de qualquer imprevisto.",
      },
    ],
    action: blueprint.cta,
  },

  depoimentos: {
    eyebrow: "Depoimentos",
    title: "Clientes da região recomendam",
    items: [
      {
        quote:
          "Instalaram dois aparelhos no mesmo dia, deixaram tudo limpo e explicaram como fazer a manutenção.",
        author: "Carla M.",
        role: "Moradora de Santana",
      },
      {
        quote:
          "Temos contrato de manutenção para a padaria há três anos. Nunca mais ficamos sem ar no verão.",
        author: "Roberto A.",
        role: "Dono de padaria no Tucuruvi",
      },
      {
        quote:
          "Orçamento rápido e preço justo. O técnico chegou no horário e resolveu o vazamento na hora.",
        author: "Juliana P.",
        role: "Moradora da Vila Guilherme",
      },
    ],
  },

  chamada: {
    title: "Precisa de um técnico ainda esta semana?",
    description: "Peça seu orçamento agora e receba a resposta no mesmo dia.",
    primaryAction: blueprint.cta,
    secondaryAction: { label: "Ver dúvidas frequentes", href: "#duvidas" },
  },

  duvidas: {
    eyebrow: "Dúvidas frequentes",
    title: "Antes de pedir seu orçamento",
    items: [
      {
        question: "Qual é o prazo para a instalação?",
        answer: "Na maioria dos casos, instalamos em até 48 horas após a aprovação do orçamento.",
      },
      {
        question: "Quais bairros vocês atendem?",
        answer:
          "Atendemos toda a Zona Norte de São Paulo e bairros próximos. Para outras regiões, consulte pelo formulário.",
      },
      {
        question: "Com que frequência devo fazer manutenção?",
        answer:
          "Para uso residencial, recomendamos a cada seis meses. Em comércios com uso intenso, a cada três meses.",
      },
      {
        question: "Como funciona a garantia?",
        answer:
          "Todos os serviços têm 12 meses de garantia. Se algo relacionado ao serviço apresentar problema, voltamos sem custo.",
      },
    ],
  },

  orcamento: {
    eyebrow: "Orçamento",
    title: "Peça seu orçamento",
    description:
      "Conte o que precisa e onde será o atendimento. Respondemos no mesmo dia útil.",
    details: [
      {
        icon: "smartphone",
        label: "Telefone e WhatsApp",
        value: "(11) 0000-0000",
        href: "tel:+551100000000",
      },
      { icon: "mail", label: "E-mail", value: "contato@example.com", href: "mailto:contato@example.com" },
      { icon: "map-pin", label: "Área de atendimento", value: "Zona Norte de São Paulo e região" },
      { icon: "clock", label: "Horário", value: "Segunda a sábado, das 8h às 18h" },
    ],
    form: {
      action: "mailto:contato@example.com",
      submitLabel: "Pedir orçamento",
      note: "Respondemos no mesmo dia útil.",
      labels: { message: "O que você precisa?" },
    },
  },

  rodape: {
    brand: { name: blueprint.name },
    description:
      "Instalação, manutenção e higienização de ar-condicionado na Zona Norte de São Paulo.",
    columns: [
      {
        title: "Empresa",
        links: [
          { label: "Serviços", href: "#servicos" },
          { label: "Vantagens", href: "#vantagens" },
          { label: "Depoimentos", href: "#depoimentos" },
        ],
      },
      {
        title: "Atendimento",
        links: [
          { label: "Dúvidas frequentes", href: "#duvidas" },
          { label: "Pedir orçamento", href: "#orcamento" },
        ],
      },
    ],
    legal: "Clima Norte é uma empresa fictícia, criada para demonstrar a AI Site Factory.",
  },
};
