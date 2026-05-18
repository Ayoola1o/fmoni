import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, mockDb, isMock } from '../lib/supabase';
import { useRouter } from 'expo-router';

interface UserProfile {
  id: string;
  phone: string;
  full_name: string;
  balance: number;
  locked_balance: number;
  account_number: string;
}

interface AuthContextType {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isLoading: boolean;
  signIn: (phone: string, pin: string) => Promise<boolean>;
  signOut: () => void;
  refreshProfile: () => Promise<void>;
  createAllocation: (name: string, total: number, daily: number) => Promise<void>;
  performTransfer: (amount: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Initial check
    const checkUser = async () => {
      setIsLoading(true);
      // Logic for persistent session would go here
      setIsLoading(false);
    };
    checkUser();
  }, []);

  const signIn = async (phone: string, pin: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (isMock) {
        // Find user in mock DB
        const mockUser = mockDb.profiles.find(p => p.phone === phone && p.pin === pin);
        if (mockUser) {
          const { pin: _, ...profile } = mockUser;
          setUser(profile);
          return true;
        }
      } else {
        // Real Supabase Auth would go here
        // For now, we'll simulate success if keys are present but logic is mock
        return false;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    router.replace('/(auth)/login');
  };

  const refreshProfile = async () => {
    if (!user) return;
    // Refresh logic
  };

  const createAllocation = async (name: string, total: number, daily: number) => {
    if (!user) return;
    
    // Simulate updating balances
    const updatedUser = {
      ...user,
      balance: user.balance - total,
      locked_balance: user.locked_balance + total,
    };
    
    setUser(updatedUser);
    
    // In a real app, we'd also push to mockDb.allocations
    console.log(`Allocation Created: ${name} (Total: ${total}, Daily: ${daily})`);
  };

  const performTransfer = async (amount: number) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        balance: prev.balance - amount,
      };
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, signIn, signOut, refreshProfile, createAllocation, performTransfer }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
