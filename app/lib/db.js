import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function query(query, params = []) {
  try {
    return await sql.query(query, params);
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
} 