import { faker } from '@faker-js/faker';

import { UserDTO } from '@shared/dtos';

export const userMock: UserDTO = {
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  name: faker.name.fullName(),
  image: faker.image.imageUrl(),
};
