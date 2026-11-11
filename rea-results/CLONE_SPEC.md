# CLONE_SPEC — Modul SIRENBIS 4 (BPR Go Digital)

Dokumen spesifikasi hasil analisis komprehensif berdasarkan **8 screenshot asli dari aplikasi produksi** (`https://creva.id/app/rencana-bisnis-baru/sirenbis4` dan `/workspace`) serta data penyelidikan teknis REA.

---

## 1. Arsitektur Halaman & Navigasi

Aplikasi SIRENBIS 4 terdiri dari 2 tampilan utama:

### 1. Halaman Induk: Daftar RBB (`/app/rencana-bisnis-baru/sirenbis4`)
- **Top Notice Bar (Cokelat/Marun):** Peringatan tagihan operasional.
- **Header Atas:** `< SIRENBIS V4 ► Daftar Rencana Bisnis BPR` dengan profil BPR di kanan (`PT. BPR BKK BATANG (PERSERODA)` | `bkk_tpi_batang@yahoo.co.id` [Inputter]).
- **Tab Bar Modul:**
  1. `Daftar RBB - SIRENBIS Versi 4` (Aktif - Biru)
  2. `Dukungan Industrial Test - Konversi RBB Lama Tahun 2026`
  3. `Apa yang baru di SIRENBIS versi 4?`
  4. `PKS SIRENBIS`
  5. `SIRENBIS Versi Sebelumnya`
- **Hero Banner:** Hijau gelap bergradien dengan badge `SIRENBIS Versi 4`, judul `Daftar Rencana Bisnis BPR (RBB)`, dan subtitle `Sistem Informasi Rencana Bisnis BPR`.
- **Filter Tahun:** Tombol pill `Semua Tahun`, `2027`, `2026`, `2025`, `2024`.
- **Tombol Aksi Kanan:** `+ Buat RBB Baru` (Hijau Tua).
- **Grid Kartu RBB (2 Kolom):**
  - Header Kartu: `RBB Tahun 2027` | Badge `Rutin` | Badge `Versi 4` (Hitam).
  - Subtitle: `PT. BPR BKK BATANG (PERSERODA) · Sandi 601562 · Kab. Batang`.
  - Info Modal Inti: `Modal Inti Rp15.160.321.590` | `SEOJK 24/2025 - APOLO Baru`.
  - Box Nama Skenario / Catatan: e.g. `Simulasi SUpri Data Asli`, `Latihan Supri`.
  - Progress Bar Persentase (`Progress: 100%`, `75%`, `18%`, `3%`) disertai 3 pill status:
    - `A. Persiapan` (Hijau Check / Oranye Warning)
    - `B. Proyeksi` (Hijau Check / Oranye Warning)
    - `C. Narasi & Laporan` (Hijau Check / Oranye Warning)
  - Footer Kartu:
    - Kiri: Icon Gembok (Lock/Unlock), Pensil (Edit), Copy (Duplikasi), Tong Sampah (Hapus).
    - Kanan: Tombol Hijau `Buka SIRENBIS Versi 4 →`.

---

### 2. Halaman Kerja: Workspace RBB (`/workspace?planId=...&section=...`)
- **Header Workspace:**
  - Breadcrumb: `> SIRENBIS V4 ► RBB 2027 (Rutin) ► [Nama Section]`
  - Metadata Status Bar:
    - Badge `Rutin` (Pill Hijau Muda)
    - Dropdown `Mode RBB Lengkap`
    - `Tahun RBB 2027`
    - `Modal Inti Rp11,54 M`
    - Indikator Status: `Tersimpan` (Centang Hijau)
