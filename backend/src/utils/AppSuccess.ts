import { AppResponse } from "./AppResponse";

export class AppSuccess<T> extends AppResponse<T> {
  //   res.status(201).json({
  //     success: true,
  //     data: createdUser,
  //     message: "User created successfully!",
  //   });

  constructor({
    data,
    message,
    statusCode = 200,
  }: {
    data: T;
    message?: string;
    statusCode: number;
  }) {
    super(true, statusCode, data, message);
  }
}
