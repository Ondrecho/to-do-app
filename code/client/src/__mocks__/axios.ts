const mockAxiosInstance = {
  interceptors: {
    request: {
      use: jest.fn(),
    },
  },
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

const mockCreate = jest.fn(() => mockAxiosInstance);

export default {
  create: mockCreate,
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

export { mockAxiosInstance, mockCreate };