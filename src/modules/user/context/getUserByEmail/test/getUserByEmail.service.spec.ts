import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { User } from '@shared/entities/user.entity';

import { GetUserByEmailService } from '../getUserByEmail.service';
import { params } from './mock/params';
import { userMock } from './mock/user.mock';

describe('Get user by email service', () => {
  let getUserByEmailService: GetUserByEmailService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const getUserByEmailModule = await Test.createTestingModule({
      providers: [
        GetUserByEmailService,
        {
          provide: 'UserRepository',
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    getUserByEmailService = getUserByEmailModule.get(GetUserByEmailService);
    userRepository = getUserByEmailModule.get('UserRepository');
  });

  it('Should return a user with success', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(userMock);
    const response = await getUserByEmailService.execute(params.email);

    expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    expect(userRepository.findOne).toHaveBeenCalledWith({
      select: params.select,
      where: { email: params.email },
    });

    expect(response).toEqual(userMock);
  });
});
