"use strict";
import React, { useState } from "react";
import { Calendar, FilePlus2, X } from "lucide-react";
import { RbbJenis } from "@/lib/types";

interface RbbCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: { tahun_rencana: number; jenis_rbb: RbbJenis }) => Promise<void>;
  defaultYear: number;
}

export const RbbCreateModal: React.FC<RbbCreateModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  defaultYear
}) => {
  const [tahun, setTahun] = useState<number>(defaultYear);
  const [jenis, setJenis] = useState<RbbJenis>("RUTIN");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onCreate({ tahun_rencana: tahun, jenis_rbb: jenis });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <FilePlus2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Buat Dokumen RBB Baru
              </h2>
              <p className="text-xs text-slate-500">
                Inisiasi rencana bisnis baru (SEOJK RBB BPR)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tahun Periode Rencana
            </label>
            <div className="relative">
              <select
                value={tahun}
                onChange={(e) => setTahun(Number(e.target.value))}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-2xs"
              >
                {[2027, 2026, 2025, 2024].map((y) => (
                  <option key={y} value={y}>
                    Tahun {y}
                  </option>
                ))}
              </select>
              <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Jenis Dokumen RBB
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex flex-col p-3 rounded-xl border-2 cursor-pointer transition ${
                  jenis === "RUTIN"
                    ? "border-emerald-500 bg-emerald-50/50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="jenis_rbb"
                  value="RUTIN"
                  checked={jenis === "RUTIN"}
                  onChange={() => setJenis("RUTIN")}
                  className="sr-only"
                />
                <span className="text-xs font-extrabold text-emerald-800">
                  RBB Rutin
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  Rencana tahunan pokok
                </span>
              </label>

              <label
                className={`flex flex-col p-3 rounded-xl border-2 cursor-pointer transition ${
                  jenis === "KOREKSI"
                    ? "border-orange-500 bg-orange-50/50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="jenis_rbb"
                  value="KOREKSI"
                  checked={jenis === "KOREKSI"}
                  onChange={() => setJenis("KOREKSI")}
                  className="sr-only"
                />
                <span className="text-xs font-extrabold text-orange-800">
                  RBB Koreksi
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  Perubahan di tengah tahun
                </span>
              </label>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-500">
            Kertas kerja pos neraca, laba rugi, dan rasio keuangan standar SEOJK RBB akan otomatis disiapkan untuk dokumen ini.
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm shadow-blue-500/20"
            >
              {isSubmitting ? "Menyimpan..." : "Buat Dokumen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

