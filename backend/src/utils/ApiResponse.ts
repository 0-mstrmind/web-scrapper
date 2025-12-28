import type { Response } from "express";

class ApiResponse<ResponseObj = object> {
  statusCode: number;
  message: string;
  success: boolean;
  data?: ResponseObj;

  constructor({
    statusCode,
    data,
    message = "success",
  }: {
    statusCode: number;
    data?: ResponseObj;
    message?: string;
  }) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode < 400;
    this.data = data;
  }

  send(res: Response) {
    return res.status(this.statusCode).json({
      success: this.success,
      data: this.data ?? null,
      message: this.message,
    });
  }
}

export { ApiResponse };
