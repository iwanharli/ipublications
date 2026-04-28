import Database from 'better-sqlite3';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const dbPath = join(process.cwd(), 'server', 'db', 'projects.db');
  const db = new Database(dbPath);

  try {
    const note = db.prepare('SELECT * FROM notes WHERE id = ?').get(id);
    db.close();

    if (!note) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Note not found',
      });
    }

    return note;
  } catch (error: any) {
    db.close();
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
    });
  }
});
