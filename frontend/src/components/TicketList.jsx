import { Search, Filter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { tableHeaders } from '../data.js';
import { useTickets } from '../context/TicketsContext.jsx';
import TicketDetails from './TicketDetails.jsx';
import DashboardHeader from './DashboardHeader.jsx';
import { getStatusColors } from '../data.js';

function TicketList() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { tickets, subcategories, statuses, locations } = useTickets();

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedLocation, selectedStatus]);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory || ticket.sub_category === selectedCategory;
    const matchesLocation = !selectedLocation || ticket.location === selectedLocation;
    const matchesStatus = !selectedStatus || ticket.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesLocation && matchesStatus;
  });

  const ticketsPerPage = 10;
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex-1 space-y-6 bg-white">
      <DashboardHeader title="Tickets" btnText="create" />

      <div className="space-y-4 px-6 pb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search tickets..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {subcategories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status.id} value={status.name}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white mt-8  rounded-lg shadow  overflow-hidden">
          {filteredTickets.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <Filter size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-gray-500">No tickets found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full ">
                <thead className="bg-gray-50 border-b border-gray-50">
                  <tr>
                    {tableHeaders.map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">{ticket.call_id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {ticket.title}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {ticket.sub_category}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {ticket.location}
                      </td>
                      <td
                        className={`px-6 py-4 text-sm font-medium text-gray-900 ${getStatusColors(ticket.status)}`}
                      >
                        <span className="px-2 py-1 bg-gray-300 text-xs font-medium rounded-full">
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">{ticket.assigned_to}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(ticket.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">{ticket.site_visit_type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="flex justify-center items-center mt-4 gap-2 px-6">
          <button
            onClick={() => {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
            }}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200  cursor-pointer rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          {pageNumbers.map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 rounded  cursor-pointer hover:bg-blue-200 ${num === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => {
              setCurrentPage((prev) => Math.max(prev + 1, totalPages));
            }}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 cursor-pointer rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {selectedTicket && (
        <TicketDetails
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          statuses={statuses}
        />
      )}
    </div>
  );
}

export default TicketList;
