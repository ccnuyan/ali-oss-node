import uuid from 'uuid';

import utils from './utils';

const getKey = () => uuid.v4();

export default (req, res) => {
  const host = `http://${serverConfig.ass_bucket}.${serverConfig.ass_region}.aliyuncs.com`;
  const key = getKey();
  const policy = utils.getPolicy({ key, callbackBase64: utils.callback.callbackBase64 });

  const retPayload = {
    message: 'upload transaction created',
    data: {
      host,
      policy: policy.policyObj, // inform client the upload policy
      multipart: {
        // business
        id: key,
        'x:user_id': req.user.id,
        /*
         * oss required
         * these params should satisfy the conditions included in policy
         */
        key,
        filename: req.body.filename,
        OSSAccessKeyId: serverConfig.ass_key_id,
        policy: policy.policyBase64,
        signature: policy.policySignature,
        callback: utils.callback.callbackBase64,
      },
    },
  };

  if (!req.session.files) {
    req.session.files = {};
  }

  req.session.files[key] = {
    id: key,
    filename: req.body.filename,
    status: -1, // -1 means luanched but not updated by callback
  };

  return res.send(retPayload);
};
