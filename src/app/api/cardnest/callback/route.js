import { createDecipheriv } from 'node:crypto';

const CARDNEST_ENCRYPTION_KEY = process.env.CARDNEST_ENCRYPTION_KEY;

function stripWrappingQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function parseBase64Bytes(rawKey) {
  const padded = rawKey + '='.repeat((4 - (rawKey.length % 4)) % 4);
  const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(base64, 'base64');
}

function parseHexBytes(rawKey) {
  if (!/^[0-9a-fA-F]+$/.test(rawKey) || rawKey.length % 2 !== 0) {
    throw new Error('Invalid hex key');
  }

  return Buffer.from(rawKey, 'hex');
}

function parseUtf8Bytes(rawKey) {
  return Buffer.from(rawKey, 'utf8');
}

function normalizeAes256Key(encryptionKey) {
  const cleaned = String(encryptionKey || '').trim();
  const unquoted = stripWrappingQuotes(cleaned);
  const prefixed = unquoted.match(/^(base64|hex|utf8):(.+)$/i);

  const mode = prefixed ? prefixed[1].toLowerCase() : null;
  const rawKey = (prefixed ? prefixed[2] : unquoted).trim();
  const attempts = [];

  const collect = (name, parser) => {
    try {
      const bytes = parser(rawKey);
      attempts.push({ name, bytes });
    } catch {
      // Intentionally ignore parse failures and keep trying other key formats.
    }
  };

  if (mode === 'base64') {
    collect('base64', parseBase64Bytes);
  } else if (mode === 'hex') {
    collect('hex', parseHexBytes);
  } else if (mode === 'utf8') {
    collect('utf8', parseUtf8Bytes);
  } else {
    collect('base64', parseBase64Bytes);
    collect('hex', parseHexBytes);
    collect('utf8', parseUtf8Bytes);
  }

  const exact = attempts.find((entry) => entry.bytes.length === 32);
  if (!exact) {
    const details = attempts.map((entry) => `${entry.name}:${entry.bytes.length}`).join(', ');
    throw new Error(`AES-256 key must resolve to exactly 32 bytes (${details || 'no parse'})`);
  }

  return exact.bytes;
}

function decryptCardNestPayload(encryptedData, encryptionKey) {
  const payload = Buffer.from(String(encryptedData || '').trim(), 'base64');
  if (payload.length < 13) {
    throw new Error('Invalid encrypted payload');
  }

  const keyBytes = normalizeAes256Key(encryptionKey);

  // CardNest payload format: first 12 bytes nonce, remaining bytes ciphertext+authTag.
  const nonce = payload.subarray(0, 12);
  const encryptedWithTag = payload.subarray(12);

  if (encryptedWithTag.length <= 16) {
    throw new Error('Invalid encrypted payload (missing auth tag or ciphertext)');
  }

  const authTag = encryptedWithTag.subarray(encryptedWithTag.length - 16);
  const ciphertext = encryptedWithTag.subarray(0, encryptedWithTag.length - 16);
  const decipher = createDecipheriv('aes-256-gcm', keyBytes, nonce);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');
  return JSON.parse(decrypted);
}

export async function POST(request) {
  try {
    if (!CARDNEST_ENCRYPTION_KEY) {
      return Response.json(
        {
          success: false,
          error: 'CARDNEST_ENCRYPTION_KEY is not configured on the server',
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const encryptedData = body?.encrypted_data;

    if (typeof encryptedData !== 'string' || !encryptedData.trim()) {
      return Response.json(
        {
          success: false,
          error: 'encrypted_data is required',
        },
        { status: 400 }
      );
    }

    const decryptedData = decryptCardNestPayload(encryptedData, CARDNEST_ENCRYPTION_KEY);
    const approved =
      decryptedData?.status === true ||
      decryptedData?.approved === true ||
      decryptedData?.summary?.can_process_transaction === true ||
      decryptedData?.sanction_check?.allow_transaction === true;
    const requestUrl = new URL(request.url);
    const debugRequested = requestUrl.searchParams.get('debug') === '1';
    const debugEnabled = process.env.NODE_ENV !== 'production' && debugRequested;

    // if (process.env.NODE_ENV !== 'production') {
    //   console.log('[CardNest callback] decrypted payload:', decryptedData);
    //   console.log('[CardNest callback] decision fields:', {
    //     success: true,
    //     approved,
    //     status: decryptedData?.status,
    //     approved_flag: decryptedData?.approved,
    //     can_process_transaction: decryptedData?.summary?.can_process_transaction,
    //     allow_transaction: decryptedData?.sanction_check?.allow_transaction,
    //     sanction_status: decryptedData?.summary?.sanction_status,
    //     decision: decryptedData?.sanction_check?.decision,
    //   });
    // }

    return Response.json(
      {
        success: true,
        approved,
        session_id: decryptedData?.session_id || null,
        ...(debugEnabled ? { decrypted_payload: decryptedData } : {}),
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error?.message || 'Unable to process CardNest callback payload',
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  return Response.json({
    success: true,
    endpoint: '/api/cardnest/callback',
    method: 'POST',
    configured: Boolean(CARDNEST_ENCRYPTION_KEY),
  });
}
