const ServiceError = require("../errors/service.error");
const TagErrors = require("../errors/error-status/tag-errors");
const Tag = require("../models/tag.entity");

class TagService {
    async create(createTagDto) {
        return (await Tag.create(createTagDto));
    }

    async getAll(getTagDto) {
        const { limit, page } = getTagDto;
        const offset = page * (page - 1) || 0;
        return await Tag.findAll({
            limit: limit,
            offset: offset,
        });
    }

    async getById(id) {
        const tag = await Tag.findByPk(id);
        if (!tag) {
            throw ServiceError.notFound(TagErrors.TAG_NOT_FOUND);
        }
        return tag;
    }

    async update(id, updateTagDto) {
        const tag = await Tag.findByPk(id);
        if (!tag) {
            throw ServiceError.notFound(TagErrors.TAG_NOT_FOUND);
        }
        await tag.update(updateTagDto);
        return tag;
    }

    async delete(id) {
        const tag = await Tag.findByPk(id);
        if (!tag) {
            throw ServiceError.notFound(TagErrors.TAG_NOT_FOUND);
        }
        await tag.destroy();
        return { message: `Tag ${id} deleted successfully` };
    }
}

module.exports = new TagService();