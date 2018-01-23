import './testHelpers';
import app from '../../';

describe('file business', function () { // eslint-disable-line
  this.filename = 'filename.test';

  beforeEach(() => chai.request(app)
    .post('/api/luanch')
    .send({ filename: this.filename }).then(res => this.res = res)); // eslint-disable-line

  it('could return signature', () => {
    this.res.body.data.multipart.should.have.property('signature');
  });

  it('could return OSSAccessKeyId', () => {
    this.res.body.data.multipart.should.have.property('OSSAccessKeyId');
    this.res.body.data.multipart.OSSAccessKeyId.should.equal(serverConfig.ass_key_id);
  });

  it('could return filename', () => {
    this.res.body.data.multipart.should.have.property('name');
    this.res.body.data.multipart.name.should.equal(this.filename);
  });

  it('could return callback', () => {
    this.res.body.data.multipart.should.have.property('callback');
  });

  it('could luanch a uploading transaction', () => {
    this.res.should.have.status(200);
    this.res.body.should.be.an('object');
    this.res.body.data.should.be.an('object');
  });

  it('could return the correct host', () => {
    this.res.body.data.should.have.property('host');
    this.res.body.data.host.should.equal('http://post-test.oss-cn-hangzhou.aliyuncs.com');
  });

  it('could return the correct policy', () => {
    this.res.body.data.multipart.should.have.property('policy');
    const policy = JSON.parse(Buffer.from(this.res.body.data.multipart.policy, 'base64').toString());
    policy.should.have.property('expiration');
    policy.should.have.property('conditions');
    this.res.body.data.multipart.policy.should.equal(Buffer.from(JSON.stringify(this.res.body.data.policy)).toString('base64'));
  });
});
