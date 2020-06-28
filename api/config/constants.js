const accessEnv = require('../util/accessEnv');

exports.PORT = (defaultValue) => {
  return accessEnv('PORT', defaultValue);
};

exports.ACCESS_TOKEN_SECRET = () => {
  return accessEnv('ACCESS_TOKEN_SECRET');
};
