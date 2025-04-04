
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export type UserRole = 'farmer' | 'retailer' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location?: string;
  phoneNumber?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Farmer',
    email: 'farmer@example.com',
    role: 'farmer',
    location: 'Midwest',
    phoneNumber: '555-123-4567'
  },
  {
    id: '2',
    name: 'Sarah Retailer',
    email: 'retailer@example.com',
    role: 'retailer',
    location: 'East Coast',
    phoneNumber: '555-987-6543'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('farmMarketUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Demo login logic
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('farmMarketUser', JSON.stringify(foundUser));
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password. Try using 'farmer@example.com' or 'retailer@example.com' with password 'password'",
      });
      throw new Error('Invalid credentials');
    }
  };

  const register = async (userData: Partial<User>, password: string, role: UserRole) => {
    // In a real app, this would send data to a server
    const newUser: User = {
      id: `${Date.now()}`,
      name: userData.name || '',
      email: userData.email || '',
      role: role,
      location: userData.location,
      phoneNumber: userData.phoneNumber
    };

    // Demo user creation
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('farmMarketUser', JSON.stringify(newUser));
    
    toast({
      title: "Registration successful",
      description: `Welcome, ${newUser.name}!`,
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('farmMarketUser');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
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
