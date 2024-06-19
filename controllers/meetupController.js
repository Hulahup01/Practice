const ApiError = require("../error/apiError");
const { Meetup } = require('../models/meetup');
const { Tag } = require("../models/tag");

class MeetupController {
    
    async create(req, res, next) {
        const {name, description, time, location, tags} = req.body;

        if (tags && tags.length != 0) {
            for (let i = 0; i < tags.length; i++) {
                tags[i] = await Tag.findByPk(tags[i]);
                if (!tags[i]) {
                    return next(ApiError.notFound('Tag not found'));
                }
            }
        }

        const meetup = await Meetup.create({name, description, time, location});
        await meetup.addTags(tags || []);

        return res.json(meetup);
    }

    async getAll(req, res, next) {
        const meetups = await Meetup.findAll({
            include: {
                model: Tag,
                through: { attributes: [] }
            }
            });
        return res.json(meetups);
    }

    async getById(req, res, next) {
        const {id} = req.params;
        const meetup = await Meetup.findByPk(id, {
            include: {
                model: Tag,
                through: { attributes: [] }
            }
        });
        if (!meetup) {
            return next(ApiError.notFound('Meetup not found'));
        }
        return res.json(meetup);
    }

    async update(req, res, next) {
        const {id} = req.params;
        const {name, description, time, location, tags} = req.body;

        const meetup = await Meetup.findByPk(id);

        if (!meetup) {
            return next(ApiError.notFound('Meetup not found'));
        }

        if (tags && tags.length != 0) {
            for (let i = 0; i < tags.length; i++) {
                tags[i] = await Tag.findByPk(tags[i]);
                if (!tags[i]) {
                    return next(ApiError.notFound('Tag not found'));
                }
            }
        }

        await meetup.update({name, description, time, location});
        await meetup.setTags(tags || []);

        return res.json(meetup);
    }

    async delete(req, res, next) {
        const {id} = req.params;
        const meetup = await Meetup.findByPk(id);

        if (!meetup) {
            return next(ApiError.notFound('Meetup not found'));
        }

        await meetup.destroy();

        return res.status(200).json({ message: `Meetup ${id} deleted successfully` });
    }
}

module.exports = new MeetupController();