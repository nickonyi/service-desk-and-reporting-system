import ChartPlaceholder from '../mainBoardComponents/ChartPlaceholder';
import DonutPlaceholder from '../mainBoardComponents/DonutPlaceholder';
import FilterBar from '../mainBoardComponents/FilterBar';
import { useState } from 'react';

function MainBoard() {
  const [daysRange, setDaysRange] = useState(30);

  return (
    <div className="flex-1 space-y-6 bg-white">
      <div className="border-b p-6 border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
      </div>
      <FilterBar daysRange={daysRange} setDaysRange={setDaysRange} />
      <div className="grid grid-cols-1 p-6 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Tickets', value: '3' },
          { label: 'Open Tickets', value: '0%' },
          { label: 'In progress Tickets', value: '0 hrs' },
          { label: 'Closed Tickets', value: '0 days' },
          { label: 'Avg. Resolution', value: '0 / 5' },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white border border-gray-200
                         rounded-lg p-4"
          >
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-2xl font-semibold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid px-6 grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder title="Ticket Trend" />
        <ChartPlaceholder title="Feedback Trend" />
      </div>
      <div className="grid px-6 pb-6 grid-cols-1 md:grid-cols-2 gap-6">
        <DonutPlaceholder title="Tickets by Team" />
        <DonutPlaceholder title="Tickets by Type" />
        <DonutPlaceholder title="Tickets by Priority" />
        <DonutPlaceholder title="Tickets by Channel" />
      </div>
    </div>
  );
}

export default MainBoard;
