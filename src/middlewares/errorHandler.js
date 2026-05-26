function notFoundHandler(req, res) {
  res.status(404).json({
    error: "NotFound",
    message: "Route not found."
  });
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: err.code || "InternalServerError",
    message: err.message || "Unexpected error occurred."
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
