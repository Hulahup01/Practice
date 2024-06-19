const Joi = require('joi');

const updateTagDto = Joi.object({
    
    label: Joi.string()
        .max(255) 
        .optional()
});

module.exports = updateTagDto;