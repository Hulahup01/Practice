const status = require('http-status');
const ApiError = require("./api.error");

class ValidationError extends ApiError{
    constructor(message) {
        super(status.UNPROCESSABLE_ENTITY, message);
    }
}

module.exports = ValidationError;