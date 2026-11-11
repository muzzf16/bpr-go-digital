"use strict";
import React from "react";
import { Filter, Plus, Printer, RefreshCw } from "lucide-react";
import { RbbJenis, RbbStatus } from "@/lib/types";

interface RbbFilterBarProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  selectedJenis: "ALL" | RbbJenis;
  onJenisChange: (jenis: "ALL" | RbbJenis) => void;
  selectedStatus: "ALL" | RbbStatus;
  onStatusChange: (status: "ALL" | RbbStatus) => void;
  onOpenCreateModal: () => void;
  onRefresh: () => void;
  onPrintModeToggle: () => void;
  isPrintMode: boolean;
}

export const RbbFilterBar: React.FC<RbbFilterBarProps> = ({
  selectedYear,
  onYearChange,
  selectedJenis,
  onJenisChange,
  selectedStatus,
  onStatusChange,
  onOpenCreateModal,
  onRefresh,
  onPrintModeToggle,
  isPrintMode
}) => {
  const years = [2027, 2026, 2025, 2024];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 mb-6 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
      {/* Filters Left */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 uppercase tracking-wide mr-1">
          <Filter className="w-4 h-4 text-slate-400" />
          <span>Filter:</span>
        </div>

        {/* Jenis RBB Tabs */}
        <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200/60">
          {(
            [
              { id: "ALL", label: "Semua RBB" },
              { id: "RUTIN", label: "Rutin" },
              { id: "KOREKSI", label: "Koreksi" }
            ] as const
          ).map((t) => {
            const active = selectedJenis === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onJenisChange(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  active
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tahun Selector */}
        <div className="flex items-center space-x-1.5">
          <span className="text-xs text-slate-500 font-medium">Tahun:</span>
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-2xs cursor-pointer"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                Tahun {y}
              </option>
            ))}
          </select>
        </div>

        {/* Status Dokumen Selector */}
        <div className="flex items-center space-x-1.5">
          <span className="text-xs text-slate-500 font-medium">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value as any)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-2xs cursor-pointer"
          >
            <option value="ALL">Semua Status</option>
            <option value="DRAFT">Draft</option>
            <option value="SUBMITTED">Diajukan (Submitted)</option>
            <option value="LOCKED">Dikunci (Locked)</option>
            <option value="APPROVED">Disetujui (Approved)</option>
          </select>
        </div>
      </div>

      {/* Action Buttons Right */}
      <div className="flex items-center space-x-2.5">
        <button
          onClick={onRefresh}
          title="Segarkan Data"
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl border border-slate-200/80 transition"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        <button
          onClick={onPrintModeToggle}
          className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
            isPrintMode
              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
              : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
          }`}
        >
          <Printer className="w-4 h-4" />
          <span>{isPrintMode ? "Mode Layar" : "Cetak Tren"}</span>
        </button>

        <button
          onClick={onOpenCreateModal}
          className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm shadow-blue-500/20 active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Dokumen RBB</span>
        </button>
      </div>
    </div>
  );
};

