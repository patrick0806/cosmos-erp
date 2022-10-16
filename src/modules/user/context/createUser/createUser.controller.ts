import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants/apiTags';
import { UserDTO } from '@shared/dtos';

import { CreateUserService } from './createUser.service';
import { CreateUserRequestDTO } from './dtos/createUser.request.dto';

@ApiTags(API_TAGS.USERS)
@Controller('users')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}
  @ApiBody({ type: CreateUserRequestDTO })
  @ApiResponse({
    status: HttpStatus.OK,
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
  async createUser(@Body() userDTO: CreateUserRequestDTO): Promise<UserDTO> {
    return this.createUserService.execute(userDTO);
  }
}
