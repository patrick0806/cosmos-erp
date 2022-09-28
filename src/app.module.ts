import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: ['./database/migrations/*.{ts,js}'],
      synchronize: false,
      logging: false,
    }),
    UserModule,
  ],
})
export class AppModule {}
