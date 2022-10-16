import { Controller, Param, Get, HttpStatus, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { LOG_NAMES } from '@shared/constants';
import { API_TAGS } from '@shared/constants/apiTags';
import { UserDTO } from '@shared/dtos';
import { ILog } from '@shared/interfaces';
import { IRequest } from '@shared/interfaces/log.interface';

import { GetUserByEmailService } from './getUserByEmail.service';

@ApiTags(API_TAGS.USERS)
@Controller('users')
export class GetUserByEmailController {
  constructor(private getUserByEmailService: GetUserByEmailService) {}

  @Get(':email')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found',
    type: UserDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "can't find user in database",
    //TODO add type in this response
  })
  async createUser(
    @Param('email') email: string,
    @Req() req: IRequest,
  ): Promise<ILog.LogsParams> {
    req.operation = 'findUserByEmail';
    const data = this.getUserByEmailService.execute(email);
    return {
      data,
      message: LOG_NAMES.FIND_MESSAGE('user'),
    };
  }
}
