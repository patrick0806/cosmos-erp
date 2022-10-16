import { Injectable, Logger } from '@nestjs/common';
import { hostname } from 'os';

import { LOG_NAMES } from '@shared/constants';
import { LEVEL_NAMES, LEVEL_VALUES } from '@shared/enums';
import { ILog } from '@shared/interfaces';

@Injectable()
export class LogBuilderService {
  private readonly logger = new Logger();

  build(params: ILog.LogsParams, req: ILog.IRequest) {
    delete params.data;
    const log: ILog.Logs = {
      ...params,
      referer: req.originalUrl,
      timestamp: new Date().toUTCString(),
      _app_name: LOG_NAMES.APP_NAME,
      http_req_method: req.method,
      operation: req.operation,
      host: hostname(),
      duration: new Date().getTime() - req.beginTime,
      durationUnit: req.durationUnit,
      _message: params.message,
      _level_name: params.levelName || LEVEL_NAMES.INFO,
      level: params.level || LEVEL_VALUES.INFO,
    };
    switch (log.level) {
      case LEVEL_VALUES.INFO:
        return this.logger.log(JSON.stringify(log, null, 2));
      case LEVEL_VALUES.DEBUG:
        return this.logger.debug(JSON.stringify(log, null, 2));
      default:
        return this.logger.error(JSON.stringify(log, null, 2));
    }
  }
}
