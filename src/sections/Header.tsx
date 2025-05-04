'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Moon, Sun } from '../svg/DarkModeIcons';
import { LinkButton } from '../components/LinkButton';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export const Header = ({
                         isDarkMode,
                         toggleDarkMode
                       }: {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
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
        <div className="items-center justify-end h-24 px-5 mx-auto row md:h-24 max-w-7xl sm:px-6">
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
        </div>
        {isClient && isScrolled && (
          <div className="z-20 progress">
            <div className="progress-bar"/>
          </div>
        )}
      </header>

      <Logo isScrolled={isScrolled} isClient={isClient}/>
    </>
  );
};

const Logo = ({
                isScrolled,
                isClient
              }: {
  isScrolled: boolean;
  isClient: boolean;
}) => {
  const baseClass =
    'fixed z-50 transition-all duration-700 ease-in-out will-change-transform';

  // Rendu prévisible côté serveur : position centrée
  if (!isClient) {
    return (
      <div className={`${baseClass} left-1/2 scale-150 -translate-x-1/2 translate-y-1/2`}>
        <Link href="/">
          <div className="relative flex items-center justify-center w-[100px] h-[100px]">
            <div className="absolute inset-0 bg-strong rounded-full opacity-100" style={{ zIndex: 1 }}/>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="relative z-10"
            />
          </div>
        </Link>
      </div>
    );
  }

  // Côté client : on utilise le scroll
  return (
    <div
      className={`${baseClass} ${
        isScrolled
          ? 'left-4 scale-75 translate-x-0 translate-y-0'
          : 'left-1/2 scale-150 -translate-x-1/2 translate-y-1/2'
      }`}
    >
      <Link href="/">
        <div className="relative flex items-center justify-center w-[100px] h-[100px]">
          <div
            className={`absolute inset-0 bg-strong rounded-full transition-opacity duration-700 ${
              isScrolled ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ zIndex: 1 }}
          />
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="relative z-10"
          />
        </div>
      </Link>
    </div>
  );
};
