// clientError.js
export class ClientError extends Error {
    constructor(message, statusCode = 400) {
      super(message);
      this.status = statusCode;
      this.message = message;
      this.error = true;
    }
  }
  