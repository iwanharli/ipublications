import Database from 'better-sqlite3';
import { join } from 'path';

interface Note {
  id?: number;
  title: string;
  content: string;
  doc_ref: string;
  status: string;
  author?: string;
  ip_address?: string;
  created_at?: string;
}

export default defineEventHandler(async (event) => {
  const dbPath = join(process.cwd(), 'server', 'db', 'projects.db');
  const db = new Database(dbPath);
  const method = event.method;

  try {
    if (method === 'GET') {
      // List all notes
      const notes = db.prepare('SELECT * FROM notes ORDER BY created_at DESC').all() as Note[];
      db.close();
      return notes;
    }

    if (method === 'POST') {
      // Create new note
      const body = await readBody(event);
      const { title, content, docRef, status } = body;

      if (!title) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Title is required',
        });
      }

      const clientIp = getRequestIP(event) || 'Unknown IP';

      if (docRef) {
        // Check if a note with this docRef already exists
        const existingNote = db.prepare('SELECT * FROM notes WHERE doc_ref = ? ORDER BY created_at ASC LIMIT 1').get(docRef) as Note | undefined;
        
        if (existingNote) {
          // Merge content into the existing note
          const separator = '<br><hr><br>';
          const newSectionTitle = `<h3>${title}</h3>`;
          const mergedContent = existingNote.content + separator + newSectionTitle + (content || '');
          
          db.prepare('UPDATE notes SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
            .run(mergedContent, existingNote.id);
            
          const updatedNote = db.prepare('SELECT * FROM notes WHERE id = ?').get(existingNote.id) as Note | undefined;
          db.close();
          return updatedNote;
        }
      }

      // Standard insert for new docRef or empty docRef
      const stmt = db.prepare(`
        INSERT INTO notes (title, content, doc_ref, status, ip_address)
        VALUES (?, ?, ?, ?, ?)
      `);

      const result = stmt.run(title, content || '', docRef || '', status || 'published', clientIp);
      
      const newNote = db.prepare('SELECT * FROM notes WHERE id = ?').get(result.lastInsertRowid);
      db.close();
      
      return newNote;
    }
  } catch (error: any) {
    db.close();
    console.error('Notes API error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
    });
  }
});
