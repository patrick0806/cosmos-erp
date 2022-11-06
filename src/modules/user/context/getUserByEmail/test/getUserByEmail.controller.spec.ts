import { Test } from '@nestjs/testing';

import { IRequest } from '@shared/interfaces/log.interface';

import { GetUserByEmailController } from '../getUserByEmail.controller';
import { GetUserByEmailService } from '../getUserByEmail.service';
import { controllerResponse } from './mock/controllerResponse.mock';
import { params } from './mock/params';
import { userMock } from './mock/user.mock';

describe('Get user by email controller', () => {
  let getUserByEmailController: GetUserByEmailController;
  let getUserByEmailService: GetUserByEmailService;

  beforeEach(async () => {
    const getUserByEmailModule = await Test.createTestingModule({
      controllers: [GetUserByEmailController],
      providers: [
        {
          provide: GetUserByEmailService,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    getUserByEmailController = getUserByEmailModule.get(
      GetUserByEmailController,
    );
    getUserByEmailService = getUserByEmailModule.get(GetUserByEmailService);
  });

  it('Create user Controller and Service should be defined', () => {
    expect(getUserByEmailController).toBeDefined();
    expect(getUserByEmailService).toBeDefined();
  });

  it('Should return a user with success', async () => {
    const req = {} as IRequest;
    jest.spyOn(getUserByEmailService, 'execute').mockResolvedValue(userMock);
    const response = await getUserByEmailController.findUser(params.email, req);

    expect(getUserByEmailService.execute).toHaveBeenCalledTimes(1);
    expect(getUserByEmailService.execute).toHaveBeenCalledWith(params.email);

    expect(response).toEqual(controllerResponse);
  });
});
