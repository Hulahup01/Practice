const Joi = require('joi');
const paginationSchema = require('../pagination.schema');

const getTagSchema = paginationSchema.keys({});

module.exports = getTagSchema;