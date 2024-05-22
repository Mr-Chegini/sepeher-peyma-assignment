import ApiError from "../errors/ApiError.js";

function apiErrorHandler(err, req, res, next) {
  console.log(err);

  if (err instanceof ApiError) {
    res.status(err.code).json(err, message);
    return;
  }
  res.status(500).json("something went wrong");
}

export default apiErrorHandler;
