// APOLO RBB BPR Export & Filename Builder
// Acuan Resmi: Template RBBPRK27_20261105.xlsm (Sheet: ContohPenamaanFile)

import { APOLO_RBB_FORMS, ApoloFormDefinition } from './apoloForms';

export interface ApoloExportMetadata {
  kodeLaporan?: string;      // default: RBBPRK27
  tipePenyampaian: 'Rutin' | 'Koreksi' | 'Penyesuaian'; // R atau K
  periodeData: string;       // YYYYMMDD, e.g. '20271231'
  sandiLjk: string;          // 6 digit e.g. '601562'
  kodeJenisUsaha?: string;   // '01' untuk konvensional, '02' untuk syariah
}

export interface GeneratedApoloFile {
  formCode: string;
  formTitle: string;
  filename: string;
  format: 'txt' | 'pdf';
  isReady: boolean;
  status: 'Lengkap' | 'Perlu Perhatian' | 'Belum Diisi';
  contentSnippet?: string;
}

/**
 * Generate official APOLO filename according to OJK specification:
 * Format: {KodeJenisLaporan}{KodeForm}{KodeRutinKoreksi}{KodeJenisPeriode}{PeriodeData}{SandiLJK}{KodeJenisUsaha}.{Format}
 */
export function buildApoloFilename(
  form: ApoloFormDefinition,
  meta: ApoloExportMetadata
): string {
  const kodeLaporan = meta.kodeLaporan || 'RBBPRK27';
  const kodeRutinKoreksi = meta.tipePenyampaian === 'Koreksi' ? 'K' : 'R';
  const kodeJenisPeriode = 'A'; // A = Tahunan
  const periode = meta.periodeData || '20271231';
  const sandi = meta.sandiLjk.padStart(6, '0').slice(0, 6);
  const jenisUsaha = meta.kodeJenisUsaha || '01';

  return `${kodeLaporan}${form.code}${kodeRutinKoreksi}${kodeJenisPeriode}${periode}${sandi}${jenisUsaha}.${form.fileFormat}`;
}

/**
 * Build list of all 21 exportable APOLO files for Section D3 (Bentuk File Kirim APOLO)
 */
export function generateAllApoloFiles(meta: ApoloExportMetadata): GeneratedApoloFile[] {
  return APOLO_RBB_FORMS.map((form) => {
    const filename = buildApoloFilename(form, meta);
    return {
      formCode: form.code,
      formTitle: form.title,
      filename,
      format: form.fileFormat,
      isReady: true,
      status: 'Lengkap',
      contentSnippet: form.fileFormat === 'txt' 
        ? `H|${meta.sandiLjk}|${meta.periodeData}|${form.code}|${form.title}\nD01|...|...`
        : `[Dokumen Terlampir: ${filename}]`
    };
  });
}

