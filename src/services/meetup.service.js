const ServiceError = require("../errors/service.error");
const MeetupErrors = require("../errors/error-status/meetup-errors");
const Tag = require("../models/tag.entity");
const TagRepository = require("../repositories/tag.repository");
const MeetupRepository = require("../repositories/meetup.repository");
const { Op, Sequelize } = require("sequelize");

class MeetupService {
    async create(createMeetupDto) {
        const { tags } = createMeetupDto;
        if (tags) {
            const tagObjs = [];
            for (let i = 0; i < tags.length; i++) {
                const [tag, created] = await TagRepository.findOrCreate({
                    where: { label: tags[i] },
                    defaults: {
                        label: tags[i],
                    },
                });
                tagObjs.push(tag);
            }
            createMeetupDto.tags = tagObjs;
        }
        return await MeetupRepository.create(createMeetupDto);
    }

    async getAll(getMeetupDto) {
        const { limit, page, sort='id', order='ASC', search, tags } = getMeetupDto;
        const offset = page * (page - 1) || 0;
        const filters = {};

        if (search) {
            filters[Op.or] = [
                {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                },
                {

                    description: {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    location: {
                        [Op.like]: `%${search}%`
                    }
                }
            ];
        }

        if (tags) {
            const tagIds = [];
            const tagModels = await TagRepository.findAll({
                where: {
                    label: tags
                }
            });
            tagIds.push(...tagModels.map(tag => tag.id));
            if (tagIds.length) {
                filters.id = {
                    [Op.in]: Sequelize.literal(`(SELECT "meetupId" FROM "meetup_tags" WHERE "tagId" IN (${tagIds.join(', ')}))`)
                };
            }
        }

        return await MeetupRepository.findAll({
            include: [
                {
                    model: Tag,
                    through: { attributes: [] }
                }
            ],
            order: [[sort, order]],
            limit: limit,
            offset: offset,
            where: filters
        });
    }

    async getById(id) {
        const meetup = await MeetupRepository.findByPk(id, {
            include: {
                model: Tag,
                through: { attributes: [] }
            }
        });
        if (!meetup) {
            throw new ServiceError(MeetupErrors.MEETUP_NOT_FOUND);
        }
        return meetup;
    }

    async update(id, updateMeetupDto) {
        const { tags } = updateMeetupDto;
        if (tags) {
            const tagObjs = [];
            for (let i = 0; i < tags.length; i++) {
                const [tag, created] = await TagRepository.findOrCreate({
                    where: { label: tags[i] },
                    defaults: {
                        label: tags[i],
                    },
                });
                tagObjs.push(tag);
            }
            updateMeetupDto.tags = tagObjs;
        }
        const meetup = await MeetupRepository.update(id, updateMeetupDto);
        if (!meetup) {
            throw new ServiceError(MeetupErrors.MEETUP_NOT_FOUND);
        }
        return meetup;
    }

    async delete(id) {
        const deletedRows = await MeetupRepository.remove({ where: { id } });
        if (deletedRows === 0) {
            throw new ServiceError(MeetupErrors.MEETUP_NOT_FOUND);
        }
        return { message: `Meetup ${id} deleted successfully` };
    }
}

module.exports = new MeetupService();