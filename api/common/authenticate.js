const jwt = require('jsonwebtoken');
const accessEnv = require('../util/accessEnv');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ message: ' cannot access' });

    jwt.verify(token, accessEnv('ACCESS_TOKEN_SECRET'), (err, user) => {
      if (err) return res.status(403).json({ message: ' wrong toekn' });
      req.userData = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
