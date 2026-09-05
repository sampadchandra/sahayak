import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { getMessages } from '@/app/actions/messaging'
import { ChatInterface } from '@/components/chat-interface'

export default async function MessagesPage({ params }: { params: Promise<{ conversationId: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-up')
  const { conversationId } = await params
  const messages = await getMessages(conversationId)
  return <main className="min-h-screen bg-background px-5 py-10"><div className="mx-auto max-w-2xl"><p className="eyebrow">Private care chat</p><h1 className="mt-2 font-serif text-4xl font-bold">Message your match</h1><p className="mt-3 text-muted-foreground">Coordinate safely, share updates, and send a location when needed.</p><div className="mt-8"><ChatInterface conversationId={conversationId} initialMessages={messages} currentUserId={session.user.id} /></div></div></main>
}
