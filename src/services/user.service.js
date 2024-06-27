const ServiceError = require("../errors/service.error");
const AuthError = require("../errors/auth.error");
const AuthErrors = require("../errors/error-status/auth-errors");
const UserRepository = require("../repositories/user.repository");
const tokenService = require("../services/token.service");
const createAndSaveTokens = require('./utils/createAndSaveTokens');
const bcrypt = require("bcrypt");
const httpStatus = require("http-status");

class UserService {
    async registration(registerDto) {
        registerDto.password = await bcrypt.hash(registerDto.password, 10);
        try {
            const user = await UserRepository.create(registerDto);
            const tokens = await createAndSaveTokens(user);

            return { ...tokens, user };
        } catch (e) {
            throw new ServiceError(AuthErrors.USER_ALREADY_EXIST); /// ?????
        }
    }

    async login(loginDto) {
        const user = await UserRepository.findOne({
            where: { email: loginDto.email }
        });
        if (!user) {
            throw new ServiceError(AuthErrors.USER_NOT_FOUND);
        }
        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw new ServiceError(AuthErrors.INCORRECT_PASSWORD);
        }
        const tokens = await createAndSaveTokens(user);

        return { ...tokens, user };
    }

    async logout(userId) {
        return await tokenService.removeToken(userId);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new AuthError(httpStatus.UNAUTHORIZED, AuthErrors.UNAUTHORIZED);
        }
        const userData = await tokenService.verifyRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.validateRefreshToken(userData, refreshToken);
        if (!tokenFromDb) {
            throw new AuthError(httpStatus.UNAUTHORIZED, AuthErrors.UNAUTHORIZED);
        }
        const user = await UserRepository.findOne({
            where: { id: userData.id }
        });

        return await createAndSaveTokens(user);
    }
}

module.exports = new UserService();