const response = require("../helpers/responseHelper");
const { verifyJWTtoken } = require("../helpers/jwtHelper");
require("dotenv").config();

/**
 * @description checks the Basic Authentication
 * @function anoynomous
 * @middleware
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} next
 * @returns {Promise<any>}
 */

module.exports.basicAuth = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf("Basic ") === -1
  ) {
    return res
      .status(401)
      .json({ message: "Missing basic Authorization Header" });
  }

  // verify auth credentials
  const base64Credentials = req.headers.authorization.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");
  if (
    username === process.env.BASICAUTH_USERNAME &&
    password === process.env.BASICAUTH_PASSWORD
  ) {
    return next();
  }
  return response.error(res, "User or pass was wrong!");
}

module.exports.jwtAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    try {
      req.user = await verifyJWTtoken(token)
      next()
    } catch (err) {
      console.log(err)
      return res.status(401).json({ message: "Unauthorized" })
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" })
  }
}
