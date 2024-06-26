const ApiError = require('../errors/api.error');
const ServiceError = require('../errors/service.error');
const AuthError = require('../errors/auth.error');
const ValidationError = require('../errors/validation.error');
const httpStatus = require('http-status');

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message});
    }
    if (err instanceof ServiceError) {
        return res.status(err.status).json({message: err.message});
    }
    if (err instanceof ValidationError) {
        return res.status(err.status).json({message: err.message});
    }
    if (err instanceof AuthError) {
        return res.status(err.status).json({message: err.message});
    }
    console.error(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: "!Unexpected errors!"});
}