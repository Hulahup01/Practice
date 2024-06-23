const ValidationError = require("../errors/validation.error");
const CreateTagDto = require("../dto/tag/create-tag.dto");
const UpdateTagDto = require("../dto/tag/update-tag.dto");
const GetTagDto = require("../dto/tag/get-tag.dto");
const tagService = require("../services/tag.service");
const httpStatus = require("http-status");

class TagController {
    async create(req, res, next) {
        // #swagger.tags = ['Tags']
        const createTagDto = new CreateTagDto(req.body);
        const result = tagService.create(createTagDto);
        return res.status(httpStatus.OK).json(result);
    }

    async getAll(req, res, next) {
        // #swagger.tags = ['Tags']
        const getTagDto = new GetTagDto(req.query);
        const result = tagService.getAll(getTagDto);
        return res.status(httpStatus.OK).json(result);
    }

    async getById(req, res, next) {
        // #swagger.tags = ['Tags']
        const { id } = req.params;
        const result = await tagService.getById(id);
        return res.status(httpStatus.OK).json(result);
    }

    async update(req, res, next) {
        // #swagger.tags = ['Tags']
        const {id} = req.params;
        const updateTagDto = new UpdateTagDto(req.body);
        const result = await tagService.update(id, updateTagDto);
        return res.status(httpStatus.OK).json(result);
    }

    async delete(req, res, next) {
        // #swagger.tags = ['Tags']
        const {id} = req.params;
        const result = await tagService.delete(id);
        return res.status(httpStatus.OK).json(result);
    }
}

module.exports = new TagController();