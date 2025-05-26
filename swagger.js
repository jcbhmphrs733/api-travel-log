const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'travel-log-api',
        description: 'API for a logging travel entries',
    },
    host: 'localhost:3000',
    schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
