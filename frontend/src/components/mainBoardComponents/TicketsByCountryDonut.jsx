import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function TicketsByCountryDonut({ daysRange }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/kpi/tickets-by-country?days=${daysRange}`);
        const json = await res.json();
        const formatted = json.data.map((item) => ({
          name: item.country,
          value: Number(item.ticket_count),
          color: `hsl(${Math.random() * 360}, 70%, 70%)`,
        }));
        setData(formatted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [daysRange]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-6 h-72">
      <p className="text-sm text-gray-700 mb-2">Tickets By Country</p>
      <div className="h-full flex items-center justify-center">
        {loading ? (
          <p className="text-gray-400">Loading chart...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={60} outerRadius={90} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default TicketsByCountryDonut;
