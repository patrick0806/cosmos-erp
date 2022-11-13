import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorsResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string | string[];
}
