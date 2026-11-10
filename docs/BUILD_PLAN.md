# BUILD_PLAN — Rencana Pembangunan Web App Creva (BPR Go Digital)

Dokumen rencana arsitektur dan implementasi teknis untuk membangun kembali aplikasi portal BPR berbasis **Next.js (App Router)** dan **PostgREST / Supabase** berdasarkan spesifikasi pada `CLONE_SPEC.md` serta acuan visual pada `screenshots/desktop.png` dan `screenshots/mobile.png`.

---

## 1. Yang Dibangun: Detail Fitur dan Modul

### 1.1 Modul Inti & Navigasi Portal
- **Dashboard Hub**: Halaman utama agregasi menu, status BPR, akses cepat, filter pin, dan histori aplikasi terbaru.
- **Pencarian Aplikasi Global**: Modal dialog pencarian cepat dengan indexing nama modul, kode POJK/SEOJK, dan kategori regulasi.
- **Profil & Autentikasi Pengguna**: Manajemen sesi login, penggantian password (dengan validasi kedaluwarsa), dan edit data profil BPR.
- **Billing & Subscription Notice**: Banner status penagihan dinamis dengan peringatan jatuh tempo dan riwayat pembayaran.
- **Informasi BPR**: Manajemen data master BPR, nama resmi, sandi BPR (PREFIX), alamat, kontak, dan logo instansi.
- **Regulasi & Pelatihan**: Repositori unduhan pedoman, update POJK/SEOJK terbaru, dan jadwal pelatihan perbankan.

### 1.2 Direktori Modul Aplikasi Kepatuhan & Operasional BPR
- **SIRENBIS (Versi 4 Terbaru)**: Sistem Informasi Rencana Bisnis BPR (penyusunan, proyeksi keuangan, dan pelaporan rencana bisnis tahunan).
- **SIP2RBB (Versi 2 SEOJK RBB Baru)**: Sistem Informasi Penilaian dan Pengawasan Realisasi Rencana Bisnis BPR.
- **SI-RAKB (Versi 3 APOLO)**: Sistem Informasi Rencana Aksi Keuangan Berkelanjutan terintegrasi format pelaporan APOLO OJK.
- **SILANJUT (Versi 2 APOLO)**: Sistem Informasi Laporan Keberlanjutan terintegrasi standar APOLO OJK.
- **RBITA (Versi 1)**: Rencana Bisnis dan Informasi Teknologi Audit (arsip modul versi terdahulu).
- **SIPPATUH (Versi 2 SE OJK Baru)**: Sistem Informasi Pemantauan Kepatuhan regulasi dan audit internal perbankan.
- **SIP-TAKOL (POJK 9 Tahun 2024)**: Sistem Penerapan Tata Kelola (Good Corporate Governance / GCG) BPR sesuai POJK 9/2024.
- **SIMR (Versi 2)**: Sistem Informasi Manajemen Risiko terintegrasi framework mitigasi risiko perbankan.
- **SIPRo (Profil Risiko)**: Penilaian dan pemetaan self-assessment tingkat profil risiko operasional dan kredit.
- **SIPRo Plus (Profil Risiko Plus)**: Analisis komprehensif tingkat kesehatan profil risiko dengan agregasi data historis.
- **SIAP-TKS (Mendukung APOLO TKS)**: Sistem Informasi Analisis Penilaian Tingkat Kesehatan Bank format APOLO.
- **SIPPENA (Versi 2 Tahun 2025)**: Sistem Informasi Penilaian dan Penetapan Kinerja BPR periode 2025.
- **SIP-APUPPT & PPPSPM**: Penilaian Anti Pencucian Uang, Pencegahan Pendanaan Terorisme, dan Proliferasi Senjata Pemusnah Massal (dilengkapi modul SRA dan IRA).
- **SIPETA (Versi 2)**: Sistem Informasi Pemetaan Tenaga Kerja dan Sumber Daya Manusia BPR.
- **SI-PIPKu (POJK 15 Tahun 2024)**: Penerapan Pengendalian Intern dan Perlindungan Konsumen BPR sesuai POJK 15/2024.
- **SI-INSAF (Versi 2)**: Sistem Informasi Investigasi dan Penanganan Fraud internal perbankan.
- **SIP-CKPN**: Kalkulator dan pencatatan Cadangan Kerugian Penurunan Nilai aset produktif.
- **SIPEKAP (Mendukung APOLO)**: Sistem Informasi Penilaian Kinerja dan Akuntabilitas Perbankan format APOLO.

---

## 2. Data: Tabel dan Field yang Dibutuhkan

Berikut daftar tabel dan nama kolom beserta tipenya:

