import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants/apiTags';

import { LoginDTO } from './dtos/login.request.dto';
import { LoginResponseDTO } from './dtos/login.response.dto';
import { LoginService } from './login.service';

@ApiTags(API_TAGS.AUTH)
@Controller('auth')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post('/login')
  @ApiBody({ type: LoginDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Authorization with success',
    type: LoginResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User email or password is invalid',
    //TODO type this,
  })
  async createUser(
    @Body() { email, password }: LoginDTO,
  ): Promise<LoginResponseDTO> {
    return this.loginService.execute(email, password);
  }
}
