import DateRangeDropdown from './DateRangeDropdown';

function FilterBar({ daysRange, setDaysRange }) {
  return (
    <div className="flex flex-wrap p-6 gap-4">
      <DateRangeDropdown value={daysRange} onChange={setDaysRange} />
    </div>
  );
}

export default FilterBar;
