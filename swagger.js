const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'travel-log-api',
        description: 'API for a logging travel entries and crew members',
    },
    host: "api-travel-log.onrender.com",
    schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
