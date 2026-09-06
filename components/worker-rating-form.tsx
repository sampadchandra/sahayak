'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { submitWorkerRating } from '@/app/actions/ratings'

export function WorkerRatingForm({ bookingId, workerId }: { bookingId: string; workerId: string }) {
  const [selected, setSelected] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(formData: FormData) {
    setError('')
    try {
      await submitWorkerRating(formData)
      setSubmitted(true)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not save rating')
    }
  }

  if (submitted) return <p className="text-sm font-semibold text-primary">Thanks for rating this worker.</p>

  return <form action={handleSubmit} className="mt-3 rounded-xl border border-border bg-card p-3">
    <input type="hidden" name="bookingId" value={bookingId} />
    <input type="hidden" name="workerId" value={workerId} />
    <p className="text-sm font-semibold">Rate your completed service</p>
    <div className="mt-2 flex items-center gap-1" aria-label="Choose a rating from 1 to 5 stars">
      {[1, 2, 3, 4, 5].map((value) => <button key={value} type="button" aria-label={`${value} star${value === 1 ? '' : 's'}`} onClick={() => setSelected(value)} className="rounded p-1 text-primary transition hover:scale-110"><Star className={value <= selected ? 'size-5 fill-current' : 'size-5'} /></button>)}
    </div>
    <input type="hidden" name="rating" value={selected} />
    <textarea name="review" maxLength={1000} placeholder="Share a short review (optional)" className="mt-2 min-h-16 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
    {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}
    <button type="submit" disabled={!selected} className="mt-3 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50">Submit rating</button>
  </form>
}
