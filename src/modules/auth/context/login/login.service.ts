import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../../../shared/entities/user.entity';
import { LoginResponseDTO } from './dtos/login.response.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private async validateUser(email, password) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user && user.password !== password) {
        throw new HttpException(
          'User email or password is invalid',
          HttpStatus.UNAUTHORIZED,
        );
      }

      delete user.password;
      return user;
    } catch (error) {
      throw new HttpException(
        'User email or password is invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async execute(email: string, password: string): Promise<LoginResponseDTO> {
    const user = await this.validateUser(email, password);
    return {
      accessToken: this.jwtService.sign({ ...user }),
    };
  }
}
