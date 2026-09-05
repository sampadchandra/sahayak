import Link from 'next/link'
import { ArrowLeft, BadgeCheck, Clock3, MapPin, ShieldCheck, Sparkles } from 'lucide-react'
import { createBooking } from '@/app/actions/bookings'

const services = [
  ['Home cleaning', 'Verified professionals for a calm, cared-for home.', '₹299 onwards'],
  ['Cooking help', 'Daily, weekly, or one-time kitchen support.', '₹399 onwards'],
  ['Elder care', 'Compassionate companions for everyday routines.', '₹499 onwards'],
  ['Electrical repair', 'Trusted help for switches, fans, wiring, and more.', 'Get a quote'],
  ['Plumbing', 'Fast support for leaks, fittings, and maintenance.', 'Get a quote'],
  ['AC & appliance repair', 'Skilled local workers for essential home systems.', 'Get a quote'],
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-8 text-foreground">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><ArrowLeft className="size-4" /> Back to SAHAYAK</Link>
        <div className="mt-12 max-w-2xl"><p className="eyebrow">Service marketplace</p><h1 className="mt-3 font-serif text-5xl font-bold tracking-tight">Help for the work that keeps life moving.</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">Browse trusted services, choose your time, and send a request to verified local workers.</p></div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map(([name, description, price]) => (
            <article key={name} className="rounded-[1.5rem] border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between"><span className="grid size-11 place-items-center rounded-2xl bg-secondary text-primary"><Sparkles className="size-5" /></span><span className="text-sm font-semibold text-primary">{price}</span></div>
              <h2 className="mt-6 font-serif text-2xl font-bold">{name}</h2><p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">{description}</p>
              <form action={createBooking} className="mt-6 flex flex-col gap-3">
                <input type="hidden" name="service" value={name} />
                <label className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Location<input name="location" required placeholder="Neighbourhood or address" className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none ring-primary focus:ring-2" /></label>
                <label className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">When<input name="scheduledFor" type="datetime-local" className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none ring-primary focus:ring-2" /></label>
                <button className="mt-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">Request this service</button>
              </form>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-4 rounded-[1.5rem] bg-primary p-6 text-primary-foreground sm:grid-cols-3"><div className="flex gap-3"><BadgeCheck className="size-5 text-accent" /><span className="text-sm">Verified worker profiles</span></div><div className="flex gap-3"><ShieldCheck className="size-5 text-accent" /><span className="text-sm">Safety support built in</span></div><div className="flex gap-3"><Clock3 className="size-5 text-accent" /><span className="text-sm">Flexible scheduling</span></div></div>
      </div>
    </main>
  )
}
