const Router = require('express');
const router = new Router();
const passport = require("passport");
const authController = require('../controllers/auth.controller');
const loginSchema = require('../schemas/auth/login.schema');
const registerSchema = require('../schemas/auth/register.schema');
const isValid = require('../middlewares/validation.middleware');
const asyncHandler = require('express-async-handler');

router.post(
    '/login',
    isValid(loginSchema, 'body'),
    (authController.login)
);
router.post(
    '/register',
    /*isValid(registerSchema, 'body'),*/
    asyncHandler(authController.register)
);
router.get(
    '/logout',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(authController.logout)
);

router.post(
    '/update-tokens',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(authController.updateTokens)
);

module.exports = router;