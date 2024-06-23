const httpStatus = require('http-status');
const ApiError = require("./api.error");

class ValidationError extends ApiError{
    constructor(message) {
        super(httpStatus.UNPROCESSABLE_ENTITY, message);
    }
}

module.exports = ValidationError;