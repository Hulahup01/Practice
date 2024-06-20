const Joi = require('joi');

const getTagDto = Joi.object({

    labelSort: Joi.string()
        .valid("ASC", "DESC")
        .insensitive()
        .optional()
        .allow(null),

    label: Joi.string()
        .min(1)
        .max(255)
        .optional()
        .allow(null),

    offset: Joi.number()
        .integer()
        .min(0)
        .optional()
        .allow(null),

    limit: Joi.number()
        .integer()
        .min(0)
        .optional()
        .allow(null)
});

module.exports = getTagDto;