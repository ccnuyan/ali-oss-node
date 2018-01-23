import chai from 'chai';
import chaiHttp from 'chai-http';

import '../../../serverConfig';

import app from '../../';

global.should = chai.should();
global.chai = chai;
global.expect = chai.expect;
chai.use(chaiHttp);

after((done) => {
  app.close(done);
});
