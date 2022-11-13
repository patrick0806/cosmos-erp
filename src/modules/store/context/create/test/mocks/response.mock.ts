import { faker } from '@faker-js/faker';

import { IRequest } from '@shared/interfaces/log.interface';

import { CreateStoreResponseDTO } from '../../dtos/response.dto';

export const mockResponse: CreateStoreResponseDTO = {
  id: faker.random.numeric(),
  name: faker.company.name(),
  logo: faker.image.imageUrl(),
  plan: faker.random.word(),
  createdAt: faker.datatype.datetime(),
  updatedAt: faker.datatype.datetime(),
};

export const paramsMock = {
  storeDTO: {
    name: mockResponse.name,
    plan: mockResponse.plan,
  },
  req: {
    operation: 'createStore',
  } as IRequest,
};
