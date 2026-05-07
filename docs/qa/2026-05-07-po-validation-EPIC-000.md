# PO Validation — EPIC-000 Stories

> **Validator:** Pax (@po) · **Date:** 2026-05-07
> **Stories:** 0.1, 0.2, 0.3, 0.4
> **Method:** `story-draft-checklist.md` (6 sections, 5 always-applicable + 1 conditional)
> **CodeRabbit config:** enabled (`coderabbit_integration.enabled: true` em core-config.yaml linha 211)

---

## Sumário executivo

| Story | Title | Verdict | Score | Bloqueio? |
|---|---|---|---|---|
| 0.1 | Deploy inicial em Azure PaaS | 🟡 NEEDS REVISION | 8/10 | Soft (CodeRabbit gap) |
| 0.2 | Remover referências Lovable | 🟡 NEEDS REVISION | 8/10 | Soft (CodeRabbit gap) |
| 0.3 | Footer com disclaimer TFTEC | 🟡 NEEDS REVISION | 8/10 | Soft (CodeRabbit gap) |
| 0.4 | Admin Dashboard com dados reais | 🟡 NEEDS REVISION | 8/10 | Soft (CodeRabbit gap) |

**Padrão:** todas as 4 stories são **estruturalmente sólidas** (Goal claro, technical guidance, references, self-containment, testing) — porém **nenhuma tem a seção `🤖 CodeRabbit Integration`** exigida pelo checklist quando `coderabbit_integration.enabled: true`.

**Recomendação Pax:** dois caminhos válidos — usuário escolhe.

---

## Validação detalhada

### Story 0.1 — Deploy inicial em Azure PaaS

| Categoria | Status | Notas |
|---|---|---|
| 1. Goal & Context Clarity | ✅ PASS | Story clara, valor claro, dependência (subscription Azure + az CLI) explícita |
| 2. Technical Implementation Guidance | ✅ PASS | 5 passos numerados com comandos concretos; alternativas Bicep/az/GitHub Actions cobertas |
| 3. Reference Effectiveness | ✅ PASS | Aponta para `infra/main.bicep`, `infra/provision.sh`, `infra/README.md`, `.github/workflows/`. Refs com path completo |
| 4. Self-Containment Assessment | ✅ PASS | Comandos completos no story; não precisa abrir 10 docs para entender |
| 5. Testing Guidance | ✅ PASS | Smoke test com 5 curls + uma asserção de negação (backend privado retorna 403) |
| 6. CodeRabbit Integration | ❌ FAIL | Seção `🤖 CodeRabbit Integration` ausente |

**Specific Issues:**
- Falta seção CodeRabbit Integration (story type, agentes especializados, quality gates, self-healing config)
- Story type seria: **Deployment / Infrastructure** → `@dev` + `@github-devops` como specialized agents
- Pre-Deployment quality gate aplicaria

**Developer Perspective:**
- ✅ Eu (dev) conseguiria implementar como está. Story é executiva, não há ambiguidade.

---

### Story 0.2 — Remover referências Lovable

| Categoria | Status | Notas |
|---|---|---|
| 1. Goal & Context Clarity | ✅ PASS | "Remove TODAS Lovable refs" — objetivo binário, mensurável |
| 2. Technical Implementation Guidance | ✅ PASS | HTML completo proposto, 3 opções para favicon, comandos para gerar OG image |
| 3. Reference Effectiveness | ✅ PASS | Linhas exatas do `index.html` referenciadas |
| 4. Self-Containment Assessment | ✅ PASS | Snippet HTML completo no story; não precisa abrir o source para implementar |
| 5. Testing Guidance | ✅ PASS | `grep -i 'lovable' dist/` é o teste mais elegante possível |
| 6. CodeRabbit Integration | ❌ FAIL | Ausente |

**Specific Issues:**
- Falta seção CodeRabbit Integration
- Story type seria: **Frontend** → `@dev` + `@ux-design-expert` aplicariam
- Pre-Commit quality gate suficiente (não há PR aqui ainda)

**Minor enhancement (não bloqueia):**
- AC-5 menciona "imagens próprias do projeto" — vago. Sugiro especificar mínimo: "tematizada com Copa do Mundo / futebol" para evitar reprovação subjetiva no QA.

**Developer Perspective:**
- ✅ Implementável.

---

### Story 0.3 — Footer com disclaimer TFTEC

