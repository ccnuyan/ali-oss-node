import crypto from 'crypto';
import fetch from 'cross-fetch';

const verify = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: 'not authenticated',
    });
  }
  if (!req.headers['x-oss-pub-key-url']) {
    return res.status(401).send({
      message: 'x-oss-pub-key-url not provided',
    });
  }

  try {
    const publicKeyUrl = Buffer.from(req.headers['x-oss-pub-key-url'], 'base64').toString(); // eslint-disable-line
    const publicKey = await fetch(publicKeyUrl).then(res => res.text()); // eslint-disable-line
    const authString = `${req.path}\n${JSON.stringify(req.body)}`; // eslint-disable-line

    const result = crypto.createVerify('RSA-MD5').update(authString).verify(publicKey, req.headers.authorization, 'base64');

    if (result) {
      next();
    } else {
      throw new Error('verification gives a false result');
    }
  } catch (err) {
    return res.status(401).send({
      message: 'verification failed',
    });
  }

  return Promise.resolve();
};

const callback = (req, res) => {
  if (serverConfig.mode === 'test') {
    return res.send(req.body);
  }
  // test can not cover
  return req.store.get(req.body.user_id, (err, userSession) => {
    if (err || !userSession) {
      return res.status(400).send({ message: `user ${req.body.user_id} not existed` });
    }

    const updatedFile = { // eslint-disable-line
      ...userSession.files[req.body.file_id],
      ...req.body,
      // parse imageInfo if not null
      imageInfo: req.body.imageInfo ? JSON.parse(Buffer.from(req.body.imageInfo, 'base64').toString()) : '',
      status: 1,
    };
    userSession.files[req.body.file_id] = updatedFile; // eslint-disable-line
    return req.store.set(
      req.body.user_id, userSession,
      () => res.send(userSession.files[req.body.file_id]),
    );
  });
};

export default {
  verify, callback,
};

