// app/auth/sign-in/[[...sign-in]]/page.tsx
'use client'

import { SignIn, GoogleOneTap } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <GoogleOneTap />
      <SignIn signUpUrl="/auth/sign-up" />
    </div>
  )
}