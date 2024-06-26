const httpStatus = require('http-status');
const ApiError = require("./api.error");

class AuthError extends ApiError{ // ?? оставить выбор статуса или прописать как-то в классе
    constructor(status, message) {
        super(status, message);
    }
}

module.exports = AuthError;