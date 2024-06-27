const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);
const baseSchema = require('../base.schema');

const loginSchema = baseSchema.keys({
    email: Joi.string()
        .email()
        .min(1)
        .max(255)
        .required(),

    password: joiPassword.string()
        .required()
});

module.exports = loginSchema;