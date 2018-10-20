const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const swaggerUi = require('swagger-ui-express');
const Boom = require('boom');
const router = express.Router();

const errorHandler = require('./middleware/errorHandler');

const docs = require('./startup/docs');

// Controllers
const pingController = require('./controllers/pingController');
const rekognitionController = require('./controllers/rekognitionController');

// Express Configuration
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

// App routes
app.use('/ping', pingController);
app.use('/api-docs', swaggerUi.serve, router.get('/', swaggerUi.setup(docs)));
app.use('/rekognition', rekognitionController);

// Error Handling
app.use('*', (req, res, next) => next(Boom.notFound()));
app.use(errorHandler);

module.exports = app;
