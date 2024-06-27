const Joi = require('joi');
const baseSchema = require('../base.schema');

const updateTagSchema = baseSchema.keys({
    label: Joi.string()
        .min(1)
        .max(255)
        .optional()
});

module.exports = updateTagSchema;