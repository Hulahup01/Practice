const ApiError = require('../error/apiError');
const ServiceError = require('../error/serviceError');
const ValidationError = require('../error/validationError');

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
    console.log(err);
    return res.status(500).json({message: "Unexpected error!"});
}