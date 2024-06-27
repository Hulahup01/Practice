const ServiceError = require("../errors/service.error");
const TagErrors = require("../errors/error-status/tag-errors");
const TagRepository = require("../repositories/tag.repository");

class TagService {
    async create(createTagDto) {
        return await TagRepository.create(createTagDto);
    }

    async getAll(getTagDto) {
        const { limit, page } = getTagDto;
        const offset = page * (page - 1) || 0;
        return await TagRepository.findAll({
            limit: limit,
            offset: offset,
        });
    }

    async getById(id) {
        const tag = await TagRepository.findByPk(id);
        if (!tag) {
            throw new ServiceError(TagErrors.TAG_NOT_FOUND);
        }
        return tag;
    }

    async update(id, updateTagDto) {
        const tag = await TagRepository.update(id, updateTagDto);
        if (!tag) {
            throw new ServiceError(TagErrors.TAG_NOT_FOUND);
        }
        return tag;
    }

    async delete(id) {
        const deletedRows = await TagRepository.remove({ where: { id } });
        if (deletedRows === 0) {
            throw new ServiceError(TagErrors.TAG_NOT_FOUND);
        }
        return { message: `Tag ${id} deleted successfully` };
    }
}

module.exports = new TagService();