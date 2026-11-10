# BPR Go Digital — Creva Dashboard Clone

Portal Sistem Informasi Manajemen, Kepatuhan Regulasi, dan Pelaporan Terpadu untuk BPR (Bank Perekonomian Rakyat).

Dibangun menggunakan **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, dan backend **PostgREST / Supabase**.

---

## 🌟 Fitur Utama

- **Dashboard Agregasi Terpadu:** Akses cepat seluruh modul aplikasi kepatuhan dan manajemen perbankan.
- **18 Modul BPR Lengkap:**
  - **Rencana Bisnis:** SIRENBIS (v4), SIP2RBB (v2)
  - **Keberlanjutan & APOLO:** SI-RAKB (v3), SILANJUT (v2)
  - **Audit TI & Kepatuhan:** RBITA (v1), SIPPATUH (v2)
  - **Tata Kelola (GCG):** SIP-TAKOL (POJK 9/2024)
  - **Manajemen Risiko:** SIMR (v2), SIPRo, SIPRo Plus
  - **Tingkat Kesehatan & Kinerja:** SIAP-TKS (APOLO TKS), SIPPENA (2025), SIPEKAP
  - **Anti Fraud & APUPPT:** SIP-APUPPT & PPPSPM, SI-INSAF (v2)
  - **SDM & Pengendalian Intern:** SIPETA (v2), SI-PIPKu (POJK 15/2024), SIP-CKPN
- **Fitur Pin & Recent Apps:** Pengguna dapat menyematkan modul favorit langsung di dashboard.
- **Pencarian Cepat Global (Ctrl+K):** Modal pencarian instan nama modul, kategori, atau regulasi.
- **Alert & Notifikasi Sistem:** Peringatan kedaluwarsa password dan status tagihan/langganan BPR.
- **Desain Responsif:** Viewport desktop (1280px) dan mobile (375px) sesuai standar tokens asli.

---

## 🚀 Panduan Memulai

### 1. Prasyarat
- [Node.js](https://nodejs.org) (v18+) atau [Bun](https://bun.sh)
- Akun dan project [Supabase](https://supabase.com)

### 2. Konfigurasi Lingkungan
Salin file `.env.example` menjadi `.env.local` dan isi kredensial Supabase Anda:
```bash
cp .env.example .env.local
```

Isi variabel:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Instalasi Dependensi
```bash
bun install
# atau
npm install
```

### 4. Menjalankan Server Lokal
```bash
bun run dev
# atau
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 📁 Struktur Direktori

```text
├── docs/
│   ├── CLONE_SPEC.md       # Spesifikasi hasil observasi black-box (REA)
│   └── BUILD_PLAN.md       # Rencana teknis dan arsitektur database
├── src/
│   ├── app/
│   │   ├── dashboard/      # Halaman utama dashboard portal
│   │   ├── globals.css     # Styling Tailwind & font Source Sans 3
│   │   └── layout.tsx      # Root HTML layout
│   ├── components/
│   │   ├── AppCard.tsx     # Kartu modul aplikasi individual
│   │   ├── BannerAlerts.tsx# Banner notifikasi tagihan & security
│   │   ├── Navbar.tsx      # Navigasi atas, identitas BPR & dropdown profil
│   │   └── SearchModal.tsx # Dialog pencarian global (Ctrl+K)
│   └── lib/
│       ├── supabase.ts     # Inisialisasi client Supabase
│       └── types.ts        # Interface TypeScript
└── tailwind.config.ts      # Konfigurasi token desain
```

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah lisensi MIT.

