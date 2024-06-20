const ServiceError = require("../error/serviceError");
const MeetupErrors = require("../error/meetupErrors");
const TagErrors = require("../error/tagErrors");
const Meetup = require("../models/meetup");
const Tag = require("../models/tag");
const { Op } = require('sequelize');


class MeetupService {

    async create(createMeetupDto) {
        const { tags } = createMeetupDto;
        if (tags) {
            for (let i = 0; i < tags.length; i++) {
                tags[i] = await Tag.findByPk(tags[i]);
                if (!tags[i]) {
                    //?? idk how to do it right 
                    throw ServiceError.notFound(TagErrors.TAG_NOT_FOUND);
                }
            }
        }

        const meetup = await Meetup.create(createMeetupDto);
        await meetup.addTags(tags || []);
        return meetup;
    }

    async getAll(getMeetupDto) {
        //?? not sure which is the best solution
        const { limit, offset } = getMeetupDto;
        const sortFields = [];
        const sortRegex = /Sort$/;
        const filterFields = {};
        for (const key in getMeetupDto) {
            if (sortRegex.test(key)) {
                sortFields.push([key.replace(sortRegex, ''), getMeetupDto[key]]);
            } else if (key !== 'limit' && key !== 'offset') {
                filterFields[key] = {
                    [Op.like]: `%${getMeetupDto[key]}%`
                };
            }
        }

        return await Meetup.findAll({
            include: {
                model: Tag,
                through: { attributes: [] }
            },
            order: sortFields,
            limit: limit,
            offset: offset,
            where: filterFields
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
            //? idk how to do it right 
            throw ServiceError.notFound(MeetupErrors.MEETUP_NOT_FOUND);
        }
        return meetup;
    }

    async update(id, updateMeetupDto) {
        const meetup = await Meetup.findByPk(id);

        if (!meetup) {
            //?? idk how to do it right 
            throw ServiceError.notFound(MeetupErrors.MEETUP_NOT_FOUND);
        }
        
        const { tags } = updateMeetupDto;
        if (tags) {
            for (let i = 0; i < tags.length; i++) {
                tags[i] = await Tag.findByPk(tags[i]);
                if (!tags[i]) {
                    //?? idk how to do it right 
                    throw ServiceError.notFound(TagErrors.TAG_NOT_FOUND);
                }
            }
        }

        await meetup.update(updateMeetupDto);
        if (tags) {
            await meetup.setTags(tags);
        }
        return meetup;
    }

    async delete(id) {
        const meetup = await Meetup.findByPk(id);
        if (!meetup) {
            //?? idk how to do it right 
            throw ServiceError.notFound(MeetupErrors.MEETUP_NOT_FOUND);
        }
        await meetup.destroy();
        return { message: `Meetup ${id} deleted successfully` };
    }
}

module.exports = new MeetupService();