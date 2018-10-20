const express = require('express');
const httpStatus = require('http-status');
const boom = require('boom');
const Joi = require('joi');
const AWS = require('aws-sdk');
const atob = require('atob');
const asyncMiddleware = require('../middleware/async');
const awsConfig = require('../awsConfig');

const router = express.Router();

const getBinary = base64Image => {
  const binaryString = atob(base64Image);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

router.post(
  '/',
  asyncMiddleware(async (req, res, next) => {
    const schema = Joi.object().keys({
      image: Joi.binary().encoding('base64'),
    });
    const { error } = Joi.validate(req.body, schema);
    if (error) return next(boom.badRequest(error.details[0].message));
    const { image } = req.body;
    const params = {
      Image: {
        Bytes: getBinary(image),
      },
    };
    const rekognition = new AWS.Rekognition(awsConfig);
    try {
      const labels = await rekognition.detectLabels(params).promise();
      return res.status(httpStatus.OK).json(labels);
    } catch (err) {
      return next(boom.badImplementation(err));
    }
  }),
);

router.get('/', (req, res) => {
  res.status(httpStatus.OK).json({
    message: 'Rekognition',
  });
});

module.exports = router;
