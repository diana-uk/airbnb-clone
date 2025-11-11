export class AppResponse {
  success: boolean;
  data: any;
  message: string;

  constructor(success:boolean, data: any, message: string) {
    this.success = success
    this.data = data;
    this.message = message;
  }

  getJSON() {
    return {
      success: this.success,
      data: this.data,
      message: this.message,
    };
  }
}


const appSuccess = (data: any, message: string) => {
  return {
      success: true,
      data: data,
      message: message,
    };
}