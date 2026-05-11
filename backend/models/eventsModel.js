const pool = require('../config/db');

const CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    organizer_id INT NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    location VARCHAR(500) NOT NULL,
    max_seats  INTEGER NOT NULL DEFAULT 1 CHECK(max_seats >= 0),
    available   BOOLEAN   NOT NULL DEFAULT TRUE,
    category VARCHAR(255) NOT NULL,
    created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users (id) ON DELETE CASCADE
);

`;

const init = () => pool.query(CREATE_TABLE);


const findAll = () =>
  pool.query('SELECT * FROM events ORDER BY date ASC');

const findById = (id) =>
  pool.query('SELECT * FROM events WHERE id = $1', [id]);

const findByCategory = (category) =>
  pool.query('SELECT * FROM events WHERE category = $1', [category]);

const findByOrganizerId = (id) =>
  pool.query('SELECT * FROM events WHERE organizer_id = $1', [id]); 


const create = (id,{ title, description, date, location, max_seats, category }) =>
  pool.query(
    `INSERT INTO events (title, description, date, location, max_seats, category, organizer_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [title, description, date, location, max_seats, category, id]
  );


const update = (id, { title, description, date, location, category }) =>
  pool.query(
    `UPDATE events
     SET title             = COALESCE($1, title),
         description             = COALESCE($2, description),
         date               = COALESCE($3, date),
         location = COALESCE($4, location),
         category            = COALESCE($5, category)
     WHERE id = $6
     RETURNING *`,
    [title, description, date, location, category, id]
  );


const decrementa = (id) =>
  pool.query(
    `UPDATE events
     SET max_seats    = max_seats - 1,
         available = CASE WHEN max_seats - 1 = 0 THEN false ELSE true END
     WHERE id = $1
     RETURNING *`,
    [id]
  );


const incrementa = (id) =>
  pool.query(
    `UPDATE events
     SET max_seats   = max_seats + 1,
         available = true
     WHERE id = $1
     RETURNING *`,
    [id]
  );


const remove = (id) =>
  pool.query('DELETE FROM events WHERE id = $1 RETURNING id', [id]);

// ── Esportazione ──────────────────────────────────────────────
module.exports = {
  init, findAll, findById, findByCategory, findByOrganizerId,
  create, update, remove,
  incrementa, decrementa
};
