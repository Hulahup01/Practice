const Joi = require('joi');

const getMeetupDto = Joi.object({

    nameSort: Joi.string()
        .valid("ASC", "DESC")
        .insensitive()
        .optional()
        .allow(null),

    timeSort: Joi.string()
        .valid("ASC", "DESC")
        .insensitive()
        .optional()
        .allow(null),

    locationSort: Joi.string()
        .valid("ASC", "DESC")
        .insensitive()
        .optional()
        .allow(null),

    name: Joi.string()
        .min(1)
        .max(255)
        .optional()
        .allow(null),

    description: Joi.string()
        .min(1)
        .max(65535)
        .optional()
        .allow(null),

    time: Joi.date()
        .iso()
        .optional()
        .allow(null),

    location: Joi.string()
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

module.exports = getMeetupDto;