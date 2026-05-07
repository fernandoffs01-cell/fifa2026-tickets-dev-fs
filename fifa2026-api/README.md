# FIFA 2026 Tickets - Backend

Backend Node.js/Express com SQL Server para o sistema de venda de ingressos da Copa do Mundo 2026.

## Arquitetura Azure

```
┌─────────────────────────────────────────────────────────────┐
│                      VM Azure #1                            │
│                  (Frontend + Backend)                       │
│  ┌─────────────────┐    ┌─────────────────────────────────┐│
│  │   Frontend      │    │         Backend                 ││
│  │   React/Vite    │───▶│      Node.js/Express            ││
│  │   (build)       │    │         :3001                   ││
│  │   Nginx :80     │    └──────────────┬──────────────────┘│
│  └─────────────────┘                   │                   │
└────────────────────────────────────────┼───────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      VM Azure #2                            │
│                     (SQL Server)                            │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              SQL Server 2019/2022                       ││
│  │                   :1433                                 ││
│  │              Database: fifa2026                         ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## Pré-requisitos

- Node.js 18+
- SQL Server 2019/2022
- npm ou yarn

## Instalação

### 1. Na VM de SQL Server

```bash
# Conectar ao SQL Server e executar:
sqlcmd -S localhost -U sa -P 'sua_senha' -i database/schema.sql
sqlcmd -S localhost -U sa -P 'sua_senha' -i database/seed.sql
```

### 2. Na VM de Frontend/Backend

```bash
# Clonar o repositório
git clone <seu-repositorio>
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações

# Iniciar o servidor
npm start
```

## Variáveis de Ambiente

```env
# SQL Server
DB_SERVER=10.0.0.5        # IP da VM de SQL Server
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=sua_senha
DB_NAME=fifa2026

# API
PORT=3001
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:5173
```

## Endpoints da API

### Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Usuário autenticado

### Jogos
- `GET /api/matches` - Lista jogos
- `GET /api/matches/:id` - Detalhes do jogo
- `GET /api/matches/:id/tickets` - Ingressos disponíveis

### Estádios
- `GET /api/stadiums` - Lista estádios
- `GET /api/stadiums/:id` - Detalhes do estádio
- `GET /api/stadiums/:id/matches` - Jogos no estádio

### Seleções
- `GET /api/teams` - Lista seleções
- `GET /api/teams/groups` - Seleções por grupo
- `GET /api/teams/:id` - Detalhes da seleção

### Ingressos
- `POST /api/tickets/purchase` - Comprar ingressos (autenticado)
- `GET /api/tickets/my-tickets` - Meus ingressos (autenticado)

### Usuários
- `GET /api/users/profile` - Meu perfil (autenticado)
- `PUT /api/users/profile` - Atualizar perfil (autenticado)
- `PUT /api/users/password` - Alterar senha (autenticado)

## Deploy com PM2

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Iniciar aplicação
pm2 start src/index.js --name fifa2026-backend

# Configurar para iniciar no boot
pm2 startup
pm2 save
```

## Usuário Admin Padrão

- **Email:** admin@fifa2026.com
- **Senha:** admin123

⚠️ **IMPORTANTE:** Altere a senha do admin após o primeiro login!
