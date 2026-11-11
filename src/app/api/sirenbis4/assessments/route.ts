import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { DEFAULT_RBB_ASSESSMENTS } from "@/lib/sirenbisData";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tahun = searchParams.get("tahun");
    const jenis = searchParams.get("jenis");

    // Try Supabase if configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes("your-supabase")) {
      let query = supabase.from("rbb_self_assessments").select("*");
      if (tahun) query = query.eq("tahun_rencana", parseInt(tahun, 10));
      if (jenis && jenis !== "ALL") query = query.eq("jenis_rbb", jenis);

      const { data, error } = await query.order("tahun_rencana", { ascending: false });
      if (!error && data) {
        return NextResponse.json({ success: true, data });
      }
    }

    // Fallback to in-memory mock data
    let filtered = DEFAULT_RBB_ASSESSMENTS;
    if (tahun) filtered = filtered.filter((a) => a.tahun_rencana === parseInt(tahun, 10));
    if (jenis && jenis !== "ALL") filtered = filtered.filter((a) => a.jenis_rbb === jenis);

    return NextResponse.json({ success: true, data: filtered });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tahun_rencana, jenis_rbb, created_by, bpr_id } = body;

    const newAssessment = {
      id: `rbb-${tahun_rencana}-${(jenis_rbb || "RUTIN").toLowerCase()}-${Date.now().toString().slice(-4)}`,
      bpr_id: bpr_id || "bpr-batang-01",
      tahun_rencana: parseInt(tahun_rencana, 10) || 2026,
      jenis_rbb: jenis_rbb || "RUTIN",
      status_dokumen: "DRAFT",
      locked_at: null,
      locked_by: null,
      created_by: created_by || "bkk_tpi_batang@yahoo.co.id",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes("your-supabase")) {
      const { data, error } = await supabase.from("rbb_self_assessments").insert(newAssessment).select().single();
      if (!error && data) {
        return NextResponse.json({ success: true, data });
      }
    }

    return NextResponse.json({ success: true, data: newAssessment });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

