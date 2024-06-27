const Joi = require('joi');
const paginationSchema = require('../pagination.schema');

const getMeetupSchema = paginationSchema.keys({
    sort: Joi.string()
        .valid('NAME', 'TIME', 'LOCATION')
        .insensitive()
        .optional()
        .allow(null),

    order: Joi.string()
        .valid("ASC", "DESC")
        .insensitive()
        .optional()
        .allow(null),

    search: Joi.string()
        .optional()
        .insensitive()
        .min(1)
        .max(255)
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

module.exports = getMeetupSchema;