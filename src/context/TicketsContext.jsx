// context/TicketsContext.jsx
import { createContext, useContext, useState } from 'react';

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

  const addTicket = (ticketData) => {
    const newTicket = {
      id: Date.now(), // Simple ID generation for frontend
      ...ticketData,
      created_at: new Date().toISOString(),
      status: 'open',
    };
    setTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  };

  const updateTicket = (id, updates) => {
    setTickets((prev) =>
      prev.map((ticket) => (ticket.id === id ? { ...ticket, ...updates } : ticket))
    );
  };

  const deleteTicket = (id) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
  };

  return (
    <TicketsContext.Provider value={{ tickets, addTicket, updateTicket, deleteTicket }}>
      {children}
    </TicketsContext.Provider>
  );
};
