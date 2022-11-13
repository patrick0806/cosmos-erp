import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiErrorsResponse } from '@shared/constants/apiErros';
import { API_ROUTES } from '@shared/constants/apiRoutes';
import { API_TAGS } from '@shared/constants/apiTags';
import { ILog } from '@shared/interfaces';
import { IRequest } from '@shared/interfaces/log.interface';

import { CreateService } from './create.service';
import { CreateStoreRequestDTO } from './dtos/request.dto';
import { CreateStoreResponseDTO } from './dtos/response.dto';

@ApiTags(API_TAGS.STORE)
@Controller(API_ROUTES.STORE)
export class CreateController {
  constructor(private createService: CreateService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        plan: { type: 'string' },
        logo: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: ' Store created with success',
    type: CreateStoreResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid body',
    type: ApiErrorsResponse,
  })
  @ApiResponse({
    status: 409,
    description: 'Already Exist Store',
    type: ApiErrorsResponse,
  })
  @Post()
  @UseInterceptors(FileInterceptor('logo'))
  async handle(
    @Body() storeDTO: CreateStoreRequestDTO,
    @Req() req: IRequest,
    @UploadedFile() logo?: Express.Multer.File,
  ): Promise<ILog.LogsParams> {
    req.operation = 'createStore';
    const data = await this.createService.execute(storeDTO, logo);

    return {
      data,
      message: 'Createad Store With success',
    };
  }
}
