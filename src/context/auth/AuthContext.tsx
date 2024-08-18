import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  username: string;
}

interface LoginContextProps {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isLoggedIn: boolean;
}

interface LoginProviderProps {
  children: ReactNode;
}

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('currentUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading stored user:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStoredUser();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const usersData = await AsyncStorage.getItem('users');
      console.log('Users data:', usersData);
      if (!usersData) {
        console.error('No users data found');
        return false;
      }

      const users = JSON.parse(usersData);
      console.log('Parsed users:', users);

      for (const u of users) {
        console.log(`User: ${u.username}, Password: ${u.password}`);

        if (u.username === username && u.password === password) {
          // Simulate successful login
          setUser({ username });
          await AsyncStorage.setItem('currentUser', JSON.stringify({ username }));
          return true;
        }
      }

      console.warn('User not found or incorrect credentials');
      return false;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('currentUser');
  };

  return (
    <LoginContext.Provider value={{ user, login, logout, loading, isLoggedIn: !!user }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};