- **Sidebar Kiri ("MENU DAN PROGRESS"):**
  - Search box: `Cari form isian, akun, atau form APOLO...`
  - Progress indicator: e.g. `100%`
  - **Section A. Persiapan** (Accordion):
    - `A1. Informasi BPR` (Identitas BPR)
    - `A2. Data Historis Laporan Bulanan` (Okt 2025 [X-2] s.d. Nov 2026 [X-1] wajib)
    - `A3. Proyeksi dan Penyesuaian Akhir Tahun 2026 (X-1)`
    - `A4. Tren Data Historis Hingga Akhir Tahun 2026 (X-1)`
  - **Section B. Proyeksi Keuangan dan Rasio** (Accordion):
    - `B1. Proyeksi Umum dan Penetapan Target` (Sumber, penggunaan dana, laba rugi, kualitas aset)
    - `B2. Proyeksi Laporan Keuangan dan Rasio` (Laporan proyeksi, angka dapat diubah langsung)
      - `B2.1 Proyeksi Posisi Keuangan (Neraca)` (Format 01.10 - APOLO 0110)
      - `B2.2 Proyeksi Laba Rugi` (Format 02.20 - APOLO 0220)
      - `B2.3 Proyeksi Rekening Administratif` (Format 03.30 - APOLO 0330)
      - `B2.4 Target Rasio dan Pos Keuangan` (Format 04.00 - APOLO 0400)
    - `B3. Proyeksi Lebih Rinci [OPSIONAL]`
    - `B4. Tren Rencana Bisnis Hingga Akhir Tahun 2027 (X)`
    - `B5. Proyeksi Per Kantor [OPSIONAL]`
  - **Section C. Narasi & Laporan Manajemen (Form APOLO)** (Accordion):
    - `C1. Ringkasan Eksekutif` (Format 01.00)
    - `C2. Strategi Bisnis dan Kebijakan` (Format 02.00)
    - `C3. Proyeksi Laporan Keuangan dan Target Rasio` (Format 03.10-04.00)
    - `C4. Rencana Penghimpunan Dana` (Format 05.00)
    - `C5. Rencana Penyaluran Dana` (Format 06.10-06.30)
    - `C6. Rencana Permodalan` (Format 07.00)
    - `C7. Rencana SDM dan Teknologi` (Format 08.10-08.20)
    - `C8. Rencana Kegiatan Usaha` (Format 09.00-09.20, 09.30)
    - `C9. Rencana Jaringan Kantor` (Format 10.00)
    - `C10. Informasi Lainnya` (Format 99.00)
    - `C11. Persetujuan Dewan Komisaris` (Lembar persetujuan Dekom)
  - **Section D. Pengiriman Laporan APOLO** (Accordion):
    - `D1. Tinjau Ringkasan Keuangan dan Laporan`
    - `D2. Cetak Output Laporan RBB` (Laporan RBB dan Lembar Persetujuan)
    - `D3. Bentuk File Kirim APOLO` (Pemeriksaan dan file kirim APOLO)

---

## 2. Dashboard Ringkasan Finansial & Rasio OJK (Dengan Sparkline)

Pada bagian bawah section B & A, terdapat dashboard KPI keuangan interaktif:

### 1. Ringkasan Pos Neraca Utama (Kartu Sparkline):
- **Total Aset:** `Rp44,19 M` (+21,8% vs Des 2025)
- **Kredit yang Diberikan:** `Rp29,84 M` (+20,9% vs Des 2025)
- **DPK (Tabungan + Deposito):** `Rp27,48 M` (+24,1% vs Des 2025)
- **Total Ekuitas:** `Rp13,33 M` (+26,3% vs Des 2025)
- **Laba Tahun Berjalan:** `Rp2,38 M` (+446,6% vs Des 2025)

### 2. Indikator Rasio OJK (Alert Box System):
- **KPMM (CAR):** `62,54%` (Batas min. 12%) → Status: `Dalam batas` (Hijau).
- **NPL Gross:** `7,62%` (Batas maks. 5%) → Status: **`Di luar batas`** (Border Merah & Teks Peringatan).
- **NPL Neto:** `4,58%` (Batas maks. 5%) → Status: `Dalam batas` (Hijau).
- **CKPN / PPAP:** `109,34%` (Batas min. 100%) → Status: `Dalam batas` (Hijau).
- **ROA:** `6,88%` (Batas min. 1%) → Status: `Dalam batas` (Hijau).
- **BOPO:** `66,40%` (Batas maks. 80%) → Status: `Dalam batas` (Hijau).
- **NIM:** `15,18%` (Batas min. 5%) → Status: `Dalam batas` (Hijau).
- **LDR:** `108,59%` (Batas maks. 90%) → Status: **`Di luar batas`** (Border Merah & Teks Peringatan).
- **Cash Ratio:** `17,74%` → Status: `Dalam batas`.
- **Low Cost Deposit (CASA):** `34,82%` → Status: `Dalam batas`.

---

## 3. Data & Skema Database Tambahan

### Tabel `rbb_plans` / `rbb_self_assessments`
- `id`: UUID (Primary Key)
- `bpr_id`: TEXT
- `bpr_name`: TEXT (`PT. BPR BKK BATANG (PERSERODA)`)
- `sandi_bpr`: TEXT (`601562`)
- `kota_kab`: TEXT (`Kab. Batang`)
- `tahun_rencana`: INT (`2027`)
- `jenis_rbb`: TEXT (`Rutin` / `Koreksi`)
- `nama_skenario`: TEXT (`Latihan Supri`, `Simulasi SUpri Data Asli`)
- `modal_inti`: NUMERIC (`15160321590`)
- `seojk_reference`: TEXT (`SEOJK 24/2025 - APOLO Baru`)
- `progress_total`: INT (`100`)
- `progress_persiapan`: TEXT (`Lengkap` / `Belum Lengkap`)
- `progress_proyeksi`: TEXT (`Lengkap` / `Belum Lengkap`)
- `progress_narasi`: TEXT (`Lengkap` / `Belum Lengkap`)
- `is_locked`: BOOLEAN
- `created_at`: TIMESTAMPTZ
- `updated_at`: TIMESTAMPTZ
