const ServiceError = require("../errors/service.error");
const User = require("../models/user.entity");
const bcrypt = require("bcrypt");

class UserService {
    async create(registerDto) {
        registerDto.password = await bcrypt.hash(registerDto.password, 10);
        try {
            return (await User.create(registerDto));
        } catch (e) {
            throw new ServiceError('User already exists'); // ????
        }
    }

    async getUser(loginDto) {
        const user = await User.findOne({
            where: { email: loginDto.email }
        });
        if (!user) {
            throw new ServiceError('User does not exist');
        }
        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw new ServiceError('Incorrect password');
        }
        return user;
    }
}

module.exports = new UserService();