### 2.1 Tabel `users`
- `id`: UUID (Primary Key)
- `email`: VARCHAR(255)
- `username`: VARCHAR(150)
- `name`: VARCHAR(255)
- `picture_url`: TEXT
- `prefix`: VARCHAR(50)
- `role_id`: UUID
- `tags`: JSONB
- `password_hash`: TEXT
- `password_updated_at`: TIMESTAMPTZ
- `is_active`: BOOLEAN
- `created_at`: TIMESTAMPTZ
- `updated_at`: TIMESTAMPTZ

### 2.2 Tabel `roles`
- `id`: UUID (Primary Key)
- `name`: VARCHAR(100)
- `description`: TEXT
- `privileges`: JSONB
- `created_at`: TIMESTAMPTZ

### 2.3 Tabel `bpr_organizations`
- `id`: UUID (Primary Key)
- `prefix`: VARCHAR(50)
- `name`: VARCHAR(255)
- `code_ojk`: VARCHAR(50)
- `logo_url`: TEXT
- `address`: TEXT
- `phone`: VARCHAR(50)
- `email`: VARCHAR(255)
- `created_at`: TIMESTAMPTZ
- `updated_at`: TIMESTAMPTZ

### 2.4 Tabel `applications`
- `id`: VARCHAR(50) (Primary Key, slug)
- `title`: VARCHAR(150)
- `subtitle`: VARCHAR(255)
- `version_label`: VARCHAR(100)
- `route_path`: VARCHAR(255)
- `category`: VARCHAR(100)
- `icon_bg_color`: VARCHAR(50)
- `icon_text_color`: VARCHAR(50)
- `icon_name`: VARCHAR(100)
- `min_privilege`: VARCHAR(50)
- `display_order`: INTEGER
- `is_active`: BOOLEAN
- `created_at`: TIMESTAMPTZ

### 2.5 Tabel `user_dashboard_preferences`
- `id`: UUID (Primary Key)
- `user_id`: UUID
- `pinned_apps`: JSONB
- `recent_apps`: JSONB
- `updated_at`: TIMESTAMPTZ

### 2.6 Tabel `billing_invoices`
- `id`: UUID (Primary Key)
- `bpr_prefix`: VARCHAR(50)
- `invoice_number`: VARCHAR(100)
- `amount`: NUMERIC(15,2)
- `due_date`: DATE
- `status`: VARCHAR(50)
- `payment_url`: TEXT
- `paid_at`: TIMESTAMPTZ
- `created_at`: TIMESTAMPTZ

### 2.7 Tabel `regulations_training`
- `id`: UUID (Primary Key)
- `title`: VARCHAR(255)
- `category`: VARCHAR(100)
- `description`: TEXT
- `document_url`: TEXT
- `event_date`: DATE
- `is_published`: BOOLEAN
- `created_at`: TIMESTAMPTZ

---

## 3. Backend: Endpoint dan Fungsi yang Dibutuhkan

Berikut daftar endpoint Next.js Route Handler / fungsi PostgREST RPC (satu baris per item):

- `GET /api/auth/me`: Mengambil profil pengguna aktif, role, hak akses, dan kepemilikan BPR.
- `POST /api/auth/login`: Memvalidasi kredensial pengguna dan mengembalikan token sesi JWT Supabase.
- `POST /api/auth/logout`: Menghapus sesi autentikasi aktif pada browser klien.
- `POST /api/auth/change-password`: Memperbarui kata sandi pengguna dan menyetel ulang timestamp kedaluwarsa password.
- `GET /api/dashboard/summary`: Mengambil ringkasan aplikasi yang di-pin, riwayat akses, dan status tagihan BPR pengguna.
- `POST /api/dashboard/pin-app`: Menambahkan atau menghapus aplikasi dari daftar pin preferensi pengguna.
- `POST /api/dashboard/log-recent-app`: Mencatat riwayat akses modul aplikasi pengguna secara otomatis.
- `GET /api/applications`: Mengambil seluruh daftar modul aplikasi aktif yang terdaftar berdasarkan izin role pengguna.
- `GET /api/bpr/profile`: Mengambil identitas resmi dan logo BPR berdasarkan kode PREFIX pengguna.
- `PUT /api/bpr/profile`: Memperbarui data kontak, alamat, dan logo instansi BPR.
- `GET /api/billing/warning`: Memeriksa apakah terdapat invoice jatuh tempo/belum lunas untuk memunculkan banner peringatan.
- `GET /api/regulations`: Mengambil daftar dokumen regulasi dan jadwal pelatihan yang dipublikasikan.
- `rpc/get_current_user_profile`: Fungsi PostgREST database untuk mengambil relasi user, role, dan BPR dalam satu kueri atomic.
- `rpc/check_user_billing_status`: Fungsi PostgREST database untuk memeriksa status tagihan dan mengembalikan flag pemblokiran akses.

---

## 4. UI: Komponen yang Dibutuhkan

Berikut komponen React/Next.js dengan styling Tailwind CSS (satu baris per item):

