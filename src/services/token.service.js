const jwt = require('jsonwebtoken');
const TokenRepository = require('../repositories/token.repository');
const ServiceError = require("../errors/service.error");
const AuthErrors = require("../errors/error-status/auth-errors");

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "1h"});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "10h"});
        return { accessToken, refreshToken };

    }

    verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    }

    async validateRefreshToken(userData, refreshToken) {
        return await TokenRepository.findOne({
            where: {
                userId: userData?.id,
                refreshToken: refreshToken
            }
        })
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenRepository.findOne({
            where: { userId: userId}
        });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();

        }
        return await TokenRepository.create({ userId, refreshToken });
    }

    async removeToken(userId) {
        const deletedRows = await TokenRepository.remove({ where: { userId } });
        if (deletedRows === 0) {
            throw new ServiceError(AuthErrors.USER_NOT_FOUND);
        }
        return { message: `Token deleted successfully` };
    }
}

module.exports = new TokenService();