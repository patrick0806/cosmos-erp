import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { User } from '@shared/entities/user.entity';

import { CreateUserService } from '../createUser.service';
import { params } from './mock/params.mock';
import { userMock } from './mock/user.mock';

describe('Create user service', () => {
  let createUserService: CreateUserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const createUserModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: 'UserRepository',
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    createUserService = createUserModule.get(CreateUserService);
    userRepository = createUserModule.get<Repository<User>>('UserRepository');
  });

  it('Should create a user with success', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
    jest.spyOn(userRepository, 'save').mockResolvedValue(userMock);

    const response = await createUserService.execute(params);

    expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: { email: params.email },
    });

    expect(userRepository.save).toHaveBeenCalledTimes(1);
    expect(userRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        email: params.email,
        name: params.name,
        image: params.image,
        password: params.password,
      }),
    );

    expect(response).toEqual(userMock);
  });

  it('Should fail on try create a alredy registered user', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(userMock);

    try {
      await createUserService.execute(params);
      fail('a user with already registered email has been registered');
    } catch (err) {
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: params.email },
      });

      expect(err.status).toBe(409);
      expect(err.message).toBe('User already registered');
    }
  });
});
