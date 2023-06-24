var jwt = require("jsonwebtoken");
const JWT_SECRET = "moinisagoodb$oy";

//middleware
const fetchuser = (req, res, next) => {

  //get the user from the jwt token addd id to req object
  const token = req.header('auth-token'); //header name
  if (!token) {
    res.sendStatus(401).send({ error: "pls authonticate the valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
  } 
  catch (error) {
    res.send(401);
  }

  next();
};

module.exports = fetchuser;