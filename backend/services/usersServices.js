
require('dotenv').config();
const bcrypt      = require('bcrypt');
const jwt         = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const SALT_ROUND = 12;

const generaToken = (user) =>
  jwt.sign(
    {
      id:            user.id,
      name:          user.name,
      surname:       user.surname,
      username:      user.username,
      location:      user.location,
      indirizzo:     user.indirizzo,
      img_profile:   user.img_profile,
      email:         user.email,
      role:          user.role,
      token_version: user.token_version
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

// Registrazione
const registra = async ({ name, surname, email, username, location, indirizzo, img_profile, role, password_hash }) => {
  const emailExists = await usersModel.findByEmail(email);
  if (emailExists.rows.length) {
    const err = new Error('Email già presente');
    err.statusCode = 409;
    throw err;
    }
    
    const usernameExists = await usersModel.findByUsername(username);
  if (usernameExists.rows.length) {
    const err = new Error('Email già presente');
    err.statusCode = 409;
    throw err;
    }

  const hash   = await bcrypt.hash(password_hash, SALT_ROUND);

  const result = await usersModel.create({ name, surname, email, username, location, indirizzo, img_profile, role, password_hash: hash });
  return result.rows[0];
};

// Login
const login = async ({ email, password }) => {
  const result = await usersModel.findByEmail(email);
  const user = result.rows[0];

  if (!user) {
    const err = new Error('Credenziali non valide');
    err.statusCode = 401;
    throw err;
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    const err = new Error('Credenziali non valide');
    err.statusCode = 401;
    throw err;
  }

  const token = generaToken(user);

  return token;
};

const getAll = async () => {
  const result = await usersModel.findAll();
  return result.rows;
};

const getById = async (id) => {
  const result = await usersModel.findById(id);
  if (!result.rows.length) {
    const err = new Error('Utente non trovato');
    err.statusCode = 404;
    throw err;
  }
  return result.rows[0];
};

const aggiorna = async (id, dati) => {
  await getById(id);
  const result = await usersModel.update(id, dati);
  return result.rows[0];
};

const elimina = async (id) => {
  await getById(id);
  await usersModel.remove(id);
  return { message: 'Utente eliminato' };
};

// ── Esportazione ──────────────────────────────────────────────
module.exports = { registra, login, getAll, getById, aggiorna, elimina, generaToken };
