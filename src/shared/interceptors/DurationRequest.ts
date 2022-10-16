import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { IRequest } from '@shared/interfaces/log.interface';

@Injectable()
export class DurationRequest {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<IRequest>();
    request.beginTime = new Date().getTime();
    request.durationUnit = 'Milliseconds';

    return next.handle();
  }
}
