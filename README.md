# FIFA 2026 Tickets — TFTEC Copa do Mundo Azure

Aplicação educacional fictícia de venda de ingressos para a Copa do Mundo FIFA 2026, usada no evento **TFTEC "Copa do Mundo Azure"** como demo de modernização VM → PaaS no Azure.

> ⚠️ **Aplicação educacional fictícia.** Não vinculada à FIFA ou a qualquer entidade oficial.

---

## Estrutura

```
.
├── fifa2026-api/                     # Backend Node.js/Express + mssql + JWT
├── fifa2026-web/                     # Build deployado do frontend (artefato)
├── Lovable/World Cup Tickets Hub/    # Source do frontend (Vite + React + TS + shadcn)
├── infra/                            # IaC: Bicep + scripts az CLI
├── docs/
│   ├── epics/                        # Epics ativas (EPIC-000) e parked (EPIC-001)
│   └── stories/                      # Stories AIOX (0.1 → 0.4) + parked
├── .github/workflows/                # CI/CD GitHub Actions
├── DEPLOY.md                         # Topologias 3-VM e Azure Web App
└── FIFA2026Tickets.bacpac            # Source-of-truth do banco
```

---

## Quick start

### Dev local
```bash
# Backend
cd fifa2026-api
cp .env.example .env  # editar DB_SERVER e credenciais
npm install
npm run dev           # nodemon :3001

# Frontend (terminal 2)
cd "Lovable/World Cup Tickets Hub"
cp .env.example .env
npm install
npm run dev           # vite :8080 (proxy /api → :3001)
```
Acesse `http://localhost:8080`. Login admin: `admin@fifa2026.com / admin123`.

### Provisionar Azure
```bash
export SQL_ADMIN_PASSWORD='SuaSenha!'
export JWT_SECRET="$(openssl rand -hex 32)"
az group create -n fifa2026-rg -l eastus2
cd infra
az deployment group create -g fifa2026-rg --template-file main.bicep --parameters parameters/dev.bicepparam
# detalhes em infra/README.md
```

### Build frontend para Web App
```bash
cd "Lovable/World Cup Tickets Hub"
VITE_API_URL=https://<seu-back>.azurewebsites.net/api \
BACKEND_URL=https://<seu-back>.azurewebsites.net \
npm run build
```

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Vite + React 18 + TypeScript + shadcn-ui (Radix) + Tailwind + react-query |
| Backend | Node.js 18+ + Express 4 + mssql + jsonwebtoken + helmet |
| Banco | SQL Server 2019+ / Azure SQL Database |
| Hosting (atual) | Azure Web App for Windows + Azure SQL Database |
| Hosting (alvo evento) | 3 VMs Windows (front pública, back+db privadas) — ver EPIC-001 parked |
| IaC | Bicep + scripts az CLI |
| CI/CD | GitHub Actions com publish profile |

---

## Documentação

- **[DEPLOY.md](DEPLOY.md)** — topologias possíveis (3 VMs, Web App, dev local)
- **[infra/README.md](infra/README.md)** — comandos completos de provisionamento + import bacpac
- **[docs/epics/](docs/epics/)** — epics e stories AIOX (story-driven development)
- **[.github/workflows/README.md](.github/workflows/README.md)** — setup do CI/CD
- **[fifa2026-api/database/README.md](fifa2026-api/database/README.md)** — origem e estrutura do banco

---

## Status atual

✅ EPIC-000 — App Adjustment for TFTEC Event (Done)
- Story 0.1: Deploy em Azure PaaS ✅
- Story 0.2: Remover refs Lovable ✅
- Story 0.3: Footer com disclaimer TFTEC ✅
- Story 0.4: Admin Dashboard com dados reais ✅

⏸️ EPIC-001 — VM-to-WebApp Modernization (parked, conteúdo didático do evento)

---

## Live (privado)

- Frontend: https://fifa2026-web.azurewebsites.net
- Backend: https://fifa2026-back.azurewebsites.net (CORS allowlist do front)
- SQL: `fifa2026-sql.database.windows.net`

---

## Licença

Projeto educacional. Uso restrito ao evento TFTEC.
