"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ChevronRight,
  Copy,
  Edit2,
  FileCheck2,
  HelpCircle,
  History,
  Lock,
  Plus,
  Trash2,
  Unlock,
  User,
  ShieldCheck
} from "lucide-react";
import { DEFAULT_RBB_ASSESSMENTS } from "@/lib/sirenbisData";
import { RbbSelfAssessment, RbbJenis } from "@/lib/types";

export default function Sirenbis4DaftarPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("daftar");
  const [selectedYear, setSelectedYear] = useState<number | "ALL">("ALL");
  const [assessments, setAssessments] = useState<RbbSelfAssessment[]>(DEFAULT_RBB_ASSESSMENTS);

  const filteredAssessments = assessments.filter((item) => {
    if (selectedYear === "ALL") return true;
    return item.tahun_rencana === selectedYear;
  });

  const handleToggleLock = (id: string) => {
    setAssessments((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isCurrentlyLocked = Boolean(item.locked_at) || item.status_dokumen === "LOCKED";
          return {
            ...item,
            locked_at: isCurrentlyLocked ? null : new Date().toISOString(),
            locked_by: isCurrentlyLocked ? null : "OJK Pengawas Perbankan",
            status_dokumen: isCurrentlyLocked ? "DRAFT" : "LOCKED"
          };
        }
        return item;
      })
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus draf RBB ini?")) {
      setAssessments((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleDuplicate = (item: RbbSelfAssessment) => {
    const duplicated: RbbSelfAssessment = {
      ...item,
      id: `rbb-${Date.now().toString().slice(-6)}`,
      nama_skenario: `${item.nama_skenario || "Skenario"} (Copy)`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setAssessments([duplicated, ...assessments]);
  };

  const formatRupiah = (val?: number) => {
    if (!val) return "Rp0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* 1. Top Notice Bar Tagihan (Marun / Cokelat) */}
      <div className="bg-[#5c1d1d] text-amber-200 text-xs px-4 py-2 flex items-center justify-center space-x-2 border-b border-[#782424]">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>
          Terdapat 16 tagihan yang belum dibayar. Mohon segera lakukan pembayaran untuk menghindari kendala/disrupsi layanan.{" "}
          <Link href="/tagihan" className="underline font-bold text-white hover:text-amber-300">
            Lihat Daftar Tagihan & Pembayaran
          </Link>
        </span>
      </div>

      {/* 2. Subheader Navigasi Atas */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
          <Link href="/dashboard" className="text-slate-500 hover:text-emerald-700 flex items-center">
            &lt; SIRENBIS V4
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-900">Daftar Rencana Bisnis BPR</span>
        </div>

        {/* Info BPR & Profil Kanan */}
        <div className="flex items-center space-x-3 text-xs">
          <div className="hidden md:flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full text-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-bold">PT. BPR BKK BATANG (PERSERODA)</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-700">
            <div className="text-right hidden sm:block">
              <span className="block font-bold text-[11px] leading-tight text-slate-800">
                bkk_tpi_batang@yahoo.co.id
              </span>
              <span className="text-[10px] text-slate-400">Inputter</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
      </header>

      {/* 3. Tab Bar Horizontal */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center space-x-1 overflow-x-auto scrollbar-none text-xs">
        {[
          { id: "daftar", label: "Daftar RBB - SIRENBIS Versi 4" },
          { id: "industrial", label: "Dukungan Industrial Test - Konversi RBB Lama Tahun 2026" },
          { id: "whatsnew", label: "Apa yang baru di SIRENBIS versi 4?" },
          { id: "pks", label: "PKS SIRENBIS" },
          { id: "previous", label: "SIRENBIS Versi Sebelumnya" }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 font-semibold whitespace-nowrap border-b-2 transition ${
                isActive
                  ? "border-blue-600 text-blue-700 font-bold bg-blue-50/40"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* 4. Green Hero Banner */}
        <div className="relative rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white p-6 sm:p-8 mb-6 shadow-md overflow-hidden">
          {/* Subtle Watermark Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md text-[11px] font-bold bg-black/30 border border-white/20 text-emerald-200 mb-3">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>SIRENBIS Versi 4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1">
              Daftar Rencana Bisnis BPR (RBB)
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium">
              Sistem Informasi Rencana Bisnis BPR
            </p>
          </div>
        </div>

        {/* 5. Filter & Aksi Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-slate-900 mr-2">Daftar RBB</span>

            <button
              onClick={() => setSelectedYear("ALL")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition border ${
                selectedYear === "ALL"
                  ? "bg-emerald-700 text-white border-emerald-700 shadow-2xs"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              Semua Tahun
            </button>

            {[2027, 2026, 2025, 2024].map((year) => {
              const active = selectedYear === year;
              return (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition border ${
                    active
                      ? "bg-emerald-700 text-white border-emerald-700 shadow-2xs"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {year}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              const newPlan: RbbSelfAssessment = {
                id: `rbb-${Date.now().toString().slice(-6)}`,
                bpr_id: "601562",
                sandi_bpr: "601562",
                kota_kab: "Kab. Batang",
                bpr_name: "PT. BPR BKK BATANG (PERSERODA)",
                tahun_rencana: 2027,
                jenis_rbb: "RUTIN",
                status_dokumen: "DRAFT",
                modal_inti: 15160321590,
                seojk_reference: "SEOJK 24/2025 - APOLO Baru",
                nama_skenario: "RBB 2027 Rencana Baru",
                progress_total: 0,
                progress_persiapan: "Belum Lengkap",
                progress_proyeksi: "Belum Lengkap",
                progress_narasi: "Belum Lengkap",
                locked_at: null,
                locked_by: null,
                created_by: "bkk_tpi_batang@yahoo.co.id",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              };
              setAssessments([newPlan, ...assessments]);
            }}
            className="inline-flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-xs self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Buat RBB Baru</span>
          </button>
        </div>

        {/* 6. Grid Kartu RBB 2-Kolom (Screenshot 7) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-12">
          {filteredAssessments.map((item) => {
            const isLocked = Boolean(item.locked_at) || item.status_dokumen === "LOCKED";
            const progress = item.progress_total || 0;

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between overflow-hidden"
              >
                {/* Header Kartu */}
                <div className="p-5 pb-3">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">
                        RBB Tahun {item.tahun_rencana}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {item.bpr_name || "PT. BPR BKK BATANG (PERSERODA)"} · Sandi {item.sandi_bpr || "601562"} · {item.kota_kab || "Kab. Batang"}
                      </p>
                    </div>

                    {/* Badges Jenis & Versi */}
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {item.jenis_rbb === "RUTIN" ? "Rutin" : "Koreksi"}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-white">
                        Versi 4
                      </span>
                    </div>
                  </div>

                  {/* Info Modal Inti & Regulasi */}
                  <div className="text-xs text-slate-600 mb-3">
                    <span className="font-semibold">
                      Modal Inti <strong className="text-slate-900">{formatRupiah(item.modal_inti)}</strong>
                    </span>
                    <span className="text-slate-400 block text-[11px] mt-0.5">
                      {item.seojk_reference || "SEOJK 24/2025 - APOLO Baru"}
                    </span>
                  </div>

                  {/* Box Skenario / Deskripsi */}
                  <div className="bg-slate-50 rounded-lg border border-slate-200/80 px-3 py-2 text-xs font-medium text-slate-700 mb-4">
                    {item.nama_skenario || "Draf Simulasi RBB"}
                  </div>

                  {/* Progress Bar & Sub-indicators */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-slate-700">Progress</span>
                      <span className="font-extrabold text-slate-900">{progress}%</span>
                    </div>

                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-2.5">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          progress === 100
                            ? "bg-emerald-600"
                            : progress >= 50
                            ? "bg-blue-600"
                            : progress > 10
                            ? "bg-amber-500"
                            : "bg-slate-400"
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {/* Sub progress pills A, B, C */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span
                        className={`px-2 py-0.5 rounded-md font-semibold ${
                          item.progress_persiapan === "Lengkap"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {item.progress_persiapan === "Lengkap" ? "✓" : "▲"} A. Persiapan
                      </span>

                      <span
                        className={`px-2 py-0.5 rounded-md font-semibold ${
                          item.progress_proyeksi === "Lengkap"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {item.progress_proyeksi === "Lengkap" ? "✓" : "▲"} B. Proyeksi
                      </span>

                      <span
                        className={`px-2 py-0.5 rounded-md font-semibold ${
                          item.progress_narasi === "Lengkap"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {item.progress_narasi === "Lengkap" ? "✓" : "▲"} C. Narasi & Laporan
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Aksi */}
                <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                  {/* Left Action Icons */}
                  <div className="flex items-center space-x-2 text-slate-500">
                    <button
                      onClick={() => handleToggleLock(item.id)}
                      title={isLocked ? "Buka Kunci Dokumen" : "Kunci Dokumen"}
                      className={`p-1.5 rounded-lg border transition ${
                        isLocked
                          ? "bg-purple-100 text-purple-700 border-purple-300"
                          : "hover:bg-slate-200 text-slate-600 border-transparent hover:border-slate-300"
                      }`}
                    >
                      {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => {
                        const newName = prompt("Ubah Nama Skenario:", item.nama_skenario);
                        if (newName) {
                          setAssessments(
                            assessments.map((a) => (a.id === item.id ? { ...a, nama_skenario: newName } : a))
                          );
                        }
                      }}
                      title="Edit Skenario"
                      className="p-1.5 hover:bg-slate-200 text-slate-600 rounded-lg border border-transparent hover:border-slate-300 transition"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDuplicate(item)}
                      title="Duplikasi Dokumen"
                      className="p-1.5 hover:bg-slate-200 text-slate-600 rounded-lg border border-transparent hover:border-slate-300 transition"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      title="Hapus Dokumen"
                      className="p-1.5 hover:bg-rose-100 text-rose-600 rounded-lg border border-transparent hover:border-rose-200 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Tombol Utama Hijau: Buka SIRENBIS Versi 4 */}
                  <button
                    onClick={() => router.push(`/rencana-bisnis-baru/sirenbis4/workspace?planId=${item.id}&section=B`)}
                    className="inline-flex items-center space-x-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-2xs hover:shadow-xs active:scale-98"
                  >
                    <span>Buka SIRENBIS Versi 4</span>
                    <span className="text-emerald-300">→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        <p>© 2026 BPR Go Digital — Creva Business Consulting. Terintegrasi Supabase.</p>
      </footer>
    </div>
  );
}
