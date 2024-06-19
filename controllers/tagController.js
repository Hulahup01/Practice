const ApiError = require("../error/apiError");
const { Tag } = require("../models/tag");

class TagController {
    
    async create(req, res, next) {
        const {label} = req.body;
        const tag = await Tag.create({label});
        return res.json(tag);
    }

    async getAll(req, res, next) {
        const tags = await Tag.findAll();
        return res.json(tags);
    }

    async getById(req, res, next) {
        const {id} = req.params;
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return next(ApiError.notFound('Tag not found'));
        }
        return res.json(tag);
    }

    async update(req, res, next) {
        const {id} = req.params;
        const {label} = req.body;

        const tag = await Tag.findByPk(id);

        if (!tag) {
            return next(ApiError.notFound('Tag not found'));
        }

        await tag.update({label});

        return res.json(tag);
    }

    async delete(req, res, next) {
        const {id} = req.params;
        const tag = await Tag.findByPk(id);

        if (!tag) {
            return next(ApiError.notFound('Tag not found'));
        }

        await tag.destroy();

        return res.status(200).json({ message: `Tag ${id} deleted successfully` });
    }
}

module.exports = new TagController();