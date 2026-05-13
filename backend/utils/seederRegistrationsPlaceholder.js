const pool = require('../config/db');

const registrationsPlaceholder = [
  { user_id: 9, event_id: 1 },
  { user_id: 9, event_id: 5 },
  { user_id: 9, event_id: 11 },

  { user_id: 10, event_id: 2 },
  { user_id: 10, event_id: 6 },
  { user_id: 10, event_id: 16 },

  { user_id: 11, event_id: 3 },
  { user_id: 11, event_id: 10 },
  { user_id: 11, event_id: 21 },

  { user_id: 12, event_id: 4 },
  { user_id: 12, event_id: 7 },

  { user_id: 13, event_id: 8 },
  { user_id: 13, event_id: 12 },
  { user_id: 13, event_id: 25 },

  { user_id: 14, event_id: 9 },
  { user_id: 14, event_id: 13 },

  { user_id: 15, event_id: 14 },
  { user_id: 15, event_id: 17 },
  { user_id: 15, event_id: 20 },

  { user_id: 16, event_id: 15 },
  { user_id: 16, event_id: 18 },

  { user_id: 17, event_id: 19 },
  { user_id: 17, event_id: 22 },

  { user_id: 18, event_id: 23 },
  { user_id: 18, event_id: 24 },
];

const seedRegistrationsPlaceholder = async () => {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('Seeder registrations placeholder saltato: NODE_ENV non è "development".');
    return;
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query('TRUNCATE TABLE registrations RESTART IDENTITY CASCADE');
    await client.query('ALTER SEQUENCE registrations_id_seq MINVALUE 1 RESTART WITH 1');

    for (const registration of registrationsPlaceholder) {
      const userResult = await client.query(
        'SELECT id FROM users WHERE id = $1',
        [registration.user_id]
      );

      const eventResult = await client.query(
        'SELECT id, max_seats, available FROM events WHERE id = $1',
        [registration.event_id]
      );

      if (!userResult.rows.length || !eventResult.rows.length) {
        throw new Error(
          `User o Evento non trovato per la registrazione user_id=${registration.user_id}, event_id=${registration.event_id}`
        );
      }

      const event = eventResult.rows[0];

      if (event.max_seats === 0 || !event.available) {
        throw new Error(
          `Evento non disponibile per la registrazione user_id=${registration.user_id}, event_id=${registration.event_id}`
        );
      }

      await client.query(
        `INSERT INTO registrations (user_id, event_id)
         VALUES ($1, $2)`,
        [registration.user_id, registration.event_id]
      );

      await client.query(
        `UPDATE events
         SET max_seats = max_seats - 1,
             available = CASE WHEN max_seats - 1 = 0 THEN false ELSE true END
         WHERE id = $1`,
        [registration.event_id]
      );
    }

    await client.query('COMMIT');
    console.log(`Seeder registrations placeholder completato: create ${registrationsPlaceholder.length} registrazioni.`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Errore nel seeder registrations placeholder:', err.message);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = seedRegistrationsPlaceholder;
