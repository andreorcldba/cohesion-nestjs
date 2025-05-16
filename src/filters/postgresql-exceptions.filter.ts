import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import {
  IPostgreSQLException,
  PgErrorMappingResponse,
} from './interfaces/http-exception.filters.interface';

@Catch(QueryFailedError)
export class PostgreSqlFilter implements ExceptionFilter {
  private getErrorMessage(message: string, code: string) {
    const response: {
      [key: string]: PgErrorMappingResponse;
    } = {
      '23505': {
        status: HttpStatus.CONFLICT,
        error: 'Conflict',
        message,
      },
      default: {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Server Error',
      },
    };

    return response[code] ?? response.default;
  }

  catch({ code, detail }: IPostgreSQLException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { status, message, error } = this.getErrorMessage(detail, code);

    Logger.error(
      `PostgreSQL Error: ${error} - ${message} - ${code} - ${detail}`,
      'PostgreSQL Exception Filter',
    );

    response.status(status).json({
      message,
      error,
      statusCode: status,
    });
  }
}