- `NavbarTop`: Bar navigasi atas berisi logo BPR Go Digital, identitas akun, role badge, dan tombol navigasi utama.
- `SidebarMenu`: Menu samping yang dapat di-collapse untuk navigasi cepat antar modul aplikasi.
- `UserProfileDropdown`: Menu drop-down profil dengan email, role "Inputter", tombol "Edit Profile", dan tombol logout.
- `PasswordExpiryBanner`: Banner peringatan merah/kuning jika masa berlaku kata sandi telah kedaluwarsa.
- `BillingAlertBanner`: Card notifikasi rounded-2xl dengan tombol "Lihat Daftar Tagihan & Pembayaran".
- `SearchAppTriggerButton`: Tombol pencarian "Pencarian Aplikasi" untuk memicu modal dialog global.
- `SearchAppModal`: Dialog pop-up interaktif untuk mencari dan memfilter modul aplikasi secara instan.
- `AppCardGrid`: Grid container responsif untuk menyusun card modul aplikasi (desktop 4 kolom, mobile 1 kolom).
- `AppModuleCard`: Card kartu modul aplikasi individual dengan icon kotak rounded, judul, subjudul versi, dan status pin.
- `ActiveStatusIndicator`: Dot hijau 12px rounded-full penanda status server / modul online.
- `ModuleBadgePill`: Label ungu rounded-lg untuk penanda versi baru atau status regulasi modul.
- `SectionHeader`: Header pemisah section dengan tipografi H1/H2 font Source Sans 3 bold.
- `LoadingSpinnerMini`: Komponen loading indikator mikro tanpa full-screen blocking.
- `EmptyStatePlaceholder`: Tampilan placeholder informatif ketika belum ada aplikasi di-pin atau riwayat akses kosong.
- `MobileNavigationDrawer`: Drawer navigasi bawah / samping khusus tampilan mobile (viewport 375px).

---

## 5. Yang Harus Disiapkan Sendiri oleh Pengguna

Langkah-langkah persiapan layanan, kredensial, dan dependencies (tanpa menyertakan nilai rahasia):

1. **Membuat Proyek Supabase**: Daftar atau login ke [supabase.com](https://supabase.com) dan buat satu proyek baru untuk database PostgREST.
2. **Menyiapkan Storage Bucket di Supabase**: Buat bucket storage publik dengan nama `bpr-assets` untuk upload logo BPR dan avatar user.
3. **Menyiapkan API Key AI (Opsional)**: Dapatkan API Key Gemini / OpenAI jika ingin menyematkan fitur AI assistant untuk regulasi BPR.
4. **Menyiapkan File Lingkungan (`.env.local`)**: Buat file `.env.local` di root proyek dengan variabel berikut (nama variabel saja):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GEMINI_API_KEY` (opsional untuk AI)
   - `NEXTAUTH_SECRET` (jika menggunakan custom JWT secret)
5. **Menginstal Dependensi Inti**: Jalankan instalasi package berikut di root Next.js:
   - `pnpm add @supabase/supabase-js @supabase/ssr`
   - `pnpm add lucide-react clsx tailwind-merge`
   - `pnpm add @tanstack/react-query`
   - `pnpm add cmdk` (untuk modal dialog pencarian instan)
6. **Menghubungkan Supabase MCP**: Sambungkan kredensial Supabase MCP ke IDE agar agent dapat otomatis mengeksekusi migrasi DDL tabel di atas.

---

## 6. Asumsi Berdasarkan Item UNKNOWN (CLONE_SPEC)

Berikut asumsi arsitektur yang digunakan untuk mengisi keterbatasan observasi luar (satu baris per item):

- **Asumsi Database Engine**: Digunakan PostgreSQL (Supabase) dengan ekstensi `pgcrypto` dan `uuid-ossp` untuk menggantikan backend GraphQL internal Creva.
- **Asumsi Struktur Tagihan**: Tagihan dihitung berbasis langganan bulanan/tahunan per kode BPR PREFIX dengan ambang grace period 7 hari setelah jatuh tempo.
- **Asumsi Kebijakan Password Expiry**: Masa berlaku password diasumsikan wajib diperbarui setiap 90 hari sejak tanggal pembaruan terakhir (`password_updated_at`).
- **Asumsi Hak Akses Role**: Role "Inputter" memiliki hak `READ` dan `INPUT` transaksi modul; role "Approver" memiliki hak `APPROVAL`; role "Admin" memiliki hak konfigurasi instansi.
- **Asumsi Mekanisme Sesi**: Digunakan cookie-based HTTP-only session token standar Supabase Auth yang ter-refresh secara otomatis pada Next.js Middleware.
- **Asumsi Skema GraphQL**: Kueri GraphQL legacy (`/new-api`) dimodernisasi menjadi RESTful PostgREST Client queries `@supabase/supabase-js` langsung dari Next.js Server Components.
