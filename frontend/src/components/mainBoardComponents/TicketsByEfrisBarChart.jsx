import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useDateRange } from '../../context/DateRangeContext';
import { formatTimestamp } from '../../../../backend/src/utils/dateFilter';

function TicketsByEfrisBarChart({ title }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { range, startDate, endDate } = useDateRange();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        let url = '';

        if (range === 'custom') {
          if (!startDate || !endDate) return;
          const start = formatTimestamp(startDate);
          const end = formatTimestamp(endDate);
          url = `/api/kpi/efris-tickets-by-store?startDate=${start}&endDate=${end}`;
        } else {
          url = `/api/kpi/efris-tickets-by-store?days=${range}`;
        }

        const res = await fetch(url);
        const json = await res.json();

        const formatted = json.data.map((item) => ({
          name: item.store_name,
          tickets: Number(item.efris_issues_count),
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
  }, [range, startDate, endDate]);
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-6 h-80">
      <p className="text-sm text-gray-700 mb-2">{title}</p>
      <div className="h-full flex items-center justify-center">
        {loading ? (
          <p className="text-gray-400">Loading chart...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tickets" fill="#8884d8">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default TicketsByEfrisBarChart;
