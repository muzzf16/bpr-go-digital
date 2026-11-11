"use strict";
import React from "react";
import { AlertCircle, Lock, ShieldAlert, X } from "lucide-react";
import { RbbSelfAssessment } from "@/lib/types";

interface RbbLockFloatingNoticeProps {
  assessment: RbbSelfAssessment | null;
  onClose: () => void;
  onUnlock?: (id: string) => void;
  canUnlock?: boolean;
}

export const RbbLockFloatingNotice: React.FC<RbbLockFloatingNoticeProps> = ({
  assessment,
  onClose,
  onUnlock,
  canUnlock = true
}) => {
  if (!assessment || (!assessment.locked_at && assessment.status_dokumen !== "LOCKED")) {
    return null;
  }

  const lockedTime = assessment.locked_at
    ? new Date(assessment.locked_at).toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short"
      })
    : "Sesi Aktif";

  return (
    <aside aria-label="Notifikasi Penguncian Dokumen" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-3xl animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-amber-500 text-slate-950 p-4 rounded-2xl shadow-2xl border-2 border-amber-300 flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950/15 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5 text-amber-950" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-sm text-slate-950">
                Peringatan: Dokumen RBB Sedang Terkunci
              </span>
              <span className="text-[10px] uppercase font-black bg-amber-950 text-amber-200 px-2 py-0.5 rounded-full">
                Locked Guard
              </span>
            </div>
            <p className="text-xs text-amber-950 font-medium mt-0.5">
              Dokumen RBB {assessment.jenis_rbb} Tahun {assessment.tahun_rencana} dikunci oleh{" "}
              <strong className="underline">{assessment.locked_by || "Pengawas / Reviewer"}</strong>{" "}
              sejak {lockedTime}. Penyuntingan bersamaan dibatasi untuk integritas data.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          {canUnlock && onUnlock && (
            <button
              onClick={() => onUnlock(assessment.id)}
              className="bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-xs"
            >
              Buka Kunci
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-amber-950/70 hover:text-amber-950 hover:bg-amber-600/20 rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

