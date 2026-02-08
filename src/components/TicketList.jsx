import { Plus, Search, Filter, User, Clock } from 'lucide-react';
import { useState } from 'react';
import { tableHeaders } from '../data.js';
import { useNavigate } from 'react-router';

function TicketList() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [filteredTickets, setFilteredTickets] = useState([
    {
      id: 1,
      ticket_number: 'TCK-1023',
      title: 'Cannot connect to office WiFi',
      requester_name: 'John Doe',
      created_at: '2026-02-05T09:24:00Z',
      categories: {
        id: 3,
        name: 'Network',
        color: '#3B82F6', // blue
      },

      priorities: {
        id: 3,
        name: 'High',
        color: '#F97316', // orange
      },

      statuses: {
        id: 1,
        name: 'Open',
        color: '#6B7280', // gray
      },
    },
    {
      id: 2,
      ticket_number: 'TCK-1024',
      title: 'Outlook email not syncing',
      requester_name: 'Jane Smith',
      created_at: '2026-02-04T14:10:00Z',

      categories: {
        id: 5,
        name: 'Email',
        color: '#6366F1', // indigo
      },

      priorities: {
        id: 2,
        name: 'Medium',
        color: '#EAB308', // yellow
      },

      statuses: {
        id: 2,
        name: 'In Progress',
        color: '#3B82F6', // blue
      },
    },
    {
      id: 3,
      ticket_number: 'TCK-1025',
      title: 'Laptop overheating and shutting down',
      requester_name: 'Michael Brown',
      created_at: '2026-02-03T08:45:00Z',

      categories: {
        id: 1,
        name: 'Hardware',
        color: '#10B981', // green
      },

      priorities: {
        id: 4,
        name: 'Critical',
        color: '#EF4444', // red
      },

      statuses: {
        id: 3,
        name: 'Pending',
        color: '#F59E0B', // amber
      },
    },
    {
      id: 3,
      ticket_number: 'TCK-1025',
      title: 'Laptop overheating and shutting down',
      requester_name: 'Michael Brown',
      created_at: '2026-02-03T08:45:00Z',

      categories: {
        id: 1,
        name: 'Hardware',
        color: '#10B981', // green
      },

      priorities: {
        id: 4,
        name: 'Critical',
        color: '#EF4444', // red
      },

      statuses: {
        id: 3,
        name: 'Pending',
        color: '#F59E0B', // amber
      },
    },
    {
      id: 3,
      ticket_number: 'TCK-1025',
      title: 'Laptop overheating and shutting down',
      requester_name: 'Michael Brown',
      created_at: '2026-02-03T08:45:00Z',

      categories: {
        id: 1,
        name: 'Hardware',
        color: '#10B981', // green
      },

      priorities: {
        id: 4,
        name: 'Critical',
        color: '#EF4444', // red
      },

      statuses: {
        id: 3,
        name: 'Pending',
        color: '#F59E0B', // amber
      },
    },
    {
      id: 3,
      ticket_number: 'TCK-1025',
      title: 'Laptop overheating and shutting down',
      requester_name: 'Michael Brown',
      created_at: '2026-02-03T08:45:00Z',

      categories: {
        id: 1,
        name: 'Hardware',
        color: '#10B981', // green
      },

      priorities: {
        id: 4,
        name: 'Critical',
        color: '#EF4444', // red
      },

      statuses: {
        id: 3,
        name: 'Pending',
        color: '#F59E0B', // amber
      },
    },
    {
      id: 3,
      ticket_number: 'TCK-1025',
      title: 'Laptop overheating and shutting down',
      requester_name: 'Michael Brown',
      created_at: '2026-02-03T08:45:00Z',

      categories: {
        id: 1,
        name: 'Hardware',
        color: '#10B981', // green
      },

      priorities: {
        id: 4,
        name: 'Critical',
        color: '#EF4444', // red
      },

      statuses: {
        id: 3,
        name: 'Pending',
        color: '#F59E0B', // amber
      },
    },
  ]);
  const categories = [
    { id: 1, name: 'Hardware' },
    { id: 2, name: 'Software' },
    { id: 3, name: 'Network' },
    { id: 4, name: 'Access / Permissions' },
    { id: 5, name: 'Email' },
    { id: 6, name: 'Other' },
  ];

  const statuses = [
    { id: 1, name: 'Open', color: 'gray' },
    { id: 2, name: 'In Progress', color: 'blue' },
    { id: 3, name: 'Pending', color: 'yellow' },
    { id: 4, name: 'Resolved', color: 'green' },
    { id: 5, name: 'Closed', color: 'red' },
  ];

  const priorities = [
    { id: 1, name: 'Low', level: 1, color: 'green' },
    { id: 2, name: 'Medium', level: 2, color: 'yellow' },
    { id: 3, name: 'High', level: 3, color: 'orange' },
    { id: 4, name: 'Critical', level: 4, color: 'red' },
  ];
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const navigate = useNavigate();
  return (
    <div className="flex-1 space-y-6  ">
      <div className="border-b p-2 pl-6 border-gray-200 flex justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Tickets</h2>
        <div className="flex items-center gap-2">
          <button
            className="bg-black text-white px-4 py-0.5 cursor-pointer rounded-lg flex items-center gap-1 transition-colors"
            onClick={() => navigate('new')}
          >
            <Plus size={18} />
            Create
          </button>
        </div>
      </div>

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
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Priorities</option>
                {priorities.map((priority) => (
                  <option key={priority.id} value={priority.id}>
                    {priority.name}
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
                  <option key={status.id} value={status.id}>
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
                      onClick={() => onTicketClick(ticket)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-blue-600">
                          {ticket.ticket_number}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium">{ticket.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="px-2 py-1 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: `${ticket.categories.color}20`,
                            color: ticket.categories.color,
                          }}
                        >
                          {ticket.categories.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="px-2 py-1 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: `${ticket.priorities.color}20`,
                            color: ticket.priorities.color,
                          }}
                        >
                          {ticket.priorities.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="px-2 py-1 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: `${ticket.statuses.color}20`,
                            color: ticket.statuses.color,
                          }}
                        >
                          {ticket.statuses.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <User size={16} className="mr-2 text-gray-400" />
                          {ticket.requester_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock size={16} className="mr-2" />
                          {formatDate(ticket.created_at)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketList;
