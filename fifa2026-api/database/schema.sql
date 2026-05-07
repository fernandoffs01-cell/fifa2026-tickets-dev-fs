-- =====================================================
-- FIFA 2026 TICKETS - SCHEMA CANÔNICO
-- Origem: extraído de FIFA2026Tickets.bacpac (model.xml)
-- Compatível com: SQL Server 2019+ e Azure SQL Database
-- =====================================================
-- Este script cria APENAS as tabelas, FKs e índices.
-- Não cria o database (use o bacpac para restore completo)
-- nem login/usuário (criação varia entre VM e Azure SQL).
-- =====================================================

-- ----------------------------------------------------
-- Tabela: users
-- ----------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE users (
        id            INT IDENTITY(1,1) NOT NULL,
        name          NVARCHAR(100) NOT NULL,
        email         NVARCHAR(255) NOT NULL,
        password      NVARCHAR(255) NOT NULL,
        role          NVARCHAR(20)  NULL CONSTRAINT DF_users_role       DEFAULT ('user'),
        phone         NVARCHAR(20)  NULL,
        document      NVARCHAR(20)  NULL,
        created_at    DATETIME      NULL CONSTRAINT DF_users_created_at DEFAULT (GETDATE()),
        updated_at    DATETIME      NULL CONSTRAINT DF_users_updated_at DEFAULT (GETDATE()),
        CONSTRAINT PK_users      PRIMARY KEY (id),
        CONSTRAINT UQ_users_email UNIQUE (email)
    );
    CREATE INDEX idx_users_email ON users(email);
END
GO

-- ----------------------------------------------------
-- Tabela: teams (Seleções)
-- ----------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'teams')
BEGIN
    CREATE TABLE teams (
        id            INT IDENTITY(1,1) NOT NULL,
        name          NVARCHAR(100) NOT NULL,
        code          NVARCHAR(3)   NOT NULL,
        flag          NVARCHAR(100) NULL,
        group_name    NVARCHAR(1)   NULL,
        confederation NVARCHAR(50)  NULL,
        fifa_ranking  INT           NULL,
        created_at    DATETIME      NULL CONSTRAINT DF_teams_created_at DEFAULT (GETDATE()),
        CONSTRAINT PK_teams     PRIMARY KEY (id),
        CONSTRAINT UQ_teams_code UNIQUE (code)
    );
END
GO

-- ----------------------------------------------------
-- Tabela: stadiums (Estádios)
-- ----------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'stadiums')
BEGIN
    CREATE TABLE stadiums (
        id          INT IDENTITY(1,1) NOT NULL,
        name        NVARCHAR(200) NOT NULL,
        city        NVARCHAR(100) NOT NULL,
        country     NVARCHAR(50)  NOT NULL,
        capacity    INT           NOT NULL,
        image       NVARCHAR(500) NULL,
        description NVARCHAR(MAX) NULL,
        address     NVARCHAR(300) NULL,
        latitude    DECIMAL(10,8) NULL,
        longitude   DECIMAL(11,8) NULL,
        created_at  DATETIME      NULL CONSTRAINT DF_stadiums_created_at DEFAULT (GETDATE()),
        CONSTRAINT PK_stadiums PRIMARY KEY (id)
    );
END
GO

-- ----------------------------------------------------
-- Tabela: matches (Jogos)
-- ----------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'matches')
BEGIN
    CREATE TABLE matches (
        id           INT IDENTITY(1,1) NOT NULL,
        home_team_id INT          NULL,
        away_team_id INT          NULL,
        stadium_id   INT          NULL,
        date         DATE         NOT NULL,
        time         NVARCHAR(5)  NOT NULL,
        stage        NVARCHAR(50) NOT NULL,
        group_name   NVARCHAR(1)  NULL,
        home_score   INT          NULL,
        away_score   INT          NULL,
        status       NVARCHAR(20) NULL CONSTRAINT DF_matches_status     DEFAULT ('scheduled'),
        created_at   DATETIME     NULL CONSTRAINT DF_matches_created_at DEFAULT (GETDATE()),
        CONSTRAINT PK_matches            PRIMARY KEY (id),
        CONSTRAINT FK_matches_home_team  FOREIGN KEY (home_team_id) REFERENCES teams(id),
        CONSTRAINT FK_matches_away_team  FOREIGN KEY (away_team_id) REFERENCES teams(id),
        CONSTRAINT FK_matches_stadium    FOREIGN KEY (stadium_id)   REFERENCES stadiums(id)
    );
    CREATE INDEX idx_matches_date    ON matches(date);
    CREATE INDEX idx_matches_stadium ON matches(stadium_id);
END
GO

-- ----------------------------------------------------
-- Tabela: ticket_categories (Categorias de Ingressos)
-- ----------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'ticket_categories')
BEGIN
    CREATE TABLE ticket_categories (
        id                 INT IDENTITY(1,1) NOT NULL,
        match_id           INT           NULL,
        category           NVARCHAR(50)  NOT NULL,
        price              DECIMAL(10,2) NOT NULL,
        total_quantity     INT           NOT NULL,
        available_quantity INT           NOT NULL,
        description        NVARCHAR(200) NULL,
        created_at         DATETIME      NULL CONSTRAINT DF_ticket_categories_created_at DEFAULT (GETDATE()),
        CONSTRAINT PK_ticket_categories       PRIMARY KEY (id),
        CONSTRAINT FK_ticket_categories_match FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE
    );
    CREATE INDEX idx_ticket_categories_match ON ticket_categories(match_id);
END
GO

-- ----------------------------------------------------
-- Tabela: purchases (Compras)
-- ----------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'purchases')
BEGIN
    CREATE TABLE purchases (
        id                 INT IDENTITY(1,1) NOT NULL,
        user_id            INT           NULL,
        ticket_category_id INT           NULL,
        quantity           INT           NOT NULL,
        unit_price         DECIMAL(10,2) NOT NULL,
        total_price        DECIMAL(10,2) NOT NULL,
        status             NVARCHAR(20)  NULL CONSTRAINT DF_purchases_status     DEFAULT ('pending'),
        payment_method     NVARCHAR(50)  NULL,
        transaction_id     NVARCHAR(100) NULL,
        created_at         DATETIME      NULL CONSTRAINT DF_purchases_created_at DEFAULT (GETDATE()),
        updated_at         DATETIME      NULL CONSTRAINT DF_purchases_updated_at DEFAULT (GETDATE()),
        CONSTRAINT PK_purchases               PRIMARY KEY (id),
        CONSTRAINT FK_purchases_user          FOREIGN KEY (user_id)            REFERENCES users(id),
        CONSTRAINT FK_purchases_ticket_categ  FOREIGN KEY (ticket_category_id) REFERENCES ticket_categories(id)
    );
    CREATE INDEX idx_purchases_user ON purchases(user_id);
END
GO

PRINT 'Schema FIFA2026Tickets criado/validado com sucesso.';
GO
