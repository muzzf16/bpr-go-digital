import { RbbSelfAssessment, RbbTrendProjection } from "./types";

export const DEFAULT_RBB_ASSESSMENTS: RbbSelfAssessment[] = [
  {
    id: "5b2dd23b-8361-4402-b599-96e9a2166f0d",
    bpr_id: "601562",
    sandi_bpr: "601562",
    kota_kab: "Kab. Batang",
    bpr_name: "PT. BPR BKK BATANG (PERSERODA)",
    tahun_rencana: 2027,
    jenis_rbb: "RUTIN",
    status_dokumen: "DRAFT",
    modal_inti: 15160321590,
    seojk_reference: "SEOJK 24/2025 - APOLO Baru",
    nama_skenario: "Simulasi SUpri Data Asli",
    progress_total: 18,
    progress_persiapan: "Perlu Perhatian",
    progress_proyeksi: "Perlu Perhatian",
    progress_narasi: "Perlu Perhatian",
    locked_at: null,
    locked_by: null,
    created_by: "bkk_tpi_batang@yahoo.co.id",
    created_at: "2026-11-01T08:00:00Z",
    updated_at: "2026-11-10T14:20:00Z"
  },
  {
    id: "rbb-2027-supri-full",
    bpr_id: "601562",
    sandi_bpr: "601562",
    kota_kab: "Kab. Batang",
    bpr_name: "PT. BPR BKK BATANG (PERSERODA)",
    tahun_rencana: 2027,
    jenis_rbb: "RUTIN",
    status_dokumen: "APPROVED",
    modal_inti: 11537422478,
    seojk_reference: "SEOJK 24/2025 - APOLO Baru",
    nama_skenario: "Latihan Supri",
    progress_total: 100,
    progress_persiapan: "Lengkap",
    progress_proyeksi: "Lengkap",
    progress_narasi: "Lengkap",
    locked_at: "2026-11-05T10:00:00Z",
    locked_by: "OJK Pengawas Perbankan",
    created_by: "bkk_tpi_batang@yahoo.co.id",
    created_at: "2026-10-20T08:00:00Z",
    updated_at: "2026-11-05T10:00:00Z"
  },
  {
    id: "rbb-2027-coba1",
    bpr_id: "601562",
    sandi_bpr: "601562",
    kota_kab: "Kab. Batang",
    bpr_name: "PT. BPR BKK BATANG (PERSERODA)",
    tahun_rencana: 2027,
    jenis_rbb: "RUTIN",
    status_dokumen: "DRAFT",
    modal_inti: 15160321590,
    seojk_reference: "SEOJK 24/2025 - APOLO Baru",
    nama_skenario: "Latihan RBB 2027 coba 1_data creva",
    progress_total: 3,
    progress_persiapan: "Perlu Perhatian",
    progress_proyeksi: "Belum Lengkap",
    progress_narasi: "Belum Lengkap",
    locked_at: null,
    locked_by: null,
    created_by: "bkk_tpi_batang@yahoo.co.id",
    created_at: "2026-11-02T09:00:00Z",
    updated_at: "2026-11-02T09:30:00Z"
  },
  {
    id: "rbb-2027-indah-semarang",
    bpr_id: "601562",
    sandi_bpr: "601562",
    kota_kab: "Kab. Batang",
    bpr_name: "PT. BPR BKK BATANG (PERSERODA)",
    tahun_rencana: 2027,
    jenis_rbb: "RUTIN",
    status_dokumen: "SUBMITTED",
    modal_inti: 15160321590,
    seojk_reference: "SEOJK 24/2025 - APOLO Baru",
    nama_skenario: "Latihan Indah di semarang",
    progress_total: 75,
    progress_persiapan: "Lengkap",
    progress_proyeksi: "Perlu Perhatian",
    progress_narasi: "Perlu Perhatian",
    locked_at: null,
    locked_by: null,
    created_by: "bkk_tpi_batang@yahoo.co.id",
    created_at: "2026-10-25T11:00:00Z",
    updated_at: "2026-11-08T15:00:00Z"
  }
];

export const WORKSPACE_METRICS = {
  ringkasan: [
    { label: "Total Aset", value: "Rp44,19 M", vsLabel: "vs Des 2025", delta: "+21,8%", sparkline: [35, 36.2, 38, 41, 44.19] },
    { label: "Kredit yang Diberikan", value: "Rp29,84 M", vsLabel: "vs Des 2025", delta: "+20,9%", sparkline: [24, 25.5, 27, 28.5, 29.84] },
    { label: "DPK (Tabungan + Deposito)", value: "Rp27,48 M", vsLabel: "vs Des 2025", delta: "+24,1%", sparkline: [21, 22.5, 24, 25.8, 27.48] },
    { label: "Total Ekuitas", value: "Rp13,33 M", vsLabel: "vs Des 2025", delta: "+26,3%", sparkline: [10, 10.8, 11.5, 12.4, 13.33] },
    { label: "Laba Tahun Berjalan (Kumulatif)", value: "Rp2,38 M", vsLabel: "vs Des 2025", delta: "+446,6%", sparkline: [0.4, 0.8, 1.2, 1.8, 2.38] }
  ],
  rasio: [
    { label: "KPMM", value: "62,54%", status: "Dalam batas", statusType: "success", delta: "+4,49 poin", threshold: "Batas min. 12%", sparkline: [58, 59, 61, 62.54] },
    { label: "NPL gross", value: "7,62%", status: "Di luar batas", statusType: "danger", delta: "-0,65 poin", threshold: "Batas maks. 5%", sparkline: [8.5, 8.2, 7.9, 7.62], isAlert: true },
    { label: "NPL neto (kredit bermasalah neto / total kredit)", value: "4,58%", status: "Dalam batas", statusType: "success", delta: "-7,18 poin", threshold: "Batas maks. 5%", sparkline: [6.2, 5.5, 4.9, 4.58] },
    { label: "CKPN / PPAP", value: "109,34%", status: "Dalam batas", statusType: "success", delta: "+9,34 poin", threshold: "Batas min. 100%", sparkline: [100, 102, 105, 109.34] },
    { label: "ROA", value: "6,88%", status: "Dalam batas", statusType: "success", delta: "+5,52 poin", threshold: "Batas min. 1%", sparkline: [1.2, 2.8, 4.5, 6.88] },
    { label: "BOPO", value: "66,40%", status: "Dalam batas", statusType: "success", delta: "-20,44 poin", threshold: "Batas maks. 80%", sparkline: [85, 78, 72, 66.40] },
    { label: "NIM", value: "15,18%", status: "Dalam batas", statusType: "success", delta: "+2,12 poin", threshold: "Batas min. 5%", sparkline: [12.8, 13.5, 14.2, 15.18] },
    { label: "LDR", value: "108,59%", status: "Di luar batas", statusType: "danger", delta: "-3,02 poin", threshold: "Batas maks. 90%", sparkline: [112, 110, 109, 108.59], isAlert: true },
    { label: "Cash ratio (aset likuid / kewajiban lancar)", value: "17,74%", status: "Dalam batas", statusType: "success", delta: "-17,93 poin", threshold: "", sparkline: [28, 25, 20, 17.74] },
    { label: "Low cost deposit (Tabungan / DPK)", value: "34,82%", status: "Dalam batas", statusType: "success", delta: "+1,75 poin", threshold: "", sparkline: [32, 33, 34, 34.82] }
  ]
};

