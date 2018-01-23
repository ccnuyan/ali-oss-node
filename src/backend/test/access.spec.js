import './testHelpers';
import app from '../../';

const testFileId = '4e4b4e95-4400-4964-ab75-fc9e113a7211';

describe('access file', function () { // eslint-disable-line
  this.timeout(10000);
  beforeEach(() =>
    chai.request(app)
      .get(`/api/access?id=${testFileId}`)
      .then((res) => {
        this.res = res;
        return res;
      }).catch((err) => {
        throw (err.response.status);
      }));

  it('return the file', () => {
    this.res.should.have.status('200');
    return Promise.resolve();
  });
});
