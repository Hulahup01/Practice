const Joi = require('joi');
const baseSchema = require('../base.schema');

const updateMeetupSchema = baseSchema.keys({
    name: Joi.string()
        .min(1)
        .max(255)
        .optional(),

    description: Joi.string()
        .min(1)
        .max(65535)
        .optional()
        .allow(null),

    time: Joi.date()
        .iso()
        .optional(),

    location: Joi.string()
        .min(1)
        .max(255)
        .optional(),

    tags: Joi.array()
        .items(
            Joi.string()
                .min(1)
                .max(255)
        )
        .optional()
        .unique()
});

module.exports = updateMeetupSchema;

