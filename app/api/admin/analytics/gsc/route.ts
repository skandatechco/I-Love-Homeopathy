import { NextRequest, NextResponse } from "next/server";
import { fetchGSCQueries, fetchGSCPages } from "@/lib/analytics/gsc";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get("startDate") || 
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const endDate = searchParams.get("endDate") || 
      new Date().toISOString().split('T')[0];
    const type = searchParams.get("type") || "queries"; // "queries" or "pages"

    const dateRange = {
      startDate,
      endDate,
    };

    let data;
    if (type === "queries") {
      data = await fetchGSCQueries(dateRange);
    } else {
      data = await fetchGSCPages(dateRange);
    }

    return NextResponse.json({ data, dateRange });
  } catch (error) {
    console.error("Error in GSC API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch GSC data" },
      { status: 500 }
    );
  }
}

