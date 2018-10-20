const app = require('./app');
const awsConfig = require('./awsConfig');

awsConfig.update({
  accessKeyId: 'AKIAIUVIGA727TCFBXGQ',
  secretAccessKey: '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',
});

const port = 8080;

app.listen(port, '0.0.0.0');
console.log(`listening on http://localhost:${port}`);
