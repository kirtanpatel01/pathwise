// app/auth-code-error/page.tsx or similar
'use client'; // This is a client component in React/Next.js

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthCodeErrorPage() {
  const searchParams = useSearchParams();
  const errorDescription = searchParams.get('error_description') || 'An unexpected error occurred.';
  const errorCode = searchParams.get('error_code');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-5">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Authentication Error</h1>
        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Error Code:</span> {errorCode ? errorCode : 'N/A'}
        </p>
        <p className="text-gray-700 mb-8">
          <span className="font-semibold">Details:</span> {errorDescription}
        </p>
        <Link href="/login" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
          Go to Login
        </Link>
      </div>
    </div>
  );
}
