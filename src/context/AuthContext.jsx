import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const users = [
    { username: 'admin@gmail.com', password: '1234', role: 'admin' },
    { username: 'john', password: 'abcd', role: 'user' },
  ];

  const login = (username, password) => {
    console.log(username, typeof password);

    const foundUser = users.find((u) => u.username === username && u.password === password);
    console.log(foundUser);

    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

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
