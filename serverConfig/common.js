const host = '0c66d1f8.ngrok.io';

export default {
  host,
  resources_stylesheets: {
    semantic: '/semantic/semantic.min.css',
  },
  resources_scripts: {
    jquery: '//cdn.bootcss.com/jquery/3.2.1/jquery.min.js',
    semantic: '/semantic/semantic.min.js',
  },

  ass_key_id: process.env.OSS_KEY_ID,
  ass_key_secret: process.env.OSS_KEY_SECRET,
  ass_bucket: process.env.OSS_BUCKET,
  ass_region: process.env.OSS_REGION,

  callbackUrl: `http://${host}/api/callback`,
};
