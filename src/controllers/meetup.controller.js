const ValidationError = require("../errors/validation.error");
const CreateMeetupDto = require("../dtos/meetup/create-meetup.dto");
const UpdateMeetupDto = require("../dtos/meetup/update-meetup.dto");
const GetMeetupDto = require("../dtos/meetup/get-meetup.dto");
const meetupService = require("../services/meetup.service");
const httpStatus = require("http-status");

class MeetupController {
    async create(req, res, next) {
        // #swagger.tags = ['Meetups']
        const createMeetupDto = new CreateMeetupDto(req.body);
        const result = await meetupService.create(createMeetupDto);
        return res.status(httpStatus.OK).json(result);
    }

    async getAll(req, res, next) {
        // #swagger.tags = ['Meetups']
        const getMeetupDto = new GetMeetupDto(req.query);
        const result = await meetupService.getAll(getMeetupDto);
        return res.status(httpStatus.OK).json(result)
    }

    async getById(req, res, next) {
        // #swagger.tags = ['Meetups']
        const { id } = req.params;
        const result = await meetupService.getById(id);
        return res.status(httpStatus.OK).json(result);
    }

    async update(req, res, next) {
        // #swagger.tags = ['Meetups']
        const { id } = req.params;
        const updateMeetupDto = new UpdateMeetupDto(req.body);
        const result = await meetupService.update(id, updateMeetupDto);
        return res.status(httpStatus.OK).json(result);
    }

    async delete(req, res, next) {
        // #swagger.tags = ['Meetups']
        const {id} = req.params;
        const result = await meetupService.delete(id);
        return res.status(httpStatus.OK).json(result);
    }
}

module.exports = new MeetupController();