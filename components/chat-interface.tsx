'use client'

import { useState } from 'react'
import { MapPin, Send } from 'lucide-react'
import { sendMessage } from '@/app/actions/messaging'

export function ChatInterface({ conversationId, initialMessages, currentUserId }: { conversationId: string; initialMessages: Array<{ id: string; senderId: string; body: string | null; locationUrl: string | null; messageType: string }>; currentUserId: string }) {
  const [messages, setMessages] = useState(initialMessages)
  const [body, setBody] = useState('')
  const [pending, setPending] = useState(false)
  async function submit(event: React.FormEvent) { event.preventDefault(); if (!body.trim()) return; setPending(true); const formData = new FormData(); formData.set('conversationId', conversationId); formData.set('body', body); await sendMessage(formData); setMessages([...messages, { id: crypto.randomUUID(), senderId: currentUserId, body, locationUrl: null, messageType: 'text' }]); setBody(''); setPending(false) }
  async function shareLocation() { navigator.geolocation?.getCurrentPosition(async ({ coords }) => { const url = `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`; const formData = new FormData(); formData.set('conversationId', conversationId); formData.set('locationUrl', url); await sendMessage(formData); setMessages([...messages, { id: crypto.randomUUID(), senderId: currentUserId, body: 'Shared live location', locationUrl: url, messageType: 'location' }]) }) }
  return <div className="flex min-h-[540px] flex-col rounded-[2rem] border border-border bg-card p-4 shadow-sm"><div className="flex-1 space-y-3 overflow-y-auto p-2">{messages.map((item) => <div key={item.id} className={`flex ${item.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm ${item.senderId === currentUserId ? 'rounded-br-md bg-primary text-primary-foreground' : 'rounded-bl-md bg-muted'}`}>{item.body}{item.locationUrl && <a href={item.locationUrl} target="_blank" rel="noreferrer" className="mt-2 flex items-center gap-2 font-semibold underline"><MapPin className="size-4" />Open in Google Maps</a>}</div></div>)}</div><form onSubmit={submit} className="mt-3 flex items-center gap-2 border-t border-border pt-3"><button type="button" onClick={shareLocation} className="rounded-full p-3 text-primary hover:bg-muted" aria-label="Share location"><MapPin className="size-5" /></button><input value={body} onChange={(event) => setBody(event.target.value)} placeholder="Write a message..." className="min-w-0 flex-1 rounded-full bg-muted px-4 py-3 text-sm outline-none" /><button disabled={pending} className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground"><Send className="size-4" /></button></form></div>
}
