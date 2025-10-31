export class AppSuceess {
  //   res.status(201).json({
  //     success: true,
  //     data: createdUser,
  //     message: "User created successfully!",
  //   });
  data: any;
  message: string;

  constructor(data: any, message: string) {
    this.data = data;
    this.message = message;
  }

  getSuccessJson() {
    return {
      success: true,
      data: this.data,
      message: this.message,
    };
  }
}
