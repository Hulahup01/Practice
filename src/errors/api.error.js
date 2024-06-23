const httpStatus = require('http-status');

class ApiError extends Error{
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static internal(message) {
        return new ApiError(httpStatus.INTERNAL_SERVER_ERROR, message);
    }

    static forbidden(message) {
        return new ApiError(httpStatus.FORBIDDEN, message);
    }

    static badRequest(message) {
        return new ApiError(httpStatus.BAD_REQUEST, message);
    }

    static notFound(message) {
        return new ApiError(httpStatus.NOT_FOUND, message);
    }

    static unauthorized(message) {
        return new ApiError(httpStatus.UNAUTHORIZED, message);
    }

    static conflict(message) {
        return new ApiError(httpStatus.CONFLICT, message);
    }

    static serviceUnavailable(message) {
        return new ApiError(httpStatus.SERVICE_UNAVAILABLE, message);
    }

    static gatewayTimeout(message) {
        return new ApiError(httpStatus.GATEWAY_TIMEOUT, message);
    }
}

module.exports = ApiError;