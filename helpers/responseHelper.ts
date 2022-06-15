/**
 * Response Helper
 * @module responseHelper
 * @version 1.0.0
 */

/**
 * @description it makes a successful response for a successful condition
 * @function success
 * @param {Express.Response} res
 * @param {*} data
 * @returns {{status: boolean, message: string, data: any}}
 */

const success = (res, data) => {
  return res.status(200).send({
    status: true,
    message: "",
    data: data,
  });
};

/**
 * @description it makes a response for error by status code
 * @function error
 * @param {Express.Response} res
 * @param {string} message
 * @param {number} [statusCode=404]
 * @param {Array} [data=[]]
 * @returns
 */

const error = function (res, message, statusCode = 404, data = []) {
  return res.status(statusCode).json({
    status: false,
    message: message,
    // type: "error",
    data: data,
  });
};

/**
 * @description it converts an Exception error to user error response
 * @function exception
 * @param {Express.Response} res
 * @returns {{status: boolean, message: string, data: []}}
 */

const exception = function (res, error) {
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