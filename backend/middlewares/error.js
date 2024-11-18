const errorMiddleware = (err, req, res, next) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;
  console.log(err);

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

const TryCatch = (passedFunction) => async (req, res, next) => {
  try {
    await passedFunction(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = { errorMiddleware, TryCatch };
