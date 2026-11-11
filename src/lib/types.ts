export interface Application {
  id: string;
  title: string;
  subtitle: string | null;
  version_label: string | null;
  route_path: string;
  category: string | null;
  icon_bg_color: string;
  icon_text_color: string;
  icon_name: string;
  min_privilege: string;
  display_order: number;
  is_active: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  name: string;
  picture_url: string | null;
  prefix: string | null;
  tags: string[];
  role: {
    id: string;
    name: string;
    privileges: string[];
  } | null;
  bpr: {
    id: string;
    prefix: string;
    name: string;
    code_ojk: string | null;
    logo_url: string | null;
  } | null;
}

export interface BillingStatus {
  has_unpaid_bill: boolean;
  unpaid_count: number;
  nearest_due_date: string | null;
  is_blocked: boolean;
}

export type RbbJenis = 'RUTIN' | 'KOREKSI';
export type RbbStatus = 'DRAFT' | 'SUBMITTED' | 'LOCKED' | 'APPROVED';

export interface RbbSelfAssessment {
  id: string;
  bpr_id: string;
  tahun_rencana: number;
  jenis_rbb: RbbJenis;
  status_dokumen: RbbStatus;
  nama_skenario?: string;
  sandi_bpr?: string;
  kota_kab?: string;
  modal_inti?: number;
  seojk_reference?: string;
  progress_total?: number;
  progress_persiapan?: "Lengkap" | "Belum Lengkap" | "Perlu Perhatian";
  progress_proyeksi?: "Lengkap" | "Belum Lengkap" | "Perlu Perhatian";
  progress_narasi?: "Lengkap" | "Belum Lengkap" | "Perlu Perhatian";
  locked_at: string | null;
  locked_by: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  bpr_name?: string;
}

export interface RbbTrendProjection {
  id: string;
  assessment_id: string;
  kategori: 'NERACA' | 'LABA_RUGI' | 'RASIO';
  pos_rekening: string;
  realisasi_thn_lalu: number;
  proyeksi_thn_1: number;
  proyeksi_thn_2: number;
  proyeksi_thn_3: number;
  catatan_asumsi: string | null;
  created_at?: string;
}

