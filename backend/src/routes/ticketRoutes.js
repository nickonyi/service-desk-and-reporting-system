import { Router } from 'express';
import {
  createTicket,
  fetchTiers,
  fetchLocations,
  fetchSiteVisits,
  fetchStatuses,
  fetchTickets,
  updateTicket,
  deleteTicket,
  fetchSubCategories,
  fetchChildCategories,
} from '../controllers/ticketController.js';

const ticketRouter = Router();

ticketRouter.get('/', fetchTickets);
ticketRouter.get('/sub_categories', fetchSubCategories);
ticketRouter.get('/child_categories', fetchChildCategories);
ticketRouter.get('/statuses', fetchStatuses);
ticketRouter.get('/locations', fetchLocations);
ticketRouter.get('/tiers', fetchTiers);
ticketRouter.get('/site_visits', fetchSiteVisits);

ticketRouter.post('/', createTicket);
ticketRouter.put('/:id', updateTicket);
ticketRouter.delete('/:id', deleteTicket);

export default ticketRouter;
