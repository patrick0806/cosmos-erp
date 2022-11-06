import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { LOG_NAMES } from '@shared/constants';
import { API_TAGS } from '@shared/constants/apiTags';
import { UserDTO } from '@shared/dtos';
import { JwtAuthGuard } from '@shared/guards/jwtAuth.guard';
import { ILog } from '@shared/interfaces';
import { IRequest } from '@shared/interfaces/log.interface';

import { CreateUserService } from './createUser.service';
import { CreateUserRequestDTO } from './dtos/createUser.request.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiTags(API_TAGS.USERS)
@Controller('users')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}
  @ApiBody({ type: CreateUserRequestDTO })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created User',
    type: UserDTO,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already registered',
    //TODO add type in this response
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Fail to create user',
    //TODO add type in this response
  })
  @Post()
  async createUser(
    @Body() userDTO: CreateUserRequestDTO,
    @Req() req: IRequest,
  ): Promise<ILog.LogsParams> {
    req.operation = 'createUser';
    const data = await this.createUserService.execute(userDTO);
    return {
      data,
      message: LOG_NAMES.CREATE_MESSAGE('usuário'),
    };
  }
}
