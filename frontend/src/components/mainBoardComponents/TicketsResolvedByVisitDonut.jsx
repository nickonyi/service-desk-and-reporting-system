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

const COLORS = {
  onsite: "#6366f1",
  remote: "#22c55e",
};

function TicketsResolvedByVisitDonut() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { range, startDate, endDate } = useDateRange();
  const API_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const fetchResolvedTickets = async () => {
      try {
        setLoading(true);
        let url = "";
        if (range === "custom") {
          const start = formatTimestamp(startDate);
          const end = formatTimestamp(endDate);

          url = `${API_URL}/api/kpi/resolved-summary?startDate=${start}&endDate=${end}`;
        } else {
          url = `${API_URL}/api/kpi/resolved-summary?days=${range}`;
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
            name: "Onsite",
            value: Number(json.data?.onsite_resolved || 0),
            color: COLORS.onsite,
          },
          {
            name: "Remote",
            value: Number(json.data?.remote_resolved || 0),
            color: COLORS.remote,
          },
        ];

        if (formatted.every((item) => item.value === 0)) {
          setData([]);
        } else {
          setData(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch resolved tickets by visit:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResolvedTickets();
  }, [range, startDate, endDate]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 py-6 h-80">
      <p className="text-sm text-gray-700 mb-2">
        Resolved Tickets (Remote vs Onsite)
      </p>

      <div className="h-full flex items-center justify-center">
        {loading ? (
          <p className="text-gray-400">Loading chart...</p>
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
