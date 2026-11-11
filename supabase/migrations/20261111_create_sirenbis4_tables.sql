-- ==============================================================================
-- MIGRASI BASIS DATA: MODUL SIRENBIS 4 (BPR GO DIGITAL)
-- Format: PostgreSQL / Supabase
-- Tabel: rbb_self_assessments, rbb_trend_projections
-- ==============================================================================

-- 1. Tabel Header Asesmen RBB (Rencana Bisnis Bank/BPRS)
CREATE TABLE IF NOT EXISTS public.rbb_self_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bpr_id TEXT NOT NULL,                             -- Identitas / Prefix BPR
    tahun_rencana INT NOT NULL,                       -- Periode RBB (misal: 2026)
    jenis_rbb TEXT NOT NULL CHECK (jenis_rbb IN ('RUTIN', 'KOREKSI')),
    status_dokumen TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status_dokumen IN ('DRAFT', 'SUBMITTED', 'LOCKED', 'APPROVED')),
    locked_at TIMESTAMPTZ NULL,                       -- Timestamp saat dokumen dikunci
    locked_by TEXT NULL,                              -- User / Reviewer yang mengunci dokumen
    created_by TEXT NOT NULL,                         -- Email / User ID pembuat
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indeks untuk pencarian cepat berdasarkan BPR dan tahun
CREATE INDEX IF NOT EXISTS idx_rbb_bpr_tahun ON public.rbb_self_assessments(bpr_id, tahun_rencana);
CREATE INDEX IF NOT EXISTS idx_rbb_status ON public.rbb_self_assessments(status_dokumen);

-- 2. Tabel Rincian Proyeksi Tren Keuangan RBB (Neraca, Laba Rugi, Rasio)
CREATE TABLE IF NOT EXISTS public.rbb_trend_projections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES public.rbb_self_assessments(id) ON DELETE CASCADE,
    kategori TEXT NOT NULL CHECK (kategori IN ('NERACA', 'LABA_RUGI', 'RASIO')),
    pos_rekening TEXT NOT NULL,                       -- Nama Pos Rekening
    realisasi_thn_lalu NUMERIC(18, 2) DEFAULT 0,      -- Angka realisasi N-1
    proyeksi_thn_1 NUMERIC(18, 2) DEFAULT 0,          -- Proyeksi N+1
    proyeksi_thn_2 NUMERIC(18, 2) DEFAULT 0,          -- Proyeksi N+2
    proyeksi_thn_3 NUMERIC(18, 2) DEFAULT 0,          -- Proyeksi N+3
    catatan_asumsi TEXT NULL,                         -- Justifikasi & asumsi makro/mikro
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rbb_projections_assessment ON public.rbb_trend_projections(assessment_id);

-- 3. Trigger Otomatis Pembaruan `updated_at`
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_rbb_assessments_updated_at ON public.rbb_self_assessments;
CREATE TRIGGER trg_rbb_assessments_updated_at
    BEFORE UPDATE ON public.rbb_self_assessments
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 4. Keamanan: Row Level Security (RLS)
ALTER TABLE public.rbb_self_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rbb_trend_projections ENABLE ROW LEVEL SECURITY;

-- Policy Akses Membaca (Read)
CREATE POLICY "Allow authenticated read on rbb_self_assessments"
    ON public.rbb_self_assessments FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated read on rbb_trend_projections"
    ON public.rbb_trend_projections FOR SELECT
    TO authenticated
    USING (true);

-- Policy Akses Menulis (Insert/Update)
CREATE POLICY "Allow authenticated insert/update on rbb_self_assessments"
    ON public.rbb_self_assessments FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated insert/update on rbb_trend_projections"
    ON public.rbb_trend_projections FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 5. Data Awal (Sample Seed Data)
INSERT INTO public.rbb_self_assessments (id, bpr_id, tahun_rencana, jenis_rbb, status_dokumen, created_by)
VALUES 
    ('a0000000-0000-0000-0000-000000000001', 'bpr-batang-01', 2026, 'RUTIN', 'DRAFT', 'bkk_tpi_batang@yahoo.co.id'),
    ('a0000000-0000-0000-0000-000000000002', 'bpr-batang-01', 2025, 'KOREKSI', 'APPROVED', 'bkk_tpi_batang@yahoo.co.id')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.rbb_trend_projections (assessment_id, kategori, pos_rekening, realisasi_thn_lalu, proyeksi_thn_1, proyeksi_thn_2, proyeksi_thn_3, catatan_asumsi)
VALUES
    ('a0000000-0000-0000-0000-000000000001', 'NERACA', 'Total Aset', 185450, 204000, 228500, 255000, 'Ekspansi kredit produktif UMKM.'),
    ('a0000000-0000-0000-0000-000000000001', 'NERACA', 'Dana Pihak Ketiga (DPK)', 142300, 158000, 178000, 200000, 'Program tabungan komunitas.'),
    ('a0000000-0000-0000-0000-000000000001', 'NERACA', 'Kredit yang Diberikan (KYD)', 138200, 154500, 174000, 196000, 'Penyaluran sektor perdagangan.'),
    ('a0000000-0000-0000-0000-000000000001', 'LABA_RUGI', 'Laba Sebelum Pajak (EBT)', 5200, 6200, 7400, 8900, 'Target pertumbuhan laba 18%.'),
    ('a0000000-0000-0000-0000-000000000001', 'RASIO', 'CAR (%)', 20.45, 21.20, 21.80, 22.50, 'Modal minimum terjaga di atas 12%.'),
    ('a0000000-0000-0000-0000-000000000001', 'RASIO', 'NPL Neto (%)', 2.85, 2.50, 2.20, 1.95, 'Kualitas aset kredit terjaga sehat.')
ON CONFLICT DO NOTHING;

