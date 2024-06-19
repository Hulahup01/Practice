const ServiceError = require("../error/serviceError");
const MeetupErrors = require("../error/meetupErrors");
const TagErrors = require("../error/tagErrors");
const Meetup = require("../models/meetup");
const Tag = require("../models/tag");


class MeetupService {

    async create(meetupDto) {
        const { tags } = meetupDto;
        if (tags && tags.length != 0) {
            for (let i = 0; i < tags.length; i++) {
                tags[i] = await Tag.findByPk(tags[i]);
                if (!tags[i]) {
                    //?? idk how to do it right 
                    throw ServiceError.notFound(TagErrors.TAG_NOT_FOUND);
                }
            }
        }

        const meetup = await Meetup.create(meetupDto);
        await meetup.addTags(tags || []);
        return meetup;
    }

    async getAll() {
        const meetups = await Meetup.findAll({
            include: {
                model: Tag,
                through: { attributes: [] }
            }
            });
        return meetups;
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

    async upadate(id, newMeetupDto) {
        const meetup = await Meetup.findByPk(id);

        if (!meetup) {
            //?? idk how to do it right 
            throw ServiceError.notFound(MeetupErrors.MEETUP_NOT_FOUND);
        }
        
        const { tags } = newMeetupDto;
        if (tags && tags.length != 0) {
            for (let i = 0; i < tags.length; i++) {
                tags[i] = await Tag.findByPk(tags[i]);
                if (!tags[i]) {
                    //?? idk how to do it right 
                    throw ServiceError.notFound(TagErrors.TAG_NOT_FOUND);
                }
            }
        }

        await meetup.update(newMeetupDto);
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