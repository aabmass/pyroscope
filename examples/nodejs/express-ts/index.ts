/* eslint-disable */
import express from 'express';
import morgan from 'morgan';

import Pyroscope from '@pyroscope/nodejs';

const port = process.env['PORT'] || 3000;

const region = process.env['REGION'] || 'default';

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Available routes are: /bike, /car, /scooter');
});

const genericSearchHandler = (p: number) => (req: any, res: any) => {
  const time = +new Date() + p * 1000;
  let i = 0;
  while (+new Date() < time) {
    i += Math.random();
  }
  res.send('Vehicle found');
};

app.get('/bike', function bikeSearchHandler(req, res) {
  return genericSearchHandler(0.2)(req, res);
});
app.get('/car', function carSearchHandler(req, res) {
  return genericSearchHandler(1)(req, res);
});
app.get('/scooter', function scooterSearchHandler(req, res) {
  return genericSearchHandler(0.5)(req, res);
});

Pyroscope.init({
  appName: 'express-ts',
  serverAddress: 'http://10.128.0.2:4040',
  sourceMapPath: ['.'],
  tags: {
    "version": "1.0.0",
  }
});
Pyroscope.start()

app.listen(port, () => {
  console.log(
    `Server has started on port ${port}, use http://localhost:${port}`
  );
});
