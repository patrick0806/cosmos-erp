import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { LoginResponseDTO } from './dtos/login.response.dto';
import { LoginService } from './login.service';

@Controller('auth')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post('/login')
  async createUser(
    @Body() { email, password }: LoginDTO,
  ): Promise<LoginResponseDTO> {
    return this.loginService.execute(email, password);
  }
}
