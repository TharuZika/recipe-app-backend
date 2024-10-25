const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  console.log("IN AUTH MIDDLEWARE");
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log("Extracted Token:", token);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ msg: 'Token expired, please log in again' });
        }
        return res.status(403).json({ msg: 'Token is not valid' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ msg: 'Authorization token required' });
  }
};

module.exports = authMiddleware;