export const DEFAULT_PROJECTIONS: Record<string, RbbTrendProjection[]> = {
  "5b2dd23b-8361-4402-b599-96e9a2166f0d": [
    {
      id: "p-01",
      assessment_id: "5b2dd23b-8361-4402-b599-96e9a2166f0d",
      kategori: "NERACA",
      pos_rekening: "Total Aset",
      realisasi_thn_lalu: 36270,
      proyeksi_thn_1: 44190,
      proyeksi_thn_2: 52000,
      proyeksi_thn_3: 61000,
      catatan_asumsi: "Ekspansi kredit UMKM Kabupaten Batang."
    },
    {
      id: "p-02",
      assessment_id: "5b2dd23b-8361-4402-b599-96e9a2166f0d",
      kategori: "NERACA",
      pos_rekening: "Kredit yang Diberikan",
      realisasi_thn_lalu: 24700,
      proyeksi_thn_1: 29840,
      proyeksi_thn_2: 35500,
      proyeksi_thn_3: 42000,
      catatan_asumsi: "Fokus sektor produktif mikro & musiman pertanian."
    },
    {
      id: "p-03",
      assessment_id: "5b2dd23b-8361-4402-b599-96e9a2166f0d",
      kategori: "NERACA",
      pos_rekening: "DPK (Tabungan + Deposito)",
      realisasi_thn_lalu: 22100,
      proyeksi_thn_1: 27480,
      proyeksi_thn_2: 33200,
      proyeksi_thn_3: 39500,
      catatan_asumsi: "Penetrasi tabungan pelajar dan payroll instansi daerah."
    },
    {
      id: "p-04",
      assessment_id: "5b2dd23b-8361-4402-b599-96e9a2166f0d",
      kategori: "NERACA",
      pos_rekening: "Total Ekuitas & Modal Inti",
      realisasi_thn_lalu: 10550,
      proyeksi_thn_1: 13330,
      proyeksi_thn_2: 15160,
      proyeksi_thn_3: 17500,
      catatan_asumsi: "Penyertaan modal Pemda dan akumulasi laba ditahan."
    },
    {
      id: "p-05",
      assessment_id: "5b2dd23b-8361-4402-b599-96e9a2166f0d",
      kategori: "LABA_RUGI",
      pos_rekening: "Laba Tahun Berjalan (Kumulatif)",
      realisasi_thn_lalu: 435,
      proyeksi_thn_1: 2380,
      proyeksi_thn_2: 3100,
      proyeksi_thn_3: 3900,
      catatan_asumsi: "Peningkatan pendapatan bunga & efisiensi BOPO."
    },
    {
      id: "p-06",
      assessment_id: "5b2dd23b-8361-4402-b599-96e9a2166f0d",
      kategori: "RASIO",
      pos_rekening: "KPMM (CAR)",
      realisasi_thn_lalu: 58.05,
      proyeksi_thn_1: 62.54,
      proyeksi_thn_2: 60.20,
      proyeksi_thn_3: 58.90,
      catatan_asumsi: "Jauh di atas batas regulasi OJK 12%."
    },
    {
      id: "p-07",
      assessment_id: "5b2dd23b-8361-4402-b599-96e9a2166f0d",
      kategori: "RASIO",
      pos_rekening: "NPL Gross",
      realisasi_thn_lalu: 8.27,
      proyeksi_thn_1: 7.62,
      proyeksi_thn_2: 4.95,
      proyeksi_thn_3: 3.80,
      catatan_asumsi: "Target penurunan NPL bertahap menuju batas OJK maks 5%."
    },
    {
      id: "p-08",
      assessment_id: "5b2dd23b-8361-4402-b599-96e9a2166f0d",
      kategori: "RASIO",
      pos_rekening: "LDR",
      realisasi_thn_lalu: 111.61,
      proyeksi_thn_1: 108.59,
      proyeksi_thn_2: 95.00,
      proyeksi_thn_3: 88.50,
      catatan_asumsi: "Optimalisasi penghimpunan DPK untuk menurunkan LDR ke bawah 90%."
    }
  ]
};
