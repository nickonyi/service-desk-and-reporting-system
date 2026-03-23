import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDateRange } from "../../context/DateRangeContext";
import { formatTimestamp } from "../../utils/date";

function TicketsByCategoryDonut({ title, daysRange }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { range, startDate, endDate } = useDateRange();
  const API_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const fetchTicketsByCategoryCount = async () => {
      try {
        setLoading(true);
        let url = "";
        if (range === "custom") {
          const start = formatTimestamp(startDate);
          const end = formatTimestamp(endDate);

          url = `${API_URL}/api/kpi/tickets-count-by-category?startDate=${start}&endDate=${end}`;
        } else {
          url = `${API_URL}/api/kpi/tickets-count-by-category?days=${range}`;
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

        const formatted = [
          {
            name: "EUC",
            value: Number(json.data?.euc || 0),
            color: `hsl(${0.25 * 360}, 70%, 70%)`,
          },
          {
            name: "Application",
            value: Number(json.data?.application || 0),
            color: `hsl(${0.55 * 360}, 70%, 70%)`,
          },
          {
            name: "Networking",
            value: Number(json.data?.networking || 0),
            color: `hsl(${0.89 * 360}, 70%, 70%)`,
          },
        ];
        if (formatted.every((item) => item.value === 0)) {
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
    fetchTicketsByCategoryCount();
  }, [range, startDate, endDate]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 py-6 h-80">
      <p className="text-sm text-gray-700 mb-2">{title}</p>
      <div className="h-full flex items-center justify-center text-gray-400">
        {loading ? (
          <div className="text-gray-40o">Loading chart...</div>
        ) : data.length === 0 ? (
          <p className="text-gray-400">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
              >
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
