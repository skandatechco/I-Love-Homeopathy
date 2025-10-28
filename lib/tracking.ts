// Minimal analytics hook for click tracking.
// In v2 we'll wire this to Vercel Analytics or Supabase.
export function track(event: string, data?: Record<string, any>) {
  // placeholder; will be replaced with a client action or server action
  console.log("track", event, data);
}
