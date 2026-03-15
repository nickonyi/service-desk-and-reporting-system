import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function TicketsByCategoryDonut({ title, daysRange }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTicketsByCategoryCount = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/kpi/tickets-count-by-category');
        const json = await res.json();

        const formatted = [
          {
            name: 'EUC',
            value: Number(json.data.euc),
            color: `hsl(${0.25 * 360}, 70%, 70%)`,
          },
          {
            name: 'Application',
            value: Number(json.data.application),
            color: `hsl(${0.55 * 360}, 70%, 70%)`,
          },
          {
            name: 'Networking',
            value: Number(json.data.networking),
            color: `hsl(${0.89 * 360}, 70%, 70%)`,
          },
        ];
        setData(formatted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTicketsByCategoryCount();
  }, [daysRange]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 py-6 h-80">
      <p className="text-sm text-gray-700 mb-2">{title}</p>
      <div className="h-full flex items-center justify-center text-gray-400">
        {loading ? (
          <div className="text-gray-40o">Loading chart...</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={60} outerRadius={90} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`Cell-${index}`} fill={entry.color} />
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

export default TicketsByCategoryDonut;
