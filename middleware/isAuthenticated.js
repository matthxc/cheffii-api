const CognitoExpress = require('cognito-express');

// Initializing CognitoExpress constructor
const cognitoExpress = new CognitoExpress({
  region: 'us-west-2',
  cognitoUserPoolId: 'us-west-2_VcoovfQC4',
  tokenUse: 'id',
  tokenExpiration: 3600000
});

const getToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    // Authorization: Bearer g1jipjgi1ifjioj
    // Handle token presented as a Bearer token in the Authorization header
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

module.exports = (req, res, next) => {
  const accessTokenFromClient = getToken(req);

  // Fail if token not present in header.
  if (!accessTokenFromClient) return res.status(401).send('Access Token missing from header');

  cognitoExpress.validate(accessTokenFromClient, (err, response) => {
    // If API is not authenticated, Return 401 with error message.
    if (err) return res.status(401).send(err);

    // Else API has been authenticated. Proceed.
    res.locals.user = response;
    next();
  });
};
