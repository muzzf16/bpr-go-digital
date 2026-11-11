"use strict";
import React, { useState } from "react";
import { Check, Edit2, FileText, Lock, Plus, Save, TrendingUp } from "lucide-react";
import { RbbSelfAssessment, RbbTrendProjection } from "@/lib/types";

interface RbbTrendProjectionTableProps {
  assessment: RbbSelfAssessment;
  projections: RbbTrendProjection[];
  onSaveProjection: (updatedProjections: RbbTrendProjection[]) => Promise<void>;
  isLocked: boolean;
}

export const RbbTrendProjectionTable: React.FC<RbbTrendProjectionTableProps> = ({
  assessment,
  projections,
  onSaveProjection,
  isLocked
}) => {
  const [data, setData] = useState<RbbTrendProjection[]>(projections);
  const [activeCategory, setActiveCategory] = useState<"ALL" | "NERACA" | "LABA_RUGI" | "RASIO">("ALL");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Sync state if prop changes
  React.useEffect(() => {
    setData(projections);
  }, [projections]);

  const filteredData = activeCategory === "ALL"
    ? data
    : data.filter((p) => p.kategori === activeCategory);

  const handleCellChange = (
    id: string,
    field: "realisasi_thn_lalu" | "proyeksi_thn_1" | "proyeksi_thn_2" | "proyeksi_thn_3" | "catatan_asumsi",
    value: string
  ) => {
    setData((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (field === "catatan_asumsi") {
            return { ...item, [field]: value };
          }
          const num = parseFloat(value) || 0;
          return { ...item, [field]: num };
        }
        return item;
      })
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveProjection(data);
      setIsEditing(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const formatNumber = (val: number, kategori: string) => {
    if (kategori === "RASIO") {
      return `${val.toFixed(2)}%`;
    }
    return new Intl.NumberFormat("id-ID").format(val);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
      {/* Top Banner Header */}
      <div className="p-5 border-b border-slate-200/80 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Kertas Kerja Proyeksi Tren Keuangan — {assessment.jenis_rbb} ({assessment.tahun_rencana})
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Posisi realisasi tahun {assessment.tahun_rencana - 1} dan estimasi proyeksi tahun {assessment.tahun_rencana} s.d. {assessment.tahun_rencana + 2} (Nilai Neraca/LR dalam jutaan Rp, Rasio dalam %)
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {savedSuccess && (
            <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-xl animate-in fade-in duration-200">
              <Check className="w-3.5 h-3.5" />
              <span>Tersimpan!</span>
            </span>
          )}

          {isLocked ? (
            <span className="inline-flex items-center space-x-1.5 text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1.5 rounded-xl border border-amber-300">
              <Lock className="w-3.5 h-3.5" />
              <span>Terkunci (Mode Baca)</span>
            </span>
          ) : isEditing ? (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? "Menyimpan..." : "Simpan Perubahan"}</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Sunting Matriks</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-5 pt-3 border-b border-slate-100 flex items-center space-x-2 overflow-x-auto">
        {(
          [
            { id: "ALL", label: "Semua Pos (Ringkasan Lengkap)" },
            { id: "NERACA", label: "Pos Neraca" },
            { id: "LABA_RUGI", label: "Pos Laba Rugi" },
            { id: "RASIO", label: "Rasio Keuangan & Tingkat Kesehatan" }
          ] as const
        ).map((tab) => {
          const active = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition whitespace-nowrap ${
                active
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-extrabold border-b border-slate-200">
              <th className="py-3 px-4 w-1/4">Pos Rekening / Akun RBB</th>
              <th className="py-3 px-3 text-right">
                Realisasi {assessment.tahun_rencana - 1}
              </th>
              <th className="py-3 px-3 text-right text-blue-700 bg-blue-50/50">
                Proyeksi {assessment.tahun_rencana} (Thn 1)
              </th>
              <th className="py-3 px-3 text-right">
                Proyeksi {assessment.tahun_rencana + 1} (Thn 2)
              </th>
              <th className="py-3 px-3 text-right">
                Proyeksi {assessment.tahun_rencana + 2} (Thn 3)
              </th>
              <th className="py-3 px-4 w-1/4">Catatan Asumsi & Justifikasi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredData.map((row) => {
              const isRasio = row.kategori === "RASIO";
              const deltaThn1 = row.realisasi_thn_lalu > 0
                ? ((row.proyeksi_thn_1 - row.realisasi_thn_lalu) / row.realisasi_thn_lalu) * 100
                : 0;

              return (
                <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* Pos Rekening */}
                  <td className="py-3 px-4 font-bold text-slate-800">
                    <div className="flex flex-col">
                      <span>{row.pos_rekening}</span>
                      <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                        {row.kategori}
                      </span>
                    </div>
                  </td>

                  {/* Realisasi N-1 */}
                  <td className="py-3 px-3 text-right font-medium text-slate-600">
                    {isEditing ? (
                      <input
                        type="number"
                        step={isRasio ? "0.01" : "1"}
                        value={row.realisasi_thn_lalu}
                        onChange={(e) =>
                          handleCellChange(row.id, "realisasi_thn_lalu", e.target.value)
                        }
                        className="w-24 text-right border border-slate-200 rounded px-1.5 py-1 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      formatNumber(row.realisasi_thn_lalu, row.kategori)
                    )}
                  </td>

                  {/* Proyeksi N+1 (Highlight) */}
                  <td className="py-3 px-3 text-right font-extrabold text-blue-900 bg-blue-50/40">
                    {isEditing ? (
                      <input
                        type="number"
                        step={isRasio ? "0.01" : "1"}
                        value={row.proyeksi_thn_1}
                        onChange={(e) =>
                          handleCellChange(row.id, "proyeksi_thn_1", e.target.value)
                        }
                        className="w-24 text-right border-2 border-blue-400 rounded px-1.5 py-1 text-xs font-bold text-blue-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                      />
                    ) : (
                      <div className="flex flex-col items-end">
                        <span>{formatNumber(row.proyeksi_thn_1, row.kategori)}</span>
                        {!isRasio && deltaThn1 !== 0 && (
                          <span
                            className={`text-[9px] font-bold ${
                              deltaThn1 >= 0 ? "text-emerald-600" : "text-rose-600"
                            }`}
                          >
                            {deltaThn1 >= 0 ? `+${deltaThn1.toFixed(1)}%` : `${deltaThn1.toFixed(1)}%`}
                          </span>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Proyeksi N+2 */}
                  <td className="py-3 px-3 text-right font-semibold text-slate-700">
                    {isEditing ? (
                      <input
                        type="number"
                        step={isRasio ? "0.01" : "1"}
                        value={row.proyeksi_thn_2}
                        onChange={(e) =>
                          handleCellChange(row.id, "proyeksi_thn_2", e.target.value)
                        }
                        className="w-24 text-right border border-slate-200 rounded px-1.5 py-1 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      formatNumber(row.proyeksi_thn_2, row.kategori)
                    )}
                  </td>

                  {/* Proyeksi N+3 */}
                  <td className="py-3 px-3 text-right font-semibold text-slate-700">
                    {isEditing ? (
                      <input
                        type="number"
                        step={isRasio ? "0.01" : "1"}
                        value={row.proyeksi_thn_3}
                        onChange={(e) =>
                          handleCellChange(row.id, "proyeksi_thn_3", e.target.value)
                        }
                        className="w-24 text-right border border-slate-200 rounded px-1.5 py-1 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      formatNumber(row.proyeksi_thn_3, row.kategori)
                    )}
                  </td>

                  {/* Asumsi */}
                  <td className="py-3 px-4 text-slate-500">
                    {isEditing ? (
                      <textarea
                        rows={2}
                        value={row.catatan_asumsi || ""}
                        onChange={(e) =>
                          handleCellChange(row.id, "catatan_asumsi", e.target.value)
                        }
                        className="w-full border border-slate-200 rounded-lg p-1.5 text-xs text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                        placeholder="Tuliskan asumsi pertimbangan..."
                      />
                    ) : (
                      <span className="text-xs text-slate-500 italic">
                        {row.catatan_asumsi || "-"}
                      </span>
                    )}
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

