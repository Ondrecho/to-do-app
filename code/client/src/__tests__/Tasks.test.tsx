import React from 'react';
import { render, screen } from '@testing-library/react';
import Tasks from '../pages/Tasks';
import { UserContext } from '../Main';

jest.mock('../api/methods', () => ({
  method: {
    task: {
      get: jest.fn(() => Promise.resolve({ data: [] })),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

const mockUser = {
  id: 1,
  username: 'testuser',
  password: '',
  isAuthenticated: true,
};

const mockUserContext = {
  user: mockUser,
  setUser: jest.fn(),
};

describe('Tasks Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders tasks page with filters', async () => {
    render(
      <UserContext.Provider value={mockUserContext}>
        <Tasks user={mockUser} themeMode="light" />
      </UserContext.Provider>
    );

    expect(await screen.findByText(/filters/i)).toBeInTheDocument();
    expect(await screen.findByText(/tasks/i)).toBeInTheDocument();
    expect(await screen.findByText(/important/i)).toBeInTheDocument();
    expect(await screen.findByText(/completed/i)).toBeInTheDocument();
  });

  test('renders create task button', () => {
    render(
      <UserContext.Provider value={mockUserContext}>
        <Tasks user={mockUser} themeMode="light" />
      </UserContext.Provider>
    );

    const buttons = screen.getAllByRole('button');
    const createButton = buttons.find(button => 
      button.innerHTML.includes('AddIcon') || button.classList.contains('MuiIconButton-root')
    );
    
    expect(createButton).toBeDefined();
  });
});