'use client'

import { useLanguage, type Language } from '@/components/language-provider'

const languages: { value: Language; label: string; code: string }[] = [
  { value: 'English', label: 'English', code: 'EN' },
  { value: 'हिन्दी', label: 'हिन्दी', code: 'HI' },
  { value: 'বাংলা', label: 'বাংলা', code: 'BN' },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  return <label className="inline-flex items-center rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold"><span className="sr-only">Language</span><select value={language} onChange={(event) => setLanguage(event.target.value as Language)} className="bg-transparent outline-none">{languages.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select><span className="ml-2 text-muted-foreground">{languages.find((item) => item.value === language)?.code}</span></label>
}
