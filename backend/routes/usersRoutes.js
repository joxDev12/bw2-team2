const router = require('express').Router();
const controller = require('../controllers/usersControllers');
const { autenticato, soloAdmin, soloSéOAdmin } = require('../middlewares/auth');
const limiter    = require('express-rate-limit');

const limiterAuth = limiter({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: { successo: false, errore: 'Troppi tentativi, riprova tra qualche minuto' }
});

// Pubbliche 
router.post('/registra', limiterAuth, controller.registra);
router.post('/login',    limiterAuth, controller.login);


// Solo admin può vedere la lista completa degli utenti
router.get('/', autenticato, soloAdmin, controller.getAll);

router.get('/:id', autenticato, soloSéOAdmin, controller.getById);

// FIX #3 — solo se Admin: solo l'utente stesso o un admin
// può modificare un profilo
router.patch('/:id', autenticato, soloSéOAdmin,controller.aggiorna);

router.patch('/:id/promuovi' , autenticato, soloAdmin, controller.aggiorna)

// Solo admin può eliminare un utente
router.delete('/:id', autenticato, soloSéOAdmin, controller.elimina);

// ── Esportazione ──────────────────────────────────────────────
module.exports = router;
