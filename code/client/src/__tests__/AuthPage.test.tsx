import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import { UserContext } from '../Main';

// Mock для react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock для API methods
jest.mock('../api/methods', () => ({
  method: {
    user: {
      login: jest.fn(),
      register: jest.fn(),
    },
  },
}));

const mockUserContext = {
  user: null,
  setUser: jest.fn(),
};

describe('AuthPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form with username and password fields', () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={mockUserContext}>
          <AuthPage isRegistration={false} />
        </UserContext.Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  test('renders registration form with register button', () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={mockUserContext}>
          <AuthPage isRegistration={true} />
        </UserContext.Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    expect(screen.getByText(/already have an account\?/i)).toBeInTheDocument();
  });
});