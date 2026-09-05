'use client'

import { useEffect, useState } from 'react'

const languages = { English: 'EN', हिन्दी: 'HI', বাংলা: 'BN' } as const
export function LanguageSwitcher() {
  const [language, setLanguage] = useState<keyof typeof languages>('English')
  useEffect(() => { const saved = document.cookie.match(/sahayak-language=([^;]+)/)?.[1] as keyof typeof languages | undefined; if (saved && saved in languages) setLanguage(saved) }, [])
  function change(value: keyof typeof languages) { setLanguage(value); document.cookie = `sahayak-language=${value}; path=/; max-age=31536000; samesite=lax`; window.dispatchEvent(new CustomEvent('sahayak-language', { detail: value })) }
  return <label className="inline-flex items-center rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold"><span className="sr-only">Language</span><select value={language} onChange={(event) => change(event.target.value as keyof typeof languages)} className="bg-transparent outline-none"><option>English</option><option>हिन्दी</option><option>বাংলা</option></select><span className="ml-2 text-muted-foreground">{languages[language]}</span></label>
}
