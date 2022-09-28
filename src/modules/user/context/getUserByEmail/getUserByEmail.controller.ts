import { Controller, Param, Get } from '@nestjs/common';
import { UserDTO } from 'src/shared/dtos';
import { GetUserByEmailService } from './getUserByEmail.service';

@Controller('users')
export class GetUserByEmailController {
  constructor(private getUserByEmailService: GetUserByEmailService) {}

  @Get(':email')
  async createUser(@Param('email') email: string): Promise<UserDTO> {
    return this.getUserByEmailService.execute(email);
  }
}
