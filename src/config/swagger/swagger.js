const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Meetup API',
        version: '1.0',
        description: 'Meetup API Information',
    },
    host: "localhost:5000",
    basePath: "/",
    tags: [
        {
            name: "Meetups",
            description: "Endpoint"
        },
        {
            name: "Tags",
            description: "Endpoint"
        },
        {
            name: "Auth",
            description: "Endpoint"
        },
    ],
    definitions: {
        UpdateMeetup: {
            name: "New name",
            description: "New description",
            time: "2024-06-09 16:30:00.000+0300",
            location: "New location",
            tags: ["Nodejs", "JS"],
        },
        GetMeetup: {
            page: '1',
            limit: '3',
            sort: 'name',
            order: 'asc',
            search: '',
            tags: []
        },
        CreateMeetup: {
            $name: "Meetup NodeJs 1",
            description: "Group 8",
            $time: "2024-06-10 19:30:00.000+0300",
            $location: "Space",
            tags: ['Nodejs', 'JS'],
        },
        UpdateTag: {
            label: "New label",
        },
        GetTag: {
            page: '1',
            limit: '3',
        },
        CreateTag: {
            $label: "Nodejs",
        },
        Login: {
            $email: "boss@gmail.com",
            $password: "12345678",
        },
        Register: {
            $email: "aboba@gmail.com",
            $password: "123",
        },
    }
}

const outputFile= "./src/config/swagger/swagger.json";
const routes= ["./app.js"]

swaggerAutogen(outputFile, routes, doc);