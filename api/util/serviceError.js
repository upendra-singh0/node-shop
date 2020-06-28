class ServiceError extends Error {
  constructor(message, status, statusCode) {
    super(message);
    this.message = message;
    this.status = status;
    this.statusCode = statusCode;
  }

  getStatusCode() {
    return this.statusCode;
  }
}
module.exports = ServiceError;
