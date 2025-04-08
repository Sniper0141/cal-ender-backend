import { neon } from '@neondatabase/serverless';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: join(__dirname, '..', '.env') });

if (!process.env.DATABASE_URL) {
  console.error('Error: DATABASE_URL environment variable is not set');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function runMigrations() {
  try {
    // Read and execute the migration file
    const migrationPath = join(__dirname, '..', 'migrations', '001_create_appointments_table.sql');
    const migrationSQL = await readFile(migrationPath, 'utf8');
    
    console.log('Applying migration: 001_create_appointments_table.sql');
    await sql.query(migrationSQL);
    console.log('Migration completed successfully!');
    
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigrations(); 