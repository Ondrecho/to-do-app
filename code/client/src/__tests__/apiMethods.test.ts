jest.mock('axios');

import axios from 'axios';
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Methods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    
    mockedAxios.create.mockImplementation(() => ({
      interceptors: {
        request: {
          use: jest.fn(),
        },
      },
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    }));
  });

  test('axios create should be called with correct config', () => {
    jest.isolateModules(() => {
      const { method } = require('../api/methods');
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: "/api",
      });
    });
  });

  test('login method should be defined', () => {
    const { method } = require('../api/methods');
    expect(method.user.login).toBeDefined();
  });

  test('register method should be defined', () => {
    const { method } = require('../api/methods');
    expect(method.user.register).toBeDefined();
  });

  test('task methods should be defined', () => {
    const { method } = require('../api/methods');
    expect(method.task.get).toBeDefined();
    expect(method.task.create).toBeDefined();
    expect(method.task.update).toBeDefined();
    expect(method.task.delete).toBeDefined();
  });
});