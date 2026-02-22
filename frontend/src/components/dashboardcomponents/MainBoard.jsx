import ChartPlaceholder from '../mainBoardComponents/ChartPlaceholder';
import DonutPlaceholder from '../mainBoardComponents/DonutPlaceholder';
import FilterBar from '../mainBoardComponents/FilterBar';
import TicketCountBar from '../mainBoardComponents/TicketCountBar';
import TicketsByCountryDonut from '../mainBoardComponents/TicketsByCountryDonut';
import { useState } from 'react';

function MainBoard() {
  const [daysRange, setDaysRange] = useState(30);

  return (
    <div className="flex-1 space-y-6 bg-white">
      <div className="border-b p-6 border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
      </div>
      <FilterBar daysRange={daysRange} setDaysRange={setDaysRange} />
      <TicketCountBar daysRange={daysRange} />

      <div className="grid px-6 grid-cols-1 lg:grid-cols-2 gap-6">
        <TicketsByCountryDonut daysRange={daysRange} />
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
