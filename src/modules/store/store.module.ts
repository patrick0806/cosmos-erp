import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Store } from '@shared/entities/store.entity';

import { CreateController } from './context/create/create.controller';
import { CreateService } from './context/create/create.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  controllers: [CreateController],
  providers: [CreateService],
})
export class StoreModule {}
