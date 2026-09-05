'use client'

import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export function AccountActions() {
  const router = useRouter()
  async function signOut() {
    await authClient.signOut()
    router.push('/sign-up')
    router.refresh()
  }
  return <button onClick={signOut} className="mt-8 rounded-full border border-border px-5 py-3 text-sm font-semibold hover:bg-muted">Sign out</button>
}
