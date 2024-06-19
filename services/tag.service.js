const ServiceError = require("../error/serviceError");
const TagErrors = require("../error/tagErrors");
const Tag = require("../models/tag");

class TagService {

    async create(tagDto) {
        const tag = await Tag.create(tagDto);
        return tag;
    }

    async getAll() {
        const tags = await Tag.findAll();
        return tags;
    }

    async getById(id) {
        const tag = await Tag.findByPk(id);
        if (!tag) {
            //? idk how to do it right 
            throw ServiceError.notFound(TagErrors.TAG_NOT_FOUND);
        }
        return tag;
    }

    async update(id, newTagDto) {
        const tag = await Tag.findByPk(id);
        if (!tag) {
            //?? idk how to do it right 
            throw ServiceError.notFound(TagErrors.TAG_NOT_FOUND);
        }
        await tag.update(newTagDto);
        return tag;
    }

    async delete(id) {
        const tag = await Tag.findByPk(id);
        if (!tag) {
            //?? idk how to do it right 
            throw ServiceError.notFound(TagErrors.TAG_NOT_FOUND);
        }
        await tag.destroy();
        return { message: `Tag ${id} deleted successfully` };
    }
}


module.exports = new TagService();