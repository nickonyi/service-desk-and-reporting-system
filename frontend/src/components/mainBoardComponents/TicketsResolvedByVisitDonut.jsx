import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDateRange } from '../../context/DateRangeContext';

const COLORS = {
  onsite: '#6366f1',
  remote: '#22c55e',
};

function TicketsResolvedByVisitDonut() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { range, startDate, endDate } = useDateRange();

  useEffect(() => {
    const fetchResolvedTickets = async () => {
      try {
        setLoading(true);
        let url = '';
        if (range === 'custom') {
          const start = startDate.toISOString().split('T')[0];
          const end = endDate.toISOString().split('T')[0];
          console.log(start, end);

          url = `/api/kpi/resolved-summary?startDate=${start}&endDate=${end}`;
        } else {
          url = `/api/kpi/resolved-summary?days=${range}`;
        }

        const res = await fetch(url);
        const json = await res.json();

        const formatted = [
          {
            name: 'Onsite',
            value: Number(json.data.onsite_resolved),
            color: COLORS.onsite,
          },
          {
            name: 'Remote',
            value: Number(json.data.remote_resolved),
            color: COLORS.remote,
          },
        ];

        setData(formatted);
      } catch (error) {
        console.error('Failed to fetch resolved tickets by visit:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResolvedTickets();
  }, [range, startDate, endDate]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-6 h-72">
      <p className="text-sm text-gray-700 mb-2">Resolved Tickets (Remote vs Onsite)</p>

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

export default TicketsResolvedByVisitDonut;
