const Router = require('express');
const router = new Router();
const tagController =  require('../controllers/tag.controller');
const isValid = require('../middleware/validation.middleware');
const createTagSchema = require('../schemas/tag/create-tag.schema');
const updateTagSchema = require('../schemas/tag/update-tag.schema');
const getTagSchema = require('../schemas/tag/get-tag.schema');
const asyncHandler = require('express-async-handler');
const passport = require("passport");

router.get(
    '/',
    isValid(getTagSchema, 'query'),
    asyncHandler(tagController.getAll)
);
router.get(
    '/:id',
    asyncHandler(tagController.getById)
);
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    isValid(createTagSchema, 'body'),
    asyncHandler(tagController.create)
);
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(tagController.delete)
);
router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    isValid(updateTagSchema, 'body'),
    asyncHandler(tagController.update)
);

module.exports = router;