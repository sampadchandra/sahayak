'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Language = 'English' | 'हिन्दी' | 'বাংলা'
type CopyKey = string

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

const siteTranslations: Record<Exclude<Language, 'English'>, Record<string, string>> = {
  'हिन्दी': {
    'Back to SAHAYAK': 'SAHAYAK पर वापस जाएँ', 'Smart matching': 'स्मार्ट मिलान', 'The right person makes all the difference.': 'सही व्यक्ति से सब कुछ बदल जाता है।', 'Tell us what matters to you — language, timing, experience, or simply a good feeling. We rank trusted workers around your preferences.': 'हमें बताएं कि आपके लिए क्या ज़रूरी है — भाषा, समय, अनुभव या भरोसा। हम आपकी पसंद के अनुसार भरोसेमंद वर्कर्स दिखाएंगे।', 'Match preferences': 'मिलान की पसंद', 'Live matching': 'लाइव मिलान', 'Service': 'सेवा', 'Language': 'भाषा', 'Availability': 'उपलब्धता', 'Morning': 'सुबह', 'Flexible': 'लचीला', 'Find matches': 'मिलान खोजें', 'Book': 'बुक करें', 'Message': 'संदेश', 'Call': 'कॉल', 'View profile': 'प्रोफ़ाइल देखें', 'Home care specialist': 'होम केयर विशेषज्ञ', 'Cook & elder companion': 'रसोइया और बुज़ुर्ग साथी', 'Repairs & maintenance': 'मरम्मत और रखरखाव', 'Worker onboarding': 'वर्कर पंजीकरण', 'One profile. More meaningful work.': 'एक प्रोफ़ाइल। बेहतर काम।', 'Complete worker profile': 'वर्कर की पूरी प्रोफ़ाइल', 'Your details': 'आपकी जानकारी', 'Full name': 'पूरा नाम', 'Phone number': 'फ़ोन नंबर', 'Email address': 'ईमेल पता', 'Primary skill': 'मुख्य कौशल', 'Other skills': 'अन्य कौशल', 'Experience': 'अनुभव', 'Service area': 'सेवा क्षेत्र', 'Languages spoken': 'बोली जाने वाली भाषाएँ', 'Certifications': 'प्रमाणपत्र', 'Availability and schedule': 'उपलब्धता और समय', 'Save my worker profile': 'मेरी वर्कर प्रोफ़ाइल सेव करें', 'Your profile is ready for review.': 'आपकी प्रोफ़ाइल समीक्षा के लिए तैयार है।', 'Review your details': 'अपनी जानकारी देखें', 'Saved': 'सेव हो गया', 'Bookings': 'बुकिंग', 'Help': 'मदद', 'Account': 'खाता', 'Sign out': 'साइन आउट', 'Sign in': 'साइन इन', 'Sign up': 'साइन अप', 'Create account': 'खाता बनाएं', 'Password': 'पासवर्ड', 'Name': 'नाम', 'Email': 'ईमेल', 'Submit': 'जमा करें', 'Request this service': 'यह सेवा अनुरोध करें', 'Location': 'स्थान', 'When': 'कब', 'Support centre': 'सहायता केंद्र', 'Help that feels human.': 'इंसानी एहसास वाली मदद।', 'Emergency support': 'आपातकालीन सहायता', 'Get started': 'शुरू करें', 'See how it works': 'देखें कैसे काम करता है', 'Home cleaning': 'घर की सफाई', 'Cooking help': 'खाना पकाने में मदद', 'Elder care': 'बुज़ुर्गों की देखभाल', 'Repairs & more': 'मरम्मत और अन्य', 'Verified professionals': 'सत्यापित विशेषज्ञ', 'Daily or weekly support': 'दैनिक या साप्ताहिक सहायता', 'Compassionate companions': 'सहानुभूतिपूर्ण साथी', 'Skilled local workers': 'कुशल स्थानीय वर्कर्स', 'From ₹299': '₹299 से', 'From ₹399': '₹399 से', 'From ₹499': '₹499 से', 'Get a quote': 'कोटेशन पाएं', 'What do you need help with?': 'आपको किस मदद की ज़रूरत है?', 'Change': 'बदलें', 'Choose location': 'स्थान चुनें', 'Bengaluru': 'बेंगलुरु', 'Mumbai': 'मुंबई', 'Delhi NCR': 'दिल्ली एनसीआर', 'Hyderabad': 'हैदराबाद', 'Support that starts with trust.': 'भरोसे से शुरू होने वाली सहायता।', 'Tell us what you need': 'अपनी ज़रूरत बताएं', 'Meet your match': 'अपना मैच पाएं', 'Feel looked after': 'देखभाल का एहसास पाएं', 'Safety built in': 'सुरक्षा शामिल है', 'Clear, fair pay': 'स्पष्ट और उचित भुगतान', 'Your time matters': 'आपका समय महत्वपूर्ण है', 'Human support': 'मानवीय सहायता', 'Your skill is your strength.': 'आपका कौशल आपकी ताकत है', 'Join as a worker': 'वर्कर के रूप में जुड़ें', 'Find trusted help': 'भरोसेमंद मदद खोजें', 'Safety centre': 'सुरक्षा केंद्र', 'Help centre': 'सहायता केंद्र'
  },
  'বাংলা': {
    'Back to SAHAYAK': 'SAHAYAK-এ ফিরে যান', 'Smart matching': 'স্মার্ট ম্যাচিং', 'The right person makes all the difference.': 'সঠিক মানুষই সব পার্থক্য গড়ে দেয়।', 'Tell us what matters to you — language, timing, experience, or simply a good feeling. We rank trusted workers around your preferences.': 'আপনার কাছে যা গুরুত্বপূর্ণ তা জানান — ভাষা, সময়, অভিজ্ঞতা বা ভরসা। আপনার পছন্দ অনুযায়ী বিশ্বস্ত কর্মীদের সাজানো হবে।', 'Match preferences': 'ম্যাচের পছন্দ', 'Live matching': 'লাইভ ম্যাচিং', 'Service': 'পরিষেবা', 'Language': 'ভাষা', 'Availability': 'উপলব্ধতা', 'Morning': 'সকাল', 'Flexible': 'নমনীয়', 'Find matches': 'ম্যাচ খুঁজুন', 'Book': 'বুক করুন', 'Message': 'বার্তা', 'Call': 'কল', 'View profile': 'প্রোফাইল দেখুন', 'Home care specialist': 'হোম কেয়ার বিশেষজ্ঞ', 'Cook & elder companion': 'রাঁধুনি ও বয়স্ক সঙ্গী', 'Repairs & maintenance': 'মেরামত ও রক্ষণাবেক্ষণ', 'Worker onboarding': 'কর্মী নিবন্ধন', 'One profile. More meaningful work.': 'একটি প্রোফাইল। আরও অর্থপূর্ণ কাজ।', 'Complete worker profile': 'সম্পূর্ণ কর্মী প্রোফাইল', 'Your details': 'আপনার তথ্য', 'Full name': 'পুরো নাম', 'Phone number': 'ফোন নম্বর', 'Email address': 'ইমেল ঠিকানা', 'Primary skill': 'প্রধান দক্ষতা', 'Other skills': 'অন্যান্য দক্ষতা', 'Experience': 'অভিজ্ঞতা', 'Service area': 'পরিষেবা এলাকা', 'Languages spoken': 'কথ্য ভাষা', 'Certifications': 'সার্টিফিকেশন', 'Availability and schedule': 'উপলব্ধতা ও সময়সূচি', 'Save my worker profile': 'আমার কর্মী প্রোফাইল সংরক্ষণ করুন', 'Your profile is ready for review.': 'আপনার প্রোফাইল পর্যালোচনার জন্য প্রস্তুত।', 'Review your details': 'আপনার তথ্য দেখুন', 'Saved': 'সংরক্ষিত', 'Bookings': 'বুকিং', 'Help': 'সাহায্য', 'Account': 'অ্যাকাউন্ট', 'Sign out': 'সাইন আউট', 'Sign in': 'সাইন ইন', 'Sign up': 'সাইন আপ', 'Create account': 'অ্যাকাউন্ট তৈরি করুন', 'Password': 'পাসওয়ার্ড', 'Name': 'নাম', 'Email': 'ইমেল', 'Submit': 'জমা দিন', 'Request this service': 'এই পরিষেবার অনুরোধ করুন', 'Location': 'অবস্থান', 'When': 'কখন', 'Support centre': 'সহায়তা কেন্দ্র', 'Help that feels human.': 'মানবিক অনুভূতির সাহায্য।', 'Emergency support': 'জরুরি সহায়তা', 'Get started': 'শুরু করুন', 'See how it works': 'কীভাবে কাজ করে দেখুন', 'Home cleaning': 'বাড়ি পরিষ্কার', 'Cooking help': 'রান্নার সাহায্য', 'Elder care': 'বয়স্কদের যত্ন', 'Repairs & more': 'মেরামত ও অন্যান্য', 'Verified professionals': 'যাচাই করা পেশাদার', 'Daily or weekly support': 'দৈনিক বা সাপ্তাহিক সহায়তা', 'Compassionate companions': 'সহানুভূতিশীল সঙ্গী', 'Skilled local workers': 'দক্ষ স্থানীয় কর্মী', 'From ₹299': '₹২৯৯ থেকে', 'From ₹399': '₹৩৯৯ থেকে', 'From ₹499': '₹৪৯৯ থেকে', 'Get a quote': 'দাম জানুন', 'What do you need help with?': 'আপনার কী সাহায্য দরকার?', 'Change': 'পরিবর্তন করুন', 'Choose location': 'অবস্থান বেছে নিন', 'Bengaluru': 'বেঙ্গালুরু', 'Mumbai': 'মুম্বাই', 'Delhi NCR': 'দিল্লি এনসিআর', 'Hyderabad': 'হায়দরাবাদ', 'Support that starts with trust.': 'বিশ্বাস দিয়ে শুরু হওয়া সহায়তা।', 'Tell us what you need': 'আপনার প্রয়োজন জানান', 'Meet your match': 'আপনার ম্যাচের সঙ্গে দেখা করুন', 'Feel looked after': 'যত্নের অনুভূতি পান', 'Safety built in': 'নিরাপত্তা অন্তর্ভুক্ত', 'Clear, fair pay': 'স্বচ্ছ ও ন্যায্য পারিশ্রমিক', 'Your time matters': 'আপনার সময় গুরুত্বপূর্ণ', 'Human support': 'মানবিক সহায়তা', 'Your skill is your strength.': 'আপনার দক্ষতাই আপনার শক্তি', 'Join as a worker': 'কর্মী হিসেবে যোগ দিন', 'Find trusted help': 'বিশ্বস্ত সাহায্য খুঁজুন', 'Safety centre': 'নিরাপত্তা কেন্দ্র', 'Help centre': 'সহায়তা কেন্দ্র'
  }
}

