import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { AxiosError } from 'axios';

import { LOG_NAMES } from '@shared/constants';
import { LEVEL_NAMES, LEVEL_VALUES } from '@shared/enums';
import { LogBuilderService } from '@shared/providers/logBuilder';

@Catch()
export class CaptureExceptionsFilter implements ExceptionFilter {
  protected logBuilder = new LogBuilderService();
  catch(
    exception: Error &
      AxiosError & {
        response: { statusCode: number; message: string; operation: string };
      },
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    this.logBuilder.build(
      {
        message: exception.message || LOG_NAMES.REQUEST_FAILED,
        levelName: LEVEL_NAMES.ERROR,
        level: LEVEL_VALUES.ERROR,
        operation: request.operation,
        errorResponse:
          exception.response?.data ||
          exception.response?.message ||
          exception.response ||
          exception.message,
      },
      request,
    );

    const status =
      exception.response?.status ||
      exception.response?.statusCode ||
      Number(exception.status) ||
      HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      message: exception?.response?.message || exception?.response,
    });
  }
}
