# Analisis Cross-Reference: Raw Script vs Slide Presentasi

## Ringkasan

**Secara umum, raw script dan slide sudah selaras dengan baik.** Raw script memiliki 20 section yang masing-masing memetakan ke 20 slide presentasi dengan urutan yang benar. Namun ada beberapa **ketidaksesuaian konten** yang perlu diperhatikan.

---

## Pemetaan Lengkap

| Raw Script Section | Slide Vue | Status | Catatan |
|---|---|---|---|
| SLIDE 1 — OPENING | `1_opening.vue` | ✅ Sesuai | Tagline di slide sesuai raw script |
| SLIDE 2 — THE HOOK | `2_theHook.vue` | ✅ Sesuai | Angka 10.464 konsisten |
| SLIDE 3 — DOMAIN BARU | `3_ruangCyber.vue` | ✅ Sesuai | Perbandingan fisik vs digital + spektrum ancaman |
| SLIDE 4 — PARADIGMA BARU | `4_paradigma.vue` | ✅ Sesuai | Tiga pilar: Digital-First, Data-Driven, Cyber-Aware |
| SLIDE 5 — INTERAKTIF PARADIGMA | `5_Question_paradigma.vue` | ✅ Sesuai | Polling interaktif |
| SLIDE 6 — DATA STRATEGIS | `6_data.vue` | ✅ Sesuai | Data sebagai aset & risiko + leak evidence |
| SLIDE 7 — SPEKTRUM ANCAMAN | `7_spektrumAncaman.vue` | ✅ Sesuai | 9 ancaman + charts |
| SLIDE 8 — GLOBAL THREAT MAP | `8_globalThreatMap.vue` | ✅ Sesuai | Globe 3D + live feed |
| SLIDE 9 — BEDAH KASUS 1 | `9_timelineSimulasi.vue` | ✅ Sesuai | Timeline ransomware 09:00-10:01 |
| SLIDE 10 — KUIS RANSOMWARE | `10_Question_timeline.vue` | ✅ Sesuai | 4 opsi, jawaban C |
| SLIDE 11 — DATA IS THE NEW RANSOM | `11_dilemaRansomware.vue` | ✅ Sesuai | Dilema bayar vs tidak |
| SLIDE 12 — INTERAKTIF DILEMA | `12_Question_dilema.vue` | ✅ Sesuai | Terkunci vs bocor vs kepercayaan |
| SLIDE 13 — LESSONS LEARNED | `13_pelajaranUtama.vue` | ⚠️ Sebagian | Lihat detail di bawah |
| SLIDE 14 — BEDAH KASUS 2 | `14_buktiDigital.vue` | ✅ Sesuai | Deepfake, chain of custody |
| SLIDE 15 — EVIDENCE INTEGRITY | `15_metadataChain.vue` | ✅ Sesuai | Metadata sebagai saksi diam |
| SLIDE 16 — SOP PENYITAAN | `16_tindakanAwal.vue` | ✅ Sesuai | Isolasi, hashing, dokumentasi |
| SLIDE 17 — SOLUSI STRATEGIS | `17_solusiStrategis.vue` | ⚠️ Sebagian | Lihat detail di bawah |
| SLIDE 18 — KOMUNIKASI KRISIS | `18_komunikasiAI.vue` | ✅ Sesuai | Dual-pillar: Komunikasi + AI |
| SLIDE 19 — COMMANDER'S CALL | `19_commandersCall.vue` | ✅ Sesuai | 4 skenario + 4 pertanyaan komando |
| SLIDE 20 — CLOSING | `20_closing.vue` | ⚠️ Sebagian | Lihat detail di bawah |

---

## Temuan Detail Ketidaksesuaian

### 1. Slide 13 — Pelajaran Utama ⚠️

**Raw Script menyebut 3 pelajaran:**
1. Strategi Backup 3-2-1
2. Isolasi Sistem (pemisahan infrastruktur kritikal)
3. Human Firewall

**Slide menampilkan 3 lesson:**
1. 3-2-1 Backup ✅
2. Air-Gapping ⚠️ (raw script sebut "Isolasi Sistem" — bukan spesifik air-gapping)
3. Human Firewall ✅

