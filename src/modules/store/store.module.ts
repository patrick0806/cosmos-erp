import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImagekitConnector } from '@shared/connector/imagekit/imagekit.connector';
import { Store } from '@shared/entities/store.entity';

import { CreateController } from './context/create/create.controller';
import { CreateService } from './context/create/create.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  controllers: [CreateController],
  providers: [CreateService, ImagekitConnector],
})
export class StoreModule {}
