import express, { Application } from 'express';
import appRouter from './app-route';
import { dbConnection } from './shared/infraestructure/db/mongodb.config';
import { errorHandler } from './shared/helpers/error-handler';
import { setupSwagger } from './swagger';
import cors from "cors";

const PORT: number = 3002;
const app: Application = express();

// SWAGGER
setupSwagger(app);
// END - SWAGGER

app.use((req, res, next) => {
  console.log(`📡 ${process.env.HOST} -> ${req.method} ${req.url}`);
  next();
});

app.use(cors({
  origin: "http://localhost:5173 ", //Front
   credentials: false
}));

app.use(express.json());
app.use('/', appRouter);
app.use(errorHandler);

//DB CONNECTION
dbConnection();
//END - DB CONNECTION




app.listen(PORT, () => {
  console.log('SERVER RUNNING - http://localhost:3002/api/v1/');
  console.log('SWAGGER NOTIFICATIONS API - http://localhost:3002/swagger');
});
