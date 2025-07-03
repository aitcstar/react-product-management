import React, { createContext, useState, useContext } from 'react';
import enTranslations from '../i18n/en.json';
import arTranslations from '../i18n/ar.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    const translations = language === 'ar' ? arTranslations : enTranslations;
    return key.split('.').reduce((obj, k) => (obj || {})[k], translations) || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ t, language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);