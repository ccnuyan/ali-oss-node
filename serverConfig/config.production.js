import config from './common';

export default {
  ...config,
  mode: 'production',
  title: 'ass-node',
  port: 80,
  callbackUrl: `http://${process.env.HOST || config.host}/api/callback`,
};

