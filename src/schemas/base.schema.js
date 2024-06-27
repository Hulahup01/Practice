const Joi = require('joi');

const baseSchema = Joi.object().options({
    convert: true,
    abortEarly: false,
});

module.exports = baseSchema;