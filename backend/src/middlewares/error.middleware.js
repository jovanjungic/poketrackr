// Middleware to handle errors, makes for much easier error management
const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;
    switch (err.name) {
      case "ValidationError":
        error = new Error("Invalid data provided");
        res.status(400);
        break;
      case "UnauthorizedError":
        error = new Error("Unauthorized access");
        res.status(401);
        break;
      case "NotFoundError":
        error = new Error("Resource not found");
        res.status(404);
        break;
      default:
        error = new Error(err.message);
        res.status(500);
        break;
    }
    res.json({
      success: false,
      message: error.message,
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
