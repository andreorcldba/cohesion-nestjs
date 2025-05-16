import { HttpExceptionFilter } from '../http-exception.filter';
import { HttpException, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;

  beforeEach(() => {
    filter = new HttpExceptionFilter();
  });

  it('should catch HttpException and call response.status and response.json', () => {
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

    const exceptionResponse = { message: 'Error occurred' };
    const exception = new HttpException(exceptionResponse, 400);

    const loggerErrorSpy = jest
      .spyOn(Logger, 'error')
      .mockImplementation(() => {});

    filter.catch(exception, mockArgumentsHost);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith(exceptionResponse);

    expect(loggerErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('HTTP Exception:'),
      'HTTP Exception Filter',
    );
  });
});
