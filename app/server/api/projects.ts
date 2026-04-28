import Database from 'better-sqlite3';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const dbPath = join(process.cwd(), 'db', 'projects.db');
  const db = new Database(dbPath);

  try {
    const projects = db.prepare('SELECT * FROM projects ORDER BY id ASC').all();
    return projects.map(p => ({
      ...p,
      locked: !!p.locked
    }));
  } catch (error) {
    console.error('Database error:', error);
    return [];
  } finally {
    db.close();
  }
});
