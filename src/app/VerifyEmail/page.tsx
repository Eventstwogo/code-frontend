'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // const token = searchParams.get('token');
    // if (!token) {
    //   setStatus('error');
    //   setMessage('Invalid or missing verification token.');
    //   return;
    // }

    const verify = async () => {
    //   try {
        // await axios.post('/api/verify-email', { token });
        setStatus('success');
    //   } catch (err) {
    //     setStatus('error');
    //     setMessage('Verification failed. The link may be invalid or expired.');
    //   }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {status === 'loading' && (
        <div className="max-w-sm w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Verifying Email...</h1>
          <p className="text-gray-600">Please wait while we verify your email address.</p>
        </div>
      )}

      {status === 'success' && (
        <div className="max-w-sm w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" strokeWidth={1.5} />
          <h1 className="text-2xl font-bold mb-2">Email Verified</h1>
          <p className="text-gray-600 mb-6">
            Your email address was successfully verified.
          </p>
          <Link
            href="/login"
            className="inline-block w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Back to Login
          </Link>
        </div>
      )}

      {status === 'error' && (
        <div className="max-w-sm w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" strokeWidth={1.5} />
          <h1 className="text-2xl font-bold mb-2">Verification Failed</h1>
          <p className="text-gray-600 mb-6">{message}</p>
          <Link
            href="/resend-verification"
            className="inline-block w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Resend Verification Email
          </Link>
        </div>
      )}
    </div>
  );
}
