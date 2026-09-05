import Link from 'next/link'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ArrowLeft, CalendarDays, HeartHandshake, LogOut, ShieldCheck } from 'lucide-react'
import { auth } from '@/lib/auth'
import { AccountActions } from '@/components/account-actions'

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')
  return (
    <main className="min-h-screen bg-background px-5 py-8 text-foreground">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><ArrowLeft className="size-4" /> Back to SAHAYAK</Link>
        <div className="mt-8 flex items-start justify-between gap-5"><div><p className="eyebrow">Your trusted circle</p><h1 className="mt-2 font-serif text-4xl font-bold">Hello, {session.user.name.split(' ')[0]}</h1><p className="mt-2 text-muted-foreground">{session.user.email}</p></div><span className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground"><HeartHandshake className="size-7" /></span></div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-border bg-card p-5"><CalendarDays className="size-5 text-primary" /><p className="mt-6 font-semibold">Bookings</p><p className="mt-1 text-sm text-muted-foreground">Manage upcoming help</p></div><div className="rounded-2xl border border-border bg-card p-5"><ShieldCheck className="size-5 text-primary" /><p className="mt-6 font-semibold">Safety centre</p><p className="mt-1 text-sm text-muted-foreground">Your protection tools</p></div><div className="rounded-2xl border border-border bg-card p-5"><LogOut className="size-5 text-primary" /><p className="mt-6 font-semibold">Session</p><p className="mt-1 text-sm text-muted-foreground">Signed in securely</p></div></div>
        <AccountActions />
      </div>
    </main>
  )
}
