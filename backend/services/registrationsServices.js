const registrationsModel = require('../models/registrationsModel');
const eventsModel    = require('../models/eventsModel');
const usersModel   = require('../models/usersModel');

const crea = async ({ event_id }, user_id) => {
  const user = await usersModel.findById(user_id);
  const event  = await eventsModel.findById(event_id);

  if (!user.rows.length || !event.rows.length) {
    const err = new Error('User o Evento non trovato');
    err.statusCode = 404;
    throw err;
  }

  if (event.rows[0].max_seats === 0 || !event.rows[0].available) {
    const err = new Error('Evento non disponibile');
    err.statusCode = 409;
    throw err;
  }

  const registration = await registrationsModel.create({ user_id, event_id });
  await eventsModel.decrementa(event_id);
  return event.rows[0];
};


const getAll = async () => {
  const result = await registrationsModel.findAll();
  return result.rows;
};

const getById = async (id) => {
  const result = await registrationsModel.findById(id);
  if (!result.rows.length) {
    const err = new Error('Registrazione non trovata');
    err.statusCode = 404;
    throw err;
  }
  return result.rows[0];
};

const getAllByEventId = async (id) => {
  const result = await registrationsModel.findByEventId(id);
  if (!result.rows.length) {
    const err = new Error('Registrazione non trovata');
    err.statusCode = 404;
    throw err;
  }
  return result.rows;
};

const getAllByUserId = async (id) => {
  const result = await registrationsModel.findByUserId(id);
  if (!result.rows.length) {
    const err = new Error('Registrazione non trovata');
    err.statusCode = 404;
    throw err;
  }
  return result.rows;
};


const elimina = async (id) => {
  await getById(id);
  await registrationsModel.remove(id);
  return { message: 'Registrazione eliminata' };
};

// ── Esportazione ──────────────────────────────────────────────
module.exports = { getAll, getById, getAllByEventId, getAllByUserId, crea, elimina };
