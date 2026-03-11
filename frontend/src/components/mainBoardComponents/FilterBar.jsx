import DateRangeDropdown from './DateRangeDropdown';

function FilterBar({ daysRange, setDaysRange, customDates, setCustomDates }) {
  return (
    <div className="flex flex-wrap p-6 gap-4">
      <DateRangeDropdown />
    </div>
  );
}

export default FilterBar;
