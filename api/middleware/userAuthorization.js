const jsonwebtoken = require("jsonwebtoken");
const resources = require("../../config/resource");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    jsonwebtoken.verify(
      bearerToken,
      resources.JWT.SECRET,
      function (err, decoded) {
        if (err) res.send(resources.ERRORS.USER_NOT_AUTHORIZED);

        if (
          typeof decoded.data.username !== undefined &&
          typeof decoded.data.password !== undefined
        ) {
          req.userCredentials = {
            username: decoded.data.username,
            password: decoded.data.password,
          };
          next();
        } else {
          res.send(resources.ERRORS.USER_NOT_AUTHORIZED);
        }
      }
    );
  } else {
    // res.sendStatus(403);
    res.send(resources.ERRORS.USER_NOT_AUTHORIZED);
  }
};

module.exports = verifyToken;
