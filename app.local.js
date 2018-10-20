const fs = require('fs');
const app = require('./app');
const awsConfig = require('./awsConfig');
const awsCredentials = JSON.parse(
  fs.readFileSync('./awsCredentials.json', 'utf8'),
);

awsConfig.update(awsCredentials);

const port = 8080;

app.listen(port, '0.0.0.0');
console.log(`listening on http://localhost:${port}`);
