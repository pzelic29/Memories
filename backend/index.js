import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import postRoutes from './routes/posts.js';

dotenv.config(); // set .env variables

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);

const CONNECTION_URL =
  'mongodb+srv://kjuricic:testtest@cluster0.vskusjx.mongodb.net/test?retryWrites=true&w=majority';
const CONNECTION_URL_TEST =
  'mongodb+srv://kjuricic:testtest@cluster0.vskusjx.mongodb.net/testiranjebaze?retryWrites=true&w=majority';
const PORT = 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server Running on Port: http://localhost:${PORT}`);
    });
    server.address = server.address(); // Add this line to set the `address` property
  })
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);

export default app; // Add this line to export the app object
