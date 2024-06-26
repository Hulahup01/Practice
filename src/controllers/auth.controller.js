const httpStatus = require("http-status");
const userService = require("../services/user.service");
const RegisterDto = require("../dtos/auth/register.dto");
const LoginDto = require("../dtos/auth/login.dto");
const jwt = require('jsonwebtoken')

class AuthController {
    async login(req, res, next) {
        // #swagger.tags = ['Auth']
        const loginDto = new LoginDto(req.body);
        const user = await userService.getByEmailAndPassword(loginDto);

        delete user.dataValues.password;
        const token = jwt.sign(user.dataValues, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.cookie('jwt-access-token', token, { // где хранить название ключ 'jwt-access-token'
            httpOnly: true,
        }).status(httpStatus.OK).send(token);
    }

    async register(req, res, next) {
        // #swagger.tags = ['Auth']
        const registerDto = new RegisterDto(req.body);
        const result = await userService.create(registerDto);
        return res.status(httpStatus.OK).json(result);
    }

    async logout(req, res, next) {
        // #swagger.tags = ['Auth']
        res.clearCookie('jwt-access-token').status(httpStatus.OK).json({ message: 'Logged out' });
    }

    async updateTokens(req, res, next) {
        // #swagger.tags = ['Auth']
    }
}

module.exports = new AuthController();