-- =============================================
-- FIFA 2026 Tickets - Dados Iniciais (Seed)
-- Rodar após o schema.sql
-- =============================================

USE fifa2026;
GO

-- =============================================
-- INSERIR ESTÁDIOS
-- =============================================
INSERT INTO stadiums (id, name, city, country, capacity, description) VALUES
('metlife', 'MetLife Stadium', 'East Rutherford', 'Estados Unidos', 82500, 'Estádio da final da Copa do Mundo 2026'),
('sofi', 'SoFi Stadium', 'Los Angeles', 'Estados Unidos', 70240, 'Estádio moderno inaugurado em 2020'),
('rose-bowl', 'Rose Bowl', 'Pasadena', 'Estados Unidos', 88432, 'Estádio histórico que sediou a final de 1994'),
('at-t', 'AT&T Stadium', 'Arlington', 'Estados Unidos', 80000, 'Casa do Dallas Cowboys'),
('arrowhead', 'Arrowhead Stadium', 'Kansas City', 'Estados Unidos', 76416, 'Casa do Kansas City Chiefs'),
('azteca', 'Estadio Azteca', 'Cidade do México', 'México', 87523, 'Único estádio a sediar duas finais de Copa'),
('guadalajara', 'Estadio Akron', 'Guadalajara', 'México', 49850, 'Casa do Chivas Guadalajara'),
('monterrey', 'Estadio BBVA', 'Monterrey', 'México', 53500, 'Estádio do Monterrey e Tigres'),
('bc-place', 'BC Place', 'Vancouver', 'Canadá', 54500, 'Estádio com teto retrátil'),
('bmo-field', 'BMO Field', 'Toronto', 'Canadá', 45736, 'Casa do Toronto FC');
GO

-- =============================================
-- INSERIR SELEÇÕES CLASSIFICADAS
-- =============================================
INSERT INTO teams (id, name, code, flag, confederation, group_name, ranking, participations, best_result, titles) VALUES
-- Grupo A
('mex', 'México', 'MEX', 'https://flagcdn.com/w80/mx.png', 'CONCACAF', 'A', 15, 17, 'Quartas de final', 0),
('rsa', 'África do Sul', 'RSA', 'https://flagcdn.com/w80/za.png', 'CAF', 'A', 59, 4, 'Fase de grupos', 0),
('kor', 'Coreia do Sul', 'KOR', 'https://flagcdn.com/w80/kr.png', 'AFC', 'A', 22, 11, '4º lugar (2002)', 0),

-- Grupo B
('can', 'Canadá', 'CAN', 'https://flagcdn.com/w80/ca.png', 'CONCACAF', 'B', 27, 3, 'Fase de grupos', 0),
('qat', 'Catar', 'QAT', 'https://flagcdn.com/w80/qa.png', 'AFC', 'B', 51, 2, 'Fase de grupos', 0),
('sui', 'Suíça', 'SUI', 'https://flagcdn.com/w80/ch.png', 'UEFA', 'B', 17, 12, 'Quartas de final', 0),

-- Grupo C
('bra', 'Brasil', 'BRA', 'https://flagcdn.com/w80/br.png', 'CONMEBOL', 'C', 5, 23, '5x Campeão', 5),
('mar', 'Marrocos', 'MAR', 'https://flagcdn.com/w80/ma.png', 'CAF', 'C', 11, 7, '4º lugar (2022)', 0),
('hai', 'Haiti', 'HAI', 'https://flagcdn.com/w80/ht.png', 'CONCACAF', 'C', 81, 2, 'Fase de grupos', 0),
('sco', 'Escócia', 'SCO', 'https://flagcdn.com/w80/gb-sct.png', 'UEFA', 'C', 37, 8, 'Fase de grupos', 0),

