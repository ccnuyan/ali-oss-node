import './includes';

import development from './config.development';
import production from './config.production';
import test from './config.test';

let configVar = {};

console.log(`${process.env.NODE_ENV} mode`); // eslint-disable-line

if (process.env.NODE_ENV === 'production') {
  configVar = production;
  configVar.env = 'production';
} else if (process.env.NODE_ENV === 'test') {
  configVar = test;
  configVar.env = 'test';
} else {
  configVar = development;
  configVar.env = 'development';
}
const config = configVar;
global.serverConfig = config;

if (!serverConfig.ass_key_id || !serverConfig.ass_key_secret) {
  console.log('no ass_key_id/ass_key_secret provided !!!');  // eslint-disable-line
  process.exit(1);
}

if (!serverConfig.ass_bucket || !serverConfig.ass_region) {
  console.log('no ass_bucket/ass_region provided !!!');  // eslint-disable-line
  process.exit(1);
}

export default config;
