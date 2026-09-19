# AI Site Factory

Infraestrutura para criar, versionar e publicar sites com inteligência artificial.

## Objetivo

A AI Site Factory é a base de uma fábrica de sites e landing pages para clientes. O objetivo é criar sites rapidamente a partir de componentes e templates reutilizáveis, com agentes de IA capazes de criar e modificar os sites no futuro.

Princípios:

- **GitHub é a fonte de verdade** do código. Nada importante vive só no computador local.
- **Vercel faz o deploy**: cada push na `main` publica em produção e cada branch ou PR gera um preview.
- **Componentes e conteúdo separados**: as seções são genéricas e recebem o conteúdo por props, então um novo site troca o conteúdo sem reescrever componentes.

### Fase atual: Fase 1

Provar o fluxo completo:

```
Claude Code → Next.js → Git → GitHub → Vercel → site no ar
```

Nesta fase **não** há agentes, banco de dados, memória, autenticação, CMS ou dashboard.

## Stack

| Tecnologia | Uso |
| --- | --- |
| [Next.js 16](https://nextjs.org) (App Router) | Framework e build |
| TypeScript | Tipagem estática |
| Tailwind CSS 4 | Estilização e design tokens |
| ESLint | Qualidade de código |
| GitHub | Versionamento |
| Vercel | Deploy e previews |

Dependências de runtime: apenas `next`, `react` e `react-dom`.

## Como executar localmente

Pré-requisito: Node.js 20.9 ou superior.

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build de produção (rode `build` antes) |
| `npm run lint` | ESLint |
| `npm run typecheck` | Verificação de tipos do TypeScript |

## Build de produção

```bash
npm run build
npm run start
```

A página inicial é gerada como conteúdo estático no build.

## Arquitetura

```
app/
  layout.tsx        Layout raiz: fontes, metadata (SEO) e viewport
  page.tsx          Landing page: compõe as seções com o conteúdo
  globals.css       Tailwind e design tokens (tema claro/escuro)
  icon.svg          Favicon
components/
  ui/               Blocos básicos reutilizáveis (Button, Card, Container, Section...)
  sections/         Seções de página (Hero, HowItWorks, TechStack, ProductionFlow, Cta...)
content/
  home.ts           Textos e dados da landing page
lib/
  site-config.ts    Nome, SEO padrão, navegação e links do site
  types.ts          Tipos compartilhados
  cn.ts             Utilitário para combinar classes CSS
public/             Arquivos estáticos
```

Convenções:

- **Design tokens**: as cores são variáveis CSS em `app/globals.css` (`background`, `foreground`, `muted`, `accent`...). Os componentes usam só esses nomes semânticos, então o tema de um cliente muda em um único lugar. O tema escuro segue a preferência do sistema.
- **`components/ui`**: peças pequenas e genéricas, sem texto fixo.
- **`components/sections`**: seções completas que recebem conteúdo por props. Header e footer ficam na página, e não no layout raiz, para que áreas futuras (como um dashboard) tenham layout próprio.
- **`content/`**: todo o texto da página. Para criar um novo site, o ponto de partida é trocar este conteúdo.
- **Server Components** por padrão. Nenhum JavaScript de cliente é necessário nesta fase.

## Deploy

O repositório está conectado à Vercel. Cada push na branch `main` gera um deploy de produção, e cada outra branch ou pull request gera um preview.

## Próximos passos planejados

- **Templates**: extrair a landing page em templates reutilizáveis por tipo de negócio.
- **Biblioteca de componentes**: ampliar as seções (depoimentos, preços, FAQ, formulário de contato).
- **Temas por cliente**: tokens de design configuráveis por projeto.
- **Agentes especializados**: agentes de IA para criar e modificar sites a partir de briefings.
- **Memória**: contexto persistente de clientes e projetos.
- **Dashboard**: painel para acompanhar projetos, previews e deploys.
- **Automações**: fluxos de criação, revisão e publicação.
