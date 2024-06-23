const Joi = require('joi');
const baseSchema = require('../base.schema');

const createMeetupSchema = baseSchema.keys({
    name: Joi.string()
        .min(1)
        .max(255)
        .required(),

    description: Joi.string()
        .min(1)
        .max(65535)
        .optional()
        .allow(null),

    time: Joi.date()
        .iso()
        .required(),

    location: Joi.string()
        .min(1)
        .max(255)
        .required(),

    tags: Joi.array()
        .items(
            Joi.string()
                .min(1)
                .max(255)
        )
        .optional()
        .unique()
});

module.exports = createMeetupSchema;

