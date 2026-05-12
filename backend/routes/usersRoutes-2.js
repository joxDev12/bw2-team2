const router = require('express').Router();
const controller = require('../controllers/usersControllers');
const { autenticato, soloAutorizzati } = require('../middlewares/auth');
const limiter    = require('express-rate-limit');

/* const limiterAuth = limiter({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: { successo: false, errore: 'Troppi tentativi, riprova tra qualche minuto' }
}); */

// Pubbliche 
router.post('/registra', controller.registra);
router.post('/login', controller.login); 


// Solo admin può vedere la lista completa degli utenti
router.get('/', autenticato, soloAutorizzati, controller.getAll);

router.get('/:id', autenticato, soloAutorizzati, controller.getById);

// FIX #3 — solo se Admin: solo l'utente stesso o un admin
// può modificare un profilo
router.patch('/:id', autenticato, soloAutorizzati, controller.aggiorna);

router.patch('/:id/promuovi' , autenticato, soloAutorizzati, controller.aggiorna)

// Solo admin può eliminare un utente
router.delete('/:id', autenticato, soloAutorizzati, controller.elimina);

// ── Esportazione ──────────────────────────────────────────────
module.exports = router;
