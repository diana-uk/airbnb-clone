export class AppResponse<T> {
  success: boolean;
  data?: T;
  errorMessage?: string;
  statusCode: number;
  message?: string;

  constructor(
    success: boolean,
    statusCode: number,
    data?: T,
    message?: string,
    errorMessage?: string
  ) {
    this.success = success;
    this.data = data;
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
    this.message = message;
  }

  toJSON() {
    return {
      success: this.success,
      data: this.data,
      errorMessage: this.errorMessage,
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}
