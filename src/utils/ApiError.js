// this Error class is a nodejs Error, and ApiError extends that class
class ApiError extends Error {
  // this custom constructor takes in these paraments and which we can override
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
        this.stack = stack
    } else {
        Error.captureStackTrace(this, this.constructor)
    }
  }
}

export {ApiError}