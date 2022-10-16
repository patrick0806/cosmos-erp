import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { map } from 'rxjs';

import { LogBuilderService } from '@shared/providers/logBuilder';

@Injectable()
export class BuildResponse implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const logBuilder = new LogBuilderService();
    return next.handle().pipe(
      map((params) => {
        const request = context.switchToHttp().getRequest<Request>();

        if (request.url !== '/api/v1/health') {
          logBuilder.build({ ...params }, request);
        }

        return params.data || params;
      }),
    );
  }
}
