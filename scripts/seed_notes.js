import Database from 'better-sqlite3';
import { join } from 'path';

const dbPath = join(process.cwd(), 'server', 'db', 'projects.db');
const db = new Database(dbPath);

console.log('Seeding professional Indonesian notes with uniform author...');

const notes = [
  {
    title: 'Kesimpulan Rapat: Penguatan Keamanan Pilkada Serentak 2026',
    content: `
      <h2>Ringkasan Eksekutif</h2>
      <p>Rapat koordinasi tingkat tinggi telah menetapkan protokol keamanan baru untuk melindungi integritas data pemilih selama Pilkada 2026.</p>
      <h2>Poin Utama</h2>
      <ul>
        <li>Implementasi pemantauan real-time 24/7 pada server pusat data.</li>
        <li>Penempatan unit respon cepat siber di setiap Polda prioritas.</li>
        <li>Audit keamanan berlapis pada aplikasi penghitungan suara.</li>
      </ul>
      <blockquote>"Keamanan siber adalah pilar utama dalam menjaga kepercayaan publik terhadap proses demokrasi digital."</blockquote>
    `,
    doc_ref: 'strategi-pertahanan-siber-2026',
    status: 'published',
    author: 'Iwan'
  },
  {
    title: 'Evaluasi Mingguan: Tren Ancaman Ransomware Q1',
    content: `
      <h2>Analisis Ancaman</h2>
      <p>Terjadi peningkatan aktivitas kelompok ransomware internasional yang menargetkan instansi pemerintah daerah. Modus operandi melibatkan eksploitasi kerentanan pada sistem VPN lama.</p>
      <h2>Langkah Mitigasi</h2>
      <ol>
        <li>Wajib melakukan update patch keamanan pada seluruh gateway VPN.</li>
        <li>Sosialisasi anti-phishing bagi seluruh staf administratif.</li>
        <li>Penyediaan sistem backup data offline yang terisolasi.</li>
      </ol>
    `,
    doc_ref: 'laporan-kerentanan-bulanan',
    status: 'published',
    author: 'Iwan'
  },
  {
    title: 'Notulensi: Koordinasi Teknis Keamanan Database Nasional',
    content: `
      <h2>Agenda Pertemuan</h2>
      <p>Diskusi mengenai standarisasi enkripsi database antar lembaga negara untuk mencegah kebocoran data sensitif.</p>
      <h2>Hasil Keputusan</h2>
      <p>Disepakati penggunaan standar enkripsi AES-256 sebagai standar minimum untuk semua data yang bersifat klasifikasi rahasia.</p>
    `,
    doc_ref: 'nasional-cyber-security-whitepaper',
    status: 'published',
    author: 'Iwan'
  },
  {
    title: 'Draf Rencana Aksi: Mitigasi Serangan DDoS Sektor Publik',
    content: `
      <h2>Konteks Strategis</h2>
      <p>Berdasarkan intelijen terbaru, diprediksi akan ada lonjakan serangan DDoS selama periode libur nasional yang menargetkan portal layanan publik.</p>
      <h2>Rencana Aksi</h2>
      <ul>
        <li>Aktivasi scrubbing center pada penyedia layanan internet utama.</li>
        <li>Konfigurasi ulang limitasi trafik pada firewall aplikasi (WAF).</li>
      </ul>
    `,
    doc_ref: 'cloud-security-strategy',
    status: 'draft',
    author: 'Iwan'
  }
];

const insert = db.prepare(`
  INSERT INTO notes (title, content, doc_ref, status, author)
  VALUES (@title, @content, @doc_ref, @status, @author)
`);

const insertMany = db.transaction((items) => {
  for (const item of items) insert.run(item);
});

// Clear previous notes
db.prepare('DELETE FROM notes').run();

insertMany(notes);

console.log(`Successfully seeded ${notes.length} Indonesian notes with author: Iwan.`);
db.close();
