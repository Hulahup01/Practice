const Router = require('express');
const router = new Router();
const passport = require("passport")
const meetupController = require('../controllers/meetup.controller');
const isValid = require('../middleware/validation.middleware');
const createMeetupSchema = require('../schemas/meetup/create-meetup.schema');
const updateMeetupSchema = require('../schemas/meetup/update-meetup.schema');
const getMeetupSchema = require('../schemas/meetup/get-meetup.schema');
const asyncHandler = require('express-async-handler');

router.get(
    '/',
    isValid(getMeetupSchema, 'query'),
    asyncHandler(meetupController.getAll)
);
router.get(
    '/:id',
    asyncHandler(meetupController.getById)
);
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    isValid(createMeetupSchema,'body'),
    asyncHandler(meetupController.create)
);
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }) ,
    asyncHandler(meetupController.delete)
);
router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    isValid(updateMeetupSchema, 'body'),
    asyncHandler(meetupController.update)
);

module.exports = router;