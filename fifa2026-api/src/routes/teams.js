const express = require('express');
const { query } = require('../config/database');

const router = express.Router();

// GET /api/teams - Lista todas as seleções
router.get('/', async (req, res) => {
  try {
    const { confederation, group_name } = req.query;
    
    let queryString = 'SELECT * FROM teams WHERE 1=1';
    const params = [];
    
    if (confederation) {
      queryString += ` AND confederation = @param${params.length}`;
      params.push(confederation);
    }
    
    if (group_name) {
      queryString += ` AND group_name = @param${params.length}`;
      params.push(group_name);
    }

    queryString += ' ORDER BY fifa_ranking';

    const result = await query(queryString, params);
    res.json({ teams: result.recordset });
  } catch (err) {
    console.error('Erro ao buscar seleções:', err);
    res.status(500).json({ error: 'Erro ao buscar seleções' });
  }
});

// GET /api/teams/groups - Lista seleções por grupo
router.get('/groups', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        group_name,
        STRING_AGG(name, ', ') as teams
      FROM teams 
      WHERE group_name IS NOT NULL
      GROUP BY group_name
      ORDER BY group_name
    `);

    res.json({ groups: result.recordset });
  } catch (err) {
    console.error('Erro ao buscar grupos:', err);
    res.status(500).json({ error: 'Erro ao buscar grupos' });
  }
});

// GET /api/teams/:id - Busca seleção por ID
router.get('/:id', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM teams WHERE id = @param0',
      [req.params.id]
    );

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Seleção não encontrada' });
    }

    res.json({ team: result.recordset[0] });
  } catch (err) {
    console.error('Erro ao buscar seleção:', err);
    res.status(500).json({ error: 'Erro ao buscar seleção' });
  }
});

// GET /api/teams/:id/matches - Busca jogos da seleção
router.get('/:id/matches', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        m.id, m.date, m.time, m.stage, m.group_name,
        ht.name as home_team_name, ht.flag as home_team_flag,
        at.name as away_team_name, at.flag as away_team_flag,
        s.name as stadium_name, s.city as stadium_city
      FROM matches m
      LEFT JOIN teams ht ON m.home_team_id = ht.id
      LEFT JOIN teams at ON m.away_team_id = at.id
      LEFT JOIN stadiums s ON m.stadium_id = s.id
      WHERE m.home_team_id = @param0 OR m.away_team_id = @param0
      ORDER BY m.date, m.time
    `, [req.params.id]);

    res.json({ matches: result.recordset });
  } catch (err) {
    console.error('Erro ao buscar jogos da seleção:', err);
    res.status(500).json({ error: 'Erro ao buscar jogos' });
  }
});

module.exports = router;
