const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'Cheffii API',
    version: '1.0.0',
    description:
      'Cheffii Express Server. This server contains all API and Backend Logic for Cheffii App.',
  },
  schemes: ['http', 'https'],
};

const options = {
  swaggerDefinition,
  apis: ['./controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
