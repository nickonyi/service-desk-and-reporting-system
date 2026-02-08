import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const users = [
    { username: 'admin', password: '1234', role: 'admin' },
    { username: 'john', password: 'abcd', role: 'user' },
  ];

  const login = () => setIsAuthenticated(true);

  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
