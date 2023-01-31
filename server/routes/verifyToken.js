import jwt from "jsonwebtoken"
import { serialize } from "cookie";
const verifyToken = (req, res, next) => {
    
    const { cookies } = req;

    if (cookies.accessToken) {
      
        jwt.verify(cookies.accessToken, process.env.JWT_SEC, (err, user) => {
          
          if(err){
            res.status(401).json("Invalid token!");
          }else{
            req.user = user
            
            next()
          }
        });

    } else {
      return res.status(403).json({status:"notAuthorized"});
    }
  };
  
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };
  
 const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };

  export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin}