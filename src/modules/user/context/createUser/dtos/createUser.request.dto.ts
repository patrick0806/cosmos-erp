import { IsEmail, IsString } from 'class-validator';

export class CreateUserRequestDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  image?: string;
}
