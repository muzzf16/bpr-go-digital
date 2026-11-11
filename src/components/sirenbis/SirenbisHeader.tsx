"use strict";
import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Building2, Calendar, FileText } from "lucide-react";
import { UserProfile } from "@/lib/types";

interface SirenbisHeaderProps {
  user: UserProfile | null;
  selectedYear: number;
  totalAssessments: number;
}

export const SirenbisHeader: React.FC<SirenbisHeaderProps> = ({
  user,
  selectedYear,
  totalAssessments
}) => {
  return (
    <div className="mb-8">
      {/* Breadcrumb & Navigation Back */}
      <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 mb-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center space-x-1 text-slate-500 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Dashboard Utama</span>
        </Link>
        <span>/</span>
        <span className="text-slate-400">Rencana Bisnis</span>
        <span>/</span>
        <span className="text-blue-600 font-bold">SIRENBIS 4</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden">
        {/* Ambient decorative blur */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-blue-200 border border-white/20 backdrop-blur-xs">
              <BookOpen className="w-3.5 h-3.5 text-blue-300" />
              <span>Modul RBB Terpadu</span>
            </span>

            {/* Versi 4 (Terbaru) Badge with Pulse */}
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>Versi 4 (Terbaru)</span>
            </span>

            <span className="inline-flex items-center space-x-1 text-xs text-slate-300 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
              <Building2 className="w-3 h-3 text-slate-400" />
              <span>{user?.bpr?.name || "PT BPR Bapera Batang"}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            SIRENBIS 4 — Daftar RBB & Kertas Kerja Proyeksi
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Sistem Informasi Penyusunan, Penelaahan, dan Proyeksi Rencana Bisnis Bank (RBB) tahunan sesuai regulasi Otoritas Jasa Keuangan (SEOJK RBB BPR).
          </p>
        </div>

        {/* Quick Stats Block */}
        <div className="relative z-10 flex sm:flex-col items-end justify-between sm:justify-center gap-2 bg-white/10 border border-white/15 p-4 rounded-xl backdrop-blur-md min-w-[180px]">
          <div className="text-left sm:text-right">
            <span className="text-[11px] uppercase tracking-wider text-blue-200 font-semibold block">
              Tahun Dokumen
            </span>
            <span className="text-xl sm:text-2xl font-black text-white flex items-center gap-1 sm:justify-end">
              <Calendar className="w-5 h-5 text-blue-300" />
              {selectedYear}
            </span>
          </div>
          <div className="text-right border-l sm:border-l-0 sm:border-t border-white/15 pl-4 sm:pl-0 sm:pt-2 w-full">
            <span className="text-[11px] text-slate-300 font-medium block">
              Total RBB Aktif: <strong className="text-emerald-400">{totalAssessments} Dokumen</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

