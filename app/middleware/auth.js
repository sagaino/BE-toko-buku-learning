const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    try {
      const tokenHeader = req.headers.authorization;
      const token = tokenHeader.substring(7);
      jwt.verify(token, 'secret', (err, decode) => {
        if (err) {
          res.status(401).json({
            message: err.message
          });
        }
        if (decode) {
          req.user = decode.user;
          next();
        }
      })
    } catch (err) {
      res.status(401).json({
        message: 'invalid token'
      });
    }
  }
}