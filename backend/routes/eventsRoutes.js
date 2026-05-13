const router = require('express').Router();
const controller = require('../controllers/eventsControllers');
const { autenticato,
    soloAdmin,
    soloAdminOStessoUtente,
  soloAdminOOrganizer,
  soloPartecipant,
  soloAdminOOrganizerProprietarioEvento,
  soloAdminOProprietarioRegistrazione,
  soloAdminOProprietarioRegistrazioneOOrganizerEvento } = require('../middlewares/auth');

router.post('/', autenticato, soloAdminOOrganizer, controller.crea);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/category/:category', controller.getAllByCategory);
router.get('/organizer/:id', controller.getAllByOrganizerId);
router.patch('/:id', autenticato, soloAdminOOrganizerProprietarioEvento, controller.aggiorna);
router.delete('/:id', autenticato, soloAdminOOrganizerProprietarioEvento, controller.elimina);

module.exports = router;  