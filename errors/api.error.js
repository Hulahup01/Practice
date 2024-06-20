const status = require('http-status');

class ApiError extends Error{
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static internal(message) {
        return new ApiError(status.INTERNAL_SERVER_ERROR, message);
    }

    static forbidden(message) {
        return new ApiError(status.FORBIDDEN, message);
    }

    static badRequest(message) {
        return new ApiError(status.BAD_REQUEST, message);
    }

    static notFound(message) {
        return new ApiError(status.NOT_FOUND, message);
    }

    static unauthorized(message) {
        return new ApiError(status.UNAUTHORIZED, message);
    }

    static conflict(message) {
        return new ApiError(status.CONFLICT, message);
    }

    static serviceUnavailable(message) {
        return new ApiError(status.SERVICE_UNAVAILABLE, message);
    }

    static gatewayTimeout(message) {
        return new ApiError(status.GATEWAY_TIMEOUT, message);
    }
}

module.exports = ApiError;