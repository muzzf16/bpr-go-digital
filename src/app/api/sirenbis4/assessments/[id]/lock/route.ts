import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const { lock, locked_by } = body;

    const isLocking = lock !== false;
    const updatePayload = {
      status_dokumen: isLocking ? "LOCKED" : "DRAFT",
      locked_at: isLocking ? new Date().toISOString() : null,
      locked_by: isLocking ? locked_by || "OJK Pengawas Perbankan" : null,
      updated_at: new Date().toISOString()
    };

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes("your-supabase")) {
      const { data, error } = await supabase
        .from("rbb_self_assessments")
        .update(updatePayload)
        .eq("id", id)
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json({ success: true, data });
      }
    }

    return NextResponse.json({
      success: true,
      data: { id, ...updatePayload }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

