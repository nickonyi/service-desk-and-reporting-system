import { Router } from 'express';
import {
  createTicket,
  fetchTiers,
  fetchCategories,
  fetchLocations,
  fetchSiteVisits,
  fetchStatuses,
  fetchTickets,
} from '../controllers/ticketController.js';

const ticketRoutes = Router();

ticketRoutes.get('/', fetchTickets);
ticketRoutes.get('/categories', fetchCategories);
ticketRoutes.get('/statuses', fetchStatuses);
ticketRoutes.get('/locations', fetchLocations);
ticketRoutes.get('/tiers', fetchTiers);
ticketRoutes.get('/site_visits', fetchSiteVisits);

ticketRoutes.post('/', createTicket);

export default ticketRoutes;
