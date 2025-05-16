import { PostgreSqlFilter } from '../postgresql-exceptions.filter';
import { ArgumentsHost, Logger, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { IPostgreSQLException } from '../interfaces/http-exception.filters.interface';

describe('PostgreSqlFilter', () => {
  let filter: PostgreSqlFilter;

  beforeEach(() => {
    filter = new PostgreSqlFilter();
  });

  it('should handle known PostgreSQL error code 23505 (conflict)', () => {
    const mockJson = jest.fn();
    const mockStatus = jest.fn(() => ({
      json: mockJson,
    })) as unknown as Response;

    const mockResponse = {
      status: mockStatus,
    } as unknown as Response;

    const mockArgumentsHost = {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
      }),
    } as ArgumentsHost;

    const exception = {
      code: '23505',
      detail: 'Unique violation',
    } as unknown as IPostgreSQLException;

    const loggerErrorSpy = jest
      .spyOn(Logger, 'error')
      .mockImplementation(() => {});

    filter.catch(exception, mockArgumentsHost);

    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.CONFLICT);
    expect(mockJson).toHaveBeenCalledWith({
      message: 'Unique violation',
      error: 'Conflict',
      statusCode: HttpStatus.CONFLICT,
    });

    expect(loggerErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('PostgreSQL Error: Conflict'),
      'PostgreSQL Exception Filter',
    );
  });

  it('should handle unknown PostgreSQL error code with internal server error', () => {
    const mockJson = jest.fn();
    const mockStatus = jest.fn(() => ({
      json: mockJson,
    })) as unknown as Response;

    const mockResponse = {
      status: mockStatus,
    } as unknown as Response;

    const mockArgumentsHost = {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
      }),
    } as ArgumentsHost;

    const exception = {
      code: '99999',
      detail: 'Some unknown error',
    } as unknown as IPostgreSQLException;

    const loggerErrorSpy = jest
      .spyOn(Logger, 'error')
      .mockImplementation(() => {});

    filter.catch(exception, mockArgumentsHost);

    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockJson).toHaveBeenCalledWith({
      message: undefined,
      error: 'Internal Server Error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });

    expect(loggerErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('PostgreSQL Error: Internal Server Error'),
      'PostgreSQL Exception Filter',
    );
  });
});
