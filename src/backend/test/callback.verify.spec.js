import './testHelpers';
import app from '../../';

const headers = {
  'x-oss-tag': 'CALLBACK',
  'x-oss-signature-version': '1.0',
  'x-oss-requester': '200757446716764916',
  'x-oss-request-id': '5A634A7796CC867AB00C1D60',
  'x-oss-pub-key-url': 'aHR0cHM6Ly9nb3NzcHVibGljLmFsaWNkbi5jb20vY2FsbGJhY2tfcHViX2tleV92MS5wZW0=',
  'x-oss-owner': '52352',
  'x-oss-bucket': 'post-test',
  authorization: 'eugZUpzNaW3Ba40tGc3IUczSmdwfOKS1fXl6xd+QmOITTUPLwhBw1DBBUwaGuLsKYdCauOcHhGCEVMEObQgThA==',
};
const body = {
  bucket: 'post-test',
  object: '42cf77bf-2d25-485a-947c-b9216ee079ee',
  etag: '97E1A27874032FC4B29F007C90DFA372',
  size: 31,
  mimeType: 'image/jpeg',
  imageInfo: null,
};

describe('callback business', function () { // eslint-disable-line
  beforeEach(() =>
    chai.request(app)
      // https://webhook.site/#/3ecb4401-bd1f-4421-a385-46b57f0d6daa/fb869edd-9ffc-4d72-a588-767aedd9f85b/1
      .post('/3ecb4401-bd1f-4421-a385-46b57f0d6daa')
      .set(headers)
      .send(body)
      .then(res => this.res = res) // eslint-disable-line
    ); // eslint-disable-line

  it('could return correct body', () => {
    this.res.body.should.deep.equal(body);
    return Promise.resolve();
  });
});

describe('callback without authorization', function () { // eslint-disable-line
  it('could return 401', () => chai.request(app)
    // https://webhook.site/#/3ecb4401-bd1f-4421-a385-46b57f0d6daa/fb869edd-9ffc-4d72-a588-767aedd9f85b/1
    .post('/3ecb4401-bd1f-4421-a385-46b57f0d6daa')
    .set({ ...headers, authorization: null })
    .send(body)
    .then(() => {
      throw new Error('should not arrive here');
    }, (err) => {
      err.response.should.have.status(401);
    }));
});
