import pkg from 'pg';
import dotenv from 'dotenv'

const { Pool } = pkg;

dotenv.config();

export default class Database {
  private pool: pkg.Pool;

  constructor() {
    const dbPort = parseInt(process.env.DB_PORT || '5433', 10);

    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: dbPort,
    });
  }

  async query(queryString: string, params?: any[]): Promise<any[]> {
    try {
      const client = await this.pool.connect();
      const result = await client.query(queryString, params);
      client.release();
      return result.rows;
    } catch (error) {
      console.error('Error executing query', error);
      throw error;
    }
  }

  close(): void {
    this.pool.end();
  }
}
