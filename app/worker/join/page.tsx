'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Check, LoaderCircle, ShieldCheck } from 'lucide-react'
import { saveWorkerProfile } from '@/app/actions/workers'

export default function WorkerJoinPage() {
  const [submitted, setSubmitted] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setPending(true)
    try {
      await saveWorkerProfile(new FormData(event.currentTarget))
      setSubmitted(true)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Please sign in before creating a worker profile.')
    } finally {
      setPending(false)
    }
  }

  if (submitted) {
    return <main className="grid min-h-screen place-items-center bg-background px-5 text-center"><div className="max-w-md"><span className="mx-auto grid size-16 place-items-center rounded-3xl bg-primary text-primary-foreground"><Check className="size-8" /></span><h1 className="mt-6 font-serif text-4xl font-bold">Your profile is ready for review.</h1><p className="mt-4 leading-7 text-muted-foreground">All your details are saved in SAHAYAK. A cooperative reviewer will verify your profile before matching you with requests.</p><Link href="/" className="mt-8 inline-flex rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground">Back to SAHAYAK</Link></div></main>
  }

  return <main className="min-h-screen bg-background px-5 py-8 text-foreground"><div className="mx-auto max-w-4xl"><Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><ArrowLeft className="size-4" /> Back to SAHAYAK</Link><div className="mt-12 max-w-2xl"><p className="eyebrow">Worker onboarding</p><h1 className="mt-3 font-serif text-5xl font-bold tracking-tight">One profile. More meaningful work.</h1><p className="mt-4 leading-7 text-muted-foreground">Tell us everything once. Your complete profile is saved securely and used for fair, suitable matching.</p></div><form onSubmit={submit} className="mt-10 rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-9"><div className="flex items-start gap-4 border-b border-border pb-6"><span className="grid size-11 place-items-center rounded-2xl bg-secondary text-primary"><ShieldCheck className="size-5" /></span><div><p className="eyebrow">Complete worker profile</p><h2 className="mt-2 font-serif text-3xl font-bold">Your details</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Required fields are marked by the form validation.</p></div></div><div className="mt-8 grid gap-5 sm:grid-cols-2"><Field name="fullName" label="Full name" placeholder="Ravi Kumar" required /><Field name="phone" label="Phone number" placeholder="+91 98765 43210" required type="tel" /><Field name="email" label="Email address" placeholder="you@example.com" required type="email" /><Field name="primarySkill" label="Primary skill" placeholder="Home care specialist" required /><Field name="otherSkills" label="Other skills" placeholder="Cooking, errands, mobility support" /><Field name="experience" label="Experience" placeholder="5 years" required /><Field name="serviceArea" label="Service area" placeholder="Indiranagar, Bengaluru" required /><Field name="languages" label="Languages spoken" placeholder="Hindi, Bengali, English" required /><Field name="certifications" label="Certifications" placeholder="First aid, nursing, training certificates" /><Field name="cooperative" label="Cooperative or group" placeholder="Local cooperative name" /><Field name="availability" label="Availability" placeholder="Weekdays, 9 AM to 6 PM" required /><label className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:col-span-2">About your work<textarea name="about" rows={4} placeholder="Tell households what makes your service thoughtful and reliable" className="mt-2 w-full resize-none rounded-xl border border-input bg-background px-3 py-3 text-sm font-normal normal-case tracking-normal outline-none ring-primary focus:ring-2" /></label></div>{error && <p role="alert" className="mt-6 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}<button disabled={pending} className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 font-semibold text-primary-foreground disabled:opacity-60">{pending && <LoaderCircle className="size-4 animate-spin" />} {pending ? 'Saving profile…' : 'Save worker profile'}</button></form></div></main>
}

function Field({ name, label, placeholder, required = false, type = 'text' }: { name: string; label: string; placeholder: string; required?: boolean; type?: string }) {
  return <label className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}<input name={name} type={type} required={required} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-3 text-sm font-normal normal-case tracking-normal outline-none ring-primary focus:ring-2" /></label>
}
