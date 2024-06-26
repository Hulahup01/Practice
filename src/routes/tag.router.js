const Router = require('express');
const router = new Router();
const passport = require("passport");
const tagController =  require('../controllers/tag.controller');
const createTagSchema = require('../schemas/tag/create-tag.schema');
const updateTagSchema = require('../schemas/tag/update-tag.schema');
const getTagSchema = require('../schemas/tag/get-tag.schema');
const checkRole = require('../middleware/check-role.middleware');
const isValid = require('../middleware/validation.middleware');
const asyncHandler = require('express-async-handler');

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
    checkRole(['ORGANIZER', 'ADMIN']),
    isValid(createTagSchema, 'body'),
    asyncHandler(tagController.create)
);
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    checkRole(['ORGANIZER', 'ADMIN']),
    asyncHandler(tagController.delete)
);
router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    checkRole(['ORGANIZER', 'ADMIN']),
    isValid(updateTagSchema, 'body'),
    asyncHandler(tagController.update)
);

module.exports = router;