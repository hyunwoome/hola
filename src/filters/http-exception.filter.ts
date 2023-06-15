import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const status = exception.getStatus();
    // const message = exception.getResponse();

    // response.status(status).json({
    //   statusCode: status,
    //   message: message,
    //   timestamp: new Date().toISOString(),
    //   path: request.url,
    // });

    // response form
    // statusCode: 200
    // data: data
    // timestamp: new Date().toISOString(),
    // path: request.url

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.getResponse();
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        data: {
          message: message,
        },
      });
    }
  }
}
