import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';

const TestComponent = () => {
  const { user, loading } = useAuth();
  
  return (
    <div>
      <span data-testid="loading">{loading ? 'loading' : 'not-loading'}</span>
      <span data-testid="user">{user ? user.email : 'no-user'}</span>
    </div>
  );
};

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('provides initial loading state as true', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('loading')).toHaveTextContent('loading');
  });

  test('provides initial user as null', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('user')).toHaveTextContent('no-user');
  });

  test('loads user from localStorage on mount', () => {
    const storedUser = { id: 1, email: 'stored@test.com', name: 'Stored', role: 'user' };
    localStorage.setItem('user', JSON.stringify(storedUser));
    
    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('user')).toHaveTextContent('stored@test.com');
  });
});
