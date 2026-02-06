'use client'

import { SignUp, useUser } from '@clerk/nextjs'

export default function Home() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex justify-center items-center p-4">
        <SignUp signInUrl='/auth/sign-in' />
      </div>
    )
  }

  return <div>Welcome!</div>
}
