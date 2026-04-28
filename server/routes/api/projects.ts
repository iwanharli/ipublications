import Database from 'better-sqlite3';
import { join } from 'path';

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  type: string;
  locked: number | boolean;
  updated: string;
  author: string;
}

export default defineEventHandler(async (event) => {
  try {
    const dbPath = join(process.cwd(), 'server', 'db', 'projects.db');
    const db = new Database(dbPath);

    const projects = db.prepare('SELECT * FROM projects ORDER BY id ASC').all() as Project[];
    db.close();

    return projects.map(p => ({
      ...p,
      locked: !!p.locked
    }));
  } catch (error: any) {
    console.error('Database error:', error);
    return { error: error.message };
  }
});
