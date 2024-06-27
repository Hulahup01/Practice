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
        Tags: {
            id: 1,
            label: "Node.js",
        },
        Meetups: {
            id: 1,
            name: "Practice group 8",
            description: "Node.js group",
            place: "Minsk",
            time: "2024-06-21T21:00:00.000Z",
            tags: [
                {
                    id: 1,
                    label: "Node.js"
                }
            ]
        }
    }
}

const outputFile= "./src/config/swagger/swagger.json";
const routes= ["./app.js"]

swaggerAutogen(outputFile, routes, doc);