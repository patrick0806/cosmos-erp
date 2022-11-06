import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@shared/entities/user.entity';

@Injectable()
export class GetUserByEmailService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['email', 'id', 'image', 'name'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
