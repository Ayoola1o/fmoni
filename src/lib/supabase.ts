import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase credentials if available
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'mock-key';

// Real client (will fail if keys are invalid, but we handle it)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Mock API for testing when Supabase keys are not provided
 */
export const mockDb = {
  profiles: [
    { 
      id: 'test-user-id', 
      phone: '7041856121', 
      full_name: 'Test User', 
      balance: 88967.98, 
      locked_balance: 20000.00,
      pin: '199910',
      account_number: '3094857221'
    }
  ],
  allocations: [
    { 
      id: '1', 
      user_id: 'test-user-id',
      name: 'Transport for Work', 
      total: 20000, 
      remaining: 13000, 
      daily: 1000, 
      icon: '🚌',
      status: 'active'
    }
  ],
  transactions: [
    { 
      id: '1', 
      user_id: 'test-user-id',
      title: 'Transport Release', 
      subtitle: 'Daily Allocation', 
      amount: 1000.00, 
      type: 'allocation', 
      status: 'success',
      created_at: new Date().toISOString()
    }
  ]
};

// Helper to determine if we should use mock data
export const isMock = !process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL.includes('mock');
