import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { button } from 'framer-motion/client';

const TIME_RANGES = [
  { label: 'Today', value: 1 },
  { label: 'Last 7 Days', value: 7 },
  { label: 'Last 30 Days', value: 30 },
  { label: 'Last 60 Days', value: 60 },
  { label: 'Last 90 Days', value: 90 },
];

function DateRangeDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = TIME_RANGES.find((r) => r.value === value)?.label || 'Last 30 Days';

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-12 cursor-pointer border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
      >
        {selected}
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>
      {open && (
        <div className="absolute mt-2 ml-2 z-20 bg-white border border-gray-200 rounded-lg shadow-lg w-36">
          {TIME_RANGES.map((r) => (
            <button
              className="block w-full text-left cursor-pointer
                         px-4 py-2 text-sm text-gray-700
                         hover:bg-gray-100"
              key={r.range}
              onClick={() => {
                onChange(r.value);
                setOpen(false);
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DateRangeDropdown;
