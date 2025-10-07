// app/context/StatsContext.js
"use client";
import { createContext, useContext, useState } from "react";

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [stats, setStats] = useState({
    detected: 0,
    takedowns: 0,
    pending: 0,
    ignored: 0,
  });

  return (
    <StatsContext.Provider value={{ stats, setStats }}>
      {children}
    </StatsContext.Provider>
  );
}

export const useStats = () => useContext(StatsContext);
