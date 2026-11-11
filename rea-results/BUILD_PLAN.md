# BUILD_PLAN — Fitur SIRENBIS 4 (BPR Go Digital)

Rencana ringkas implementasi modul **SIRENBIS 4 (Sistem Informasi Rencana Bisnis Bank/BPRS Versi 4)** berbasis **Next.js (App Router)** dan **Supabase**, mengacu pada [CLONE_SPEC.md](file:///opt/bpr-go-digital/rea-results/CLONE_SPEC.md) serta visual pada [screenshots/](file:///opt/bpr-go-digital/rea-results/screenshots/).

---

## 1. Yang Dibangun (3 Poin Utama)
1. **Daftar & Manajemen Dokumen RBB**: Halaman tabel daftar RBB BPR dengan pengelompokan jenis RBB (Rutin & Koreksi), filter tahun rencana, badge status (Draft, Review, Locked, Approved), serta indikator visual Versi 4 (Emerald ping).
2. **Kertas Kerja Proyeksi Tren Keuangan**: Form dan tabel input matriks pos neraca, laba rugi, dan rasio keuangan (realisasi tahun lalu + proyeksi 3 tahun ke depan) dilengkapi area cetak khusus (`.sirenbis4-trend-print-area`).
3. **Mekanisme Kontrol Akses & Kunci Dokumen**: Proteksi akses berbasis tag lisensi (`"SIRENBIS Versi 4"`), guard anti-tabrakan edit bersamaan (`rbbReportLockGuard`), dan status floating notice saat dokumen terkunci oleh reviewer/direksi.

---

## 2. Data: Tabel & Field yang Dibutuhkan

### `rbb_self_assessments`
- `id`: UUID (Primary Key)
- `bpr_id`: UUID / TEXT
- `tahun_rencana`: INTEGER
- `jenis_rbb`: TEXT (RUTIN / KOREKSI)
- `status_dokumen`: TEXT (DRAFT / SUBMITTED / LOCKED / APPROVED)
- `locked_at`: TIMESTAMPTZ
- `locked_by`: TEXT
- `created_by`: TEXT
- `created_at`: TIMESTAMPTZ
- `updated_at`: TIMESTAMPTZ

### `rbb_trend_projections`
- `id`: UUID (Primary Key)
- `assessment_id`: UUID (Foreign Key ke `rbb_self_assessments.id`)
- `kategori`: TEXT (NERACA / LABA_RUGI / RASIO)
- `pos_rekening`: TEXT
- `realisasi_thn_lalu`: NUMERIC
- `proyeksi_thn_1`: NUMERIC
- `proyeksi_thn_2`: NUMERIC
- `proyeksi_thn_3`: NUMERIC
- `catatan_asumsi`: TEXT
- `created_at`: TIMESTAMPTZ

---

## 3. Backend: Endpoint & Fungsi (1 Baris Per Item)
- `GET /api/sirenbis4/assessments`: Mengambil daftar dokumen RBB BPR terdaftar dengan filter jenis dan tahun rencana.
- `POST /api/sirenbis4/assessments`: Membuat draf dokumen asesmen RBB baru (Rutin atau Koreksi).
- `GET /api/sirenbis4/assessments/[id]`: Mengambil detail data RBB spesifik beserta status floating lock.
- `POST /api/sirenbis4/assessments/[id]/lock`: Mengunci dokumen untuk mencegah konflik penyuntingan konkuren.
- `POST /api/sirenbis4/assessments/[id]/unlock`: Membuka kunci dokumen setelah proses input atau review selesai.
- `GET /api/sirenbis4/assessments/[id]/projections`: Mengambil matriks angka realisasi dan proyeksi pos keuangan 3 tahun.
- `PUT /api/sirenbis4/assessments/[id]/projections`: Menyimpan pembaruan nilai pos neraca, laba rugi, dan rasio keuangan.

---

## 4. UI: Komponen yang Dibutuhkan (1 Baris Per Item)
- `SirenbisHeader`: Header halaman modul dengan judul, deskripsi, dan status badge pulsing emerald `"Versi 4 (Terbaru)"`.
- `RbbFilterBar`: Baris filter interaktif untuk memilih jenis RBB (Rutin / Koreksi), tahun rencana, dan status persetujuan.
- `RbbTableList`: Tabel daftar dokumen RBB dengan styling `.rbb-blink-rutin`, `.rbb-blink-koreksi`, dan badge status OJK.
- `RbbCreateModal`: Dialog modal pembuatan dokumen RBB baru dengan pilihan tahun rencana dan tipe RBB.
- `RbbLockFloatingNotice`: Banner notifikasi mengambang yang muncul ketika dokumen sedang dikunci oleh pengguna lain.
- `RbbTrendProjectionTable`: Matriks tabel input data pos neraca, laba rugi, dan rasio keuangan dengan format angka Rupiah.
- `RbbPrintLayout`: Tampilan tata letak cetak dokumen RBB terisolasi sesuai kelas CSS `.sirenbis4-trend-print-area`.

---

## 5. Yang Harus Disiapkan Sendiri (Langkah Berurutan)
1. **Akun & Project Supabase**: Buat atau pastikan project Supabase aktif (tabel basis data akan dibuat oleh agent via MCP).
2. **Pengisian `.env.local`**: Masukkan kredensial proyek Supabase ke file `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. **API Key Tambahan (Opsional)**: Masukkan `GEMINI_API_KEY` ke `.env.local` jika ingin menambahkan fitur analisis rekomendasi AI pada proyeksi RBB.
4. **Instalasi Paket Tambahan**: Jalankan perintah `npm install @tanstack/react-table` (opsional untuk kemudahan paginasi & sorting tabel matriks).

---

## 6. Asumsi (Item UNKNOWN dari CLONE_SPEC)
- Format pos neraca, pos laba rugi, dan rasio keuangan diasumsikan mengacu pada pedoman standar penyusunan Rencana Bisnis BPR (SEOJK RBB).
- Otorisasi akses modul SIRENBIS 4 diasumsikan menggunakan validasi metadata array `tags` (memuat `"SIRENBIS Versi 4"`) pada tabel profil pengguna di Supabase.
- Logika kalkulasi rasio otomatis (CAR, NPL, BOPO, LDR, ROA) diasumsikan dijalankan secara terpusat pada Next.js Server Actions / backend API.
- Mekanisme sinkronisasi status penguncian dokumen (`rbbReportLockGuard`) diasumsikan memanfaatkan Supabase Realtime channel (`postgres_changes`) menggantikan ketiadaan WebSocket eksternal.
- Ekspor lembar kerja tren proyeksi diasumsikan memanfaatkan fitur cetak browser native yang diatur melalui rule CSS `.sirenbis4-trend-print-area`.

