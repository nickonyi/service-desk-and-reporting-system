import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTickets } from '../context/TicketsContext';

function NewTicketForm() {
  const navigate = useNavigate();
  const { addTicket } = useTickets();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    status: '',
    site_visit: '',
    location: '',
    sku: '',
    assigned_to: '',
  });

  // Sample data - replace with your actual data
  const categories = [
    { name: 'Hardware' },
    { name: 'Software' },
    { name: 'Network' },
    { name: 'Database' },
  ];

  const statuses = [
    { name: 'Open' },
    { name: 'In progess' },
    { name: 'Awating user' },
    { name: 'Awating vendor' },
    { name: 'Closed' },
  ];

  const siteVisitOptions = [
    { id: 'remote', name: 'remote' },
    { id: 'onsite', name: 'onsite' },
  ];

  const locations = [
    { name: 'Bugolobi' },
    { name: 'Acacia' },
    { name: 'The Hub' },
    { name: 'Yaya' },
    { name: 'sarit' },
  ];

  const technicians = [{ name: 'Tier 1' }, { name: 'Tier 2' }, { name: 'Tier 3' }];
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.title || !formData.description || !formData.category_id) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const newTicket = addTicket(formData);
      setLoading(false);

      // Redirect to tickets list
      navigate('/dashboard/tickets');

      // Or if you want to go to the specific ticket detail page:
      // navigate(`/tickets/${newTicket.id}`);
    }, 500);
  };

  const onClose = () => {};

  return (
    <div className="border-b border-gray-200 flex flex-col gap-4 flex-2 bg-white">
      <h2 className="text-xl px-6 py-2 font-semibold text-gray-800 border-b">
        Tickets/ <span className="text-md font-light text-gray-600">New Ticket</span>
      </h2>

      <div className="flex justify-center items-center p-6">
        <form onSubmit={handleSubmit} className="p-6 space-y-4 w-full max-w-4xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description of the issue"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Detailed description of the issue"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
              <select
                value={formData.priority_id}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select status</option>
                {statuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site visit *</label>
              <select
                value={formData.site_visit}
                onChange={(e) => setFormData({ ...formData, site_visit: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select option</option>
                {siteVisitOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select location</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Call ID</label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="60078..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned to</label>
              <select
                value={formData.assigned_to}
                onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select technician</option>
                {technicians.map((tech) => (
                  <option key={tech.id} value={tech.id}>
                    {tech.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/tickets')}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTicketForm;
