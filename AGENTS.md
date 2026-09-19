<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AI Site Factory: regras para agentes

Fábrica de sites: blueprint + template + conteúdo → Page Composer → página. Leia o `README.md` para a visão completa. Estas regras valem para qualquer IA que altere este repositório.

## Onde fica cada coisa

| Preciso de... | Arquivo |
| --- | --- |
| Tokens visuais (cores, raio, sombra, espaçamento, containers, breakpoints) | `design-system/tokens.css` |
| Tema de um site ou template | `design-system/theme.ts` (tipo `Theme`) |
| Blocos básicos | `components/ui/` |
| Seções e suas variantes | `components/sections/<tipo>/` + `components/sections/registry.ts` |
| Formato do conteúdo de cada seção | `content/schemas/sections.ts` |
| Templates | `templates/<id>/index.ts` + `templates/index.ts` |
| Blueprints | `blueprints/<id>.ts` |
| Conteúdo dos blueprints | `content/examples/<id>.ts` + `content/examples/index.ts` |
| Montagem da página | `composer/compose-site.ts`, `composer/page-composer.tsx` |

## Regras

1. **Reutilize antes de criar.** Procure em `components/ui` e no `registry.ts` antes de escrever um componente. Um site novo deve ser, na maior parte, blueprint + conteúdo.
2. **Não duplique componentes.** Um novo visual para uma seção existente é uma **variante** do mesmo tipo, com o mesmo schema de conteúdo, registrada em `variants`. Um fundo escuro não é uma variante: use `surface: "dark"`.
3. **Use o Design System.** Nos componentes, só utilitários semânticos: `bg-background`, `bg-surface`, `bg-muted`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-accent`, `rounded-card`, `shadow-card`, `py-section`, `max-w-content`... Não use a paleta do Tailwind (`zinc-500`, `indigo-600`) nem cores arbitrárias. A única exceção são `CodeWindow` e `Terminal`, que são sempre escuros.
4. **Identidade visual vai no tema.** Cores, raios, fonte de títulos e esquema de um cliente ficam no `theme` do template ou no `brand` do blueprint. Nunca altere um componente para atender um único site.
5. **Não sobrescreva classes da base via `className`.** Sem `tailwind-merge`, a ordem do CSS gerado decide qual classe vence (`hidden` + `inline-flex`, `size-4` + `size-5`...). Crie uma prop ou variante (exemplos: `Card variant`, `Icon size`, `Section spacing`) ou use um wrapper. `className` serve para layout externo: margem, largura, posição no grid.
6. **Nada de texto fixo nas seções.** Todo texto vem de `content`. Um campo novo exige atualizar o schema em `content/schemas/sections.ts`.
7. **Acessibilidade:**
   - um único `h1` por página, no hero; títulos de seção em `h2` (via `SectionHeading`) e itens em `h3`;
   - toda imagem com `alt`, vazio se for decorativa;
   - `Icon` é decorativo: o significado fica no texto ao lado;
   - campos sempre com label (`Input` e `Textarea` exigem `id` e `label`);
   - foco visível com `focus-visible:outline-ring`;
   - contraste AA, inclusive nas cores de temas novos;
   - HTML semântico (`nav`, `main`, `footer`, `dl`, `figure`, `details`).
8. **Responsividade:** mobile first. Confira em 390, 768 e 1440 px, sem rolagem horizontal. Grids começam em uma coluna.
9. **Server Components por padrão.** Use `"use client"` só com interatividade real (hoje, apenas o `MobileMenu`). Prefira HTML nativo, como `<details>` no FAQ.
10. **Não instale dependências sem necessidade real**, incluindo bibliotecas de ícones, UI ou CSS. Ícone novo entra em `components/ui/icon.tsx`.
11. **Conteúdo de exemplo é fictício** e marcado como demonstração. Nunca imite empresas ou pessoas reais. Sites de advocacia seguem as `guidelines` do template `law-firm` (Provimento 205/2021 da OAB).
12. **Fora do escopo atual:** banco de dados, autenticação, CMS, dashboard, agentes autônomos, memória, CRM e integrações externas. Não crie sem pedido explícito.

## Antes de concluir qualquer tarefa

```bash
npm run check   # lint + typecheck + build: precisa terminar sem erros nem warnings
```

O typecheck valida blueprints, templates e conteúdo, e o build renderiza a home e todos os sites em `/sites/*`. Para mudanças visuais, confira as páginas afetadas no navegador, no celular e no desktop.

## Receitas rápidas

- **Nova seção:** schema em `content/schemas/sections.ts` → componente em `components/sections/<tipo>/` recebendo `SectionProps<Conteudo>` → entrada no `registry.ts`.
- **Nova variante:** componente com o mesmo schema → adicionar em `variants` do tipo no `registry.ts`.
- **Novo template:** `templates/<id>/index.ts` com `defineTemplate` → id em `SiteType` (se for novo tipo) → registro em `templates/index.ts`.
- **Novo site:** `blueprints/<id>.ts` com `defineBlueprint` → `content/examples/<id>.ts` tipado com `BlueprintContent<typeof blueprint>` → `composeSite` em `content/examples/index.ts`.
- **Novo token:** declare em `design-system/tokens.css`. Se for cor, crie o par `--light-*`/`--dark-*` e o mapeamento nos três blocos de esquema, e adicione o nome em `ColorToken` (`design-system/theme.ts`).

## Next.js 16 neste projeto

- `params` é uma Promise; tipe páginas com o helper global `PageProps<"/rota">`.
- `next/image`: use `preload`, não `priority` (obsoleto).
- Em caso de dúvida sobre uma API, leia `node_modules/next/dist/docs/` antes de escrever o código.
