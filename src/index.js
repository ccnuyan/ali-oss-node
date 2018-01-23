import express from 'express';
import path from 'path';
import bodyPaser from 'body-parser';
import session, { MemoryStore } from 'express-session';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import '../serverConfig';

import indexHtml from './web/indexFabricator';

import uploaded from './backend/uploaded';
import callback from './backend/callback';
import luanch from './backend/luanch';
import access from './backend/access';


const app = express();

const PORT = process.env.PORT || serverConfig.port || 10000;

app.use(compression());
app.get('/favicon.ico', express.static('../public/favicon.ico'));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/build', express.static(path.join(__dirname, '../build')));

const store = new MemoryStore();

app.get('/api/access', access);

app.use(session({
  store,
  secret: '1234567890',
  resave: true,
  saveUninitialized: true,
  cookie: { httpOnly: true },
}));

app.use(cookieParser());
app.use(bodyPaser.json());

app.post('/api/callback', (req, res, next) => {
  req.store = store;
  next();
}, callback.verify, callback.callback);

app.use((req, res, next) => {
  req.user = { id: req.session.id };
  next();
});
app.get('/api/uploaded', uploaded);
app.post('/api/luanch', luanch);

app.get('/*', (req, res) => {
  res.send(indexHtml);
});

const server = app.listen(PORT, (err) => {
  if (err) {
    printError(err, __dirname);
  } else {
    printMessage(`app ${serverConfig.host} is listening on port ${PORT}`, __filename);
  }
});

export default server;
