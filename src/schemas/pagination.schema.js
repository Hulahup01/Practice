const Joi = require('joi');
const baseSchema = require('./base.schema');

const paginationSchema = baseSchema.keys({
    page: Joi.number()
        .integer()
        .min(0)
        .optional()
        .allow(null),

    limit: Joi.number()
        .integer()
        .min(0)
        .optional()
        .allow(null),
});

module.exports = paginationSchema;