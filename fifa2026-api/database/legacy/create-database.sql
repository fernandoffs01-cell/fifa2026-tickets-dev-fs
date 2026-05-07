-- =====================================================
-- FIFA 2026 TICKETS - SCRIPT DE CRIAÇÃO DO BANCO
-- Execute este script no SQL Server Management Studio
-- =====================================================

-- PASSO 1: CRIAR O BANCO DE DADOS
-- (Se o banco já existe, apague com: DROP DATABASE FIFA2026Tickets;)
CREATE DATABASE FIFA2026Tickets;
GO

USE FIFA2026Tickets;
GO

-- =====================================================
-- PASSO 2: CRIAR AS TABELAS
-- =====================================================

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
    flag NVARCHAR(100),
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

-- Índices para melhor performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_matches_date ON matches(date);
CREATE INDEX idx_matches_stadium ON matches(stadium_id);
CREATE INDEX idx_ticket_categories_match ON ticket_categories(match_id);
CREATE INDEX idx_purchases_user ON purchases(user_id);
GO

-- =====================================================
-- PASSO 3: INSERIR DADOS INICIAIS
-- =====================================================

-- Usuário Administrador (Email: admin@fifa2026.com | Senha: admin123)
INSERT INTO users (name, email, password, role) VALUES 
('Administrador', 'admin@fifa2026.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Seleções (usando código da bandeira ao invés de emoji)
INSERT INTO teams (name, code, flag, group_name, confederation) VALUES
('Estados Unidos', 'USA', 'US', 'A', 'CONCACAF'),
('Mexico', 'MEX', 'MX', 'A', 'CONCACAF'),
('Canada', 'CAN', 'CA', 'A', 'CONCACAF'),
('Colombia', 'COL', 'CO', 'A', 'CONMEBOL'),
('Brasil', 'BRA', 'BR', 'B', 'CONMEBOL'),
('Argentina', 'ARG', 'AR', 'B', 'CONMEBOL'),
('Alemanha', 'GER', 'DE', 'B', 'UEFA'),
('Japao', 'JPN', 'JP', 'B', 'AFC'),
('Franca', 'FRA', 'FR', 'C', 'UEFA'),
('Espanha', 'ESP', 'ES', 'C', 'UEFA'),
('Portugal', 'POR', 'PT', 'C', 'UEFA'),
('Marrocos', 'MAR', 'MA', 'C', 'CAF'),
('Inglaterra', 'ENG', 'GB-ENG', 'D', 'UEFA'),
('Holanda', 'NED', 'NL', 'D', 'UEFA'),
('Italia', 'ITA', 'IT', 'D', 'UEFA'),
('Uruguai', 'URU', 'UY', 'D', 'CONMEBOL');

-- Estádios
INSERT INTO stadiums (name, city, country, capacity, description) VALUES
('MetLife Stadium', 'East Rutherford', 'Estados Unidos', 82500, 'Casa dos NY Giants e NY Jets - Palco da Final da Copa 2026'),
('AT&T Stadium', 'Arlington', 'Estados Unidos', 80000, 'Estadio dos Dallas Cowboys com teto retratil impressionante'),
('SoFi Stadium', 'Los Angeles', 'Estados Unidos', 70000, 'O estadio mais moderno dos Estados Unidos'),
('Rose Bowl', 'Pasadena', 'Estados Unidos', 90000, 'Estadio historico que ja sediou finais de Copa do Mundo'),
('Lumen Field', 'Seattle', 'Estados Unidos', 69000, 'Casa do Seattle Sounders'),
('Estadio Azteca', 'Cidade do Mexico', 'Mexico', 87000, 'Lendario estadio mexicano - unico a sediar 3 Copas'),
('Estadio BBVA', 'Monterrey', 'Mexico', 53000, 'Estadio moderno do Rayados de Monterrey'),
('BC Place', 'Vancouver', 'Canada', 54000, 'Principal estadio do Canada com cupula retratil'),
('BMO Field', 'Toronto', 'Canada', 45000, 'Casa do Toronto FC');

-- Jogos (Fase de Grupos)
INSERT INTO matches (home_team_id, away_team_id, stadium_id, date, time, stage, group_name) VALUES
(1, 2, 1, '2026-06-11', '17:00', 'Fase de Grupos', 'A'),
(3, 4, 8, '2026-06-12', '14:00', 'Fase de Grupos', 'A'),
(1, 3, 3, '2026-06-16', '17:00', 'Fase de Grupos', 'A'),
(2, 4, 6, '2026-06-16', '20:00', 'Fase de Grupos', 'A'),
(5, 8, 3, '2026-06-12', '17:00', 'Fase de Grupos', 'B'),
(6, 7, 2, '2026-06-12', '20:00', 'Fase de Grupos', 'B'),
(5, 7, 1, '2026-06-17', '14:00', 'Fase de Grupos', 'B'),
(6, 8, 4, '2026-06-17', '17:00', 'Fase de Grupos', 'B'),
(9, 12, 4, '2026-06-13', '14:00', 'Fase de Grupos', 'C'),
(10, 11, 5, '2026-06-13', '17:00', 'Fase de Grupos', 'C'),
(13, 16, 7, '2026-06-14', '14:00', 'Fase de Grupos', 'D'),
(14, 15, 9, '2026-06-14', '17:00', 'Fase de Grupos', 'D');

-- Categorias de Ingressos para cada jogo
DECLARE @match_id INT = 1;
WHILE @match_id <= 12
BEGIN
    INSERT INTO ticket_categories (match_id, category, price, total_quantity, available_quantity, description) VALUES
    (@match_id, 'Categoria 1 - Premium', 750.00, 5000, 5000, 'Melhor localizacao, vista central do campo'),
    (@match_id, 'Categoria 2 - Superior', 500.00, 10000, 10000, 'Otima visibilidade, setores laterais superiores'),
    (@match_id, 'Categoria 3 - Intermediaria', 300.00, 15000, 15000, 'Bom custo-beneficio, visao completa do campo'),
    (@match_id, 'Categoria 4 - Popular', 150.00, 20000, 20000, 'Setores populares atras dos gols');
    SET @match_id = @match_id + 1;
END
GO

-- =====================================================
-- PASSO 4: CRIAR USUÁRIO DA APLICAÇÃO
-- =====================================================

USE master;
GO

-- Criar login (se ja existe, ignore o erro)
IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = 'fifa2026_app')
BEGIN
    CREATE LOGIN fifa2026_app WITH PASSWORD = 'F1f@2026App!Secure#2024';
