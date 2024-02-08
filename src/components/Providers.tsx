'use client'

import ActiveSectionContextProvider from '@/context/active-section-context'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <ActiveSectionContextProvider>
      {children}
    </ActiveSectionContextProvider>
  )
}