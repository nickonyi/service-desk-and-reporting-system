import { Router } from 'express';
import {
  fetchResolvedTicketsByVisitType,
  fetchTicketByCountry,
} from '../controllers/KPIcontroller.js';

const kpiRouter = Router();

kpiRouter.get('/tickets-by-country', fetchTicketByCountry);
kpiRouter.get('/resolved-summary', fetchResolvedTicketsByVisitType);

export default kpiRouter;
