import { Plus, Search, Filter, User, Clock } from 'lucide-react';
import { useState } from 'react';
import { tableHeaders } from '../data.js';
import { useNavigate } from 'react-router';
import { useTickets } from '../context/TicketsContext.jsx';
import TicketDetails from './TicketDetails.jsx';
import DashboardHeader from './DashboardHeader.jsx';

function TicketList() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { tickets } = useTickets();

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory || ticket.category_id === selectedCategory;
    const matchesLocation = !selectedLocation || ticket.location === selectedLocation;
    const matchesStatus = !selectedStatus || ticket.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesLocation && matchesStatus;
  });

  const categories = [
    { id: 1, name: 'Hardware' },
    { id: 2, name: 'Software' },
    { id: 3, name: 'Network' },
    { id: 4, name: 'Access / Permissions' },
    { id: 5, name: 'Email' },
    { id: 6, name: 'Other' },
  ];

  const statuses = [
    { id: 1, name: 'Open' },
    { id: 2, name: 'In progress' },
    { id: 3, name: 'Awaiting user' },
    { id: 4, name: 'Awaiting vendor' },
    { id: 5, name: 'Closed' },
  ];

  const locations = [
    { id: 1, name: 'Bugolobi', code: 'NBO' },
    { id: 2, name: 'Acacia', code: 'MBA' },
    { id: 3, name: 'The Hub', code: 'KSM' },
    { id: 4, name: 'Sarit', code: 'NKU' },
    { id: 5, name: 'Yaya', code: 'NKU' },
  ];

  const getStatusColors = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'text-green-800';
      case 'in progress':
        return 'text-yellow-800';
      case 'resolved':
        return 'text-blue-800';
      case 'awaiting user':
        return 'text-emarald-700';
      case 'awaiting vendor':
        return 'text-cyan-700';
      default:
        return ' text-gray-600';
    }
  };

  const navigate = useNavigate();
  return (
    <div className="flex-1 space-y-6 bg-white">
      <DashboardHeader title="Tickets" btnText="create" />

      <div className="space-y-4 px-6 ">
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
                {categories.map((cat) => (
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

        <div className="bg-white mt-8 rounded-lg shadow  overflow-hidden">
          {filteredTickets.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <Filter size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-gray-500">No tickets found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
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
                  {filteredTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">WW-{ticket.sku}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {ticket.title}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {ticket.category_id}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {ticket.location}
                      </td>
                      <td
                        className={`px-6 py-4 text-sm font-medium text-gray-900 ${getStatusColors(ticket.status)}`}
                      >
                        {ticket.status}
                      </td>
                      <td className="px-6 py-4 text-sm">{ticket.assigned_to}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(ticket.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
