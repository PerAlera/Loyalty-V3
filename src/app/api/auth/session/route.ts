import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      console.log("[AUTH_SESSION] getServerSession returned null");
    }
    return NextResponse.json({ session });
  } catch (error) {
    console.error("[AUTH_SESSION] Session API Error:", error);
    return NextResponse.json({ session: null }, { status: 500 });
  }
}
