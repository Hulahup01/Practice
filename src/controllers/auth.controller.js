const httpStatus = require("http-status");
const userService = require("../services/user.service");
const RegisterDto = require("../dto/auth/register.dto");
const LoginDto = require("../dto/auth/login.dto");
const jwt = require('jsonwebtoken')

class AuthController {
    async login(req, res, next) {
        // #swagger.tags = ['Auth']
        const loginDto = new LoginDto(req.body);
        const user = await userService.getByEmailAndPassword(loginDto);

        delete user.dataValues.password;
        const token = jwt.sign(user.dataValues, process.env.JWT_SECRET, {expiresIn: "10min"});

        res.cookie('jwt-token', token, {
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
    }
}

module.exports = new AuthController();