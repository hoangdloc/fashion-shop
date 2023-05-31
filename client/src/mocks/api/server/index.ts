import { setupServer } from 'msw/node';

import { handlers } from '~/mocks/api/handlers';

export const server = setupServer(...handlers);
