import { Controller, Param, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants/apiTags';
import { UserDTO } from '@shared/dtos';

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
  async createUser(@Param('email') email: string): Promise<UserDTO> {
    return this.getUserByEmailService.execute(email);
  }
}
