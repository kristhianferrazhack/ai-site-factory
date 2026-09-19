# AI Site Factory

Infraestrutura para criar sites com inteligência artificial.

**Produção:** https://ai-site-factory-five.vercel.app

## O que é

A AI Site Factory é a base de uma fábrica de sites e landing pages para clientes. Em vez de construir cada site do zero, a fábrica combina peças reutilizáveis:

```
Briefing → Blueprint → Template → Componentes → Design System → Conteúdo → Página → QA → GitHub → Vercel
```

- O **blueprint** descreve o site: tipo, objetivo, público, oferta, tom, identidade visual e seções.
- O **template** define a identidade visual e a estrutura recomendada para um tipo de negócio.
- Os **componentes** são seções prontas, acessíveis e responsivas.
- O **conteúdo** fica separado dos componentes e é validado por tipos.
- O **Page Composer** junta tudo e monta a página.

Tudo é tipado: um blueprint inválido ou um conteúdo incompleto falha no `typecheck`, antes de chegar à produção. Essa estrutura prepara a fábrica para que, nas próximas fases, agentes de IA gerem blueprints e conteúdo a partir de um briefing.

### Status

| Fase | Entrega | Status |
| --- | --- | --- |
| 1 | Next.js, GitHub e deploy automático na Vercel | Concluída |
| 2 | Design System, seções, templates, blueprints, conteúdo e Page Composer | Concluída |

Ainda **não** há agentes, banco de dados, autenticação, CMS, dashboard ou memória.

## Stack

