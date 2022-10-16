import { Module } from '@nestjs/common';

import { LOG_NAMES } from '@shared/constants';

import { LogBuilderService } from './logBuilder.service';

@Module({
  providers: [
    {
      provide: LOG_NAMES.LOG_BUILDER_PROVIDER,
      useValue: new LogBuilderService(),
    },
  ],
  exports: [LOG_NAMES.LOG_BUILDER_PROVIDER],
})
export class LogBuildModule {}
