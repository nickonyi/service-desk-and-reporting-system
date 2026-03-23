// TicketsContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const TicketsContext = createContext();

export const useTickets = () => {
  const context = useContext(TicketsContext);
  if (!context) {
    throw new Error("useTickets must be used within TicketsProvider");
  }
  return context;
};

export const TicketsProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [childcategories, setChildCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [locations, setLocations] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [siteVisitOptions, setSiteVisitOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const BASE_URL = `${import.meta.env.VITE_API_URL || ""}/api/tickets`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          ticketsRes,
          subCatRes,
          childCatRes,
          statusRes,
          locRes,
          tierRes,
          siteRes,
        ] = await Promise.all([
          fetch(`${BASE_URL}`).then((r) => r.json()),
          fetch(`${BASE_URL}/sub_categories`).then((r) => r.json()),
          fetch(`${BASE_URL}/child_categories`).then((r) => r.json()),
          fetch(`${BASE_URL}/statuses`).then((r) => r.json()),
          fetch(`${BASE_URL}/locations`).then((r) => r.json()),
          fetch(`${BASE_URL}/tiers`).then((r) => r.json()),
          fetch(`${BASE_URL}/site_visits`).then((r) => r.json()),
        ]);

        setTickets(ticketsRes.data || []);
        setSubCategories(subCatRes.data);
        setChildCategories(childCatRes.data);
        setStatuses(statusRes.data);
        setLocations(locRes.data);
        setTechnicians(tierRes.data);
        setSiteVisitOptions(siteRes.data);
      } catch (err) {
        console.error("Failed to fetch ticket data", err);
      }
    };

    fetchData();
  }, []);

  // Add a new ticket via backend
  const addTicket = async (ticketData) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketData),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      const child = childcategories.find(
        (c) => c.id === data.data.child_category_id,
      );
      const subCategory = subcategories.find(
        (s) => s.id === child?.sub_category_id,
      );

      const ticket = {
        ...data.data,
        sub_category: subCategory?.name,
        status: statuses.find((s) => s.id === data.data?.status_id)?.name || "",
        location:
          locations.find((l) => l.id === data.data?.location_id)?.name || "",
        assigned_to:
          technicians.find((t) => t.id === data.data.assigned_tier_id)?.name ||
          "",
        site_visit_type:
          siteVisitOptions.find((s) => s.id === data.data.site_visit_id)
            ?.name || "",
      };

      setTickets((prev) => [ticket, ...prev]);
      return data.data;
    } catch (err) {
      console.error("Failed to create ticket", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTicket = async (id, updates, localUpdates = updates) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === id
            ? { ...ticket, ...localUpdates, ...data.data }
            : ticket,
        ),
      );
    } catch (err) {
      console.error("Failed to update ticket", err);
      throw err;
    }
  };

  const deleteTicket = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
    } catch (err) {
      console.error("Failed to delete ticket", err);
      throw err;
    }
  };

  return (
    <TicketsContext.Provider
      value={{
        tickets,
        subcategories,
        childcategories,
        statuses,
        locations,
        technicians,
        siteVisitOptions,
        loading,
        addTicket,
        updateTicket,
        deleteTicket,
      }}
    >
      {children}
    </TicketsContext.Provider>
  );
};
