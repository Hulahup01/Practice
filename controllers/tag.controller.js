const ValidationError = require("../errors/validation.error");
const createTagDto = require("../dto/create-tag.dto");
const updateTagDto = require("../dto/update-tag.dto");
const getTagDto = require("../dto/get-tag.dto");
const tagService = require("../services/tag.service");

class TagController {
    
    async create(req, res, next) {
        // #swagger.tags = ['Tags']
        const { error, value } = createTagDto.validate(req.body);

        if (error) {
            return next(new ValidationError(error.message));
        }

        tagService.create(value)
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            next(error);
        });
    }

    async getAll(req, res, next) {
        // #swagger.tags = ['Tags']
        const { error, value } = getTagDto.validate(req.query);

        if (error) {
            return next(new ValidationError(error.message));
        }

        tagService.getAll(value)
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            next(error);
        });
    }

    async getById(req, res, next) {
        // #swagger.tags = ['Tags']
        const { id } = req.params;
        tagService.getById(id)
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            next(error);
        });
    }

    async update(req, res, next) {
        // #swagger.tags = ['Tags']
        const {id} = req.params;
        const { error, value } = updateTagDto.validate(req.body);

        if (error) {
            return next(new ValidationError(error.message));
        }

        tagService.update(id, value)
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            next(error);
        });
    }

    async delete(req, res, next) {
        // #swagger.tags = ['Tags']
        const {id} = req.params;
        tagService.delete(id)
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            next(error);
        });
    }
}

module.exports = new TagController();