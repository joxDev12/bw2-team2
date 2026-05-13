const pool = require('../config/db');

const CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    organizer_id INT NOT NULL,
    title VARCHAR(500) NOT NULL,
    image VARCHAR(500),
    description TEXT,
    date DATE NOT NULL,
    location VARCHAR(500) NOT NULL,
    indirizzo VARCHAR(500),
    price NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (price >= 0),
    isFree BOOLEAN NOT NULL DEFAULT TRUE,
    max_seats  INTEGER NOT NULL DEFAULT 1 CHECK(max_seats >= 0),
    available   BOOLEAN   NOT NULL DEFAULT TRUE,
    category VARCHAR(255) NOT NULL,
    created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users (id) ON DELETE CASCADE
);
`;

const init = () => pool.query(CREATE_TABLE);


const findAll = () =>
  pool.query(
    `SELECT
       e.*,
       u.name || ' ' || u.surname AS organizer_fullname,
       u.username AS organizer_username,
       u.img_profile AS organizer_img_profile,
       COALESCE(SUM(reg.seats), 0)::int AS seats_prenotati
     FROM events e
     JOIN users u ON u.id = e.organizer_id
     LEFT JOIN registrations reg ON reg.event_id = e.id
     GROUP BY e.id, u.name, u.surname, u.username, u.img_profile
     ORDER BY e.date ASC`
  );

const findById = (id) =>
  pool.query(
    `SELECT
       e.*,
       u.name || ' ' || u.surname AS organizer_fullname,
       u.username AS organizer_username,
       u.img_profile AS organizer_img_profile,
       COALESCE(SUM(reg.seats), 0)::int AS seats_prenotati
     FROM events e
     JOIN users u ON u.id = e.organizer_id
     LEFT JOIN registrations reg ON reg.event_id = e.id
     WHERE e.id = $1
     GROUP BY e.id, u.name, u.surname, u.username, u.img_profile`,
    [id]
  );

const findByCategory = (category) =>
  pool.query(
    `SELECT
       e.*,
       u.name || ' ' || u.surname AS organizer_fullname,
       u.username AS organizer_username,
       u.img_profile AS organizer_img_profile,
       COALESCE(SUM(reg.seats), 0)::int AS seats_prenotati
     FROM events e
     JOIN users u ON u.id = e.organizer_id
     LEFT JOIN registrations reg ON reg.event_id = e.id
     WHERE e.category = $1
     GROUP BY e.id, u.name, u.surname, u.username, u.img_profile`,
    [category]
  );

const findByOrganizerId = (id) =>
  pool.query(
    `SELECT
       e.*,
       u.name || ' ' || u.surname AS organizer_fullname,
       u.username AS organizer_username,
       u.img_profile AS organizer_img_profile,
       COALESCE(SUM(reg.seats), 0)::int AS seats_prenotati
     FROM events e
     JOIN users u ON u.id = e.organizer_id
     LEFT JOIN registrations reg ON reg.event_id = e.id
     WHERE e.organizer_id = $1
     GROUP BY e.id, u.name, u.surname, u.username, u.img_profile`,
    [id]
  );


const create = (id, { title, image, description, date, location, indirizzo, price, max_seats, category }) =>
  pool.query(
    `INSERT INTO events (title, image, description, date, location, indirizzo, price, isFree, max_seats, category, organizer_id)
     VALUES ($1, $2, $3, $4, $5, $6, COALESCE($7, 0), COALESCE($7, 0) = 0, $8, $9, $10)
     RETURNING *`,
    [title, image, description, date, location, indirizzo, price, max_seats, category, id]
  );


const update = (id, { title, image, description, date, location, indirizzo, price, max_seats, category }) =>
  pool.query(
    `UPDATE events
     SET title             = COALESCE($1, title),
         image             = COALESCE($2, image),
         description             = COALESCE($3, description),
         date               = COALESCE($4, date),
         location = COALESCE($5, location),
         indirizzo = COALESCE($6, indirizzo),
         price = COALESCE($7, price),
         isFree = CASE WHEN $7 IS NULL THEN isFree ELSE $7 = 0 END,
         max_seats = COALESCE($8, max_seats),
         available = CASE WHEN $8 IS NULL THEN available ELSE $8 > 0 END,
         category            = COALESCE($9, category)
     WHERE id = $10
     RETURNING *`,
    [title, image, description, date, location, indirizzo, price, max_seats, category, id]
  );


const decrementa = (id, seats = 1) =>
  pool.query(
    `UPDATE events
     SET max_seats    = max_seats - $2,
         available = CASE WHEN max_seats - $2 = 0 THEN false ELSE true END
     WHERE id = $1 AND max_seats >= $2 AND available = true
     RETURNING *`,
    [id, seats]
  );


const incrementa = (id, seats = 1) =>
  pool.query(
    `UPDATE events
     SET max_seats   = max_seats + $2,
         available = true
     WHERE id = $1
     RETURNING *`,
    [id, seats]
  );


const remove = (id) =>
  pool.query('DELETE FROM events WHERE id = $1 RETURNING id', [id]);

// ── Esportazione ──────────────────────────────────────────────
module.exports = {
  init, findAll, findById, findByCategory, findByOrganizerId,
  create, update, remove,
  incrementa, decrementa
};
