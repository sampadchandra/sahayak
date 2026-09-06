'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { workerProfile } from '@/lib/db/worker-schema'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function saveWorkerProfile(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')

  const required = ['fullName', 'phone', 'email', 'primarySkill', 'experience', 'serviceArea', 'languages', 'availability']
  const values = Object.fromEntries(required.map((key) => [key, String(formData.get(key) ?? '').trim()]))
  if (required.some((key) => !values[key])) throw new Error('Please complete all required fields.')
  if (values.fullName.length > 120 || values.phone.length > 40 || values.email.length > 320 || values.primarySkill.length > 120 || values.experience.length > 120 || values.serviceArea.length > 160 || values.languages.length > 160 || values.availability.length > 120) throw new Error('Profile details are too long.')

  const record = {
    userId: session.user.id,
    fullName: values.fullName,
    phone: values.phone,
    email: values.email,
    primarySkill: values.primarySkill,
    otherSkills: String(formData.get('otherSkills') ?? '').trim() || null,
    experience: values.experience,
    serviceArea: values.serviceArea,
    languages: values.languages,
    certifications: String(formData.get('certifications') ?? '').trim() || null,
    cooperative: String(formData.get('cooperative') ?? '').trim() || null,
    availability: values.availability,
    updatedAt: new Date(),
  }

  const existing = await db.select({ id: workerProfile.id }).from(workerProfile).where(eq(workerProfile.userId, session.user.id)).limit(1)
  if (existing[0]) {
    await db.update(workerProfile).set(record).where(eq(workerProfile.userId, session.user.id))
  } else {
    await db.insert(workerProfile).values({ id: crypto.randomUUID(), ...record })
  }

  revalidatePath('/worker/join')
  revalidatePath('/cooperative')
  return { ok: true }
}
