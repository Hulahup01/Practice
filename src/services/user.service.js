const ServiceError = require("../errors/service.error");
const AuthErrors = require("../errors/error-status/auth-errors");
const User = require("../models/user.entity");
const bcrypt = require("bcrypt");

class UserService {
    async create(registerDto) {
        registerDto.password = await bcrypt.hash(registerDto.password, 10);
        try {
            return (await User.create(registerDto));
        } catch (e) {
            throw new ServiceError(AuthErrors.USER_ALREADY_EXIST); //??
        }
    }

    async getByEmailAndPassword(loginDto) {
        const user = await User.findOne({
            where: { email: loginDto.email }
        });
        if (!user) {
            throw new ServiceError(AuthErrors.USER_NOT_FOUND);
        }
        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw new ServiceError(AuthErrors.INCORRECT_PASSWORD);
        }
        return user;
    }
}

module.exports = new UserService();