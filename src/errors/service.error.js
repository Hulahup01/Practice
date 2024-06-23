const httpStatus = require('http-status');
const ApiError = require("./api.error");

class ServiceError extends ApiError{
    constructor(message) {
        super(httpStatus.BAD_REQUEST, message);
    }
}

module.exports = ServiceError;