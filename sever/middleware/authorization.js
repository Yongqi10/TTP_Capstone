const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res, next) => {
  try {
    const token = req.header("token");

    if (!token) {
      return res.status(403).json("NOT AUTHORIZE");
    }

    const payload = jwt.verify(token, process.env.Secret);
//
    req.user = payload.user;
    req.type = payload.type;
    
    next();
  } catch (err) {
    return res.status(403).json(err.message);
  }
};
