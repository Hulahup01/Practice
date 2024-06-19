const Joi = require('joi');

const updateMeetupDto = Joi.object({

    name: Joi.string()
        .max(255)
        .optional(),

    description: Joi.string()
        .max(65535)
        .optional()
        .allow(null),

    time: Joi.date()
        .iso()
        .optional(),

    location: Joi.string()
        .max(255)
        .optional(),

    tags: Joi.array()
        .items(
            Joi.number()
                .integer()
                .positive()
        )
        .optional()
        .unique()
});

module.exports = updateMeetupDto;

