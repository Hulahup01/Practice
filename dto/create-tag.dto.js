const Joi = require('joi');

const createTagDto = Joi.object({

    label: Joi.string()
        .max(255) 
        .required()
});

module.exports = createTagDto;