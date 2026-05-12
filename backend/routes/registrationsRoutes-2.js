const router     = require('express').Router();
const controller = require('../controllers/registrationsControllers');
const { autenticato, soloAutorizzati } = require('../middlewares/auth');


router.post('/',                 autenticato, controller.crea);
router.get('/',                  autenticato, soloAutorizzati, controller.getAll);
router.get('/:id', autenticato, soloAutorizzati, controller.getById);
router.get('/event/:id', autenticato, soloAutorizzati, controller.getAllByEventId);
router.get('/user/:id',               autenticato, soloAutorizzati, controller.getAllByUserId);
router.delete('/:id',            autenticato, soloAutorizzati, controller.elimina);

module.exports = router; 
