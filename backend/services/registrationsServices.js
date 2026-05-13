const registrationsModel = require('../models/registrationsModel');
const eventsModel    = require('../models/eventsModel');
const usersModel   = require('../models/usersModel');

const crea = async ({ event_id, seats = 1 }, user_id) => {
  const seatsRichiesti = parseInt(seats);
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

  if (seatsRichiesti > event.rows[0].max_seats) {
    const err = new Error('I posti richiesti superano quelli disponibili');
    err.statusCode = 409;
    throw err;
  }

  const eventAggiornato = await eventsModel.decrementa(event_id, seatsRichiesti);

  if (!eventAggiornato.rows.length) {
    const err = new Error('I posti richiesti non sono piu disponibili');
    err.statusCode = 409;
    throw err;
  }

  const registration = await registrationsModel.create({ user_id, event_id, seats: seatsRichiesti });
  return registration.rows[0];
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

const getPublicByEventId = async (id) => {
  const event = await eventsModel.findById(id);

  if (!event.rows.length) {
    const err = new Error('Evento non trovato');
    err.statusCode = 404;
    throw err;
  }

  const result = await registrationsModel.findPublicByEventId(id);
  return result.rows;
};


const elimina = async (id) => {
  const registration = await getById(id);
  await registrationsModel.remove(id);
  await eventsModel.incrementa(registration.event_id, registration.seats);
  return { message: 'Registrazione eliminata' };
};

// ── Esportazione ──────────────────────────────────────────────
module.exports = { getAll, getById, getAllByEventId, getAllByUserId, getPublicByEventId, crea, elimina };
