const router = require('express').Router();
const controller = require('../controllers/eventsControllers');
const { autenticato, soloAdmin, } = require('../middlewares/auth');

router.post('/', autenticato, soloOrganizerOrAdmin, controller.crea);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/category/:category', controller.getAllByCategory);
router.get('/organizer/:id', controller.getAllByOrganizerId);
router.patch('/:id', autenticato, soloSéAdminOrOrganizer, controller.aggiorna);
router.delete('/:id', autenticato, soloSéAdminOrOrganizer, controller.elimina);

module.exports = router;