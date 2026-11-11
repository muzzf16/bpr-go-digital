"use strict";
import React from "react";
import { RbbSelfAssessment, RbbTrendProjection, UserProfile } from "@/lib/types";

interface RbbPrintLayoutProps {
  assessment: RbbSelfAssessment;
  projections: RbbTrendProjection[];
  user: UserProfile | null;
}

export const RbbPrintLayout: React.FC<RbbPrintLayoutProps> = ({
  assessment,
  projections,
  user
}) => {
  const formatVal = (val: number, kategori: string) => {
    if (kategori === "RASIO") return `${val.toFixed(2)}%`;
    return new Intl.NumberFormat("id-ID").format(val);
  };

  return (
    <div className="sirenbis4-trend-print-area p-8 bg-white text-slate-900">
      {/* Print Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-black uppercase tracking-tight">
              {user?.bpr?.name || "PT BPR BAPERA BATANG"}
            </h1>
            <p className="text-xs text-slate-600">
              RENCANA BISNIS BANK (RBB) TAHUN {assessment.tahun_rencana} — FORMAT SIRENBIS 4 (SEOJK RBB)
            </p>
          </div>
          <div className="text-right text-xs">
            <span className="font-bold block">JENIS: RBB {assessment.jenis_rbb}</span>
            <span className="text-slate-500 block">STATUS: {assessment.status_dokumen}</span>
            <span className="text-slate-400 block text-[10px]">
              Dicetak: {new Date().toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>

      {/* Projections Matrix Table */}
      <h2 className="text-sm font-bold uppercase mb-2">Matriks Proyeksi Tren Keuangan</h2>
      <table className="w-full text-xs border border-slate-400 mb-8">
        <thead>
          <tr className="bg-slate-100 border-b border-slate-400 font-bold">
            <th className="p-2 border-r border-slate-400 text-left">Pos Rekening</th>
            <th className="p-2 border-r border-slate-400 text-right">Realisasi {assessment.tahun_rencana - 1}</th>
            <th className="p-2 border-r border-slate-400 text-right">Proyeksi {assessment.tahun_rencana}</th>
            <th className="p-2 border-r border-slate-400 text-right">Proyeksi {assessment.tahun_rencana + 1}</th>
            <th className="p-2 border-r border-slate-400 text-right">Proyeksi {assessment.tahun_rencana + 2}</th>
            <th className="p-2 text-left">Asumsi Dasar</th>
          </tr>
        </thead>
        <tbody>
          {projections.map((p) => (
            <tr key={p.id} className="border-b border-slate-300">
              <td className="p-2 border-r border-slate-300 font-semibold">{p.pos_rekening}</td>
              <td className="p-2 border-r border-slate-300 text-right">{formatVal(p.realisasi_thn_lalu, p.kategori)}</td>
              <td className="p-2 border-r border-slate-300 text-right font-bold">{formatVal(p.proyeksi_thn_1, p.kategori)}</td>
              <td className="p-2 border-r border-slate-300 text-right">{formatVal(p.proyeksi_thn_2, p.kategori)}</td>
              <td className="p-2 border-r border-slate-300 text-right">{formatVal(p.proyeksi_thn_3, p.kategori)}</td>
              <td className="p-2 text-[11px] text-slate-600">{p.catatan_asumsi || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Signature Section */}
      <div className="grid grid-cols-3 gap-8 text-center text-xs mt-12 pt-4 border-t border-slate-300">
        <div>
          <p className="font-bold mb-16">Disusun Oleh (Inputter)</p>
          <p className="border-b border-slate-400 pb-1 font-semibold">{assessment.created_by}</p>
          <p className="text-[10px] text-slate-500">Staf Perencanaan RBB</p>
        </div>
        <div>
          <p className="font-bold mb-16">Ditinjau Oleh (Reviewer)</p>
          <p className="border-b border-slate-400 pb-1 font-semibold">{assessment.locked_by || "( ____________________ )"}</p>
          <p className="text-[10px] text-slate-500">Pejabat Eksekutif Kepatuhan</p>
        </div>
        <div>
          <p className="font-bold mb-16">Disetujui Oleh (Direksi)</p>
          <p className="border-b border-slate-400 pb-1 font-semibold">( ____________________ )</p>
          <p className="text-[10px] text-slate-500">Direktur Utama</p>
        </div>
      </div>
    </div>
  );
};

