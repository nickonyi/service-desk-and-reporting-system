import { useTickets } from '../../context/TicketsContext';

function TicketCountBar({ daysRange }) {
  const { tickets } = useTickets();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysRange);
  console.log(Array.isArray(tickets));

  const filteredTickets = tickets.filter((ticket) => {
    return new Date(ticket.created_at) >= cutoffDate;
  });
  console.log(filteredTickets.filter((t) => t.status.toLowerCase() === 'awaiting user'));

  const totalTickets = filteredTickets.length;
  const openTickets = filteredTickets.filter((t) => t.status.toLowerCase() === 'open').length;
  const inProgressTickets = filteredTickets.filter((t) => {
    const status = t.status.toLowerCase();
    return status === 'in progress' || status === 'awaiting user' || status === 'awaiting vendor';
  }).length;

  const closedTickets = filteredTickets.filter((t) => t.status.toLowerCase() === 'closed').length;

  return (
    <div className="grid grid-cols-1 p-6 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {[
        { label: 'Total Tickets', value: totalTickets },
        { label: 'Open Tickets', value: openTickets },
        { label: 'In progress Tickets', value: inProgressTickets },
        { label: 'Closed Tickets', value: closedTickets },
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
  );
}

export default TicketCountBar;
