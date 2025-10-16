import { useState, useEffect } from 'react';

export function useBalance(initialBalance = 250) {
  const [balance, setBalance] = useState(initialBalance);
  const [isLoading, setIsLoading] = useState(false);

  // Load balance from localStorage on component mount
  useEffect(() => {
    const savedBalance = localStorage.getItem('userBalance');
    if (savedBalance) {
      setBalance(parseInt(savedBalance));
    }
  }, []);

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
      localStorage.setItem('userBalance', newBalance.toString());
      
      return newBalance;
    } finally {
      setIsLoading(false);
    }
  };

  const addCredits = async (amount) => {
    setIsLoading(true);
    try {
      // Simulate API call to add credits
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newBalance = balance + amount;
      setBalance(newBalance);
      localStorage.setItem('userBalance', newBalance.toString());
      
      return newBalance;
    } finally {
      setIsLoading(false);
    }
  };

  const resetBalance = (newBalance = 250) => {
    setBalance(newBalance);
    localStorage.setItem('userBalance', newBalance.toString());
  };

  return {
    balance,
    deductCredit,
    addCredits,
    resetBalance,
    isLoading,
    canAfford: balance >= 1
  };
}