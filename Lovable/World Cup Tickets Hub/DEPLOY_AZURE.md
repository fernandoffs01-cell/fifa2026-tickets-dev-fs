# 🏆 Guia COMPLETO de Deploy - FIFA 2026 Tickets
## Windows Server + IIS + SQL Server

> **IMPORTANTE:** Este guia foi criado para pessoas sem experiência em programação. Siga cada passo na ordem exata.

---

# 📑 ÍNDICE

1. [Preparação das VMs no Azure](#parte-1-preparação-das-vms-no-azure)
2. [Configuração do SQL Server](#parte-2-configuração-do-sql-server)
3. [Configuração do Windows Server (IIS)](#parte-3-configuração-do-windows-server-iis)
4. [Deploy do Backend (API)](#parte-4-deploy-do-backend-api)
5. [Deploy do Frontend (Site)](#parte-5-deploy-do-frontend-site)
6. [Configuração de Rede e Firewall](#parte-6-configuração-de-rede-e-firewall)
7. [Testes e Verificação](#parte-7-testes-e-verificação)
8. [Solução de Problemas](#parte-8-solução-de-problemas)

---

# PARTE 1: PREPARAÇÃO DAS VMs NO AZURE

## 1.1 Acessar o Portal Azure

1. Abra seu navegador (Chrome, Edge, Firefox)
2. Digite na barra de endereço: `https://portal.azure.com`
3. Faça login com sua conta Microsoft/Azure
4. Você verá o painel principal do Azure

## 1.2 Criar a VM do SQL Server

### Passo 1: Iniciar criação da VM

1. No portal Azure, clique em **"+ Criar um recurso"** (botão verde no canto superior esquerdo)
2. Na barra de pesquisa, digite: `SQL Server 2022 on Windows Server 2022`
3. Selecione a opção que aparece
4. Clique no botão azul **"Criar"**

### Passo 2: Configurar dados básicos

Na aba **"Básico"**, preencha:

| Campo | O que preencher |
|-------|-----------------|
| Assinatura | Selecione sua assinatura Azure |
| Grupo de recursos | Clique em "Criar novo" → Digite: `FIFA2026-Resources` → OK |
| Nome da máquina virtual | `VM-SQL-FIFA2026` |
| Região | Selecione a mais próxima de você (ex: Brazil South) |
| Opções de disponibilidade | Nenhuma redundância de infraestrutura necessária |
| Imagem | SQL Server 2022 Developer on Windows Server 2022 |
| Tamanho | Clique em "Ver todos os tamanhos" → Selecione `Standard_B2ms` (2 vCPUs, 8GB RAM) |
| Nome de usuário | `adminfifa` (ou outro de sua escolha) |
| Senha | Crie uma senha forte (anote em lugar seguro!) |
| Confirmar senha | Repita a senha |
| Portas de entrada públicas | Selecione "Permitir portas selecionadas" |
| Selecionar portas | Marque: RDP (3389) |

### Passo 3: Configurar discos

1. Clique em **"Avançar: Discos"**
2. Em "Tipo de disco do SO", selecione: **SSD Premium**
3. Mantenha as outras opções padrão
4. Clique em **"Avançar: Rede"**

### Passo 4: Configurar rede

1. Em "Rede virtual", clique em **"Criar nova"**
2. Nome: `VNET-FIFA2026`
3. Clique em **OK**
4. Mantenha as outras opções padrão
5. Clique em **"Revisar + criar"**

### Passo 5: Finalizar criação

1. Revise todas as configurações
2. Clique no botão azul **"Criar"**
3. **AGUARDE** - A criação leva de 5 a 15 minutos
4. Quando aparecer "Sua implantação foi concluída", clique em **"Ir para o recurso"**

### Passo 6: Anotar o IP da VM SQL

1. Na página da VM, procure por **"Endereço IP público"**
2. **ANOTE ESTE IP** - Você vai precisar depois (ex: 20.195.123.45)

---

## 1.3 Criar a VM do IIS (Servidor Web)

### Passo 1: Iniciar criação

1. Volte para o portal Azure (clique em "Microsoft Azure" no canto superior esquerdo)
2. Clique em **"+ Criar um recurso"**
3. Pesquise por: `Windows Server 2022 Datacenter`
4. Selecione a opção e clique em **"Criar"**

### Passo 2: Configurar dados básicos

| Campo | O que preencher |
|-------|-----------------|
| Assinatura | Mesma de antes |
| Grupo de recursos | Selecione: `FIFA2026-Resources` |
| Nome da máquina virtual | `VM-WEB-FIFA2026` |
| Região | **MESMA região** da VM SQL |
| Imagem | Windows Server 2022 Datacenter - x64 Gen2 |
| Tamanho | `Standard_B2s` (2 vCPUs, 4GB RAM) |
| Nome de usuário | `adminweb` (ou outro) |
| Senha | Crie uma senha forte (anote!) |
| Portas de entrada | Permitir portas selecionadas |
| Selecionar portas | Marque: RDP (3389), HTTP (80), HTTPS (443) |

### Passo 3: Configurar rede

1. Clique em **"Avançar: Discos"** → **"Avançar: Rede"**
2. Em "Rede virtual", selecione: `VNET-FIFA2026` (a mesma da VM SQL)
3. Clique em **"Revisar + criar"** → **"Criar"**
4. Aguarde a criação (5-15 minutos)

### Passo 4: Anotar o IP

1. Vá para o recurso criado
2. **ANOTE o IP público** desta VM também

---

# PARTE 2: CONFIGURAÇÃO DO SQL SERVER

## 2.1 Conectar à VM do SQL Server

### Passo 1: Abrir Conexão de Área de Trabalho Remota

1. No seu computador Windows, pressione a tecla **Windows**
2. Digite: `Conexão de Área de Trabalho Remota`
3. Clique para abrir o programa
4. No campo "Computador", digite o **IP público da VM SQL** (que você anotou)
5. Clique em **"Conectar"**

### Passo 2: Fazer login

1. Clique em **"Mais opções"** → **"Usar uma conta diferente"**
2. Em usuário, digite: `.\adminfifa` (ou o nome que você criou)
3. Digite a senha que você criou
4. Clique em **"OK"**
5. Se aparecer aviso de certificado, clique em **"Sim"**

### Passo 3: Aguardar Windows carregar

1. A primeira conexão pode demorar 2-5 minutos
2. Aguarde a área de trabalho do Windows Server aparecer completamente

## 2.2 Abrir o SQL Server Management Studio

1. Clique no ícone de **pesquisa** na barra de tarefas (lupa)
2. Digite: `SQL Server Management Studio`
3. Clique no programa para abrir (ícone azul)
4. **Aguarde** - a primeira abertura pode demorar

### Conectar ao banco de dados

1. Na janela "Connect to Server" que aparece:
   - Server type: `Database Engine`
   - Server name: deve mostrar o nome da VM automaticamente
   - Authentication: `Windows Authentication`
2. Clique em **"Connect"**

## 2.3 Criar o Banco de Dados

### Passo 1: Abrir nova janela de consulta

1. No menu superior, clique em **"New Query"** (ou pressione Ctrl+N)
2. Uma área em branco vai aparecer à direita

### Passo 2: Criar o banco de dados

1. **COPIE** o texto abaixo (selecione tudo e pressione Ctrl+C):

```sql
-- PASSO 1: CRIAR O BANCO DE DADOS
CREATE DATABASE FIFA2026Tickets;
GO
```

2. **COLE** na área de consulta (Ctrl+V)
3. Clique no botão **"Execute"** (ou pressione F5)
4. Deve aparecer a mensagem: "Commands completed successfully"

### Passo 3: Criar as tabelas

1. **APAGUE** o texto anterior
2. **COPIE e COLE** o texto abaixo:

```sql
-- PASSO 2: USAR O BANCO E CRIAR TABELAS
USE FIFA2026Tickets;
GO

-- Tabela de Usuários
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    role NVARCHAR(20) DEFAULT 'user',
    phone NVARCHAR(20),
    document NVARCHAR(20),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Tabela de Times/Seleções
CREATE TABLE teams (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    code NVARCHAR(3) NOT NULL UNIQUE,
    flag NVARCHAR(10),
    group_name NVARCHAR(1),
    confederation NVARCHAR(50),
    fifa_ranking INT,
    created_at DATETIME DEFAULT GETDATE()
);

-- Tabela de Estádios
CREATE TABLE stadiums (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(200) NOT NULL,
    city NVARCHAR(100) NOT NULL,
    country NVARCHAR(50) NOT NULL,
    capacity INT NOT NULL,
    image NVARCHAR(500),
    description NVARCHAR(MAX),
    address NVARCHAR(300),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at DATETIME DEFAULT GETDATE()
);

-- Tabela de Jogos/Partidas
CREATE TABLE matches (
    id INT IDENTITY(1,1) PRIMARY KEY,
    home_team_id INT REFERENCES teams(id),
    away_team_id INT REFERENCES teams(id),
    stadium_id INT REFERENCES stadiums(id),
    date DATE NOT NULL,
    time NVARCHAR(5) NOT NULL,
    stage NVARCHAR(50) NOT NULL,
    group_name NVARCHAR(1),
    home_score INT,
    away_score INT,
    status NVARCHAR(20) DEFAULT 'scheduled',
    created_at DATETIME DEFAULT GETDATE()
);

-- Tabela de Categorias de Ingressos
CREATE TABLE ticket_categories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    match_id INT REFERENCES matches(id) ON DELETE CASCADE,
    category NVARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    total_quantity INT NOT NULL,
    available_quantity INT NOT NULL,
    description NVARCHAR(200),
    created_at DATETIME DEFAULT GETDATE()
);

-- Tabela de Compras
CREATE TABLE purchases (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT REFERENCES users(id),
    ticket_category_id INT REFERENCES ticket_categories(id),
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status NVARCHAR(20) DEFAULT 'pending',
    payment_method NVARCHAR(50),
    transaction_id NVARCHAR(100),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Criar índices para melhor performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_matches_date ON matches(date);
CREATE INDEX idx_matches_stadium ON matches(stadium_id);
CREATE INDEX idx_ticket_categories_match ON ticket_categories(match_id);
CREATE INDEX idx_purchases_user ON purchases(user_id);

PRINT 'Todas as tabelas foram criadas com sucesso!';
GO
```

3. Clique em **"Execute"** (F5)
4. Verifique se aparece: "Todas as tabelas foram criadas com sucesso!"

### Passo 4: Inserir dados iniciais

1. **APAGUE** o texto anterior
2. **COPIE e COLE** este texto:

```sql
USE FIFA2026Tickets;
GO

-- INSERIR USUÁRIO ADMINISTRADOR
-- Email: admin@fifa2026.com | Senha: admin123
INSERT INTO users (name, email, password, role) VALUES 
('Administrador', 'admin@fifa2026.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- INSERIR SELEÇÕES
INSERT INTO teams (name, code, flag, group_name, confederation) VALUES
('Estados Unidos', 'USA', '🇺🇸', 'A', 'CONCACAF'),
('México', 'MEX', '🇲🇽', 'A', 'CONCACAF'),
('Canadá', 'CAN', '🇨🇦', 'A', 'CONCACAF'),
('Colômbia', 'COL', '🇨🇴', 'A', 'CONMEBOL'),
('Brasil', 'BRA', '🇧🇷', 'B', 'CONMEBOL'),
('Argentina', 'ARG', '🇦🇷', 'B', 'CONMEBOL'),
('Alemanha', 'GER', '🇩🇪', 'B', 'UEFA'),
('Japão', 'JPN', '🇯🇵', 'B', 'AFC'),
('França', 'FRA', '🇫🇷', 'C', 'UEFA'),
('Espanha', 'ESP', '🇪🇸', 'C', 'UEFA'),
('Portugal', 'POR', '🇵🇹', 'C', 'UEFA'),
('Marrocos', 'MAR', '🇲🇦', 'C', 'CAF'),
('Inglaterra', 'ENG', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'D', 'UEFA'),
('Holanda', 'NED', '🇳🇱', 'D', 'UEFA'),
('Itália', 'ITA', '🇮🇹', 'D', 'UEFA'),
('Uruguai', 'URU', '🇺🇾', 'D', 'CONMEBOL');

-- INSERIR ESTÁDIOS
INSERT INTO stadiums (name, city, country, capacity, description) VALUES
('MetLife Stadium', 'East Rutherford', 'Estados Unidos', 82500, 'Casa dos NY Giants e NY Jets - Palco da Final da Copa 2026'),
('AT&T Stadium', 'Arlington', 'Estados Unidos', 80000, 'Estádio dos Dallas Cowboys com teto retrátil impressionante'),
('SoFi Stadium', 'Los Angeles', 'Estados Unidos', 70000, 'O estádio mais moderno dos Estados Unidos'),
('Rose Bowl', 'Pasadena', 'Estados Unidos', 90000, 'Estádio histórico que já sediou finais de Copa do Mundo'),
('Lumen Field', 'Seattle', 'Estados Unidos', 69000, 'Casa do Seattle Sounders'),
('Estadio Azteca', 'Cidade do México', 'México', 87000, 'Lendário estádio mexicano - único a sediar 3 Copas'),
('Estadio BBVA', 'Monterrey', 'México', 53000, 'Estádio moderno do Rayados de Monterrey'),
('BC Place', 'Vancouver', 'Canadá', 54000, 'Principal estádio do Canadá com cúpula retrátil'),
('BMO Field', 'Toronto', 'Canadá', 45000, 'Casa do Toronto FC');

-- INSERIR JOGOS (Fase de Grupos)
INSERT INTO matches (home_team_id, away_team_id, stadium_id, date, time, stage, group_name) VALUES
-- Jogo de Abertura
(1, 2, 1, '2026-06-11', '17:00', 'Fase de Grupos', 'A'),
-- Grupo A
(3, 4, 8, '2026-06-12', '14:00', 'Fase de Grupos', 'A'),
(1, 3, 3, '2026-06-16', '17:00', 'Fase de Grupos', 'A'),
(2, 4, 6, '2026-06-16', '20:00', 'Fase de Grupos', 'A'),
-- Grupo B (Brasil)
(5, 8, 3, '2026-06-12', '17:00', 'Fase de Grupos', 'B'),
(6, 7, 2, '2026-06-12', '20:00', 'Fase de Grupos', 'B'),
(5, 7, 1, '2026-06-17', '14:00', 'Fase de Grupos', 'B'),
(6, 8, 4, '2026-06-17', '17:00', 'Fase de Grupos', 'B'),
-- Grupo C
(9, 12, 4, '2026-06-13', '14:00', 'Fase de Grupos', 'C'),
(10, 11, 5, '2026-06-13', '17:00', 'Fase de Grupos', 'C'),
-- Grupo D
(13, 16, 7, '2026-06-14', '14:00', 'Fase de Grupos', 'D'),
(14, 15, 9, '2026-06-14', '17:00', 'Fase de Grupos', 'D');

-- INSERIR CATEGORIAS DE INGRESSOS PARA CADA JOGO
DECLARE @match_id INT = 1;
WHILE @match_id <= 12
BEGIN
    INSERT INTO ticket_categories (match_id, category, price, total_quantity, available_quantity, description) VALUES
    (@match_id, 'Categoria 1 - Premium', 750.00, 5000, 5000, 'Melhor localização, vista central do campo'),
    (@match_id, 'Categoria 2 - Superior', 500.00, 10000, 10000, 'Ótima visibilidade, setores laterais superiores'),
    (@match_id, 'Categoria 3 - Intermediária', 300.00, 15000, 15000, 'Bom custo-benefício, visão completa do campo'),
    (@match_id, 'Categoria 4 - Popular', 150.00, 20000, 20000, 'Setores populares atrás dos gols');
    SET @match_id = @match_id + 1;
END

-- VERIFICAR SE TUDO FOI INSERIDO
SELECT 'RESUMO DOS DADOS INSERIDOS:' AS Info;
SELECT 'Usuários: ' + CAST(COUNT(*) AS VARCHAR) FROM users;
SELECT 'Times: ' + CAST(COUNT(*) AS VARCHAR) FROM teams;
SELECT 'Estádios: ' + CAST(COUNT(*) AS VARCHAR) FROM stadiums;
SELECT 'Jogos: ' + CAST(COUNT(*) AS VARCHAR) FROM matches;
SELECT 'Categorias de Ingressos: ' + CAST(COUNT(*) AS VARCHAR) FROM ticket_categories;

PRINT '';
PRINT '✅ TODOS OS DADOS FORAM INSERIDOS COM SUCESSO!';
PRINT '📧 Login do admin: admin@fifa2026.com';
PRINT '🔑 Senha do admin: admin123';
GO
```

3. Clique em **"Execute"** (F5)
4. Verifique se aparece a mensagem de sucesso e os totais de cada tabela

## 2.4 Criar Usuário para a Aplicação

### Por que fazer isso?
A aplicação precisa de um usuário específico para acessar o banco de dados. Isso é mais seguro do que usar o administrador.

1. **APAGUE** o texto anterior
2. **COPIE e COLE**:

```sql
-- CRIAR LOGIN PARA A APLICAÇÃO
USE master;
GO

-- Criar o login (usuário do servidor)
CREATE LOGIN fifa2026_app WITH PASSWORD = 'F1f@2026App!Secure#2024';
GO

-- Ir para o banco da aplicação
USE FIFA2026Tickets;
GO

-- Criar usuário no banco
CREATE USER fifa2026_app FOR LOGIN fifa2026_app;
GO

-- Dar permissões de leitura e escrita
ALTER ROLE db_datareader ADD MEMBER fifa2026_app;
ALTER ROLE db_datawriter ADD MEMBER fifa2026_app;
GO

PRINT '✅ Usuário da aplicação criado com sucesso!';
PRINT '👤 Usuário: fifa2026_app';
PRINT '🔑 Senha: F1f@2026App!Secure#2024';
GO
```

3. Clique em **"Execute"** (F5)
4. **ANOTE** o usuário e senha que aparecem na mensagem!

## 2.5 Configurar SQL Server para Aceitar Conexões de Rede

### Passo 1: Abrir SQL Server Configuration Manager

1. Clique no ícone de pesquisa (lupa) na barra de tarefas
2. Digite: `SQL Server Configuration Manager`
3. Clique para abrir

### Passo 2: Habilitar TCP/IP

1. No painel esquerdo, clique em **"SQL Server Network Configuration"**
2. Clique em **"Protocols for MSSQLSERVER"**
3. No painel direito, você verá uma lista de protocolos
4. Clique com o **botão direito** em **"TCP/IP"**
5. Clique em **"Enable"** (Habilitar)

### Passo 3: Configurar a porta 1433

1. Clique com o **botão direito** em **"TCP/IP"** novamente
2. Clique em **"Properties"** (Propriedades)
3. Clique na aba **"IP Addresses"**
4. Role até o final, até encontrar **"IPAll"**
5. Em **"TCP Port"**, digite: `1433`
6. Apague qualquer valor em "TCP Dynamic Ports" (deixe em branco)
7. Clique em **"OK"**

### Passo 4: Reiniciar o SQL Server

1. No painel esquerdo, clique em **"SQL Server Services"**
2. No painel direito, clique com o **botão direito** em **"SQL Server (MSSQLSERVER)"**
3. Clique em **"Restart"**
4. Aguarde o serviço reiniciar (ícone fica verde)

## 2.6 Configurar Firewall do Windows

### Passo 1: Abrir PowerShell como Administrador

1. Clique com o **botão direito** no menu Iniciar (ícone Windows)
2. Clique em **"Windows PowerShell (Admin)"** ou **"Terminal (Admin)"**
3. Se aparecer pergunta de permissão, clique em **"Sim"**

### Passo 2: Adicionar regra de firewall

1. **COPIE** o comando abaixo:

```powershell
New-NetFirewallRule -DisplayName "SQL Server" -Direction Inbound -Protocol TCP -LocalPort 1433 -Action Allow
```

2. **COLE** no PowerShell (clique com botão direito para colar)
3. Pressione **Enter**
4. Deve aparecer uma tabela mostrando que a regra foi criada

### Passo 3: Verificar a regra

```powershell
Get-NetFirewallRule -DisplayName "SQL Server"
```

Se aparecer informações sobre a regra, está funcionando!

---

# PARTE 3: CONFIGURAÇÃO DO WINDOWS SERVER (IIS)

## 3.1 Conectar à VM do IIS

1. No seu computador, abra **"Conexão de Área de Trabalho Remota"**
2. Digite o **IP público da VM WEB** (que você anotou antes)
3. Conecte com o usuário e senha que você criou (ex: `adminweb`)

## 3.2 Instalar o IIS (Servidor Web)

### Passo 1: Abrir PowerShell como Administrador

1. Clique com o **botão direito** no menu Iniciar
2. Clique em **"Windows PowerShell (Admin)"**
3. Clique em **"Sim"** se pedir permissão

### Passo 2: Instalar IIS e componentes

1. **COPIE** todos os comandos abaixo:

```powershell
# Instalar IIS com todos os recursos necessários
Write-Host "Instalando IIS..." -ForegroundColor Green
Install-WindowsFeature -Name Web-Server -IncludeManagementTools

Write-Host "Instalando recursos adicionais do IIS..." -ForegroundColor Green
Install-WindowsFeature -Name Web-WebSockets
Install-WindowsFeature -Name Web-Stat-Compression
Install-WindowsFeature -Name Web-Dyn-Compression

Write-Host "✅ IIS instalado com sucesso!" -ForegroundColor Green
```

2. **COLE** no PowerShell
3. Pressione **Enter**
4. **AGUARDE** - a instalação pode levar 5-10 minutos
5. Quando terminar, aparecerá "✅ IIS instalado com sucesso!"

### Passo 3: Verificar se IIS está funcionando

1. Abra o navegador **Edge** dentro da VM
2. Digite na barra de endereço: `http://localhost`
3. Deve aparecer a página padrão do IIS (fundo azul com logo do IIS)

## 3.3 Instalar Node.js

### Passo 1: Baixar Node.js

1. Abra o navegador **Edge** dentro da VM
2. Acesse: `https://nodejs.org/`
3. Clique no botão verde **"LTS"** (versão recomendada)
4. O download vai começar automaticamente

### Passo 2: Instalar Node.js

1. Abra a pasta de Downloads
2. **Dê duplo clique** no arquivo baixado (ex: `node-v20.xx.x-x64.msi`)
3. Clique em **"Next"** (Avançar)
4. Aceite os termos → **"Next"**
5. Mantenha o caminho padrão → **"Next"**
6. Mantenha todas as opções marcadas → **"Next"**
7. **MARQUE** a opção "Automatically install the necessary tools..." se aparecer
8. Clique em **"Install"**
9. Clique em **"Sim"** se pedir permissão
10. Aguarde a instalação
11. Clique em **"Finish"**

### Passo 3: Verificar instalação

1. **Feche** e **abra novamente** o PowerShell (Admin)
2. Digite:

```powershell
node --version
```

3. Deve aparecer algo como: `v20.10.0`
4. Digite:

```powershell
npm --version
```

5. Deve aparecer algo como: `10.2.0`

## 3.4 Instalar iisnode

### O que é iisnode?
É um módulo que permite o IIS executar aplicações Node.js.

### Passo 1: Baixar iisnode

1. No navegador, acesse: `https://github.com/Azure/iisnode/releases`
2. Procure pela versão mais recente
3. Clique em **"iisnode-full-v0.2.26-x64.msi"** (ou versão mais recente)
4. Aguarde o download

### Passo 2: Instalar

1. Abra a pasta de Downloads
2. **Dê duplo clique** no arquivo `iisnode-full-*.msi`
3. Clique em **"Next"** em todas as telas
4. Clique em **"Install"**
5. Clique em **"Finish"**

### Passo 3: Reiniciar IIS

```powershell
iisreset
```

## 3.5 Instalar URL Rewrite Module

### O que é URL Rewrite?
Permite que o IIS redirecione URLs corretamente para aplicações React.

### Passo 1: Baixar

1. No navegador, acesse: `https://www.iis.net/downloads/microsoft/url-rewrite`
2. Clique em **"Install this extension"** ou baixe o instalador
3. Ou acesse diretamente: `https://download.microsoft.com/download/1/2/8/128E2E22-C1B9-44A4-BE2A-5859ED1D4592/rewrite_amd64_en-US.msi`

### Passo 2: Instalar

1. Execute o arquivo baixado
2. Aceite os termos
3. Clique em **"Install"**
4. Clique em **"Finish"**

### Passo 3: Reiniciar IIS novamente

```powershell
iisreset
```

---

# PARTE 4: DEPLOY DO BACKEND (API)

## 4.1 Criar Estrutura de Pastas

### No PowerShell (Admin):

```powershell
# Criar pasta para o backend
New-Item -ItemType Directory -Path "C:\inetpub\wwwroot\fifa2026-api" -Force

# Criar pasta para logs
New-Item -ItemType Directory -Path "C:\inetpub\wwwroot\fifa2026-api\logs" -Force

Write-Host "✅ Pastas criadas!" -ForegroundColor Green
```

## 4.2 Copiar Arquivos do Backend

### Opção A: Se você tem acesso ao GitHub

1. No PowerShell, instale o Git:

```powershell
winget install Git.Git
```

2. Clone o repositório:

```powershell
cd C:\inetpub\wwwroot\fifa2026-api
git clone SEU_REPOSITORIO_AQUI .
```

### Opção B: Copiar manualmente

1. No seu computador local, exporte o código do Lovable para o GitHub
2. Baixe o ZIP do repositório
3. Extraia o conteúdo da pasta `backend` para `C:\inetpub\wwwroot\fifa2026-api`

A estrutura deve ficar assim:
```
C:\inetpub\wwwroot\fifa2026-api\
├── package.json
├── src\
│   ├── index.js
│   ├── config\
│   │   └── database.js
│   ├── middleware\
│   │   └── auth.js
│   └── routes\
│       ├── auth.js
│       ├── matches.js
│       ├── stadiums.js
│       ├── teams.js
│       ├── tickets.js
│       └── users.js
└── logs\
```

## 4.3 Criar Arquivo de Configuração (.env)

### Passo 1: Criar o arquivo

1. Abra o **Bloco de Notas** (Notepad)
2. **COPIE e COLE** o conteúdo abaixo:

```env
# Configuração do Servidor
PORT=3001
NODE_ENV=production

# Configuração do SQL Server
# IMPORTANTE: Substitua IP_DO_SQL_SERVER pelo IP privado da sua VM SQL
DB_SERVER=10.0.0.4
DB_PORT=1433
DB_USER=fifa2026_app
DB_PASSWORD=F1f@2026App!Secure#2024
DB_NAME=FIFA2026Tickets

# Chave secreta para tokens JWT (NÃO COMPARTILHE!)
JWT_SECRET=MinhaCh@veSecr3ta!FIFA2026#Pr0j3ct!2024

# URLs permitidas
CORS_ORIGIN=*
```

3. **IMPORTANTE:** Substitua `10.0.0.4` pelo IP **privado** da sua VM SQL Server
   - Para encontrar: No portal Azure → VM SQL → Visão geral → "Endereço IP privado"

### Passo 2: Salvar o arquivo

1. No Bloco de Notas, clique em **Arquivo** → **Salvar como**
2. Navegue até: `C:\inetpub\wwwroot\fifa2026-api`
3. Em "Nome do arquivo", digite: `.env` (com o ponto na frente!)
4. Em "Tipo", selecione: **Todos os Arquivos (*.*)**
5. Clique em **Salvar**

## 4.4 Criar Arquivo web.config

### Passo 1: Criar o arquivo

1. Abra o **Bloco de Notas**
2. **COPIE e COLE**:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    
    <!-- Configurar o iisnode para executar Node.js -->
    <handlers>
      <add name="iisnode" path="src/index.js" verb="*" modules="iisnode" />
    </handlers>
    
    <!-- Redirecionar todas as requisições para o Node.js -->
    <rewrite>
      <rules>
        <rule name="API">
          <match url="/*" />
          <action type="Rewrite" url="src/index.js" />
        </rule>
      </rules>
    </rewrite>
    
    <!-- Configurações do iisnode -->
    <iisnode 
      nodeProcessCommandLine="&quot;C:\Program Files\nodejs\node.exe&quot;"
      loggingEnabled="true"
      logDirectory="logs"
      watchedFiles="*.js;*.json"
      node_env="production"
    />
    
    <!-- Segurança: esconder arquivos sensíveis -->
    <security>
      <requestFiltering>
        <hiddenSegments>
          <add segment="node_modules" />
          <add segment=".env" />
          <add segment="logs" />
        </hiddenSegments>
      </requestFiltering>
    </security>
    
    <!-- Permitir que erros passem para o Node.js -->
    <httpErrors existingResponse="PassThrough" />
    
  </system.webServer>
</configuration>
```

### Passo 2: Salvar

1. **Arquivo** → **Salvar como**
2. Local: `C:\inetpub\wwwroot\fifa2026-api`
3. Nome: `web.config`
4. Tipo: **Todos os Arquivos (*.*)**
5. **Salvar**

## 4.5 Instalar Dependências do Node.js

### No PowerShell (Admin):

```powershell
# Ir para a pasta do backend
cd C:\inetpub\wwwroot\fifa2026-api

# Instalar todas as dependências
npm install

# Aguarde... pode levar alguns minutos
```

Se aparecerem warnings (avisos em amarelo), pode ignorar. Se aparecerem erros (em vermelho), algo deu errado.

## 4.6 Configurar Permissões da Pasta

```powershell
# Dar permissão ao IIS para acessar a pasta
$acl = Get-Acl "C:\inetpub\wwwroot\fifa2026-api"
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule("IIS_IUSRS", "FullControl", "ContainerInherit,ObjectInherit", "None", "Allow")
$acl.SetAccessRule($rule)
Set-Acl "C:\inetpub\wwwroot\fifa2026-api" $acl

$rule2 = New-Object System.Security.AccessControl.FileSystemAccessRule("IUSR", "FullControl", "ContainerInherit,ObjectInherit", "None", "Allow")
$acl.SetAccessRule($rule2)
Set-Acl "C:\inetpub\wwwroot\fifa2026-api" $acl

Write-Host "✅ Permissões configuradas!" -ForegroundColor Green
```

## 4.7 Criar Site no IIS

### Passo 1: Abrir o Gerenciador do IIS

1. Clique no ícone de pesquisa
2. Digite: `IIS`
3. Clique em **"Gerenciador do Serviços de Informações da Internet (IIS)"**

### Passo 2: Criar o site

1. No painel esquerdo, expanda o nome do servidor
2. Clique com o **botão direito** em **"Sites"**
3. Clique em **"Adicionar Site..."** (Add Website)

### Passo 3: Configurar o site

Preencha os campos:

| Campo | Valor |
|-------|-------|
| Nome do site | `FIFA2026-API` |
| Caminho físico | Clique em `...` → Navegue até `C:\inetpub\wwwroot\fifa2026-api` → OK |
| Tipo | `http` |
| Endereço IP | Todos não atribuídos |
| Porta | `3001` |
| Nome do host | (deixe em branco) |

4. Clique em **"OK"**

### Passo 4: Configurar o Application Pool

1. No painel esquerdo, clique em **"Pools de Aplicativos"**
2. Encontre **"FIFA2026-API"** na lista
3. Clique com o **botão direito** → **"Configurações Avançadas..."**
4. Encontre **"Versão do .NET CLR"**
5. Mude para: **"Sem Código Gerenciado"** (No Managed Code)
6. Clique em **"OK"**

### Passo 5: Iniciar o site

1. Volte para **"Sites"** no painel esquerdo
2. Clique em **"FIFA2026-API"**
3. No painel direito, clique em **"Iniciar"** (se não estiver iniciado)

## 4.8 Testar o Backend

### No navegador (dentro da VM):

1. Acesse: `http://localhost:3001/api/health`
2. Deve aparecer: `{"status":"OK","timestamp":"..."}`

### No PowerShell:

```powershell
# Testar se a API está respondendo
Invoke-RestMethod -Uri "http://localhost:3001/api/health"

# Testar listagem de times
Invoke-RestMethod -Uri "http://localhost:3001/api/teams"

# Testar listagem de jogos
Invoke-RestMethod -Uri "http://localhost:3001/api/matches"
```

Se os comandos retornarem dados, o backend está funcionando! 🎉

---

# PARTE 5: DEPLOY DO FRONTEND (SITE)

## 5.1 Instalar URL Rewrite e ARR no IIS

O frontend usará **URLs relativas** (`/api/...`) e o IIS fará proxy para o backend Node.js. Isso é mais seguro pois não precisa expor a porta 3001 publicamente.

### Passo 1: Baixar e Instalar URL Rewrite

1. Na VM, abra o navegador e acesse:
   `https://www.iis.net/downloads/microsoft/url-rewrite`
2. Clique em **"Install this extension"**
3. Execute o instalador e siga as instruções

### Passo 2: Baixar e Instalar ARR (Application Request Routing)

1. Acesse: `https://www.iis.net/downloads/microsoft/application-request-routing`
2. Clique em **"Install this extension"**
3. Execute o instalador e siga as instruções

### Passo 3: Habilitar Proxy no ARR

1. Abra o **Gerenciador do IIS**
2. Clique no nome do servidor (primeiro item da árvore)
3. No painel central, dê duplo clique em **"Application Request Routing Cache"**
4. No painel direito, clique em **"Server Proxy Settings..."**
5. Marque a opção **"Enable proxy"**
6. Clique em **"Apply"** no painel direito

**Alternativa via PowerShell (Admin):**
```powershell
# Habilitar ARR proxy via linha de comando
%windir%\system32\inetsrv\appcmd.exe set config -section:system.webServer/proxy -enabled:true -commit:apphost
```

## 5.2 Preparar o Build do Frontend

### No seu computador local (não na VM):

1. Abra o projeto no **Lovable**
2. Exporte para o **GitHub** (se ainda não fez)
3. Clone o repositório no seu computador
4. Abra o terminal/prompt de comando
5. Navegue até a pasta do projeto

### Fazer o Build

```bash
npm install
npm run build
```

Isso vai criar uma pasta chamada `dist` com todos os arquivos do site.

**NOTA:** Não precisa alterar nenhum arquivo! O frontend já está configurado para usar URLs relativas (`/api/...`).

## 5.3 Copiar Arquivos para a VM

### Opção A: Usando OneDrive/Google Drive

1. Compacte a pasta `dist` em um arquivo ZIP
2. Faça upload para OneDrive/Google Drive
3. Na VM, baixe e extraia

### Opção B: Copiar via Área de Trabalho Remota

1. No seu computador, selecione a pasta `dist`
2. Pressione **Ctrl+C**
3. Na janela de Área de Trabalho Remota (VM), pressione **Ctrl+V**
4. Os arquivos serão copiados

### Criar pasta e mover arquivos

Na VM, no PowerShell:

```powershell
# Criar pasta para o frontend
New-Item -ItemType Directory -Path "C:\inetpub\wwwroot\fifa2026-web" -Force
```

Mova o conteúdo da pasta `dist` para `C:\inetpub\wwwroot\fifa2026-web`

## 5.4 Criar web.config do Frontend (COM PROXY PARA API)

**IMPORTANTE:** Este web.config inclui a regra de proxy para encaminhar `/api/*` para o backend Node.js!

1. Abra o **Bloco de Notas**
2. **COPIE e COLE**:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    
    <!-- Reescrever URLs -->
    <rewrite>
      <rules>
        
        <!-- PROXY: Encaminhar /api/* para o backend Node.js -->
        <rule name="API Proxy" stopProcessing="true">
          <match url="^api/(.*)" />
          <action type="Rewrite" url="http://localhost:3001/api/{R:1}" />
        </rule>
        
        <!-- React Router: Redirecionar rotas para index.html -->
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
        
      </rules>
    </rewrite>
    
    <!-- Configurar tipos de arquivos -->
    <staticContent>
      <remove fileExtension=".js" />
      <mimeMap fileExtension=".js" mimeType="application/javascript" />
      <remove fileExtension=".json" />
      <mimeMap fileExtension=".json" mimeType="application/json" />
      <remove fileExtension=".woff" />
      <mimeMap fileExtension=".woff" mimeType="font/woff" />
      <remove fileExtension=".woff2" />
      <mimeMap fileExtension=".woff2" mimeType="font/woff2" />
      <remove fileExtension=".svg" />
      <mimeMap fileExtension=".svg" mimeType="image/svg+xml" />
    </staticContent>
    
    <!-- Configurar cache para melhor performance -->
    <caching>
      <profiles>
        <add extension=".js" policy="CacheUntilChange" kernelCachePolicy="CacheUntilChange" />
        <add extension=".css" policy="CacheUntilChange" kernelCachePolicy="CacheUntilChange" />
        <add extension=".png" policy="CacheUntilChange" kernelCachePolicy="CacheUntilChange" />
        <add extension=".jpg" policy="CacheUntilChange" kernelCachePolicy="CacheUntilChange" />
      </profiles>
    </caching>
    
  </system.webServer>
</configuration>
```

3. **Salvar como:**
   - Local: `C:\inetpub\wwwroot\fifa2026-web`
   - Nome: `web.config`
   - Tipo: Todos os Arquivos

## 5.4 Criar Site no IIS

1. Abra o **Gerenciador do IIS**
2. Clique com botão direito em **"Sites"** → **"Adicionar Site..."**
3. Configure:

| Campo | Valor |
|-------|-------|
| Nome do site | `FIFA2026-Web` |
| Caminho físico | `C:\inetpub\wwwroot\fifa2026-web` |
| Porta | `80` |

4. Clique em **"OK"**

**NOTA:** Se aparecer erro dizendo que a porta 80 já está em uso:
1. Pare o site "Default Web Site" (clique nele → Parar)
2. Tente criar o site novamente

## 5.5 Testar o Frontend

1. Abra o navegador
2. Acesse: `http://localhost`
3. O site FIFA 2026 deve aparecer! 🎉

---

# PARTE 6: CONFIGURAÇÃO DE REDE E FIREWALL

## 6.1 Firewall do Windows (VM IIS)

### No PowerShell (Admin):

```powershell
# Permitir HTTP (porta 80)
New-NetFirewallRule -DisplayName "HTTP" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow

# Permitir HTTPS (porta 443)
New-NetFirewallRule -DisplayName "HTTPS" -Direction Inbound -Protocol TCP -LocalPort 443 -Action Allow

Write-Host "✅ Regras de firewall criadas!" -ForegroundColor Green
```

**NOTA:** Não precisa abrir a porta 3001 no firewall! O backend é acessado apenas internamente via localhost pelo proxy do IIS.

## 6.2 Configurar NSG no Azure (OBRIGATÓRIO!)

### O que é NSG?
Network Security Group - é o firewall do Azure que controla o tráfego de rede para suas VMs.

### Passo 1: Acessar NSG da VM IIS

1. Vá ao **Portal Azure** (portal.azure.com)
2. Pesquise por: `VM-WEB-FIFA2026`
3. Clique na VM
4. No menu lateral, clique em **"Rede"** (Networking)

### Passo 2: Adicionar regra para porta 80 (HTTP)

1. Clique em **"Adicionar regra de porta de entrada"** (Add inbound port rule)
2. Configure:

| Campo | Valor |
|-------|-------|
| Fonte | Any |
| Intervalos de porta de origem | * |
| Destino | Any |
| Intervalos de porta de destino | 80 |
| Protocolo | TCP |
| Ação | Permitir |
| Prioridade | 100 |
| Nome | `Allow-HTTP` |

3. Clique em **"Adicionar"**

**NOTA:** Não é necessário abrir a porta 3001 no NSG! O frontend acessa a API via proxy interno do IIS (localhost:3001), que é mais seguro.

### Passo 3: Adicionar regra para porta 443 (HTTPS) - Opcional

1. Repita o processo para porta `443`
2. Prioridade: `120`
3. Nome: `Allow-HTTPS`

## 6.3 Configurar NSG da VM SQL

### Importante: Por segurança, a porta SQL só deve ser acessível pela VM IIS

1. Vá ao Portal Azure
2. Encontre a VM: `VM-SQL-FIFA2026`
3. Clique em **"Rede"**
4. Clique em **"Adicionar regra de porta de entrada"**
5. Configure:

| Campo | Valor |
|-------|-------|
| Fonte | IP Addresses |
| Endereços IP de origem | (IP privado da VM IIS, ex: 10.0.0.5) |
| Intervalos de porta de destino | 1433 |
| Protocolo | TCP |
| Ação | Permitir |
| Nome | `Allow-SQL-FromWebVM` |

---

# PARTE 7: TESTES E VERIFICAÇÃO

## 7.1 Testar Conexão SQL → IIS

### Na VM IIS, no PowerShell:

```powershell
# Substituir pelo IP privado da VM SQL
Test-NetConnection -ComputerName 10.0.0.4 -Port 1433
```

**Resultado esperado:**
- `TcpTestSucceeded: True`

Se der `False`, verifique:
- Firewall da VM SQL
- NSG do Azure
- Se o SQL Server está rodando

## 7.2 Testar API

### No navegador (dentro da VM IIS):

```
http://localhost:3001/api/health
http://localhost:3001/api/teams
http://localhost:3001/api/matches
http://localhost:3001/api/stadiums
```

### No PowerShell:

```powershell
# Testar health
Invoke-RestMethod -Uri "http://localhost:3001/api/health"

# Testar times
Invoke-RestMethod -Uri "http://localhost:3001/api/teams" | ConvertTo-Json

# Testar login
$body = @{
    email = "admin@fifa2026.com"
    password = "admin123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

## 7.3 Testar Site (Acesso Externo)

1. No seu computador (não na VM), abra o navegador
2. Digite o **IP público da VM IIS** (ex: `http://20.195.xxx.xxx`)
3. O site deve carregar!

## 7.4 Checklist Final

Marque cada item conforme for verificando:

- [ ] VM SQL Server criada e rodando
- [ ] SQL Server instalado e configurado
- [ ] TCP/IP habilitado no SQL Server
- [ ] Banco de dados FIFA2026Tickets criado
- [ ] Tabelas criadas e com dados
- [ ] Usuário fifa2026_app criado
- [ ] Firewall da VM SQL configurado (porta 1433)
- [ ] VM IIS criada e rodando
- [ ] IIS instalado
- [ ] Node.js instalado
- [ ] iisnode instalado
- [ ] URL Rewrite instalado
- [ ] Backend copiado para C:\inetpub\wwwroot\fifa2026-api
- [ ] Arquivo .env configurado com IP do SQL
- [ ] web.config do backend criado
- [ ] npm install executado
- [ ] Site FIFA2026-API criado no IIS (porta 3001)
- [ ] Frontend copiado para C:\inetpub\wwwroot\fifa2026-web
- [ ] web.config do frontend criado
- [ ] Site FIFA2026-Web criado no IIS (porta 80)
- [ ] Firewall do Windows configurado
- [ ] NSG do Azure configurado
- [ ] Testes de conexão funcionando
- [ ] Site acessível pelo IP público

---

# PARTE 8: SOLUÇÃO DE PROBLEMAS

## Erro: "Não consegue conectar ao SQL Server"

### Possíveis causas e soluções:

1. **TCP/IP não habilitado:**
   - Abra SQL Server Configuration Manager
   - Habilite TCP/IP
   - Reinicie SQL Server

2. **Firewall bloqueando:**
   - Verifique regra para porta 1433 no Windows Firewall
   - Verifique NSG no Azure

3. **IP errado no .env:**
   - Use o IP **privado** da VM SQL, não o público
   - Verifique no Azure Portal

## Erro: "500 Internal Server Error" na API

### Verificar logs:

1. Abra a pasta: `C:\inetpub\wwwroot\fifa2026-api\logs`
2. Abra o arquivo de log mais recente
3. Procure por mensagens de erro

### Causas comuns:

1. **Arquivo .env não existe ou está errado**
2. **Dependências não instaladas** (rode `npm install`)
3. **Caminho do Node.js errado** no web.config

## Erro: "404 Not Found" no Frontend

### Verificar:

1. URL Rewrite está instalado?
2. web.config existe na pasta do frontend?
3. O arquivo index.html existe na pasta?

## Erro: "Site não carrega"

### No IIS Manager:

1. Verifique se o Application Pool está iniciado
2. Verifique se o Site está iniciado
3. Clique com botão direito no site → "Procurar" para testar

### Verificar eventos do Windows:

1. Pressione **Win + R**
2. Digite: `eventvwr.msc`
3. Vá em: Logs do Windows → Aplicativo
4. Procure por erros relacionados ao IIS

## API funciona, mas Frontend não conecta

### Verificar CORS:

1. No arquivo `.env` do backend, verifique `CORS_ORIGIN`
2. Para testes, use: `CORS_ORIGIN=*`

### Verificar URL da API no Frontend:

1. Verifique se o IP no `src/lib/api.ts` está correto
2. Refaça o build e copie novamente

---

# 📞 INFORMAÇÕES IMPORTANTES

## Credenciais Padrão

| Sistema | Usuário | Senha |
|---------|---------|-------|
| Aplicação (Admin) | admin@fifa2026.com | admin123 |
| SQL Server (App) | fifa2026_app | F1f@2026App!Secure#2024 |

## Portas Utilizadas

| Serviço | Porta |
|---------|-------|
| Site (Frontend) | 80 |
| API (Backend) | 3001 |
| SQL Server | 1433 |
| Área de Trabalho Remota | 3389 |

## Caminhos Importantes

| Item | Caminho |
|------|---------|
| Backend | C:\inetpub\wwwroot\fifa2026-api |
| Frontend | C:\inetpub\wwwroot\fifa2026-web |
| Logs do Backend | C:\inetpub\wwwroot\fifa2026-api\logs |
| Logs do IIS | C:\inetpub\logs\LogFiles |

---

**🎉 Parabéns! Se você chegou até aqui e tudo está funcionando, seu sistema FIFA 2026 Tickets está no ar!**
