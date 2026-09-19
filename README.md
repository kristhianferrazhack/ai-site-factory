# AI Site Factory

Infraestrutura para criar sites com inteligência artificial.

**Produção:** https://ai-site-factory-five.vercel.app

## O que é

A AI Site Factory é a base de uma fábrica de sites e landing pages para clientes. Em vez de construir cada site do zero, ela recebe uma especificação estruturada, valida essa especificação e monta o site com peças reutilizáveis:

```
IA → SiteSpec → Validação → Blueprint → Template → Page Composer → Site → QA → GitHub → Vercel
```

- O **SiteSpec** é um JSON que descreve o site por inteiro: estratégia, template, marca, SEO, CTA, seções e conteúdo.
- A **validação** aceita ou rejeita o SiteSpec, com erros claros por caminho.
- O **blueprint** é a estrutura que a fábrica executa, derivada de um SiteSpec válido.
- O **template** define a identidade visual e as variantes preferidas para um tipo de negócio.
- O **Page Composer** monta a página com as seções do catálogo.

O princípio central: **a IA pensa, a fábrica executa.** A especificação diz o que o site deve ser; a fábrica decide como construí-lo.

### Status

| Fase | Entrega | Status |
| --- | --- | --- |
| 1 | Next.js, GitHub e deploy automático na Vercel | Concluída |
| 2 | Design System, seções, templates, blueprints, conteúdo e Page Composer | Concluída |
| 2.5 | Contrato SiteSpec, validação em runtime, testes e fronteiras da fábrica | Concluída |

Ainda **não** há agentes, banco de dados, autenticação, CMS, dashboard ou memória.

## Stack

