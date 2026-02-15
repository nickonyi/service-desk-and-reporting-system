import { User, X, Clock } from 'lucide-react';
import { useState } from 'react';
import { useTickets } from '../context/TicketsContext';

function TicketDetails({ ticket, onClose, statuses }) {
  const { updateTicket } = useTickets();
  const [selectedStatus, setSelectedStatus] = useState(ticket.status);

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    const updates = { status: newStatus };

    if (newStatus.toLowerCase() === 'closed') {
      updates.closed_at = new Date().toISOString();
    } else {
      updates.closed_at = null;
    }
    updateTicket(ticket.id, updates);
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">WW-{ticket.sku}</h2>
            <p className="text-sm text-gray-600">{ticket.title}</p>
          </div>
          <button
            onClick={onClose}
            className=" cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">status</label>
                <select
                  name=""
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  value={selectedStatus}
                  onChange={(e) => handleStatusChange(e.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status.id} value={status.name}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <User size={16} className="text-gray-400" />
                <span className="text-gray-700">Assigned_to:</span>
                <span className="font-medium">{ticket.assigned_to}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-gray-400" />
                <span className="text-gray-700">Created:</span>
                <span className="font-medium text-gray-900">
                  {new Date(ticket.created_at).toLocaleString()}
                </span>
              </div>
              {ticket.closed_at && (
                <div className="flex items-center gap-2 text-sm mt-2">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-gray-700">Closed on:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(ticket.closed_at).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="border-t border-grey-500 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
