import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  };

  return (
    <button onClick={changeLanguage} className={'focus:outline-none'}>
      <Image
        src={currentLanguage === 'fr' ? '/images/ico-fr.png' : '/images/ico-uk.png'}
        alt="Logo"
        width={48}
        height={48}
        style={{ background: '#ffffff' }}
        className="relative z-10 rounded-full hover:scale-105 transition-all duration-300 ease-in-out"
      />
    </button>
  );
};

export default LanguageSwitcher;
