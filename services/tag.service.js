const ServiceError = require("../error/serviceError");
const TagErrors = require("../error/tagErrors");
const Tag = require("../models/tag");
const { Op } = require('sequelize');

class TagService {

    async create(createTagDto) {
        return (await Tag.create(createTagDto));
    }

    async getAll(getTagDto) {
        //?? not sure which is the best solution
        const { limit, offset } = getTagDto;
        const sortFields = [];
        const sortRegex = /Sort$/;
        const filterFields = {};
        for (const key in getTagDto) {
            if (sortRegex.test(key)) {
                sortFields.push([key.replace(sortRegex, ''), getTagDto[key]]);
            } else if (key !== 'limit' && key !== 'offset') {
                filterFields[key] = {
                    [Op.like]: `%${getTagDto[key]}%`
                };
            }
        }
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