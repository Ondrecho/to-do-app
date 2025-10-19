import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthGuard from '../components/utilities/AuthGuard';
import { UserContext } from '../Main';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const TestComponent = () => <div>Protected Content</div>;

describe('AuthGuard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('redirects to login when no token exists', async () => {
    const setUser = jest.fn();

    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: null, setUser }}>
          <AuthGuard>
            <TestComponent />
          </AuthGuard>
        </UserContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
      expect(setUser).toHaveBeenCalled();

      const arg = (setUser as jest.Mock).mock.calls[0][0];
      const result = typeof arg === 'function' ? arg({}) : arg;

      expect(result).toEqual(expect.objectContaining({ isAuthenticated: false }));
    });
  });

  test('allows access when valid token exists', async () => {
    const mockToken = 'valid.jwt.token';
    localStorage.setItem('token', mockToken);

    const setUser = jest.fn();

    const { getByText } = render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: null, setUser }}>
          <AuthGuard>
            <TestComponent />
          </AuthGuard>
        </UserContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(getByText('Protected Content')).toBeInTheDocument();
    });
  });
});
