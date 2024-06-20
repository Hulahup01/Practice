const ServiceError = require("../error/serviceError");
const TagErrors = require("../error/tagErrors");
const Tag = require("../models/tag");
const { getSortFields, getFilterFields } = require("./utils/getFilterAndSortFields");

class TagService {

    async create(createTagDto) {
        return (await Tag.create(createTagDto));
    }

    async getAll(getTagDto) {
        const { limit, offset } = getTagDto;
        const sortFields = getSortFields(getTagDto);
        const filterFields = getFilterFields(getTagDto);
        return await Tag.findAll({
            order: sortFields,
            limit: limit,
            offset: offset,
            where: filterFields
        });
    }

    async getById(id) {
        const tag = await Tag.findByPk(id);
        if (!tag) {
            //? idk how to do it right 
            throw ServiceError.notFound(TagErrors.TAG_NOT_FOUND);
        }
        return tag;
    }

    async update(id, updateTagDto) {
        const tag = await Tag.findByPk(id);
        if (!tag) {
            //?? idk how to do it right 
            throw ServiceError.notFound(TagErrors.TAG_NOT_FOUND);
        }
        await tag.update(updateTagDto);
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