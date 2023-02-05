import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'mac',
  password: 'mac',
  database: 'admin_database',
});

module.exports = pool;