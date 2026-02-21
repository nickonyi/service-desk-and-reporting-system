import { Router } from 'express';
import {
  createTicket,
  fetchTiers,
  fetchCategories,
  fetchLocations,
  fetchSiteVisits,
  fetchStatuses,
  fetchTickets,
  updateTicket,
  deleteTicket,
} from '../controllers/ticketController.js';

const ticketRoutes = Router();

ticketRoutes.get('/', fetchTickets);
ticketRoutes.get('/categories', fetchCategories);
ticketRoutes.get('/statuses', fetchStatuses);
ticketRoutes.get('/locations', fetchLocations);
ticketRoutes.get('/tiers', fetchTiers);
ticketRoutes.get('/site_visits', fetchSiteVisits);

ticketRoutes.post('/', createTicket);
ticketRoutes.put('/:id', updateTicket);
ticketRoutes.delete('/:id', deleteTicket);
export default ticketRoutes;