> [!NOTE]
> Perbedaannya minor. Raw script menyebut "Isolasi Sistem" yang mencakup air-gapping, tapi slide langsung menggunakan istilah teknis "Air-Gapping". Deskripsi di slide juga lebih sempit ("Data sangat rahasia tidak selalu terhubung ke jaringan umum") dibanding raw script ("Jika satu titik terserang, sistem kritikal lainnya harus tetap berdiri tegak").

---

### 2. Slide 17 — Solusi Strategis ⚠️

**Raw Script menyebut 3 pilar strategis:**
1. NIST CSF 2.0 (kerangka kerja tata kelola)
2. Zero Trust (perlindungan identitas & akses)
3. CSIRT (tim respons insiden)

**Slide hanya menampilkan:**
- NIST CSF 2.0 Wheel (interactive SVG) ✅
- Detail per fungsi (Govern, Identify, Protect, Detect, Respond, Recover) ✅

> [!IMPORTANT]
> **Zero Trust dan CSIRT tidak secara eksplisit ditampilkan sebagai bagian terpisah di slide.** Mereka hanya "tersirat" di deskripsi segmen NIST (mis: "Zero Trust Architecture" muncul di POLRI IMPLEMENTATION untuk segmen PROTECT, dan "Unit Taktis CSIRT Polri" muncul di segmen RESPOND). Raw script secara jelas menyatakan: *"Fungsi IDENTIFY dan PROTECT adalah tempat kita menerapkan prinsip Zero Trust"* dan *"DETECT, RESPOND, dan RECOVER adalah domain dari CSIRT"*, namun visual slide tidak membuat pembedaan ini secara jelas.

---

### 3. Slide 20 — Closing ⚠️

**Raw Script menyebut 3 pesan strategis penutup:**
1. "Ruang siber adalah domain baru kamtibmas"
2. "Data masyarakat adalah amanah"
3. "Kesiapan siber lahir dari tata kelola, latihan, dan keputusan komando"

**Slide menampilkan motto taktis:**
- "Data Aman. Bukti Utuh. Komando Cepat. Publik Percaya."
- Sub-title: "Membangun Masa Depan Digital yang Lebih Aman"

> [!NOTE]
> Pesan yang ditampilkan slide sudah **merangkum** esensi tiga pesan raw script, tapi menggunakan **bahasa yang berbeda** (lebih ringkas & tagline-oriented). Pembicara perlu tahu bahwa tiga poin verbal-nya tidak ditampilkan secara verbatim di slide, sehingga perlu dinarasikan secara lisan.

---

## Konsistensi yang Sudah Baik

1. **Angka konsisten** — 10.464/menit di raw script = targetValue di `2_theHook.vue`
2. **Timeline ransomware konsisten** — 09:00 → 09:05 → 09:30 → 10:00 → 10:01 (raw script = `9_timelineSimulasi.vue`)
3. **4 skenario Commander's Call konsisten** — Akun diretas, data bocor, deepfake, ransomware
4. **Quiz jawaban konsisten** — Opsi C (aktifkan tim respons insiden) = `active: true` di slide 10
5. **Paradigma tiga pilar konsisten** — Digital-First, Data-Driven, Cyber-Aware
6. **5 item manfaat/risiko data konsisten** — raw script & `6_data.vue`
7. **Sumber referensi konsisten** — BSSN 2025, SOCRadar, NIST CSF 2.0

---

## Kesimpulan

| Aspek | Verdict |
|---|---|
| **Urutan Slide** | ✅ 100% selaras (20 section = 20 slide, urutan sama) |
| **Konten Utama** | ✅ ~90% selaras |
| **Detail Teknis** | ⚠️ 3 perbedaan minor ditemukan |
| **Kritis/Blocking** | ❌ Tidak ada perbedaan yang kritis |

> Presentasi dan raw script **sudah cukup sinkron** untuk digunakan. Tiga perbedaan yang ditemukan bersifat **perbedaan framing** (bukan kontradiksi). Pembicara dapat menggunakan raw script sebagai panduan narasi tanpa konflik major dengan visual slide.
