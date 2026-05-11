
const eventsModel = require('../models/eventsModel');

const crea = async (id, dati) => {
  const event = await eventsModel.create(id, dati);
  return event.rows[0];
};

const getAll = async () => {
  const result = await eventsModel.findAll();
  return result.rows;
};


const getById = async (id) => {
  const result = await eventsModel.findById(id);
  if (!result.rows.length) {
    const err = new Error('Evento non trovato');
    err.statusCode = 404;
    throw err;
  }
  return result.rows[0];
};

const getAllByCategory = async (category) => {
  const result = await eventsModel.findByCategory(category);
  if (!result.rows.length) {
    const err = new Error('Evento non trovato');
    err.statusCode = 404;
    throw err;
  }
  return result.rows;
};

const getAllByOrganizerId = async (id) => {
  const result = await eventsModel.findByOrganizerId(id);
  if (!result.rows.length) {
    const err = new Error('Evento non trovato');
    err.statusCode = 404;
    throw err;
  }
  return result.rows;
};


const aggiorna = async (id, dati) => {
  await getById(id); 
  const result = await eventsModel.update(id, dati);
  return result.rows[0];
};

const elimina = async (id) => {
  await getById(id);
  await eventsModel.remove(id);
  return { message: 'Evento eliminato' };
};

// ── Esportazione ──────────────────────────────────────────────
module.exports = { getAll, getById, getAllByCategory, getAllByOrganizerId, crea, aggiorna, elimina };
