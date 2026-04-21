'use client';

import { useState } from 'react';
import { ShieldCheck, ExternalLink, AlertCircle } from 'lucide-react';

export default function CryptoIntegrationPage() {
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState('');

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

      window.location.href = data.redirect_to;
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
                <li>You are redirected to the CardNest validation screen.</li>
                <li>CardNest returns approved or rejected status.</li>
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
              This action opens the CardNest hosted validation page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