-- Grupo D
('usa', 'Estados Unidos', 'USA', 'https://flagcdn.com/w80/us.png', 'CONCACAF', 'D', 14, 12, '3º lugar (1930)', 0),
('par', 'Paraguai', 'PAR', 'https://flagcdn.com/w80/py.png', 'CONMEBOL', 'D', 36, 9, 'Quartas de final', 0),
('aus', 'Austrália', 'AUS', 'https://flagcdn.com/w80/au.png', 'AFC', 'D', 26, 6, 'Oitavas de final', 0),

-- Grupo E
('ger', 'Alemanha', 'GER', 'https://flagcdn.com/w80/de.png', 'UEFA', 'E', 9, 20, '4x Campeão', 4),
('cur', 'Curaçau', 'CUR', 'https://flagcdn.com/w80/cw.png', 'CONCACAF', 'E', 120, 1, 'Estreante (2026)', 0),
('civ', 'Costa do Marfim', 'CIV', 'https://flagcdn.com/w80/ci.png', 'CAF', 'E', 42, 4, 'Fase de grupos', 0),
('ecu', 'Equador', 'ECU', 'https://flagcdn.com/w80/ec.png', 'CONMEBOL', 'E', 23, 4, 'Oitavas de final', 0),

-- Grupo F
('ned', 'Holanda', 'NED', 'https://flagcdn.com/w80/nl.png', 'UEFA', 'F', 7, 11, 'Vice-campeão (3x)', 0),
('jpn', 'Japão', 'JPN', 'https://flagcdn.com/w80/jp.png', 'AFC', 'F', 18, 7, 'Oitavas de final', 0),
('tun', 'Tunísia', 'TUN', 'https://flagcdn.com/w80/tn.png', 'CAF', 'F', 41, 6, 'Fase de grupos', 0),

-- Grupo G
('bel', 'Bélgica', 'BEL', 'https://flagcdn.com/w80/be.png', 'UEFA', 'G', 8, 14, '3º lugar (2018)', 0),
('egy', 'Egito', 'EGY', 'https://flagcdn.com/w80/eg.png', 'CAF', 'G', 35, 4, 'Fase de grupos', 0),
('irn', 'Irã', 'IRN', 'https://flagcdn.com/w80/ir.png', 'AFC', 'G', 20, 6, 'Fase de grupos', 0),
('nzl', 'Nova Zelândia', 'NZL', 'https://flagcdn.com/w80/nz.png', 'OFC', 'G', 98, 3, 'Fase de grupos', 0),

-- Grupo H
('esp', 'Espanha', 'ESP', 'https://flagcdn.com/w80/es.png', 'UEFA', 'H', 1, 16, '1x Campeão', 1),
('cpv', 'Cabo Verde', 'CPV', 'https://flagcdn.com/w80/cv.png', 'CAF', 'H', 63, 1, 'Estreante (2026)', 0),
('ksa', 'Arábia Saudita', 'KSA', 'https://flagcdn.com/w80/sa.png', 'AFC', 'H', 56, 7, 'Oitavas de final', 0),
('uru', 'Uruguai', 'URU', 'https://flagcdn.com/w80/uy.png', 'CONMEBOL', 'H', 16, 14, '2x Campeão', 2),

-- Grupo I
('fra', 'França', 'FRA', 'https://flagcdn.com/w80/fr.png', 'UEFA', 'I', 3, 16, '2x Campeão', 2),
('sen', 'Senegal', 'SEN', 'https://flagcdn.com/w80/sn.png', 'CAF', 'I', 19, 3, 'Quartas de final (2002)', 0),
('nor', 'Noruega', 'NOR', 'https://flagcdn.com/w80/no.png', 'UEFA', 'I', 29, 3, 'Oitavas de final', 0),

-- Grupo J
('arg', 'Argentina', 'ARG', 'https://flagcdn.com/w80/ar.png', 'CONMEBOL', 'J', 2, 18, '3x Campeão', 3),
('aut', 'Áustria', 'AUT', 'https://flagcdn.com/w80/at.png', 'UEFA', 'J', 24, 8, '3º lugar (1954)', 0),
('jor', 'Jordânia', 'JOR', 'https://flagcdn.com/w80/jo.png', 'AFC', 'J', 58, 1, 'Estreante (2026)', 0),
('alg', 'Argélia', 'ALG', 'https://flagcdn.com/w80/dz.png', 'CAF', 'J', 34, 5, 'Oitavas de final', 0),

