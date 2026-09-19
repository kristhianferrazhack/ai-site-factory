<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AI Site Factory: regras para agentes

Fábrica de sites: **SiteSpec → validação → blueprint → template → Page Composer → site**. Leia o `README.md` para a visão completa. Estas regras valem para qualquer IA que altere este repositório ou produza SiteSpecs.

## Princípio: a especificação diz O QUE, a fábrica decide COMO

Um site novo é descrito por um **SiteSpec**: um JSON com estratégia, template, marca, SEO, CTA, seções e conteúdo. A IA pode sugerir textos, estrutura, template, seções, variantes, tema e SEO, **sempre dentro do que a fábrica já oferece**.

Um SiteSpec **não pode** introduzir:
- componentes React, seções ou variantes novas;
- scripts, HTML, CSS livre ou qualquer código executável;
- dependências npm, configuração de infraestrutura ou arquivos fora do escopo.

A validação garante isso: campos desconhecidos são rejeitados, textos não aceitam HTML, links só aceitam `#id`, `/caminho`, `https://`, `mailto:` e `tel:`, cores só em hexadecimal e medidas só em px/rem/em.

Se um site precisa de algo que a fábrica não tem, isso é **uma mudança na fábrica**, feita em código, revisada e testada. Nunca é um campo a mais no SiteSpec.

## Fronteiras da fábrica

Cada etapa tem um único responsável. Nenhuma etapa assume o trabalho de outra.

| Etapa | Módulo | Faz | Não faz |
| --- | --- | --- | --- |
| Input | JSON de uma IA ou pessoa | Descreve o site | Não é confiável até ser validado |
| SiteSpec | `site-spec/schema.ts` | Define o contrato (schema + tipo) | Não executa nada |
| Validação | `site-spec/validate.ts` | Aceita ou rejeita, com erros por caminho | Não constrói nem renderiza |
| Blueprint | `blueprints/from-site-spec.ts` | Separa estrutura (blueprint) e conteúdo | Não valida nem resolve template |
| Resolução de template | `composer/resolve-page.ts` | Junta tema do template + marca e resolve variantes | Não valida conteúdo nem renderiza |
| Catálogo e registry de seções | `components/sections/catalog.ts`, `registry.ts` | Diz quais seções e variantes existem e qual componente renderiza cada uma | Não valida conteúdo |
| Page Composer | `composer/page-composer.tsx` | Renderiza a página com os landmarks corretos | Não valida SiteSpec; nunca faz fallback silencioso |
| Site renderizado | `app/sites/[slug]`, `app/page.tsx` | Rotas e metadata | Não transforma dados |

O ponto de entrada é `buildSite(input)` (`site-spec/build-site.ts`), que roda validação → blueprint → resolução de template. **Nunca pule a validação** para dados que não foram escritos no código da fábrica.

Seção, variante ou template inexistente gera `FactoryError` (`lib/factory-error.ts`), com códigos `UNKNOWN_SECTION`, `UNKNOWN_VARIANT`, `UNKNOWN_TEMPLATE` e `MISSING_CONTENT`. **Falhar é melhor do que gerar um site incorreto**: não adicione fallbacks silenciosos.

## Como produzir ou corrigir um SiteSpec

1. Parta de um exemplo em `examples/site-specs/` e da estrutura recomendada do template (`templates/<id>/index.ts`, campo `sections`). Siga as `guidelines` do template.
2. Use só tipos de seção e variantes do catálogo (`components/sections/catalog.ts`), ícones de `components/ui/icon-names.ts` e campos dos schemas de `content/schemas/sections.ts`.
3. Rode `validateSiteSpec(json)`. Se for rejeitado, `formatValidationErrors(result)` lista cada problema como `caminho: mensagem`. Corrija exatamente os caminhos apontados e valide de novo.
4. Regras de fábrica, além dos schemas:
   - ids de seção únicos (também são as âncoras);
   - exatamente um `hero` (o único h1);
   - `navbar` no início e `footer` no fim;
   - todo link `#id` aponta para uma seção existente;
   - CTA com a variante `form` exige `content.form`.

## Onde fica cada coisa

| Preciso de... | Arquivo |
| --- | --- |
| Contrato SiteSpec e validação | `site-spec/` |
| Mini-biblioteca de schemas (sem dependências) | `lib/schema.ts` |
| Blueprint (schema, tipo, conversão a partir do SiteSpec) | `blueprints/` |
| Formato do conteúdo de cada seção | `content/schemas/sections.ts` |
| Seções e variantes existentes | `components/sections/catalog.ts` |
| Componente de cada variante | `components/sections/registry.ts` + `components/sections/<tipo>/` |
| Blocos básicos | `components/ui/` |
| Tokens visuais | `design-system/tokens.css` |
| Tema (schema e tipo) | `design-system/theme.ts` |
| Templates | `templates/<id>/index.ts` + `templates/index.ts` |
| SiteSpecs de exemplo | `examples/site-specs/*.json` + `examples/index.ts` |
| Testes | `tests/unit/`, `tests/rendered/` |

