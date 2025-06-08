'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Moon, Sun } from '../svg/DarkModeIcons';
import { LinkButton } from '../components/LinkButton';
import { Logo } from '../components/Logo';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export const Header = ({
                         isDarkMode,
                         toggleDarkMode,
                         animation = true
                       }: {
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
  animation?: boolean;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed w-full z-30 transition duration-300 ${
          isClient && isScrolled ? 'bg-strong backdrop-blur-sm shadow-lg' : ''
        }`}
      >
        {toggleDarkMode ? <div className="items-center justify-end h-24 px-5 mx-auto row md:h-24 max-w-7xl sm:px-6">
          <nav>
            <ul className="items-center gap-2 row">
              <li>
                <LinkButton
                  button
                  className={isScrolled ? isDarkMode ? 'bg-strong' : 'bg-extra-strong' : 'bg-extra-strong'}
                  onClick={toggleDarkMode}
                  title="Toggle dark mode"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Moon/> : <Sun/>}
                </LinkButton>
              </li>
              <li>
                <LanguageSwitcher/>
              </li>
            </ul>
          </nav>
        </div> : null}
        {animation && isClient && isScrolled && (
          <div className="z-20 progress">
            <div className="progress-bar"/>
          </div>
        )}
      </header>
      <Logo isScrolled={animation ? isScrolled : false} isClient={isClient}/>
    </>
  );
};