END
GO

USE FIFA2026Tickets;
GO

-- Criar usuario e dar permissoes
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'fifa2026_app')
BEGIN
    CREATE USER fifa2026_app FOR LOGIN fifa2026_app;
    ALTER ROLE db_datareader ADD MEMBER fifa2026_app;
    ALTER ROLE db_datawriter ADD MEMBER fifa2026_app;
END
GO

-- =====================================================
-- VERIFICAÇÃO FINAL
-- =====================================================

SELECT 'Tabelas criadas:' AS Info;
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE';

SELECT 'Contagem de registros:' AS Info;
SELECT 'Users' AS Tabela, COUNT(*) AS Total FROM users
UNION ALL SELECT 'Teams', COUNT(*) FROM teams
UNION ALL SELECT 'Stadiums', COUNT(*) FROM stadiums
UNION ALL SELECT 'Matches', COUNT(*) FROM matches
UNION ALL SELECT 'Ticket Categories', COUNT(*) FROM ticket_categories;

PRINT '';
PRINT '=====================================================';
PRINT 'BANCO DE DADOS CRIADO COM SUCESSO!';
PRINT '=====================================================';
PRINT 'Login Admin: admin@fifa2026.com';
PRINT 'Senha Admin: admin123';
PRINT '';
PRINT 'Usuario App: fifa2026_app';
PRINT 'Senha App: F1f@2026App!Secure#2024';
PRINT '=====================================================';
GO
