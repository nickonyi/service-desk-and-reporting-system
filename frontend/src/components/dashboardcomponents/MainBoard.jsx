import FilterBar from "../mainBoardComponents/FilterBar";
import TicketCountBar from "../mainBoardComponents/TicketCountBar";
import TicketsByCategoryDonut from "../mainBoardComponents/TicketsByCategoryDonut";
import TicketsByCountryBarChart from "../mainBoardComponents/TicketsByCountryBarChart";
import TicketsResolvedByVisitDonut from "../mainBoardComponents/TicketsResolvedByVisitDonut";
import TicketsByEfrisBarChart from "../mainBoardComponents/TicketsByEfrisBarChart";

function MainBoard() {
  return (
    <div className="flex-1 space-y-6 bg-white">
      <div className="border-b p-6 border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
      </div>
      <FilterBar />
      <TicketCountBar />

      <div className="grid px-8 py-12 grid-cols-1 lg:grid-cols-2 gap-6">
        <TicketsByCategoryDonut title="Tickets by Category" />
        <TicketsResolvedByVisitDonut />
      </div>
      <div className="grid px-6 pb-6 grid-cols-1 md:grid-cols-2 gap-6">
        <TicketsByCountryBarChart title="Tickets By Country(Excluding Efris)" />
        <TicketsByEfrisBarChart title="Efris incidents" />
      </div>
    </div>
  );
}

export default MainBoard;
