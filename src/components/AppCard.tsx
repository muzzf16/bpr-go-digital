"use client";

import React from "react";
import Link from "next/link";
import { Pin, ArrowUpRight, Shield, Layers, FileText, Activity, AlertTriangle, Users, BookOpen } from "lucide-react";
import { Application } from "@/lib/types";

interface AppCardProps {
  app: Application;
  isPinned: boolean;
  onTogglePin: (id: string) => void;
}

// Icon mapper helper
function getCategoryIcon(category: string | null) {
  switch (category?.toLowerCase()) {
    case "rencana bisnis":
      return <Layers className="w-4 h-4 text-blue-600" />;
    case "kepatuhan":
    case "tata kelola":
      return <Shield className="w-4 h-4 text-emerald-600" />;
    case "manajemen risiko":
    case "profil risiko":
    case "tingkat kesehatan":
      return <Activity className="w-4 h-4 text-amber-600" />;
    case "anti fraud":
    case "apuppt":
      return <AlertTriangle className="w-4 h-4 text-rose-600" />;
    case "sdm":
      return <Users className="w-4 h-4 text-indigo-600" />;
    default:
      return <FileText className="w-4 h-4 text-blue-600" />;
  }
}

export default function AppCard({ app, isPinned, onTogglePin }: AppCardProps) {
  return (
    <div className="group relative bg-white border border-slate-200/90 hover:border-blue-400 rounded-2xl p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between">
      <div>
        {/* Top bar: Icon, category, and pin action */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2.5">
            <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
              {getCategoryIcon(app.category)}
            </div>
            {app.category && (
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {app.category}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onTogglePin(app.id);
            }}
            title={isPinned ? "Lepas Pin" : "Pasang Pin ke Dashboard"}
            className={`p-1.5 rounded-lg transition-colors ${
              isPinned
                ? "text-blue-600 bg-blue-50"
                : "text-slate-300 hover:text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Pin className={`w-3.5 h-3.5 ${isPinned ? "fill-blue-600" : ""}`} />
          </button>
        </div>

        {/* Title and subtitle */}
        <h4 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
          {app.title}
        </h4>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
          {app.subtitle || app.title}
        </p>
      </div>

      {/* Footer: Version Pill & Launch link */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="inline-flex items-center text-[10px] font-bold text-violet-700 bg-violet-100/90 px-2 py-0.5 rounded-md">
          {app.version_label || "Aktif"}
        </span>

        <Link
          href={app.route_path}
          className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition group-hover:translate-x-0.5"
        >
          <span>Buka</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
