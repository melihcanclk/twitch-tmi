var infos = require('./oauth.js')

const options = {
    options: {
      debug: false
    },
    connection: {
      reconnect: false
    },
    identity: {
      username: infos.username,
      password: infos.oauth
    },
    channels: infos.channels
  };
  
  
  module.exports = options;
