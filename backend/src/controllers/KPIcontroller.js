import { getTicketsByCountry } from '../db/query.js';

export const fetchTicketByCountry = async (req, res, next) => {
  try {
    const days = req.query.days;
    const ticketsByCountry = await getTicketsByCountry(days);
    res.json({ success: true, data: ticketsByCountry });
  } catch (error) {
    next(error);
  }
};
