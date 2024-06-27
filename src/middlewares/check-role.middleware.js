const AuthError = require("../errors/auth.error");
const httpStatus = require("http-status");
const AuthErrors = require("../errors/error-status/auth-errors");

module.exports = function (requiredRoles) {
    return (req, res, next) => {
        const role = req.user.role;
        if (requiredRoles.includes(role)) {
            next();
        } else {
            throw new AuthError(httpStatus.FORBIDDEN, AuthErrors.NOT_ENOUGH_RIGHTS);
        }
    };
}