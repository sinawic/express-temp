import { Response } from "express";


const success = (res: Response, data: any) => {
  return res.status(200).send({
    status: true,
    message: "",
    data: data,
  });
};

const error = function (res: Response, message: any, statusCode = 404, data = []) {
  return res.status(statusCode).json({
    status: false,
    message: message,
    // type: "error",
    data: data,
  });
};

const exception = function (res: Response, error: any) {
  let data = [];
  let message = error.message;
  data = error.data;
  message = error.message;
  // console.log(error)
  return res.send({
    status: false,
    message: message,
    data: data,
  });
};

export { error, success, exception }