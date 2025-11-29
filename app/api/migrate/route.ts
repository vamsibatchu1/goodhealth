import { NextRequest, NextResponse } from "next/server";
import { migrateDailyDataDates } from "@/lib/firebase/migrate-dates";

/**
 * API route to trigger date migration
 * POST /api/migrate
 */
export async function POST(request: NextRequest) {
  try {
    await migrateDailyDataDates();
    return NextResponse.json({ 
      success: true, 
      message: "Date migration completed successfully" 
    });
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Migration failed" 
      },
      { status: 500 }
    );
  }
}

