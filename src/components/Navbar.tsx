"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, LogOut, ChevronDown, ShieldCheck, Building2, BookOpen, LayoutDashboard } from "lucide-react";
import { UserProfile } from "@/lib/types";

interface NavbarProps {
  user: UserProfile | null;
  onOpenSearch: () => void;
}

export default function Navbar({ user, onOpenSearch }: NavbarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Left Navigation */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-9 w-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20">
                B
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-900 text-lg leading-tight tracking-tight">
                  BPR Go Digital
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {user?.bpr?.name || "PT BPR Bapera Batang"}
                </span>
              </div>
            </Link>

            {/* Main Menu Nav Tabs */}
            <nav className="hidden md:flex items-center space-x-1 pl-4 border-l border-slate-200">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 px-3 py-2 text-sm font-semibold text-blue-600 bg-blue-50/70 rounded-lg"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/regulasi"
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
              >
                <BookOpen className="w-4 h-4" />
                <span>Regulasi & Pelatihan</span>
              </Link>
              <Link
                href="/informasi-bpr"
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
              >
                <Building2 className="w-4 h-4" />
                <span>Informasi BPR</span>
              </Link>
            </nav>
          </div>

          {/* Right Action: Search Trigger & User Profile */}
          <div className="flex items-center space-x-3">
            {/* Search Trigger Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200/80 text-slate-600 px-3.5 py-1.5 rounded-lg text-sm font-medium transition border border-slate-200/80 shadow-xs"
            >
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline">Pencarian Aplikasi</span>
              <kbd className="hidden sm:inline-block bg-white text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded text-[10px] font-mono shadow-xs">
                Ctrl+K
              </kbd>
            </button>

            {/* Active Server Status Pill */}
            <div className="hidden lg:flex items-center space-x-1.5 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-semibold text-emerald-700">Online</span>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs border border-blue-200">
                  {user?.name ? user.name[0].toUpperCase() : "U"}
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {user?.email || "bkk_tpi_batang@yahoo.co.id"}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-[10px] uppercase font-bold text-violet-700 bg-violet-100 px-1.5 py-0.2 rounded">
                      {user?.role?.name || "Inputter"}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs text-slate-400 font-medium">Masuk sebagai</p>
                    <p className="text-sm font-bold text-slate-800 truncate">{user?.email}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{user?.bpr?.name}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Edit Profile</span>
                    </Link>
                    <Link
                      href="/profile/security"
                      className="flex items-center space-x-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                      <span>Ubah Password</span>
                    </Link>
                  </div>
                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => alert("Logout")}
                      className="w-full flex items-center space-x-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
