import ChartPlaceholder from '../mainBoardComponents/ChartPlaceholder';
import DonutPlaceholder from '../mainBoardComponents/DonutPlaceholder';

function MainBoard() {
  return (
    <main className="flex-1 space-y-6 bg-white">
      <div className="border-b p-6 border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
      </div>

      <div className="flex p-6 flex-wrap gap-4">
        {['Last 30 Days', 'Team', 'Agent'].map((item) => (
          <div
            key={item}
            className="bg-white border border-gray-200 rounded-md
                         px-4 py-2 text-sm text-gray-700"
          >
            {item}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 p-6 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Tickets', value: '3' },
          { label: '% SLA Fulfilled', value: '0%' },
          { label: 'Avg. First Response', value: '0 hrs' },
          { label: 'Avg. Resolution', value: '0 days' },
          { label: 'Avg. Feedback Rating', value: '0 / 5' },
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
    </main>
  );
}

export default MainBoard;
