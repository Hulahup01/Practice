const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);
const baseSchema = require('../base.schema');

const registerSchema = baseSchema.keys({
    email: Joi.string()
        .email()
        .min(1)
        .max(255)
        .required(),

    password: joiPassword.string()
        .min(8)
        .max(255)
        .minOfSpecialCharacters(1)
        .minOfLowercase(2)
        .minOfUppercase(2)
        .minOfNumeric(2)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .doesNotInclude(['password'])
        .required()
        // .messages({
        //     'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
        //     'password.minOfSpecialCharacters':
        //         '{#label} should contain at least {#min} special character',
        //     'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
        //     'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
        //     'password.noWhiteSpaces': '{#label} should not contain white spaces',
        //     'password.onlyLatinCharacters': '{#label} should contain only latin characters',
        //     'password.doesNotInclude': '{#label} is too common',
        // }),
});

module.exports = registerSchema;