import { useState, useEffect } from 'react';

export function useBalance(initialBalance = 0) {
  const [balance, setBalance] = useState(initialBalance);
  const [isLoading, setIsLoading] = useState(false);

  // Get user-specific balance key
  const getBalanceKey = () => {
    if (typeof window === 'undefined') return 'userBalance';
    
    const userId = localStorage.getItem('user_id') || localStorage.getItem('userId');
    return userId ? `userBalance_${userId}` : 'userBalance';
  };

  // Load balance from localStorage on component mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const balanceKey = getBalanceKey();
    const savedBalance = localStorage.getItem(balanceKey);
    
    if (savedBalance !== null) {
      // Always use saved balance if it exists, ignore initialBalance parameter
      setBalance(parseInt(savedBalance));
    } else {
      // Only use initialBalance for completely new users
      setBalance(initialBalance);
      localStorage.setItem(balanceKey, initialBalance.toString());
    }
  }, [initialBalance]);

  
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
    isLoading,
    canAfford: balance >= 1
  };
}