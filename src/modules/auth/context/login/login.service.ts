import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from '../../../../shared/dtos';
import { User } from '../../../../shared/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDTO } from './dtos/login.response.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private async validateUser(email, password) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user && user.password !== password) {
      throw new HttpException(
        'User email or password is invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }

    delete user.password;
    return user;
  }

  async execute(email: string, password: string): Promise<LoginResponseDTO> {
    const user = this.validateUser(email, password);
    return {
      accessToken: this.jwtService.sign({ ...user }),
    };
  }
}
