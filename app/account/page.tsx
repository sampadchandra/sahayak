import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, CalendarDays, HeartHandshake, LogOut, ShieldCheck, Sparkles } from 'lucide-react'
import { auth } from '@/lib/auth'
import { AccountActions } from '@/components/account-actions'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')
  const firstName = session.user.name.split(' ')[0]
  return <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 sm:py-8"><div className="mx-auto max-w-5xl">
    <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><ArrowLeft className="size-4" /> Back to SAHAYAK</Link>
    <header className="mt-8 rounded-[1.5rem] border border-border bg-card p-5 sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Your account</p><h1 className="mt-2 font-serif text-3xl font-bold sm:text-5xl">Hello, {firstName}</h1><p className="mt-2 break-all text-sm text-muted-foreground">{session.user.email}</p></div><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground sm:size-14"><HeartHandshake className="size-6 sm:size-7" /></span></div><div className="mt-6 flex items-center gap-2 rounded-xl bg-primary/5 p-3 text-sm"><Sparkles className="size-4 shrink-0 text-primary" /><span>Your account is ready for safe, simple bookings.</span></div></header>
    <section className="mt-5 grid gap-3 sm:grid-cols-3"><Link href="/dashboard" className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/40"><CalendarDays className="size-5 text-primary" /><div className="mt-5 flex items-center justify-between gap-2"><p className="font-semibold">Bookings</p><ArrowUpRight className="size-4 text-muted-foreground transition group-hover:text-primary" /></div><p className="mt-1 text-sm text-muted-foreground">Manage requests and updates</p></Link><div className="rounded-2xl border border-border bg-card p-5"><ShieldCheck className="size-5 text-primary" /><p className="mt-5 font-semibold">Safety centre</p><p className="mt-1 text-sm text-muted-foreground">Your protection tools</p></div><div className="rounded-2xl border border-border bg-card p-5"><LogOut className="size-5 text-primary" /><p className="mt-5 font-semibold">Session</p><p className="mt-1 text-sm text-muted-foreground">Signed in securely</p></div></section>
    <section className="mt-5 rounded-[1.5rem] border border-border bg-card p-5 sm:p-6"><p className="eyebrow">Account controls</p><h2 className="mt-2 font-serif text-2xl font-bold">Manage your access</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Sign out here when you are finished using this device.</p><div className="mt-5"><AccountActions /></div></section>
  </div></main>
}
