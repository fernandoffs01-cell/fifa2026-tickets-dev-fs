-- =====================================================
-- FIFA 2026 TICKETS - Seed mínimo (usuário admin)
-- =====================================================
-- Use este script APENAS quando criar um banco do zero
-- a partir de schema.sql (sem restaurar do .bacpac).
-- O .bacpac já contém o admin e todos os dados de teams,
-- stadiums, matches, ticket_categories e purchases.
-- =====================================================
-- Login Admin: admin@fifa2026.com / admin123
-- =====================================================

IF NOT EXISTS (SELECT * FROM users WHERE email = 'admin@fifa2026.com')
BEGIN
    INSERT INTO users (name, email, password, role)
    VALUES (
        'Administrador',
        'admin@fifa2026.com',
        '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        'admin'
    );
    PRINT 'Usuário admin criado.';
END
ELSE
    PRINT 'Usuário admin já existe — nenhum insert realizado.';
GO
