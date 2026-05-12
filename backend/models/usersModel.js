

const pool = require('../config/db');

const CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role         VARCHAR(20)   NOT NULL DEFAULT 'partecipant'
                  CHECK (role IN ('admin', 'partecipant', 'organizer')),
    token_version INTEGER       NOT NULL DEFAULT 0,
    created_at date DEFAULT CURRENT_TIMESTAMP NOT NULL
);
`;

const init = () => pool.query(CREATE_TABLE);

const findAll = () =>
  pool.query(
    'SELECT id, name, surname, email, username, role FROM users ORDER BY id'
  );

const findById = (id) =>
  pool.query(
    'SELECT id, name, surname, email, username, role, token_version FROM users WHERE id = $1',
    [id]
  );

const findByEmail = (email) =>
  pool.query('SELECT * FROM users WHERE email = $1', [email]);

const findByUsername = (username) =>
  pool.query('SELECT * FROM users WHERE username = $1', [username]);


const create = ({ name, surname, email, username, password_hash, role }) =>
  pool.query(
    `INSERT INTO users (name, surname, email, username, password_hash, role)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, name, surname, email, username, role`,
    [name, surname, email, username, password_hash, role]
  );

const update = (id, { name, surname, email, username, role }) =>
  pool.query(
    `UPDATE users
     SET name    = COALESCE($1, name),
         surname = COALESCE($2, surname),
         email   = COALESCE($3, email),
         username  = COALESCE($4, username),
         role = COALESCE($5, role),
         token_version = token_version + 1
     WHERE id = $6
     RETURNING id, name, surname, email, username, role`,
    [name, surname, email, username, role, id]
  );


const updatePassword = (id, hashedPassword) =>
  pool.query(
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