# Content Audit — Branding/Visual + Admin Labels

> **Auditor:** River (@sm) · **Data:** 2026-05-07 · **Escopo:** EPIC-000 Story 0.2+
> **Método:** inspeção do source de `Lovable/World Cup Tickets Hub/src/` + dev server local em `localhost:8080`

---

## Sumário executivo

A aplicação tem **branding FIFA forte** em ~10 pontos do código. Como você confirmou que o **tema fica** (seleções, estádios, ingressos), a pergunta não é "trocar FIFA por TFTEC", é decidir **quais referências são "do mundo do produto"** (FIFA, Copa do Mundo — ficam) e quais são **placeholders Lovable não-tematizados** (Lovable App, og:title, etc — devem mudar).

Identifiquei **4 categorias de ajuste** em ordem de prioridade:

| # | Categoria | Ajustes | Prioridade |
|---|---|---|---|
| A | Metadados (title/OG/favicon/twitter) | 7 itens | 🔴 Alta — afeta SEO e link sharing |
| B | Footer institucional | 6 itens | 🟡 Média — emails, telefones, endereços fictícios |
| C | Admin (sidebar + dashboard) | 4 itens | 🟢 Baixa — afeta só admin logado |
| D | Imagens visuais (favicon/hero) | 2 itens | 🟡 Média — depende se vamos manter trophy |

---

## A — Metadados (HTML head)

`Lovable/World Cup Tickets Hub/index.html`:

| Linha | Atual | Status |
|---|---|---|
| 8 | `<title>Lovable App</title>` | ❌ placeholder Lovable |
| 9 | `<meta name="description" content="Lovable Generated Project" />` | ❌ placeholder |
| 10 | `<meta name="author" content="Lovable" />` | ❌ placeholder |
| 13 | `<meta property="og:title" content="Lovable App" />` | ❌ placeholder |
| 14 | `<meta property="og:description" content="Lovable Generated Project" />` | ❌ placeholder |
| 16 | `<meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />` | ❌ link externo Lovable |
| 19 | `<meta name="twitter:site" content="@Lovable" />` | ❌ placeholder |
| 20 | `<meta name="twitter:image" content="https://lovable.dev/...">` | ❌ link externo |

**Proposta:**
- `title`: `FIFA World Cup 2026 — Tickets`
- `description`: `Plataforma oficial de venda de ingressos para a Copa do Mundo FIFA 2026`
- `author`: `TFTEC` *(ou nome do evento)*
- `og:image` + `twitter:image`: trocar por uma imagem hospedada no próprio site (ex.: `/world-cup-trophy-og.png` em `public/`)
- `twitter:site`: `@TFTEC` *(ou conta oficial do evento)*

---

## B — Footer institucional

`src/components/layout/Footer.tsx`:

| Linha | Atual | Plausibilidade real |
|---|---|---|
| 22 | "Plataforma oficial de venda de ingressos para a Copa do Mundo FIFA 2026" | ⚠️ **claim de oficialidade** — pode dar problema legal num evento didático real. Sugiro adicionar disclaimer |
| 26 | `href="https://www.facebook.com/fifaworldcup"` | ⚠️ link real da FIFA — sugiro trocar por `#` ou remover |
| 29 | Twitter `https://twitter.com/FIFAWorldCup` | ⚠️ idem |
| 32 | Instagram `https://www.instagram.com/fifaworldcup` | ⚠️ idem |
| 35 | YouTube `https://www.youtube.com/fifatv` | ⚠️ idem |
| 83-98 | Links para `https://www.fifa.com/...` (ajuda, ToS, privacy) | ⚠️ idem |
| 110-112 | `mailto:suporte@fifa2026.com` + `+1 (800) FIFA-2026` | ✅ ficcional, ok |
| 123 | `FIFA Headquarters, Zürich, Switzerland` | ⚠️ endereço real da FIFA — sugiro trocar para algo claramente ficcional ou TFTEC |
| 132 | `© 2026 FIFA World Cup. Todos os direitos reservados. Projeto acadêmico para pós-graduação em Arquitetura Azure.` | ✅ tem disclaimer acadêmico, mas pode atualizar para "TFTEC Copa do Mundo Azure" |

**Proposta:**
- Trocar links externos para `#` ou remover ícones de redes sociais reais (manter ícones vazios)
- Substituir `FIFA Headquarters, Zürich` por algo neutro como `Projeto demonstração TFTEC`
- Atualizar copyright: `© 2026 — Projeto acadêmico TFTEC "Copa do Mundo Azure"`

---

## C — Admin

`src/pages/admin/AdminLayout.tsx`:

| Linha | Atual | Comentário |
|---|---|---|
| 54 | Logo: `<span className="font-display text-lg text-gradient">Admin</span>` | ✅ neutro, ok |
| 22 | `'Jogos'`, `'Estádios'`, `'Usuários'`, `'Vendas'` | ✅ pt-BR consistente |

