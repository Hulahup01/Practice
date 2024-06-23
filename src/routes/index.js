const Router = require('express');
const router = new Router();
const meetupRouter = require('./meetup.router');
const tagRouter =  require('./tag.router');
const swaggerUI= require("swagger-ui-express");
const swaggerSpec = require("../config/swagger/swagger.json");

router.use('/meetups', meetupRouter);
router.use('/tags', tagRouter);
router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

module.exports = router;