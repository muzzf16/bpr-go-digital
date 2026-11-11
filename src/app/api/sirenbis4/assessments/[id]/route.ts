import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { DEFAULT_RBB_ASSESSMENTS, DEFAULT_PROJECTIONS } from "@/lib/sirenbisData";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes("your-supabase")) {
      const { data: assessment, error } = await supabase
        .from("rbb_self_assessments")
        .select("*, rbb_trend_projections(*)")
        .eq("id", id)
        .single();

      if (!error && assessment) {
        return NextResponse.json({ success: true, data: assessment });
      }
    }

    const fallbackDoc = DEFAULT_RBB_ASSESSMENTS.find((a) => a.id === id);
    const fallbackProjections = DEFAULT_PROJECTIONS[id] || DEFAULT_PROJECTIONS["rbb-2026-rutin-01"];

    if (!fallbackDoc) {
      return NextResponse.json({ success: false, error: "Assessment not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: { ...fallbackDoc, projections: fallbackProjections }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes("your-supabase")) {
      await supabase.from("rbb_self_assessments").delete().eq("id", id);
    }

    return NextResponse.json({ success: true, message: `Assessment ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

