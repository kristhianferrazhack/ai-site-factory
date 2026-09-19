import { landingPageBlueprint as blueprint } from "@/blueprints/landing-page";
import type { BlueprintContent } from "@/blueprints/types";

export const landingPageContent: BlueprintContent<typeof blueprint> = {
  navbar: {
    brand: { name: blueprint.name },
    links: [
      { label: "Benefícios", href: "#beneficios" },
      { label: "Recursos", href: "#recursos" },
      { label: "Planos", href: "#planos" },
      { label: "Perguntas", href: "#perguntas" },
    ],
    action: blueprint.cta,
  },

  inicio: {
    badge: "Gestão de prazos para advocacia",
    title: "Nenhum prazo esquecido. Nenhuma tarefa perdida.",
    description:
      "O Rito centraliza prazos, audiências e tarefas do escritório e avisa a equipe antes de cada vencimento.",
    primaryAction: blueprint.cta,
    secondaryAction: { label: "Ver recursos", href: "#recursos" },
    media: {
      kind: "card",
      title: "Agenda de hoje",
      items: [
        "09h00 · Audiência de conciliação, 2ª Vara Cível",
        "14h00 · Prazo de contestação vence amanhã",
        "16h30 · Reunião com cliente para revisão de contrato",
      ],
      footnote: "3 alertas enviados para a equipe hoje.",
    },
  },

  logos: {
    title: "Escritórios que já organizam a rotina com o Rito",
    items: ["Vértice", "Aurora", "Nexo", "Prisma", "Orbe", "Lumen"],
  },

  beneficios: {
    eyebrow: "Por que o Rito",
    title: "Menos planilhas, mais tempo para advogar",
    description:
      "Automatize o controle de prazos e dê à equipe uma visão única do que precisa ser feito.",
    items: [
      {
        title: "Prazos calculados em dias úteis",
        description:
          "Informe a data da intimação e o Rito calcula o vencimento, considerando feriados e suspensões.",
      },
      {
        title: "Alertas antes do vencimento",
        description:
          "A equipe recebe avisos por e-mail e no celular com a antecedência que você definir.",
      },
      {
        title: "Responsáveis definidos",
        description: "Cada prazo tem um responsável, e ninguém precisa perguntar quem está cuidando do quê.",
      },
      {
        title: "Histórico completo",
        description: "Toda alteração fica registrada, com data, autor e comentário.",
      },
    ],
    action: blueprint.cta,
  },

  recursos: {
    eyebrow: "Recursos",
    title: "Tudo o que o escritório precisa para cumprir prazos",
    items: [
      {
        icon: "clock",
        title: "Controle de prazos",
        description:
          "Prazos processuais e administrativos em um só lugar, com filtros por cliente e responsável.",
      },
      {
        icon: "users",
        title: "Tarefas da equipe",
        description: "Distribua tarefas, acompanhe o andamento e veja a carga de trabalho de cada pessoa.",
      },
      {
        icon: "file-text",
        title: "Modelos de documentos",
        description: "Guarde modelos de peças e contratos e reutilize com os dados do cliente.",
      },
      {
        icon: "chart",
        title: "Relatórios",
        description: "Acompanhe prazos cumpridos, tarefas em atraso e produtividade por período.",
      },
      {
        icon: "shield",
        title: "Segurança dos dados",
        description: "Criptografia, backups diários e controle de acesso por perfil.",
      },
      {
        icon: "smartphone",
        title: "Acesso pelo celular",
        description: "Consulte a agenda e conclua tarefas de qualquer lugar.",
      },
    ],
  },

  depoimentos: {
    eyebrow: "Depoimentos",
    title: "Quem usa não volta para a planilha",
    items: [
      {
        quote:
          "Antes do Rito, cada advogado tinha a própria planilha. Hoje a equipe inteira enxerga os mesmos prazos.",
        author: "Mariana C.",
        role: "Sócia de escritório trabalhista",
      },
      {
        quote:
          "Os alertas com antecedência mudaram a nossa rotina. Deixamos de trabalhar no limite do prazo.",
        author: "Ricardo T.",
        role: "Advogado cível",
      },
      {
        quote:
          "A implantação levou uma tarde. Importamos os processos e no dia seguinte já estávamos usando.",
        author: "Fernanda L.",
        role: "Gestora jurídica",
      },
    ],
  },

  planos: {
    eyebrow: "Planos",
    title: "Um plano para cada tamanho de escritório",
    description: "Todos os planos incluem alertas, relatórios e suporte por e-mail.",
    plans: [
      {
        name: "Essencial",
        price: "R$ 89",
        period: "/mês",
        description: "Para advogados autônomos e duplas.",
        features: ["Até 2 usuários", "Prazos e tarefas ilimitados", "Alertas por e-mail"],
        action: { label: "Começar agora", href: "#demonstracao" },
      },
      {
        name: "Escritório",
        price: "R$ 249",
        period: "/mês",
        description: "Para equipes que precisam de uma visão compartilhada.",
        features: [
          "Até 10 usuários",
          "Alertas por e-mail e celular",
          "Relatórios de produtividade",
          "Modelos de documentos",
        ],
        action: blueprint.cta,
        highlighted: true,
        badge: "Mais escolhido",
      },
      {
        name: "Corporativo",
        price: "Sob consulta",
        description: "Para departamentos jurídicos e grandes bancas.",
        features: ["Usuários ilimitados", "Integrações sob medida", "Gerente de conta dedicado"],
        action: { label: "Falar com vendas", href: "#demonstracao" },
      },
    ],
    note: "Assinatura mensal, sem fidelidade.",
  },

  perguntas: {
    eyebrow: "Perguntas frequentes",
    title: "Dúvidas comuns",
    items: [
      {
        question: "Preciso instalar alguma coisa?",
        answer: "Não. O Rito funciona no navegador e no celular, sem instalação.",
      },
      {
        question: "Consigo importar os processos que já tenho?",
        answer:
          "Sim. Você pode importar uma planilha com os processos e prazos em andamento, e nossa equipe ajuda na primeira importação.",
      },
      {
        question: "Os dados do escritório ficam seguros?",
        answer:
          "Os dados são criptografados, com backups diários e acesso controlado por perfil de usuário.",
      },
      {
        question: "Existe fidelidade?",
        answer: "Não. A assinatura é mensal e pode ser cancelada a qualquer momento.",
      },
    ],
  },

  demonstracao: {
    title: "Veja o Rito funcionando no seu escritório",
    description: "Deixe seu e-mail profissional e agendamos uma demonstração de 20 minutos.",
    primaryAction: blueprint.cta,
    form: {
      action: "mailto:contato@example.com",
      label: "E-mail profissional",
      placeholder: "voce@escritorio.com.br",
      submitLabel: "Solicitar demonstração",
      note: "Sem compromisso. Respondemos em até um dia útil.",
    },
  },

  rodape: {
    brand: { name: blueprint.name },
    description: "Gestão de prazos e tarefas para escritórios de advocacia.",
    columns: [
      {
        title: "Produto",
        links: [
          { label: "Benefícios", href: "#beneficios" },
          { label: "Recursos", href: "#recursos" },
          { label: "Planos", href: "#planos" },
        ],
      },
      {
        title: "Suporte",
        links: [
          { label: "Perguntas frequentes", href: "#perguntas" },
          { label: "Demonstração", href: "#demonstracao" },
        ],
      },
    ],
    legal: "Rito é um produto fictício, criado para demonstrar a AI Site Factory.",
  },
};
