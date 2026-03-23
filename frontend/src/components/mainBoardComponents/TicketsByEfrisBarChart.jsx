import { useEffect, useState } from "react";
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
} from "recharts";
import { useDateRange } from "../../context/DateRangeContext";
import { formatTimestamp } from "../../utils/date";

function TicketsByEfrisBarChart({ title }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { range, startDate, endDate } = useDateRange();
  const API_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        let url = "";

        if (range === "custom") {
          if (!startDate || !endDate) return;
          const start = formatTimestamp(startDate);
          const end = formatTimestamp(endDate);
          url = `${API_URL}/api/kpi/efris-tickets-by-store?startDate=${start}&endDate=${end}`;
        } else {
          url = `${API_URL}/api/kpi/efris-tickets-by-store?days=${range}`;
        }

        const res = await fetch(url);

        let json;
        try {
          json = await res.json();
        } catch (error) {
          throw new Error("Invalid server response");
        }

        if (!res.ok) {
          throw new Error(json.message || "Failed to fetch data");
        }

        const formatted = json.data.map((item) => ({
          name: item.store_name,
          tickets: Number(item?.efris_issues_count || 0),
          color: `hsl(${Math.random() * 360}, 70%, 70%)`,
        }));

        if (formatted.every((item) => item.tickets === 0)) {
          setData([]);
        } else {
          setData(formatted);
        }
      } catch (error) {
        console.error(error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [range, startDate, endDate]);
  console.log(data);

  return (
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-6 h-80">
      <p className="text-sm text-gray-700 mb-2">{title}</p>
      <div className="h-full flex items-center justify-center">
        {loading ? (
          <p className="text-gray-400">Loading chart...</p>
        ) : data.length === 0 ? (
          <p className="text-gray-400">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
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
