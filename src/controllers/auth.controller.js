const httpStatus = require("http-status");
const userService = require("../services/user.service");
const RegisterDto = require("../dtos/auth/register.dto");
const LoginDto = require("../dtos/auth/login.dto");
const jwt = require('jsonwebtoken')

class AuthController {
    async login(req, res, next) {
        // #swagger.tags = ['Auth']
        const loginDto = new LoginDto(req.body);
        const { refreshToken, accessToken, user } = await userService.login(loginDto);

        return res.cookie('jwt-access-token', accessToken, {
            httpOnly: true,
        }).cookie('jwt-refresh-token', refreshToken, {
            httpOnly: true,
        }).status(httpStatus.OK).send(accessToken);
    }

    async register(req, res, next) {
        // #swagger.tags = ['Auth']
        const registerDto = new RegisterDto(req.body);
        const { refreshToken, accessToken, user } = await userService.registration(registerDto);

        return res.cookie('jwt-access-token', accessToken, {
            httpOnly: true,
        }).cookie('jwt-refresh-token', refreshToken, {
            httpOnly: true,
        }).status(httpStatus.OK).send(accessToken);
    }

    async logout(req, res, next) {
        // #swagger.tags = ['Auth']
        const userId = req.user?.id;
        const result = await userService.logout(userId);

        res.clearCookie('jwt-access-token')
            .clearCookie('jwt-refresh-token')
            .status(httpStatus.OK).json({ message: 'Logged out' });
    }

    async refreshTokens(req, res, next) {
        // #swagger.tags = ['Auth']
        const refreshToken = req.cookies['jwt-refresh-token'];
        const tokens = await userService.refresh(refreshToken);
        return res.cookie('jwt-access-token', tokens.accessToken, {
            httpOnly: true,
        }).cookie('jwt-refresh-token', tokens.refreshToken, {
            httpOnly: true,
        }).status(httpStatus.OK).send(tokens.accessToken);
    }
}

module.exports = new AuthController();