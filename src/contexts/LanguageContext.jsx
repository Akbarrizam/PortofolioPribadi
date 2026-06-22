import { createContext, useContext, useState } from 'react';
import translations from '../data/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('id');
  const [cvOpen, setCvOpen] = useState(false);

  /** Access a nested translation key with dot notation e.g. t('hero.title') */
  function t(keyPath) {
    const keys = keyPath.split('.');
    let result = translations[lang];
    for (const k of keys) {
      if (result === undefined) return keyPath;
      result = result[k];
    }
    return result ?? keyPath;
  }

  const toggleLang = () => setLang(prev => (prev === 'id' ? 'en' : 'id'));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, cvOpen, setCvOpen }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
