import { Test } from '@nestjs/testing';

import { CreateController } from '../create.controller';
import { CreateService } from '../create.service';
import { controllerResponse } from './mocks/controllerResponse.moc';
import { mockResponse, paramsMock } from './mocks/response.mock';

describe('Get Countries Controller', () => {
  let controller: CreateController;
  let service: CreateService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CreateController],
      providers: [
        {
          provide: CreateService,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CreateController>(CreateController);
    service = module.get<CreateService>(CreateService);
  });

  it('should by defined controller and service', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should create a new store', async () => {
    jest.spyOn(service, 'execute').mockResolvedValue(mockResponse);
    const response = await controller.handle(
      paramsMock.storeDTO,
      paramsMock.req,
    );

    expect(service.execute).toHaveBeenCalledTimes(1);
    expect(service.execute).toHaveBeenCalledWith(
      paramsMock.storeDTO,
      undefined,
    );

    expect(response).toEqual(controllerResponse);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
