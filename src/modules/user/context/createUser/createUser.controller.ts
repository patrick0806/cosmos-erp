import { Body, Controller, Post } from '@nestjs/common';

import { UserDTO } from '@shared/dtos';

import { CreateUserService } from './createUser.service';
import { CreateUserRequestDTO } from './dtos/createUser.request.dto';

@Controller('users')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  async createUser(@Body() userDTO: CreateUserRequestDTO): Promise<UserDTO> {
    return this.createUserService.execute(userDTO);
  }
}
