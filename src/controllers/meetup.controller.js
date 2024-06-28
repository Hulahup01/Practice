const ValidationError = require("../errors/validation.error");
const CreateMeetupDto = require("../dtos/meetup/create-meetup.dto");
const UpdateMeetupDto = require("../dtos/meetup/update-meetup.dto");
const GetMeetupDto = require("../dtos/meetup/get-meetup.dto");
const meetupService = require("../services/meetup.service");
const httpStatus = require("http-status");

class MeetupController {
    async create(req, res, next) {
        // #swagger.tags = ['Meetups']
        // #swagger.description = 'Create new meetup'
        /* #swagger.parameters['body'] = {
               in: 'body',
               schema: { $ref: '#/definitions/CreateMeetup' }
        } */
        const createMeetupDto = new CreateMeetupDto(req.body);
        const result = await meetupService.create(createMeetupDto);
        return res.status(httpStatus.OK).json(result);
    }

    async getAll(req, res, next) {
        // #swagger.tags = ['Meetups']
        // #swagger.description = 'Get all meetups'
        /* #swagger.parameters['page'] = {
               in: 'query',
               required: false,
               type: 'number',
        } */
        /* #swagger.parameters['limit'] = {
               in: 'query',
               required: false,
               type: 'number',
        } */
        /* #swagger.parameters['name'] = {
               in: 'query',
               required: false,
               type: 'string',
        } */
        /* #swagger.parameters['description'] = {
               in: 'query',
               required: false,
               type: 'string',
        } */
        /* #swagger.parameters['time'] = {
               in: 'query',
               required: false,
               type: 'string',
        } */
        /* #swagger.parameters['location'] = {
               in: 'query',
               required: false,
               type: 'string',
        } */
        /* #swagger.parameters['tags'] = {
               in: 'query',
               required: false,
               type: 'array',
        } */
        const getMeetupDto = new GetMeetupDto(req.query);
        const result = await meetupService.getAll(getMeetupDto);
        return res.status(httpStatus.OK).json(result)
    }

    async getById(req, res, next) {
        // #swagger.tags = ['Meetups']
        // #swagger.description = 'Get meetup by ID'
        /* #swagger.parameters['id'] = {
               type: 'number',
               required: true
        } */
        const { id } = req.params;
        const result = await meetupService.getById(id);
        return res.status(httpStatus.OK).json(result);
    }

    async update(req, res, next) {
        // #swagger.tags = ['Meetups']
        // #swagger.description = 'Update existing meetup'
        /* #swagger.parameters['id'] = {
               type: 'number',
               required: true
        } */
        /* #swagger.parameters['body'] = {
               in: 'body',
               schema: { $ref: '#/definitions/UpdateMeetup' }
        } */
        const { id } = req.params;
        const updateMeetupDto = new UpdateMeetupDto(req.body);
        const result = await meetupService.update(id, updateMeetupDto);
        return res.status(httpStatus.OK).json(result);
    }

    async delete(req, res, next) {
        // #swagger.tags = ['Meetups']
        // #swagger.description = 'Delete existing meetup'
        /* #swagger.parameters['id'] = {
               type: 'number',
               required: true
        } */
        const { id } = req.params;
        const result = await meetupService.delete(id);
        return res.status(httpStatus.OK).json(result);
    }
}

module.exports = new MeetupController();