import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class FiltroDeExcecaoHttp implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception);

    const context = host.switchToHttp();
    const answer = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const { status, body } =
      exception instanceof HttpException
        ? {
            status: exception.getStatus(),
            body: exception.getResponse(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              path: request.url,
            },
          };

    answer.status(status).json(body);
  }
}
