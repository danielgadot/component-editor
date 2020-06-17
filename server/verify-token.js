function verifyToken(req, res, next) {
    // get auth header value
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
      // split and take the token
      const bearer = bearerHeader.split(' ');
      // get token from array
      const bearerToken = bearer[1];
      // set the token
      req.token = bearerToken;
      // next middleware
      
      next();
    } else {
      // forbidden
      res.sendStatus(403)
      res.send('forbidden, you dont have a token');
    }
  }

  module.exports = verifyToken;