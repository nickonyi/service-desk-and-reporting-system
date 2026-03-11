import {
  getResolvedTicketsByVisitType,
  getTicketsByCountry,
  getTicketsCountByCategory,
} from '../db/query.js';

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
  const days = req.query.days;
  try {
    const ticketsResolvedByVisit = await getResolvedTicketsByVisitType(days);

    res.status(200).json({
      success: true,
      data: ticketsResolvedByVisit,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchTicketsCountByCategory = async (req, res, next) => {
  try {
    const ticketCountByCategory = await getTicketsCountByCategory();
    res.json({
      success: true,
      data: ticketCountByCategory,
    });
  } catch (error) {
    next(error);
  }
};
