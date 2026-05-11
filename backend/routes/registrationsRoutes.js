const router     = require('express').Router();
const controller = require('../controllers/registrationsControllers');
const { autenticato, soloAdmin, soloSéOAdmin, soloSéAdminOrOrganizer } = require('../middlewares/auth');


router.post('/',                 autenticato, controller.crea);
router.get('/',                  autenticato, soloAdmin, controller.getAll);
router.get('/:id', autenticato, soloSéAdminOrOrganizer, controller.getById);
router.get('/event/:id', autenticato, soloSéAdminOrOrganizer, controller.getAllByEventId);
router.get('/user/:id',               autenticato, soloSéAdminOrOrganizer, controller.getAllByUserId);
router.delete('/:id',            autenticato, soloSéAdminOrOrganizer, controller.elimina);

module.exports = router;
