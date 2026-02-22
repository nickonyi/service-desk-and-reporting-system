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

const ticketRouter = Router();

ticketRouter.get('/', fetchTickets);
ticketRouter.get('/categories', fetchCategories);
ticketRouter.get('/statuses', fetchStatuses);
ticketRouter.get('/locations', fetchLocations);
ticketRouter.get('/tiers', fetchTiers);
ticketRouter.get('/site_visits', fetchSiteVisits);

ticketRouter.post('/', createTicket);
ticketRouter.put('/:id', updateTicket);
ticketRouter.delete('/:id', deleteTicket);

export default ticketRouter;
