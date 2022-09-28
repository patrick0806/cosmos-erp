import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetUserByEmailService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['email', 'id', 'image', 'name'],
    });
  }
}
