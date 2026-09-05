'use client'

import { useRef, useState } from 'react'
import { LoaderCircle, MapPin, Clock3 } from 'lucide-react'
import { createBooking } from '@/app/actions/bookings'

export function BookingForm({ service, location, onClose, onSuccess }: { service: string; location: string; onClose: () => void; onSuccess: (message: string) => void }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  async function submit(formData: FormData) {
    setPending(true)
    setError('')
    try {
      await createBooking(formData)
      formRef.current?.reset()
      onClose()
      onSuccess('Request saved — we are matching you with a trusted worker')
    } catch (requestError) {
      if (requestError && typeof requestError === 'object' && 'digest' in requestError && String(requestError.digest).startsWith('NEXT_REDIRECT')) throw requestError
      setError('Please sign in to save your request, then try again.')
    } finally {
      setPending(false)
    }
  }

  return <form ref={formRef} action={submit} className="mt-6 flex flex-col gap-4">
    <input type="hidden" name="service" value={service} />
    <input type="hidden" name="location" value={location} />
    <label className="flex flex-col gap-2 text-sm font-semibold">Preferred date and time<input name="scheduledFor" type="datetime-local" required className="rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none ring-primary focus:ring-2" /></label>
    <label className="flex flex-col gap-2 text-sm font-semibold">Anything we should know?<textarea name="notes" rows={3} className="resize-none rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none ring-primary focus:ring-2" placeholder="Access instructions, preferences, or context" /></label>
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-4 text-sm"><div className="flex items-center gap-3"><MapPin className="size-4 text-primary" /><span>{location} service location</span></div><div className="flex items-center gap-3"><Clock3 className="size-4 text-primary" /><span>We will confirm the exact worker and price with you</span></div></div>
    {error && <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}
    <div className="flex items-center justify-between border-t border-border pt-5"><div><p className="text-xs text-muted-foreground">Estimated starting price</p><p className="font-serif text-2xl font-bold">₹399</p></div><button type="submit" disabled={pending} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:opacity-60">{pending && <LoaderCircle className="size-4 animate-spin" />} {pending ? 'Saving...' : 'Request help'}</button></div>
  </form>
}
