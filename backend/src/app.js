import express from 'express';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, () => {
  console.log(`The server is listening at port:${PORT}`);
});
