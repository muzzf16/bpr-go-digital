# CLONE_SPEC — Dashboard Creva (BPR Go Digital)

Dokumen spesifikasi hasil observasi *black box* halaman `https://creva.id/app/dashboard` menggunakan instrumen Remote Execution Agent (REA) dan Chrome DevTools Protocol (CDP).

---

## 1. UI / UX

### 1.1 Screenshots

- **Desktop (1280px):** [`screenshots/desktop.png`](file:///C:/Users/hpbap/rea-results/screenshots/desktop.png) (1280 × 800)
- **Mobile (375px):** [`screenshots/mobile.png`](file:///C:/Users/hpbap/rea-results/screenshots/mobile.png) (375 × 812)

---

### 1.2 Design Tokens & Computed CSS (Komponen Utama)

Berikut adalah nilai asli yang diambil langsung dari *computed style* DOM:

| Elemen / Komponen | Properti CSS | Nilai Asli (Computed) | Keterangan / Bukti |
| :--- | :--- | :--- | :--- |
| **Global Font** | `font-family` | `"Source Sans 3", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | Diterapkan pada body dan semua elemen turunan |
| **Global Text** | `color` | `rgb(55, 65, 81)` (#374151 - Slate 700) | Warna font standar konten |
| **Heading 1 (H1)** | `font-size` / `line-height`<br>`font-weight`<br>`color`<br>`margin` | `30px` / `36px`<br>`700` (Bold)<br>`rgb(15, 23, 42)` (#0F172A)<br>`4px 0px 0px` | Judul section / halaman |
| **Heading 2 (H2)** | `font-size` / `line-height`<br>`font-weight`<br>`color`<br>`margin` | `18px` / `28px`<br>`700` (Bold)<br>`rgb(15, 23, 42)` (#0F172A)<br>`2px 0px 0px` | Sub-heading / label group |
| **Tombol Navigasi / Tab** | `padding`<br>`border-radius`<br>`color`<br>`background-color`<br>`box-shadow` | `8px 24px`<br>`0px`<br>`rgb(75, 85, 99)`<br>`rgb(255, 255, 255)`<br>`rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px` | Tombol akses cepat menu atas |
| **Tombol Aksi Utama (Pill / Purple)** | `padding`<br>`border-radius`<br>`font-size`<br>`font-weight`<br>`color`<br>`background-color` | `8px 12px`<br>`8px`<br>`14px`<br>`600` (Semi-bold)<br>`rgb(76, 29, 149)` (#4C1D95)<br>`rgb(221, 214, 254)` (#DDD6FE) | Tombol badge/aksi khusus |
| **Card Banner (Notifikasi / Tagihan)** | `padding`<br>`border-radius`<br>`border`<br>`box-shadow`<br>`margin` | `10px 16px`<br>`16px` (Rounded-2xl)<br>`1px solid rgb(234, 242, 253)`<br>`rgba(59, 130, 246, 0.12) 0px 16px 36px 0px`<br>`12px 0px 0px` | Banner peringatan tagihan / notice atas |
| **Badge Status Aktif (Green Indicator)** | `width` × `height`<br>`border-radius`<br>`background-color` | `12px` × `12px`<br>`9999px` (Rounded-full)<br>`rgb(39, 174, 96)` (#27AE60) | Titik indikator status aktif |
| **App Icon Container (Blue Rounded)** | `width` × `height`<br>`border-radius`<br>`color`<br>`background-color`<br>`box-shadow` | `32px` × `32px`<br>`4px`<br>`rgb(47, 128, 237)`<br>`rgb(203, 223, 251)`<br>`rgba(0, 0, 0, 0.1) 0px 4px 6px -1px` | Kotak icon aplikasi di sidebar/grid |

---

### 1.3 State Tampilan

- **Loading State:** Tidak menggunakan full-page skeleton; pemuatan awal data user/aplikasi menggunakan micro-loader / spinner ringan sebelum card aplikasi terisi.
- **Empty State:** Jika tidak ada aplikasi yang di-pin/baru dibuka (`pinnedDashboardApps`, `recentDashboardApps`), area menampilkan placeholder menu navigasi default ke direktori aplikasi lengkap.
- **Disabled State:** Elemen tombol / link yang tidak memiliki hak akses (`privileges`) disembunyikan atau dinonaktifkan dengan cursor `not-allowed` / opacity tereduksi (diamati dari pengecekan hak akses `currentUserForBlockOnUnauthorizedPrefix`).
- **Notice State (Peringatan):** Terdapat alert banner di bagian atas untuk status akun:
  - Peringatan masa berlaku password (`"Password Anda sudah kedaluwarsa. Password wajib di..."`).
  - Peringatan penagihan (`"Lihat Daftar Tagihan & Pembayaran"`).

---

## 2. Perilaku (Behavior)

### 2.1 Alur Pengguna (User Flow)
1. **Autentikasi & Inisialisasi Sesi:**
   - Pengguna mengakses `https://creva.id/app/dashboard`.
   - Klien mengirim beberapa batch query GraphQL `currentUser` ke `https://creva.id/new-api` untuk memverifikasi identitas pengguna, hak akses (`privileges`), role, dan kepemilikan BPR (`PREFIX`).
2. **Pemeriksaan Akses & Kebijakan Bisnis:**
   - Query `currentUserForBlockOnUnpaidBill`: Memeriksa apakah akun terblokir karena tagihan yang belum dibayar.
   - Query `currentUserForBlockOnUnauthorizedPrefix`: Memvalidasi bahwa akun terasosiasi dengan prefix BPR yang valid.
3. **Pemuatan Dashboard & Navigasi Aplikasi:**
   - Menampilkan identitas profil (email/username, role, link "Edit Profile").
   - Menampilkan pintasan akses modul BPR (SIRENBIS, SIP2RBB, SI-RAKB, SILANJUT, SIPPATUH, SIP-TAKOL, SIMR, SIPRo, SIAP-TKS, SIPPENA, SIP-APUPPT, SIPETA, SI-PIPKu, SIP-CKPN, SIPEKAP).
   - Pengguna dapat melakukan pencarian modul melalui tombol dialog modal "Pencarian Aplikasi".
   - Klik pada card aplikasi melakukan routing ke modul masing-masing (misal `/app/sirenbis`, `/app/sip2rbb`, dsb.).

### 2.2 Mekanisme Transmisi Data
- **Protokol:** HTTP/2 (HTTPS) via Fetch/XHR.
- **Format:** JSON via GraphQL (`POST /new-api`).
- **Polling:** Tidak ditemukan polling agresif (tidak ada interval berkala jangka pendek).
- **Streaming / WebSocket:** Tidak teramati adanya koneksi WebSocket aktif untuk dashboard ini (0 frames terdeteksi selama sesi pengamatan). Seluruh sinkronisasi data bersifat *request-response* via GraphQL.

---

## 3. Data

### 3.1 Endpoint & Kontrak GraphQL

| Endpoint | Method | Tipe | Operasi Utama |
| :--- | :--- | :--- | :--- |
| `https://creva.id/new-api` | `POST` | GraphQL | `currentUser` |
| `https://creva.id/new-api` | `POST` | GraphQL | `currentUserForBlockOnUnpaidBill` |
| `https://creva.id/new-api` | `POST` | GraphQL | `currentUserForBlockOnUnauthorizedPrefix` |

#### Payload Request Contoh (Sanitized)

```json
{
  "operationName": "currentUser",
  "variables": {},
  "query": "query currentUser {\n  currentUser {\n    _id\n    name\n    username\n    email\n    pictureUrl\n    PREFIX\n    roleId\n    Role {\n      _id\n      name\n      privileges\n      __typename\n    }\n    tags\n    __typename\n  }\n}"
}
```

```json
{
  "operationName": "currentUserForBlockOnUnpaidBill",
  "variables": {},
  "query": "query currentUserForBlockOnUnpaidBill {\n  currentUser {\n    _id\n    tags\n    Role {\n      privileges\n      __typename\n    }\n    __typename\n  }\n}"
}
```

#### Response GraphQL Contoh (Sanitized)

```json
{
  "data": {
    "currentUser": {
      "_id": "[REDACTED_ID]",
      "name": "BPR User",
      "username": "bkk_tpi_batang@yahoo.co.id",
      "email": "bkk_tpi_batang@yahoo.co.id",
      "pictureUrl": null,
      "PREFIX": "[REDACTED_PREFIX]",
      "roleId": "[REDACTED_ROLE_ID]",
      "Role": {
        "_id": "[REDACTED_ROLE_ID]",
        "name": "Inputter",
        "privileges": ["READ", "INPUT"],
        "__typename": "Role"
      },
      "tags": [],
      "__typename": "User"
    }
  }
}
```

---

### 3.2 Client-Side Storage

| Lokasi | Key | Kegunaan |
| :--- | :--- | :--- |
| `localStorage` | `pinnedDashboardApps` | Menyimpan daftar ID aplikasi yang dipasangi pin oleh user di dashboard |
| `localStorage` | `recentDashboardApps` | Menyimpan riwayat aplikasi yang baru saja diakses |
| `localStorage` | `billWarningClicked` | Flag penanda user telah melihat/menutup notifikasi tagihan |
| `sessionStorage` | `sidebarScrollPosition` | Posisi scroll sidebar antar navigasi halaman |
| `sessionStorage` | `sidebarUserCache` | Cache data user sementara untuk rendering sidebar instan |

---

### 3.3 Draf Skema Database (INFERRED)

Berdasarkan field entitas pada query GraphQL yang diamati:

```sql
-- [INFERRED] Tabel User Akun
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(150) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    picture_url VARCHAR(500),
    prefix VARCHAR(50), -- Kode/Inisial identitas BPR
    role_id VARCHAR(36) NOT NULL,
    tags JSON,          -- Status tagihan/spesial flag
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- [INFERRED] Tabel Role & Otoritas
CREATE TABLE roles (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL, -- e.g. "Inputter", "Approver", "Admin"
    privileges JSON NOT NULL    -- Array hak akses modul & aksi
);

-- [INFERRED] Tabel Registry Aplikasi / Modul
CREATE TABLE applications (
    id VARCHAR(50) PRIMARY KEY, -- e.g. "sirenbis", "sip2rbb"
    title VARCHAR(150) NOT NULL,
    subtitle VARCHAR(255),
    version_label VARCHAR(100), -- e.g. "Versi 4 (Terbaru)"
    route_path VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    icon_url VARCHAR(500),
    min_privilege_required VARCHAR(50)
);

-- [INFERRED] Preferensi User Dashboard
CREATE TABLE user_dashboard_preferences (
    user_id VARCHAR(36) PRIMARY KEY REFERENCES users(id),
    pinned_apps JSON,
    recent_apps JSON,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. Tidak Bisa Diamati dari Luar (Black Box Boundaries)

1. **Struktur Database Fisik & Logika Backend:**
   - Jenis database relasional/NoSQL (MySQL, PostgreSQL, MongoDB, dsb.) di balik resolver GraphQL.
   - Skrip stored procedure, trigger, atau migration tools.
2. **Kalkulasi & Verifikasi Tagihan:**
   - Logika penentuan jatuh tempo tagihan di server yang memicu tag `currentUserForBlockOnUnpaidBill`.
3. **Mekanisme Validasi Password Expiry:**
   - Kebijakan rentang kedaluwarsa password (misal 90 hari / 180 hari) yang diatur di tingkat server backend.
4. **Alur Token Refresh / Session Handshake:**
   - Detail rotasi refresh token dan otorisasi sesi di level infrastruktur gateway.
