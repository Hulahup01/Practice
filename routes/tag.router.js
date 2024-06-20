const Router = require('express');
const router = new Router();
const tagController =  require('../controllers/tag.controller');

router.get('/', tagController.getAll);
router.get('/:id', tagController.getById);
router.post('/', tagController.create);
router.delete('/:id', tagController.delete);
router.put('/:id', tagController.update);

module.exports = router;