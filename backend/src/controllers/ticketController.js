import { deleteTicketbyId, getTickets, insertTickets, updateTicketbyId } from '../db/query.js';
import { getCategories, getLocations, getStatuses, getSiteVisits, getTiers } from '../db/query.js';

export const fetchTickets = async (req, res, next) => {
  try {
    const tickets = await getTickets();
    res.json({ success: true, data: tickets });
  } catch (error) {
    next(error);
  }
};
export const fetchCategories = async (req, res, next) => {
  try {
    const data = await getCategories();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const fetchStatuses = async (req, res, next) => {
  try {
    const data = await getStatuses();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const fetchLocations = async (req, res, next) => {
  try {
    const data = await getLocations();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const fetchTiers = async (req, res, next) => {
  try {
    const data = await getTiers();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const fetchSiteVisits = async (req, res, next) => {
  try {
    const data = await getSiteVisits();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const createTicket = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category_id,
      status_id,
      location_id,
      call_id,
      assigned_tier_id,
      site_visit_id,
    } = req.body;

    const newTicket = await insertTickets(
      title,
      description,
      category_id,
      status_id,
      location_id,
      call_id,
      assigned_tier_id,
      site_visit_id
    );
    res.json({ success: true, data: newTicket });
  } catch (error) {
    next(error);
  }
};

export const updateTicket = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const updatedTicket = await updateTicketbyId(id, updates);
    if (!updatedTicket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    res.json({ success: true, data: updatedTicket });
  } catch (error) {
    next(error);
  }
};

export const deleteTicket = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await deleteTicketbyId(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    res.json({
      success: true,
      message: 'Ticket deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
