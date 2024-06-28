const ValidationError = require("../errors/validation.error");
const CreateTagDto = require("../dtos/tag/create-tag.dto");
const UpdateTagDto = require("../dtos/tag/update-tag.dto");
const GetTagDto = require("../dtos/tag/get-tag.dto");
const tagService = require("../services/tag.service");
const httpStatus = require("http-status");
const Tag = require("../models/tag.entity");

class TagController {
    async create(req, res, next) {
        // #swagger.tags = ['Tags']
        // #swagger.description = 'Create new tag'
        /* #swagger.parameters['body'] = {
               in: 'body',
               schema: { $ref: '#/definitions/CreateTag' }
        } */
        const createTagDto = new CreateTagDto(req.body);
        const result = await tagService.create(createTagDto);
        return res.status(httpStatus.OK).json(result);
    }

    async getAll(req, res, next) {
        // #swagger.tags = ['Tags']
        // #swagger.description = 'Get all tags'
        /* #swagger.parameters['page'] = {
               in: 'query',
               required: false,
               type: 'number',
        } */
        /* #swagger.parameters['limit'] = {
               in: 'query',
               required: false,
               type: 'number',
        } */
        const getTagDto = new GetTagDto(req.query);
        const result = await tagService.getAll(getTagDto);
        return res.status(httpStatus.OK).json(result);
    }

    async getById(req, res, next) {
        // #swagger.tags = ['Tags']
        // #swagger.description = 'Get tag by ID'
        /* #swagger.parameters['id'] = {
               type: 'number',
               required: true
        } */
        const { id } = req.params;
        const result = await tagService.getById(id);
        return res.status(httpStatus.OK).json(result);
    }

    async update(req, res, next) {
        // #swagger.tags = ['Tags']
        // #swagger.description = 'Update existing tag'
        /* #swagger.parameters['id'] = {
               type: 'number',
               required: true
        } */
        /* #swagger.parameters['body'] = {
               in: 'body',
               schema: { $ref: '#/definitions/UpdateTag' }
        } */
        const {id} = req.params;
        const updateTagDto = new UpdateTagDto(req.body);
        const result = await tagService.update(id, updateTagDto);
        return res.status(httpStatus.OK).json(result);
    }

    async delete(req, res, next) {
        // #swagger.tags = ['Tags']
        // #swagger.description = 'Delete existing tag'
        /* #swagger.parameters['id'] = {
               type: 'number',
               required: true
        } */
        const {id} = req.params;
        const result = await tagService.delete(id);
        return res.status(httpStatus.OK).json(result);
    }
}

module.exports = new TagController();