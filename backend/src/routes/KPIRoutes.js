import { Router } from 'express';
import {
  fetchEfrisTicketsByStore,
  fetchResolvedTicketsByVisitType,
  fetchTicketByCountry,
  fetchTicketsCountByCategory,
} from '../controllers/KPIcontroller.js';

const kpiRouter = Router();

kpiRouter.get('/tickets-by-country', fetchTicketByCountry);
kpiRouter.get('/resolved-summary', fetchResolvedTicketsByVisitType);
kpiRouter.get('/tickets-count-by-category', fetchTicketsCountByCategory);
kpiRouter.get('/efris-tickets-by-store', fetchEfrisTicketsByStore);

export default kpiRouter;
