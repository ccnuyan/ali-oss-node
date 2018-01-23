import querystring from 'querystring';
import utils from './utils';

export default (req, res) => {
  const fileId = req.query.id;
  const Signature = utils.getSignature('get', null, null, fileId, 60);
  return res.status(302).redirect(`http://${serverConfig.ass_bucket}.${serverConfig.ass_region}.aliyuncs.com/${fileId}?${querystring.stringify(Signature)}`); // eslint-disable-line
};