## Regras de código

1. **Reutilize antes de criar.** Procure em `components/ui` e no catálogo antes de escrever um componente. Um site novo deve ser só um SiteSpec.
2. **Não duplique componentes.** Um novo visual para uma seção existente é uma **variante** do mesmo tipo, com o mesmo schema de conteúdo. Um fundo escuro não é uma variante: use `surface: "dark"`.
3. **Schemas são a fonte dos tipos.** Os tipos de conteúdo, tema, blueprint e SiteSpec vêm de `Infer<typeof schema>`. Para mudar um formato, mude o schema; não declare um tipo paralelo.
4. **Validação fica na camada de validação.** Componentes e composer não validam conteúdo; a validação não renderiza nada.
5. **Módulos de dados e validação não importam React.** `lib/`, `content/schemas/`, `design-system/theme.ts`, `components/sections/catalog.ts`, `blueprints/`, `templates/`, `site-spec/` e `examples/` rodam no Node, nos testes. O resolver dos testes não carrega `.tsx`.
6. **Use o Design System.** Nos componentes, só utilitários semânticos (`bg-surface`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-accent`, `rounded-card`, `py-section`...). Nada de paleta do Tailwind ou cores arbitrárias, exceto em `CodeWindow` e `Terminal`.
7. **Identidade visual vai no tema** (`theme` do template ou `brand` do SiteSpec), nunca em um componente.
8. **Não sobrescreva classes da base via `className`.** Crie uma prop ou variante (`Card variant`, `Icon size`, `Section spacing`) ou use um wrapper.
9. **Nada de texto fixo nas seções.** Todo texto vem de `content`.
10. **Acessibilidade:**
    - um único `h1` por página (hero); `h2` via `SectionHeading`; `h3` nos itens;
    - `alt` em toda imagem;
    - campos com label;
    - foco visível;
    - contraste AA;
    - HTML semântico.
11. **Responsividade:** mobile first. Confira em 390, 768 e 1440 px, sem rolagem horizontal.
12. **Server Components por padrão.** `"use client"` só com interatividade real (hoje, apenas o `MobileMenu`).
13. **Não instale dependências sem necessidade real.** A validação usa `lib/schema.ts` e os testes usam `node:test`.
14. **Sintaxe compatível com o Node:** o `tsconfig` usa `erasableSyntaxOnly` e `verbatimModuleSyntax`. Não use `enum`, `namespace` nem parameter properties; importe tipos com `import type`.
15. **Conteúdo de exemplo é fictício.** Nunca imite empresas ou pessoas reais. Sites de advocacia seguem as `guidelines` do template `law-firm` (Provimento 205/2021 da OAB).
16. **Fora do escopo atual:** agentes autônomos, banco de dados, autenticação, CMS, dashboard, memória, CRM e integrações externas.

## Antes de concluir qualquer tarefa

```bash
npm run check   # lint + typecheck + testes + build + testes do HTML gerado
```

Tudo precisa passar sem erros nem warnings. Um SiteSpec de exemplo inválido quebra o build de propósito.

## Receitas rápidas

- **Novo site:**
  1. Crie `examples/site-specs/<id>.json`.
  2. Registre-o em `exampleSpecs` (`examples/index.ts`). Ele fica disponível em `/sites/<id>`.
  3. Adicione o id a `exampleIds` em `tests/support.ts` para cobri-lo nos testes.
- **Nova seção:**
  1. Schema em `content/schemas/sections.ts` (e em `sectionContentSchemas`).
  2. Entrada em `catalog.ts`.
  3. Componente em `components/sections/<tipo>/`.
  4. Registro em `registry.ts`. Os tipos obrigam a manter os quatro em sincronia.
- **Nova variante:** nome em `variants` no `catalog.ts` + componente com o mesmo schema + entrada no `registry.ts`.
- **Novo template:**
  1. Crie `templates/<id>/index.ts` com `defineTemplate`.
  2. Adicione o id em `siteTypes` (`templates/types.ts`), se for um novo tipo de site.
  3. Registre-o em `templates/index.ts`.
- **Novo ícone:** nome em `components/ui/icon-names.ts` + desenho em `icon.tsx`.
- **Novo token:** `design-system/tokens.css`. Se for cor: par `--light-*`/`--dark-*`, mapeamento nos três blocos de esquema e o nome em `colorTokens` (`design-system/theme.ts`).
- **Mudança incompatível no formato do SiteSpec:** incremente `SITE_SPEC_VERSION` e atualize a conversão em `blueprints/from-site-spec.ts`.

## Next.js 16 neste projeto

- `params` é uma Promise; tipe páginas com o helper global `PageProps<"/rota">`.
- `next/image`: use `preload`, não `priority` (obsoleto).
- JSON é importado com `with { type: "json" }` (funciona no Next e no Node).
- Em caso de dúvida sobre uma API, leia `node_modules/next/dist/docs/`.
