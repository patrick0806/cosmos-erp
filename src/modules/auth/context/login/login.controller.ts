import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LOG_NAMES } from '@shared/constants';
import { API_TAGS } from '@shared/constants/apiTags';
import { ILog } from '@shared/interfaces';
import { IRequest } from '@shared/interfaces/log.interface';

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
    @Req() req: IRequest,
  ): Promise<ILog.LogsParams> {
    req.operation = 'login';
    const data = await this.loginService.execute(email, password);
    return {
      data,
      message: LOG_NAMES.BUILD_MESSAGE(' validação do usuário'),
    };
  }
}
