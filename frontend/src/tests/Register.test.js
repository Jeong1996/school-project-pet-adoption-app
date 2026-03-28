import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../pages/Register';
import { AuthProvider } from '../context/AuthContext';

const mockRegister = jest.fn();

jest.mock('../context/AuthContext', () => ({
  ...jest.requireActual('../context/AuthContext'),
  useAuth: () => ({
    register: mockRegister,
    user: null,
    loading: false
  })
}));

const renderRegister = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Register />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Register Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders registration form', () => {
    renderRegister();
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  test('shows error for short name', async () => {
    renderRegister();
    
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'A' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
    });
  });

  test('shows error for invalid email', async () => {
    renderRegister();
    
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'invalid' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });
  });

  test('shows error for short password', async () => {
    renderRegister();
    
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    });
  });

  test('shows error for password mismatch', async () => {
    renderRegister();
    
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'different' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

  test('calls register on submit with valid data', async () => {
    mockRegister.mockResolvedValue({});
    renderRegister();
    
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith('test@test.com', 'password123', 'John Doe');
    });
  });

  test('shows error on registration failure', async () => {
    mockRegister.mockRejectedValue({ response: { data: { error: 'Email already registered' } } });
    renderRegister();
    
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Email already registered')).toBeInTheDocument();
    });
  });

  test('has link to login page', () => {
    renderRegister();
    expect(screen.getByRole('link', { name: /log in/i })).toHaveAttribute('href', '/login');
  });
});
