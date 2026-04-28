import Database from 'better-sqlite3';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const dbDir = join(process.cwd(), 'db');
if (!existsSync(dbDir)) {
  mkdirSync(dbDir);
}

const db = new Database(join(dbDir, 'projects.db'));

// Create table
db.prepare(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'Published',
    type TEXT NOT NULL,
    locked BOOLEAN DEFAULT 1,
    updated TEXT,
    author TEXT DEFAULT 'Iwan'
  )
`).run();

const projects = [
  { name: 'Strategi Pertahanan Siber 2026', description: 'Peta jalan komprehensif untuk kedaulatan digital nasional dan perlindungan infrastruktur vital.', status: 'Published', type: 'ppt', locked: 1, updated: '1 hari lalu', author: 'Iwan' },
  { name: 'Global Threat Intelligence Report', description: 'In-depth analysis of global malware trends and advanced persistent threat activities.', status: 'Published', type: 'word', locked: 1, updated: '5h ago', author: 'Iwan' },
  { name: 'Zero Trust Security Framework', description: 'Implementation of strict identity verification and least-privilege access for all network users.', status: 'Published', type: 'pdf', locked: 1, updated: '1d ago', author: 'System' },
  { name: 'Inisiatif Perlindungan Data Nasional', description: 'Panduan dan protokol untuk melindungi data pribadi warga negara di seluruh platform digital.', status: 'Published', type: 'ppt', locked: 1, updated: '3d ago', author: 'Iwan' },
  { name: 'Advanced Cyber Defense Operations', description: 'Strategies for proactive threat hunting and rapid incident response in complex environments.', status: 'Published', type: 'word', locked: 1, updated: '1w ago', author: 'Iwan' },
  { name: 'Protokol Respon Insiden Siber', description: 'Standar operasional prosedur untuk pemulihan cepat pasca serangan siber skala besar.', status: 'Published', type: 'pdf', locked: 1, updated: '2w ago', author: 'System' },
  { name: 'Security Audit Roadmap 2026', description: 'Step-by-step guide for conducting comprehensive enterprise security audits.', status: 'Published', type: 'ppt', locked: 1, updated: '4d ago', author: 'Iwan' },
  { name: 'Laporan Kerentanan Bulanan', description: 'Identifikasi kerentanan kritis dan langkah-langkah mitigasi yang direkomendasikan.', status: 'Published', type: 'word', locked: 1, updated: '1d ago', author: 'Iwan' },
  { name: 'National Cyber Security Whitepaper', description: 'Strategic vision for the nation’s digital defense and security infrastructure.', status: 'Published', type: 'pdf', locked: 1, updated: '1d ago', author: 'System' },
  { name: 'Cloud Security Strategy', description: 'Leveraging zero-trust principles for secure cloud infrastructure migration.', status: 'Published', type: 'ppt', locked: 1, updated: '1w ago', author: 'Iwan' },
  { name: 'Panduan Kesadaran Keamanan', description: 'Materi pelatihan kesadaran keamanan siber untuk staf non-teknis.', status: 'Published', type: 'word', locked: 1, updated: '3d ago', author: 'System' },
  { name: 'Kerangka Kerja Keamanan Siber', description: 'Pedoman implementasi kontrol keamanan untuk organisasi pemerintah.', status: 'Published', type: 'pdf', locked: 1, updated: '3d ago', author: 'Iwan' },
  { name: 'Endpoint Protection Guide', description: 'Deployment and management protocols for next-gen antivirus solutions.', status: 'Published', type: 'ppt', locked: 1, updated: '2w ago', author: 'System' },
  { name: 'Third-Party Risk Report', description: 'Evaluation of supply chain security and external vendor risk factors.', status: 'Published', type: 'word', locked: 1, updated: '5d ago', author: 'Iwan' },
  { name: 'Data Breach Analysis 2025', description: 'Post-mortem analysis of major security incidents and lessons learned.', status: 'Published', type: 'pdf', locked: 1, updated: '1w ago', author: 'System' },
  { name: 'Identity Access Management', description: 'Framework for modernizing authentication and authorization across platforms.', status: 'Published', type: 'ppt', locked: 1, updated: '3w ago', author: 'Iwan' },
  { name: 'Rencana Pemulihan Bencana', description: 'Strategi komprehensif untuk keberlanjutan bisnis setelah kehilangan data besar.', status: 'Published', type: 'word', locked: 1, updated: '1w ago', author: 'Iwan' },
  { name: 'Panduan Enkripsi Database', description: 'Instruksi teknis untuk mengamankan data sensitif dalam basis data.', status: 'Published', type: 'pdf', locked: 1, updated: '2w ago', author: 'Iwan' },
  { name: 'Data Encryption Standards', description: 'Review of current encryption algorithms and implementation best practices.', status: 'Published', type: 'ppt', locked: 1, updated: '1m ago', author: 'Iwan' },
  { name: 'Audit Kepatuhan ISO 27001', description: 'Analisis postur keamanan saat ini terhadap standar internasional.', status: 'Published', type: 'word', locked: 1, updated: '2w ago', author: 'System' },
  { name: 'Cyber Law & Regulations', description: 'Compendium of national and international laws regarding digital conduct.', status: 'Published', type: 'pdf', locked: 1, updated: '1m ago', author: 'System' },
  { name: 'Network Perimeter Defense', description: 'Advanced firewall and IDS/IPS configuration for enterprise networks.', status: 'Published', type: 'ppt', locked: 1, updated: '2m ago', author: 'System' },
  { name: 'Kebijakan Perangkat Mobile', description: 'Aturan untuk mengamankan akses mobile ke data dan aplikasi korporat.', status: 'Published', type: 'word', locked: 1, updated: '3w ago', author: 'Iwan' },
  { name: 'Forensic Investigation Manual', description: 'Detailed procedures for digital forensics and evidence collection.', status: 'Published', type: 'pdf', locked: 1, updated: '2m ago', author: 'Iwan' },
  { name: 'Data Simulasi Phishing', description: 'Hasil dan analisis dari tes kesadaran phishing internal terbaru.', status: 'Published', type: 'word', locked: 1, updated: '1m ago', author: 'Iwan' },
  { name: 'Secure Coding Standards', description: 'Best practices for developers to avoid common security vulnerabilities.', status: 'Published', type: 'pdf', locked: 1, updated: '3m ago', author: 'System' },
  { name: 'Konfigurasi Akses Jaringan', description: 'Panduan konfigurasi detail untuk kontrol akses jaringan yang aman.', status: 'Published', type: 'word', locked: 1, updated: '2m ago', author: 'System' },
  { name: 'Pedoman Keamanan API', description: 'Langkah-langkah untuk mengamankan antarmuka pemrograman aplikasi.', status: 'Published', type: 'pdf', locked: 1, updated: '4m ago', author: 'Iwan' },
  { name: 'Legal Disclosure Policy', description: 'Guidelines for legal communication regarding security incidents.', status: 'Published', type: 'word', locked: 1, updated: '3m ago', author: 'Iwan' },
  { name: 'IoT Security Architecture', description: 'Security design patterns for the Internet of Things ecosystem.', status: 'Published', type: 'pdf', locked: 1, updated: '5m ago', author: 'System' },
  { name: 'Incident Response Policy', description: 'Official organizational policy for handling cyber security breaches and events.', status: 'Published', type: 'word', locked: 1, updated: '2h ago', author: 'Iwan' },
  { name: 'Laporan Penetrasi Tahunan', description: 'Hasil dari pengujian penetrasi menyeluruh pada infrastruktur TI.', status: 'Published', type: 'pdf', locked: 1, updated: '6m ago', author: 'Iwan' },
  { name: 'Blockchain Security Review', description: 'Security implications and best practices for DLT implementations.', status: 'Published', type: 'pdf', locked: 1, updated: '7m ago', author: 'System' },
  { name: 'AI in Cyber Defense', description: 'The role of machine learning in modern threat detection and response.', status: 'Published', type: 'pdf', locked: 1, updated: '8m ago', author: 'Iwan' },
  { name: 'Panduan Keamanan Remote Work', description: 'Cara mengamankan lingkungan kerja jarak jauh bagi karyawan.', status: 'Published', type: 'pdf', locked: 1, updated: '9m ago', author: 'System' },
  { name: 'Network Segmentation Guide', description: 'Technical guide for effectively segmenting complex enterprise networks.', status: 'Published', type: 'pdf', locked: 1, updated: '10m ago', author: 'Iwan' },
  { name: 'Biometric Auth Standards', description: 'Review of fingerprint, facial, and iris recognition security.', status: 'Published', type: 'pdf', locked: 1, updated: '11m ago', author: 'System' },
  { name: 'Manajemen Patch Keamanan', description: 'Prosedur untuk pengujian dan penyebaran pembaruan keamanan tepat waktu.', status: 'Published', type: 'pdf', locked: 1, updated: '1y ago', author: 'Iwan' },
  { name: 'Cryptography Best Practices', description: 'Selecting and implementing secure cryptographic primitives.', status: 'Published', type: 'pdf', locked: 1, updated: '1y ago', author: 'System' },
  { name: 'Security Policy Template', description: 'A base template for creating comprehensive organizational security policies.', status: 'Published', type: 'pdf', locked: 1, updated: '1y ago', author: 'Iwan' },
  { name: 'SOC Playbook: Ransomware', description: 'Step-by-step response procedures for ransomware detection.', status: 'Published', type: 'pdf', locked: 1, updated: '1y ago', author: 'System' },
  { name: 'Panduan Audit Firewall', description: 'Langkah-langkah untuk meninjau dan mengoptimalkan aturan firewall.', status: 'Published', type: 'pdf', locked: 1, updated: '1y ago', author: 'Iwan' },
  { name: 'Web Application Hardening', description: 'Techniques for securing web servers and front-end applications.', status: 'Published', type: 'pdf', locked: 1, updated: '1y ago', author: 'System' },
  { name: 'Cyber Insurance Overview', description: 'Analysis of cyber liability insurance options and requirements.', status: 'Published', type: 'pdf', locked: 1, updated: '1y ago', author: 'Iwan' }
];

const insert = db.prepare(`
  INSERT INTO projects (name, description, status, type, locked, updated, author)
  VALUES (@name, @description, @status, @type, @locked, @updated, @author)
`);

const insertMany = db.transaction((items) => {
  for (const item of items) insert.run(item);
});

// Clear existing data
db.prepare('DELETE FROM projects').run();

// Insert all
insertMany(projects);

console.log('Successfully initialized SQLite database with 44 projects.');
db.close();
