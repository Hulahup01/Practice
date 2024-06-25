const Router = require('express');
const router = new Router();
const authController = require('../controllers/auth.controller');
const isValid = require('../middleware/validation.middleware');
const asyncHandler = require('express-async-handler');
const loginSchema = require('../schemas/auth/login.schema');
const registerSchema = require('../schemas/auth/register.schema');

router.post('/login', isValid(loginSchema, 'body'),asyncHandler(authController.login));
router.post('/register', asyncHandler(authController.register));
router.get('/logout', asyncHandler(authController.logout));

module.exports = router;