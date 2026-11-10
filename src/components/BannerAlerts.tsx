"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertCircle, CreditCard, ArrowRight, X } from "lucide-react";
import { BillingStatus } from "@/lib/types";

interface BannerAlertsProps {
  billing: BillingStatus | null;
}

export default function BannerAlerts({ billing }: BannerAlertsProps) {
  const [dismissPasswordWarning, setDismissPasswordWarning] = useState(false);
  const [dismissBillingWarning, setDismissBillingWarning] = useState(false);

  return (
    <div className="space-y-3 mb-6">
      {/* 1. Password Expiry Alert Banner */}
      {!dismissPasswordWarning && (
        <div className="bg-amber-50/90 border border-amber-200/90 text-amber-900 rounded-xl px-4 py-3 flex items-center justify-between text-xs sm:text-sm shadow-xs">
          <div className="flex items-center space-x-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <p>
              <span className="font-bold">Perhatian:</span> Password Anda sudah kedaluwarsa. Password wajib diperbarui secara berkala demi keamanan data perbankan.{" "}
              <Link href="/profile/security" className="font-semibold underline hover:text-amber-950 ml-1">
                Perbarui Sekarang
              </Link>
            </p>
          </div>
          <button
            onClick={() => setDismissPasswordWarning(true)}
            className="text-amber-500 hover:text-amber-800 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Billing / Subscription Notice Card */}
      {!dismissBillingWarning && (
        <div className="bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/50 border border-blue-100 rounded-2xl p-4 sm:p-5 shadow-[0_16px_36px_rgba(59,130,246,0.08)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 flex-shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Informasi Tagihan & Masa Aktif Modul BPR
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Pastikan pembayaran tagihan langganan telah terverifikasi agar akses modul kepatuhan tetap lancar.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Link
              href="/billing"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm transition active:scale-98"
            >
              <span>Lihat Daftar Tagihan & Pembayaran</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
