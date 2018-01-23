import crypto from 'crypto';
import assert from 'assert';
import { Buffer } from 'buffer';
import urlencode from 'urlencode';

const sha1Base64 = str => crypto.createHmac('sha1', serverConfig.ass_key_secret).update(str).digest().toString('base64');

const md5Base64 = str => crypto.createHmac('md5').update(str).digest().toString('base64');

const base64 = str => Buffer.from(str).toString('base64');

const stringToSign = 'PUT\nODBGOERFMDMzQTczRUY3NUE3NzA5QzdFNUYzMDQxNEM=\ntext/html\nThu, 17 Nov 2005 18:49:58 GMT\nx-oss-magic:abracadabra\nx-oss-meta-author:foo@bar.com\n/oss-example/nelson'; // eslint-disable-line
const key = 'OtxrzxIsfpFjA7SwPzILwy8Bw21TLhquhboDYROV';
assert(crypto.createHmac('sha1', key).update(stringToSign).digest().toString('base64') === '26NBxoKdsyly4EDv6inkoDft/yA=');

/* exports */

const getCallback = () => {
  const callbackObj = {
    callbackUrl: serverConfig.callbackUrl,
    callbackBody: '{"user_id":${x:user_id},"file_id":${object},"bucket":${bucket},"object":${object},"etag":${etag},"size":${size},"mimeType":${mimeType},"imageInfo":${imageInfo}}', // eslint-disable-line
    callbackBodyType: 'application/json',
  };
  const callbackBase64 = base64(JSON.stringify(callbackObj));

  return { callbackObj, callbackBase64 };
};

const callback = getCallback();

const getPolicy = ({ key, callbackBase64, minSize, maxSize, expireInSeconds }) => { // eslint-disable-line
  if (!key) {
    throw new Error('object key is required!');
  }
  const now = new Date();
  const policyObj = {
    expiration: new Date(now.getTime() + (expireInSeconds || 30 * 1000)).toISOString(),
    conditions: [
      { bucket: serverConfig.ass_bucket },
      { callback: callbackBase64 },
      ['content-length-range', minSize || 0, maxSize || 1 * 1024 * 1024], // <1m
      ['eq', '$key', key],
    ],
  };
  const policyBase64 = Buffer.from(JSON.stringify(policyObj)).toString('base64');

  const policySignature = sha1Base64(policyBase64);

  return { policyObj, policyBase64, policySignature };
};

const getAuthorization = (verb, contentObj, contentType, objectKey) => {
  // not well tested yet
  let authString = `${verb.toUpperCase()}\n`;
  if (contentObj) {
    const contentMd5 = md5Base64(JSON.stringify(contentObj));
    authString += `${contentMd5}`;
  }
  authString += '\n'; // add new line no matter if there is or no content
  if (contentType) {
    authString += `${contentType}`;
  }
  authString += '\n'; // add new line no matter if there is or no content
  authString += `${new Date().toISOString()}\n`;
  authString += `${serverConfig.ass_bucket}/${objectKey}`;

  const authSignature = sha1Base64(authString);

  return authSignature;
};

const getSignature = (verb, contentObj, contentType, objectKey, timeoutSeconds) => {
  // not well tested yet
  let authString = `${verb.toUpperCase()}\n`;
  if (contentObj) {
    // branch not tested yet
    const contentMd5 = md5Base64(JSON.stringify(contentObj));
    authString += `${contentMd5}`;
  }
  authString += '\n'; // add new line no matter if there is or no content
  if (contentType) {
    // branch not tested yet
    authString += `${contentType}`;
  }
  authString += '\n'; // add new line no matter if there is or no content
  const expires = new Date().getTime() + (timeoutSeconds * 1000);
  authString += `${expires}\n`;
  authString += `/${serverConfig.ass_bucket}/${objectKey}`;

  const authSignature = sha1Base64(authString);

  return {
    OSSAccessKeyId: serverConfig.ass_key_id,
    Expires: expires,
    Signature: encodeURI(authSignature),
  };
};


export default {
  callback,
  getCallback,
  getPolicy,
  getAuthorization,
  getSignature,
};

