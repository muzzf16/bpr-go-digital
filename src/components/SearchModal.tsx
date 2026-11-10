"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Layers } from "lucide-react";
import { Application } from "@/lib/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  applications: Application[];
}

export default function SearchModal({ isOpen, onClose, applications }: SearchModalProps) {
  const [query, setQuery] = useState("");

  // Keyboard shortcut Ctrl+K / Cmd+K and ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = applications.filter((app) => {
    const q = query.toLowerCase();
    return (
      app.title.toLowerCase().includes(q) ||
      (app.subtitle && app.subtitle.toLowerCase().includes(q)) ||
      (app.version_label && app.version_label.toLowerCase().includes(q)) ||
      (app.category && app.category.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik nama modul, regulasi (e.g. RBB, APOLO, POJK, SIMR)..."
            className="w-full text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-500 font-mono px-2 py-1 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              Tidak ada modul aplikasi yang cocok dengan &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((app) => (
              <Link
                key={app.id}
                href={app.route_path}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50/70 transition group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-600">
                      {app.title}
                    </h5>
                    <p className="text-xs text-slate-500 line-clamp-1">{app.version_label}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {app.category || "Modul"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-4 py-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100">
          <span>Menampilkan {filtered.length} dari {applications.length} modul perbankan</span>
          <span>Tekan ESC untuk menutup</span>
        </div>
      </div>
    </div>
  );
}
