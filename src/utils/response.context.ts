import { HttpStatus } from '@nestjs/common';

interface IResponse<T> {
  status: HttpStatus;
  message: string;
  data: T;
}

export class ApiResponse<TData> {
  public status: HttpStatus;
  public message: string;
  public data: TData;

  constructor(successResponseArgs: IResponse<TData>) {
    this.status = successResponseArgs.status;
    this.message = successResponseArgs.message;
    this.data = successResponseArgs.data;
  }
}
