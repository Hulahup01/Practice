const ValidationError = require("../errors/validation.error");
const createMeetupDto = require("../dto/create-meetup.dto");
const getMeetupDto = require("../dto/get-meetup.dto");
const updateMeetupDto = require("../dto/update-meetup.dto");
const meetupService = require("../services/meetup.service");

class MeetupController {
    
    async create(req, res, next) {
        // #swagger.tags = ['Meetups']
        const { error, value } = createMeetupDto.validate(req.body);

        if (error) {
            return next(new ValidationError(error.message));
        }
  
        meetupService.create(value)
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            next(error);
        });
    }

    async getAll(req, res, next) {
        // #swagger.tags = ['Meetups']
        const { error, value } = getMeetupDto.validate(req.query);

        if (error) {
            return next(new ValidationError(error.message));
        }

        meetupService.getAll(value)
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            next(error);
        });
    }

    async getById(req, res, next) {
        // #swagger.tags = ['Meetups']
        const { id } = req.params;
        meetupService.getById(id)
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            next(error);
        });
    }

    async update(req, res, next) {
        // #swagger.tags = ['Meetups']
        const { id } = req.params;
        const { error, value } = updateMeetupDto.validate(req.body);
        if (error) {
            return next(new ValidationError(error.message));
        }
        meetupService.update(id, value)
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            next(error);
        });
    }

    async delete(req, res, next) {
        // #swagger.tags = ['Meetups']
        const {id} = req.params;
        meetupService.delete(id)
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            next(error);
        });
    }
}

module.exports = new MeetupController();