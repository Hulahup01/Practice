const BaseRepository = require('./base.repository');
const Meetup = require("../models/meetup.entity");
const MeetupErrors = require("../errors/error-status/meetup-errors");
const ServiceError = require("../errors/service.error");

class MeetupRepository extends BaseRepository  {
    constructor () {
        super();
        this.model = Meetup;
    }

    async create(body) {
        const meetup = await this.model.create(body);
        await meetup.addTags(body.tags);
        meetup.dataValues.tags = body.tags;
        return meetup;
    }

    async update(id, body) {
        const [updatedCount, updatedMeetups] = await this.model.update(body, {
            where: { id },
            returning: true
        });
        const meetup = updatedMeetups[0];
        if (meetup) {
            meetup.dataValues.tags = body.tags;
            await meetup.setTags(body.tags);
        }
        return meetup;
    }
}

module.exports = new MeetupRepository();