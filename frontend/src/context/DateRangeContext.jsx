import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

const DateRangeContext = createContext();

export function DateRangeProvider({ children }) {
  const [range, setRange] = useState(30);
  const [customDates, setCustomDates] = useState({
    startDate: null,
    endDate: null,
  });
  return (
    <DateRangeContext.Provider value={{ range, setRange, customDates, setCustomDates }}>
      {children}
    </DateRangeContext.Provider>
  );
}

export function useDateRange() {
  return useContext(DateRangeContext);
}
