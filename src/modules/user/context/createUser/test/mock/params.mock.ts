import { faker } from '@faker-js/faker';

import { CreateUserRequestDTO } from '../../dtos/createUser.request.dto';

export const params: CreateUserRequestDTO = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  name: faker.name.fullName(),
  image: faker.image.imageUrl(),
};
