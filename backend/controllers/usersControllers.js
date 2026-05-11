const usersService = require('../services/usersServices');

// POST /registra
const registra = async (req, res, next) => {
  try {
    const user = await usersService.registra(req.body);
    res.status(201).json({ successo: true, dati: user });
  } catch (err) { next(err); }
};

// POST /login
const login = async (req, res, next) => {
  try {
    const token = await usersService.login(req.body);
    res.json({ successo: true, dati: token });
  } catch (err) { next(err); }
};

// GET /
const getAll = async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.json({ successo: true, dati: users });
  } catch (err) { next(err); }
};

// GET /:id
const getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = await usersService.getById(id);
    res.json({ successo: true, dati: user });
  } catch (err) { next(err); }
};

// PATCH /:id
const aggiorna = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = await usersService.aggiorna(id, req.body);
    res.json({ successo: true, dati: user });
  } catch (err) { next(err); }
};

// DELETE /:id
const elimina = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await usersService.elimina(id);
    res.json({ successo: true, dati: result });
  } catch (err) { next(err); }
};

module.exports = { registra, login, getAll, getById, aggiorna, elimina };
