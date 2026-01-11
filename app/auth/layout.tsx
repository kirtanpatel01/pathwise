import { ModeToggle } from '@/components/mode-toggle'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative'>
      <ModeToggle className="absolute top-4 right-4" />
      {children}
    </div>
  )
}

export default layout