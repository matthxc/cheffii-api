const AWS = require('aws-sdk');

// AWS SDK Global Config
const myCredentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-west-2:d38b79f9-afd9-4e05-9ff7-f49be167d913',
});
const myConfig = new AWS.Config({ credentials: myCredentials });
myConfig.update({ region: 'us-west-2' });

module.exports = myConfig;
