import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { API_ROUTES } from '@shared/constants/apiRoutes';
import { API_TAGS } from '@shared/constants/apiTags';
import { ILog } from '@shared/interfaces';
import { IRequest } from '@shared/interfaces/log.interface';

import { CreateService } from './create.service';
import { CreateStoreDTO } from './dtos/request.dto';

@ApiTags(API_TAGS.STORE)
@Controller(API_ROUTES.STORE)
export class CreateController {
  constructor(private createService: CreateService) {}

  @ApiBody({ type: CreateStoreDTO })
  @Post()
  async handle(
    @Body() storeDTO: CreateStoreDTO,
    @Req() req: IRequest,
  ): Promise<ILog.LogsParams> {
    req.operation = 'createStore';
    const data = await this.createService.execute(storeDTO);

    return {
      data,
      message: 'Loja criada com sucesso',
    };
  }
}