| Tecnologia | Uso |
| --- | --- |
| [Next.js 16](https://nextjs.org) (App Router) | Framework, rotas e build estático |
| React 19 | Componentes (Server Components por padrão) |
| TypeScript | Tipos inferidos dos schemas de validação |
| Tailwind CSS 4 | Estilos gerados a partir dos tokens do Design System |
| ESLint | Qualidade de código |
| `node:test` | Testes, com o suporte nativo do Node a TypeScript |
| GitHub + Vercel | Versionamento, previews e deploy |

Dependências de runtime: apenas `next`, `react` e `react-dom`. A validação (`lib/schema.ts`), os ícones, os formulários, os temas e o executor de testes são feitos com o próprio código do projeto e com recursos nativos do Node.

## Como executar

Pré-requisito: Node.js 20.9 ou superior (os testes precisam do Node 22.18+, com suporte nativo a TypeScript).

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

| Rota | Conteúdo |
| --- | --- |
| `/` | Página da fábrica (demonstração da arquitetura) |
| `/sites/landing-page` | Gerado a partir de `examples/site-specs/landing-page.json` |
| `/sites/law-firm` | Gerado a partir de `examples/site-specs/law-firm.json` |
| `/sites/service` | Gerado a partir de `examples/site-specs/service.json` |

Os sites de exemplo usam conteúdo fictício, exibem um aviso de demonstração e não são indexados por buscadores.

## Scripts, testes e build

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run lint` | ESLint |
| `npm run typecheck` | Gera os tipos das rotas e roda o TypeScript |
| `npm test` | Testes do contrato e do pipeline (`tests/unit`) |
| `npm run build` | Build de produção |
| `npm run test:rendered` | Confere o HTML gerado pelo build (`tests/rendered`) |
| `npm run start` | Serve o build de produção |
| `npm run check` | **QA completo:** lint, typecheck, testes, build e testes do HTML |

**O que os testes cobrem:**

- **Contrato (`tests/unit/site-spec.test.ts`):**
  - os três SiteSpecs de exemplo e o SiteSpec mínimo são aceitos;
  - dezenas de variações inválidas são rejeitadas com o caminho e o código de erro corretos: template, seção ou variante inexistente, campo obrigatório ausente, tipo errado, SEO e tema inválidos, SiteSpec incompleto, campos desconhecidos, links inseguros, HTML em texto, ids duplicados, hero ausente, links internos quebrados.
- **Pipeline (`tests/unit/pipeline.test.ts`):**
  - cada exemplo passa por validação → blueprint → resolução de template → página;
  - a fábrica falha explicitamente com template, seção ou variante inexistente;
  - templates e a home seguem as mesmas regras.
- **Ponta a ponta (`tests/rendered/`):** cada SiteSpec virou uma página estática com o título de SEO, um único `h1` e todas as seções.

Depois, confira visualmente as rotas em larguras de celular (390 px), tablet (768 px) e desktop (1440 px), nos temas claro e escuro.

## SiteSpec

### O que é e por que existe

O SiteSpec é o **contrato entre uma IA (ou uma pessoa) e a fábrica**: um único documento JSON com a intenção completa de um site. Existe para que dados gerados por IA entrem na fábrica de forma **segura, validada e previsível**:

- a IA não escreve código nem estruturas arbitrárias, apenas preenche um formato conhecido;
- a fábrica valida tudo antes de construir qualquer coisa;
- um SiteSpec rejeitado vem com uma lista de erros que a própria IA consegue corrigir.

### SiteSpec × Blueprint

| | SiteSpec | Blueprint |
| --- | --- | --- |
| Papel | Intenção completa do site (entrada da fábrica) | Estrutura que a fábrica executa |
| Conteúdo | Inclui o conteúdo de cada seção | Sem conteúdo (o conteúdo fica num mapa por id de seção) |
| Origem | Escrito por uma IA ou pessoa | Derivado de um SiteSpec válido (`blueprintFromSiteSpec`) |
| Confiança | Não confiável até ser validado | Sempre válido |
| Versão | Campo `version` (contrato versionado) | Interno, sem versão |

Não há duplicação: o SiteSpec é formado pelos **campos do blueprint** (`blueprintShape`) mais, em cada seção, o **schema de conteúdo do seu tipo**. Blueprint, SiteSpec, tema e conteúdo são validados em runtime pelos mesmos schemas que geram os tipos TypeScript.

### Exemplo simples

O menor SiteSpec válido ([`examples/site-specs/minimal.json`](examples/site-specs/minimal.json)):

```json
{
  "version": 1,
  "id": "exemplo-minimo",
  "name": "Exemplo Mínimo",
  "type": "landing-page",
  "template": "landing-page",
  "goal": "lead-generation",
  "audience": "Pequenas empresas que querem um site simples",
  "offer": "Um site de uma página, pronto em poucos dias",
  "cta": { "label": "Fale conosco", "href": "#inicio" },
  "tone": ["direto"],
  "seo": {
    "title": "Exemplo Mínimo | Site de uma página",
    "description": "O menor SiteSpec válido: os campos obrigatórios e uma única seção hero."
  },
  "sections": [
    {
      "id": "inicio",
      "type": "hero",
      "content": {
        "title": "Seu site pronto em poucos dias",
        "description": "Uma página clara, rápida e responsiva para apresentar o seu negócio."
      }
    }
  ]
}
```

Exemplos completos: `landing-page.json`, `law-firm.json` e `service.json`, na mesma pasta.

### Campos

| Campo | Descrição |
| --- | --- |
| `version` | Versão do contrato (hoje, `1`) |
| `id` | Identificador do site: letras minúsculas, números e hífens |
| `name` | Nome do negócio ou produto |
| `type` | Tipo de site: `landing-page`, `law-firm`, `services`, `corporate`, `saas`, `agency`, `consulting` |
| `template` | Template usado (mesmos ids) |
| `goal` | `lead-generation`, `sales`, `scheduling` ou `institutional` |
| `audience`, `offer` | Público e oferta |
| `cta` | CTA principal (`label`, `href`) |
| `tone` | Tom de comunicação (1 a 6 termos) |
| `brand` | Opcional: ajustes de tema sobre o template (esquema, cores em hex, raios, fonte dos títulos) |
| `seo` | `title` (10 a 70 caracteres) e `description` (50 a 160 caracteres) |
| `sections` | Lista ordenada de seções: `id`, `type`, `variant` (opcional), `surface` (opcional), `purpose` (opcional) e `content` |

O formato de `content` de cada tipo de seção está em [`content/schemas/sections.ts`](content/schemas/sections.ts).

### Como validar

```ts
import { buildSite, formatValidationErrors, validateSiteSpec } from "@/site-spec";

const result = validateSiteSpec(json); // json: unknown (vindo de uma IA, arquivo, API...)
if (!result.valid) {
  console.log(formatValidationErrors(result)); // relatório para a IA corrigir
} else {
  const spec = result.value; // SiteSpec tipado
}

// Ou o pipeline inteiro: valida, gera o blueprint e resolve o template.
// Lança FactoryError("INVALID_SITE_SPEC") com todos os erros se o input for inválido.
const site = buildSite(json); // { blueprint, page } → <PageComposer page={site.page} />
```

Para validar um blueprint sem conteúdo (por exemplo, um plano aprovado antes do texto), use `validateBlueprint(json)`.

### Como interpretar os erros

Um SiteSpec rejeitado retorna **todos** os problemas de uma vez, cada um com caminho, código e mensagem:

```
INVALID_SITE_SPEC: 4 errors
- template: "restaurant" is not a valid template. Expected one of: landing-page, law-firm, services, corporate, saas, agency, consulting
- seo.title: must have at most 70 characters (received 78)
- sections[1].variant: "dark" is not a valid variant for section "hero". Expected one of: centered, split
- sections[2].type: "gallery" is not a valid section type. Expected one of: navbar, hero, features, ...
```

| Código | Significado |
| --- | --- |
| `required` | Campo obrigatório ausente ou vazio |
| `invalid_type` | Tipo errado (texto no lugar de lista, `null` em campo opcional...) |
| `invalid_value` | Valor fora da lista permitida (goal, ícone, esquema de cores...) |
| `invalid_format` | Formato inválido: link, cor, medida, id, caminho de imagem ou HTML em texto |
| `unknown_field` | Campo que não existe no contrato |
| `too_short`, `too_long` | Texto fora dos limites de tamanho |
| `too_few`, `too_many` | Lista fora dos limites de itens |
| `unknown_template`, `unknown_section`, `unknown_variant` | Referência a algo que a fábrica não tem |
| `duplicate_id` | Id de seção repetido |
| `invalid_structure` | Regra de estrutura: exatamente um hero, navbar no início e footer no fim |
| `broken_link` | Link `#id` que não aponta para nenhuma seção |

### Como criar um SiteSpec

1. Escolha o template e parta da estrutura recomendada dele (`templates/<id>/index.ts`, campo `sections`), respeitando as `guidelines`.
2. Escreva o JSON: campos do projeto, `seo`, `cta` e as seções com conteúdo.
3. Valide com `validateSiteSpec` e corrija os caminhos apontados até ser aceito.
4. Para publicá-lo como exemplo:
   1. salve em `examples/site-specs/<id>.json`;
   2. registre-o em `exampleSpecs` (`examples/index.ts`) e em `exampleIds` (`tests/support.ts`);
   3. rode `npm run check`. O site fica em `/sites/<id>`.

### Limites da fábrica

A especificação descreve **o que** o site deve ser. Um SiteSpec pode escolher textos, estrutura, template, seções, variantes, tema e SEO, mas apenas entre o que a fábrica já oferece. Ele **não pode** introduzir:
- componentes React, seções ou variantes novas;
- scripts, HTML ou CSS livre;
- dependências npm, configuração de infraestrutura ou arquivos.

Para garantir isso:
- objetos são estritos: campos desconhecidos são erro;
- textos não aceitam HTML;
- links aceitam apenas `#id`, `/caminho`, `https://`, `mailto:` e `tel:`;
- formulários aceitam apenas `https://` ou `mailto:`;
- imagens só podem vir de `/public`;
- cores só em hexadecimal e raios só em px/rem/em, porque valores de tema viram variáveis CSS.

Um recurso novo é sempre uma mudança na fábrica, feita em código e testada.

## Arquitetura

Cada etapa tem um único responsável:

| Etapa | Módulo | Responsabilidade |
| --- | --- | --- |
| Input | JSON de uma IA ou pessoa | Descrever o site (não confiável) |
| SiteSpec | `site-spec/schema.ts` | Definir o contrato |
| Validação | `site-spec/validate.ts` | Aceitar ou rejeitar, com erros por caminho |
| Blueprint | `blueprints/from-site-spec.ts` | Separar estrutura e conteúdo |
| Resolução de template | `composer/resolve-page.ts` | Juntar tema e marca e resolver variantes |
| Catálogo e registry de seções | `components/sections/catalog.ts`, `registry.ts` | Seções e variantes existentes e o componente de cada uma |
| Page Composer | `composer/page-composer.tsx` | Renderizar a página |
| Site | `app/` | Rotas e metadata |

Nenhuma etapa assume o papel de outra: o Page Composer não valida SiteSpecs, e a validação não renderiza nada. Seção, variante ou template inexistente gera `FactoryError` explícito em qualquer etapa. Não há fallback silencioso, e um SiteSpec de exemplo inválido quebra o build.

```
app/                      Rotas: home e /sites/[slug]
site-spec/                Contrato SiteSpec, validação e buildSite()
blueprints/               Schema e tipo do blueprint; conversão a partir do SiteSpec
templates/                Templates por tipo de negócio + registro
composer/                 Resolução de template e Page Composer
components/
  ui/                     Blocos básicos do Design System
  sections/               Seções por tipo, catálogo (dados) e registry (componentes)
content/
  schemas/                Schemas de conteúdo de cada seção (runtime + tipos)
  home.ts                 Página da fábrica
design-system/            Tokens, tema (schema), escopo de tema e fontes
examples/site-specs/      SiteSpecs de exemplo em JSON
lib/                      schema.ts (validação), factory-error.ts, cn.ts, site-config.ts
tests/                    unit/, rendered/, support.ts e o resolver do Node
public/brand/             Logo da fábrica
```

## Design System

Todos os tokens ficam em [`design-system/tokens.css`](design-system/tokens.css): cores, tipografia, espaçamento, raio, sombras, containers e breakpoints. Os componentes usam apenas utilitários semânticos (`bg-surface`, `text-muted-foreground`, `rounded-card`, `py-section`...).

- **Cores em duas camadas:** a paleta (`--light-*`/`--dark-*`) e os tokens semânticos (`--color-*`), remapeados pelas classes `scheme-system`, `scheme-light` e `scheme-dark`. Isso permite seções escuras em qualquer página.
- **Temas:** um `Theme` ([`design-system/theme.ts`](design-system/theme.ts)) sobrescreve cores, raios, fonte dos títulos e esquema. O template define o tema base e o `brand` do SiteSpec ajusta por cima. O schema do tema aceita só valores seguros.

## Componentes

**Blocos básicos (`components/ui`):**
- `Button` e `ButtonLink`; `Actions`;
- `Badge`; `Card`;
- `Container` e `Section`;
- `Heading`, `Text` e `SectionHeading`;
- `Input` e `Textarea`;
- `Icon`; `Brand`;
- `CodeWindow` e `Terminal`.

**Seções (`components/sections`):** cada tipo tem um schema de conteúdo, e todas as variantes de um tipo recebem o mesmo conteúdo.

| Tipo | Variantes |
| --- | --- |
| `navbar` | `minimal`, `transparent` |
| `hero` | `centered`, `split` |
| `features` | `grid` |
| `benefits` | `split` |
| `stats` | `band` |
| `logos` | `cloud` |
| `testimonials` | `grid` |
| `pricing` | `tiers` |
| `faq` | `accordion` |
| `timeline` | `steps`, `flow` |
| `contact` | `split` |
| `cta` | `simple`, `highlight`, `form` |
| `footer` | `columns` |
| `code` | `split` |

Qualquer seção aceita `surface`: `default`, `muted` ou `dark`.

## Templates

| Template | Status | Identidade |
| --- | --- | --- |
| `landing-page` | Pronto, com exemplo | Tokens padrão, hero centralizado, CTA com formulário |
| `law-firm` | Pronto, com exemplo | Azul-marinho e dourado, títulos em serifa, diretrizes da OAB |
| `services` | Pronto, com exemplo | Azul, hero dividido, CTA em destaque |
| `corporate`, `saas`, `agency`, `consulting` | Estrutura | Tema, variantes e estrutura recomendada, sem exemplo ainda |

## Como estender a fábrica

- **Nova seção:**
  1. schema em `content/schemas/sections.ts`;
  2. entrada no `catalog.ts`;
  3. componente em `components/sections/<tipo>/`;
  4. registro em `registry.ts`. Os tipos obrigam os quatro a ficarem em sincronia.
- **Nova variante:** nome no `catalog.ts` + componente com o mesmo schema + registro no `registry.ts`.
- **Novo template:**
  1. crie `templates/<id>/index.ts` com `defineTemplate`;
  2. adicione o id em `siteTypes`, se for um novo tipo de site;
  3. registre-o em `templates/index.ts`.
- **Mudança incompatível no SiteSpec:** incremente `SITE_SPEC_VERSION` e atualize `blueprints/from-site-spec.ts`.

Depois de qualquer mudança: `npm run check`.

## Deploy

O repositório está conectado à Vercel (projeto `ai-site-factory`). Cada push na `main` gera um deploy de produção, e cada outra branch ou pull request gera um preview. As URLs de preview são protegidas pelo login da Vercel; apenas o domínio de produção é público. Se um SiteSpec de exemplo for inválido, o build falha e o deploy anterior continua no ar.

## Próximos passos planejados

- **Agentes:** gerar SiteSpecs a partir de briefings, usando o relatório de validação para autocorreção.
- **JSON Schema do SiteSpec:** exportar o contrato para structured outputs de modelos de IA.
- **Biblioteca:** novas seções e variantes; exemplos para os templates em preparação.
- **Mídia e formulários:** imagens de clientes e envio real de formulários (hoje, `mailto:`).
- **Testes de interface:** regressão visual e acessibilidade automatizadas.
- **Dashboard, memória e automações.**
