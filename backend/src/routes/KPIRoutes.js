import { Router } from 'express';
import { fetchTicketByCountry } from '../controllers/KPIcontroller.js';

const kpiRouter = Router();

kpiRouter.get('/tickets-by-country', fetchTicketByCountry);

export default kpiRouter;
