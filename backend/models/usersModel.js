

const pool = require('../config/db');

const CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    location VARCHAR(255),
    indirizzo VARCHAR(255),
    img_profile VARCHAR(500),
    password_hash VARCHAR(255) NOT NULL,
    role         VARCHAR(20)   NOT NULL DEFAULT 'partecipant'
                  CHECK (role IN ('admin', 'partecipant', 'organizer')),
    token_version INTEGER       NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;

const init = () => pool.query(CREATE_TABLE);

const findAll = () =>
  pool.query(
    'SELECT id, name, surname, email, username, location, indirizzo, img_profile, role FROM users ORDER BY id'
  );

const findById = (id, client = pool) =>
  client.query(
    'SELECT id, name, surname, email, username, location, indirizzo, img_profile, role, token_version FROM users WHERE id = $1',
    [id]
  );

const findByEmail = (email) =>
  pool.query('SELECT * FROM users WHERE email = $1', [email]);

const findByUsername = (username) =>
  pool.query('SELECT * FROM users WHERE username = $1', [username]);


const create = ({ name, surname, email, username, location, indirizzo, img_profile, password_hash, role }) =>
  pool.query(
    `INSERT INTO users (name, surname, email, username, location, indirizzo, img_profile, password_hash, role)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, name, surname, email, username, location, indirizzo, img_profile, role`,
    [name, surname, email, username, location, indirizzo, img_profile, password_hash, role]
  );

const update = (id, dati, client = pool) => {
  const allowedFields = ['name', 'surname', 'email', 'username', 'location', 'indirizzo', 'img_profile', 'role'];
  const setClauses = [];
  const values = [];
  let paramIdx = 1;

  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(dati, field) && dati[field] !== undefined) {
      let val = dati[field];
      if (['location', 'indirizzo', 'img_profile'].includes(field) && (val === '' || val === null)) {
        val = null;
      }
      setClauses.push(`${field} = $${paramIdx}`);
      values.push(val);

      if (field === 'role') {
        setClauses.push(`token_version = token_version + CASE WHEN $${paramIdx} IS NOT NULL AND $${paramIdx} <> role THEN 1 ELSE 0 END`);
      }
      paramIdx++;
    }
  }

  if (setClauses.length === 0) {
    return findById(id, client);
  }

  values.push(id);
  const query = `
    UPDATE users
    SET ${setClauses.join(', ')}
    WHERE id = $${paramIdx}
    RETURNING id, name, surname, email, username, location, indirizzo, img_profile, role, token_version
  `;

  return client.query(query, values);
};


const updatePassword = (id, hashedPassword, client = pool) =>
  client.query(
    `UPDATE users
      SET password_hash     = $1,
          token_version = token_version + 1
      WHERE id = $2
      RETURNING id`,
    [hashedPassword, id]
  );

const remove = (id) =>
  pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);

module.exports = {
  init, findAll, findById, findByEmail, findByUsername,
  create, update, updatePassword, remove
};
