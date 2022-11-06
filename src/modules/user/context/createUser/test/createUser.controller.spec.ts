import { Test } from '@nestjs/testing';

import { IRequest } from '@shared/interfaces/log.interface';

import { CreateUserController } from '../createUser.controller';
import { CreateUserService } from '../createUser.service';
import { controllerResponse } from './mock/controllerResponse.mock';
import { params } from './mock/params.mock';
import { userMock } from './mock/user.mock';

describe('Create user controller', () => {
  let createUserController: CreateUserController;
  let createUserService: CreateUserService;

  beforeEach(async () => {
    const createUserModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        {
          provide: CreateUserService,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    createUserController = createUserModule.get(CreateUserController);
    createUserService = createUserModule.get(CreateUserService);
  });

  it('Create user Controller and Service should be defined', () => {
    expect(createUserController).toBeDefined();
    expect(createUserService).toBeDefined();
  });

  it('Should create user with success', async () => {
    const req = {} as IRequest;
    jest.spyOn(createUserService, 'execute').mockResolvedValue(userMock);
    const response = await createUserController.createUser(params, req);

    expect(createUserService.execute).toHaveBeenCalledTimes(1);
    expect(createUserService.execute).toHaveBeenCalledWith(params);

    expect(response).toEqual(controllerResponse);
  });
});
