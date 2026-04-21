const CARDNEST_BASE_URL = process.env.CARDNEST_BASE_URL || 'https://crypto.cardnest.io';
const CARDNEST_MERCHANT_ID = process.env.CARDNEST_MERCHANT_ID;

export async function POST() {
  try {
    if (!CARDNEST_MERCHANT_ID) {
      return Response.json(
        {
          success: false,
          error: 'CARDNEST_MERCHANT_ID is not configured on the server',
        },
        { status: 500 }
      );
    }

    const upstreamResponse = await fetch(`${CARDNEST_BASE_URL}/api/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ merchant_id: CARDNEST_MERCHANT_ID }),
      cache: 'no-store',
    });

    const upstreamData = await upstreamResponse.json();

    if (!upstreamResponse.ok || !upstreamData?.success) {
      return Response.json(
        {
          success: false,
          error: upstreamData?.error || 'Unable to create CardNest session',
        },
        { status: upstreamResponse.status || 502 }
      );
    }

    // Ensure redirect is an absolute URL for client-side navigation.
    const redirectTo = upstreamData.redirect_to?.startsWith('http')
      ? upstreamData.redirect_to
      : `${CARDNEST_BASE_URL}${upstreamData.redirect_to}`;

    return Response.json(
      {
        success: true,
        session_id: upstreamData.session_id,
        redirect_to: redirectTo,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error?.message || 'Internal error while creating CardNest session',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({
    success: true,
    endpoint: '/api/cardnest/session',
    method: 'POST',
    configured: Boolean(CARDNEST_MERCHANT_ID),
  });
}
