import { faker } from '@faker-js/faker';

export const params = {
  email: faker.internet.email(),
  select: ['email', 'id', 'image', 'name'],
};
