'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

type AuthFormProps = { mode: 'sign-in' | 'sign-up' }

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const isSignUp = mode === 'sign-up'

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setPending(true)
    try {
      const result = isSignUp
        ? await authClient.signUp.email({ name: name.trim(), email: email.trim().toLowerCase(), password })
        : await authClient.signIn.email({ email: email.trim().toLowerCase(), password })
      if (result.error) {
        setError(isSignUp ? 'This email may already be registered, or the details are not valid.' : 'Email or password is incorrect. Please try again.')
        return
      }
      router.push('/')
      router.refresh()
    } catch {
      setError('We could not connect to SAHAYAK right now. Please try again.')
    } finally {
      setPending(false)
    }
  }

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-foreground sm:grid sm:place-items-center">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-10 flex items-center gap-3">
          <Image src="/sahayak-logo.png" alt="SAHAYAK" width={170} height={52} className="h-12 w-auto object-contain object-left" priority />
        </Link>
        <div className="rounded-[2rem] border border-border bg-card p-6 shadow-xl sm:p-8">
          <p className="eyebrow">Your trusted circle</p>
          <h1 className="mt-2 font-serif text-4xl font-bold">{isSignUp ? 'Create your account' : 'Welcome back'}</h1>
          <p className="mt-3 leading-6 text-muted-foreground">{isSignUp ? 'Book help, save preferences, and get support in one place.' : 'Sign in to manage bookings and stay connected with your SAHAYAK team.'}</p>
          <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
            {isSignUp && <label className="flex flex-col gap-2 text-sm font-semibold">Full name<input required value={name} onChange={(event) => setName(event.target.value)} className="rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none ring-primary focus:ring-2" placeholder="Your name" /></label>}
            <label className="flex flex-col gap-2 text-sm font-semibold">Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none ring-primary focus:ring-2" placeholder="you@example.com" /></label>
            <label className="flex flex-col gap-2 text-sm font-semibold">Password<input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none ring-primary focus:ring-2" placeholder="At least 8 characters" /></label>
            {error && <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}
            <button disabled={pending} className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 font-semibold text-primary-foreground disabled:opacity-60">{pending ? <LoaderCircle className="size-4 animate-spin" /> : null}{isSignUp ? 'Create account' : 'Sign in'}{!pending && <ArrowRight className="size-4" />}</button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">{isSignUp ? 'Already have an account?' : 'New to SAHAYAK?'} <Link className="font-semibold text-primary hover:underline" href={isSignUp ? '/sign-in' : '/sign-up'}>{isSignUp ? 'Sign in' : 'Create one'}</Link></p>
        </div>
      </div>
    </main>
  )
}
