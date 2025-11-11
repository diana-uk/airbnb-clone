import { AppResponse } from "./AppResponse";

export class AppSuceess extends AppResponse{
  //   res.status(201).json({
  //     success: true,
  //     data: createdUser,
  //     message: "User created successfully!",
  //   });

  constructor(data: any, message: string) {
    super(true, data, message)
  }
}
