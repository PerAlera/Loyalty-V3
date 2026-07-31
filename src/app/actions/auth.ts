"use server";

import { getServerSession } from "@/lib/auth";

export async function getUserSessionAction() {
  try {
    return await getServerSession();
  } catch (error) {
    console.error("[getUserSessionAction] Error:", error);
    return null;
  }
}
