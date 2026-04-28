import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
  level: string;
  points: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('greenpay_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      name: email.split('@')[0] || 'User',
      email: email,
      phone: '08123456789',
      address: 'Jl. Ahmad Yani, Pontianak Tenggara',
      level: 'Pahlawan Lingkungan',
      points: 1240
    };
    
    setUser(mockUser);
    localStorage.setItem('greenpay_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      level: 'Pemula Hijau',
      points: 50 // New user bonus
    };
    
    setUser(newUser);
    localStorage.setItem('greenpay_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('greenpay_user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem('greenpay_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      updateProfile,
      isAuthenticated: !!user,
      isLoading
    }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
