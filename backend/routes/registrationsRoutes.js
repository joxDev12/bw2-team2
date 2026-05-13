const router     = require('express').Router();
const controller = require('../controllers/registrationsControllers');
const { autenticato,
    soloAdmin,
    soloAdminOStessoUtente,
  soloAdminOOrganizer,
  soloPartecipant,
  soloAdminOOrganizerProprietarioEvento,
  soloAdminOProprietarioRegistrazione,
  soloAdminOProprietarioRegistrazioneOOrganizerEvento } = require('../middlewares/auth');


router.post('/',                 autenticato, soloPartecipant, controller.crea);
router.get('/',                  autenticato, soloAdmin, controller.getAll);
router.get('/:id', autenticato, soloAdminOProprietarioRegistrazione, controller.getById);
router.get('/event/:id', autenticato, soloAdminOOrganizerProprietarioEvento, controller.getAllByEventId);
router.get('/user/:id',               autenticato, soloAdminOStessoUtente, controller.getAllByUserId);
router.delete('/:id',            autenticato, soloAdminOProprietarioRegistrazione, controller.elimina);

module.exports = router; 
 