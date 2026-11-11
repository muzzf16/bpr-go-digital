"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import BannerAlerts from "@/components/BannerAlerts";
import AppCard from "@/components/AppCard";
import SearchModal from "@/components/SearchModal";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Application, UserProfile, BillingStatus } from "@/lib/types";
import { DEFAULT_APPLICATIONS, DEFAULT_USER, DEFAULT_BILLING } from "@/lib/defaultData";
import { Pin, Grid, Layers, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [billing, setBilling] = useState<BillingStatus | null>(null);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        if (!isSupabaseConfigured) {
          setApplications(DEFAULT_APPLICATIONS);
          setUser(DEFAULT_USER);
          setBilling(DEFAULT_BILLING);
          const local = localStorage.getItem("pinnedDashboardApps");
          if (local) setPinnedIds(JSON.parse(local));
          else setPinnedIds(["sirenbis", "sip2rbb", "sip-takol", "simr"]);
          setLoading(false);
          return;
        }

        // 1. Fetch applications from Supabase
        const { data: appsData } = await supabase
          .from("applications")
          .select("*")
          .order("display_order", { ascending: true });

        if (appsData && appsData.length > 0) {
          setApplications(appsData);
        } else {
          setApplications(DEFAULT_APPLICATIONS);
        }

        // 2. Fetch User & Organization info
        const { data: userData } = await supabase
          .from("users")
          .select(`
            id, email, username, name, picture_url, prefix, tags,
            roles (id, name, privileges),
            bpr_organizations (id, prefix, name, code_ojk, logo_url)
          `)
          .limit(1)
          .single();

        if (userData) {
          setUser({
            id: userData.id,
            email: userData.email,
            username: userData.username,
            name: userData.name,
            picture_url: userData.picture_url,
            prefix: userData.prefix,
            tags: userData.tags || [],
            role: userData.roles as any,
            bpr: userData.bpr_organizations as any,
          });
        } else {
          setUser(DEFAULT_USER);
        }

        // 3. Fetch Preferences
        const { data: prefData } = await supabase
          .from("user_dashboard_preferences")
          .select("pinned_apps")
          .limit(1)
          .single();

        if (prefData?.pinned_apps) {
          setPinnedIds(prefData.pinned_apps as string[]);
        } else {
          // Fallback to localStorage
          const local = localStorage.getItem("pinnedDashboardApps");
          if (local) setPinnedIds(JSON.parse(local));
          else setPinnedIds(["sirenbis", "sip2rbb", "sip-takol", "simr"]);
        }

        // 4. Check Billing status
        const { data: billData } = await supabase.rpc("check_user_billing_status", {
          user_prefix: "BPR-BATANG",
        });
        if (billData) setBilling(billData as BillingStatus);
        else setBilling(DEFAULT_BILLING);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setApplications(DEFAULT_APPLICATIONS);
        setUser(DEFAULT_USER);
        setBilling(DEFAULT_BILLING);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleTogglePin = async (appId: string) => {
    let nextPinned: string[];
    if (pinnedIds.includes(appId)) {
      nextPinned = pinnedIds.filter((id) => id !== appId);
    } else {
      nextPinned = [...pinnedIds, appId];
    }
    setPinnedIds(nextPinned);
    localStorage.setItem("pinnedDashboardApps", JSON.stringify(nextPinned));

    // Persist to Supabase if configured & user exists
    if (isSupabaseConfigured && user?.id && user.id !== "usr-default-bpr") {
      await supabase
        .from("user_dashboard_preferences")
        .upsert({ user_id: user.id, pinned_apps: nextPinned });
    }
  };

  const categories = [
    { key: "ALL", label: "Semua Aplikasi" },
    { key: "PINNED", label: "Tersemat (Pin)" },
    { key: "Rencana Bisnis", label: "Rencana Bisnis" },
    { key: "Kepatuhan", label: "Kepatuhan & GCG" },
    { key: "Profil Risiko", label: "Profil Risiko & SIMR" },
    { key: "Kesehatan Bank", label: "APOLO TKS" },
    { key: "Anti Fraud", label: "APUPPT & Anti Fraud" },
  ];

  const filteredApps = applications.filter((app) => {
    if (selectedCategory === "PINNED") return pinnedIds.includes(app.id);
    if (selectedCategory === "ALL") return true;
    if (selectedCategory === "Kepatuhan") {
      return app.category === "Kepatuhan" || app.category === "Tata Kelola";
    }
    if (selectedCategory === "Profil Risiko") {
      return app.category === "Profil Risiko" || app.category === "Manajemen Risiko";
    }
    if (selectedCategory === "Anti Fraud") {
      return app.category === "Anti Fraud" || app.category === "APUPPT";
    }
    return app.category === selectedCategory;
  });

  const pinnedApps = applications.filter((app) => pinnedIds.includes(app.id));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar user={user} onOpenSearch={() => setIsSearchOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Banner Alerts */}
        <BannerAlerts billing={billing} />

        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Portal Terintegrasi BPR</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Dashboard Aplikasi BPR
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Akses cepat seluruh modul rencana bisnis, tata kelola kepatuhan, manajemen risiko, dan pelaporan APOLO OJK.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center space-x-3 text-xs">
            <div className="bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs">
              <span className="text-slate-400 block font-medium">Total Modul</span>
              <span className="font-extrabold text-slate-800 text-sm">{applications.length} Aplikasi</span>
            </div>
            <div className="bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs">
              <span className="text-slate-400 block font-medium">Tersemat</span>
              <span className="font-extrabold text-blue-600 text-sm">{pinnedIds.length} Modul</span>
            </div>
          </div>
        </div>

        {/* Pinned Quick Access (Jika ada) */}
        {pinnedApps.length > 0 && selectedCategory === "ALL" && (
          <section className="mb-10">
            <div className="flex items-center space-x-2 mb-4">
              <Pin className="w-4 h-4 text-blue-600 fill-blue-600" />
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Akses Cepat Tersemat
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pinnedApps.map((app) => (
                <AppCard
                  key={`pinned-${app.id}`}
                  app={app}
                  isPinned={true}
                  onTogglePin={handleTogglePin}
                />
              ))}
            </div>
          </section>
        )}

        {/* Category Filter Tabs */}
        <section className="mb-6">
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-150 ${
                    active
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-slate-200/80"
                  }`}
                >
                  {cat.key === "ALL" && <Grid className="w-3.5 h-3.5" />}
                  {cat.key === "PINNED" && <Pin className="w-3.5 h-3.5" />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Applications Grid */}
        <section>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 animate-pulse h-44">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 mb-3" />
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
              <Layers className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800 text-base">Belum Ada Modul di Kategori Ini</h3>
              <p className="text-xs text-slate-400 mt-1">
                Pilih kategori lain atau gunakan fitur pencarian di kanan atas.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredApps.map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  isPinned={pinnedIds.includes(app.id)}
                  onTogglePin={handleTogglePin}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        applications={applications}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} BPR Go Digital. Terintegrasi PostgREST / Supabase.</p>
        </div>
      </footer>
    </div>
  );
}
