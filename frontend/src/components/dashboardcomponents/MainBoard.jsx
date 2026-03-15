import ChartPlaceholder from '../mainBoardComponents/ChartPlaceholder';
import DonutPlaceholder from '../mainBoardComponents/DonutPlaceholder';
import FilterBar from '../mainBoardComponents/FilterBar';
import TicketCountBar from '../mainBoardComponents/TicketCountBar';
import TicketsByCategoryDonut from '../mainBoardComponents/TicketsByCategoryDonut';
import TicketsByCountryDonut from '../mainBoardComponents/TicketsByCountryDonut';
import TicketsResolvedByVisitDonut from '../mainBoardComponents/TicketsResolvedByVisitDonut';
import { useState } from 'react';

function MainBoard() {
  return (
    <div className="flex-1 space-y-6 bg-white">
      <div className="border-b p-6 border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
      </div>
      <FilterBar />
      <TicketCountBar />

      <div className="grid px-6 grid-cols-1 lg:grid-cols-2 gap-6">
        <TicketsByCountryDonut />
        <TicketsResolvedByVisitDonut />
      </div>
      <div className="grid px-6 pb-6 grid-cols-1 md:grid-cols-2 gap-6">
        <TicketsByCategoryDonut title="Tickets by Category" />
        <DonutPlaceholder title="Tickets by Type" />
        <DonutPlaceholder title="Tickets by Priority" />
        <DonutPlaceholder title="Tickets by Channel" />
      </div>
    </div>
  );
}

export default MainBoard;
