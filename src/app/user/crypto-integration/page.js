'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ExternalLink, AlertCircle } from 'lucide-react';

const CARDNEST_BASE_URL = process.env.NEXT_PUBLIC_CARDNEST_BASE_URL || 'https://crypto.cardnest.io';
const CARDNEST_ORIGIN = new URL(CARDNEST_BASE_URL).origin;

function buildCardNestRedirect(redirectPath) {
  if (typeof redirectPath !== 'string' || !redirectPath.startsWith('/')) {
    throw new Error('CardNest returned an invalid redirect path');
  }

  const base = new URL(CARDNEST_BASE_URL);
  if (base.protocol !== 'https:') {
    throw new Error('CardNest base URL must use HTTPS');
  }

  return `${base.origin}${redirectPath}`;
}

export default function CryptoIntegrationPage() {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');

  const processCardNestPayload = async (payload) => {
    if (!payload?.encrypted_data) {
      throw new Error('Missing encrypted_data in CardNest callback payload');
    }

    const callbackResponse = await fetch('/api/cardnest/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        encrypted_data: payload.encrypted_data,
        status: payload.status,
      }),
    });

    const callbackData = await callbackResponse.json();
    if (!callbackResponse.ok || !callbackData?.success) {
      throw new Error(callbackData?.error || 'CardNest callback processing failed');
    }

    if (callbackData.approved === true) {
      router.push('/success-crypto');
      return;
    }

    router.push('/failed-crypto');
  };

  useEffect(() => {
    window.handleApiResponse = async (jsonString) => {
      try {
        const payload = JSON.parse(jsonString);
        await processCardNestPayload(payload);
      } catch (err) {
        setError(err?.message || 'Invalid callback payload received from CardNest');
      }
    };

    const onMessage = async (event) => {
      try {
        if (event.origin !== CARDNEST_ORIGIN) {
          return;
        }

        const messageEnvelope = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        if (
          messageEnvelope?.source !== 'cardnest-crypto-validation' ||
          messageEnvelope?.type !== 'handleApiResponse'
        ) {
          return;
        }

        let payload = null;
        if (messageEnvelope?.encrypted_data) {
          payload = {
            encrypted_data: messageEnvelope.encrypted_data,
            status: messageEnvelope.status,
          };
        } else if (typeof messageEnvelope?.data === 'string') {
          payload = JSON.parse(messageEnvelope.data);
        } else if (messageEnvelope?.data && typeof messageEnvelope.data === 'object') {
          payload = messageEnvelope.data;
        }

        if (!payload?.encrypted_data) {
          return;
        }

        await processCardNestPayload(payload);
      } catch (err) {
        setError(err?.message || 'Unable to process CardNest callback message');
      }
    };

    window.addEventListener('message', onMessage);

    return () => {
      window.removeEventListener('message', onMessage);
      delete window.handleApiResponse;
    };
  }, [router]);

  const startValidation = async () => {
    setIsStarting(true);
    setError('');

    try {
      const response = await fetch('/api/cardnest/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success || !data.redirect_to) {
        throw new Error(data.error || 'Unable to start CardNest validation session');
      }

      setIframeUrl(buildCardNestRedirect(data.redirect_to));
      setIsStarting(false);
    } catch (err) {
      setError(err.message || 'Unable to start validation session');
      setIsStarting(false);
    }
  };

  return (
    <div className="min-h-full bg-black text-white p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="rounded-2xl border border-gray-700 bg-slate-900/70 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-green-400" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">CardNest Crypto Validation</h1>
          </div>

          <p className="text-gray-300 leading-relaxed">
            Validate recipient wallet addresses in CardNest before transfer completion. This opens a
            secure one-time session where CardNest verifies access, checks the wallet address, and
            returns an approval or rejection result.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gray-700 bg-slate-950/70 p-4">
              <h2 className="font-semibold mb-2">Flow</h2>
              <ol className="list-decimal list-inside text-sm text-gray-300 space-y-2">
                <li>Your app creates a secure CardNest session on the server.</li>
                <li>CardNest returns a one-time session identifier.</li>
                <li>Frontend appends CardNest base URL + returned redirect path.</li>
                <li>CardNest returns encrypted callback data after validation.</li>
              </ol>
            </div>

            <div className="rounded-xl border border-gray-700 bg-slate-950/70 p-4">
              <h2 className="font-semibold mb-2">Security Notes</h2>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
                <li>Merchant credentials are never exposed in the browser.</li>
                <li>Session IDs are short-lived and one-time use.</li>
                <li>Continue transfers only when validation is approved.</li>
                <li>Use HTTPS for all redirects and API requests.</li>
              </ul>
            </div>
          </div>

          {error && (
            <div className="mt-5 flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-red-300">
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={startValidation}
              disabled={isStarting}
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              {isStarting ? 'Starting secure session...' : 'Start CardNest Validation'}
            </button>

            <p className="text-sm text-gray-400">
              This action loads the CardNest hosted validation page inside this screen.
            </p>
          </div>

          {iframeUrl && (
            <div className="mt-6 rounded-xl border border-gray-700 bg-slate-950/70 p-2">
              <iframe
                title="CardNest Validation"
                src={iframeUrl}
                className="h-[70vh] w-full rounded-lg"
                allow="clipboard-read; clipboard-write"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
