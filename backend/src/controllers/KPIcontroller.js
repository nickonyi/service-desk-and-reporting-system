import { getResolvedTicketsByVisitType, getTicketsByCountry } from '../db/query.js';

export const fetchTicketByCountry = async (req, res, next) => {
  try {
    const days = req.query.days;
    const ticketsByCountry = await getTicketsByCountry(days);
    res.json({ success: true, data: ticketsByCountry });
  } catch (error) {
    next(error);
  }
};

export const fetchResolvedTicketsByVisitType = async (req, res, next) => {
  try {
    const ticketsResolvedByVisit = await getResolvedTicketsByVisitType();

    res.status(200).json({
      success: true,
      data: ticketsResolvedByVisit,
    });
  } catch (error) {
    next(error);
  }
};
