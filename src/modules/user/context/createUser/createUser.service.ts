import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { UserDTO } from '@shared/dtos';
import { User } from '@shared/entities/user.entity';

import { CreateUserRequestDTO } from './dtos/createUser.request.dto';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(user: CreateUserRequestDTO): Promise<UserDTO> {
    const isRegisteredUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (isRegisteredUser) {
      throw new HttpException('User already registered', HttpStatus.CONFLICT);
    }

    user.password = await bcrypt.hash(user.password, 10);

    try {
      const newUser = await this.userRepository.save({
        ...user,
        id: randomUUID(),
      });
      delete newUser.password;
      return newUser;
    } catch (err) {
      throw new HttpException('Fail to create user', HttpStatus.BAD_REQUEST);
    }
  }
}
