const jwt        = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const autenticato = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ successo: false, errore: 'Token mancante' });
  }

  try {
    const token   = auth.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Verifica nel DB che l'utente esista ancora e che token_version coincida
    const result = await usersModel.findById(payload.id);
    const user = result.rows[0];

    if (!user) {
      // L'utente è stato eliminato dopo l'emissione del token
      return res.status(401).json({ successo: false, errore: 'Utente non trovato' });
    }

    if (user.token_version !== payload.token_version) {
      // La password è cambiata o il token è stato invalidato manualmente
      return res.status(401).json({ successo: false, errore: 'Token non più valido, effettua nuovamente il login' });
    }

    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ successo: false, errore: 'Token non valido o scaduto' });
  }
};


const soloAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      successo: false,
      errore: 'Accesso riservato agli amministratori'
    });
  }
  next();
};


/* const soloOrganizerOrAdmin = (req, res, next) => {
  if (req.user?.role !== 'organizer' || 'admin') {
    return res.status(403).json({
      successo: false,
      errore: 'Accesso riservato agli organizzatori'
    });
  }
  next();
}; */


const soloSéOAdmin = (req, res, next) => {
  const idRichiesto = parseInt(req.params.id);
  const isAdmin     = req.user?.role === 'admin';
  const isSéStesso  = req.user?.id    === idRichiesto;

  if (!isAdmin && !isSéStesso) {
    return res.status(403).json({
      successo: false,
      errore: 'Non sei autorizzato ad accedere a questa risorsa'
    });
  }
  next();
};

const soloSéAdminOrOrganizer = (req, res, next) => {
  const idRichiesto = parseInt(req.params.id);
  const isAdminOrOganizer    = req.user?.role === 'admin' || 'organizer';
  const isSéStesso  = req.user?.id    === idRichiesto;

  if (!isAdminOrOganizer && !isSéStesso) {
    return res.status(403).json({
      successo: false,
      errore: 'Non sei autorizzato ad accedere a questa risorsa'
    });
  }
  next();
};

module.exports = { autenticato, soloAdmin, soloSéOAdmin, soloSéAdminOrOrganizer };
