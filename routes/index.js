const Router = require('express');
const router = new Router();
const meetupRouter = require('./meetupRouter');
const tagRouter =  require('./tagRouter');

router.use('/meetup', meetupRouter);
router.use('/tag', tagRouter);

module.exports = router;