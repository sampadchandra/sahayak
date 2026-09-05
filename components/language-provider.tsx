'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Language = 'English' | 'हिन्दी' | 'বাংলা'
type CopyKey = keyof typeof copy.English

const copy = {
  English: {
    'Find help': 'Find help', 'How it works': 'How it works', 'For workers': 'For workers', 'Our impact': 'Our impact', 'Sign in': 'Sign in', 'Get started': 'Get started',
    'Trusted help.': 'Trusted help.', 'Fair work.': 'Fair work.', 'Better lives.': 'Better lives.',
    'Find trusted help': 'Find trusted help', 'See how it works': 'See how it works', 'Verified workers': 'Verified workers', 'Safety first': 'Safety first', 'Fair earnings': 'Fair earnings',
    'What do you need help with?': 'What do you need help with?', 'Change': 'Change', 'No hidden fees. You choose who comes to your home.': 'No hidden fees. You choose who comes to your home.',
    'Simple by design': 'Simple by design', 'Support that starts with trust.': 'Support that starts with trust.', 'Tell us what you need': 'Tell us what you need', 'Meet your match': 'Meet your match', 'Feel looked after': 'Feel looked after',
    'Smart matching': 'Smart matching', 'The right person makes all the difference.': 'The right person makes all the difference.', 'Match preferences': 'Match preferences', 'Find my match': 'Find my match',
    'Your trusted circle': 'Your trusted circle', 'A simple view of every booking': 'A simple view of every booking', 'For workers and cooperatives': 'For workers and cooperatives', 'Join as a worker': 'Join as a worker',
    'Need a little help today?': 'Need a little help today?', 'Start with one simple request. We will take it from there.': 'Start with one simple request. We will take it from there.',
  },
  'हिन्दी': {
    'Find help': 'मदद खोजें', 'How it works': 'यह कैसे काम करता है', 'For workers': 'वर्कर्स के लिए', 'Our impact': 'हमारा प्रभाव', 'Sign in': 'साइन इन', 'Get started': 'शुरू करें',
    'Trusted help.': 'भरोसेमंद मदद।', 'Fair work.': 'न्यायपूर्ण काम।', 'Better lives.': 'बेहतर जीवन।', 'Find trusted help': 'भरोसेमंद मदद खोजें', 'See how it works': 'देखें कैसे काम करता है', 'Verified workers': 'सत्यापित वर्कर्स', 'Safety first': 'सुरक्षा पहले', 'Fair earnings': 'न्यायपूर्ण कमाई',
    'What do you need help with?': 'आपको किस मदद की ज़रूरत है?', 'Change': 'बदलें', 'No hidden fees. You choose who comes to your home.': 'कोई छिपा शुल्क नहीं। आपके घर कौन आएगा, यह आप चुनते हैं।', 'Simple by design': 'सरलता से बनाया गया', 'Support that starts with trust.': 'भरोसे से शुरू होने वाली मदद।', 'Tell us what you need': 'अपनी ज़रूरत बताएं', 'Meet your match': 'अपना मैच पाएं', 'Feel looked after': 'अपनापन महसूस करें',
    'Smart matching': 'स्मार्ट मैचिंग', 'The right person makes all the difference.': 'सही व्यक्ति सब कुछ बदल देता है।', 'Match preferences': 'मैच प्राथमिकताएं', 'Find my match': 'मेरा मैच खोजें', 'Your trusted circle': 'आपका भरोसेमंद सर्कल', 'A simple view of every booking': 'हर बुकिंग का सरल दृश्य', 'For workers and cooperatives': 'वर्कर्स और सहकारी समितियों के लिए', 'Join as a worker': 'वर्कर के रूप में जुड़ें', 'Need a little help today?': 'आज थोड़ी मदद चाहिए?', 'Start with one simple request. We will take it from there.': 'एक आसान अनुरोध से शुरू करें। आगे हम संभाल लेंगे।',
  },
  'বাংলা': {
    'Find help': 'সাহায্য খুঁজুন', 'How it works': 'কীভাবে কাজ করে', 'For workers': 'কর্মীদের জন্য', 'Our impact': 'আমাদের প্রভাব', 'Sign in': 'সাইন ইন', 'Get started': 'শুরু করুন',
    'Trusted help.': 'বিশ্বস্ত সাহায্য।', 'Fair work.': 'ন্যায্য কাজ।', 'Better lives.': 'উন্নত জীবন।', 'Find trusted help': 'বিশ্বস্ত সাহায্য খুঁজুন', 'See how it works': 'কীভাবে কাজ করে দেখুন', 'Verified workers': 'যাচাই করা কর্মী', 'Safety first': 'নিরাপত্তা আগে', 'Fair earnings': 'ন্যায্য উপার্জন',
    'What do you need help with?': 'আপনার কী সাহায্য দরকার?', 'Change': 'পরিবর্তন করুন', 'No hidden fees. You choose who comes to your home.': 'কোনও লুকানো খরচ নেই। আপনার বাড়িতে কে আসবে তা আপনি বেছে নিন।', 'Simple by design': 'সহজভাবে তৈরি', 'Support that starts with trust.': 'বিশ্বাস দিয়ে শুরু হওয়া সহায়তা।', 'Tell us what you need': 'আপনার প্রয়োজন জানান', 'Meet your match': 'আপনার ম্যাচের সঙ্গে দেখা করুন', 'Feel looked after': 'যত্নের অনুভূতি পান',
    'Smart matching': 'স্মার্ট ম্যাচিং', 'The right person makes all the difference.': 'সঠিক মানুষই সব পার্থক্য গড়ে দেয়।', 'Match preferences': 'ম্যাচ পছন্দ', 'Find my match': 'আমার ম্যাচ খুঁজুন', 'Your trusted circle': 'আপনার বিশ্বস্ত সার্কেল', 'A simple view of every booking': 'প্রতিটি বুকিংয়ের সহজ দৃশ্য', 'For workers and cooperatives': 'কর্মী ও সমবায়ের জন্য', 'Join as a worker': 'কর্মী হিসেবে যোগ দিন', 'Need a little help today?': 'আজ একটু সাহায্য দরকার?', 'Start with one simple request. We will take it from there.': 'একটি সহজ অনুরোধ দিয়ে শুরু করুন। বাকিটা আমরা দেখব।',
  },
} satisfies Record<Language, Record<string, string>>

const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void; t: (key: CopyKey) => string } | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('English')
  useEffect(() => { const saved = document.cookie.match(/sahayak-language=([^;]+)/)?.[1] as Language | undefined; if (saved && saved in copy) setLanguageState(saved) }, [])
  const setLanguage = (next: Language) => { setLanguageState(next); document.cookie = `sahayak-language=${encodeURIComponent(next)}; path=/; max-age=31536000; samesite=lax`; document.documentElement.lang = next === 'हिन्दी' ? 'hi' : next === 'বাংলা' ? 'bn' : 'en' }
  const value = useMemo(() => ({ language, setLanguage, t: (key: CopyKey) => copy[language][key] ?? copy.English[key] ?? key }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() { const context = useContext(LanguageContext); if (!context) throw new Error('useLanguage must be used inside LanguageProvider'); return context }
export type { CopyKey, Language }
