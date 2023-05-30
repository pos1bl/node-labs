import express, { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import router from './routes';

const app = express();
const port = 3001;

app.use(express.json());

app.use('/api', router);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

createConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.log('Database connection error:', error);
  });
