import { INTERNAL_SERVER_ERROR } from "../config/constants";
import { AppResponse } from "./AppResponse";

export class AppError<T> extends AppResponse<T> {
  constructor({
    errorMessage = INTERNAL_SERVER_ERROR,
    statusCode = 500,
    data,
  }: {
    errorMessage?: string;
    statusCode: number;
    data?: T;
  }) {
    super(false, statusCode, data, errorMessage);
  }
}
