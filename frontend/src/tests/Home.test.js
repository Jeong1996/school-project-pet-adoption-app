import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { AuthProvider } from '../context/AuthContext';

const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
};

const renderHome = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </BrowserRouter>
  );
};

jest.mock('../context/AuthContext', () => {
  const actual = jest.requireActual('../context/AuthContext');
  return {
    ...actual,
    useAuth: () => ({
      user: mockUser,
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
      loading: false
    })
  };
});

describe('Home Page', () => {
  test('renders welcome message with user name', () => {
    renderHome();
    expect(screen.getByText('Welcome back, John Doe!')).toBeInTheDocument();
  });

  test('renders View Animals card', () => {
    renderHome();
    expect(screen.getByText('View Animals')).toBeInTheDocument();
    expect(screen.getByText('Browse available pets looking for their forever home')).toBeInTheDocument();
  });

  test('renders My Applications card', () => {
    renderHome();
    expect(screen.getByText('My Applications')).toBeInTheDocument();
    expect(screen.getByText('Track the status of your adoption applications')).toBeInTheDocument();
  });

  test('renders My Profile card', () => {
    renderHome();
    expect(screen.getByText('My Profile')).toBeInTheDocument();
    expect(screen.getByText('Update your account information and preferences')).toBeInTheDocument();
  });

  test('renders account information section', () => {
    renderHome();
    expect(screen.getByText('Account Information')).toBeInTheDocument();
    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  test('renders Browse Pets button', () => {
    renderHome();
    expect(screen.getByRole('button', { name: 'Browse Pets' })).toBeInTheDocument();
  });

  test('renders View Applications button', () => {
    renderHome();
    expect(screen.getByRole('button', { name: 'View Applications' })).toBeInTheDocument();
  });

  test('renders Edit Profile button', () => {
    renderHome();
    expect(screen.getByRole('button', { name: 'Edit Profile' })).toBeInTheDocument();
  });
});
