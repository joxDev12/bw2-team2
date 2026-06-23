require('dotenv').config();

// 'pg' è il pacchetto Node.js che ci permette di connetterci a PostgreSQL
const { Pool } = require('pg');

const usaDatabaseUrl = Boolean(process.env.DATABASE_URL);

const usaSSL =
  process.env.DB_SSL === 'true' ||
  process.env.DATABASE_URL?.includes('sslmode=require');

// In locale continua a funzionare con DB_HOST, DB_PORT, DB_NAME, DB_USER e DB_PASS.
// Su Render puoi usare direttamente DATABASE_URL, che viene fornita dal database PostgreSQL gestito.
const configurazioneDatabase = usaDatabaseUrl
  ? {
      connectionString: process.env.DATABASE_URL,
      ...(usaSSL && { ssl: { rejectUnauthorized: false } }),
    }
  : {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 5432),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    };

// Pool = un gruppo di connessioni riutilizzabili al database.
// Invece di aprire e chiudere una connessione ad ogni query,
// il pool ne mantiene alcune aperte e pronte, migliorando le performance.
const pool = new Pool(configurazioneDatabase);

// Questi sono eventi del pool: scattano automaticamente in certi momenti
pool.on('connect', () => console.log('EventHUB Database connesso'));
pool.on('error', (err) => console.error('Errore connessione database EventHUB:', err));

// Esportiamo il pool così ogni model può usarlo per eseguire query
module.exports = pool;
