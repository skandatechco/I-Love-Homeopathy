import { NextRequest, NextResponse } from "next/server";
import { trackGA4EventServer } from "@/lib/analytics/ga4";
import { AnalyticsEvent } from "@/lib/analytics/events";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, clientId } = body as { event: AnalyticsEvent; clientId: string };

    if (!event || !clientId) {
      return NextResponse.json(
        { error: "Missing event or clientId" },
        { status: 400 }
      );
    }

    await trackGA4EventServer(event, clientId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in GA4 API route:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}

