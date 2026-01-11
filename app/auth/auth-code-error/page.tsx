'use client';

export const dynamic = 'force-dynamic';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthCodeErrorPage() {
  const searchParams = useSearchParams();

  const errorDescription =
    searchParams.get('error_description') ??
    'An unexpected authentication error occurred.';

  const errorCode = searchParams.get('error_code');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Authentication Error</h1>

        <p className="mb-2">
          <strong>Error Code:</strong> {errorCode ?? 'N/A'}
        </p>

        <p className="mb-6">
          <strong>Details:</strong> {errorDescription}
        </p>

        <Link
          href="/auth/login"
          className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
