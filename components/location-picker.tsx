'use client'

import { useState } from 'react'
import { LocateFixed, MapPin } from 'lucide-react'

export function LocationPicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [busy, setBusy] = useState(false)
  function locate() { setBusy(true); navigator.geolocation?.getCurrentPosition((position) => { const { latitude, longitude } = position.coords; onChange(`${latitude.toFixed(5)}, ${longitude.toFixed(5)} | https://www.google.com/maps?q=${latitude},${longitude}`); setBusy(false) }, () => setBusy(false)) }
  return <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-3 py-2"><MapPin className="size-4 shrink-0 text-primary" /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Area or address" className="min-w-0 flex-1 bg-transparent text-sm outline-none" required /><button type="button" onClick={locate} className="rounded-full p-2 text-primary hover:bg-muted" aria-label="Use current location" title="Use current location"><LocateFixed className={`size-4 ${busy ? 'animate-pulse' : ''}`} /></button></div>
}
