import { useState, useEffect, useCallback } from 'react';

export function useBalance(initialBalance = 0) {
  const [balance, setBalance] = useState(initialBalance);
  const [isLoading, setIsLoading] = useState(false);

  // Get user-specific balance key
  const getBalanceKey = useCallback(() => {
    if (typeof window === 'undefined') return 'userBalance';
    
    const userId = localStorage.getItem('user_id') || localStorage.getItem('userId');
    return userId ? `userBalance_${userId}` : 'userBalance';
  }, []);

  // Load balance from localStorage
  const loadBalance = useCallback(() => {
    if (typeof window === 'undefined') return initialBalance;
    
    const balanceKey = getBalanceKey();
    const savedBalance = localStorage.getItem(balanceKey);
    
    if (savedBalance !== null) {
      const parsedBalance = parseInt(savedBalance);
      setBalance(parsedBalance);
      return parsedBalance;
    } else {
      setBalance(initialBalance);
      localStorage.setItem(balanceKey, initialBalance.toString());
      return initialBalance;
    }
  }, [initialBalance, getBalanceKey]);

  // Load balance from localStorage on component mount
  useEffect(() => {
    loadBalance();
  }, [loadBalance]);

  // Refresh balance function
  const refreshBalance = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    setIsLoading(true);
    try {
      const balanceKey = getBalanceKey();
      const savedBalance = localStorage.getItem(balanceKey);
      
      if (savedBalance !== null) {
        const parsedBalance = parseInt(savedBalance);
        setBalance(parsedBalance);
        console.log('🔄 Balance refreshed:', parsedBalance);
        return parsedBalance;
      }
      return balance;
    } catch (error) {
      console.error('Error refreshing balance:', error);
      return balance;
    } finally {
      setIsLoading(false);
    }
  }, [balance, getBalanceKey]);

  const deductCredit = async (amount = 1) => {
    if (balance < amount) {
      throw new Error('Insufficient credits');
    }
    
    setIsLoading(true);
    try {
      // Simulate API call to deduct credits
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newBalance = balance - amount;
      setBalance(newBalance);
      
      // Save to localStorage with user-specific key
      if (typeof window !== 'undefined') {
        const balanceKey = getBalanceKey();
        localStorage.setItem(balanceKey, newBalance.toString());
      }
      
      return newBalance;
    } finally {
      setIsLoading(false);
    }
  };

  const addCredits = async (amount) => {
    if (amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
    
    setIsLoading(true);
    try {
      // Simulate API call to add credits
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newBalance = balance + amount;
      setBalance(newBalance);
      
      // Save to localStorage with user-specific key
      if (typeof window !== 'undefined') {
        const balanceKey = getBalanceKey();
        localStorage.setItem(balanceKey, newBalance.toString());
      }
      
      return newBalance;
    } finally {
      setIsLoading(false);
    }
  };

  const resetBalance = (newBalance = 0) => {
    setBalance(newBalance);
    if (typeof window !== 'undefined') {
      const balanceKey = getBalanceKey();
      localStorage.setItem(balanceKey, newBalance.toString());
    }
  };

  // Function to get current balance (useful for other components)
  const getCurrentBalance = () => {
    if (typeof window === 'undefined') return balance;
    
    const balanceKey = getBalanceKey();
    const savedBalance = localStorage.getItem(balanceKey);
    return savedBalance ? parseInt(savedBalance) : balance;
  };

  return {
    balance,
    deductCredit,
    addCredits,
    resetBalance,
    getCurrentBalance,
    refreshBalance, // Add this function
    isLoading,
    canAfford: balance >= 1
  };
}