const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void; t: (key: CopyKey) => string } | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('English')
  useEffect(() => { const saved = document.cookie.match(/sahayak-language=([^;]+)/)?.[1] as Language | undefined; if (saved && saved in copy) { setLanguageState(saved); document.documentElement.lang = saved === 'हिन्दी' ? 'hi' : saved === 'বাংলা' ? 'bn' : 'en' } }, [])
  const setLanguage = (next: Language) => { setLanguageState(next); document.cookie = `sahayak-language=${encodeURIComponent(next)}; path=/; max-age=31536000; samesite=lax`; document.documentElement.lang = next === 'हिन्दी' ? 'hi' : next === 'বাংলা' ? 'bn' : 'en' }
  useEffect(() => {
    const translate = () => {
      const dictionary = language === 'English' ? {} : siteTranslations[language]
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
      const textNodes: Text[] = []
      while (walker.nextNode()) textNodes.push(walker.currentNode as Text)
      textNodes.forEach((node) => {
        const text = node.textContent?.trim()
        if (text && dictionary[text] && node.parentElement?.tagName !== 'SCRIPT' && node.parentElement?.tagName !== 'STYLE') {
          const start = node.textContent!.indexOf(text)
          node.textContent = `${node.textContent!.slice(0, start)}${dictionary[text]}${node.textContent!.slice(start + text.length)}`
        }
      })
      document.querySelectorAll('body *').forEach((element) => {
        ;['placeholder', 'aria-label', 'title'].forEach((attribute) => {
          const value = element.getAttribute(attribute)
          if (value && dictionary[value]) element.setAttribute(attribute, dictionary[value])
        })
      })
    }
    translate()
    const observer = new MutationObserver(translate)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [language])
  const value = useMemo(() => ({ language, setLanguage, t: (key: CopyKey) => copy[language][key] ?? siteTranslations[language as Exclude<Language, 'English'>]?.[key] ?? copy.English[key] ?? key }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() { const context = useContext(LanguageContext); if (!context) throw new Error('useLanguage must be used inside LanguageProvider'); return context }
export type { CopyKey, Language }
