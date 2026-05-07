const express = require('express');
const { query, sql, getConnection } = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/matches - Lista todos os jogos
router.get('/', async (req, res) => {
  try {
    const { stage, stadium_id, team_id } = req.query;
    
    let queryString = `
      SELECT 
        m.id, m.date, m.time, m.stage, m.group_name,
        m.home_team_id, m.away_team_id, m.stadium_id,
        m.home_score, m.away_score, m.status,
        ht.name as home_team_name, ht.code as home_team_code, ht.flag as home_team_flag,
        at.name as away_team_name, at.code as away_team_code, at.flag as away_team_flag,
        s.name as stadium_name, s.city as stadium_city
      FROM matches m
      LEFT JOIN teams ht ON m.home_team_id = ht.id
      LEFT JOIN teams at ON m.away_team_id = at.id
      LEFT JOIN stadiums s ON m.stadium_id = s.id
      WHERE 1=1
    `;

    const params = [];
    
    if (stage) {
      queryString += ` AND m.stage = @param${params.length}`;
      params.push(stage);
    }
    
    if (stadium_id) {
      queryString += ` AND m.stadium_id = @param${params.length}`;
      params.push(stadium_id);
    }

    queryString += ' ORDER BY m.date, m.time';

    const result = await query(queryString, params);
    res.json({ matches: result.recordset });
  } catch (err) {
    console.error('Erro ao buscar jogos:', err);
    res.status(500).json({ error: 'Erro ao buscar jogos' });
  }
});

// GET /api/matches/:id - Busca jogo por ID
router.get('/:id', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        m.*, 
        ht.name as home_team_name, ht.code as home_team_code, ht.flag as home_team_flag,
        at.name as away_team_name, at.code as away_team_code, at.flag as away_team_flag,
        s.name as stadium_name, s.city as stadium_city, s.capacity as stadium_capacity
      FROM matches m
      LEFT JOIN teams ht ON m.home_team_id = ht.id
      LEFT JOIN teams at ON m.away_team_id = at.id
      LEFT JOIN stadiums s ON m.stadium_id = s.id
      WHERE m.id = @param0
    `, [req.params.id]);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }

    res.json({ match: result.recordset[0] });
  } catch (err) {
    console.error('Erro ao buscar jogo:', err);
    res.status(500).json({ error: 'Erro ao buscar jogo' });
  }
});

// GET /api/matches/:id/tickets - Busca ingressos disponíveis
router.get('/:id/tickets', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        tc.id, tc.category, tc.price, tc.available_quantity,
        (tc.total_quantity - tc.available_quantity) as sold_quantity
      FROM ticket_categories tc
      WHERE tc.match_id = @param0 AND tc.available_quantity > 0
      ORDER BY tc.price
    `, [req.params.id]);

    res.json({ tickets: result.recordset });
  } catch (err) {
    console.error('Erro ao buscar ingressos:', err);
    res.status(500).json({ error: 'Erro ao buscar ingressos' });
  }
});

// POST /api/matches - Criar novo jogo (Admin)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { home_team_id, away_team_id, stadium_id, date, time, stage, group_name } = req.body;

    if (!home_team_id || !away_team_id || !stadium_id || !date || !time || !stage) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    const pool = await getConnection();
    const result = await pool.request()
      .input('home_team_id', sql.Int, home_team_id)
      .input('away_team_id', sql.Int, away_team_id)
      .input('stadium_id', sql.Int, stadium_id)
      .input('date', sql.Date, date)
      .input('time', sql.VarChar, time)
      .input('stage', sql.VarChar, stage)
      .input('group_name', sql.VarChar, group_name || null)
      .query(`
        INSERT INTO matches (home_team_id, away_team_id, stadium_id, date, time, stage, group_name, status, created_at)
        OUTPUT INSERTED.*
        VALUES (@home_team_id, @away_team_id, @stadium_id, @date, @time, @stage, @group_name, 'scheduled', GETDATE())
      `);

    res.status(201).json({ match: result.recordset[0], message: 'Jogo criado com sucesso' });
  } catch (err) {
    console.error('Erro ao criar jogo:', err);
    res.status(500).json({ error: 'Erro ao criar jogo' });
  }
});

// PUT /api/matches/:id - Atualizar jogo (Admin)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { home_team_id, away_team_id, stadium_id, date, time, stage, group_name, home_score, away_score, status } = req.body;

    const pool = await getConnection();
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .input('home_team_id', sql.Int, home_team_id)
      .input('away_team_id', sql.Int, away_team_id)
      .input('stadium_id', sql.Int, stadium_id)
      .input('date', sql.Date, date)
      .input('time', sql.VarChar, time)
      .input('stage', sql.VarChar, stage)
      .input('group_name', sql.VarChar, group_name || null)
      .input('home_score', sql.Int, home_score)
      .input('away_score', sql.Int, away_score)
      .input('status', sql.VarChar, status || 'scheduled')
      .query(`
        UPDATE matches 
        SET home_team_id = @home_team_id, away_team_id = @away_team_id, stadium_id = @stadium_id,
            date = @date, time = @time, stage = @stage, group_name = @group_name,
            home_score = @home_score, away_score = @away_score, status = @status
        OUTPUT INSERTED.*
        WHERE id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }

    res.json({ match: result.recordset[0], message: 'Jogo atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar jogo:', err);
    res.status(500).json({ error: 'Erro ao atualizar jogo' });
  }
});

// DELETE /api/matches/:id - Excluir jogo (Admin)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('DELETE FROM matches OUTPUT DELETED.id WHERE id = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }

    res.json({ message: 'Jogo excluído com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir jogo:', err);
    res.status(500).json({ error: 'Erro ao excluir jogo' });
  }
});

module.exports = router;