| Categoria | Status | Notas |
|---|---|---|
| 1. Goal & Context Clarity | ✅ PASS | Substituir 1 linha por outra. Contexto educacional explicado |
| 2. Technical Implementation Guidance | ✅ PASS | Snippet TSX antes/depois mostrado; classes Tailwind especificadas |
| 3. Reference Effectiveness | ✅ PASS | Linha 132 do `Footer.tsx` apontada com precisão |
| 4. Self-Containment Assessment | ✅ PASS | Story legível sem abrir o source |
| 5. Testing Guidance | ✅ PASS | grep + smoke visual |
| 6. CodeRabbit Integration | ❌ FAIL | Ausente |

**Specific Issues:**
- Falta seção CodeRabbit Integration
- Story type: **Frontend** (igual 0.2)

**Developer Perspective:**
- ✅ Trivial de implementar. Maior story-text-to-code-change ratio das 4 — bem documentada para mudança pequena, mas não é sobre-engineering, é o disclaimer importante.

---

### Story 0.4 — Admin Dashboard com dados reais

| Categoria | Status | Notas |
|---|---|---|
| 1. Goal & Context Clarity | ✅ PASS | Contraste claro: "6 mocks → 5 endpoints". Constitution Article IV aplicada (no invention) |
| 2. Technical Implementation Guidance | ✅ PASS | Código TSX quase pronto; useQuery padrão; tipos `any` justificados |
| 3. Reference Effectiveness | ✅ PASS | Refs apontam para `lib/api.ts`, `routes/admin.js`, linhas específicas |
| 4. Self-Containment Assessment | ⚠️ PARTIAL | Mapping table 6→5 endpoints é excelente; mas o snippet de Stats Cards mistura Skeleton (não importado no exemplo) — ver nota |
| 5. Testing Guidance | ✅ PASS | Smoke test inclui criar venda nova ao vivo → ver aparecer no dashboard |
| 6. CodeRabbit Integration | ❌ FAIL | Ausente |

**Specific Issues:**
- Falta seção CodeRabbit Integration
- Story type: **Frontend** (consome API)
- **Minor:** o snippet menciona `import { Skeleton } from '@/components/ui/skeleton';` mas não está nos imports do código de exemplo. Nada bloqueante, dev resolve, mas vale @sm padronizar
- **Minor:** não é explícito o que fazer com `phaseLabels` (linha 14 do original) que também é importado de `@/data/matches.ts`. Se removermos esse import, `phaseLabels` precisa ou ser inline ou deixar de ser usado. Verificar uso.

**Developer Perspective:**
- ✅ Implementável, mas eu pediria 2 esclarecimentos: "Skeleton" import + tratamento de `phaseLabels`. Não bloqueia, mas adiciona ~10min de discovery work.

---

## Decisão Pax — caminho recomendado

A questão estrutural (CodeRabbit Integration faltando) é um **soft block**: o checklist exige, mas o impacto na qualidade da implementação é zero. CodeRabbit é uma camada de **review automatizado** — sem essa seção nas stories, o `@dev` ainda implementa corretamente, só não dispara o auto-review.

Tenho **3 opções** para resolver:

### Opção A — Adicionar seções CodeRabbit completas (caminho AIOX puro)
- Trabalho: ~5 min/story = 20 min total para @sm reabrir as 4 stories
- Resultado: stories 100% conformes. Self-healing CRITICAL/HIGH ativado em pre-commit
- Custo: precisa do CodeRabbit instalado em WSL (verificar se já está)
- Quando vale: se você planeja review automatizado nas mudanças

### Opção B — Documentar override (pragmático)
- Adicionar à memória `feedback_*.md`: "EPIC-000 dispensa CodeRabbit Integration por ser microajustes em projeto educacional"
- Stories ficam GO sem a seção
- Constitution permite override com justificativa
- Quando vale: evento educacional, mudanças pequenas, sem CI/CD ainda em git remoto

### Opção C — Versão minimal (compromise)
- @sm adiciona uma única linha em cada story:
  > **CodeRabbit:** desabilitado para esta story (microajuste em projeto educacional, sem PR remoto)
- Cumpre formalmente o checklist sem overhead
- Tempo: <1min/story

---

## Recomendação

Considerando que:
- Você (Raphael) optou por iteração rápida nesta fase
- As stories são pequenas (15-45 min cada)
- Ainda não há git remoto / repositório no GitHub
- O CodeRabbit Integration ganha valor real **quando há PRs** — que ainda não temos

**Recomendo Opção C** (versão minimal) — cumpre o gate formal sem inflar as stories, e quando você publicar o repo e configurar PRs, podemos revisitar.

Mas é **sua decisão** — o trade-off é trabalho de @sm × completude do gate.
