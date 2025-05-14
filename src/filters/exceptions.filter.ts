import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let responseMessage = {};

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      responseMessage = exception.getResponse();
    }

    if (exception instanceof InternalServerErrorException) {
      message =
        typeof responseMessage === 'string'
          ? responseMessage
          : JSON.stringify(responseMessage);
    } else if (exception instanceof NotFoundException) {
      message = responseMessage['message'];
    } else if (exception?.code === '23505') {
      status = HttpStatus.CONFLICT;
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
