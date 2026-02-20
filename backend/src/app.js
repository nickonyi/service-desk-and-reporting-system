import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRouter.js';
import ticketRoutes from './routes/ticketRouter.js';

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`The server is listening at port:${PORT}`);
});