-- Grupo K
('por', 'Portugal', 'POR', 'https://flagcdn.com/w80/pt.png', 'UEFA', 'K', 6, 8, '3º lugar (1966)', 0),
('uzb', 'Uzbequistão', 'UZB', 'https://flagcdn.com/w80/uz.png', 'AFC', 'K', 49, 1, 'Estreante (2026)', 0),
('col', 'Colômbia', 'COL', 'https://flagcdn.com/w80/co.png', 'CONMEBOL', 'K', 12, 7, 'Quartas de final', 0),

-- Grupo L
('eng', 'Inglaterra', 'ENG', 'https://flagcdn.com/w80/gb-eng.png', 'UEFA', 'L', 4, 16, '1x Campeão', 1),
('cro', 'Croácia', 'CRO', 'https://flagcdn.com/w80/hr.png', 'UEFA', 'L', 10, 6, 'Vice-campeão (2018)', 0),
('gha', 'Gana', 'GHA', 'https://flagcdn.com/w80/gh.png', 'CAF', 'L', 61, 4, 'Quartas de final', 0),
('pan', 'Panamá', 'PAN', 'https://flagcdn.com/w80/pa.png', 'CONCACAF', 'L', 30, 2, 'Fase de grupos', 0);
GO

-- =============================================
-- INSERIR ALGUNS JOGOS DE EXEMPLO
-- =============================================
INSERT INTO matches (match_number, date, time, stage, group_name, home_team_id, away_team_id, stadium_id) VALUES
(1, '2026-06-11', '17:00', 'Fase de Grupos', 'A', 'mex', 'rsa', 'azteca'),
(2, '2026-06-11', '20:00', 'Fase de Grupos', 'B', 'can', 'qat', 'bc-place'),
(3, '2026-06-12', '14:00', 'Fase de Grupos', 'C', 'bra', 'sco', 'sofi'),
(4, '2026-06-12', '17:00', 'Fase de Grupos', 'D', 'usa', 'par', 'metlife'),
(5, '2026-06-12', '20:00', 'Fase de Grupos', 'E', 'ger', 'cur', 'at-t'),
(6, '2026-06-13', '14:00', 'Fase de Grupos', 'F', 'ned', 'tun', 'arrowhead'),
(7, '2026-06-13', '17:00', 'Fase de Grupos', 'G', 'bel', 'nzl', 'rose-bowl'),
(8, '2026-06-13', '20:00', 'Fase de Grupos', 'H', 'esp', 'cpv', 'guadalajara');
GO

-- =============================================
-- INSERIR CATEGORIAS DE INGRESSOS
-- =============================================
INSERT INTO ticket_categories (match_id, category, price, total_quantity, available_quantity, description) VALUES
(1, 'Categoria 1', 450.00, 5000, 5000, 'Melhor visibilidade - Central'),
(1, 'Categoria 2', 300.00, 10000, 10000, 'Boa visibilidade - Laterais'),
(1, 'Categoria 3', 150.00, 15000, 15000, 'Visibilidade padrão - Atrás do gol'),
(2, 'Categoria 1', 400.00, 4000, 4000, 'Melhor visibilidade - Central'),
(2, 'Categoria 2', 250.00, 8000, 8000, 'Boa visibilidade - Laterais'),
(2, 'Categoria 3', 120.00, 12000, 12000, 'Visibilidade padrão - Atrás do gol'),
(3, 'Categoria 1', 500.00, 5000, 5000, 'Melhor visibilidade - Central'),
(3, 'Categoria 2', 350.00, 10000, 10000, 'Boa visibilidade - Laterais'),
(3, 'Categoria 3', 180.00, 15000, 15000, 'Visibilidade padrão - Atrás do gol');
GO

PRINT 'Dados iniciais inseridos com sucesso!';
GO
