import express from 'express';
import dotenv from 'dotenv';
import router from './routers/api';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;


app.use('/', router)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});