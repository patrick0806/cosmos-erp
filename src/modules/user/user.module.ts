import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';

import { CreateUserController } from './context/createUser/createUser.controller';
import { CreateUserService } from './context/createUser/createUser.service';
import { GetUserByEmailController } from './context/getUserByEmail/getUserByEmail.controller';
import { GetUserByEmailService } from './context/getUserByEmail/getUserByEmail.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CreateUserController, GetUserByEmailController],
  providers: [CreateUserService, GetUserByEmailService],
})
export class UserModule {}
