import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useDateRange } from '../../context/DateRangeContext';

const TIME_RANGES = [
  { label: 'Today', value: 1 },
  { label: 'Last 7 Days', value: 7 },
  { label: 'Last 30 Days', value: 30 },
  { label: 'Last 60 Days', value: 60 },
  { label: 'Last 90 Days', value: 90 },
  { label: 'Custom Range', value: 'custom' },
];

function DateRangeDropdown() {
  const [open, setOpen] = useState(false);
  const { range, setRange, customDates, setCustomDates } = useDateRange();

  const dropdownRef = useRef(null);

  const selected =
    range === 'custom' && customDates?.startDate && customDates?.endDate
      ? `${customDates.startDate.toLocaleDateString()} → ${customDates.endDate.toLocaleDateString()}`
      : TIME_RANGES.find((r) => r.value === range)?.label || 'Last 30 Days';

  useEffect(() => {
    const handleClickOutsideEvent = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideEvent);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideEvent);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-12 cursor-pointer border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
      >
        {selected}
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {open && (
        <div className="absolute mt-2 ml-2 z-20 bg-white border border-gray-200 rounded-lg shadow-lg w-80">
          {/* Preset ranges */}
          <div className="p-2">
            {TIME_RANGES.map((r) => (
              <button
                key={r.value}
                className="block w-full text-left cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => {
                  setRange(r.value);

                  if (r.value === 'custom') {
                    setCustomDates({ startDate: null, endDate: null });
                  } else {
                    setOpen(false);
                  }
                }}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Custom calendar */}
          {range === 'custom' && (
            <div className="border-t p-3 flex flex-col gap-3">
              <DayPicker
                mode="range"
                selected={
                  customDates.startDate
                    ? { from: customDates.startDate, to: customDates.endDate }
                    : undefined
                }
                onSelect={(range) => {
                  setCustomDates({
                    startDate: range?.from,
                    endDate: range?.to,
                  });
                }}
              />

              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  {customDates.startDate ? customDates.startDate.toLocaleDateString() : 'Start'}
                </span>

                <span>→</span>

                <span>
                  {customDates.endDate ? customDates.endDate.toLocaleDateString() : 'End'}
                </span>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                }}
                className="bg-indigo-600 cursor-pointer text-white text-sm py-1.5 rounded hover:bg-indigo-700"
              >
                {' '}
                Apply{' '}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DateRangeDropdown;
