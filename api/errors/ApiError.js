class ApiError  extends Error {
  constructor(errorCode, message, statusCode) {
    supper(message)
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }

  static badRequest(msg) {
    return new ApiError(400, msg);
  }

  static internal(msg) {
    return new ApiError(500, msg);
  }

  static notFound(msg) {
    return new ApiError(404, msg);
  }
}

export default ApiError;
