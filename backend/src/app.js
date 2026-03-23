import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";
import authRouter from "./routes/authRoutes.js";
import ticketRouter from "./routes/ticketRoutes.js";
import articleRouter from "./routes/articlesRoutes.js";
import kpiRouter from "./routes/KPIRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.URL,
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/tickets", ticketRouter);
app.use("/api/articles", articleRouter);
app.use("/api/kpi", kpiRouter);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`The server is listening at port:${PORT}`);
});
