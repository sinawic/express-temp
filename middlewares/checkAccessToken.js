const response = require("../helpers/responseHelper");
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

module.exports = async (req, res, next) => {
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
  console.log(username, password);
  if (
    username === process.env.BASICAUTH_USERNAME &&
    password === process.env.BASICAUTH_PASSWORD
  ) {
    return next();
  }
  return response.error(res, "User or pass was wrong!");
};
