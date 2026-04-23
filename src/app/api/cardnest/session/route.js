const CARDNEST_BASE_URL = process.env.CARDNEST_BASE_URL || 'https://crypto.cardnest.io';
const CARDNEST_MERCHANT_ID = process.env.CARDNEST_MERCHANT_ID;

function getCardNestOrigin() {
  try {
    const parsed = new URL(CARDNEST_BASE_URL);
    if (parsed.protocol !== 'https:') {
      throw new Error('CARDNEST_BASE_URL must use HTTPS');
    }

    return parsed.origin;
  } catch {
    throw new Error('CARDNEST_BASE_URL is invalid');
  }
}

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

    const cardNestOrigin = getCardNestOrigin();

    const upstreamResponse = await fetch(`${cardNestOrigin}/api/session`, {
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

    const redirectTo = upstreamData?.redirect_to;
    if (typeof redirectTo !== 'string' || !redirectTo.startsWith('/')) {
      return Response.json(
        {
          success: false,
          error: 'Invalid redirect path returned by CardNest',
        },
        { status: 502 }
      );
    }

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
    cardnest_origin: CARDNEST_BASE_URL,
    configured: Boolean(CARDNEST_MERCHANT_ID),
  });
}
