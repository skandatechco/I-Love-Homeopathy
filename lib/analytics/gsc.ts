// Google Search Console API Integration
// Fetch search queries, CTR, impressions, and top landing pages

const GSC_CLIENT_EMAIL = process.env.GSC_CLIENT_EMAIL;
const GSC_PRIVATE_KEY = process.env.GSC_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GSC_SITE_URL = process.env.GSC_SITE_URL;

interface GSCQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface GSCPage {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface GSCDateRange {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}

// Get JWT token for Google API authentication
async function getAccessToken(): Promise<string> {
  if (!GSC_CLIENT_EMAIL || !GSC_PRIVATE_KEY) {
    throw new Error("GSC credentials not configured");
  }

  // Dynamic import for ESM compatibility
  const jwtModule = await import('jsonwebtoken');
  const jwt = jwtModule.default || jwtModule;
  const now = Math.floor(Date.now() / 1000);

  const token = jwt.sign(
    {
      iss: GSC_CLIENT_EMAIL,
      sub: GSC_CLIENT_EMAIL,
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
      scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    },
    GSC_PRIVATE_KEY,
    { algorithm: 'RS256' }
  );

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: token,
    }),
  });

  const data = await response.json();
  return data.access_token;
}

// Fetch search queries data
export async function fetchGSCQueries(
  dateRange: GSCDateRange,
  limit: number = 100
): Promise<GSCQuery[]> {
  if (!GSC_CLIENT_EMAIL || !GSC_PRIVATE_KEY || !GSC_SITE_URL) {
    console.warn("GSC credentials not configured");
    return [];
  }

  try {
    const accessToken = await getAccessToken();
    
    const response = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE_URL)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          dimensions: ['query'],
          rowLimit: limit,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`GSC API error: ${response.statusText}`);
    }

    const data = await response.json();
    return (data.rows || []).map((row: any) => ({
      query: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    }));
  } catch (error) {
    console.error('Error fetching GSC queries:', error);
    return [];
  }
}

// Fetch top landing pages
export async function fetchGSCPages(
  dateRange: GSCDateRange,
  limit: number = 100
): Promise<GSCPage[]> {
  if (!GSC_CLIENT_EMAIL || !GSC_PRIVATE_KEY || !GSC_SITE_URL) {
    console.warn("GSC credentials not configured");
    return [];
  }

  try {
    const accessToken = await getAccessToken();
    
    const response = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE_URL)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          dimensions: ['page'],
          rowLimit: limit,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`GSC API error: ${response.statusText}`);
    }

    const data = await response.json();
    return (data.rows || []).map((row: any) => ({
      page: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    }));
  } catch (error) {
    console.error('Error fetching GSC pages:', error);
    return [];
  }
}

