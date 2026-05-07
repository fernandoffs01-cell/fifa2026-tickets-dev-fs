# Banco de Dados — FIFA 2026 Tickets

Fonte da verdade: **`FIFA2026-APP/FIFA2026Tickets.bacpac`**.

## Arquivos

| Arquivo | Propósito |
|---|---|
| `schema.sql` | Schema canônico (tabelas + FKs + índices). Extraído do `.bacpac`. Compatível com SQL Server 2019+ e Azure SQL Database. |
| `seed-admin.sql` | Apenas o usuário admin. Use SOMENTE quando criar o banco a partir do `schema.sql` (sem restaurar do bacpac). |
| `legacy/` | Versões antigas, divergentes do bacpac. Mantidas só por histórico. **Não usar em deploys novos.** |

## Como popular o banco

### Opção A — Restaurar do `.bacpac` (recomendado)
Inclui schema + dados reais (16 seleções, 9 estádios, 12 jogos, ~84 categorias de ingresso, usuários e compras de exemplo).

**SQL Server (VM):**
```bash
SqlPackage.exe /Action:Import \
  /SourceFile:FIFA2026Tickets.bacpac \
  /TargetServerName:localhost \
  /TargetDatabaseName:FIFA2026Tickets \
  /TargetUser:sa /TargetPassword:<senha>
```

**Azure SQL Database (Portal/CLI):**
```bash
az sql db import \
  --resource-group <rg> --server <server> --name FIFA2026Tickets \
  --storage-key-type StorageAccessKey --storage-key <key> \
  --storage-uri https://<storage>.blob.core.windows.net/<container>/FIFA2026Tickets.bacpac \
  --admin-user <user> --admin-password <pass>
```

### Opção B — Criar do zero (schema.sql + seed-admin.sql)
Banco vazio, sem seleções/estádios/jogos. Útil só para testes de integração com fixtures próprias.

```bash
sqlcmd -S <server> -U <user> -P <pass> -d FIFA2026Tickets -i schema.sql
sqlcmd -S <server> -U <user> -P <pass> -d FIFA2026Tickets -i seed-admin.sql
```

## Estrutura

6 tabelas:
- `users` (id, name, email UNIQUE, password, role, phone, document, timestamps)
- `teams` (id, name, code UNIQUE, flag, group_name, confederation, fifa_ranking, created_at)
- `stadiums` (id, name, city, country, capacity, image, description, address, lat, long, created_at)
- `matches` (id, home_team_id→teams, away_team_id→teams, stadium_id→stadiums, date, time, stage, group_name, scores, status, created_at)
- `ticket_categories` (id, match_id→matches CASCADE, category, price, total_qty, available_qty, description, created_at)
- `purchases` (id, user_id→users, ticket_category_id→ticket_categories, quantity, prices, status, payment_method, transaction_id, timestamps)

Login admin padrão: `admin@fifa2026.com` / `admin123` (hash bcrypt). Trocar após primeiro login.
