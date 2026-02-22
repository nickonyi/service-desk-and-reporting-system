// TicketsContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const TicketsContext = createContext();

export const useTickets = () => {
  const context = useContext(TicketsContext);
  if (!context) {
    throw new Error('useTickets must be used within TicketsProvider');
  }
  return context;
};

export const TicketsProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [locations, setLocations] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [siteVisitOptions, setSiteVisitOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ticketsRes, catRes, statusRes, locRes, tierRes, siteRes] = await Promise.all([
          fetch('http://localhost:3000/api/tickets').then((r) => r.json()),
          fetch('http://localhost:3000/api/tickets/categories').then((r) => r.json()),
          fetch('http://localhost:3000/api/tickets/statuses').then((r) => r.json()),
          fetch('http://localhost:3000/api/tickets/locations').then((r) => r.json()),
          fetch('http://localhost:3000/api/tickets/tiers').then((r) => r.json()),
          fetch('http://localhost:3000/api/tickets/site_visits').then((r) => r.json()),
          ,
        ]);

        setTickets(ticketsRes.data || []);
        setCategories(catRes.data);
        setStatuses(statusRes.data);
        setLocations(locRes.data);
        setTechnicians(tierRes.data);
        setSiteVisitOptions(siteRes.data);
      } catch (err) {
        console.error('Failed to fetch ticket data', err);
      }
    };

    fetchData();
  }, []);

  // Add a new ticket via backend
  const addTicket = async (ticketData) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketData),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      console.log(data.data);

      setTickets((prev) => [data.data, ...prev]);
      return data.data;
    } catch (err) {
      console.error('Failed to create ticket', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTicket = async (id, updates, localUpdates = updates) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === id ? { ...ticket, ...localUpdates, ...data.data } : ticket
        )
      );
    } catch (err) {
      console.error('Failed to update ticket', err);
      throw err;
    }
  };

  const deleteTicket = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
    } catch (err) {
      console.error('Failed to delete ticket', err);
      throw err;
    }
  };

  return (
    <TicketsContext.Provider
      value={{
        tickets,
        categories,
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
