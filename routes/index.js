const Router = require('express');
const router = new Router();
const meetupRouter = require('./meetup.router');
const tagRouter =  require('./tag.router');

router.use('/meetup', meetupRouter);
router.use('/tag', tagRouter);

module.exports = router;