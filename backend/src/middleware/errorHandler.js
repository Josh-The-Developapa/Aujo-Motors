/* eslint-disable no-unused-vars */
const ErrorResponse = require('../Utils/errorResponse.js');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message
  console.log(err)

  if (err.name === 'CastError') {
    const message = `No post with id of ${ err.value } found`
    error = new ErrorResponse(message, 404)
  }

  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server error',
  });
}

module.exports = errorHandler