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

  const today = new Date();
  let startDate;
  let endDate = today;

  if (range === 'custom') {
    startDate = customDates.startDate;
    endDate = customDates.endDate;
  } else {
    startDate = new Date();
    startDate.setDate(today.getDate() - range);
  }

  return (
    <DateRangeContext.Provider
      value={{ range, setRange, customDates, setCustomDates, startDate, endDate }}
    >
      {children}
    </DateRangeContext.Provider>
  );
}

export function useDateRange() {
  return useContext(DateRangeContext);
}
