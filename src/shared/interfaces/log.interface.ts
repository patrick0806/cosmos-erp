import { Request } from 'express';

import { LEVEL_NAMES, LEVEL_VALUES } from '@shared/enums';

export interface LogsParams {
  operation?: string;
  message: string;
  level?: LEVEL_VALUES;
  levelName?: LEVEL_NAMES;
  referer?: string;
  error?: string;
  errorResponse?: any;
  version?: string;
  duration?: number;
  provider?: string;
  durationUnit?: string;
  data?: any;
}

export interface Logs {
  operation: string;
  _message: string;
  level?: LEVEL_VALUES;
  _level_name?: LEVEL_NAMES;
  referer?: string;
  timestamp?: string;
  _app_name?: string;
  http_req_url?: string;
  error?: string;
  errorResponse?: any;
  http_req_method?: string;
  host?: string;
  duration?: number;
  durationUnit?: string;
}

export interface IRequest extends Request {
  operation?: string;
  durationUnit?: string;
  beginTime?: number;
}
