const Joi = require('joi');
const baseSchema = require('../base.schema');

const createTagSchema = baseSchema.keys({
    label: Joi.string()
        .min(1)
        .max(255)
        .required()
});

module.exports = createTagSchema;