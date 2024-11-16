import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  sub: string;
  iat: number;
  exp: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: DecodedToken | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getDecodedToken(token: string): DecodedToken | null {
  const decoded = jwtDecode<DecodedToken>(token);
  return decoded;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get('authToken');
      if (token) {
        const decodedToken = getDecodedToken(token);
        if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setUser(decodedToken);
        } else {
          Cookies.remove('authToken');
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (token: string) => {
    Cookies.set('authToken', token, { expires: 1 });
    const decodedToken = getDecodedToken(token);
    if (decodedToken) {
      setIsAuthenticated(true);
      setUser(decodedToken);
    }
  };

  const logout = () => {
    Cookies.remove('authToken');
    setIsAuthenticated(false);
    setUser(null);
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
