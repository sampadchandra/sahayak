import Link from 'next/link'
import { AlertCircle, ArrowUpRight, CalendarDays, CheckCircle2, CircleHelp, Clock3, Heart, MapPin, ShieldCheck, Sparkles } from 'lucide-react'
import { auth } from '@/lib/auth'
import { getMyBookings } from '@/app/actions/bookings'
import { WorkerRatingForm } from '@/components/worker-rating-form'
import { getMyAlerts } from '@/app/actions/alerts'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const statusCopy: Record<string, { label: string; className: string }> = {
  REQUESTED: { label: 'Awaiting match', className: 'bg-amber-500/15 text-amber-700 dark:text-amber-300' },
  CONFIRMED: { label: 'Confirmed', className: 'bg-blue-500/15 text-blue-700 dark:text-blue-300' },
  IN_PROGRESS: { label: 'In progress', className: 'bg-primary/15 text-primary' },
  COMPLETED: { label: 'Completed', className: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' },
  CANCELLED: { label: 'Cancelled', className: 'bg-muted text-muted-foreground' },
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')
  const [bookings, alerts] = await Promise.all([getMyBookings(), getMyAlerts()])
  const active = bookings.filter((item) => ['REQUESTED', 'CONFIRMED', 'IN_PROGRESS'].includes(item.status))
  const completed = bookings.filter((item) => item.status === 'COMPLETED')
  const firstName = session.user.name.split(' ')[0]

  return <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 sm:py-8">
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="eyebrow">Customer workspace</p><h1 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-5xl">Good to see you, {firstName}.</h1><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">Everything you need to stay on top of your help, in one calm place.</p></div>
        <Link href="/services" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground sm:w-auto">Book a service <ArrowUpRight className="size-4" /></Link>
      </header>

      <section className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <SummaryCard icon={CalendarDays} label="Total bookings" value={String(bookings.length)} detail="All requests" />
        <SummaryCard icon={Clock3} label="In progress" value={String(active.length)} detail="Need your attention" />
        <SummaryCard icon={CheckCircle2} label="Completed" value={String(completed.length)} detail="Ready to review" />
        <SummaryCard icon={Heart} label="Trusted circle" value="0" detail="Save a worker" />
      </section>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
        <section id="bookings" className="rounded-[1.5rem] border border-border bg-card p-4 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Your activity</p><h2 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">Bookings</h2></div><Link href="/services" className="hidden text-sm font-semibold text-primary sm:inline-flex sm:items-center sm:gap-1">New booking <ArrowUpRight className="size-4" /></Link></div>
          {active.length > 0 && <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/5 p-4"><div className="flex gap-3"><Sparkles className="mt-0.5 size-5 shrink-0 text-primary" /><div><p className="font-semibold">Your booking is moving</p><p className="mt-1 text-sm leading-6 text-muted-foreground">We&apos;ll alert you here when a verified worker confirms your request.</p></div></div></div>}
          {bookings.length ? <div className="mt-5 flex flex-col gap-3">{bookings.map((item) => { const status = statusCopy[item.status] ?? statusCopy.REQUESTED; return <article key={item.id} className="rounded-2xl border border-border bg-background p-4"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate font-semibold">{item.service}</p><p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="size-3.5 shrink-0" /> {item.location}</p></div><span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${status.className}`}>{status.label}</span></div><div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3 text-xs text-muted-foreground"><span>{item.createdAt.toLocaleDateString()}</span>{item.status === 'COMPLETED' && item.workerId ? <WorkerRatingForm bookingId={item.id} workerId={item.workerId} /> : <span>{item.status === 'REQUESTED' ? 'Finding the right worker' : 'We&apos;ll keep you updated'}</span>}</div></article> })}</div> : <EmptyBookings />}
        </section>

        <aside className="flex flex-col gap-4">
          <div className="rounded-[1.5rem] border border-border bg-primary p-5 text-primary-foreground sm:p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] opacity-75">Alerts</p><h2 className="mt-2 font-serif text-2xl font-bold">Stay in the loop.</h2></div><AlertCircle className="size-5" /></div><p className="mt-3 text-sm leading-6 opacity-85">Booking updates, worker messages, and safety reminders will appear here.</p><div className="mt-5 rounded-xl bg-primary-foreground/10 p-3 text-sm"><p className="font-semibold">{alerts.length ? `${alerts.length} alert${alerts.length === 1 ? '' : 's'}` : 'You are all caught up'}</p>{alerts.slice(0, 3).map((item) => <div key={item.id} className="mt-3 border-t border-primary-foreground/15 pt-3"><p className="font-semibold">{item.title}</p><p className="mt-1 text-xs opacity-75">{item.body}</p></div>)}</div></div>
          <InfoCard icon={ShieldCheck} title="Safety centre" text="Every worker is verified. Keep conversations and payments inside Sahayak." />
          <InfoCard icon={CircleHelp} title="Need a hand?" text="Our support team is here if a booking does not go as planned." href="/help" />
        </aside>
      </div>
    </div>
  </main>
}

function SummaryCard({ icon: Icon, label, value, detail }: { icon: typeof CalendarDays; label: string; value: string; detail: string }) { return <div className="rounded-2xl border border-border bg-card p-4 sm:p-5"><Icon className="size-5 text-primary" /><p className="mt-4 text-xs font-semibold text-muted-foreground">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div> }
function InfoCard({ icon: Icon, title, text, href }: { icon: typeof ShieldCheck; title: string; text: string; href?: string }) { const content = <div className="rounded-2xl border border-border bg-card p-5"><Icon className="size-5 text-primary" /><p className="mt-4 font-semibold">{title}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div>; return href ? <Link href={href}>{content}</Link> : content }
function EmptyBookings() { return <div className="mt-6 rounded-2xl border border-dashed border-border p-6 text-center"><CalendarDays className="mx-auto size-7 text-primary" /><p className="mt-3 font-semibold">No bookings yet</p><p className="mt-1 text-sm text-muted-foreground">Find a trusted local worker when you need help.</p><Link href="/services" className="mt-4 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Explore services</Link></div> }

