"use strict";
import React from "react";
import { CheckCircle2, Clock, Edit3, Eye, FileSpreadsheet, Lock, Trash2, Unlock } from "lucide-react";
import { RbbSelfAssessment, RbbStatus } from "@/lib/types";

interface RbbTableListProps {
  assessments: RbbSelfAssessment[];
  selectedId: string | null;
  onSelect: (assessment: RbbSelfAssessment) => void;
  onToggleLock: (id: string, currentlyLocked: boolean) => void;
  onDelete?: (id: string) => void;
}

export const RbbTableList: React.FC<RbbTableListProps> = ({
  assessments,
  selectedId,
  onSelect,
  onToggleLock,
  onDelete
}) => {
  const renderStatusBadge = (status: RbbStatus) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Disetujui (Approved)</span>
          </span>
        );
      case "LOCKED":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <Lock className="w-3 h-3 text-amber-700" />
            <span>Terkunci (Locked)</span>
          </span>
        );
      case "SUBMITTED":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <Clock className="w-3 h-3 text-blue-600" />
            <span>Diajukan (Submitted)</span>
          </span>
        );
      case "DRAFT":
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <Edit3 className="w-3 h-3 text-slate-500" />
            <span>Draft</span>
          </span>
        );
    }
  };

  if (assessments.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
        <FileSpreadsheet className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-base font-extrabold text-slate-800">
          Belum Ada Dokumen RBB pada Kriteria Ini
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          Silakan buat dokumen RBB baru menggunakan tombol &quot;Buat Dokumen RBB&quot; di atas atau sesuaikan filter jenis/tahun.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs mb-8">
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
            Daftar Dokumen RBB Terdaftar
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pilih dokumen untuk melihat dan menyunting kertas kerja proyeksi tren keuangan
          </p>
        </div>
        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/80">
          {assessments.length} Dokumen
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200/70 text-[11px] uppercase tracking-wider text-slate-500 font-extrabold">
              <th className="py-3 px-4">Jenis Dokumen</th>
              <th className="py-3 px-4">Tahun Rencana</th>
              <th className="py-3 px-4">Status OJK</th>
              <th className="py-3 px-4">Status Kunci</th>
              <th className="py-3 px-4">Terakhir Diperbarui</th>
              <th className="py-3 px-4 text-right">Aksi Kertas Kerja</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {assessments.map((item) => {
              const isSelected = selectedId === item.id;
              const isLocked = item.status_dokumen === "LOCKED" || Boolean(item.locked_at);
              const isRutin = item.jenis_rbb === "RUTIN";

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className={`cursor-pointer transition-colors duration-150 ${
                    isSelected
                      ? "bg-blue-50/60 font-semibold"
                      : "hover:bg-slate-50/80"
                  }`}
                >
                  {/* Jenis RBB with Blink Class Indicator */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full rbb-highlight-blink ${
                          isRutin ? "rbb-blink-rutin bg-emerald-600" : "rbb-blink-koreksi bg-orange-500"
                        }`}
                      />
                      <span
                        className={`font-extrabold text-xs px-2 py-0.5 rounded-md ${
                          isRutin
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-orange-50 text-orange-800 border border-orange-200"
                        }`}
                      >
                        RBB {item.jenis_rbb}
                      </span>
                    </div>
                  </td>

                  {/* Tahun Rencana */}
                  <td className="py-3.5 px-4 font-black text-slate-800 text-sm">
                    {item.tahun_rencana}
                  </td>

                  {/* Status Dokumen */}
                  <td className="py-3.5 px-4">{renderStatusBadge(item.status_dokumen)}</td>

                  {/* Status Kunci */}
                  <td className="py-3.5 px-4">
                    {isLocked ? (
                      <span className="inline-flex items-center space-x-1 text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <Lock className="w-3 h-3 text-amber-700" />
                        <span>Oleh: {item.locked_by || "Reviewer"}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-slate-400 font-medium">
                        <Unlock className="w-3 h-3" />
                        <span>Terbuka (Editable)</span>
                      </span>
                    )}
                  </td>

                  {/* Tanggal Update */}
                  <td className="py-3.5 px-4 text-slate-500">
                    {new Date(item.updated_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    })}
                  </td>

                  {/* Aksi */}
                  <td className="py-3.5 px-4 text-right">
                    <div
                      className="inline-flex items-center space-x-1.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => onSelect(item)}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Buka Kertas Kerja</span>
                      </button>

                      <button
                        onClick={() => onToggleLock(item.id, isLocked)}
                        title={isLocked ? "Buka Kunci Dokumen" : "Kunci Dokumen (Lock Guard)"}
                        className={`p-1.5 rounded-lg border transition ${
                          isLocked
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-300"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200"
                        }`}
                      >
                        {isLocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                      </button>

                      {onDelete && (
                        <button
                          onClick={() => onDelete(item.id)}
                          title="Hapus Dokumen"
                          className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