| Tecnologia | Uso |
| --- | --- |
| [Next.js 16](https://nextjs.org) (App Router) | Framework, rotas e build estático |
| React 19 | Componentes (Server Components por padrão) |
| TypeScript | Tipos do conteúdo, dos blueprints e dos templates |
| Tailwind CSS 4 | Estilos gerados a partir dos tokens do Design System |
| ESLint | Qualidade de código |
| GitHub + Vercel | Versionamento, previews e deploy |

Dependências de runtime: apenas `next`, `react` e `react-dom`. Ícones, formulários e temas são feitos com o próprio código do projeto.

## Como executar

Pré-requisito: Node.js 20.9 ou superior.

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

| Rota | Conteúdo |
| --- | --- |
| `/` | Página da fábrica (demonstração da arquitetura) |
| `/sites/landing-page` | Landing page gerada pelo blueprint `landing-page` |
| `/sites/law-firm` | Site de escritório de advocacia gerado pelo blueprint `law-firm` |
| `/sites/service` | Site de prestador de serviços gerado pelo blueprint `service` |

Os sites de exemplo usam conteúdo fictício, exibem um aviso de demonstração e não são indexados por buscadores.

## Scripts, testes e build

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run lint` | ESLint |
| `npm run typecheck` | Gera os tipos das rotas e roda o TypeScript |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build de produção |
| `npm run check` | **QA completo:** lint, typecheck e build, em sequência |

**Como testar:** rode `npm run check`. Ele valida três camadas:

1. **Lint:** padrões de código e regras do Next.js.
2. **Typecheck:** blueprints, templates e conteúdo contra os schemas. Variante inexistente, seção sem conteúdo ou campo com formato errado são erros de compilação.
3. **Build:** renderiza a home e todos os sites de exemplo. Um erro de composição quebra o build.

Depois, confira visualmente as rotas acima em larguras de celular (390 px), tablet (768 px) e desktop (1440 px), nos temas claro e escuro do sistema. Ainda não há testes automatizados de interface.

## Arquitetura

Cada etapa da fábrica tem uma pasta:

| Etapa | Pasta | Papel |
| --- | --- | --- |
| Blueprint | `blueprints/` | Especificação de cada site |
| Template | `templates/` | Tema, variantes preferidas, estrutura e diretrizes por tipo de negócio |
| Componentes | `components/ui`, `components/sections` | Blocos básicos e seções de página |
| Design System | `design-system/` | Tokens, temas e fontes |
| Conteúdo | `content/` | Schemas, conteúdo dos exemplos e da home |
| Página | `composer/`, `app/` | Page Composer e rotas |

```
app/
  layout.tsx              Layout raiz: fontes, SEO padrão, viewport
  page.tsx                Home: <PageComposer page={homePage} />
  sites/[slug]/           Sites de exemplo gerados a partir de blueprints
  globals.css             Importa Tailwind e os tokens
blueprints/
  types.ts                Blueprint, SectionPlan, defineBlueprint, BlueprintContent
  landing-page.ts  law-firm.ts  service.ts
templates/
  types.ts                Template, SiteType, defineTemplate
  index.ts                Registro de templates
  landing-page/  law-firm/  services/  corporate/  saas/  agency/  consulting/
components/
  ui/                     Blocos básicos do Design System
  sections/               Seções por tipo (hero/, navbar/, faq/...) e registry.ts
design-system/
  tokens.css              Todos os tokens visuais
  theme.ts                Tipo Theme e conversão de tema em variáveis CSS
  theme-scope.tsx         Aplica um tema a uma área da página
  fonts.ts                Fontes (Geist, Geist Mono, Playfair Display)
content/
  schemas/                Tipos do conteúdo de cada seção
  examples/               Conteúdo dos blueprints de exemplo
  home.ts                 Página da fábrica
composer/
  types.ts                SectionBlock e PageDefinition
  page-composer.tsx       Renderiza uma PageDefinition
  compose-site.ts         Blueprint + template + conteúdo → PageDefinition
lib/                      Utilitários (cn) e configuração do site da fábrica
public/brand/             Logo da fábrica
```

## Design System

Todos os tokens ficam em [`design-system/tokens.css`](design-system/tokens.css):

| Grupo | Tokens | Utilitários gerados |
| --- | --- | --- |
| Cores | `background`, `foreground`, `surface`, `muted`, `muted-foreground`, `border`, `input`, `primary`, `primary-foreground`, `accent`, `success`, `ring` | `bg-surface`, `text-muted-foreground`, `border-border`... |
| Tipografia | `font-sans`, `font-serif`, `font-mono`, `font-heading` | `font-heading`... A escala fica em `Heading` e `Text` |
| Espaçamento | `section`, `section-lg` | `py-section sm:py-section-lg` |
| Raio | `control`, `field`, `card`, `panel` | `rounded-card`... |
| Sombras | `card`, `elevated` | `shadow-card`, `shadow-elevated` |
| Containers | `content`, `text`, `media` | `max-w-content`... |
| Breakpoints | `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536 | `sm:`, `md:`... |

**Cores em duas camadas.** A paleta (`--light-*` e `--dark-*`) guarda os valores de cada esquema. Os tokens semânticos (`--color-*`) apontam para a paleta clara ou escura conforme o esquema do elemento:

- `scheme-system` segue o sistema do visitante (padrão);
- `scheme-light` força o claro;
- `scheme-dark` força o escuro, inclusive dentro de uma página clara.

É isso que permite uma seção escura, como um hero escuro, em qualquer site.

**Temas.** Um `Theme` (em [`design-system/theme.ts`](design-system/theme.ts)) sobrescreve cores, raios, a fonte dos títulos e o esquema. O `ThemeScope` aplica o tema a uma página. Templates definem um tema base e blueprints podem ajustar a marca por cima:

```ts
theme: {
  scheme: "light",
  headingFont: "serif",
  colors: { primary: { light: "#14233c", dark: "#d4b483" }, accent: "#8a6630" },
  radius: { card: "0.375rem" },
}
```

## Componentes

**Blocos básicos (`components/ui`)**

| Componente | Uso |
| --- | --- |
| `Button`, `ButtonLink` | Botões e links com aparência de botão (`primary`, `secondary`) |
| `Actions` | Par de CTAs (principal e secundário) |
| `Badge` | Rótulos (`outline`, `accent`) |
| `Card` | Superfície com borda (`default`, `elevated`, `accent`) |
| `Container`, `Section` | Largura máxima, margens e ritmo vertical. `Section` aceita `surface` |
| `Heading`, `Text`, `SectionHeading` | Tipografia |
| `Input`, `Textarea` | Campos com label obrigatória e dica opcional |
| `Icon` | Ícones SVG internos, referenciados por nome no conteúdo |
| `Brand` | Nome do site com logo opcional |
| `CodeWindow`, `Terminal` | Janelas de código e terminal |

**Seções (`components/sections`)**

Cada tipo de seção tem um schema de conteúdo. Todas as variantes de um tipo recebem o mesmo conteúdo, então trocar de variante não exige reescrever texto.

| Tipo | Variantes | Schema |
| --- | --- | --- |
| `navbar` | `minimal`, `transparent` | `NavbarContent` |
| `hero` | `centered`, `split` | `HeroContent` (mídia: imagem, terminal ou card) |
| `features` | `grid` | `FeaturesContent` |
| `benefits` | `split` | `BenefitsContent` |
| `stats` | `band` | `StatsContent` |
| `logos` | `cloud` | `LogosContent` |
| `testimonials` | `grid` | `TestimonialsContent` |
| `pricing` | `tiers` | `PricingContent` |
| `faq` | `accordion` | `FaqContent` |
| `timeline` | `steps`, `flow` | `TimelineContent` |
| `contact` | `split` | `ContactContent` |
| `cta` | `simple`, `highlight`, `form` | `CtaContent` |
| `footer` | `columns` | `FooterContent` |
| `code` | `split` | `CodeContent` |

Qualquer seção aceita `surface`: `default`, `muted` ou `dark`. Um "hero escuro" é `{ type: "hero", surface: "dark" }`, sem precisar de outro componente.

Todas as seções são Server Components. A única parte com JavaScript no cliente é o menu móvel da navbar. O FAQ usa `<details>` nativo.

## Templates

| Template | Status | Identidade |
| --- | --- | --- |
| `landing-page` | Pronto, com exemplo | Tokens padrão, hero centralizado, CTA com formulário |
| `law-firm` | Pronto, com exemplo | Azul-marinho e dourado, títulos em serifa, hero escuro, diretrizes da OAB |
| `services` | Pronto, com exemplo | Azul, hero dividido, CTA em destaque |
| `corporate` | Estrutura | Azul corporativo |
| `saas` | Estrutura | Violeta, fluxo conectado, planos |
| `agency` | Estrutura | Esquema escuro, laranja |
| `consulting` | Estrutura | Verde, títulos em serifa |

Um template define:
- `theme`: identidade visual;
- `variants`: variante preferida por tipo de seção;
- `sections`: estrutura recomendada, com o propósito de cada seção;
- `guidelines`: regras de conteúdo. Por exemplo, o `law-firm` segue o Provimento 205/2021 da OAB: sem promessa de resultado, preços ou divulgação de clientes.

## Blueprints

Um blueprint é a especificação do site antes da construção:

```ts
export const lawFirmBlueprint = defineBlueprint({
  id: "law-firm",
  name: "Vieira Montenegro Advocacia",
  type: "law-firm",
  template: "law-firm",
  goal: "scheduling",
  audience: "Empresas e famílias que buscam orientação jurídica...",
  offer: "Assessoria jurídica em direito empresarial...",
  cta: { label: "Agendar atendimento", href: "#contato" },
  tone: ["sóbrio", "claro", "confiável"],
  // brand: { colors: { accent: "#0f766e" } },  ← ajustes de marca sobre o tema do template (opcional)
  seo: { title: "...", description: "..." },
  sections: [
    { id: "inicio", type: "hero", variant: "split", surface: "dark", purpose: "..." },
    { id: "areas", type: "features", surface: "muted" },
    { id: "contato", type: "contact" },
  ],
});
```

A ordem de `sections` é a ordem da página. O `id` de cada seção é a âncora do link (`#contato`) e a chave do seu conteúdo. Se `variant` for omitida, vale a variante preferida do template e, depois, o padrão do registry.

## Conteúdo

- `content/schemas/`: os tipos de conteúdo de cada seção (`HeroContent`, `FaqContent`...). É o contrato entre conteúdo e componentes.
- `content/examples/`: o conteúdo de cada blueprint, tipado com `BlueprintContent<typeof blueprint>`. O TypeScript exige uma entrada para cada seção do plano, no formato do seu tipo.
- `content/home.ts`: a página da fábrica, montada diretamente como `PageDefinition`.

Para mudar headlines, textos, benefícios, FAQs, CTAs ou depoimentos, edite só o arquivo de conteúdo. Nenhum componente precisa mudar.

## Page Composer

```
Blueprint ─┐
Template ──┼─ composeSite() ─→ PageDefinition ─→ <PageComposer /> ─→ Página
Conteúdo ──┘
```

1. `composeSite(blueprint, content)` resolve o template, junta o tema do template com a marca do blueprint e transforma cada seção do plano em um bloco `{ type, variant, id, surface, content }`.
2. `<PageComposer page={...} />` aplica o tema com `ThemeScope`, busca o componente de cada bloco no registry (`components/sections/registry.ts`) e renderiza. A navbar fica antes do `<main>` e o rodapé depois, para manter os landmarks corretos.

Também é possível montar uma página diretamente, como na home:

```ts
const page: PageDefinition = {
  sections: [
    { type: "hero", variant: "centered", content: { title: "...", description: "..." } },
    { type: "faq", content: { title: "Dúvidas", items: [{ question: "...", answer: "..." }] } },
  ],
};
```

## Como criar

### Um novo componente de seção

1. **Schema:** adicione o tipo de conteúdo em `content/schemas/sections.ts` e registre-o em `SectionContentMap`.
2. **Componente:** crie `components/sections/<tipo>/<tipo>-<variante>.tsx`. Ele recebe `SectionProps<SeuConteudo>` (`id`, `surface`, `content`) e usa `Section`, `SectionHeading` e os utilitários do Design System.
3. **Registro:** adicione a entrada em `components/sections/registry.ts` com `name`, `description`, `icon`, `variants` e `defaultVariant`.
4. **QA:** rode `npm run check`. A seção aparece automaticamente no catálogo da home.

Para uma **nova variante** de uma seção existente, crie o componente com o mesmo schema e adicione-o em `variants` no registry. Não crie um novo tipo.

### Um novo template

1. Crie `templates/<id>/index.ts` com `defineTemplate({ id, name, description, status, icon, theme, variants, sections, guidelines })`.
2. Se for um novo tipo de site, adicione o id em `SiteType` (`templates/types.ts`).
3. Registre-o em `templates/index.ts`. O registro é tipado e exige todos os ids.
4. Ele aparece na galeria da home. Para ter um site de exemplo, crie um blueprint que use o template.

### Um novo blueprint

1. Crie `blueprints/<id>.ts` com `defineBlueprint({...})`.
2. Crie `content/examples/<id>.ts` com o conteúdo, tipado com `BlueprintContent<typeof seuBlueprint>`.
3. Registre-o em `content/examples/index.ts` com `composeSite(blueprint, conteudo)`.
4. Rode `npm run check`. O site fica disponível em `/sites/<id>`.

## Deploy

O repositório está conectado à Vercel (projeto `ai-site-factory`). Cada push na `main` gera um deploy de produção, e cada outra branch ou pull request gera um preview. As URLs de preview são protegidas pelo login da Vercel; apenas o domínio de produção é público.

## Próximos passos planejados

- **Agentes:** gerar blueprints a partir de briefings e conteúdo a partir de blueprints, usando os schemas e as diretrizes dos templates.
- **Validação em runtime:** validar blueprints e conteúdo recebidos como JSON, e não apenas como TypeScript.
- **Biblioteca:** novas seções (equipe, galeria, blog) e novas variantes; exemplos para os templates em preparação.
- **Mídia:** imagens e logos de clientes nas seções.
- **Formulários:** envio real (hoje os exemplos usam `mailto:`).
- **Testes automatizados:** regressão visual e acessibilidade.
- **Dashboard, memória e automações.**
