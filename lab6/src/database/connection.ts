import { createConnection } from 'typeorm';

createConnection()
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Database connection error:', error);
  });
