const Router = require('express');
const router = new Router();
const meetupController = require('../controllers/meetup.controller');

router.get('/', meetupController.getAll);
router.get('/:id', meetupController.getById);
router.post('/', meetupController.create);
router.delete('/:id', meetupController.delete);
router.put('/:id', meetupController.update);

module.exports = router;