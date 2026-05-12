const router = require('express').Router();
const controller = require('../controllers/eventsControllers');
const { autenticato, soloAutorizzati } = require('../middlewares/auth');

router.post('/', autenticato, soloAutorizzati, controller.crea);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/category/:category', controller.getAllByCategory);
router.get('/organizer/:id', controller.getAllByOrganizerId);
router.patch('/:id', autenticato, soloAutorizzati, controller.aggiorna);
router.delete('/:id', autenticato, soloAutorizzati, controller.elimina);

module.exports = router; 