import Database from 'better-sqlite3';
import { join } from 'path';

const dbPath = join(process.cwd(), 'server', 'db', 'projects.db');
const db = new Database(dbPath);

console.log('Initializing notes table in:', dbPath);

// Create notes table
db.prepare(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    doc_ref TEXT,
    status TEXT DEFAULT 'published',
    author TEXT DEFAULT 'Administrator',
    ip_address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// Optional: Insert dummy notes if table is empty
const existingNotes = db.prepare('SELECT count(*) as count FROM notes').get();
if (existingNotes.count === 0) {
  const dummyNotes = [
    {
      title: 'Catatan Strategi Siber Q2',
      content: '<p>Analisis awal menunjukkan peningkatan serangan pada sektor publik.</p>',
      doc_ref: 'css-2026',
      status: 'published'
    },
    {
      title: 'Draft Evaluasi Keamanan Jaringan',
      content: '<p>Perlu peninjauan ulang pada firewall perimeter.</p>',
      doc_ref: 'audit-2026',
      status: 'draft'
    }
  ];

  const insert = db.prepare(`
    INSERT INTO notes (title, content, doc_ref, status)
    VALUES (@title, @content, @doc_ref, @status)
  `);

  for (const note of dummyNotes) {
    insert.run(note);
  }
  console.log('Added dummy notes.');
}

console.log('Notes table is ready.');
db.close();
