import ApiError from "../errors/ApiError.js";

function apiErrorHandler(err, req, res, next) {
  console.log(err);

  if (err instanceof ApiError) {
    console.log("err.message:", err.message)
    console.log("err.code:", err.code)
    res.status(err.code).json(err, message);
    return;
  }
  res.status(500).json("something went wrong");
}

export default apiErrorHandler;
