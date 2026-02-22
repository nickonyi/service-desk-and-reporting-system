import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import authRouter from './routes/authRoutes.js';
import ticketRouter from './routes/ticketRoutes.js';
import articleRouter from './routes/articlesRoutes.js';

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

app.use('/api/auth', authRouter);
app.use('/api/tickets', ticketRouter);
app.use('/api/articles', articleRouter);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`The server is listening at port:${PORT}`);
});
