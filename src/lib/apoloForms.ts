// APOLO RBB BPR Forms Registry & Specifications
// Acuan Resmi: Template RBBPRK27_20261105.xlsm & SEOJK RBB BPR

export interface ApoloFormDefinition {
  code: string;
  sheet: string;
  title: string;
  category: 'C' | 'B' | 'D';
  menuNumber: string;
  fileFormat: 'txt' | 'pdf';
  isMultiRow: boolean;
  description: string;
  columns?: string[];
}

export const APOLO_RBB_FORMS: ApoloFormDefinition[] = [
  {
    code: '0100',
    sheet: 'RBB.0100',
    title: 'Ringkasan Eksekutif',
    category: 'C',
    menuNumber: 'C1',
    fileFormat: 'txt',
    isMultiRow: true,
    description: 'Visi, misi, dan arah strategi rencana bisnis jangka pendek BPR.',
    columns: ['Komponen', 'Sandi', 'Uraian Ringkasan Eksekutif']
  },
  {
    code: '0200',
    sheet: 'RBB.0200',
    title: 'Strategi Bisnis dan Kebijakan',
    category: 'C',
    menuNumber: 'C2',
    fileFormat: 'txt',
    isMultiRow: true,
    description: 'Analisis posisi, arah kebijakan manajemen risiko & tata kelola terintegrasi.',
    columns: ['Komponen', 'Sandi', 'Uraian Kebijakan dan Strategi']
  },
  {
    code: '0310',
    sheet: 'RBB.0310',
    title: 'Proyeksi Laporan Posisi Keuangan (Neraca)',
    category: 'B',
    menuNumber: 'B2.1',
    fileFormat: 'txt',
    isMultiRow: true,
    description: 'Proyeksi pos aset, liabilitas, dan ekuitas (Nov X-1, Des X-1, Jun X, Des X, Des X+1, Des X+2).',
    columns: ['Pos-Pos', 'Sandi', 'Nov (X-1)', 'Des (X-1)', 'Jun X', 'Des X', 'Des (X+1)', 'Des (X+2)']
  },
  {
    code: '0320',
    sheet: 'RBB.0320',
    title: 'Proyeksi Laporan Laba Rugi',
    category: 'B',
    menuNumber: 'B2.2',
    fileFormat: 'txt',
    isMultiRow: true,
    description: 'Proyeksi pendapatan bunga, beban bunga, biaya operasional, dan laba bersih.',
    columns: ['Pos-Pos', 'Sandi', 'Nov (X-1)', 'Des (X-1)', 'Jun X', 'Des X', 'Des (X+1)', 'Des (X+2)']
  },
  {
    code: '0330',
    sheet: 'RBB.0330',
    title: 'Proyeksi Rekening Administratif',
    category: 'B',
    menuNumber: 'B2.3',
    fileFormat: 'txt',
    isMultiRow: true,
    description: 'Komitmen dan kontinjensi yang dimiliki BPR.',
    columns: ['Pos-Pos', 'Sandi', 'Nov (X-1)', 'Des (X-1)', 'Jun X', 'Des X', 'Des (X+1)', 'Des (X+2)']
  },
  {
    code: '0400',
    sheet: 'RBB.0400',
    title: 'Target Rasio dan Pos Keuangan',
    category: 'B',
    menuNumber: 'B2.4',
    fileFormat: 'txt',
    isMultiRow: true,
    description: 'Rasio kinerja utama: KPMM, NPL Gross/Neto, ROA, BOPO, NIM, LDR, Cash Ratio.',
    columns: ['Rasio & Indikator', 'Sandi', 'Nov (X-1)', 'Des (X-1)', 'Jun X', 'Des X', 'Des (X+1)', 'Des (X+2)']
  },
  {
    code: '0500',
    sheet: 'RBB.0500',
    title: 'Rencana Penghimpunan Dana',
    category: 'C',
    menuNumber: 'C4',
    fileFormat: 'txt',
    isMultiRow: true,
    description: 'Rencana target penghimpunan DPK (Tabungan dan Deposito) per kelompok nasabah.',
    columns: ['Jenis Dana', 'Sandi', 'Uraian Strategi Penghimpunan']
  },
  {
    code: '0610',
    sheet: 'RBB.0610',
    title: 'Penyaluran Kredit per Sektor Ekonomi Terbesar',
    category: 'C',
    menuNumber: 'C5',
    fileFormat: 'txt',
    isMultiRow: true,
    description: 'Distribusi rencana kredit pada sektor ekonomi unggulan.',
    columns: ['Sektor Ekonomi', 'Sandi Sektor', 'Plafon Kredit', 'Baki Debet', 'Suku Bunga %', 'NPL %']
  },
  {
    code: '0620',
    sheet: 'RBB.0620',
    title: 'Penyaluran Kredit per Jenis Penggunaan',
    category: 'C',
    menuNumber: 'C5',
    fileFormat: 'txt',
    isMultiRow: true,
    description: 'Modal Kerja, Investasi, dan Konsumsi.',
    columns: ['Jenis Penggunaan', 'Sandi Penggunaan', 'Target Plafon', 'Baki Debet Des X', 'Porsi %']
  },
  {
    code: '0630',
    sheet: 'RBB.0630',
    title: 'Penyaluran Kredit Berdasarkan Jenis Usaha (UMKM)',
    category: 'C',
    menuNumber: 'C5',
    fileFormat: 'txt',
    isMultiRow: true,
    description: 'Skema UMKM Mikro, Kecil, Menengah, dan Non UMKM.',
    columns: ['Kategori Usaha', 'Sandi', 'Plafon', 'Baki Debet', 'Persentase %', 'Keterangan']
  },
  {
    code: '0700',
    sheet: 'RBB.0700',
    title: 'Rencana Permodalan',
    category: 'C',
    menuNumber: 'C6',
    fileFormat: 'txt',
    isMultiRow: true,
    description: 'Rencana pemenuhan modal inti, setoran modal pemegang saham, dan pembagian dividen.',
    columns: ['Komponen Modal', 'Sandi', 'Target Penambahan', 'Jadwal Realisasi', 'Sumber Dana']
  },
  {
    code: '0810',
    sheet: 'RBB.0810',
    title: 'Pengembangan & Pengadaan Teknologi Informasi',
    category: 'C',
    menuNumber: 'C7',
    fileFormat: 'txt',
    isMultiRow: true,
    description: 'Rencana sistem Core Banking, infrastruktur jaringan, hardware, dan lisensi software.',
    columns: ['Inisiatif TI', 'Sandi', 'Anggaran (Rp)', 'Target Waktu', 'Mitra Vendor']
  },
  {
    code: '0821',
    sheet: 'RBB.0821',
    title: 'Rencana Rekrutmen SDM',
    category: 'C',
    menuNumber: 'C7',
    fileFormat: 'txt',
    isMultiRow: true,
    description: 'Target penambahan pegawai struktural, operasional, dan staf bisnis.',
    columns: ['Level Jabatan', 'Jumlah Orang', 'Kualifikasi', 'Estimasi Biaya', 'Triwulan']
  },
  {
    code: '0822',
    sheet: 'RBB.0822',
    title: 'Rencana Pengembangan Kualitas SDM',
    category: 'C',
    menuNumber: 'C7',
    fileFormat: 'txt',
    isMultiRow: true,
    description: 'Program pelatihan, workshop, dan sertifikasi profesi perbankan.',
    columns: ['Topik Pelatihan', 'Lembaga Pelaksana', 'Jumlah Peserta', 'Anggaran Diklat', 'Jadwal']
  },
  {
    code: '0823',
    sheet: 'RBB.0823',
    title: 'Rencana Pemanfaatan Tenaga Kerja Alih Daya',
    category: 'C',
    menuNumber: 'C7',
    fileFormat: 'txt',
    isMultiRow: true,
    description: 'Rencana alih daya (satpam, pramubakti, driver, penagihan/kolektor).',
    columns: ['Bidang Alih Daya', 'Jumlah Personel', 'Penyedia Jasa', 'Beban Biaya Tahunan']
  },
  {
    code: '0900',
    sheet: 'RBB.0900',
    title: 'Rencana Pelaksanaan Kegiatan Usaha Baru',
    category: 'C',
    menuNumber: 'C8',
    fileFormat: 'txt',
    isMultiRow: true,
    description: 'Produk/layanan baru seperti tabungan digital, QRIS, keagenan laku pandai.',
    columns: ['Nama Produk/Layanan', 'Karakteristik', 'Target Nasabah', 'Target Volume', 'Kesiapan Sistem']
  },
  {
    code: '0910',
    sheet: 'RBB.0910',
    title: 'Rencana Kegiatan Penyertaan Modal (PDF)',
    category: 'C',
    menuNumber: 'C8',
    fileFormat: 'pdf',
    isMultiRow: false,
    description: 'Dokumen telaah analisis kelayakan penyertaan modal (Maks 20MB).'
  },
  {
    code: '0920',
    sheet: 'RBB.0920',
    title: 'Rencana Divestasi Atas Inisiatif BPR (PDF)',
    category: 'C',
    menuNumber: 'C8',
    fileFormat: 'pdf',
    isMultiRow: false,
    description: 'Dokumen rencana pelepasan penyertaan modal/divestasi (Maks 20MB).'
  },
  {
    code: '1000',
    sheet: 'RBB.1000',
    title: 'Rencana Pengembangan dan Perubahan Jaringan Kantor',
    category: 'C',
    menuNumber: 'C9',
    fileFormat: 'txt',
    isMultiRow: true,
    description: 'Pembukaan KC/KCP, relokasi, kas keliling, atau penutupan kantor.',
    columns: ['Status Rencana', 'Jenis Kantor', 'Nama Kantor', 'Lokasi/Kota', 'Jadwal', 'Biaya Sewa/Gedung']
  },
  {
    code: '9900',
    sheet: 'RBB.9900',
    title: 'Informasi Lainnya (PDF)',
    category: 'C',
    menuNumber: 'C10',
    fileFormat: 'pdf',
    isMultiRow: false,
    description: 'Dokumen pendukung komprehensif lainnya yang disyaratkan OJK (Maks 20MB).'
  },
  {
    code: '9901',
    sheet: 'RBB.9901',
    title: 'Lembar Persetujuan Dewan Komisaris (PDF)',
    category: 'C',
    menuNumber: 'C11',
    fileFormat: 'pdf',
    isMultiRow: false,
    description: 'Salinan risalah rapat atau persetujuan resmi Dewan Komisaris bertandatangan lengkap.'
  }
];

