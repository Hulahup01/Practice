const ValidationError = require("../error/validationError");
const createTagDto = require("../dto/create-tag.dto");
const updateTagDto = require("../dto/update-tag.dto");
const tagService = require("../services/tag.service");

class TagController {
    
    async create(req, res, next) {
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
        tagService.getAll()
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            next(error);
        });
    }

    async getById(req, res, next) {
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