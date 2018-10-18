const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'Cheffii API',
    version: '1.0.0',
    description: 'Webservice'
  },
  schemes: ['http']
};

const options = {
  swaggerDefinition,
  apis: ['./controllers/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;