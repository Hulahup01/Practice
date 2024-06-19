const Joi = require('joi');

const createMeetupDto = Joi.object({

    name: Joi.string()
        .max(255)
        .required(),

    description: Joi.string()
        .max(65535)
        .optional()
        .allow(null),

    time: Joi.date()
        .iso()
        .required(),

    location: Joi.string()
        .max(255)
        .required(),

    tags: Joi.array()
        .items(
            Joi.number()
                .integer()
                .positive()
        )
        .optional()
        .unique()
});

module.exports = createMeetupDto;

