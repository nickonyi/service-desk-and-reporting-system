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
    if (customDates.startDate) {
      startDate = new Date(customDates.startDate);
      startDate.setHours(0, 0, 0, 0);
    } else {
      startDate = null;
    }

    if (customDates.endDate) {
      endDate = new Date(customDates.endDate);
      endDate.setHours(23, 59, 59, 999);
    } else {
      endDate = null;
    }
  } else {
    startDate = new Date();
    startDate.setDate(today.getDate() - (range - 1));
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
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
