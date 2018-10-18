const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const swaggerUi = require('swagger-ui-express');
const Boom = require('boom');

const errorHandler = require('./middleware/errorHandler');

const docs = require('./startup/docs');

const pingController = require('./controllers/pingController');

// Express Configuration
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(awsServerlessExpressMiddleware.eventContext());

// App routes
app.use('/ping', pingController);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

// Error Handling
app.use('*', (req, res, next) => next(Boom.notFound()));
app.use(errorHandler);

module.exports = app;
