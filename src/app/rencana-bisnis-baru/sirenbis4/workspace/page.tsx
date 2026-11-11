"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileSpreadsheet,
  FileText,
  Printer,
  Search,
  Send,
  ShieldCheck,
  TrendingUp,
  User,
  Sliders,
  AlertCircle,
  Download,
  FileCheck,
  RotateCcw,
  Eye,
  RefreshCw
} from "lucide-react";
import { WORKSPACE_METRICS } from "@/lib/sirenbisData";
import { APOLO_RBB_FORMS } from "@/lib/apoloForms";
import { generateAllApoloFiles, ApoloExportMetadata } from "@/lib/apoloExport";

function WorkspaceContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId") || "5b2dd23b-8361-4402-b599-96e9a2166f0d";
  const initialSection = searchParams.get("section") || "B";

  const [activeSection, setActiveSection] = useState<string>(initialSection);
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [showRecalculateToast, setShowRecalculateToast] = useState<boolean>(false);

  // Metadata BPR sesuai Screenshot 7
  const rbbMeta: ApoloExportMetadata = {
    kodeLaporan: "RBBPRK27",
    tipePenyampaian: "Rutin",
    periodeData: "20271231",
    sandiLjk: "601562",
    kodeJenisUsaha: "01"
  };

  const apoloFiles = generateAllApoloFiles(rbbMeta);

  // Sparkline Component
  const Sparkline = ({ points, color = "#2563eb" }: { points: number[]; color?: string }) => {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 120;
    const height = 28;

    const coords = points
      .map((val, idx) => {
        const x = (idx / (points.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <svg width={width} height={height} className="overflow-visible inline-block">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={coords}
        />
      </svg>
    );
  };

  const handleProyeksiUlang = () => {
    setShowRecalculateToast(true);
    setTimeout(() => setShowRecalculateToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* 1. Top Notice Bar (Creva / SIRENBIS 4) */}
      <div className="bg-[#5c1d1d] text-amber-200 text-xs px-4 py-1.5 flex items-center justify-center space-x-2 border-b border-[#782424]">
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
          <Link href="/rencana-bisnis-baru/sirenbis4" className="text-slate-500 hover:text-emerald-700 flex items-center">
            &gt; SIRENBIS V4
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-600">RBB 2027 (Rutin)</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-900">
            {activeSection === "A" && "A. Persiapan"}
            {activeSection === "B" && (activeSubSection ? `B. Proyeksi > ${activeSubSection}` : "B. Proyeksi Keuangan dan Rasio")}
            {activeSection === "C" && "C. Narasi & Laporan Manajemen (Form APOLO)"}
            {activeSection === "D" && (activeSubSection ? `D. Pengiriman APOLO > ${activeSubSection}` : "D. Pengiriman Laporan APOLO")}
          </span>
        </div>

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

      {/* 3. Sub-Navbar Status RBB */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-slate-500 font-medium">
          <Link href="/rencana-bisnis-baru/sirenbis4" className="hover:text-blue-600">Daftar RBB</Link>
          <span>&gt;</span>
          <span className="font-bold text-slate-700">RBB 2027</span>
          <span>&gt;</span>
          <span className="text-slate-600">
            {activeSection === "A" && "A Persiapan"}
            {activeSection === "B" && "B Proyeksi Keuangan dan Rasio"}
            {activeSection === "C" && "C Narasi & Laporan Manajemen"}
            {activeSection === "D" && "D Pengiriman Laporan APOLO"}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Rutin
          </span>
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-white border border-slate-300 text-slate-700">
            Mode RBB Lengkap ▾
          </span>
          <span className="text-slate-600">Tahun RBB: <strong className="text-slate-900">2027</strong></span>
          <span className="text-slate-600">Modal Inti: <strong className="text-slate-900">Rp11,54 M</strong></span>
          <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tersimpan</span>
          </span>
        </div>
      </div>

      {/* Toast Notifikasi Proyeksi Ulang */}
      {showRecalculateToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-800 text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center space-x-2 text-xs">
          <RefreshCw className="w-4 h-4 animate-spin text-emerald-300" />
          <span>Proyeksi Ulang Tahun RBB 2027 berhasil disinkronkan ke seluruh form APOLO!</span>
        </div>
      )}

      {/* Main 2-Column Workspace */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar (MENU DAN PROGRESS) */}
        <aside className="w-full lg:w-72 shrink-0 bg-white border border-slate-200 rounded-xl p-4 shadow-2xs self-start">
          {/* Search Input */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Cari form isian, akun, atau form AP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          {/* Progress Header */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1 font-bold">
              <span className="text-slate-600 uppercase text-[10px] tracking-wider">MENU DAN PROGRESS</span>
              <span className="text-emerald-700">100% &gt;</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full w-full" />
            </div>
          </div>

          {/* Navigation Accordion Sections */}
          <nav className="space-y-1.5 text-xs font-semibold text-slate-700">
            {/* Section A */}
            <div>
              <button
                onClick={() => {
                  setActiveSection("A");
                  setActiveSubSection(null);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                  activeSection === "A" ? "bg-emerald-800 text-white font-bold" : "hover:bg-slate-100"
                }`}
              >
                <span>&gt; A. Persiapan</span>
                <span className="text-emerald-400">✓</span>
              </button>
              {activeSection === "A" && (
                <div className="pl-4 py-1.5 space-y-1 text-[11px] text-slate-600 border-l border-slate-200 ml-3 mt-1">
                  <div onClick={() => setActiveSubSection("A1")} className="hover:text-blue-600 cursor-pointer">A1. Informasi BPR</div>
                  <div onClick={() => setActiveSubSection("A2")} className="hover:text-blue-600 cursor-pointer">A2. Data Historis Laporan Bulanan</div>
                  <div onClick={() => setActiveSubSection("A3")} className="hover:text-blue-600 cursor-pointer">A3. Proyeksi dan Penyesuaian Akhir Tahun 2026 (X-1)</div>
                  <div onClick={() => setActiveSubSection("A4")} className="hover:text-blue-600 cursor-pointer">A4. Tren Data Historis Hingga Akhir Tahun 2026 (X-1)</div>
                </div>
              )}
            </div>

            {/* Section B */}
            <div>
              <button
                onClick={() => {
                  setActiveSection("B");
                  setActiveSubSection(null);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                  activeSection === "B" ? "bg-emerald-800 text-white font-bold" : "hover:bg-slate-100"
                }`}
              >
                <span>&gt; B. Proyeksi Keuangan dan Rasio</span>
                <span className="text-emerald-400">✓</span>
              </button>
              {activeSection === "B" && (
                <div className="pl-4 py-1.5 space-y-1 text-[11px] text-slate-600 border-l border-slate-200 ml-3 mt-1">
                  <div
                    onClick={() => setActiveSubSection("B1")}
                    className={`cursor-pointer ${activeSubSection === "B1" ? "font-bold text-blue-700" : "hover:text-blue-600"}`}
                  >
                    B1. Proyeksi Umum dan Penetapan Target
                  </div>
                  <div
                    onClick={() => setActiveSubSection("B2")}
                    className={`cursor-pointer ${activeSubSection === "B2" ? "font-bold text-blue-700" : "hover:text-blue-600"}`}
                  >
                    B2. Proyeksi Laporan Keuangan dan Rasio
                  </div>
                  <div onClick={() => setActiveSubSection("B3")} className="hover:text-blue-600 cursor-pointer">B3. Proyeksi Lebih Rinci (OPSIONAL)</div>
                  <div onClick={() => setActiveSubSection("B4")} className="hover:text-blue-600 cursor-pointer">B4. Tren Rencana Bisnis Hingga Akhir Tahun 2027 (X)</div>
                  <div onClick={() => setActiveSubSection("B5")} className="hover:text-blue-600 cursor-pointer">B5. Proyeksi Per Kantor (OPSIONAL)</div>
                </div>
              )}
            </div>

            {/* Section C */}
            <div>
              <button
                onClick={() => {
                  setActiveSection("C");
                  setActiveSubSection(null);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                  activeSection === "C" ? "bg-emerald-800 text-white font-bold" : "hover:bg-slate-100"
                }`}
              >
                <span>&gt; C. Narasi & Laporan Manajemen (Form APOLO)</span>
                <span className="text-emerald-400">✓</span>
              </button>
              {activeSection === "C" && (
                <div className="pl-4 py-1.5 space-y-1 text-[11px] text-slate-600 border-l border-slate-200 ml-3 mt-1">
                  <div onClick={() => setActiveSubSection("C1")} className="hover:text-blue-600 cursor-pointer">C1. Ringkasan Eksekutif (0100)</div>
                  <div onClick={() => setActiveSubSection("C2")} className="hover:text-blue-600 cursor-pointer">C2. Strategi Bisnis dan Kebijakan (0200)</div>
                  <div onClick={() => setActiveSubSection("C3")} className="hover:text-blue-600 cursor-pointer">C3. Proyeksi Laporan & Target Rasio (0310-0400)</div>
                  <div onClick={() => setActiveSubSection("C4")} className="hover:text-blue-600 cursor-pointer">C4. Rencana Penghimpunan Dana (0500)</div>
                  <div onClick={() => setActiveSubSection("C5")} className="hover:text-blue-600 cursor-pointer">C5. Rencana Penyaluran Dana (0610-0630)</div>
                  <div onClick={() => setActiveSubSection("C6")} className="hover:text-blue-600 cursor-pointer">C6. Rencana Permodalan (0700)</div>
                  <div onClick={() => setActiveSubSection("C7")} className="hover:text-blue-600 cursor-pointer">C7. Rencana SDM dan Teknologi (0810-0823)</div>
                  <div onClick={() => setActiveSubSection("C8")} className="hover:text-blue-600 cursor-pointer">C8. Rencana Kegiatan Usaha (0900-0920)</div>
                  <div onClick={() => setActiveSubSection("C9")} className="hover:text-blue-600 cursor-pointer">C9. Rencana Jaringan Kantor (1000)</div>
                  <div onClick={() => setActiveSubSection("C10")} className="hover:text-blue-600 cursor-pointer">C10. Informasi Lainnya (9900)</div>
                  <div onClick={() => setActiveSubSection("C11")} className="hover:text-blue-600 cursor-pointer">C11. Persetujuan Dewan Komisaris (9901)</div>
                </div>
              )}
            </div>

            {/* Section D */}
            <div>
              <button
                onClick={() => {
                  setActiveSection("D");
                  setActiveSubSection(null);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                  activeSection === "D" ? "bg-emerald-800 text-white font-bold" : "hover:bg-slate-100"
                }`}
              >
                <span>&gt; D. Pengiriman Laporan APOLO</span>
                <span className="text-emerald-400">✓</span>
              </button>
              {activeSection === "D" && (
                <div className="pl-4 py-1.5 space-y-1 text-[11px] text-slate-600 border-l border-slate-200 ml-3 mt-1">
                  <div onClick={() => setActiveSubSection("D1")} className="hover:text-blue-600 cursor-pointer">D1. Tinjau Ringkasan Keuangan dan Laporan</div>
                  <div onClick={() => setActiveSubSection("D2")} className="hover:text-blue-600 cursor-pointer">D2. Cetak Output Laporan RBB</div>
                  <div
                    onClick={() => setActiveSubSection("D3")}
                    className={`cursor-pointer ${activeSubSection === "D3" ? "font-bold text-blue-700" : "hover:text-blue-600"}`}
                  >
                    D3. Bentuk File Kirim APOLO
                  </div>
                </div>
              )}
            </div>
          </nav>
        </aside>

        {/* Right Main Content */}
        <main className="flex-1 space-y-6">
          {/* Section Banner Header */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                  {activeSection}
                </span>
                <h2 className="text-base font-extrabold text-slate-900">
                  {activeSection === "A" && "Persiapan"}
                  {activeSection === "B" && (activeSubSection ? `Proyeksi Keuangan: ${activeSubSection}` : "Proyeksi Keuangan dan Rasio")}
                  {activeSection === "C" && "Narasi & Laporan Manajemen (Form APOLO)"}
                  {activeSection === "D" && (activeSubSection ? `Pengiriman Laporan APOLO: ${activeSubSection}` : "Pengiriman Laporan APOLO")}
                </h2>
                <span className="inline-flex items-center space-x-1 text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span>✓</span>
                  <span>Lengkap</span>
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              {activeSection === "A" && "Data historis sampai akhir tahun 2026 (X-1)."}
              {activeSection === "B" && "Proyeksi tahun 2027 (X), 2028 (X+1), dan 2029 (X+2)."}
              {activeSection === "C" && "Narasi, laporan manajemen, persetujuan Dewan Komisaris sesuai template makro OJK RBBPRK27."}
              {activeSection === "D" && "Tinjau, cetak, dan generate file kirim APOLO OJK (.txt dan .pdf)."}
            </p>
          </div>

          {/* VIEW: SECTION B - SUBSECTION B1 (Persis Screenshot 5) */}
          {activeSection === "B" && activeSubSection === "B1" && (
            <div className="space-y-6">
              {/* Step 1: Tetapkan Target Akun Utama */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                    <h3 className="text-sm font-extrabold text-slate-900">Tetapkan Target Akun Utama dan Jalankan Proyeksi Ulang</h3>
                  </div>
                  <button
                    onClick={handleProyeksiUlang}
                    className="flex items-center space-x-1.5 bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-purple-600" />
                    <span>Proyeksi Ulang Tahun RBB</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { title: "Kredit yang Diberikan", subtitle: "Suku bunga efektif kredit lancar 2027 (X): 24,59%", icon: "💳" },
                    { title: "NPL, CKPN, dan Hapus Buku", subtitle: "NPL gross 2027 (X): 7,62%; Pemulihan pokok kredit hapus buku: 0,22%", icon: "📉" },
                    { title: "Tabungan", subtitle: "Suku bunga tabungan 2027 (X): 1,19%", icon: "🏦" },
                    { title: "Deposito", subtitle: "Suku bunga deposito 2027 (X): 6,26%", icon: "💵" },
                    { title: "Setoran Modal, Dividen, dan Cadangan", subtitle: "2 jadwal setoran modal / dividen / cadangan", icon: "🏛️" },
                    { title: "Pendapatan dan Beban Lainnya", subtitle: "Pertumbuhan beban (SDM, umum, pemasaran...): 30,00%", icon: "📊" },
                    { title: "Penempatan pada Bank Lain", subtitle: "Des 2027: Sisa Dana Rp12,33 M - Cash Ratio 27,74%", icon: "🪙" },
                    { title: "Kebijakan Kas", subtitle: "Otomatis (43% dari Desember 2026)", icon: "💰" }
                  ].map((card, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-3 hover:border-blue-300 transition cursor-pointer flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                          <span>{card.title}</span>
                          <span>{card.icon}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{card.subtitle}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-200 flex justify-end text-[10px] text-blue-600 font-bold hover:underline">
                        Klik untuk edit target &gt;
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Tetapkan Proyeksi Sumber dan Penggunaan Dana */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-4">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                  <h3 className="text-sm font-extrabold text-slate-900">Tetapkan Proyeksi Sumber dan Penggunaan Dana</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-emerald-800 text-white">
                        <th className="py-2.5 px-3 font-bold rounded-tl-lg">SUMBER DANA</th>
                        <th className="py-2.5 px-3 font-semibold text-right">Des 2025 (X-2) Realisasi</th>
                        <th className="py-2.5 px-3 font-semibold text-right">Des 2026 (X-1) Realisasi / Koreksi</th>
                        <th className="py-2.5 px-3 font-semibold text-right">Naik %</th>
                        <th className="py-2.5 px-3 font-semibold text-right rounded-tr-lg">Des 2027 (X) Proyeksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr className="bg-slate-50 font-semibold text-slate-700">
                        <td colSpan={5} className="py-1.5 px-3">Dana Pihak Ketiga</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 pl-6 font-medium text-slate-900">Tabungan</td>
                        <td className="py-2 px-3 text-right">7.311.324.704</td>
                        <td className="py-2 px-3 text-right">8.366.382.905</td>
                        <td className="py-2 px-3 text-right text-emerald-600 font-semibold">+14,43%</td>
                        <td className="py-2 px-3 text-right font-bold text-slate-900">9.575.889.922</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 pl-6 font-medium text-slate-900">Deposito</td>
                        <td className="py-2 px-3 text-right">14.901.445.000</td>
                        <td className="py-2 px-3 text-right">16.291.108.667</td>
                        <td className="py-2 px-3 text-right text-emerald-600 font-semibold">+9,33%</td>
                        <td className="py-2 px-3 text-right font-bold text-slate-900">17.911.224.398</td>
                      </tr>
                      <tr className="bg-slate-50 font-semibold text-slate-700">
                        <td colSpan={5} className="py-1.5 px-3">Pinjaman</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 pl-6 font-medium text-slate-900">Simpanan dari Bank Lain</td>
                        <td className="py-2 px-3 text-right">0</td>
                        <td className="py-2 px-3 text-right">0</td>
                        <td className="py-2 px-3 text-right text-slate-400">0%</td>
                        <td className="py-2 px-3 text-right font-bold text-slate-900">1.000.000.000</td>
                      </tr>
                      <tr className="bg-slate-50 font-semibold text-slate-700">
                        <td colSpan={5} className="py-1.5 px-3">Modal</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 pl-6 font-medium text-slate-900">Modal Disetor</td>
                        <td className="py-2 px-3 text-right">6.000.000.000</td>
                        <td className="py-2 px-3 text-right">6.000.000.000</td>
                        <td className="py-2 px-3 text-right text-slate-400">0%</td>
                        <td className="py-2 px-3 text-right font-bold text-slate-900">6.000.000.000</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 pl-6 font-medium text-slate-900">Cadangan Umum dan Tujuan</td>
                        <td className="py-2 px-3 text-right">272.000.000</td>
                        <td className="py-2 px-3 text-right">272.000.000</td>
                        <td className="py-2 px-3 text-right text-slate-400">0%</td>
                        <td className="py-2 px-3 text-right font-bold text-slate-900">427.745.851</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 pl-6 font-medium text-slate-900">Laba (Rugi) Tahun-Tahun Lalu</td>
                        <td className="py-2 px-3 text-right">3.188.982.547</td>
                        <td className="py-2 px-3 text-right">3.538.229.502</td>
                        <td className="py-2 px-3 text-right text-emerald-600 font-semibold">+10,95%</td>
                        <td className="py-2 px-3 text-right font-bold text-slate-900">4.528.577.534</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 pl-6 font-medium text-slate-900">Laba (Rugi) Tahun Berjalan</td>
                        <td className="py-2 px-3 text-right">510.246.955</td>
                        <td className="py-2 px-3 text-right">1.557.458.551</td>
                        <td className="py-2 px-3 text-right text-emerald-600 font-semibold">+205,24%</td>
                        <td className="py-2 px-3 text-right font-bold text-slate-900">2.383.454.839</td>
                      </tr>
                      <tr className="bg-slate-100 font-extrabold text-slate-900">
                        <td className="py-3 px-3">Jumlah Sumber Dana</td>
                        <td className="py-3 px-3 text-right">32.072.735.459</td>
                        <td className="py-3 px-3 text-right">36.270.204.083</td>
                        <td className="py-3 px-3 text-right text-emerald-700 font-black">+13,09%</td>
                        <td className="py-3 px-3 text-right text-blue-700 font-black text-sm">44.186.892.644</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: SECTION B - SUBSECTION B2 (Persis Screenshot 4) */}
          {activeSection === "B" && activeSubSection === "B2" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActiveSubSection(null)}
                  className="flex items-center space-x-1.5 text-xs text-slate-600 hover:text-blue-600 font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Ringkasan Bagian B</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { code: "B2.1", title: "Proyeksi Posisi Keuangan (Neraca)", desc: "Format 03.10 - APOLO 0310." },
                  { code: "B2.2", title: "Proyeksi Laba Rugi", desc: "Format 03.20 - APOLO 0320." },
                  { code: "B2.3", title: "Proyeksi Rekening Administratif", desc: "Format 03.30 - APOLO 0330." },
                  { code: "B2.4", title: "Target Rasio dan Pos Keuangan", desc: "Format 04.00 - APOLO 0400." }
                ].map((card) => (
                  <div
                    key={card.code}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-xs transition cursor-pointer flex items-start justify-between"
                  >
                    <div>
                      <span className="text-xs font-black text-blue-700 block">{card.code}</span>
                      <h3 className="text-sm font-bold text-slate-900 mt-0.5">{card.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{card.desc}</p>
                    </div>
                    <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                      <span>✓</span>
                      <span>Lengkap</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: SECTION B - OVERVIEW (Cards B1-B5 persis Screenshot 3 & 8) */}
          {activeSection === "B" && !activeSubSection && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { code: "B1", title: "Proyeksi Umum dan Penetapan Target", desc: "Sumber, penggunaan dana, laba rugi, kualitas aset.", action: () => setActiveSubSection("B1") },
                { code: "B2", title: "Proyeksi Laporan Keuangan dan Rasio", desc: "Laporan proyeksi. Angka dapat diubah langsung.", action: () => setActiveSubSection("B2") },
                { code: "B3", title: "Proyeksi Lebih Rinci", desc: "Rincian opsional. Tanpa rincian, akan mengikuti B1.", badge: "OPSIONAL" },
                { code: "B4", title: "Tren Rencana Bisnis Hingga Akhir Tahun 2027 (X)", desc: "Tren rencana dibanding tahun 2026 (X-1)." },
                { code: "B5", title: "Proyeksi Per Kantor", desc: "B2 dibagi per kantor dari TXT Lapbul.", badge: "OPSIONAL" }
              ].map((card) => (
                <div
                  key={card.code}
                  onClick={card.action}
                  className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-2xs hover:border-blue-400 hover:shadow-xs transition cursor-pointer flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black text-slate-700">{card.code}</span>
                      {card.badge && (
                        <span className="text-[10px] uppercase font-bold text-slate-400 border border-slate-200 px-1.5 rounded">
                          {card.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{card.title}</h3>
                    <p className="text-xs text-slate-500">{card.desc}</p>
                  </div>
                  <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                    <span>✓</span>
                    <span>Lengkap</span>
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* VIEW: SECTION C (Cards C1-C11 persis Screenshot 2) */}
          {activeSection === "C" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { code: "C1", title: "Ringkasan Eksekutif", desc: "Format 01.00 - APOLO 0100." },
                { code: "C2", title: "Strategi Bisnis dan Kebijakan", desc: "Format 02.00 - APOLO 0200." },
                { code: "C3", title: "Proyeksi Laporan Keuangan dan Target Rasio", desc: "Format 03.10-04.00 - APOLO 0310-0400." },
                { code: "C4", title: "Rencana Penghimpunan Dana", desc: "Format 05.00 - APOLO 0500." },
                { code: "C5", title: "Rencana Penyaluran Dana", desc: "Format 06.10-06.30 - APOLO 0610-0630." },
                { code: "C6", title: "Rencana Permodalan", desc: "Format 07.00 - APOLO 0700." },
                { code: "C7", title: "Rencana SDM dan Teknologi", desc: "Format 08.10-08.23 - APOLO 0810-0823." },
                { code: "C8", title: "Rencana Kegiatan Usaha", desc: "Format 09.00-09.20, 09.30 bagian 3-4." },
                { code: "C9", title: "Rencana Jaringan Kantor", desc: "Format 10.00 - APOLO 1000." },
                { code: "C10", title: "Informasi Lainnya", desc: "Format 99.00 Informasi Lainnya." },
                { code: "C11", title: "Persetujuan Dewan Komisaris", desc: "Lembar persetujuan Dewan Komisaris." }
              ].map((card) => (
                <div key={card.code} className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex items-start justify-between">
                  <div>
                    <span className="text-xs font-black text-slate-700 block">{card.code}</span>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">{card.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{card.desc}</p>
                  </div>
                  <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                    <span>✓</span>
                    <span>Lengkap</span>
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* VIEW: SECTION D - SUBSECTION D3 (Bentuk File Kirim APOLO - Ekspor 21 File) */}
          {activeSection === "D" && activeSubSection === "D3" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActiveSubSection(null)}
                  className="flex items-center space-x-1.5 text-xs text-slate-600 hover:text-blue-600 font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Menu D</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setIsExporting(true);
                      setTimeout(() => setIsExporting(false), 2000);
                    }}
                    className="flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isExporting ? "Membuat ZIP File APOLO..." : "Unduh ZIP Semua File APOLO"}</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Daftar File Kirim APOLO OJK (21 Dokumen Sesuai Format RBBPRK27)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Nama file dibentuk otomatis sesuai standar APOLO: <code>KodeLaporan + KodeForm + R/K + Periode + SandiLJK + SandiUsaha</code>.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <th className="py-2.5 px-3 font-bold">No</th>
                        <th className="py-2.5 px-3 font-bold">Kode Form</th>
                        <th className="py-2.5 px-3 font-bold">Nama Form</th>
                        <th className="py-2.5 px-3 font-bold">Nama File APOLO</th>
                        <th className="py-2.5 px-3 font-bold">Tipe File</th>
                        <th className="py-2.5 px-3 font-bold">Status</th>
                        <th className="py-2.5 px-3 font-bold text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {apoloFiles.map((f, idx) => (
                        <tr key={f.formCode} className="hover:bg-slate-50">
                          <td className="py-2 px-3 text-slate-400">{idx + 1}</td>
                          <td className="py-2 px-3 font-bold text-blue-700">{f.formCode}</td>
                          <td className="py-2 px-3 text-slate-800 font-medium">{f.formTitle}</td>
                          <td className="py-2 px-3 font-mono font-bold text-slate-900">{f.filename}</td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              f.format === "pdf" ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"
                            }`}>
                              .{f.format.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-2 px-3">
                            <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <span>✓</span>
                              <span>Lengkap</span>
                            </span>
                          </td>
                          <td className="py-2 px-3 text-center">
                            <button
                              onClick={() => alert(`Mengunduh file: ${f.filename}`)}
                              className="text-blue-600 hover:text-blue-800 font-semibold text-[11px] underline cursor-pointer"
                            >
                              Unduh
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: SECTION D - OVERVIEW (Cards D1-D3 persis Screenshot 1) */}
          {activeSection === "D" && !activeSubSection && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { code: "D1", title: "Tinjau Ringkasan Keuangan dan Laporan", desc: "Ringkasan proyeksi dan isi form." },
                { code: "D2", title: "Cetak Output Laporan RBB", desc: "Laporan RBB dan Lembar Persetujuan." },
                {
                  code: "D3",
                  title: "Bentuk File Kirim APOLO",
                  desc: "Pemeriksaan dan file kirim APOLO.",
                  action: () => setActiveSubSection("D3")
                }
              ].map((card) => (
                <div
                  key={card.code}
                  onClick={card.action}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-blue-400 hover:shadow-xs transition cursor-pointer flex items-start justify-between"
                >
                  <div>
                    <span className="text-xs font-black text-slate-700 block">{card.code}</span>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">{card.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{card.desc}</p>
                  </div>
                  <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                    <span>✓</span>
                    <span>Lengkap</span>
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* KPI Dashboard: Tren Rencana Bisnis & Rasio (Images 3 & 8) */}
          {activeSection !== "B" || !activeSubSection ? (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Tren Rencana Bisnis Hingga Akhir Tahun 2027
                  </h3>
                  <span className="text-xs text-rose-600 font-bold flex items-center space-x-1 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>2 rasio di luar batas: NPL gross, LDR</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Ringkasan Rencana Bisnis dan Rasio Des 2027 (Posisi akhir periode, perubahan dibanding Des 2025)
                </p>
              </div>

              {/* Sparkline Cards: Ringkasan Pos Neraca Utama */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {WORKSPACE_METRICS.ringkasan.map((m) => (
                  <div key={m.label} className="bg-slate-50/70 border border-slate-200 rounded-lg p-3 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 font-medium block truncate">{m.label}</span>
                      <span className="text-base font-extrabold text-slate-900 block mt-1">{m.value}</span>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5">
                        <span>{m.vsLabel}</span>
                        <span className="font-bold text-emerald-600">{m.delta}</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex justify-end">
                      <Sparkline points={m.sparkline} color="#2563eb" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Sparkline Cards: Rasio Keuangan OJK (Alert Box NPL Gross & LDR) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {WORKSPACE_METRICS.rasio.map((r) => {
                  const isDanger = r.isAlert;

                  return (
                    <div
                      key={r.label}
                      className={`rounded-lg p-3 flex flex-col justify-between transition border ${
                        isDanger
                          ? "bg-rose-50/40 border-rose-400 ring-2 ring-rose-500/20"
                          : "bg-slate-50/70 border-slate-200"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-bold text-slate-700 truncate">{r.label}</span>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                              isDanger
                                ? "bg-rose-100 text-rose-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {isDanger ? "▲ Di luar batas" : "✓ Dalam batas"}
                          </span>
                        </div>
                        <span className={`text-base font-extrabold block ${isDanger ? "text-rose-700" : "text-slate-900"}`}>
                          {r.value}
                        </span>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5">
                          <span>{r.threshold}</span>
                          <span className="font-medium text-slate-600">{r.delta}</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-200/60 flex justify-end">
                        <Sparkline points={r.sparkline} color={isDanger ? "#e11d48" : "#059669"} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        <p>© 2026 BPR Go Digital — Creva Business Consulting. Terintegrasi Template Resmi OJK RBBPRK27.</p>
      </footer>
    </div>
  );
}

export default function Sirenbis4WorkspacePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Memuat Workspace SIRENBIS 4...</div>}>
      <WorkspaceContent />
    </Suspense>
  );
}
