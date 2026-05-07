const sql = require('mssql');

const config = {
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT) || 1433,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true, // Para desenvolvimento local
    enableArithAbort: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let pool = null;

const getConnection = async () => {
  try {
    if (pool) {
      return pool;
    }
    pool = await sql.connect(config);
    console.log('✅ Conectado ao SQL Server');
    return pool;
  } catch (err) {
    console.error('❌ Erro ao conectar ao SQL Server:', err);
    throw err;
  }
};

const query = async (queryString, params = []) => {
  const pool = await getConnection();
  const request = pool.request();
  
  params.forEach((param, index) => {
    request.input(`param${index}`, param);
  });
  
  return request.query(queryString);
};

module.exports = { getConnection, query, sql };
