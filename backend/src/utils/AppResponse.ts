export class AppResponse<T> extends Error {
  success: boolean;
  data?: T;
  errorMessage?: string;
  statusCode: number;

  constructor(
    success: boolean,
    statusCode: number,
    data?: T,
    message?: string,
    errorMessage?: string
  ) {
    super(message)
    this.success = success;
    this.data = data;
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
  }

  toJSON() {
    return {
      success: this.success,
      data: this.data,
      errorMessage: this.errorMessage,
      statusCode: this.statusCode,
      message: this.message ? this.message : undefined,
    };
  }
}
