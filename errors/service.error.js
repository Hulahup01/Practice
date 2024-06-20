const status = require('http-status');
const ApiError = require("./api.error");

class ServiceError extends ApiError{
    constructor(message) {
        super(status.BAD_REQUEST, message);
    }
}

module.exports = ServiceError;