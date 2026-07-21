import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession();
    return NextResponse.json({ session });
  } catch (error) {
    console.error("Session API Error:", error);
    return NextResponse.json({ session: null }, { status: 500 });
  }
}
