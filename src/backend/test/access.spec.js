import './testHelpers';
import app from '../../';

const testFileId = '1843bb75-7f51-445b-9894-b4361223e4e0';

describe.only('access file', function () { // eslint-disable-line
  this.timeout(10000);
  beforeEach(() =>
    chai.request(app)
      .get(`/api/access?id=${testFileId}`)
      .then((res) => {
        this.res = res;
        return res;
      }).catch((err) => {
        console.log(err.response);
        throw (err.response.status);
      }));

  it('return the file', () => {
    console.log(this.res.body);
    return Promise.resolve();
  });
});
