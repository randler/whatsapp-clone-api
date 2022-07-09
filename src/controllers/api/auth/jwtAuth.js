
 const jwt = require('jsonwebtoken');

 function verifyJWT(req, res, next){

    const authHeader = req.headers.authorization;
    if(!authHeader){
      return res.status(401).json({
          success: false,
          status: 'error',
          message: 'No token provided'
      });
    }

    const bearer = authHeader.split(' ')[0];
    if(bearer !== 'Bearer'){

      return res.status(401).json({
          success: false,
          status: 'error',
          message: 'Invalid token'
      });
    }
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({
          success: false, 
          auth: false, 
          message: 'No token provided.' 
      });
    }
    
    if(!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        status: 'error',
        message: 'JWT_SECRET is not defined'
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {

      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      req.userId = decoded.id;
      next();
    });
}

module.exports = {
    verifyJWT
}