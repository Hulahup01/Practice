const ServiceError = require("../errors/service.error");
const MeetupErrors = require("../errors/error-status/meetup-errors");
const Meetup = require("../models/meetup.entity");
const Tag = require("../models/tag.entity");
const { Op, Sequelize } = require("sequelize");

class MeetupService {
    async create(createMeetupDto) {
        const meetup = await Meetup.create(createMeetupDto);

        const { tags } = createMeetupDto;
        if (tags) {
            const tagObjs = [];
            for (let i = 0; i < tags.length; i++) {
                const [tag, created] = await Tag.findOrCreate({
                    where: { label: tags[i] },
                    defaults: {
                        label: tags[i],
                    },
                });
                tagObjs.push(tag);
            }
            await meetup.addTags(tagObjs);
            meetup.dataValues.tags = tagObjs; //? чтобы митап возвращался вместе с его тегами
        }

        return meetup;
    }

    async getAll(getMeetupDto) { // ????????????????
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
            const tagModels = await Tag.findAll({
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

        return await Meetup.findAll({
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
        const meetup = await Meetup.findByPk(id, {
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
        const meetup = await Meetup.findByPk(id);
        if (!meetup) {
            throw ServiceError.notFound(MeetupErrors.MEETUP_NOT_FOUND);
        }
        await meetup.update(updateMeetupDto);

        const { tags } = updateMeetupDto;
        if (tags) {
            const tagObjs = [];
            for (let i = 0; i < tags.length; i++) {
                const [tag, created] = await Tag.findOrCreate({
                    where: { label: tags[i] },
                    defaults: {
                        label: tags[i],
                    },
                });
                tagObjs.push(tag);
            }
            await meetup.setTags(tagObjs);
            meetup.dataValues.tags = tagObjs; //? чтобы митап возвращался вместе с его тегами
        }

        return meetup;
    }

    async delete(id) {
        const meetup = await Meetup.findByPk(id);
        if (!meetup) {
            throw ServiceError.notFound(MeetupErrors.MEETUP_NOT_FOUND);
        }
        await meetup.destroy();
        return { message: `Meetup ${id} deleted successfully` };
    }
}

module.exports = new MeetupService();