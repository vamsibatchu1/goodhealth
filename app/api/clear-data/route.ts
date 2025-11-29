import { NextRequest, NextResponse } from "next/server";
import { clearAllDailyData } from "@/lib/firebase/clear-all-data";

/**
 * API route to clear all daily data
 * POST /api/clear-data
 */
export async function POST(request: NextRequest) {
  try {
    await clearAllDailyData();
    return NextResponse.json({ 
      success: true, 
      message: "All data cleared successfully" 
    });
  } catch (error) {
    console.error("Clear data error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to clear data" 
      },
      { status: 500 }
    );
  }
}

