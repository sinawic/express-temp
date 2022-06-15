import * as response from "../helpers/responseHelper";
import { verifyJWTtoken } from "../helpers/jwtHelper";
import { NextFunction, Request, Response } from "express";
require("dotenv").config();

export const basicAuth = async (req: Request, res: Response, next: NextFunction) => {
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

export const jwtAuth = async (req: Request | any, res: Response, next: NextFunction) => {
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
