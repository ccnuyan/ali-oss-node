import lodash from 'lodash';

import development from './config.development';
import production from './config.production';

let configVar = {};
if (process.env.NODE_ENV === 'production') {
  configVar = production;
  configVar.env = 'production';
} else {
  configVar = development;
  configVar.env = 'development';
}
const config = configVar;
window._ = lodash;
window.config = config;