`src/pages/admin/Dashboard.tsx`:

| Linha | Atual | Comentário |
|---|---|---|
| 30-36 | `recentSales` **hardcoded** com nomes ('João Silva', 'Maria Santos'...) e datas '2024-12-15' | ⚠️ **dados mock no dashboard** — não vem do banco. Verificar se faz sentido manter mock ou plugar `/api/admin/sales` |
| 38-43 | `topMatches` hardcoded | ⚠️ idem |
| 51-52 | `Dashboard` / `Visão geral do sistema de ingressos` | ✅ ok |

**Proposta:**
- (Opcional, mas alto valor) trocar `recentSales` mock por chamada real ao `api.getSales()` — admin passa a refletir dados reais do bacpac
- Mudar título: `Visão geral do sistema de ingressos` → `Dashboard administrativo` (mais técnico, alinhado com tom de evento)

---

## D — Imagens visuais

`Lovable/World Cup Tickets Hub/public/`:
- `favicon.ico` (20kb) e `favicon.png` (22kb) — **não inspecionei o conteúdo**, mas geralmente é trofeu/Lovable padrão
- `placeholder.svg` (3kb) — provavelmente icon de placeholder Lovable

`src/assets/world-cup-trophy.png` (35kb):
- Imagem de uma taça genérica — usada na Hero (lados esquerdo e direito com 20% opacity)
- ✅ Visualmente neutra, não tem branding FIFA explícito

**Proposta:**
- Trocar `favicon.png` e `favicon.ico` se forem versões Lovable; manter se já é trofeu/futebol
- `world-cup-trophy.png` pode ficar — é icônico e atemporal

---

## E — Não tocar (decisão clara)

Tem **referências FIFA "do mundo do produto"** que devem ficar como estão (você confirmou que o tema é Copa do Mundo):

- `HeroSection.tsx`: `FIFA WORLD CUP 2026` no título principal — é o NOME do produto
- `Navbar.tsx`: `FIFA 2026 / World Cup Tickets` — branding principal
- `data/matches.ts`: `// PARTIDAS OFICIAIS FIFA COPA 2026` — comentário
- `data/stadiums.ts`: descrições mencionando "Copa do Mundo 2026" e "Copa do Mundo (1970/1986)"
- `pages/Matches.tsx`, `Qualified.tsx`, `Groups.tsx`: textos sobre "Copa do Mundo FIFA 2026"
- `pages/Register.tsx`: toast "Bem-vindo ao FIFA 2026 Tickets"
- `pages/Checkout.tsx`, `PaymentConfirmation.tsx`: `FIFA2026-${id}` em ticket IDs e nomes de PDF
- `index.css`: `--fifa-blue: 210 100% 40%` — design token, neutro

---

## Proposta de stories

Sugiro 3 stories pequenas, todas executáveis em sequência sem bloquear umas às outras:

### Story 0.2 — Metadados HTML (15 min, prioridade Alta)
- Atualizar `index.html`: title, description, author, OG tags, twitter tags
- Substituir `og:image` Lovable por imagem local
- Acceptance: source HTML do site mostra título correto, sem strings "Lovable"

### Story 0.3 — Footer institucional (15 min, prioridade Média)
- Trocar links sociais reais por `#`
- Substituir endereço "FIFA Headquarters, Zürich" por placeholder neutro
- Atualizar copyright incluindo TFTEC
- Acceptance: visualmente o footer não tem mais links que abrem páginas reais da FIFA

### Story 0.4 — Admin Dashboard real (45 min, prioridade Baixa, MAS HIGH IMPACT)
- Substituir mocks de `recentSales` e `topMatches` no `Dashboard.tsx` por chamadas reais a `api.getSales()` e `api.getAdminStats()`
- Adicionar tratamento de loading e erro
- Acceptance: dashboard admin mostra dados reais do bacpac importado

### (Opcional) Story 0.5 — Imagens favicon/OG (10 min)
- Inspecionar `favicon.png/ico` e decidir se troca
- Criar imagem OG hospedada localmente
- Acceptance: link sharing do site mostra preview customizado, não Lovable

---

## Como prosseguir

Você aprova essa proposta de 3 (ou 4) stories? Sugiro priorizar a **0.2 (metadados)** primeiro porque é a mais visível (mostra "Lovable App" na aba do browser AGORA mesmo, e em qualquer link compartilhado).

Se aprovar, me diz se quer:
- **Stories formalizadas** em `docs/stories/0.2.story.md`, `0.3.story.md`, etc. + handoff para `@dev` implementar
- **Implementação direta** sem story formal (mais ágil, menos rastreável)
- **Ajustes pontuais antes** (ex.: cortar a 0.3, adicionar item X que esqueci)
