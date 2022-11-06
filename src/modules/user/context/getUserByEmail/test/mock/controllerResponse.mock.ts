import { LOG_NAMES } from '@shared/constants';

import { userMock } from './user.mock';

export const controllerResponse = {
  data: userMock,
  message: LOG_NAMES.FIND_MESSAGE('user'),
};
