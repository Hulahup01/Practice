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

    nameFilter: Joi.string()
        .min(1)
        .max(255)
        .optional()
        .allow(null),

    descriptionFilter: Joi.string()
        .min(1)
        .max(65535)
        .optional()
        .allow(null),

    timeFilter: Joi.date()
        .iso()
        .optional()
        .allow(null),

    locationFilter: Joi.string()
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
        .allow(null),

    tags: Joi.array()
        .items(
            Joi.string()
                .min(1)
                .max(255)
        )
        .optional()
        .unique()
        .allow(null)

});

module.exports = getMeetupDto;