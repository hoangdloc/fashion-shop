import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

import { server } from '~/mocks/api/server';

expect.extend(matchers);

global.ResizeObserver = require('resize-observer-polyfill');

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen();
});
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
});
// Clean up after the tests are finished.
afterAll(() => {
  server.close();
});
