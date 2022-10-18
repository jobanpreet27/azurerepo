import express, {Express, Request, Response} from 'express';
// import dotenv from 'dotenv';
import http from 'http';
import Logging from './config/Logging';
import { config } from './config/config';
import mongoose from 'mongoose';
import apiRoutes from './routes/index';

const app: Express = express();
// dotenv.config();
//need to find a way to get .env files to docker image
//const port = process.env.PORT;
// const port = 8080;
/** We don't need to specify the port here */

/** Connect to our MongoDB database */
mongoose
  .connect(config.mongo.url, {
    retryWrites: true,
    w: 'majority',
  })
  .then(() => {
    Logging.info('Connected to MongoDB successfully...');
    startServer(); // start the server only when mongoDB is connected successfully
  })
  .catch((error) => {
    Logging.error('Unable to connect: ');
    Logging.error(error);
  });

/** Start the server only when Mongo is connected */
const startServer = () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  /** Rules of our APIs */
  app.use((req: Request, res: Response, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // allow requests from everywhere, can be modified only for our front end with the IP address
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    ); // headers that are allowed use inside of our project

    if (req.method == 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET'
      ); // options that are allowed
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */
  app.use('/api', apiRoutes);

  /** Health check */
  app.get('/check', (req: Request, res: Response, next) =>
    res.status(200).json({ message: 'health checked' })
  );

  app.get('/', (req: Request, res: Response, next) =>
    res.status(200).json({ message: 'server running' })
  );
  /** Error handling commented out since it was giving an error on everything request
  app.use((req: Request, res: Response, next) => {
    const error = new Error('Not found');
    Logging.error(error);

    return res.status(400).json({ message: error.message });
  });
*/
  http.createServer(app).listen(config.server.port, () => {
    Logging.info(`Starting server ${config.server.port}`);
  });

  /** We don't need this part as the API routes are specified in the routes/api folder */
// app.get('/', (req: Request, res: Response) => {
//     res.send('Express + TypeScript Server');
//   });

/*
app.listen(port, () => {
  console.log(`[server]: Server is running`);
});
*/
};

