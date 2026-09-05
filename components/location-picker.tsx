'use client'

import { useMemo, useState } from 'react'
import { LocateFixed, MapPin, ExternalLink } from 'lucide-react'

const cities = ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Kolkata']

export function LocationPicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [busy, setBusy] = useState(false)
  const query = value.split(' | ')[0] || 'Kolkata'
  const mapUrl = useMemo(() => `https://www.google.com/maps?q=${encodeURIComponent(query)}`, [query])

  function locate() {
    if (!navigator.geolocation) return
    setBusy(true)
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const url = `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`
        onChange(`${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)} | ${url}`)
        setBusy(false)
      },
      () => setBusy(false),
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  return <div className="flex flex-col gap-3">
    <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-3 py-2">
      <MapPin className="size-4 shrink-0 text-primary" />
      <select aria-label="Choose city" value={cities.includes(query) ? query : ''} onChange={(event) => onChange(event.target.value)} className="w-32 bg-transparent text-sm font-medium outline-none">
        <option value="" disabled>Choose city</option>
        {cities.map((city) => <option key={city} value={city}>{city}</option>)}
      </select>
      <input value={query} onChange={(event) => onChange(event.target.value)} placeholder="Area or address" className="min-w-0 flex-1 bg-transparent text-sm outline-none" required />
      <button type="button" onClick={locate} className="rounded-full p-2 text-primary hover:bg-muted" aria-label="Use current location" title="Use current location"><LocateFixed className={`size-4 ${busy ? 'animate-pulse' : ''}`} /></button>
    </div>
    <div className="overflow-hidden rounded-2xl border border-border bg-muted">
      <iframe title={`Google Maps location for ${query}`} src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`} className="h-44 w-full border-0" loading="lazy" />
      <a href={mapUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 border-t border-border bg-card px-3 py-2 text-xs font-semibold text-primary"><ExternalLink className="size-3" /> Open in Google Maps</a>
    </div>
  </div>
}
